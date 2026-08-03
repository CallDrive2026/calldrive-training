import { NextResponse } from "next/server";
import { findEmployeeByNamePin } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, pin } = body;
  const employee = await findEmployeeByNamePin(name || "", pin || "");
  if (!employee) {
    return NextResponse.json({ error: "Name or PIN is incorrect." }, { status: 401 });
  }
  return NextResponse.json({
    id: employee.id,
    name: employee.name,
    location: employee.location,
  });
}
