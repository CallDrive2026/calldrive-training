import { OrganizationProfile } from "@clerk/nextjs";

export default function OrgSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex justify-center">
      <OrganizationProfile />
    </div>
  );
}
