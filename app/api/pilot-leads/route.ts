import { NextResponse } from "next/server";
import { addPilotLead, listPilotLeads } from "@/lib/store";
import { isPlatformAdmin } from "@/lib/tenant";

// Pilot leads are the platform owner's own sales leads (names + work emails).
// They are visible only to admins of the platform owner's organization, never
// to customer organizations.
export async function GET() {
  if (!(await isPlatformAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }
  const leads = await listPilotLeads();
  return NextResponse.json(leads);
}

// Public: the marketing site's pilot application form submits here.
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
