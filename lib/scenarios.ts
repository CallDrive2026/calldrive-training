import { LevelInfo, RoleInfo, Scenario, Level } from "@/types";
import { scenariosPart1 } from "./scenario-data-part1";
import { scenariosPart2 } from "./scenario-data-part2";
import { scenariosPart3 } from "./scenario-data-part3";
import { scenariosPart4 } from "./scenario-data-part4";
import { scenariosPart5 } from "./scenario-data-part5";
import { scenariosPart6 } from "./scenario-data-part6";


export const ROLES: RoleInfo[] = [
  {
    id: "sales",
    label: "Salesperson",
    description: "Handle price, availability, trade-in, financing, and lease vs. buy inbound calls.",
  },
  {
    id: "reception",
    label: "Receptionist",
    description: "Greet, triage, and route inbound calls to the right department.",
  },
  {
    id: "service",
    label: "Service Advisor",
    description: "Handle status checks, scheduling, recalls, warranty, and frustrated customers.",
  },
];

export const LEVELS: LevelInfo[] = [
  {
    id: "newbie",
    label: "Newbie",
    description: "Straightforward calls to build the fundamentals.",
  },
  {
    id: "seasoned",
    label: "Seasoned Vet",
    description: "More nuanced calls that require judgment and follow-through.",
  },
  {
    id: "superstar",
    label: "Superstar Professional",
    description: "High-pressure calls: aggressive price/payment demands, financing pushback, and disputes.",
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
