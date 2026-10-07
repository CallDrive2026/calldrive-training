import { redirect } from "next/navigation";
import { isPlatformAdmin } from "@/lib/tenant";
import { PlatformAdmin } from "@/components/platform-admin";

export default async function PlatformPage() {
  if (!(await isPlatformAdmin())) redirect("/");

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Platform Admin</h1>
      <p className="text-neutral-500 mb-8">
        Review requests for larger teams and set each dealership&apos;s team limit. Only you can
        see this page.
      </p>
      <PlatformAdmin />
    </div>
  );
}
