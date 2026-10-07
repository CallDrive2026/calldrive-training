import { NextResponse } from "next/server";
import { createSeatRequest, isValidLimit } from "@/lib/org";
import { getTenant } from "@/lib/tenant";

// A dealer asks the platform owner for a larger team limit.
export async function POST(request: Request) {
  const tenant = await getTenant({ requireAdmin: true });
  if (!tenant.ok) return tenant.response;

  const body = await request.json().catch(() => ({}));
  const requestedLimit = Number(body.requestedLimit);
  const note =
    typeof body.note === "string" && body.note.trim() ? body.note.trim().slice(0, 500) : null;

  if (!isValidLimit(requestedLimit)) {
    return NextResponse.json(
      { error: "Enter a whole number of team members." },
      { status: 400 }
    );
  }

  try {
    const created = await createSeatRequest(tenant.ctx.org.id, requestedLimit, note);
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Could not send your request." },
      { status: 409 }
    );
  }
}
