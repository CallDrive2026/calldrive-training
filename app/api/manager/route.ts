import { NextResponse } from "next/server";
import { isManagerCodeSet, setManagerCodeIfUnset } from "@/lib/store";
import { requireManagerCode } from "@/lib/code-guard";
import { getTenant } from "@/lib/tenant";

export async function GET() {
  const tenant = await getTenant({ allowExpired: true });
  if (!tenant.ok) return tenant.response;
  return NextResponse.json({
    codeSet: await isManagerCodeSet(tenant.ctx.org.id),
    // Only organization admins may create the code.
    canSet: tenant.ctx.isAdmin,
  });
}

export async function POST(request: Request) {
  const tenant = await getTenant({ allowExpired: true });
  if (!tenant.ok) return tenant.response;
  const orgId = tenant.ctx.org.id;

  const body = await request.json().catch(() => ({}));
  const code = typeof body.code === "string" ? body.code : "";
  const mode = body.mode;

  if (code.length < 4) {
    return NextResponse.json({ error: "Code must be at least 4 characters." }, { status: 400 });
  }

  if (mode === "set") {
    if (!tenant.ctx.isAdmin) {
      return NextResponse.json(
        { error: "Only an organization admin can create the manager code." },
        { status: 403 }
      );
    }
    const created = await setManagerCodeIfUnset(orgId, code);
    if (!created) {
      return NextResponse.json({ error: "A manager code is already set." }, { status: 409 });
    }
    return NextResponse.json({ ok: true });
  }

  // mode === "verify"
  const denied = await requireManagerCode(orgId, code);
  if (denied) return denied;
  return NextResponse.json({ ok: true });
}
