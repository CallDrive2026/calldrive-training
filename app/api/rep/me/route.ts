import { NextResponse } from "next/server";
import { getRep } from "@/lib/rep-session";
import { isOrgAccessActive } from "@/lib/org";

// Who is signed in on this browser as an employee (if anyone).
export async function GET() {
  const rep = await getRep();
  if (!rep) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  return NextResponse.json({
    name: rep.employee.name,
    location: rep.employee.location,
    dealership: rep.org.name,
    active: isOrgAccessActive(rep.org),
  });
}
