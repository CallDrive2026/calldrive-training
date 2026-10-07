import { NextResponse } from "next/server";
import { getRep } from "@/lib/rep-session";
import { listPassedScenarioIds } from "@/lib/store";

// The scenarios THIS employee has passed. Progress follows the person, not
// the device, so a shared tablet no longer unlocks levels for the next rep.
export async function GET() {
  const rep = await getRep();
  if (!rep) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const passedIds = await listPassedScenarioIds(rep.org.id, rep.employee.name);
  return NextResponse.json({ passedIds });
}
