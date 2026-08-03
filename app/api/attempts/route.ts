import { NextResponse } from "next/server";
import { addAttempt, listAttempts } from "@/lib/store";

export async function GET() {
  const attempts = await listAttempts();
  return NextResponse.json(attempts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const attempt = await addAttempt({
    employeeName: body.employeeName || "Anonymous",
    location: body.location || "Unspecified",
    role: body.role,
    scenarioId: body.scenarioId,
    scenarioTitle: body.scenarioTitle,
    score: body.score,
    passed: body.passed,
  });
  return NextResponse.json(attempt, { status: 201 });
}
