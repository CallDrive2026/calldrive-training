import { NextResponse } from "next/server";
import { isValidLimit, setEmployeeLimit } from "@/lib/org";
import { isPlatformAdmin } from "@/lib/tenant";

// Set a dealership's team-size limit directly. Platform owner only.
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isPlatformAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }
  const body = await request.json().catch(() => ({}));
  const employeeLimit = Number(body.employeeLimit);
  if (!isValidLimit(employeeLimit)) {
    return NextResponse.json({ error: "Enter a whole number of team members." }, { status: 400 });
  }
  const { id } = await params;
  const updated = await setEmployeeLimit(id, employeeLimit);
  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ success: true, employeeLimit });
}
