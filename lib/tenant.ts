import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  Organization,
  createTrialOrg,
  getOrgByClerkId,
  isOrgAccessActive,
} from "@/lib/org";

export interface TenantContext {
  org: Organization;
  userId: string;
  isAdmin: boolean;
}

export type TenantResult =
  | { ok: true; ctx: TenantContext }
  | { ok: false; response: NextResponse };

function fail(status: number, error: string): TenantResult {
  return { ok: false, response: NextResponse.json({ error }, { status }) };
}

async function resolveOrg(clerkOrgId: string): Promise<Organization> {
  const existing = await getOrgByClerkId(clerkOrgId);
  if (existing) return existing;

  let name = "Dealer Group";
  try {
    const client = await clerkClient();
    const clerkOrg = await client.organizations.getOrganization({
      organizationId: clerkOrgId,
    });
    name = clerkOrg.name || name;
  } catch {
    // fall back to the default name if Clerk can't be reached
  }
  return createTrialOrg(clerkOrgId, name);
}

/**
 * Identifies the caller's organization from their signed-in session. The
 * organization is NEVER taken from the request body, query string or any
 * browser-supplied value, so one customer cannot reach another's data.
 *
 * - requireAdmin: caller must hold the Clerk `org:admin` role.
 * - allowExpired: skip the active-trial/subscription check (billing pages).
 */
export async function getTenant(
  options: { requireAdmin?: boolean; allowExpired?: boolean } = {}
): Promise<TenantResult> {
  const { userId, orgId, has } = await auth();
  if (!userId) return fail(401, "Please sign in.");
  if (!orgId) return fail(403, "Select or create an organization first.");

  const org = await resolveOrg(orgId);
  if (!options.allowExpired && !isOrgAccessActive(org)) {
    return fail(
      402,
      "Your trial or subscription is not active. Visit Pricing to continue."
    );
  }

  const isAdmin = has({ role: "org:admin" });
  if (options.requireAdmin && !isAdmin) {
    return fail(403, "Only organization admins can do this.");
  }
  return { ok: true, ctx: { org, userId, isAdmin } };
}

/**
 * True only for admins of the platform owner's organization
 * (PLATFORM_CLERK_ORG_ID). Used for platform-wide data such as pilot leads.
 */
export async function isPlatformAdmin(): Promise<boolean> {
  const platformOrgId = process.env.PLATFORM_CLERK_ORG_ID;
  if (!platformOrgId) return false;
  const { userId, orgId, has } = await auth();
  return Boolean(userId) && orgId === platformOrgId && has({ role: "org:admin" });
}

/** Page-level guard: sign in, pick an organization, active trial/subscription. */
export async function requirePageOrg(): Promise<Organization> {
  const { userId, orgId } = await auth();
  if (!userId) redirect("/sign-in");
  if (!orgId) redirect("/onboarding");
  const org = await resolveOrg(orgId);
  if (!isOrgAccessActive(org)) redirect("/pricing?trialEnded=1");
  return org;
}
