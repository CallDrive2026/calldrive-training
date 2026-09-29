import { LevelInfo, RoleInfo, Scenario, Level } from "@/types";
import { scenariosPart1 } from "./scenario-data-part1";
import { scenariosPart2 } from "./scenario-data-part2";
import { scenariosPart3 } from "./scenario-data-part3";
import { scenariosPart4 } from "./scenario-data-part4";
import { scenariosPart5 } from "./scenario-data-part5";
import { scenariosPart6 } from "./scenario-data-part6";
import { scenariosPart7 } from "./scenario-data-part7";
import { scenariosPart8 } from "./scenario-data-part8";
import { scenariosPart9 } from "./scenario-data-part9";
import { scenariosPart10 } from "./scenario-data-part10";

export const ROLES: RoleInfo[] = [
  {
    id: "sales",
    label: "Sales",
    description: "Handle inbound sales calls from prospective car buyers.",
  },
  {
    id: "reception",
    label: "Reception",
    description: "Handle inbound calls at the front desk and route them correctly.",
  },
  {
    id: "service",
    label: "Service",
    description: "Handle inbound service department calls from current customers.",
  },
];

export const LEVELS: LevelInfo[] = [
  {
    id: "newbie",
    label: "Newbie",
    description: "Foundational scenarios for new hires.",
  },
  {
    id: "seasoned",
    label: "Seasoned Vet",
    description: "Trickier scenarios requiring more judgment.",
  },
  {
    id: "superstar",
    label: "Superstar Pro",
    description: "Advanced, high-stakes scenarios for top performers.",
  },
];

export const LEVEL_ORDER: Level[] = ["newbie", "seasoned", "superstar"];

export const SCENARIOS: Scenario[] = [
  ...scenariosPart1,
  ...scenariosPart2,
  ...scenariosPart3,
  ...scenariosPart4,
  ...scenariosPart5,
  ...scenariosPart6,
  ...scenariosPart7,
  ...scenariosPart8,
  ...scenariosPart9,
  ...scenariosPart10,
];

export function getScenariosByRole(role: string): Scenario[] {
  return SCENARIOS.filter((s) => s.role === role);
}

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

export const CERTIFICATE_IMAGE_URL =
  "https://galaxy-prod.tlcdn.com/gen/user_39iXjxyQdmhoj5bVhki8e1ab0c2/d2265a3a-0a30-481a-b641-145f174ea628.png";
export const LOGO_IMAGE_URL =
  "https://g.tlcdn.com/view/b58ea86ca3b945e195fd75ead218643e.png";
