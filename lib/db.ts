import { Pool } from "pg";
import { hashSecret, newAccessSlug } from "@/lib/secrets";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

export function getPool(): Pool {
  if (!global.__pgPool) {
    global.__pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return global.__pgPool;
}

/** The platform owner's organization (internal use, never billed). */
export const PLATFORM_ORG_ID = "00000000-0000-0000-0000-000000000001";

/** Team members each dealership account may add before the platform owner must approve more. */
export const DEFAULT_EMPLOYEE_LIMIT = 30;

let migration: Promise<void> | null = null;

/**
 * Creates/upgrades the schema. Safe to call on every request: the work runs
 * once per server instance and is serialized across instances with advisory
 * locks.
 */
export function ensureSchema(): Promise<void> {
  if (!migration) {
    migration = runMigrations().catch((err) => {
      migration = null;
      throw err;
    });
  }
  return migration;
}

/**
 * Only one server instance may run the migration at a time. Without this, two
 * instances starting together can each hold a table lock the other needs and
 * Postgres aborts one with "deadlock detected". The lock is held on its own
 * connection for the whole migration and released when it finishes (or if the
 * instance dies).
 */
async function runMigrations() {
  const pool = getPool();
  const lockClient = await pool.connect();
  try {
    await lockClient.query("SELECT pg_advisory_lock(727400)");
    await runMigrationSteps(pool);
  } finally {
    try {
      await lockClient.query("SELECT pg_advisory_unlock(727400)");
    } finally {
      lockClient.release();
    }
  }
}

async function runMigrationSteps(pool: Pool) {
  await pool.query(`
    SELECT pg_advisory_xact_lock(727401);

    CREATE EXTENSION IF NOT EXISTS pgcrypto;

    CREATE TABLE IF NOT EXISTS employees (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL UNIQUE,
      pin TEXT NOT NULL,
      location TEXT NOT NULL DEFAULT 'Unspecified',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS attempts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      employee_name TEXT NOT NULL,
      location TEXT NOT NULL DEFAULT 'Unspecified',
      role TEXT NOT NULL,
      scenario_id TEXT NOT NULL,
      scenario_title TEXT NOT NULL,
      score INTEGER NOT NULL,
      passed BOOLEAN NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    ALTER TABLE attempts ADD COLUMN IF NOT EXISTS transcript TEXT;
    ALTER TABLE attempts ADD COLUMN IF NOT EXISTS category_scores JSONB;
    ALTER TABLE attempts ADD COLUMN IF NOT EXISTS coaching_notes TEXT;
    ALTER TABLE attempts ADD COLUMN IF NOT EXISTS word_track TEXT;
    ALTER TABLE attempts ADD COLUMN IF NOT EXISTS mode TEXT NOT NULL DEFAULT 'quiz';

    CREATE TABLE IF NOT EXISTS manager_settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      code TEXT NOT NULL,
      CONSTRAINT single_row CHECK (id = 1)
    );

    CREATE TABLE IF NOT EXISTS pilot_leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      work_email TEXT NOT NULL,
      goal TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS organizations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      clerk_org_id TEXT UNIQUE,
      name TEXT NOT NULL DEFAULT 'Unnamed Dealer Group',
      rooftop_count INTEGER NOT NULL DEFAULT 1,
      billing_interval TEXT NOT NULL DEFAULT 'month',
      subscription_status TEXT NOT NULL DEFAULT 'trialing',
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT,
      trial_ends_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- Dealership code shown on the employee sign-in link, and the team-size cap.
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS access_slug TEXT;
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS employee_limit INTEGER NOT NULL DEFAULT ${DEFAULT_EMPLOYEE_LIMIT};

    ALTER TABLE employees ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id);
    ALTER TABLE attempts ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id);

    -- access_slug is supplied even though the row usually exists already: once the
    -- column is NOT NULL, Postgres rejects a NULL here before it notices the conflict.
    INSERT INTO organizations (id, clerk_org_id, name, rooftop_count, subscription_status, access_slug)
    VALUES ('${PLATFORM_ORG_ID}', NULL, 'CallDrive Internal', 1, 'active', '${newAccessSlug()}')
    ON CONFLICT (id) DO NOTHING;

    UPDATE employees SET org_id = '${PLATFORM_ORG_ID}' WHERE org_id IS NULL;
    UPDATE attempts SET org_id = '${PLATFORM_ORG_ID}' WHERE org_id IS NULL;

    -- Every row must belong to an organization. An unscoped write now fails
    -- loudly instead of silently leaking into another customer's data.
    ALTER TABLE employees ALTER COLUMN org_id SET NOT NULL;
    ALTER TABLE attempts ALTER COLUMN org_id SET NOT NULL;

    -- Employee names are unique within one organization, ignoring capitals,
    -- because employees type their own name when they sign in.
    ALTER TABLE employees DROP CONSTRAINT IF EXISTS employees_name_key;
    DROP INDEX IF EXISTS employees_org_name_idx;
    CREATE UNIQUE INDEX IF NOT EXISTS employees_org_lname_idx ON employees (org_id, lower(name));
    CREATE INDEX IF NOT EXISTS attempts_org_created_idx ON attempts (org_id, created_at DESC);

    -- PINs are stored only as hashes, with lockout counters.
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS pin_hash TEXT;
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS failed_logins INTEGER NOT NULL DEFAULT 0;
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ;
    ALTER TABLE employees ALTER COLUMN pin DROP NOT NULL;

    -- Each organization has its own manager code (stored hashed, with lockout).
    CREATE TABLE IF NOT EXISTS org_manager_codes (
      org_id UUID PRIMARY KEY REFERENCES organizations(id) ON DELETE CASCADE,
      code TEXT NOT NULL
    );
    ALTER TABLE org_manager_codes ADD COLUMN IF NOT EXISTS code_hash TEXT;
    ALTER TABLE org_manager_codes ADD COLUMN IF NOT EXISTS failed_attempts INTEGER NOT NULL DEFAULT 0;
    ALTER TABLE org_manager_codes ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ;
    ALTER TABLE org_manager_codes ALTER COLUMN code DROP NOT NULL;
    INSERT INTO org_manager_codes (org_id, code)
    SELECT '${PLATFORM_ORG_ID}', code FROM manager_settings WHERE id = 1
    ON CONFLICT (org_id) DO NOTHING;

    -- A dealer asks the platform owner for a bigger team limit here.
    CREATE TABLE IF NOT EXISTS seat_requests (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
      requested_limit INTEGER NOT NULL,
      note TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      decided_at TIMESTAMPTZ
    );
    CREATE UNIQUE INDEX IF NOT EXISTS seat_requests_one_pending
      ON seat_requests (org_id) WHERE status = 'pending';
  `);

  await convertLegacyData(pool);

  await pool.query(`
    SELECT pg_advisory_xact_lock(727401);
    ALTER TABLE employees ALTER COLUMN pin_hash SET NOT NULL;
    ALTER TABLE organizations ALTER COLUMN access_slug SET NOT NULL;
    CREATE UNIQUE INDEX IF NOT EXISTS organizations_access_slug_idx ON organizations (access_slug);
  `);

  await linkPlatformOrg(pool);
}

/**
 * One-time conversion of older rows: hashes plaintext PINs and manager codes,
 * removes the old plaintext copies, and gives every organization a dealership
 * code. Does nothing once everything is converted.
 */
async function convertLegacyData(pool: Pool) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(727403)");

    const employees = await client.query(
      `SELECT id, pin FROM employees WHERE pin_hash IS NULL AND pin IS NOT NULL`
    );
    for (const row of employees.rows) {
      await client.query(
        `UPDATE employees SET pin_hash = $1, pin = NULL WHERE id = $2`,
        [await hashSecret(row.pin), row.id]
      );
    }

    const codes = await client.query(
      `SELECT org_id, code FROM org_manager_codes WHERE code_hash IS NULL AND code IS NOT NULL`
    );
    for (const row of codes.rows) {
      await client.query(
        `UPDATE org_manager_codes SET code_hash = $1, code = NULL WHERE org_id = $2`,
        [await hashSecret(row.code), row.org_id]
      );
    }

    // The old single global code table held a plaintext copy; it is now redundant.
    await client.query(`DELETE FROM manager_settings`);

    const orgs = await client.query(`SELECT id FROM organizations WHERE access_slug IS NULL`);
    for (const row of orgs.rows) {
      await client.query(`UPDATE organizations SET access_slug = $1 WHERE id = $2`, [
        newAccessSlug(),
        row.id,
      ]);
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

/**
 * Attaches the platform owner's Clerk organization (PLATFORM_CLERK_ORG_ID) to
 * the internal, never-billed organization record. If that Clerk org already
 * got an auto-created trial row, it is only replaced when it is completely
 * empty (no billing, no employees, no attempts).
 */
export async function linkPlatformOrg(pool: Pool = getPool()) {
  const clerkOrgId = process.env.PLATFORM_CLERK_ORG_ID;
  if (!clerkOrgId) return;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(727402)");
    await client.query(
      `DELETE FROM organizations o
       WHERE o.clerk_org_id = $1 AND o.id <> $2
         AND o.stripe_customer_id IS NULL AND o.stripe_subscription_id IS NULL
         AND NOT EXISTS (SELECT 1 FROM employees e WHERE e.org_id = o.id)
         AND NOT EXISTS (SELECT 1 FROM attempts a WHERE a.org_id = o.id)`,
      [clerkOrgId, PLATFORM_ORG_ID]
    );
    await client.query(
      `UPDATE organizations SET clerk_org_id = $1
       WHERE id = $2 AND clerk_org_id IS DISTINCT FROM $1
         AND NOT EXISTS (SELECT 1 FROM organizations WHERE clerk_org_id = $1)`,
      [clerkOrgId, PLATFORM_ORG_ID]
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Could not link the platform organization", err);
  } finally {
    client.release();
  }
}
