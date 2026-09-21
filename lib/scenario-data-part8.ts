import { Scenario } from "@/types";

export const scenariosPart8: Scenario[] = [
  {
    id: "reception-multiple-callback-requests",
    role: "reception",
    level: "seasoned",
    title: "Repeated Repair Status Callbacks",
    situation:
      "A caller says this is their third call today because they keep being told someone will call back about their repair status, and it never happens.",
    audioUrl:
      "https://static.magica.com/e980dd8ddcfe4bc0a3dc43793f54d13f.mp3",
    checklist: [
      "Acknowledged the frustration without getting defensive",
      "Prioritized getting them a real answer now instead of promising another callback",
      "Looked up the actual repair status rather than guessing",
      "Took ownership of following through this time",
      "Set a specific, realistic expectation if an immediate answer isn't possible",
    ],
    questions: [
      {
        id: "q1",
        question: "The caller says this is their third call today about the same issue. First move?",
        options: [
          "Tell them to stop calling",
          "Acknowledge the frustration and prioritize getting a real answer now",
          "Promise a fourth callback",
          "Argue about whether it was really three calls",
        ],
        correctIndex: 1,
        explanation: "Acknowledging the frustration and prioritizing immediate action addresses the real problem.",
      },
      {
        id: "q2",
        question: "What should you do before promising anything else?",
        options: [
          "Nothing, just apologize and hang up",
          "Actually look up the real repair status",
          "Guess at a status to sound helpful",
          "Transfer them randomly",
        ],
        correctIndex: 1,
        explanation: "Checking the actual status avoids giving another inaccurate promise.",
      },
      {
        id: "q3",
        question: "If you can't get them a final answer immediately, what should you do?",
        options: [
          "Give a vague \"someone will call\"",
          "Set a specific, realistic time and take ownership of following through",
          "Say nothing further",
          "Blame the service department",
        ],
        correctIndex: 1,
        explanation: "A specific, owned commitment is more credible after repeated missed callbacks.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "reception-vip-customer-recognition",
    role: "reception",
    level: "superstar",
    title: "Long-Time Customer Expecting Recognition",
    situation:
      "A caller who has purchased six vehicles from the dealership over fifteen years is frustrated at being treated like a first-time caller and wants someone who knows their history.",
    audioUrl:
      "https://static.magica.com/972c656f2fe54bed9e9f69d83e8660a5.mp3",
    checklist: [
      "Acknowledged their loyalty and history genuinely, not dismissively",
      "Attempted to pull up their account/history rather than treating them generically",
      "Avoided being defensive about the current process",
      "Escalated to someone with more context or authority if appropriate",
      "Made them feel recognized before ending the call",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you respond to a loyal customer who feels unrecognized?",
        options: [
          "Tell them everyone gets treated the same regardless of history",
          "Genuinely acknowledge their loyalty and try to pull up their account",
          "Argue that the system doesn't track that",
          "Rush them off the phone",
        ],
        correctIndex: 1,
        explanation: "Genuine acknowledgment plus an actual attempt to find their history shows they matter.",
      },
      {
        id: "q2",
        question: "If you can't immediately access their full history, what should you do?",
        options: [
          "Tell them their history doesn't exist",
          "Escalate to someone with more context or authority",
          "Guess at details to sound informed",
          "End the call without resolution",
        ],
        correctIndex: 1,
        explanation: "Escalating to someone who can actually access their full record respects their long relationship with the dealership.",
      },
      {
        id: "q3",
        question: "What's the goal of this call?",
        options: [
          "Get them off the phone quickly",
          "Make them feel genuinely recognized as a long-time customer",
          "Argue about the fairness of the process",
          "Promise something you can't verify",
        ],
        correctIndex: 1,
        explanation: "For a customer with this much history, feeling recognized is the actual outcome that matters.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "service-financing-warranty-combo",
    role: "service",
    level: "superstar",
    title: "Repair Cost, Financing, and Warranty Combined",
    situation:
      "A customer is upset that a repair costs more than expected and wants to know if it can be financed and whether any of it is covered under their remaining factory warranty.",
    audioUrl:
      "https://static.magica.com/90264548da5e4ba4a201e88f0d231130.mp3",
    checklist: [
      "Checked the actual warranty coverage before answering definitively",
      "Explained clearly what is and isn't covered",
      "Offered real financing options if available, without overpromising",
      "Stayed calm and non-defensive about the higher-than-expected cost",
      "Gave a clear next step regardless of what's covered",
    ],
    questions: [
      {
        id: "q1",
        question: "Before answering the warranty question, you should:",
        options: [
          "Guess based on typical coverage",
          "Check their actual warranty terms and remaining coverage",
          "Tell them nothing is ever covered",
          "Assume everything is covered to keep them happy",
        ],
        correctIndex: 1,
        explanation: "Warranty coverage varies by vehicle and mileage — checking the actual terms avoids a wrong answer either way.",
      },
      {
        id: "q2",
        question: "If part of the repair isn't covered, how should you discuss financing?",
        options: [
          "Refuse to discuss it",
          "Explain any real financing options available for the uncovered portion",
          "Promise a payment plan that doesn't exist",
          "Tell them to figure it out themselves",
        ],
        correctIndex: 1,
        explanation: "Offering real, available financing options helps solve their actual problem.",
      },
      {
        id: "q3",
        question: "How should you handle their frustration about the higher-than-expected cost?",
        options: [
          "Get defensive about the price",
          "Stay calm and explain clearly what's covered and what isn't",
          "Argue that they should have expected it",
          "Ignore the frustration and move on",
        ],
        correctIndex: 1,
        explanation: "Calm, clear explanations help even an unhappy customer understand and trust the outcome.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "service-exact-payment-calculation",
    role: "service",
    level: "superstar",
    title: "Exact Repair Total With No Surprises",
    situation:
      "A customer wants the exact total cost, including tax and labor, for a previously discussed brake job, and explicitly says they don't want any surprises at pickup.",
    audioUrl:
      "https://static.magica.com/237dd0be82c2460eac752cce29db6e66.mp3",
    checklist: [
      "Pulled up the actual quote rather than estimating from memory",
      "Broke down parts, labor, and tax clearly",
      "Confirmed whether the number could still change (e.g. pending inspection)",
      "Avoided vague reassurances without real numbers",
      "Set clear expectations for pickup",
    ],
    questions: [
      {
        id: "q1",
        question: "Before giving the exact total, you should:",
        options: [
          "Estimate from memory",
          "Pull up the actual quote/work order for accurate numbers",
          "Round up significantly to be safe",
          "Refuse to give a number until pickup",
        ],
        correctIndex: 1,
        explanation: "The actual work order has the real parts, labor, and tax breakdown — memory estimates risk being wrong.",
      },
      {
        id: "q2",
        question: "How should you present the total?",
        options: [
          "One lump number with no breakdown",
          "A clear breakdown of parts, labor, and tax",
          "Refuse to break it down",
          "Only the labor cost",
        ],
        correctIndex: 1,
        explanation: "A clear breakdown builds trust and avoids the \"surprise\" the customer explicitly asked to avoid.",
      },
      {
        id: "q3",
        question: "If the number could still change (e.g. additional findings during the repair), you should:",
        options: [
          "Hide that possibility",
          "Clearly mention it so there are truly no surprises",
          "Guarantee it won't change even if it might",
          "Avoid answering the question",
        ],
        correctIndex: 1,
        explanation: "Being upfront about any possible change is exactly what prevents a surprise at pickup.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "service-oil-change-reminder",
    role: "service",
    level: "newbie",
    title: "Postcard Service Reminder Call",
    situation:
      "A caller got a postcard saying their car is due for an oil change and wants to know if they actually need to schedule something or if it's just a generic reminder.",
    audioUrl:
      "https://static.magica.com/a39155a4198a45f1bd0a5540c802d120.mp3",
    checklist: [
      "Explained clearly whether the reminder is generic or based on their actual mileage/history",
      "Offered to check their specific vehicle's service history if possible",
      "Made scheduling easy and low-pressure",
      "Avoided making them feel like they're being oversold",
      "Confirmed appointment details if they chose to schedule",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you answer whether the reminder applies to them specifically?",
        options: [
          "Say all postcards are meaningless",
          "Check their actual vehicle history if possible and give a clear answer",
          "Assume it definitely applies without checking",
          "Refuse to discuss the postcard",
        ],
        correctIndex: 1,
        explanation: "Checking their actual history gives an honest, specific answer instead of a generic one.",
      },
      {
        id: "q2",
        question: "What tone should you use when discussing the reminder?",
        options: [
          "Pushy and sales-focused",
          "Low-pressure and helpful",
          "Dismissive of the postcard",
          "Urgent and alarming",
        ],
        correctIndex: 1,
        explanation: "A low-pressure tone respects that this is just an informational reminder, not an emergency.",
      },
      {
        id: "q3",
        question: "If they decide to schedule, what should you do before ending the call?",
        options: [
          "Nothing further",
          "Confirm the appointment date/time clearly",
          "Leave the time vague",
          "Skip confirming details",
        ],
        correctIndex: 1,
        explanation: "Confirming details avoids confusion or a missed appointment later.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "service-tire-warranty-claim",
    role: "service",
    level: "seasoned",
    title: "Tire Damage Coverage Question",
    situation:
      "A customer's tire blew out on the highway after hitting a nail and wants to know if it's covered under any warranty or protection plan.",
    audioUrl:
      "https://static.magica.com/03180981d80245a8aeec426e0233258e.mp3",
    checklist: [
      "Checked their actual tire warranty or protection plan before answering",
      "Explained clearly what road hazard damage typically is or isn't covered by",
      "Stayed empathetic about the inconvenience and safety concern",
      "Avoided guaranteeing coverage without verifying",
      "Offered a clear next step regardless of coverage outcome",
    ],
    questions: [
      {
        id: "q1",
        question: "Before answering about coverage, you should:",
        options: [
          "Guess based on typical policies",
          "Check their actual tire warranty or protection plan",
          "Assume nothing is ever covered",
          "Assume everything is covered",
        ],
        correctIndex: 1,
        explanation: "Road hazard coverage varies by plan — checking their specific plan avoids a wrong answer.",
      },
      {
        id: "q2",
        question: "How should you acknowledge the situation first?",
        options: [
          "Jump straight to policy details with no empathy",
          "Briefly acknowledge the inconvenience and safety concern, then explain coverage",
          "Downplay the blowout as no big deal",
          "Blame road conditions",
        ],
        correctIndex: 1,
        explanation: "A brief empathetic acknowledgment before the policy details keeps the customer feeling heard.",
      },
      {
        id: "q3",
        question: "If road hazard isn't covered, what should you still offer?",
        options: [
          "Nothing further",
          "A clear next step, like scheduling a replacement and discussing cost",
          "Tell them to go elsewhere",
          "Refuse to discuss it further",
        ],
        correctIndex: 1,
        explanation: "Even without coverage, offering a path forward keeps the relationship and the repair moving.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "service-followup-accountability",
    role: "service",
    level: "seasoned",
    title: "Advisor Follow-Up Never Happened",
    situation:
      "A customer says their service advisor promised an update on a parts order three days ago and never called, and wants someone to actually check on it today.",
    audioUrl:
      "https://static.magica.com/edece913987e4ee69602863980147e1a.mp3",
    checklist: [
      "Acknowledged the missed follow-up without excessive excuse-making",
      "Actually looked into the parts order status rather than deflecting",
      "Took ownership of getting them a real answer today",
      "Avoided blaming the advisor by name in a way that sounds unprofessional",
      "Set a specific, realistic time to follow up if the answer isn't immediate",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you respond to the missed three-day-old promise?",
        options: [
          "Blame the advisor by name to the customer",
          "Briefly acknowledge the miss and commit to checking now",
          "Argue that three days isn't that long",
          "Ignore that anything was promised",
        ],
        correctIndex: 1,
        explanation: "A brief acknowledgment plus immediate action rebuilds trust better than blame or excuses.",
      },
      {
        id: "q2",
        question: "What should you do before giving any update?",
        options: [
          "Guess at the parts status",
          "Actually check the current parts order status",
          "Tell them to call back another day",
          "Promise it'll be ready without checking",
        ],
        correctIndex: 1,
        explanation: "Checking the real status ensures you don't repeat the same broken-promise pattern.",
      },
      {
        id: "q3",
        question: "If you can't get a final answer immediately, what should you commit to?",
        options: [
          "Nothing specific",
          "A specific, realistic time you will personally follow up",
          "Another vague \"someone will call\"",
          "Telling them to keep calling back",
        ],
        correctIndex: 1,
        explanation: "A specific, owned commitment is what actually restores confidence after a missed follow-up.",
      },
    ],
    passingScore: 75,
  },
];
