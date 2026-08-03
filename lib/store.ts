import { Attempt } from "@/types";
import { getPool, ensureSchema } from "@/lib/db";

export interface EmployeeRecord {
  id: string;
  name: string;
  pin: string;
  location: string;
  createdAt: string;
}

export async function listAttempts(): Promise<Attempt[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, employee_name, location, role, scenario_id, scenario_title, score, passed, created_at
     FROM attempts ORDER BY created_at DESC`
  );
  return rows.map((r) => ({
    id: r.id,
    employeeName: r.employee_name,
    location: r.location,
    role: r.role,
    scenarioId: r.scenario_id,
    scenarioTitle: r.scenario_title,
    score: r.score,
    passed: r.passed,
    createdAt: r.created_at.toISOString(),
  }));
}

export async function addAttempt(attempt: Omit<Attempt, "id" | "createdAt">): Promise<Attempt> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `INSERT INTO attempts (employee_name, location, role, scenario_id, scenario_title, score, passed)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, employee_name, location, role, scenario_id, scenario_title, score, passed, created_at`,
    [
      attempt.employeeName,
      attempt.location,
      attempt.role,
      attempt.scenarioId,
      attempt.scenarioTitle,
      attempt.score,
      attempt.passed,
    ]
  );
  const r = rows[0];
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
  };
}

export async function listEmployees(): Promise<EmployeeRecord[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, pin, location, created_at FROM employees ORDER BY name ASC`
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    pin: r.pin,
    location: r.location,
    createdAt: r.created_at.toISOString(),
  }));
}

export async function addEmployee(name: string, pin: string, location: string): Promise<EmployeeRecord> {
  await ensureSchema();
  const existing = await getPool().query(`SELECT id FROM employees WHERE lower(name) = lower($1)`, [name]);
  if ((existing.rowCount ?? 0) > 0) {
    throw new Error("An employee with this name already exists.");
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
  const result = await getPool().query(`DELETE FROM employees WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}

export async function findEmployeeByNamePin(name: string, pin: string): Promise<EmployeeRecord | undefined> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, pin, location, created_at FROM employees WHERE lower(name) = lower($1) AND pin = $2`,
    [name, pin]
  );
  if (rows.length === 0) return undefined;
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
  const { rows } = await getPool().query(`SELECT 1 FROM manager_settings WHERE id = 1`);
  return rows.length > 0;
}

export async function setManagerCode(code: string): Promise<void> {
  await ensureSchema();
  await getPool().query(
    `INSERT INTO manager_settings (id, code) VALUES (1, $1)
     ON CONFLICT (id) DO NOTHING`,
    [code]
  );
}

export async function verifyManagerCode(code: string): Promise<boolean> {
  await ensureSchema();
  const { rows } = await getPool().query(`SELECT code FROM manager_settings WHERE id = 1`);
  return rows.length > 0 && rows[0].code === code;
}
