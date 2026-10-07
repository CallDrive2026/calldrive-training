import { NextResponse } from "next/server";
import { addEmployee, listEmployees } from "@/lib/store";
import { getTenant } from "@/lib/tenant";

// Names and locations only (never PINs). Any member of the organization may
// read this list; it powers the employee sign-in suggestions.
export async function GET() {
  const tenant = await getTenant();
  if (!tenant.ok) return tenant.response;
  const employees = (await listEmployees(tenant.ctx.org.id)).map((e) => ({
    id: e.id,
    name: e.name,
    location: e.location,
    createdAt: e.createdAt,
  }));
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const tenant = await getTenant({ requireAdmin: true });
  if (!tenant.ok) return tenant.response;

  const body = await request.json().catch(() => ({}));
  const { name, pin, location } = body;
  if (!name || !pin || String(pin).length < 4) {
    return NextResponse.json(
      { error: "Name and a 4+ digit PIN are required." },
      { status: 400 }
    );
  }
  try {
    const employee = await addEmployee(
      tenant.ctx.org.id,
      String(name).trim(),
      String(pin),
      location ? String(location).trim() : "Unspecified"
    );
    return NextResponse.json(
      { id: employee.id, name: employee.name, location: employee.location },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Could not create employee." },
      { status: 409 }
    );
  }
}
