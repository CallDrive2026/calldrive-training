import { getPool, ensureSchema } from "./db";

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

export async function createTrialOrg(clerkOrgId: string, name: string): Promise<Organization> {
  await ensureSchema();
  const pool = getPool();
  const { rows } = await pool.query(
    `INSERT INTO organizations (clerk_org_id, name, rooftop_count, subscription_status, trial_ends_at)
     VALUES ($1, $2, 1, 'trialing', now() + interval '7 days')
     ON CONFLICT (clerk_org_id) DO UPDATE SET name = EXCLUDED.name
     RETURNING *`,
    [clerkOrgId, name]
  );
  return mapRow(rows[0]);
}

export function isOrgAccessActive(org: Organization): boolean {
  if (org.subscriptionStatus === "active" || org.subscriptionStatus === "trialing_active") return true;
  if (org.subscriptionStatus === "trialing" && org.trialEndsAt) {
    return new Date(org.trialEndsAt).getTime() > Date.now();
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
