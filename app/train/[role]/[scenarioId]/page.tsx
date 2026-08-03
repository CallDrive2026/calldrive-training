import { notFound } from "next/navigation";
import { getScenario, ROLES } from "@/lib/scenarios";
import { ScenarioPractice } from "@/components/scenario-practice";

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ role: string; scenarioId: string }>;
}) {
  const { role, scenarioId } = await params;
  const scenario = getScenario(scenarioId);
  const roleInfo = ROLES.find((r) => r.id === role);
  if (!scenario || !roleInfo || scenario.role !== role) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <ScenarioPractice scenario={scenario} roleLabel={roleInfo.label} />
    </div>
  );
}
