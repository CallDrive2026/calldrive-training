import { getPool, ensureSchema } from "@/lib/db";

export interface DeleteParticipantResult {
  accountRemoved: boolean;
  attemptsRemoved: number;
}

/**
 * Permanently removes a participant: their login account (if one exists)
 * and every training attempt recorded under their name. Runs in a single
 * transaction so it either fully succeeds or leaves everything untouched.
 */
export async function deleteParticipant(
  name: string
): Promise<DeleteParticipantResult> {
  await ensureSchema();
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const attempts = await client.query(
      `DELETE FROM attempts WHERE employee_name = $1`,
      [name]
    );
    const account = await client.query(
      `DELETE FROM employees WHERE name = $1`,
      [name]
    );
    await client.query("COMMIT");
    return {
      accountRemoved: (account.rowCount ?? 0) > 0,
      attemptsRemoved: attempts.rowCount ?? 0,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
