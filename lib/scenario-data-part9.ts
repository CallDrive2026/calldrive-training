import { Scenario } from "@/types";

export const scenariosPart9: Scenario[] = [
  {
    id: "sales-trade-in-value-dispute",
    role: "sales",
    level: "seasoned",
    title: "Trade-In Value Lower Than Expected",
    situation:
      "A caller is upset that their trade-in appraisal came in well below online estimator tools and wants an explanation before deciding whether to proceed.",
    audioUrl:
      "https://static.magica.com/7135e18a873749b1864fe87b71c0ad17.mp3",
    checklist: [
      "Acknowledged the frustration without dismissing the online estimate outright",
      "Explained that online tools give rough ranges, not inspected values",
      "Offered to walk through specific factors affecting their vehicle's value (condition, mileage, market demand)",
      "Avoided being defensive about the dealership's number",
      "Offered a path forward, like a second in-person look or explaining the appraisal report",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you respond to the gap between the online estimate and the actual appraisal?",
        options: [
          "Insist the online tool is always wrong",
          "Explain online tools are rough ranges, not inspected values, and offer to break down the real factors",
          "Refuse to discuss the difference",
          "Immediately match the online number",
        ],
        correctIndex: 1,
        explanation: "Online estimators don't account for actual condition/inspection, so explaining that gap builds trust.",
      },
      {
        id: "q2",
        question: "What should you offer to help resolve their concern?",
        options: [
          "Nothing further",
          "A breakdown of the specific factors affecting their vehicle's value",
          "Tell them to sell it elsewhere",
          "Guess at a higher number to keep them happy",
        ],
        correctIndex: 1,
        explanation: "A transparent breakdown addresses the actual concern instead of leaving them confused.",
      },
      {
        id: "q3",
        question: "What tone should you maintain during this conversation?",
        options: [
          "Defensive",
          "Calm and transparent",
          "Dismissive of their research",
          "Rushed",
        ],
        correctIndex: 1,
        explanation: "Calm transparency turns a pricing disagreement into a trust-building moment.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "sales-competitor-price-match",
    role: "sales",
    level: "seasoned",
    title: "Competitor Price Match Request",
    situation:
      "A caller has a lower quote from a competing dealership for the same vehicle and wants to know if a price match is possible.",
    audioUrl:
      "https://static.magica.com/4e6f125baca24ac983f4158eeff39f7b.mp3",
    checklist: [
      "Asked for specifics on the competitor's quote (exact trim, incentives included, fees)",
      "Avoided badmouthing the competitor",
      "Explained honestly what can or can't be matched",
      "Highlighted any real value-adds beyond just price if relevant",
      "Invited them in to review real numbers side by side",
    ],
    questions: [
      {
        id: "q1",
        question: "Before responding to a price match request, you should:",
        options: [
          "Immediately agree to match it",
          "Ask for specifics on the competitor's quote to compare accurately",
          "Refuse to discuss it",
          "Assume they're lying",
        ],
        correctIndex: 1,
        explanation: "Details like trim, incentives, and fees determine whether it's truly an apples-to-apples comparison.",
      },
      {
        id: "q2",
        question: "How should you talk about the competing dealership?",
        options: [
          "Badmouth them to seem better",
          "Stay professional and avoid disparaging them",
          "Refuse to acknowledge them",
          "Agree they're better",
        ],
        correctIndex: 1,
        explanation: "Staying professional protects your credibility regardless of the outcome.",
      },
      {
        id: "q3",
        question: "What's a good next step if you can't match the exact price?",
        options: [
          "End the call",
          "Highlight real value-adds and invite them in to compare numbers directly",
          "Insist your price is non-negotiable with no explanation",
          "Tell them to just go with the other dealer",
        ],
        correctIndex: 1,
        explanation: "Value-adds and a real side-by-side comparison give them a reason to still consider you.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "sales-gap-insurance-question",
    role: "sales",
    level: "newbie",
    title: "What Is GAP Insurance Question",
    situation:
      "A caller researching financing options doesn't understand what GAP insurance is or whether it applies to their situation.",
    audioUrl:
      "https://static.magica.com/7c3834ec48e1416c95d9619797e006fa.mp3",
    checklist: [
      "Explained GAP insurance in simple, non-technical terms",
      "Related it to their specific situation (loan amount vs vehicle value)",
      "Avoided pressuring them to buy it on the phone",
      "Mentioned it's optional and they can decide when they come in",
      "Invited them in to review real financing numbers",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you explain GAP insurance?",
        options: [
          "Use technical insurance jargon",
          "Explain simply that it covers the gap between what you owe and what the car is worth if it's totaled",
          "Refuse to explain it",
          "Tell them it's mandatory",
        ],
        correctIndex: 1,
        explanation: "A simple, relatable explanation helps a first-time buyer actually understand the product.",
      },
      {
        id: "q2",
        question: "Should you pressure them to decide over the phone?",
        options: [
          "Yes, close it now",
          "No, let them decide when reviewing real numbers in person",
          "Yes, but only if they hesitate",
          "It doesn't matter",
        ],
        correctIndex: 1,
        explanation: "GAP insurance is optional and best decided with full paperwork in front of them, not under phone pressure.",
      },
      {
        id: "q3",
        question: "What's the best way to end this call?",
        options: [
          "No next step",
          "Invite them in to review real financing numbers",
          "Tell them to research it themselves",
          "Quote a final price with no visit",
        ],
        correctIndex: 1,
        explanation: "Getting them in lets you address financing questions with actual numbers.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "sales-certified-preowned-question",
    role: "sales",
    level: "newbie",
    title: "Certified Pre-Owned Coverage Question",
    situation:
      "A caller wants to understand what certified pre-owned status actually includes before considering a used vehicle purchase.",
    audioUrl:
      "https://static.magica.com/e2844975a96e4048866b3434f6a89274.mp3",
    checklist: [
      "Explained what certification typically includes (inspection points, warranty coverage)",
      "Was honest about the specifics rather than vague generalities",
      "Related the coverage to their specific vehicle if possible",
      "Avoided overselling the certification's protection",
      "Invited them in to see the vehicle and paperwork",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you answer what certification includes?",
        options: [
          "Vague generalities",
          "Specific details about inspection points and warranty coverage",
          "Tell them to look it up online",
          "Say it means nothing extra",
        ],
        correctIndex: 1,
        explanation: "Specific details give the caller a real answer instead of a marketing soundbite.",
      },
      {
        id: "q2",
        question: "What should you avoid doing when describing the coverage?",
        options: [
          "Being honest",
          "Overselling the protection beyond what it actually covers",
          "Mentioning inspection points",
          "Inviting them in",
        ],
        correctIndex: 1,
        explanation: "Overselling creates false expectations that backfire later.",
      },
      {
        id: "q3",
        question: "What's a good way to close this call?",
        options: [
          "End with no next step",
          "Invite them in to see the vehicle and its certification paperwork",
          "Quote a price with no visit",
          "Tell them to trust the listing alone",
        ],
        correctIndex: 1,
        explanation: "Seeing the actual paperwork confirms the coverage claims in person.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "sales-inventory-transfer-request",
    role: "sales",
    level: "seasoned",
    title: "Vehicle Transfer From Another Location",
    situation:
      "A caller found their desired vehicle at a different dealership location within the same group and wants to know if a transfer is possible.",
    audioUrl:
      "https://static.magica.com/8337e05ed73a4369b547964e74d21c0d.mp3",
    checklist: [
      "Confirmed whether inter-location transfers are something this dealer group does",
      "Set realistic expectations about timing and any transfer costs",
      "Avoided promising a transfer that may not be approved",
      "Offered alternatives if a transfer isn't feasible (similar local inventory, ordering)",
      "Got their contact info to follow up with a real answer",
    ],
    questions: [
      {
        id: "q1",
        question: "Before promising a transfer, what should you do?",
        options: [
          "Guarantee it immediately",
          "Confirm whether transfers between locations are actually possible and what it involves",
          "Refuse to discuss it",
          "Tell them to drive there themselves",
        ],
        correctIndex: 1,
        explanation: "Transfers involve logistics and approval that shouldn't be promised without confirming first.",
      },
      {
        id: "q2",
        question: "What should you set expectations about?",
        options: [
          "Nothing",
          "Realistic timing and any potential transfer costs",
          "A guaranteed delivery date",
          "That it's free and instant",
        ],
        correctIndex: 1,
        explanation: "Honest expectations about time and cost prevent a frustrating surprise later.",
      },
      {
        id: "q3",
        question: "If a transfer isn't feasible, what should you offer?",
        options: [
          "Nothing further",
          "Alternatives like similar local inventory or ordering",
          "Tell them to give up",
          "Refuse to help further",
        ],
        correctIndex: 1,
        explanation: "Offering alternatives keeps the opportunity alive even if the exact transfer doesn't work out.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "reception-recall-notice-callback",
    role: "reception",
    level: "seasoned",
    title: "Recall Notice Callback",
    situation:
      "A caller received a manufacturer recall notice weeks ago and is calling now to figure out next steps.",
    audioUrl:
      "https://static.magica.com/dd7704db5ce44fd086170c77b3a10b75.mp3",
    checklist: [
      "Reassured them it's not too late to address a recall",
      "Explained the recall process clearly (free repair, scheduling)",
      "Gathered basic vehicle info (VIN or make/model/year) to route appropriately",
      "Avoided making them feel bad for the delay",
      "Set a clear next step, like scheduling service or transferring to the right department",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you respond to someone calling about a recall weeks late?",
        options: [
          "Tell them it's too late",
          "Reassure them it's not too late and explain the process",
          "Make them feel guilty for waiting",
          "Ignore the delay and move on without addressing it",
        ],
        correctIndex: 1,
        explanation: "Recalls remain valid regardless of when the customer calls, and reassurance keeps them engaged.",
      },
      {
        id: "q2",
        question: "What should you clarify about recall repairs?",
        options: [
          "That they'll be charged",
          "That the repair is free under the recall",
          "That it's optional and rarely needed",
          "Nothing specific",
        ],
        correctIndex: 1,
        explanation: "Recall repairs are free, and customers should know that upfront.",
      },
      {
        id: "q3",
        question: "What should you gather before routing this call?",
        options: [
          "Nothing",
          "Basic vehicle info like VIN or make/model/year",
          "Their full purchase history",
          "Their payment method",
        ],
        correctIndex: 1,
        explanation: "Vehicle identification lets the service team confirm the specific recall that applies.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "reception-loaner-car-availability",
    role: "reception",
    level: "newbie",
    title: "Loaner Car Availability Question",
    situation:
      "A caller wants to know if a loaner vehicle is available while their car is being serviced for a multi-day repair.",
    audioUrl:
      "https://static.magica.com/d7ce840e93674a2dbf5eba2c246245a1.mp3",
    checklist: [
      "Gave an accurate answer about loaner availability and any requirements",
      "Explained any qualifying conditions (insurance, repair type, availability)",
      "Avoided guaranteeing a loaner if it's not certain",
      "Offered alternatives if loaners aren't guaranteed (shuttle, rental partner)",
      "Connected them with service to confirm details for their specific repair",
    ],
    questions: [
      {
        id: "q1",
        question: "What should you do if you're not 100% sure a loaner will be available?",
        options: [
          "Guarantee one anyway",
          "Give an honest answer and explain any qualifying conditions",
          "Refuse to discuss loaners",
          "Assume none are available",
        ],
        correctIndex: 1,
        explanation: "Honest, accurate answers prevent a frustrating situation when they arrive expecting a guaranteed loaner.",
      },
      {
        id: "q2",
        question: "If loaners aren't guaranteed, what should you mention?",
        options: [
          "Nothing further",
          "Alternatives like a shuttle service or rental partner",
          "That they're out of luck",
          "To find their own ride",
        ],
        correctIndex: 1,
        explanation: "Offering alternatives shows you're still trying to solve their transportation need.",
      },
      {
        id: "q3",
        question: "What's the best next step for this call?",
        options: [
          "End with no follow-up",
          "Connect them with service to confirm loaner details for their specific repair",
          "Tell them to just show up and hope",
          "Quote a loaner fee without checking",
        ],
        correctIndex: 1,
        explanation: "Service can confirm actual availability and requirements tied to their repair.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "reception-holiday-hours-question",
    role: "reception",
    level: "newbie",
    title: "Holiday Hours Question",
    situation:
      "A caller wants to confirm dealership hours around an upcoming holiday weekend before planning a visit.",
    audioUrl:
      "https://static.magica.com/e30e45e682a748ad83db89e79da79cbe.mp3",
    checklist: [
      "Gave accurate, confirmed hours rather than guessing",
      "Checked current posted holiday schedule if unsure",
      "Mentioned both sales and service hours if they differ",
      "Kept the tone friendly and helpful",
      "Offered to help schedule something for when they're open",
    ],
    questions: [
      {
        id: "q1",
        question: "If you're not sure about holiday hours, you should:",
        options: [
          "Guess to avoid delay",
          "Check the current posted holiday schedule before answering",
          "Say you're definitely open",
          "Say you're definitely closed",
        ],
        correctIndex: 1,
        explanation: "Confirmed hours avoid sending someone to a closed dealership.",
      },
      {
        id: "q2",
        question: "What should you mention if sales and service have different hours?",
        options: [
          "Only sales hours",
          "Both sets of hours if they differ",
          "Only service hours",
          "Neither, just say 'normal hours'",
        ],
        correctIndex: 1,
        explanation: "Clarifying both prevents confusion depending on why they're visiting.",
      },
      {
        id: "q3",
        question: "What's a good way to end this simple call?",
        options: [
          "Just hang up after answering",
          "Offer to help schedule something for when they're open",
          "Tell them to call back later for details",
          "Nothing further needed",
        ],
        correctIndex: 1,
        explanation: "Turning a simple hours question into a scheduled visit is a good use of the interaction.",
      },
    ],
    passingScore: 70,
  },
];
