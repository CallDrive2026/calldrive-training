import { NextResponse } from "next/server";
import { getTeamSummary } from "@/lib/org";
import { getTenant } from "@/lib/tenant";

// Team size, limit, the employee sign-in code, and any pending seat request.
export async function GET() {
  const tenant = await getTenant({ requireAdmin: true });
  if (!tenant.ok) return tenant.response;
  const { org } = tenant.ctx;
  const summary = await getTeamSummary(org.id);
  return NextResponse.json({
    dealership: org.name,
    accessSlug: org.accessSlug,
    ...summary,
  });
}
