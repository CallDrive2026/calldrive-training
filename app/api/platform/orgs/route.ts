import { NextResponse } from "next/server";
import { listOrgsForPlatform } from "@/lib/org";
import { isPlatformAdmin } from "@/lib/tenant";

// Every dealership account with team size, limit and any pending request.
// Platform owner only.
export async function GET() {
  if (!(await isPlatformAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }
  return NextResponse.json(await listOrgsForPlatform());
}
