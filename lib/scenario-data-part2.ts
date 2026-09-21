import { Scenario } from "@/types";

export const scenariosPart2: Scenario[] = [
  {
    id: "reception-warranty-routing",
    role: "reception",
    level: "seasoned",
    title: "Warranty Question Routing",
    situation:
      "A caller has a vague issue (a noise) and isn't sure if it's covered under warranty or who to talk to.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/27c694c1-3210-4ebd-8be5-dbf3f82be8d7.mp3",
    checklist: [
      "Asked a few clarifying questions about the issue",
      "Recognized this belongs with Service, not Sales",
      "Explained why Service is the right department",
      "Passed along the details so the caller doesn't repeat themselves",
      "Confirmed a callback number if Service wasn't available",
    ],
    questions: [
      {
        id: "q1",
        question: "A vague mechanical issue and a warranty question should be routed to:",
        options: ["Sales", "Service", "Finance", "Whoever picks up first"],
        correctIndex: 1,
        explanation: "Service handles warranty coverage and mechanical concerns, not Sales.",
      },
      {
        id: "q2",
        question: "Before transferring, what should you do?",
        options: [
          "Nothing, just transfer blind",
          "Ask a couple of clarifying questions so Service isn't starting from zero",
          "Tell them it's probably not covered",
          "Ask them to call the manufacturer directly",
        ],
        correctIndex: 1,
        explanation: "A little context passed along saves the customer from repeating themselves.",
      },
      {
        id: "q3",
        question: "If Service can't take the call right now, you should:",
        options: [
          "Hang up",
          "Take a message with details and a callback number",
          "Tell them to call back themselves later",
          "Guess at an answer yourself",
        ],
        correctIndex: 1,
        explanation: "A detailed message with callback info keeps the ball moving without guessing on warranty coverage.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "reception-drive-by-vehicle",
    role: "reception",
    level: "superstar",
    title: "Vehicle Spotted While Driving By",
    situation:
      "A caller drove past the lot, saw a vehicle they liked, but has no stock number or exact details — just a rough description.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/288d7e71-d9cd-4ee1-b457-69705402409f.mp3",
    checklist: [
      "Asked clarifying questions to narrow down the vehicle (color, body style, location on lot)",
      "Stayed patient despite vague details",
      "Offered to have someone check the lot and call back if it couldn't be identified immediately",
      "Got a callback number before ending the call",
      "Invited them to come look in person as a backup option",
    ],
    questions: [
      {
        id: "q1",
        question: "With only a vague description, your best move is to:",
        options: [
          "Tell them you can't help without a stock number",
          "Ask clarifying questions (color, body style, where on the lot) to narrow it down",
          "Guess randomly at a vehicle",
          "Transfer them immediately with no attempt to help",
        ],
        correctIndex: 1,
        explanation: "Good clarifying questions can often identify the vehicle without a stock number.",
      },
      {
        id: "q2",
        question: "If you can't identify the exact vehicle on the call, you should:",
        options: [
          "Hang up",
          "Offer to check the lot and call them back, or invite them to stop by",
          "Tell them it was probably already sold",
          "Make up a description",
        ],
        correctIndex: 1,
        explanation: "A callback or an in-person invite keeps the lead alive instead of turning them away.",
      },
      {
        id: "q3",
        question: "What must you get before ending this call?",
        options: [
          "Nothing",
          "A callback number so someone can follow up with specifics",
          "Their email only",
          "A commitment to buy",
        ],
        correctIndex: 1,
        explanation: "A callback number ensures the lead isn't lost even if you couldn't answer everything live.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "reception-payment-demand",
    role: "reception",
    level: "superstar",
    title: "Caller Demanding an Exact Payment Now",
    situation:
      "A frustrated caller refuses to be transferred and insists the receptionist give them an exact payment figure immediately.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/f4fdd072-8e5b-46c5-8187-72a232971c27.mp3",
    checklist: [
      "Stayed calm and didn't get defensive under pressure",
      "Explained clearly why an exact figure requires a sales/finance specialist",
      "Avoided guessing at a number to appease the caller",
      "Offered a fast, concrete alternative (warm transfer or guaranteed quick callback)",
      "Kept control of the call without sounding dismissive",
    ],
    questions: [
      {
        id: "q1",
        question: "The caller refuses to be transferred and wants a number now. Best move?",
        options: [
          "Make up a number to end the call quickly",
          "Calmly explain why a specialist is needed for an accurate number and offer a fast alternative",
          "Argue with the caller",
          "Hang up",
        ],
        correctIndex: 1,
        explanation: "Staying calm and offering a concrete alternative de-escalates without making a risky guess.",
      },
      {
        id: "q2",
        question: "Why shouldn't you guess at a payment figure?",
        options: [
          "It's fine to guess, customers don't remember",
          "A wrong guess damages trust and can create a bigger problem later",
          "Receptionists are required to give numbers",
          "It saves time so it's worth the risk",
        ],
        correctIndex: 1,
        explanation: "An inaccurate number from the wrong person creates a worse outcome than a short wait for the right person.",
      },
      {
        id: "q3",
        question: "What's a strong alternative to offer this caller?",
        options: [
          "Nothing, just repeat that you can't help",
          "A warm transfer right now, or a guaranteed callback within a specific short time",
          "Tell them to email instead",
          "Suggest they call a different dealership",
        ],
        correctIndex: 1,
        explanation: "A concrete, time-bound alternative respects their urgency while keeping the number accurate.",
      },
    ],
    passingScore: 85,
  },
  // ---------- SERVICE ----------
  {
    id: "service-scheduling",
    role: "service",
    level: "newbie",
    title: "Routine Scheduling + Upsell Concern",
    situation: "A customer calls to schedule an oil change and mentions a possible brake noise.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/fd7ec813-db27-4f9f-aaef-5e5b07e75236.mp3",
    checklist: [
      "Asked clarifying questions about the brake noise",
      "Booked both services in the same appointment",
      "Set correct expectations on time needed at drop-off",
      "Offered a specific date/time rather than an open-ended one",
      "Repeated back the appointment details to confirm",
    ],
    questions: [
      {
        id: "q1",
        question: "The customer casually mentions a brake noise. You should:",
        options: [
          "Ignore it since they only asked about an oil change",
          "Ask a couple of clarifying questions and add a brake inspection to the same visit",
          "Tell them to call back separately for that",
          "Assume it's nothing serious",
        ],
        correctIndex: 1,
        explanation: "Capturing the full need in one visit is better service and protects safety.",
      },
      {
        id: "q2",
        question: "When confirming the appointment, you should:",
        options: [
          "Just say \"see you then\"",
          "Repeat back date, time, and services booked to confirm accuracy",
          "Avoid giving a specific time",
          "Let them guess what time works",
        ],
        correctIndex: 1,
        explanation: "Reading back the details avoids mixups and no-shows.",
      },
      {
        id: "q3",
        question: "Why offer a specific time instead of \"anytime this week\"?",
        options: [
          "It's not necessary",
          "Specific times reduce no-shows and set clear expectations for both sides",
          "Customers prefer vague answers",
          "It makes scheduling harder",
        ],
        correctIndex: 1,
        explanation: "Specific times create commitment and make it easier to plan shop capacity.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "service-status-check",
    role: "service",
    level: "newbie",
    title: "Repair Status Check-In",
    situation:
      "A customer dropped their car off for a check-engine light issue and hasn't heard back, and needs it for work.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/ce0d5e27-b48e-4335-9609-d0ce45b69bd3.mp3",
    checklist: [
      "Apologized for the lack of a proactive update",
      "Looked up the repair order before speculating",
      "Gave an honest, specific timeline",
      "Addressed their need for the car (loaner/rental option) if relevant",
      "Committed to a callback time and kept ownership of the issue",
    ],
    questions: [
      {
        id: "q1",
        question: "The customer is upset no one called them back. You should:",
        options: [
          "Blame the technician",
          "Briefly apologize and immediately look up the actual repair order status",
          "Say that's not your department",
          "Promise it'll be ready in 10 minutes without checking",
        ],
        correctIndex: 1,
        explanation: "A brief apology plus looking up real facts shows ownership and avoids guessing.",
      },
      {
        id: "q2",
        question: "They mention needing the car for work tomorrow. Best move?",
        options: [
          "Ignore that detail",
          "Proactively mention loaner/rental options if the repair won't be done in time",
          "Tell them that's their problem",
          "Promise the car will definitely be ready without checking",
        ],
        correctIndex: 1,
        explanation: "Addressing their real constraint (needing transportation) shows you're solving their problem, not just the car's.",
      },
      {
        id: "q3",
        question: "How should you end this call?",
        options: [
          "No commitment, just hang up",
          "A specific callback time/status update you'll personally own",
          "Tell them to call back again later",
          "Transfer them to a different advisor with no notes",
        ],
        correctIndex: 1,
        explanation: "A specific, owned commitment rebuilds trust after a missed update.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "service-recall-question",
    role: "service",
    level: "seasoned",
    title: "Recall Notice Follow-Up",
    situation:
      "A customer received a recall notice weeks ago and hasn't scheduled anything, and wants to understand what it's for.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/1de07543-12b3-497d-8449-ec90029d1fec.mp3",
    checklist: [
      "Looked up the specific recall for their VIN before explaining",
      "Explained the recall in plain, non-alarming language",
      "Gave a realistic estimate of repair time",
      "Addressed any safety concern directly and honestly",
      "Booked the appointment on the spot",
    ],
    questions: [
      {
        id: "q1",
        question: "Before explaining the recall, you should:",
        options: [
          "Guess based on the general recall type",
          "Look up the specific recall tied to their VIN",
          "Tell them to Google it",
          "Say recalls are never serious",
        ],
        correctIndex: 1,
        explanation: "Recalls vary by VIN and campaign — look up the specifics before explaining anything.",
      },
      {
        id: "q2",
        question: "How should you talk about the recall?",
        options: [
          "Downplay it entirely so they don't worry",
          "Explain it honestly and clearly, addressing any safety aspect directly",
          "Refuse to explain it and just book them",
          "Read the entire legal notice word for word",
        ],
        correctIndex: 1,
        explanation: "Clear, honest explanations build trust and don't leave the customer guessing.",
      },
      {
        id: "q3",
        question: "What's the ideal outcome of this call?",
        options: [
          "The customer hangs up still undecided",
          "The appointment gets booked on this same call",
          "Telling them to call back after they think it over",
          "Directing them to a different dealership",
        ],
        correctIndex: 1,
        explanation: "Since it's a safety-related repair, booking on the spot is best practice.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "service-reschedule",
    role: "service",
    level: "seasoned",
    title: "Rescheduling an Appointment",
    situation: "A customer with an existing appointment needs to move it to a different day due to a work conflict.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/28228597-120c-46eb-bc0d-d2aff632d6f0.mp3",
    checklist: [
      "Located the existing appointment quickly",
      "Offered the closest available alternative to their preferred day/time",
      "Confirmed all originally booked services carry over",
      "Repeated back the new appointment details",
      "Thanked them for calling ahead instead of no-showing",
    ],
    questions: [
      {
        id: "q1",
        question: "First step when a customer wants to reschedule?",
        options: [
          "Tell them to just show up whenever",
          "Look up their existing appointment before offering new times",
          "Cancel it with no rebooking",
          "Ask them to call back later",
        ],
        correctIndex: 1,
        explanation: "Find the existing appointment first so nothing gets lost or duplicated.",
      },
      {
        id: "q2",
        question: "When rebooking, you should make sure:",
        options: [
          "Only one of the original services carries over",
          "All originally booked services are still included in the new time slot",
          "The customer re-explains everything from scratch",
          "It doesn't matter what services were booked",
        ],
        correctIndex: 1,
        explanation: "Carrying over the full original booking avoids missing part of the needed service.",
      },
      {
        id: "q3",
        question: "How should you close this call?",
        options: [
          "No confirmation needed",
          "Repeat back the new date/time and thank them for calling ahead",
          "Just say \"okay\" and hang up",
          "Warn them not to reschedule again",
        ],
        correctIndex: 1,
        explanation: "Confirming details and thanking them reinforces good behavior (calling ahead vs. no-showing).",
      },
    ],
    passingScore: 75,
  },
  {
    id: "service-warranty-dispute",
    role: "service",
    level: "superstar",
    title: "Warranty Coverage Dispute",
    situation:
      "A customer insists a repair should be covered for free under warranty, pushing back hard when told it may not be covered.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/4321555d-abde-4600-89f0-397bced93999.mp3",
    checklist: [
      "Stayed calm and non-defensive despite the pushback",
      "Looked up the actual warranty terms before responding definitively",
      "Explained coverage clearly without being condescending",
      "Acknowledged their frustration even while delivering unwelcome news",
      "Offered any available alternative (goodwill consideration, manager review, cost breakdown)",
    ],
    questions: [
      {
        id: "q1",
        question: "The customer insists it should be free under warranty. First step?",
        options: [
          "Argue that they're wrong",
          "Look up the actual warranty terms before responding",
          "Agree just to end the conflict",
          "Tell them warranties never cover anything",
        ],
        correctIndex: 1,
        explanation: "Checking the real terms first avoids arguing from assumptions on either side.",
      },
      {
        id: "q2",
        question: "If the repair genuinely isn't covered, how should you deliver that?",
        options: [
          "Bluntly with no acknowledgment of their frustration",
          "Clearly and calmly, acknowledging their frustration, without being condescending",
          "By avoiding the topic",
          "By blaming the manufacturer entirely",
        ],
        correctIndex: 1,
        explanation: "Clear, respectful delivery keeps the relationship intact even when the news is unwelcome.",
      },
      {
        id: "q3",
        question: "What can you offer even when something isn't strictly covered?",
        options: [
          "Nothing, the conversation just ends",
          "A goodwill consideration, manager review, or a clear cost breakdown",
          "A free repair regardless of policy",
          "Tell them to dispute it with corporate themselves",
        ],
        correctIndex: 1,
        explanation: "Offering a path forward — even if not free — shows you're still trying to help.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "service-extended-contract-comparison",
    role: "service",
    level: "superstar",
    title: "Extended Service Contract Price Comparison",
    situation:
      "A customer is comparing extended service contract pricing against another shop and demands your exact price immediately, no ranges.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/25d7327c-610a-4b41-a770-64a4939a7777.mp3",
    checklist: [
      "Asked what coverage/term the competitor quote included before comparing",
      "Explained that an apples-to-apples comparison depends on matching coverage",
      "Gave the most accurate price/info available without stalling unnecessarily",
      "Highlighted relevant value (coverage, service network) not just price",
      "Set a next step if exact figures needed a specialist's confirmation",
    ],
    questions: [
      {
        id: "q1",
        question: "Before comparing prices, you should find out:",
        options: [
          "Nothing, just quote the lowest number possible",
          "What exact coverage/term the competitor's quote includes",
          "Where they got the competing quote",
          "Their payment method",
        ],
        correctIndex: 1,
        explanation: "Price comparisons are meaningless without matching coverage/term details first.",
      },
      {
        id: "q2",
        question: "The customer refuses to accept a range and wants an exact number. Best approach?",
        options: [
          "Give the most accurate number/info you can, and note anything that needs a quick specialist confirmation",
          "Refuse to give any information",
          "Make up a lower number to win the comparison",
          "Tell them to just go with the other shop",
        ],
        correctIndex: 0,
        explanation: "Being as concrete as possible while being honest about what needs confirming respects their urgency without overpromising.",
      },
      {
        id: "q3",
        question: "Besides price, what else is worth mentioning in this comparison?",
        options: [
          "Nothing else matters",
          "Relevant value like coverage details and your service network",
          "Unrelated dealership history",
          "Complaints about the competitor",
        ],
        correctIndex: 1,
        explanation: "Highlighting real value helps the customer make a fair comparison, not just a price race.",
      },
    ],
    passingScore: 85,
  },
];
