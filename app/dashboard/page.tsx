import { DashboardClient } from "@/components/dashboard-client";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Manager Dashboard</h1>
      <p className="text-neutral-500 mb-8">
        Track completion and scores across employees and locations.
      </p>
      <DashboardClient />
    </div>
  );
}
