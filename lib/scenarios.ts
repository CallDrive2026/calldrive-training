import { LevelInfo, RoleInfo, Scenario, Level } from "@/types";

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
  // ---------- SALES ----------
  {
    id: "sales-price-inquiry",
    role: "sales",
    level: "newbie",
    title: "Price Inquiry on a Truck",
    situation:
      "A caller saw a specific truck online and wants to know if it's available and is comparing your price to a competitor's.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/af8071f7-9647-44b5-b8e8-493813c2fa5e.mp3",
    checklist: [
      "Confirmed the exact vehicle (VIN/stock number) before answering",
      "Asked discovery questions instead of just quoting a number",
      "Avoided giving away the deal over the phone",
      "Set a concrete next step (appointment, hold, or callback)",
      "Got the caller's name and phone number",
    ],
    questions: [
      {
        id: "q1",
        question: "What should you do BEFORE discussing price on this call?",
        options: [
          "Immediately quote your lowest possible price to win the deal",
          "Confirm the exact vehicle and ask a couple of discovery questions",
          "Tell them to check the website again",
          "Transfer them to voicemail",
        ],
        correctIndex: 1,
        explanation:
          "Confirming the vehicle and asking discovery questions builds rapport and avoids quoting the wrong unit or over-committing on price.",
      },
      {
        id: "q2",
        question: "The caller says a competitor has it cheaper. What's the best response?",
        options: [
          "Argue that the competitor is lying",
          "Immediately drop your price to match",
          "Acknowledge it, ask what they liked about the vehicle, and invite them in for a no-pressure look/appraisal",
          "Say nothing and move on",
        ],
        correctIndex: 2,
        explanation:
          "Acknowledging and redirecting to an in-person visit keeps control of the conversation without a race-to-the-bottom on price.",
      },
      {
        id: "q3",
        question: "What must you capture before ending the call?",
        options: [
          "Nothing, just say goodbye",
          "Their name and phone number, plus a next step",
          "Their social media handle",
          "A downpayment over the phone",
        ],
        correctIndex: 1,
        explanation: "Every inbound call should end with contact info and a clear next step.",
      },
    ],
    passingScore: 70,
  },
]
