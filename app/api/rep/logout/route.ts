import { NextResponse } from "next/server";
import { clearRepCookie } from "@/lib/rep-session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  clearRepCookie(res);
  return res;
}
