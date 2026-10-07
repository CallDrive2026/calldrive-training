import { NextResponse } from "next/server";
import { decideSeatRequest } from "@/lib/org";
import { isPlatformAdmin } from "@/lib/tenant";

// Approve or deny a dealer's request for a larger team. Platform owner only.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isPlatformAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }
  const body = await request.json().catch(() => ({}));
  if (body.action !== "approve" && body.action !== "deny") {
    return NextResponse.json({ error: "Action must be approve or deny." }, { status: 400 });
  }
  const { id } = await params;
  const done = await decideSeatRequest(id, body.action === "approve");
  if (!done) {
    return NextResponse.json({ error: "No pending request found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
