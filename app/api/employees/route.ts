import { NextResponse } from "next/server";
import { SeatLimitError, addEmployee, listEmployees } from "@/lib/store";
import { getTenant } from "@/lib/tenant";

const PIN_PATTERN = /^\d{4,12}$/;

// The dealership's team list (names and locations only, never PINs). Admin-only.
export async function GET() {
  const tenant = await getTenant({ requireAdmin: true });
  if (!tenant.ok) return tenant.response;
  return NextResponse.json(await listEmployees(tenant.ctx.org.id));
}

// Add a team member. Limited per account; going past the limit needs the
// platform owner's approval (see /api/seat-requests).
export async function POST(request: Request) {
  const tenant = await getTenant({ requireAdmin: true });
  if (!tenant.ok) return tenant.response;

  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const pin = typeof body.pin === "string" ? body.pin : "";
  const location =
    typeof body.location === "string" && body.location.trim()
      ? body.location.trim().slice(0, 80)
      : "Unspecified";

  if (!name || name.length > 80) {
    return NextResponse.json({ error: "Enter the employee's name." }, { status: 400 });
  }
  if (!PIN_PATTERN.test(pin)) {
    return NextResponse.json({ error: "PIN must be 4 to 12 digits." }, { status: 400 });
  }

  try {
    const employee = await addEmployee(tenant.ctx.org.id, name, pin, location);
    return NextResponse.json(
      { id: employee.id, name: employee.name, location: employee.location },
      { status: 201 }
    );
  } catch (e) {
    if (e instanceof SeatLimitError) {
      return NextResponse.json(
        {
          error: `Your account is limited to ${e.limit} team members. Request more and the platform owner will review it.`,
          code: "seat_limit",
          limit: e.limit,
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Could not create employee." },
      { status: 409 }
    );
  }
}
