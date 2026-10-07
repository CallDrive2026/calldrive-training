import { timingSafeEqual } from "crypto";
import { Attempt, CategoryScore, PilotLead } from "@/types";
import { getPool, ensureSchema } from "@/lib/db";

// Every employee, attempt and manager-code function below takes the
// organization id as its first argument and filters on it. The id must come
// from the signed-in session (see lib/tenant.ts), never from the request body.

export interface EmployeeRecord {
  id: string;
  name: string;
  pin: string;
  location: string;
  createdAt: string;
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
    pin: r.pin,
    location: r.location,
    createdAt: r.created_at.toISOString(),
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

export async function listEmployees(orgId: string): Promise<EmployeeRecord[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, pin, location, created_at FROM employees
     WHERE org_id = $1 ORDER BY created_at DESC`,
    [orgId]
  );
  return rows.map(rowToEmployee);
}

export async function addEmployee(
  orgId: string,
  name: string,
  pin: string,
  location: string
): Promise<EmployeeRecord> {
  await ensureSchema();
  const existing = await getPool().query(
    `SELECT id FROM employees WHERE org_id = $1 AND name = $2`,
    [orgId, name]
  );
  if (existing.rows.length > 0) {
    throw new Error("An employee with that name already exists.");
  }
  try {
    const { rows } = await getPool().query(
      `INSERT INTO employees (org_id, name, pin, location) VALUES ($1, $2, $3, $4)
       RETURNING id, name, pin, location, created_at`,
      [orgId, name, pin, location]
    );
    return rowToEmployee(rows[0]);
  } catch (err) {
    // 23505 = unique violation (two requests raced past the check above)
    if ((err as { code?: string }).code === "23505") {
      throw new Error("An employee with that name already exists.");
    }
    throw err;
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

export async function findEmployeeByName(
  orgId: string,
  name: string
): Promise<EmployeeRecord | null> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, pin, location, created_at FROM employees
     WHERE org_id = $1 AND name = $2`,
    [orgId, name]
  );
  return rows.length === 0 ? null : rowToEmployee(rows[0]);
}

export async function findEmployeeByNamePin(
  orgId: string,
  name: string,
  pin: string
): Promise<EmployeeRecord | null> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, pin, location, created_at FROM employees
     WHERE org_id = $1 AND name = $2 AND pin = $3`,
    [orgId, name, pin]
  );
  return rows.length === 0 ? null : rowToEmployee(rows[0]);
}

export async function isManagerCodeSet(orgId: string): Promise<boolean> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT 1 FROM org_manager_codes WHERE org_id = $1`,
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
    `INSERT INTO org_manager_codes (org_id, code) VALUES ($1, $2)
     ON CONFLICT (org_id) DO NOTHING`,
    [orgId, code]
  );
  return (rowCount ?? 0) > 0;
}

export async function verifyManagerCode(
  orgId: string,
  code: string
): Promise<boolean> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT code FROM org_manager_codes WHERE org_id = $1`,
    [orgId]
  );
  if (rows.length === 0) return false;
  const expected = Buffer.from(String(rows[0].code));
  const given = Buffer.from(String(code));
  return expected.length === given.length && timingSafeEqual(expected, given);
}
