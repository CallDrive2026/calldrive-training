import { NextResponse } from "next/server";
import { addPilotLead, listPilotLeads } from "@/lib/store";

export async function GET() {
  const leads = await listPilotLeads();
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, workEmail, goal } = body;
  if (!name || !workEmail) {
    return NextResponse.json(
      { error: "Name and work email are required." },
      { status: 400 }
    );
  }
  const lead = await addPilotLead({
    name: String(name).trim(),
    workEmail: String(workEmail).trim(),
    goal: goal ? String(goal).trim() : null,
  });
  return NextResponse.json(lead, { status: 201 });
}
