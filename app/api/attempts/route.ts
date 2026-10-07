import { NextResponse } from "next/server";
import { listAttempts } from "@/lib/store";
import { getTenant } from "@/lib/tenant";

// Attempts are only ever recorded by the scoring endpoint
// (/api/attempts/score-call). Reading everyone's results is admin-only.
export async function GET() {
  const tenant = await getTenant({ requireAdmin: true });
  if (!tenant.ok) return tenant.response;
  return NextResponse.json(await listAttempts(tenant.ctx.org.id));
}
