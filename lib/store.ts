import { Attempt, CategoryScore, PilotLead } from "@/types";
import { getPool, ensureSchema } from "@/lib/db";
import { burnVerifyTime, hashSecret, sessionKeyFor, verifySecret } from "@/lib/secrets";

// Every employee, attempt and manager-code function below takes the
// organization id as its first argument and filters on it. The id must come
// from a verified session (see lib/tenant.ts and lib/rep-session.ts), never
// from the request body.

/** Wrong guesses allowed before a PIN / manager code is locked, and for how long. */
export const MAX_FAILED_ATTEMPTS = 5;
export const LOCK_MINUTES = 15;

export interface EmployeeRecord {
  id: string;
  name: string;
  location: string;
  createdAt: string;
}

export class SeatLimitError extends Error {
  limit: number;
  constructor(limit: number) {
    super(`This account is limited to ${limit} team members.`);
    this.name = "SeatLimitError";
    this.limit = limit;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToAttempt(r: any): Attempt {
  return {
    id: r.id,
    employeeName: r.employee_name,
    location: r.location,
    role: r.role,
    scenarioId: r.scenario_id,
    scenarioTitle: r.scenario_title,
    score: r.score,
    passed: r.passed,
    createdAt: r.created_at.toISOString(),
    mode: r.mode || "quiz",
    transcript: r.transcript ?? null,
    categoryScores: r.category_scores ?? null,
    coachingNotes: r.coaching_notes ?? null,
    wordTrack: r.word_track ?? null,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToEmployee(r: any): EmployeeRecord {
  return {
    id: r.id,
    name: r.name,
    location: r.location,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

export async function listAttempts(orgId: string): Promise<Attempt[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, employee_name, location, role, scenario_id, scenario_title, score, passed,
            created_at, mode, transcript, category_scores, coaching_notes, word_track
     FROM attempts WHERE org_id = $1 ORDER BY created_at DESC`,
    [orgId]
  );
  return rows.map(rowToAttempt);
}

export async function addAttempt(
  orgId: string,
  attempt: {
    employeeName: string;
    location: string;
    role: string;
    scenarioId: string;
    scenarioTitle: string;
    score: number;
    passed: boolean;
    mode?: "quiz" | "call";
    transcript?: string | null;
    categoryScores?: CategoryScore[] | null;
    coachingNotes?: string | null;
    wordTrack?: string | null;
  }
): Promise<Attempt> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `INSERT INTO attempts
      (org_id, employee_name, location, role, scenario_id, scenario_title, score, passed,
       mode, transcript, category_scores, coaching_notes, word_track)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     RETURNING id, employee_name, location, role, scenario_id, scenario_title, score, passed,
               created_at, mode, transcript, category_scores, coaching_notes, word_track`,
    [
      orgId,
      attempt.employeeName,
      attempt.location,
      attempt.role,
      attempt.scenarioId,
      attempt.scenarioTitle,
      attempt.score,
      attempt.passed,
      attempt.mode || "quiz",
      attempt.transcript ?? null,
      attempt.categoryScores ? JSON.stringify(attempt.categoryScores) : null,
      attempt.coachingNotes ?? null,
      attempt.wordTrack ?? null,
    ]
  );
  return rowToAttempt(rows[0]);
}

/** Scenarios this employee has passed (drives which levels unlock for them). */
export async function listPassedScenarioIds(
  orgId: string,
  employeeName: string
): Promise<string[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT DISTINCT scenario_id FROM attempts
     WHERE org_id = $1 AND employee_name = $2 AND passed = true`,
    [orgId, employeeName]
  );
  return rows.map((r) => r.scenario_id as string);
}

// Pilot leads are the platform owner's own sales leads (not customer data).
export async function addPilotLead(lead: {
  name: string;
  workEmail: string;
  goal?: string | null;
}): Promise<PilotLead> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `INSERT INTO pilot_leads (name, work_email, goal)
     VALUES ($1, $2, $3)
     RETURNING id, name, work_email, goal, created_at`,
    [lead.name, lead.workEmail, lead.goal ?? null]
  );
  const r = rows[0];
  return {
    id: r.id,
    name: r.name,
    workEmail: r.work_email,
    goal: r.goal,
    createdAt: r.created_at.toISOString(),
  };
}

export async function listPilotLeads(): Promise<PilotLead[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, work_email, goal, created_at FROM pilot_leads ORDER BY created_at DESC`
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    workEmail: r.work_email,
    goal: r.goal,
    createdAt: r.created_at.toISOString(),
  }));
}

// ---------------------------------------------------------------------------
// Employees
// ---------------------------------------------------------------------------

export async function listEmployees(orgId: string): Promise<EmployeeRecord[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, location, created_at FROM employees
     WHERE org_id = $1 ORDER BY created_at DESC`,
    [orgId]
  );
  return rows.map(rowToEmployee);
}

/**
 * Adds an employee, enforcing the account's team-size limit. The check runs
 * while the organization row is locked, so two simultaneous adds cannot both
 * slip past the limit.
 */
export async function addEmployee(
  orgId: string,
  name: string,
  pin: string,
  location: string
): Promise<EmployeeRecord> {
  await ensureSchema();
  const pinHash = await hashSecret(pin);
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const org = await client.query(
      `SELECT employee_limit FROM organizations WHERE id = $1 FOR UPDATE`,
      [orgId]
    );
    if (org.rows.length === 0) throw new Error("Organization not found.");
    const limit: number = org.rows[0].employee_limit;

    const count = await client.query(
      `SELECT count(*)::int AS n FROM employees WHERE org_id = $1`,
      [orgId]
    );
    if (count.rows[0].n >= limit) throw new SeatLimitError(limit);

    const existing = await client.query(
      `SELECT 1 FROM employees WHERE org_id = $1 AND lower(name) = lower($2)`,
      [orgId, name]
    );
    if (existing.rows.length > 0) {
      throw new Error("An employee with that name already exists.");
    }

    const { rows } = await client.query(
      `INSERT INTO employees (org_id, name, pin_hash, location) VALUES ($1, $2, $3, $4)
       RETURNING id, name, location, created_at`,
      [orgId, name, pinHash, location]
    );
    await client.query("COMMIT");
    return rowToEmployee(rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    if ((err as { code?: string }).code === "23505") {
      throw new Error("An employee with that name already exists.");
    }
    throw err;
  } finally {
    client.release();
  }
}

export async function deleteEmployee(orgId: string, id: string): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await getPool().query(
    `DELETE FROM employees WHERE id = $1 AND org_id = $2`,
    [id, orgId]
  );
  return (rowCount ?? 0) > 0;
}

/** Manager sets a new PIN for an employee (also clears any lockout). */
export async function resetEmployeePin(
  orgId: string,
  id: string,
  pin: string
): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await getPool().query(
    `UPDATE employees SET pin_hash = $1, failed_logins = 0, locked_until = NULL
     WHERE id = $2 AND org_id = $3`,
    [await hashSecret(pin), id, orgId]
  );
  return (rowCount ?? 0) > 0;
}

