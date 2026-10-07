import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { signToken, verifyToken } from "@/lib/secrets";
import { Organization, getOrgById } from "@/lib/org";
import { EmployeeRecord, getEmployeeForSession } from "@/lib/store";

// Employees do not have Clerk accounts. After they sign in with their
// dealership code, name and PIN, they get this signed cookie. The cookie only
// carries two ids; the employee's details are always re-read from the
// database, so deleting an employee ends their session immediately.

export const REP_COOKIE = "cd_rep";
const SESSION_SECONDS = 60 * 60 * 12; // 12 hours

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export function setRepCookie(
  res: NextResponse,
  orgId: string,
  employeeId: string,
  sessionKey: string
) {
  res.cookies.set(REP_COOKIE, signToken({ o: orgId, e: employeeId, k: sessionKey }, SESSION_SECONDS), {
    ...cookieOptions,
    maxAge: SESSION_SECONDS,
  });
}

export function clearRepCookie(res: NextResponse) {
  res.cookies.set(REP_COOKIE, "", { ...cookieOptions, maxAge: 0 });
}

export interface RepContext {
  org: Organization;
  employee: EmployeeRecord;
}

/** The signed-in employee and their dealership, or null if there is no valid session. */
export async function getRep(): Promise<RepContext | null> {
  const token = (await cookies()).get(REP_COOKIE)?.value;
  const claims = verifyToken<{ o: string; e: string; k: string }>(token);
  if (
    !claims ||
    typeof claims.o !== "string" ||
    typeof claims.e !== "string" ||
    typeof claims.k !== "string"
  ) {
    return null;
  }
  const org = await getOrgById(claims.o);
  if (!org) return null;
  const found = await getEmployeeForSession(org.id, claims.e);
  // A changed PIN or a deleted employee ends the session.
  if (!found || found.sessionKey !== claims.k) return null;
  return { org, employee: found.employee };
}
