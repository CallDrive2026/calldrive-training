import { notFound } from "next/navigation";
import { ROLES, getScenariosByRole } from "@/lib/scenarios";
import { RoleScenarios } from "@/components/role-scenarios";

export default async function RolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const roleInfo = ROLES.find((r) => r.id === role);
  if (!roleInfo) notFound();
  const scenarios = getScenariosByRole(role);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <p className="text-sm text-[#152645] font-medium mb-1">{roleInfo.label} Training</p>
      <h1 className="text-3xl font-bold mb-2">Practice Scenarios</h1>
      <p className="text-neutral-500 mb-8">{roleInfo.description}</p>

      <RoleScenarios role={role} scenarios={scenarios} />
    </div>
  );
}
