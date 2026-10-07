import { NextResponse } from "next/server";
import { deleteParticipant } from "@/lib/participants";
import { requireManagerCode } from "@/lib/code-guard";
import { getTenant } from "@/lib/tenant";

export async function DELETE(request: Request) {
  const tenant = await getTenant({ requireAdmin: true });
  if (!tenant.ok) return tenant.response;
  const orgId = tenant.ctx.org.id;

  let body: { name?: unknown; code?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const code = typeof body.code === "string" ? body.code : "";

  if (!name) {
    return NextResponse.json(
      { error: "A participant name is required." },
      { status: 400 }
    );
  }
  const denied = await requireManagerCode(orgId, code);
  if (denied) return denied;

  try {
    const result = await deleteParticipant(orgId, name);
    if (!result.accountRemoved && result.attemptsRemoved === 0) {
      return NextResponse.json(
        { error: "Participant not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, ...result });
  } catch {
    return NextResponse.json(
      { error: "Could not delete participant." },
      { status: 500 }
    );
  }
}
