import { Scenario } from "@/types";

export const scenariosPart5: Scenario[] = [
  {
    id: "reception-communication-barrier",
    role: "reception",
    level: "seasoned",
    title: "Language/Communication Barrier",
    situation:
      "A caller with limited English is trying to schedule a car repair and is struggling to communicate clearly.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/07f7e672-c6ba-46d3-a56a-92890d5c0a38.mp3",
    checklist: [
      "Slowed down and spoke clearly without being condescending",
      "Used simple words and short sentences",
      "Confirmed key details by repeating them back (date, service needed)",
      "Offered to text/email confirmation for clarity",
      "Remained patient throughout",
    ],
    questions: [
      {
        id: "reception-communication-barrier-q1",
        question: "Best approach when there's a language barrier?",
        options: ["Speak faster and louder", "Speak slowly and use simple words", "Hang up and ask them to call back", "Ignore the difficulty"],
        correctIndex: 1,
        explanation: "Slowing down and simplifying language improves mutual understanding.",
      },
      {
        id: "reception-communication-barrier-q2",
        question: "How can you confirm details clearly?",
        options: ["Assume you understood correctly", "Repeat key details back to confirm", "Skip confirming anything", "Guess at what they need"],
        correctIndex: 1,
        explanation: "Repeating back details verifies mutual understanding.",
      },
      {
        id: "reception-communication-barrier-q3",
        question: "What's a helpful follow-up for clarity?",
        options: ["Nothing further needed", "Offering a text/email confirmation", "Refusing to send anything in writing", "Ending the call immediately"],
        correctIndex: 1,
        explanation: "Written confirmation helps overcome verbal communication gaps.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "reception-legal-threat",
    role: "reception",
    level: "superstar",
    title: "Billing Dispute with Legal Threat",
    situation:
      "An angry caller claims they've been billed incorrectly twice, demands it be fixed today, and threatens to call their lawyer.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/50231f0d-b45a-4003-afdc-cc8c882840a4.mp3",
    checklist: [
      "Stayed calm and did not get defensive despite the legal threat",
      "Acknowledged the frustration genuinely without admitting fault verbally",
      "Did not promise a specific resolution outcome without proper authority",
      "Immediately escalated to a manager or the appropriate billing contact",
      "Took down detailed notes (name, issue, callback number) before transferring",
    ],
    questions: [
      {
        id: "reception-legal-threat-q1",
        question: "How should you respond to a legal threat on the phone?",
        options: ["Argue back defensively", "Stay calm and acknowledge their frustration", "Hang up immediately", "Promise a lawsuit won't happen"],
        correctIndex: 1,
        explanation: "Staying calm and empathetic is critical in escalated situations.",
      },
      {
        id: "reception-legal-threat-q2",
        question: "Should you promise a specific billing resolution yourself?",
        options: ["Yes, promise anything to calm them down", "No, escalate to someone with proper authority", "Yes, and guarantee a refund", "No, refuse to discuss it at all"],
        correctIndex: 1,
        explanation: "Only someone with proper authority should commit to a resolution.",
      },
      {
        id: "reception-legal-threat-q3",
        question: "What should you do before transferring the call?",
        options: ["Nothing, just transfer blindly", "Take detailed notes to hand off context", "Hang up on them", "Argue about the legal threat"],
        correctIndex: 1,
        explanation: "Detailed notes ensure the next person can help without the caller repeating everything.",
      },
    ],
    passingScore: 85,
  },
  // ---------- SERVICE ADDITIONS ----------
  {
    id: "service-tire-rotation-scheduling",
    role: "service",
    level: "newbie",
    title: "Tire Rotation Scheduling",
    situation:
      "A caller wants a simple tire rotation scheduled and asks for availability this week.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/336f2959-2c26-4fd7-8454-32c5a29c00f7.mp3",
    checklist: [
      "Checked availability for the requested week",
      "Confirmed the vehicle make/model and mileage if relevant",
      "Offered the earliest convenient slot",
      "Mentioned approximate time the service will take",
      "Confirmed contact info for reminders",
    ],
    questions: [
      {
        id: "service-tire-rotation-scheduling-q1",
        question: "What should you check first for this request?",
        options: ["Nothing, just book any day", "Actual availability for their preferred week", "Their favorite tire brand", "Their exact address"],
        correctIndex: 1,
        explanation: "Always verify real availability before booking.",
      },
      {
        id: "service-tire-rotation-scheduling-q2",
        question: "What's helpful to mention about time?",
        options: ["Nothing about duration", "Approximate time the service will take", "A random unrelated fact", "Their invoice history"],
        correctIndex: 1,
        explanation: "Setting expectations on duration helps them plan their day.",
      },
      {
        id: "service-tire-rotation-scheduling-q3",
        question: "What should you confirm before ending the call?",
        options: ["Nothing else", "Contact info for reminders", "Their political views", "Their vehicle's paint color"],
        correctIndex: 1,
        explanation: "Contact confirmation ensures reminders reach them.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "service-warranty-basics",
    role: "service",
    level: "newbie",
    title: "Basic Warranty Coverage Question",
    situation:
      "A caller with a newer vehicle wants to understand what's covered under warranty if something goes wrong.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/64ac1d3c-8fd5-46c4-a8e1-64e14adf3525.mp3",
    checklist: [
      "Asked for the vehicle's age/mileage to check warranty status",
      "Explained general categories typically covered (powertrain, bumper-to-bumper basics)",
      "Clarified that exact coverage should be verified against their specific contract",
      "Avoided guaranteeing coverage without checking",
      "Offered to have a specific issue reviewed if they have one",
    ],
    questions: [
      {
        id: "service-warranty-basics-q1",
        question: "What should you check before answering coverage questions?",
        options: ["Nothing, just guess", "The vehicle's age/mileage relative to warranty terms", "Their favorite color", "Their driving habits"],
        correctIndex: 1,
        explanation: "Warranty coverage depends on age/mileage thresholds.",
      },
      {
        id: "service-warranty-basics-q2",
        question: "Should you guarantee coverage without verifying?",
        options: ["Yes, always guarantee it", "No, verify against their specific contract first", "Yes, guarantee only for luxury brands", "No, refuse to discuss warranty at all"],
        correctIndex: 1,
        explanation: "Coverage should be confirmed against the actual contract, not assumed.",
      },
      {
        id: "service-warranty-basics-q3",
        question: "What's a good next step if they have a specific issue?",
        options: ["Dismiss it", "Offer to have it reviewed", "Tell them it's definitely not covered", "Refuse further discussion"],
        correctIndex: 1,
        explanation: "Offering a review moves them toward a concrete answer.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "service-phone-estimate",
    role: "service",
    level: "newbie",
    title: "Phone Estimate Request",
    situation:
      "A caller wants a ballpark cost for brake pad replacement before bringing the car in.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/47173da3-0f21-453b-abfb-a974f71354d5.mp3",
    checklist: [
      "Gave a reasonable ballpark range while noting it's an estimate",
      "Explained that final pricing depends on inspection findings",
      "Asked about vehicle make/model for a more accurate range",
      "Avoided quoting a firm guaranteed price over the phone",
      "Offered to schedule an inspection for an exact quote",
    ],
    questions: [
      {
        id: "service-phone-estimate-q1",
        question: "How should phone estimates be framed?",
        options: ["As a guaranteed final price", "As a ballpark pending inspection", "Refuse to give any number", "Always the highest possible price"],
        correctIndex: 1,
        explanation: "Phone estimates are ballparks; final pricing depends on inspection.",
      },
      {
        id: "service-phone-estimate-q2",
        question: "What info helps give a better estimate?",
        options: ["Nothing needed", "Vehicle make/model", "Their zodiac sign", "Their address"],
        correctIndex: 1,
        explanation: "Make/model affects part costs and labor time.",
      },
      {
        id: "service-phone-estimate-q3",
        question: "What's the best next step to get an exact number?",
        options: ["Nothing further", "Schedule an inspection", "Guess higher and hope it's close", "Refuse repairs entirely"],
        correctIndex: 1,
        explanation: "An inspection gives the accurate, final pricing they need.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "service-inspection-followup",
    role: "service",
    level: "seasoned",
    title: "Inspection Findings Follow-Up",
    situation:
      "A caller wants a clear explanation of what was found during a recent vehicle inspection.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/34c96388-565d-4383-94b8-7f9b00a5adbe.mp3",
    checklist: [
      "Pulled up the specific inspection report before explaining",
      "Explained findings in plain language, not just technical jargon",
      "Prioritized findings by urgency (safety vs. routine maintenance)",
      "Answered questions about cost and timing for recommended repairs",
      "Avoided pressuring them into immediate approval",
    ],
    questions: [
      {
        id: "service-inspection-followup-q1",
        question: "Before explaining findings, you should:",
        options: ["Guess from memory", "Pull up the actual inspection report", "Make something up", "Refuse to discuss it"],
        correctIndex: 1,
        explanation: "Always reference the actual documented findings.",
      },
      {
        id: "service-inspection-followup-q2",
        question: "How should findings be prioritized when explaining?",
        options: ["Randomly", "By urgency, safety issues first", "Cheapest items first regardless of urgency", "Alphabetically"],
        correctIndex: 1,
        explanation: "Safety-critical issues should be communicated with appropriate priority.",
      },
      {
        id: "service-inspection-followup-q3",
        question: "Should you pressure immediate approval of all repairs?",
        options: ["Yes, always push for full approval now", "No, let them make an informed decision", "Yes, threaten with safety risk exaggeration", "No, refuse to discuss any repairs"],
        correctIndex: 1,
        explanation: "Informing rather than pressuring builds trust and long-term loyalty.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "service-second-opinion",
    role: "service",
    level: "seasoned",
    title: "Explaining a Repair Quote",
    situation:
      "A caller received a repair quote and wants a clear explanation of why it costs what it does before approving.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/84e7037f-9b21-4cc6-bf88-9e01c4d81c3c.mp3",
    checklist: [
      "Broke down the quote into parts and labor clearly",
      "Explained why specific parts/labor are needed for this repair",
      "Answered questions patiently without getting defensive",
      "Mentioned any warranty coverage on parts/labor if applicable",
      "Did not pressure them to approve on the spot",
    ],
    questions: [
      {
        id: "service-second-opinion-q1",
        question: "How should a quote be explained to a skeptical caller?",
        options: ["Refuse to break it down", "Clearly separate parts and labor costs", "Get defensive about the price", "Rush through it quickly"],
        correctIndex: 1,
        explanation: "A clear breakdown builds understanding and trust.",
      },
      {
        id: "service-second-opinion-q2",
        question: "What should you mention if applicable?",
        options: ["Nothing about warranty", "Any warranty coverage on parts/labor", "Unrelated dealership promotions", "Their previous unrelated visits"],
        correctIndex: 1,
        explanation: "Warranty coverage can materially change the customer's out-of-pocket cost.",
      },
      {
        id: "service-second-opinion-q3",
        question: "How should you handle pushback on price?",
        options: ["Get defensive", "Answer patiently without defensiveness", "Hang up", "Pressure immediate approval"],
        correctIndex: 1,
        explanation: "Patient, non-defensive answers keep the conversation productive.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "service-parts-backorder-reschedule",
    role: "service",
    level: "seasoned",
    title: "Parts Backorder Reschedule",
    situation:
      "A caller learns a part for their repair is on backorder and wants to know what that means for their appointment.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/9e07aae1-be94-4ea5-b49a-495f0902d3f8.mp3",
    checklist: [
      "Clearly explained what backorder means and the impact on timing",
      "Gave an honest estimated timeframe if known, or explained it's uncertain",
      "Offered to reschedule the appointment or proceed with other work first",
      "Offered to call them proactively once the part arrives",
      "Apologized for the inconvenience without overpromising",
    ],
    questions: [
      {
        id: "service-parts-backorder-reschedule-q1",
        question: "What should you clearly explain first?",
        options: ["Nothing, just reschedule silently", "What backorder means and its impact on timing", "Unrelated dealership news", "Their invoice history"],
        correctIndex: 1,
        explanation: "Clear explanation avoids confusion and frustration.",
      },
      {
        id: "service-parts-backorder-reschedule-q2",
        question: "Should you overpromise a delivery date if uncertain?",
        options: ["Yes, always give a firm date", "No, be honest about uncertainty", "Yes, guess optimistically", "No, refuse to give any timeframe"],
        correctIndex: 1,
        explanation: "Overpromising erodes trust if the date isn't met.",
      },
      {
        id: "service-parts-backorder-reschedule-q3",
        question: "What's a good proactive offer here?",
        options: ["Nothing further", "Calling them once the part arrives", "Ignoring the appointment entirely", "Charging a rescheduling fee"],
        correctIndex: 1,
        explanation: "Proactive follow-up reduces frustration and repeat calls.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "service-repeat-failure-refund-demand",
    role: "service",
    level: "superstar",
    title: "Repeat Repair Failure and Refund Demand",
    situation:
      "An angry caller says this is the third time the same problem has supposedly been fixed and it's broken again, demanding a full refund or threatening manufacturer reports and negative reviews.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/a4fad470-b865-47fc-b39b-8a20dcdafc49.mp3",
    checklist: [
      "Stayed calm and did not get defensive about the repeat failures",
      "Genuinely acknowledged the frustration and repeated inconvenience",
      "Did not promise a refund without proper manager/authority approval",
      "Immediately escalated to a service manager given the repeat-failure severity",
      "Documented the full repair history and current complaint before transferring",
    ],
    questions: [
      {
        id: "service-repeat-failure-refund-demand-q1",
        question: "How should you respond to repeated failure complaints and threats?",
        options: ["Get defensive about prior repairs", "Stay calm and genuinely acknowledge their frustration", "Hang up on the caller", "Promise nothing can be done"],
        correctIndex: 1,
        explanation: "Calm acknowledgment de-escalates and shows you take it seriously.",
      },
      {
        id: "service-repeat-failure-refund-demand-q2",
        question: "Should you promise a refund yourself?",
        options: ["Yes, promise it immediately", "No, escalate to someone with proper authority", "Yes, but only half a refund", "No, refuse to discuss it further"],
        correctIndex: 1,
        explanation: "Refund decisions typically require manager-level authority.",
      },
      {
        id: "service-repeat-failure-refund-demand-q3",
        question: "What should happen before escalating this call?",
        options: ["Nothing, just transfer blindly", "Document the full repair history and complaint", "Argue about the manufacturer threat", "Dismiss the review threat"],
        correctIndex: 1,
        explanation: "Documentation ensures the manager has full context to resolve it properly.",
      },
    ],
    passingScore: 85,
  },
];
