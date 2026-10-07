import { NextResponse } from "next/server";
import { getOrgBySlug, isOrgAccessActive } from "@/lib/org";
import { verifyEmployeeLogin } from "@/lib/store";
import { setRepCookie } from "@/lib/rep-session";
import { burnVerifyTime } from "@/lib/secrets";

const GENERIC_FAILURE = "Dealership code, name or PIN is incorrect.";

// Public endpoint: an employee signs in with their dealership code, name and PIN.
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const dealerCode =
    typeof body.dealerCode === "string" ? body.dealerCode.trim().toLowerCase() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const pin = typeof body.pin === "string" ? body.pin : "";

  if (!dealerCode || !name || !pin) {
    return NextResponse.json(
      { error: "Enter your dealership code, name and PIN." },
      { status: 400 }
    );
  }

  const org = await getOrgBySlug(dealerCode);
  if (!org) {
    await burnVerifyTime(pin);
    return NextResponse.json({ error: GENERIC_FAILURE }, { status: 401 });
  }
  if (!isOrgAccessActive(org)) {
    return NextResponse.json(
      {
        error:
          "This dealership's training account isn't active right now. Please contact your manager.",
      },
      { status: 402 }
    );
  }

  const result = await verifyEmployeeLogin(org.id, name, pin);
  if (result.status === "locked") {
    const minutes = Math.max(1, Math.ceil(result.retryAfterSeconds / 60));
    return NextResponse.json(
      {
        error: `Too many incorrect attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}, or ask your manager to reset your PIN.`,
      },
      { status: 429, headers: { "Retry-After": String(result.retryAfterSeconds) } }
    );
  }
  if (result.status !== "ok") {
    return NextResponse.json({ error: GENERIC_FAILURE }, { status: 401 });
  }

  const res = NextResponse.json({
    name: result.employee.name,
    location: result.employee.location,
  });
  setRepCookie(res, org.id, result.employee.id, result.sessionKey);
  return res;
}
