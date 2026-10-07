import { requirePageOrg } from "@/lib/tenant";

export default async function Layout({ children }: { children: React.ReactNode }) {
  await requirePageOrg();
  return <>{children}</>;
}
