import { NextResponse } from "next/server";
import { verifyManagerCode } from "@/lib/store";
import { deleteParticipant } from "@/lib/participants";

export async function DELETE(request: Request) {
  let body: { name?: unknown; code?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const code = typeof body.code === "string" ? body.code : "";

  if (!name) {
    return NextResponse.json(
      { error: "A participant name is required." },
      { status: 400 }
    );
  }
  if (!code || !(await verifyManagerCode(code))) {
    return NextResponse.json(
      { error: "Incorrect manager code." },
      { status: 401 }
    );
  }

  try {
    const result = await deleteParticipant(name);
    if (!result.accountRemoved && result.attemptsRemoved === 0) {
      return NextResponse.json(
        { error: "Participant not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, ...result });
  } catch {
    return NextResponse.json(
      { error: "Could not delete participant." },
      { status: 500 }
    );
  }
}
