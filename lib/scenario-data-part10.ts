import { Scenario } from "@/types";

export const scenariosPart10: Scenario[] = [
  {
    id: "reception-language-accommodation-request",
    role: "reception",
    level: "seasoned",
    title: "Spanish-Speaking Assistance Request",
    situation:
      "A caller asks if anyone available speaks Spanish so their spouse can ask questions about a vehicle purchase.",
    audioUrl:
      "https://static.magica.com/3e860d938e004338beb6b8e7bd802880.mp3",
    checklist: [
      "Responded calmly and helpfully rather than being caught off guard",
      "Checked if a Spanish-speaking team member is available",
      "If unavailable, offered a clear alternative (callback, translation tool, scheduling)",
      "Avoided making the caller feel like a burden",
      "Followed up to make sure the connection actually happened",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you respond when asked if a Spanish-speaking team member is available?",
        options: [
          "Act flustered and hang up",
          "Calmly check availability and respond helpfully",
          "Say no one speaks Spanish without checking",
          "Ignore the request",
        ],
        correctIndex: 1,
        explanation: "A calm, helpful response respects the caller regardless of language barriers.",
      },
      {
        id: "q2",
        question: "If no Spanish-speaking team member is available right now, what should you do?",
        options: [
          "Tell them to call back some other time with no plan",
          "Offer a clear alternative like a scheduled callback with the right person",
          "End the call abruptly",
          "Guess at answering their questions incorrectly",
        ],
        correctIndex: 1,
        explanation: "A concrete alternative keeps the opportunity open instead of losing the customer.",
      },
      {
        id: "q3",
        question: "What should you do after setting up the connection?",
        options: [
          "Nothing further",
          "Follow up to confirm the connection actually happened",
          "Assume it worked out",
          "Forget about it",
        ],
        correctIndex: 1,
        explanation: "Following up ensures the caller's need was actually met, not just acknowledged.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "reception-appointment-text-confusion",
    role: "reception",
    level: "newbie",
    title: "Confusing Appointment Confirmation Text",
    situation:
      "A caller received an automated appointment confirmation text that was unclear about the actual time and needs clarification.",
    audioUrl:
      "https://static.magica.com/20b08e4e9fea40828ee2d39afb1c213f.mp3",
    checklist: [
      "Looked up their actual appointment details rather than guessing",
      "Gave a clear, specific time once found",
      "Apologized briefly for the confusing text without dwelling on it",
      "Confirmed the full appointment details (date, time, purpose) back to them",
      "Asked if they have any other questions before ending the call",
    ],
    questions: [
      {
        id: "q1",
        question: "Before answering, what should you do?",
        options: [
          "Guess at a likely time",
          "Look up their actual appointment details in the system",
          "Tell them to check the text again",
          "Assume it's a mistake",
        ],
        correctIndex: 1,
        explanation: "Looking up the real record avoids giving an inaccurate appointment time.",
      },
      {
        id: "q2",
        question: "How should you handle the confusing automated text?",
        options: [
          "Blame the system loudly",
          "Briefly apologize and move on to giving clear information",
          "Ignore that it caused confusion",
          "Argue it wasn't confusing",
        ],
        correctIndex: 1,
        explanation: "A brief acknowledgment plus clear info resolves the issue without dwelling on it.",
      },
      {
        id: "q3",
        question: "What should you do before ending the call?",
        options: [
          "Nothing further",
          "Confirm the full appointment details back to them and ask if they have other questions",
          "Just say 'okay bye'",
          "Assume they have no more questions",
        ],
        correctIndex: 1,
        explanation: "Confirming details back ensures they leave the call with zero confusion.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "service-diagnostic-fee-dispute",
    role: "service",
    level: "seasoned",
    title: "Diagnostic Fee Dispute",
    situation:
      "A customer is disputing a diagnostic fee charged even though no repair was performed, feeling it's unfair.",
    audioUrl:
      "https://static.magica.com/1531bfa1aac64003812b2f40e70a8682.mp3",
    checklist: [
      "Explained clearly what the diagnostic fee covers (technician time and inspection, not just repairs)",
      "Stayed calm and non-defensive about the dispute",
      "Checked the actual work order details before responding definitively",
      "Explained any policy about fee waivers if a repair is completed afterward",
      "Offered a clear next step regardless of the outcome",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you explain the diagnostic fee?",
        options: [
          "Refuse to explain it",
          "Explain it covers technician time and inspection, not just completed repairs",
          "Say it was a mistake and refund immediately without checking",
          "Get defensive",
        ],
        correctIndex: 1,
        explanation: "Diagnostic fees compensate for the technician's time and expertise regardless of the repair outcome.",
      },
      {
        id: "q2",
        question: "Before responding definitively, what should you check?",
        options: [
          "Nothing, just apologize",
          "The actual work order details for that visit",
          "Guess based on typical policy",
          "Assume the customer is wrong",
        ],
        correctIndex: 1,
        explanation: "Checking the real record ensures your answer is accurate to their specific situation.",
      },
      {
        id: "q3",
        question: "What should you mention if relevant?",
        options: [
          "Nothing extra",
          "Any policy about the fee being waived or applied if they proceed with a repair",
          "That fees are never waived under any circumstance",
          "That they should have known better",
        ],
        correctIndex: 1,
        explanation: "Many shops apply diagnostic fees toward the repair cost — mentioning this can resolve the frustration.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "service-loaner-during-repair",
    role: "service",
    level: "newbie",
    title: "Loaner Car During Multi-Day Repair",
    situation:
      "A customer whose vehicle needs a multi-day repair wants to know what transportation options are available in the meantime.",
    audioUrl:
      "https://static.magica.com/9b78c3f6d50f43299d6fe9918122ef77.mp3",
    checklist: [
      "Checked what transportation options are actually available (loaner, shuttle, rental partner)",
      "Explained any requirements or costs clearly",
      "Avoided promising something that isn't actually available",
      "Empathized with the inconvenience of being without a car",
      "Confirmed next steps clearly before ending the call",
    ],
    questions: [
      {
        id: "q1",
        question: "Before answering, what should you check?",
        options: [
          "Nothing, just guess",
          "What transportation options are actually available for this repair",
          "Assume nothing is available",
          "Assume everything is free",
        ],
        correctIndex: 1,
        explanation: "Checking actual options ensures you give an accurate, useful answer.",
      },
      {
        id: "q2",
        question: "How should you acknowledge the inconvenience?",
        options: [
          "Ignore it",
          "Briefly empathize with being without a car for several days",
          "Downplay it as no big deal",
          "Blame the repair timeline",
        ],
        correctIndex: 1,
        explanation: "A brief empathetic acknowledgment shows the customer they're being heard.",
      },
      {
        id: "q3",
        question: "What should you do before ending the call?",
        options: [
          "Nothing further",
          "Confirm the transportation plan and next steps clearly",
          "Leave it vague",
          "Tell them to figure it out themselves",
        ],
        correctIndex: 1,
        explanation: "Clear confirmation avoids confusion about how they'll get around during the repair.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "service-multiple-issues-priority",
    role: "service",
    level: "seasoned",
    title: "Multiple Issues, Limited Budget",
    situation:
      "A customer received an inspection report with multiple issues but has budget constraints and needs help prioritizing repairs.",
    audioUrl:
      "https://static.magica.com/71231cb43ce0499895325ec529396312.mp3",
    checklist: [
      "Reviewed the actual inspection findings rather than guessing",
      "Clearly distinguished safety-critical issues from lower-priority ones",
      "Avoided pressuring them into fixing everything at once",
      "Gave honest guidance on what can reasonably wait",
      "Offered to schedule the most urgent repair first",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you help prioritize the repairs?",
        options: [
          "Insist everything must be fixed today",
          "Distinguish safety-critical issues from ones that can reasonably wait",
          "Ignore their budget concern",
          "Refuse to prioritize anything",
        ],
        correctIndex: 1,
        explanation: "Honest prioritization respects both their safety and their budget reality.",
      },
      {
        id: "q2",
        question: "What should you avoid doing given their budget concern?",
        options: [
          "Being honest about urgency",
          "Pressuring them into an all-or-nothing decision",
          "Distinguishing safety issues",
          "Offering to schedule the urgent item first",
        ],
        correctIndex: 1,
        explanation: "Pressure tactics damage trust with a customer who's already being upfront about constraints.",
      },
      {
        id: "q3",
        question: "What's a good next step for this call?",
        options: [
          "End with no plan",
          "Offer to schedule the most urgent, safety-critical repair first",
          "Tell them to come back when they can afford everything",
          "Insist on full payment upfront for all items",
        ],
        correctIndex: 1,
        explanation: "Scheduling the most urgent item first gives them a manageable, safe path forward.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "service-tire-rotation-reminder-call",
    role: "service",
    level: "newbie",
    title: "Tire Rotation Reminder Call",
    situation:
      "A customer received an automated service reminder about a tire rotation and wants to know if it's necessary and what it costs.",
    audioUrl:
      "https://static.magica.com/77f1e1da261a4c0898e923881431038b.mp3",
    checklist: [
      "Explained why tire rotations matter (even wear, tire lifespan)",
      "Gave an honest, low-pressure answer about necessity",
      "Provided accurate pricing information if available",
      "Avoided making it sound mandatory or urgent if it isn't",
      "Offered to schedule if they're interested",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you explain why tire rotations matter?",
        options: [
          "Refuse to explain",
          "Explain they promote even tire wear and extend tire lifespan",
          "Say it's not important at all",
          "Make it sound like an emergency",
        ],
        correctIndex: 1,
        explanation: "A clear, honest explanation helps the customer make an informed decision.",
      },
      {
        id: "q2",
        question: "What tone should you use about the urgency?",
        options: [
          "Alarming and urgent",
          "Low-pressure and informative",
          "Dismissive",
          "Pushy sales tone",
        ],
        correctIndex: 1,
        explanation: "Routine maintenance reminders should stay low-pressure and informative, not urgent.",
      },
      {
        id: "q3",
        question: "What should you offer if they seem interested?",
        options: [
          "Nothing further",
          "To schedule the service",
          "Tell them to call back later",
          "End the call without a next step",
        ],
        correctIndex: 1,
        explanation: "Offering to schedule turns interest into an actual completed task.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "service-recall-repair-scheduling",
    role: "service",
    level: "newbie",
    title: "Scheduling a Recall Repair",
    situation:
      "A customer was referred to service specifically to schedule a previously identified recall repair.",
    audioUrl:
      "https://static.magica.com/2ba35e0ce5a344fa9f0940a59b7e161f.mp3",
    checklist: [
      "Confirmed the specific recall and vehicle details before scheduling",
      "Explained the repair is free of charge under the recall",
      "Gave a realistic estimate of repair time if known",
      "Scheduled a specific date and time",
      "Confirmed the appointment details back to the customer",
    ],
    questions: [
      {
        id: "q1",
        question: "Before scheduling, what should you confirm?",
        options: [
          "Nothing",
          "The specific recall and vehicle details",
          "Their payment method",
          "Their purchase date",
        ],
        correctIndex: 1,
        explanation: "Confirming the specific recall ensures the right parts and time are allocated.",
      },
      {
        id: "q2",
        question: "What should you clarify about cost?",
        options: [
          "That it will be charged",
          "That the repair is free under the recall",
          "That it depends on negotiation",
          "Nothing about cost",
        ],
        correctIndex: 1,
        explanation: "Recall repairs are free, and customers should know that clearly.",
      },
      {
        id: "q3",
        question: "What should you do before ending the call?",
        options: [
          "Nothing further",
          "Confirm the scheduled date, time, and details back to them",
          "Leave the time vague",
          "Assume they'll remember",
        ],
        correctIndex: 1,
        explanation: "Confirming details back prevents a missed or confused appointment.",
      },
    ],
    passingScore: 70,
  },
];
