import { Pool } from "pg";

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

let migration: Promise<void> | null = null;

/**
 * Creates/upgrades the schema. Safe to call on every request: the work runs
 * once per server instance and is serialized across instances with an
 * advisory lock.
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

async function runMigrations() {
  const pool = getPool();
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

    ALTER TABLE employees ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id);
    ALTER TABLE attempts ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id);

    INSERT INTO organizations (id, clerk_org_id, name, rooftop_count, subscription_status)
    VALUES ('${PLATFORM_ORG_ID}', NULL, 'CallDrive Internal', 1, 'active')
    ON CONFLICT (id) DO NOTHING;

    UPDATE employees SET org_id = '${PLATFORM_ORG_ID}' WHERE org_id IS NULL;
    UPDATE attempts SET org_id = '${PLATFORM_ORG_ID}' WHERE org_id IS NULL;

    -- Every row must belong to an organization. An unscoped write now fails
    -- loudly instead of silently leaking into another customer's data.
    ALTER TABLE employees ALTER COLUMN org_id SET NOT NULL;
    ALTER TABLE attempts ALTER COLUMN org_id SET NOT NULL;

    -- Employee names only need to be unique within one organization.
    ALTER TABLE employees DROP CONSTRAINT IF EXISTS employees_name_key;
    CREATE UNIQUE INDEX IF NOT EXISTS employees_org_name_idx ON employees (org_id, name);
    CREATE INDEX IF NOT EXISTS attempts_org_created_idx ON attempts (org_id, created_at DESC);

    -- Each organization has its own manager code.
    CREATE TABLE IF NOT EXISTS org_manager_codes (
      org_id UUID PRIMARY KEY REFERENCES organizations(id) ON DELETE CASCADE,
      code TEXT NOT NULL
    );
    INSERT INTO org_manager_codes (org_id, code)
    SELECT '${PLATFORM_ORG_ID}', code FROM manager_settings WHERE id = 1
    ON CONFLICT (org_id) DO NOTHING;
  `);

  await linkPlatformOrg(pool);
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