export async function getEmployeeById(
  orgId: string,
  id: string
): Promise<EmployeeRecord | null> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, location, created_at FROM employees WHERE org_id = $1 AND id = $2`,
    [orgId, id]
  );
  return rows.length === 0 ? null : rowToEmployee(rows[0]);
}

/** Employee plus the fingerprint that ties a session cookie to their current PIN. */
export async function getEmployeeForSession(
  orgId: string,
  id: string
): Promise<{ employee: EmployeeRecord; sessionKey: string } | null> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, location, created_at, pin_hash FROM employees WHERE org_id = $1 AND id = $2`,
    [orgId, id]
  );
  if (rows.length === 0) return null;
  return { employee: rowToEmployee(rows[0]), sessionKey: sessionKeyFor(rows[0].pin_hash) };
}

export type LoginResult =
  | { status: "ok"; employee: EmployeeRecord; sessionKey: string }
  | { status: "invalid" }
  | { status: "locked"; retryAfterSeconds: number };

/**
 * Checks an employee's name + PIN. Every try is counted BEFORE the PIN is
 * compared (under a row lock), so a burst of simultaneous guesses cannot
 * slip extra attempts past the lockout.
 */
export async function verifyEmployeeLogin(
  orgId: string,
  name: string,
  pin: string
): Promise<LoginResult> {
  await ensureSchema();
  const pool = getPool();
  const client = await pool.connect();
  let employee: EmployeeRecord;
  let pinHash: string;
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      `SELECT id, name, location, created_at, pin_hash, failed_logins,
              GREATEST(0, CEIL(EXTRACT(EPOCH FROM (locked_until - now()))))::int AS lock_left
       FROM employees WHERE org_id = $1 AND lower(name) = lower($2) FOR UPDATE`,
      [orgId, name]
    );
    if (rows.length === 0) {
      await client.query("ROLLBACK");
      await burnVerifyTime(pin);
      return { status: "invalid" };
    }
    const row = rows[0];
    if (row.lock_left > 0) {
      await client.query("ROLLBACK");
      return { status: "locked", retryAfterSeconds: row.lock_left };
    }
    const tripsLock = row.failed_logins + 1 >= MAX_FAILED_ATTEMPTS;
    await client.query(
      `UPDATE employees SET
         failed_logins = $2,
         locked_until = CASE WHEN $3 THEN now() + make_interval(mins => $4) ELSE NULL END
       WHERE id = $1`,
      [row.id, tripsLock ? 0 : row.failed_logins + 1, tripsLock, LOCK_MINUTES]
    );
    await client.query("COMMIT");
    employee = rowToEmployee(row);
    pinHash = row.pin_hash;
  } catch (err) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw err;
  } finally {
    client.release();
  }

  if (await verifySecret(pin, pinHash)) {
    await pool.query(
      `UPDATE employees SET failed_logins = 0, locked_until = NULL WHERE id = $1`,
      [employee.id]
    );
    return { status: "ok", employee, sessionKey: sessionKeyFor(pinHash) };
  }
  const state = await pool.query(
    `SELECT GREATEST(0, CEIL(EXTRACT(EPOCH FROM (locked_until - now()))))::int AS lock_left
     FROM employees WHERE id = $1`,
    [employee.id]
  );
  const left = state.rows[0]?.lock_left ?? 0;
  return left > 0 ? { status: "locked", retryAfterSeconds: left } : { status: "invalid" };
}

