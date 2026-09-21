import { Scenario } from "@/types";

export const scenariosPart6: Scenario[] = [
  // ---------- WEEK 2 ADDITIONS ----------
  {
    id: "sales-accessories-question",
    role: "sales",
    level: "newbie",
    title: "Accessories & Add-Ons Question",
    situation:
      "A caller wants to know if a truck comes with common accessories (bed liner, running boards) or if those are extra.",
    audioUrl:
      "https://static.magica.com/9720440eb81c4b3e8a352f9fc8101d49.mp3",
    checklist: [
      "Confirmed the exact vehicle/trim before answering what's included",
      "Clearly distinguished factory-installed vs. dealer-added accessories",
      "Gave a straightforward answer on cost if something is extra",
      "Avoided guessing if unsure and offered to confirm",
      "Invited them in to see the actual unit and accessories",
    ],
    questions: [
      {
        id: "sales-accessories-question-q1",
        question: "Before answering what's included, you should:",
        options: ["Guess based on the trim name", "Confirm the exact vehicle/trim", "Assume all trucks are the same", "Say accessories never come standard"],
        correctIndex: 1,
        explanation: "Included accessories vary by trim and unit, so confirm specifics first.",
      },
      {
        id: "sales-accessories-question-q2",
        question: "If something isn't included, what's the best response?",
        options: ["Refuse to discuss cost", "Clearly explain it's an add-on and give the cost", "Say it's impossible to add", "Change the subject"],
        correctIndex: 1,
        explanation: "Transparency about add-on costs builds trust.",
      },
      {
        id: "sales-accessories-question-q3",
        question: "If you're not 100% sure what's installed, you should:",
        options: ["Make something up", "Offer to confirm and follow up", "Refuse to answer", "Tell them to Google it"],
        correctIndex: 1,
        explanation: "Confirming rather than guessing avoids giving wrong information.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "reception-service-hours-weekend",
    role: "reception",
    level: "newbie",
    title: "Weekend Service Hours",
    situation:
      "A caller wants to know if the service department is open on Saturdays and what time.",
    audioUrl:
      "https://static.magica.com/70b2252b69054e01b266985ab432e870.mp3",
    checklist: [
      "Answered clearly and confidently with correct hours",
      "Mentioned any differences between sales and service hours if relevant",
      "Asked if they wanted to book an appointment while on the phone",
      "Kept the call brief and friendly",
      "Thanked them for calling",
    ],
    questions: [
      {
        id: "reception-service-hours-weekend-q1",
        question: "What should you make sure of when answering an hours question?",
        options: ["Give a rough guess", "Give the correct, specific hours", "Avoid specifics", "Redirect to the website only"],
        correctIndex: 1,
        explanation: "Accurate hours prevent wasted trips.",
      },
      {
        id: "reception-service-hours-weekend-q2",
        question: "What's a good next step after answering?",
        options: ["Nothing further", "Offer to book an appointment right then", "Rush them off the phone", "Transfer with no reason"],
        correctIndex: 1,
        explanation: "Turning an info question into a booked appointment adds value.",
      },
      {
        id: "reception-service-hours-weekend-q3",
        question: "Sales and service hours can differ. You should:",
        options: ["Assume they're the same", "Clarify if they differ", "Never mention hours differences", "Refuse to specify a department"],
        correctIndex: 1,
        explanation: "Clarifying avoids the customer showing up at the wrong time for the wrong department.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "service-battery-check",
    role: "service",
    level: "newbie",
    title: "Slow-Start Battery Check",
    situation:
      "A caller mentions their car has been slow to start and wants a battery check scheduled this week.",
    audioUrl:
      "https://static.magica.com/74d6bb48bb29476cbef25caf268e8424.mp3",
    checklist: [
      "Took the symptom seriously and didn't dismiss it",
      "Checked availability for this week",
      "Set expectations that other causes besides the battery are possible",
      "Confirmed vehicle details before booking",
      "Confirmed the appointment date/time back to the caller",
    ],
    questions: [
      {
        id: "service-battery-check-q1",
        question: "How should you treat a slow-start symptom?",
        options: ["Dismiss it as nothing", "Take it seriously and get it scheduled", "Tell them it's definitely the battery", "Ignore it since it's minor"],
        correctIndex: 1,
        explanation: "Even small symptoms deserve a proper diagnostic visit.",
      },
      {
        id: "service-battery-check-q2",
        question: "Should you assume it's definitely the battery?",
        options: ["Yes, always", "No, other causes are possible and inspection will confirm", "Yes, and quote a battery price now", "No, refuse to schedule until they diagnose it themselves"],
        correctIndex: 1,
        explanation: "Setting expectations that other causes are possible avoids overpromising a diagnosis.",
      },
      {
        id: "service-battery-check-q3",
        question: "Before ending the call, you should:",
        options: ["Skip confirming details", "Confirm the appointment date/time back to them", "Guess at a time", "End without any confirmation"],
        correctIndex: 1,
        explanation: "Reading back the appointment avoids mixups.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "sales-multiple-vehicle-comparison",
    role: "sales",
    level: "seasoned",
    title: "Comparing Two Different Models",
    situation:
      "A caller is stuck deciding between two different models and wants help figuring out which makes more sense for their needs.",
    audioUrl:
      "https://static.magica.com/2567641ecd52459ab5b057d2e0fd4c51.mp3",
    checklist: [
      "Asked about their primary use case (commuting, hauling, family, etc.)",
      "Compared the two models based on their actual needs, not just specs",
      "Mentioned pricing differences honestly",
      "Avoided pushing the higher-margin option without justification",
      "Invited them in to test drive both back to back",
    ],
    questions: [
      {
        id: "sales-multiple-vehicle-comparison-q1",
        question: "Before comparing two models, you should ask about:",
        options: ["Nothing, just list specs", "Their primary use case and needs", "Their exact income", "Their favorite color"],
        correctIndex: 1,
        explanation: "Needs-based comparison is far more useful than a generic spec list.",
      },
      {
        id: "sales-multiple-vehicle-comparison-q2",
        question: "How should pricing differences be handled?",
        options: ["Hide them", "Explain them honestly", "Only mention the cheaper one", "Refuse to discuss price"],
        correctIndex: 1,
        explanation: "Honest pricing comparison respects the customer's decision-making.",
      },
      {
        id: "sales-multiple-vehicle-comparison-q3",
        question: "What's a strong way to help them decide?",
        options: ["Pick for them arbitrarily", "Invite them to test drive both back to back", "Refuse to compare", "Tell them to decide before coming in"],
        correctIndex: 1,
        explanation: "A back-to-back test drive gives them real, firsthand comparison.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "reception-callback-promise-unmet",
    role: "reception",
    level: "seasoned",
    title: "Unmet Callback Promise",
    situation:
      "A caller says they were promised a callback yesterday that never happened and wants to know what's going on.",
    audioUrl:
      "https://static.magica.com/ff9d6b25bbc74d3c8691f0919433f016.mp3",
    checklist: [
      "Apologized for the missed callback without excessive excuse-making",
      "Looked into who was supposed to call and why it didn't happen",
      "Prioritized getting them an answer now rather than promising another callback",
      "Took detailed notes if the right person still wasn't available",
      "Set a specific, realistic follow-up time this time",
    ],
    questions: [
      {
        id: "reception-callback-promise-unmet-q1",
        question: "First response to a missed callback complaint?",
        options: ["Blame another department", "A brief apology and looking into what happened", "Argue it was never promised", "Ignore the complaint"],
        correctIndex: 1,
        explanation: "A brief, genuine apology plus real follow-through rebuilds trust.",
      },
      {
        id: "reception-callback-promise-unmet-q2",
        question: "What should you prioritize this time?",
        options: ["Promising yet another vague callback", "Getting them a real answer now if possible", "Ending the call quickly", "Blaming the customer for not calling sooner"],
        correctIndex: 1,
        explanation: "After a missed promise, immediate action matters more than another promise.",
      },
      {
        id: "reception-callback-promise-unmet-q3",
        question: "If you still can't resolve it immediately, you should:",
        options: ["Give a vague timeframe", "Set a specific, realistic follow-up time", "Say nothing further", "Tell them to keep calling back"],
        correctIndex: 1,
        explanation: "A specific commitment is more credible after a broken promise.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "service-multiple-recall-bundle",
    role: "service",
    level: "seasoned",
    title: "Bundling Multiple Recalls",
    situation:
      "A caller received two separate recall notices and wants to know if both can be handled in one visit.",
    audioUrl:
      "https://static.magica.com/69465ca5b6804154a8fec4370403a8ca.mp3",
    checklist: [
      "Looked up both recalls tied to their VIN before answering",
      "Confirmed whether both can realistically be done together",
      "Gave an honest estimate of total time needed for both",
      "Booked a single appointment covering both if possible",
      "Explained clearly if one recall needs a separate visit and why",
    ],
    questions: [
      {
        id: "service-multiple-recall-bundle-q1",
        question: "Before answering, you should:",
        options: ["Guess that all recalls can be combined", "Look up both recalls tied to their VIN", "Say recalls can never be combined", "Ignore one of the recalls"],
        correctIndex: 1,
        explanation: "Confirming both specific recalls avoids inaccurate promises.",
      },
      {
        id: "service-multiple-recall-bundle-q2",
        question: "If both can be done together, what should you also provide?",
        options: ["Nothing extra", "An honest estimate of total time needed", "A guess with no basis", "Refuse to give a timeframe"],
        correctIndex: 1,
        explanation: "Setting time expectations helps the customer plan their visit.",
      },
      {
        id: "service-multiple-recall-bundle-q3",
        question: "If one recall needs a separate visit, you should:",
        options: ["Not mention it", "Clearly explain why and offer to schedule both", "Cancel both recalls", "Blame the manufacturer with no explanation"],
        correctIndex: 1,
        explanation: "Clear communication prevents a frustrated customer at drop-off.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "sales-out-the-door-cash-demand",
    role: "sales",
    level: "superstar",
    title: "Cash Buyer Demanding Out-the-Door Price",
    situation:
      "A caller paying cash with no financing or trade demands the absolute lowest out-the-door price immediately, before even visiting.",
    audioUrl:
      "https://static.magica.com/56a2df12c70444728dcafb95e7789b12.mp3",
    checklist: [
      "Stayed calm and professional despite the demanding tone",
      "Confirmed the exact vehicle before discussing any pricing",
      "Explained what out-the-door pricing includes (tax, title, fees)",
      "Gave the most accurate number possible without guessing wildly",
      "Still tried to secure a visit or hold on the vehicle",
    ],
    questions: [
      {
        id: "sales-out-the-door-cash-demand-q1",
        question: "Before discussing an out-the-door price, you should:",
        options: ["Just quote a number immediately", "Confirm the exact vehicle first", "Refuse to discuss pricing", "Assume they mean the base model"],
        correctIndex: 1,
        explanation: "Accurate pricing requires knowing the exact vehicle in question.",
      },
      {
        id: "sales-out-the-door-cash-demand-q2",
        question: "What should an honest out-the-door quote include?",
        options: ["Just the sticker price", "Tax, title, and fees along with the vehicle price", "Nothing but a rough guess", "Only the vehicle price minus fees"],
        correctIndex: 1,
        explanation: "A true out-the-door number includes all standard costs.",
      },
      {
        id: "sales-out-the-door-cash-demand-q3",
        question: "What should you still aim for by the end of the call?",
        options: ["Nothing further", "Securing a visit or a hold on the vehicle", "Ending the call with no next step", "Refusing to engage further"],
        correctIndex: 1,
        explanation: "Even with a demanding caller, moving toward a visit keeps the deal alive.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "reception-simultaneous-multi-issue-anger",
    role: "reception",
    level: "superstar",
    title: "Multiple Unresolved Issues at Once",
    situation:
      "An angry caller lists three separate unresolved issues at once (paperwork, a noise complaint, no returned calls) and threatens to call corporate if not handled today.",
    audioUrl:
      "https://static.magica.com/77bde31fb3604d78beeb0d806a03f676.mp3",
    checklist: [
      "Let the caller finish listing all issues without interrupting",
      "Acknowledged the cumulative frustration, not just one issue",
      "Prioritized and organized the issues so nothing gets lost",
      "Escalated appropriately given the number and severity of issues",
      "Took detailed notes on all three issues before transferring",
    ],
    questions: [
      {
        id: "reception-simultaneous-multi-issue-anger-q1",
        question: "When a caller lists multiple issues at once, first step is to:",
        options: ["Interrupt to address one issue only", "Let them finish and acknowledge all of it", "Hang up", "Argue about which issue is worse"],
        correctIndex: 1,
        explanation: "Letting them finish and acknowledging the full picture shows you're taking it seriously.",
      },
      {
        id: "reception-simultaneous-multi-issue-anger-q2",
        question: "How should the issues be handled?",
        options: ["Pick only the easiest one", "Organize and address all of them, escalating as needed", "Ignore two of the three", "Tell them to call back three separate times"],
        correctIndex: 1,
        explanation: "All issues need to be captured and routed appropriately.",
      },
      {
        id: "reception-simultaneous-multi-issue-anger-q3",
        question: "Given the corporate threat and severity, you should:",
        options: ["Downplay the situation", "Escalate appropriately with full context", "Argue that corporate won't care", "Promise nothing can be done"],
        correctIndex: 1,
        explanation: "Multiple unresolved issues plus an escalation threat warrant prompt, well-documented escalation.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "service-total-loss-dispute",
    role: "service",
    level: "superstar",
    title: "Disputing a 'Not Worth Fixing' Diagnosis",
    situation:
      "A customer disputes being told their vehicle isn't worth repairing and demands someone else look at it again immediately.",
    audioUrl:
      "https://static.magica.com/148ab5c89a204021bd345b0cec11f380.mp3",
    checklist: [
      "Stayed calm and didn't get defensive about the technician's diagnosis",
      "Verified what was actually communicated and why before responding",
      "Explained the reasoning behind the diagnosis clearly",
      "Offered a reasonable path for a second look if appropriate",
      "Avoided dismissing the customer's frustration",
    ],
    questions: [
      {
        id: "service-total-loss-dispute-q1",
        question: "First step when a customer disputes a diagnosis?",
        options: ["Defend the technician immediately without checking", "Verify what was communicated and the reasoning behind it", "Agree the diagnosis was wrong without checking", "Refuse to discuss it further"],
        correctIndex: 1,
        explanation: "Understanding the actual basis for the diagnosis is necessary before responding.",
      },
      {
        id: "service-total-loss-dispute-q2",
        question: "How should the reasoning be communicated?",
        options: ["Vaguely, with no detail", "Clearly, explaining what was found and why", "Not at all", "Only in technical jargon"],
        correctIndex: 1,
        explanation: "Clear, understandable reasoning helps the customer trust the conclusion even if unwelcome.",
      },
      {
        id: "service-total-loss-dispute-q3",
        question: "If a second look is reasonable, what should you offer?",
        options: ["Refuse any further review", "A reasonable path for a second look", "Charge extra with no explanation", "Tell them to go elsewhere immediately"],
        correctIndex: 1,
        explanation: "Offering a fair path forward shows you're not dismissing their concern.",
      },
    ],
    passingScore: 85,
  },
];
