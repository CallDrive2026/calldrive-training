import { NextResponse } from "next/server";
import { checkManagerCode } from "@/lib/store";

/**
 * Confirms the organization's manager code. Returns an error response to send
 * back if the code is missing, wrong or temporarily locked, otherwise null.
 */
export async function requireManagerCode(
  orgId: string,
  code: string
): Promise<NextResponse | null> {
  if (!code) {
    return NextResponse.json({ error: "Manager code required." }, { status: 401 });
  }
  const result = await checkManagerCode(orgId, code);
  switch (result.status) {
    case "ok":
      return null;
    case "unset":
      return NextResponse.json(
        { error: "No manager code has been set yet." },
        { status: 400 }
      );
    case "locked": {
      const minutes = Math.max(1, Math.ceil(result.retryAfterSeconds / 60));
      return NextResponse.json(
        {
          error: `Too many incorrect attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
        },
        { status: 429, headers: { "Retry-After": String(result.retryAfterSeconds) } }
      );
    }
    default:
      return NextResponse.json({ error: "Incorrect manager code." }, { status: 401 });
  }
}
