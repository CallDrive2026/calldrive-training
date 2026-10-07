import { NextResponse } from "next/server";
import { deleteEmployee, verifyManagerCode } from "@/lib/store";
import { getTenant } from "@/lib/tenant";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const tenant = await getTenant({ requireAdmin: true });
  if (!tenant.ok) return tenant.response;

  let code = "";
  try {
    const body = await request.json();
    code = typeof body?.code === "string" ? body.code : "";
  } catch {
    // no body supplied
  }
  if (!code || !(await verifyManagerCode(tenant.ctx.org.id, code))) {
    return NextResponse.json({ error: "Incorrect manager code." }, { status: 401 });
  }

  const { id } = await params;
  const success = await deleteEmployee(tenant.ctx.org.id, id);
  if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
