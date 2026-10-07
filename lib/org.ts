import { getPool, ensureSchema } from "./db";
import { newAccessSlug } from "./secrets";

export interface Organization {
  id: string;
  clerkOrgId: string | null;
  name: string;
  rooftopCount: number;
  billingInterval: string;
  subscriptionStatus: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  trialEndsAt: string | null;
  accessSlug: string;
  employeeLimit: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Organization {
  return {
    id: row.id,
    clerkOrgId: row.clerk_org_id,
    name: row.name,
    rooftopCount: row.rooftop_count,
    billingInterval: row.billing_interval,
    subscriptionStatus: row.subscription_status,
    stripeCustomerId: row.stripe_customer_id,
    stripeSubscriptionId: row.stripe_subscription_id,
    trialEndsAt: row.trial_ends_at,
    accessSlug: row.access_slug,
    employeeLimit: row.employee_limit,
  };
}

export async function getOrgByClerkId(clerkOrgId: string): Promise<Organization | null> {
  await ensureSchema();
  const pool = getPool();
  const { rows } = await pool.query(
    "SELECT * FROM organizations WHERE clerk_org_id = $1",
    [clerkOrgId]
  );
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function getOrgById(id: string): Promise<Organization | null> {
  await ensureSchema();
  const { rows } = await getPool().query("SELECT * FROM organizations WHERE id = $1", [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function getOrgBySlug(slug: string): Promise<Organization | null> {
  await ensureSchema();
  const { rows } = await getPool().query(
    "SELECT * FROM organizations WHERE access_slug = $1",
    [slug.trim().toLowerCase()]
  );
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function createTrialOrg(clerkOrgId: string, name: string): Promise<Organization> {
  await ensureSchema();
  const pool = getPool();
  const { rows } = await pool.query(
    `INSERT INTO organizations (clerk_org_id, name, rooftop_count, subscription_status, trial_ends_at, access_slug)
     VALUES ($1, $2, 1, 'trialing', now() + interval '7 days', $3)
     ON CONFLICT (clerk_org_id) DO UPDATE SET name = EXCLUDED.name
     RETURNING *`,
    [clerkOrgId, name, newAccessSlug()]
  );
  return mapRow(rows[0]);
}

export function isOrgAccessActive(org: Organization): boolean {
  if (org.subscriptionStatus === "active" || org.subscriptionStatus === "trialing_active") return true;
  if (org.subscriptionStatus === "trialing") {
    // Once checkout is complete the trial is governed by Stripe, which flips
    // the status by webhook when the trial ends or a payment fails.
    if (org.stripeSubscriptionId) return true;
    if (org.trialEndsAt) return new Date(org.trialEndsAt).getTime() > Date.now();
  }
  return false;
}

export async function getOrCreateOrgForClerkOrg(clerkOrgId: string, name: string): Promise<Organization> {
  const existing = await getOrgByClerkId(clerkOrgId);
  if (existing) return existing;
  return createTrialOrg(clerkOrgId, name);
}

export async function updateOrgFromStripe(params: {
  clerkOrgId?: string | null;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  status: string;
  rooftopCount: number;
  billingInterval: string;
}): Promise<void> {
  await ensureSchema();
  const pool = getPool();
  if (params.clerkOrgId) {
    await pool.query(
      `UPDATE organizations
       SET stripe_customer_id = $1, stripe_subscription_id = $2, subscription_status = $3,
           rooftop_count = $4, billing_interval = $5
       WHERE clerk_org_id = $6`,
      [
        params.stripeCustomerId,
        params.stripeSubscriptionId,
        params.status,
        params.rooftopCount,
        params.billingInterval,
        params.clerkOrgId,
      ]
    );
  } else {
    await pool.query(
      `UPDATE organizations
       SET stripe_customer_id = $1, subscription_status = $2, rooftop_count = $3, billing_interval = $4
       WHERE stripe_subscription_id = $5`,
      [
        params.stripeCustomerId,
        params.status,
        params.rooftopCount,
        params.billingInterval,
        params.stripeSubscriptionId,
      ]
    );
  }
}

// ---------------------------------------------------------------------------
// Team size limit and seat requests
// ---------------------------------------------------------------------------

export const MAX_EMPLOYEE_LIMIT = 10000;

export interface SeatRequest {
  id: string;
  orgId: string;
  requestedLimit: number;
  note: string | null;
  status: string;
  createdAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSeatRequest(r: any): SeatRequest {
  return {
    id: r.id,
    orgId: r.org_id,
    requestedLimit: r.requested_limit,
    note: r.note,
    status: r.status,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

export interface TeamSummary {
  employeeCount: number;
  employeeLimit: number;
  pendingRequest: SeatRequest | null;
}

export async function getTeamSummary(orgId: string): Promise<TeamSummary> {
  await ensureSchema();
  const pool = getPool();
  const counts = await pool.query(
    `SELECT o.employee_limit,
            (SELECT count(*)::int FROM employees e WHERE e.org_id = o.id) AS employee_count
     FROM organizations o WHERE o.id = $1`,
    [orgId]
  );
  const pending = await pool.query(
    `SELECT * FROM seat_requests WHERE org_id = $1 AND status = 'pending'`,
    [orgId]
  );
  return {
    employeeCount: counts.rows[0]?.employee_count ?? 0,
    employeeLimit: counts.rows[0]?.employee_limit ?? 0,
    pendingRequest: pending.rows[0] ? mapSeatRequest(pending.rows[0]) : null,
  };
}

export function isValidLimit(n: unknown): n is number {
  return Number.isInteger(n) && (n as number) >= 1 && (n as number) <= MAX_EMPLOYEE_LIMIT;
}

/** A dealer asks the platform owner for a larger team limit. One pending request per dealership. */
export async function createSeatRequest(
  orgId: string,
  requestedLimit: number,
  note: string | null
): Promise<SeatRequest> {
  await ensureSchema();
  const pool = getPool();
  const current = await pool.query(`SELECT employee_limit FROM organizations WHERE id = $1`, [orgId]);
  if (current.rows.length === 0) throw new Error("Organization not found.");
  if (requestedLimit <= current.rows[0].employee_limit) {
    throw new Error("Request a number larger than your current limit.");
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO seat_requests (org_id, requested_limit, note) VALUES ($1, $2, $3) RETURNING *`,
      [orgId, requestedLimit, note]
    );
    return mapSeatRequest(rows[0]);
  } catch (err) {
    if ((err as { code?: string }).code === "23505") {
      throw new Error("You already have a request waiting for approval.");
    }
    throw err;
  }
}

export interface PlatformOrgRow {
  id: string;
  name: string;
  clerkOrgId: string | null;
  subscriptionStatus: string;
  createdAt: string;
  employeeCount: number;
  employeeLimit: number;
  pendingRequest: SeatRequest | null;
}

/** Every dealership account, for the platform owner's admin page. */
export async function listOrgsForPlatform(): Promise<PlatformOrgRow[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT o.id, o.name, o.clerk_org_id, o.subscription_status, o.created_at, o.employee_limit,
            (SELECT count(*)::int FROM employees e WHERE e.org_id = o.id) AS employee_count,
            r.id AS req_id, r.requested_limit AS req_limit, r.note AS req_note,
            r.status AS req_status, r.created_at AS req_created
     FROM organizations o
     LEFT JOIN seat_requests r ON r.org_id = o.id AND r.status = 'pending'
     ORDER BY (r.id IS NOT NULL) DESC, o.created_at DESC`
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    clerkOrgId: r.clerk_org_id,
    subscriptionStatus: r.subscription_status,
    createdAt: new Date(r.created_at).toISOString(),
    employeeCount: r.employee_count,
    employeeLimit: r.employee_limit,
    pendingRequest: r.req_id
      ? {
          id: r.req_id,
          orgId: r.id,
          requestedLimit: r.req_limit,
          note: r.req_note,
          status: r.req_status,
          createdAt: new Date(r.req_created).toISOString(),
        }
      : null,
  }));
}

/** Platform owner sets a dealership's team limit directly. */
export async function setEmployeeLimit(orgId: string, limit: number): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await getPool().query(
    `UPDATE organizations SET employee_limit = $1 WHERE id = $2`,
    [limit, orgId]
  );
  return (rowCount ?? 0) > 0;
}

/** Platform owner approves (raises the limit) or denies a pending request. */
export async function decideSeatRequest(requestId: string, approve: boolean): Promise<boolean> {
  await ensureSchema();
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const req = await client.query(
      `SELECT * FROM seat_requests WHERE id = $1 AND status = 'pending' FOR UPDATE`,
      [requestId]
    );
    if (req.rows.length === 0) {
      await client.query("ROLLBACK");
      return false;
    }
    if (approve) {
      await client.query(
        `UPDATE organizations SET employee_limit = GREATEST(employee_limit, $1) WHERE id = $2`,
        [req.rows[0].requested_limit, req.rows[0].org_id]
      );
    }
    await client.query(
      `UPDATE seat_requests SET status = $1, decided_at = now() WHERE id = $2`,
      [approve ? "approved" : "denied", requestId]
    );
    await client.query("COMMIT");
    return true;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
