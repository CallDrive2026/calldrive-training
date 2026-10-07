import { NextResponse } from "next/server";
import {
  isManagerCodeSet,
  setManagerCodeIfUnset,
  verifyManagerCode,
} from "@/lib/store";
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
  const { code, mode } = body;

  if (!code || String(code).length < 4) {
    return NextResponse.json({ error: "Code must be at least 4 characters." }, { status: 400 });
  }

  if (mode === "set") {
    if (!tenant.ctx.isAdmin) {
      return NextResponse.json(
        { error: "Only an organization admin can create the manager code." },
        { status: 403 }
      );
    }
    const created = await setManagerCodeIfUnset(orgId, String(code));
    if (!created) {
      return NextResponse.json({ error: "A manager code is already set." }, { status: 409 });
    }
    return NextResponse.json({ ok: true });
  }

  // mode === "verify"
  if (!(await isManagerCodeSet(orgId))) {
    return NextResponse.json({ error: "No manager code has been set yet." }, { status: 400 });
  }
  if (!(await verifyManagerCode(orgId, String(code)))) {
    return NextResponse.json({ error: "Incorrect manager code." }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
