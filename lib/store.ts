import { Attempt, CategoryScore, PilotLead } from "@/types";
import { getPool, ensureSchema } from "@/lib/db";

export interface EmployeeRecord {
  id: string;
  name: string;
  pin: string;
  location: string;
  createdAt: string;
}

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

export async function listAttempts(): Promise<Attempt[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, employee_name, location, role, scenario_id, scenario_title, score, passed,
            created_at, mode, transcript, category_scores, coaching_notes, word_track
     FROM attempts ORDER BY created_at DESC`
  );
  return rows.map(rowToAttempt);
}

export async function addAttempt(attempt: {
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
}): Promise<Attempt> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `INSERT INTO attempts
      (employee_name, location, role, scenario_id, scenario_title, score, passed,
       mode, transcript, category_scores, coaching_notes, word_track)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     RETURNING id, employee_name, location, role, scenario_id, scenario_title, score, passed,
               created_at, mode, transcript, category_scores, coaching_notes, word_track`,
    [
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

export async function listEmployees(): Promise<EmployeeRecord[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, pin, location, created_at FROM employees ORDER BY created_at DESC`
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    pin: r.pin,
    location: r.location,
    createdAt: r.created_at.toISOString(),
  }));
}

export async function addEmployee(
  name: string,
  pin: string,
  location: string
): Promise<EmployeeRecord> {
  await ensureSchema();
  const existing = await getPool().query(`SELECT id FROM employees WHERE name = $1`, [name]);
  if (existing.rows.length > 0) {
    throw new Error("An employee with that name already exists.");
  }
  const { rows } = await getPool().query(
    `INSERT INTO employees (name, pin, location) VALUES ($1, $2, $3)
     RETURNING id, name, pin, location, created_at`,
    [name, pin, location]
  );
  const r = rows[0];
  return {
    id: r.id,
    name: r.name,
    pin: r.pin,
    location: r.location,
    createdAt: r.created_at.toISOString(),
  };
}

export async function deleteEmployee(id: string): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await getPool().query(`DELETE FROM employees WHERE id = $1`, [id]);
  return (rowCount ?? 0) > 0;
}

export async function findEmployeeByNamePin(
  name: string,
  pin: string
): Promise<EmployeeRecord | null> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, pin, location, created_at FROM employees WHERE name = $1 AND pin = $2`,
    [name, pin]
  );
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    id: r.id,
    name: r.name,
    pin: r.pin,
    location: r.location,
    createdAt: r.created_at.toISOString(),
  };
}

export async function isManagerCodeSet(): Promise<boolean> {
  await ensureSchema();
  const { rows } = await getPool().query(`SELECT id FROM manager_settings WHERE id = 1`);
  return rows.length > 0;
}

export async function setManagerCode(code: string): Promise<void> {
  await ensureSchema();
  await getPool().query(
    `INSERT INTO manager_settings (id, code) VALUES (1, $1)
     ON CONFLICT (id) DO UPDATE SET code = EXCLUDED.code`,
    [code]
  );
}

export async function verifyManagerCode(code: string): Promise<boolean> {
  await ensureSchema();
  const { rows } = await getPool().query(`SELECT code FROM manager_settings WHERE id = 1`);
  if (rows.length === 0) return false;
  return rows[0].code === code;
}