// ---------------------------------------------------------------------------
// Manager code (one per organization)
// ---------------------------------------------------------------------------

export async function isManagerCodeSet(orgId: string): Promise<boolean> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT 1 FROM org_manager_codes WHERE org_id = $1 AND code_hash IS NOT NULL`,
    [orgId]
  );
  return rows.length > 0;
}

/** Sets the code only if none exists yet. Returns false if one was already set. */
export async function setManagerCodeIfUnset(
  orgId: string,
  code: string
): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await getPool().query(
    `INSERT INTO org_manager_codes (org_id, code_hash) VALUES ($1, $2)
     ON CONFLICT (org_id) DO NOTHING`,
    [orgId, await hashSecret(code)]
  );
  return (rowCount ?? 0) > 0;
}

export type CodeResult =
  | { status: "ok" }
  | { status: "unset" }
  | { status: "invalid" }
  | { status: "locked"; retryAfterSeconds: number };

/** Checks the manager code with the same count-first lockout as employee PINs. */
export async function checkManagerCode(
  orgId: string,
  code: string
): Promise<CodeResult> {
  await ensureSchema();
  const pool = getPool();
  const client = await pool.connect();
  let codeHash: string;
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      `SELECT code_hash, failed_attempts,
              GREATEST(0, CEIL(EXTRACT(EPOCH FROM (locked_until - now()))))::int AS lock_left
       FROM org_manager_codes WHERE org_id = $1 AND code_hash IS NOT NULL FOR UPDATE`,
      [orgId]
    );
    if (rows.length === 0) {
      await client.query("ROLLBACK");
      return { status: "unset" };
    }
    const row = rows[0];
    if (row.lock_left > 0) {
      await client.query("ROLLBACK");
      return { status: "locked", retryAfterSeconds: row.lock_left };
    }
    const tripsLock = row.failed_attempts + 1 >= MAX_FAILED_ATTEMPTS;
    await client.query(
      `UPDATE org_manager_codes SET
         failed_attempts = $2,
         locked_until = CASE WHEN $3 THEN now() + make_interval(mins => $4) ELSE NULL END
       WHERE org_id = $1`,
      [orgId, tripsLock ? 0 : row.failed_attempts + 1, tripsLock, LOCK_MINUTES]
    );
    await client.query("COMMIT");
    codeHash = row.code_hash;
  } catch (err) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw err;
  } finally {
    client.release();
  }

  if (await verifySecret(code, codeHash)) {
    await pool.query(
      `UPDATE org_manager_codes SET failed_attempts = 0, locked_until = NULL WHERE org_id = $1`,
      [orgId]
    );
    return { status: "ok" };
  }
  const state = await pool.query(
    `SELECT GREATEST(0, CEIL(EXTRACT(EPOCH FROM (locked_until - now()))))::int AS lock_left
     FROM org_manager_codes WHERE org_id = $1`,
    [orgId]
  );
  const left = state.rows[0]?.lock_left ?? 0;
  return left > 0 ? { status: "locked", retryAfterSeconds: left } : { status: "invalid" };
}
