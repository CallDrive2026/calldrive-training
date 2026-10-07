import { NextResponse } from "next/server";
import { deleteEmployee, resetEmployeePin } from "@/lib/store";
import { requireManagerCode } from "@/lib/code-guard";
import { getTenant } from "@/lib/tenant";

const PIN_PATTERN = /^\d{4,12}$/;

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const tenant = await getTenant({ requireAdmin: true });
  if (!tenant.ok) return tenant.response;

  const body = await request.json().catch(() => ({}));
  const denied = await requireManagerCode(
    tenant.ctx.org.id,
    typeof body?.code === "string" ? body.code : ""
  );
  if (denied) return denied;

  const { id } = await params;
  const success = await deleteEmployee(tenant.ctx.org.id, id);
  if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}

// Reset an employee's PIN (also clears a lockout).
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const tenant = await getTenant({ requireAdmin: true });
  if (!tenant.ok) return tenant.response;

  const body = await request.json().catch(() => ({}));
  const pin = typeof body?.pin === "string" ? body.pin : "";
  if (!PIN_PATTERN.test(pin)) {
    return NextResponse.json({ error: "PIN must be 4 to 12 digits." }, { status: 400 });
  }
  const denied = await requireManagerCode(
    tenant.ctx.org.id,
    typeof body?.code === "string" ? body.code : ""
  );
  if (denied) return denied;

  const { id } = await params;
  const success = await resetEmployeePin(tenant.ctx.org.id, id, pin);
  if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
