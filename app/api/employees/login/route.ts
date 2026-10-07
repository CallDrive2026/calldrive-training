import { NextResponse } from "next/server";
import { findEmployeeByNamePin } from "@/lib/store";
import { getTenant } from "@/lib/tenant";

export async function POST(request: Request) {
  const tenant = await getTenant();
  if (!tenant.ok) return tenant.response;

  const body = await request.json().catch(() => ({}));
  const { name, pin } = body;
  const employee = await findEmployeeByNamePin(
    tenant.ctx.org.id,
    typeof name === "string" ? name : "",
    typeof pin === "string" ? pin : ""
  );
  if (!employee) {
    return NextResponse.json({ error: "Name or PIN is incorrect." }, { status: 401 });
  }
  return NextResponse.json({
    id: employee.id,
    name: employee.name,
    location: employee.location,
  });
}
