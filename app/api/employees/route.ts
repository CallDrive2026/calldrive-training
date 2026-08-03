import { NextResponse } from "next/server";
import { addEmployee, listEmployees } from "@/lib/store";

export async function GET() {
  const employees = (await listEmployees()).map((e) => ({
    id: e.id,
    name: e.name,
    location: e.location,
    createdAt: e.createdAt,
  }));
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, pin, location } = body;
  if (!name || !pin || pin.length < 4) {
    return NextResponse.json(
      { error: "Name and a 4+ digit PIN are required." },
      { status: 400 }
    );
  }
  try {
    const employee = await addEmployee(name.trim(), pin, location?.trim() || "Unspecified");
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
