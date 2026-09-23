import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getOrCreateOrgForClerkOrg, isOrgAccessActive } from "@/lib/org";

export default async function TrainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, orgId, orgSlug } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  if (!orgId) {
    redirect("/onboarding");
  }

  let orgName = orgSlug || "Dealer Group";
  try {
    const client = await clerkClient();
    const clerkOrg = await client.organizations.getOrganization({
      organizationId: orgId,
    });
    orgName = clerkOrg.name || orgName;
  } catch {
    // fall back to slug if Clerk lookup fails
  }

  const org = await getOrCreateOrgForClerkOrg(orgId, orgName);

  if (!isOrgAccessActive(org)) {
    redirect("/pricing?trialEnded=1");
  }

  return <>{children}</>;
}
