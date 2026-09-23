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

let migrated = false;

export async function ensureSchema() {
  if (migrated) return;
  const pool = getPool();
  await pool.query(`
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
    VALUES ('00000000-0000-0000-0000-000000000001', NULL, 'CallDrive Internal', 1, 'active')
    ON CONFLICT (id) DO NOTHING;

    UPDATE employees SET org_id = '00000000-0000-0000-0000-000000000001' WHERE org_id IS NULL;
    UPDATE attempts SET org_id = '00000000-0000-0000-0000-000000000001' WHERE org_id IS NULL;
  `);
  migrated = true;
}
