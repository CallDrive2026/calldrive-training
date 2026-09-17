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
  {
    id: "sales-test-drive-booking",
    role: "sales",
    level: "newbie",
    title: "New Model Test Drive Booking",
    situation:
      "A caller is excited about a newly arrived model and wants to schedule a test drive this weekend.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/f4dce57b-6451-40e5-a2e2-88efa6390072.mp3",
    checklist: [
      "Matched their enthusiasm with energy of your own",
      "Confirmed trim/features they're interested in",
      "Checked availability of that specific vehicle for the requested day",
      "Locked in a specific date and time",
      "Confirmed a phone number for a reminder/confirmation",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you match this caller's energy?",
        options: [
          "Stay flat and monotone",
          "Mirror their enthusiasm while staying professional",
          "Tell them not to get too excited",
          "Rush them off the phone",
        ],
        correctIndex: 1,
        explanation: "Matching energy builds rapport with an already-excited buyer.",
      },
      {
        id: "q2",
        question: "Before booking the test drive, you should confirm:",
        options: [
          "Nothing, just book any time",
          "That the specific vehicle/trim they want is available for that day",
          "Their exact budget",
          "Their current insurance provider",
        ],
        correctIndex: 1,
        explanation: "Confirming vehicle availability avoids a wasted trip if that unit isn't there.",
      },
      {
        id: "q3",
        question: "What should you do before ending the call?",
        options: [
          "Leave the time vague",
          "Lock in a specific date/time and confirm a callback number",
          "Tell them to just show up whenever",
          "Forget to get their contact info",
        ],
        correctIndex: 1,
        explanation: "A specific, confirmed appointment reduces no-shows.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "sales-trade-in-value",
    role: "sales",
    level: "seasoned",
    title: "Trade-In Value Inquiry",
    situation:
      "A caller wants to know what their current car is worth as a trade-in and whether they can get a value over the phone.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/c3805913-6d24-4699-8dca-84a531fef775.mp3",
    checklist: [
      "Asked year, make, model, mileage, and condition",
      "Explained why an in-person appraisal is more accurate than a phone estimate",
      "Avoided quoting a hard number over the phone",
      "Tied the trade-in into scheduling a visit",
      "Got contact info and a preferred time to come in",
    ],
    questions: [
      {
        id: "q1",
        question: "What should you gather before discussing trade-in value?",
        options: [
          "Nothing, just give a ballpark number",
          "Year, make, model, mileage, and condition of the vehicle",
          "Only the color of the car",
          "Their credit score",
        ],
        correctIndex: 1,
        explanation: "Basic vehicle details are the minimum needed to give any kind of useful estimate.",
      },
      {
        id: "q2",
        question: "Why avoid giving an exact trade-in value over the phone?",
        options: [
          "It's illegal to discuss trade-ins by phone",
          "An accurate value requires seeing the car in person",
          "Customers don't care about trade-in value",
          "It takes too long to explain",
        ],
        correctIndex: 1,
        explanation: "A phone estimate can't account for condition, so setting expectations for an in-person appraisal protects trust.",
      },
      {
        id: "q3",
        question: "What's the best way to end this call?",
        options: [
          "Tell them to call back later",
          "Invite them in for a quick in-person appraisal at a specific time",
          "Give a guaranteed number with no visit needed",
          "Transfer them without explanation",
        ],
        correctIndex: 1,
        explanation: "Turning the inquiry into a scheduled visit is the goal of the call.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "sales-lease-vs-buy",
    role: "sales",
    level: "seasoned",
    title: "Lease vs. Buy Pricing Callback",
    situation:
      "A caller test drove an SUV and was promised a callback comparing lease vs. finance pricing.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/6c31a791-f383-494a-8691-30589ec3b4a4.mp3",
    checklist: [
      "Confirmed who they test drove with / which vehicle",
      "Asked about monthly budget and mileage needs before quoting",
      "Explained lease vs. buy in simple terms",
      "Avoided over-promising exact numbers without a credit app",
      "Scheduled a specific follow-up appointment",
    ],
    questions: [
      {
        id: "q1",
        question: "Before quoting lease vs. buy numbers, you should:",
        options: [
          "Ask about their budget, mileage needs, and how long they plan to keep the vehicle",
          "Just read both numbers off the sheet",
          "Tell them to figure it out themselves",
          "Only discuss financing, ignore leasing",
        ],
        correctIndex: 0,
        explanation: "Good numbers depend on understanding their driving habits and budget first.",
      },
      {
        id: "q2",
        question: "How should you handle exact payment numbers over the phone?",
        options: [
          "Guarantee an exact payment with no conditions",
          "Give a realistic range and explain it firms up with a credit application",
          "Refuse to discuss any numbers",
          "Make up a low number to get them in",
        ],
        correctIndex: 1,
        explanation: "Ranges set correct expectations while still being helpful; guarantees you can't keep hurt trust.",
      },
      {
        id: "q3",
        question: "What's the ideal close for this call?",
        options: [
          "Ending the call with no follow-up",
          "A specific day/time appointment to finalize numbers in person",
          "Asking them to email their questions instead",
          "Telling them to call back whenever",
        ],
        correctIndex: 1,
        explanation: "A concrete appointment converts interest into a showroom visit.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "sales-price-match-payment-demand",
    role: "sales",
    level: "superstar",
    title: "Online Price Match + Exact Payment Demand",
    situation:
      "A caller found the exact vehicle listed cheaper on a website and is demanding you match it and give an exact monthly payment before they'll even come in.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/7df1c920-a9d8-4d99-91af-b487631838fb.mp3",
    checklist: [
      "Stayed calm and didn't get defensive about the competing listing",
      "Asked to see/confirm the exact listing before reacting",
      "Explained that a real payment depends on credit approval, trade, taxes/fees",
      "Avoided guaranteeing a number that could fall apart in person",
      "Still secured a specific appointment or firm next step",
    ],
    questions: [
      {
        id: "q1",
        question: "The caller demands an exact payment before coming in. Best response?",
        options: [
          "Refuse to engage at all",
          "Give a guaranteed number on the spot to close the call",
          "Explain what factors determine the real payment (credit, trade, taxes/fees) and offer a realistic range",
          "Tell them the other listing is fake",
        ],
        correctIndex: 2,
        explanation: "Real payments depend on several factors — educating the caller while giving a realistic range keeps you honest and in control.",
      },
      {
        id: "q2",
        question: "How should you handle the competing online listing?",
        options: [
          "Dismiss it as untrustworthy without looking into it",
          "Ask for the details/listing so you can address it specifically",
          "Immediately agree to beat any price sight unseen",
          "Ignore that they mentioned it",
        ],
        correctIndex: 1,
        explanation: "Engaging with specifics shows you're taking them seriously rather than being dismissive or reckless.",
      },
      {
        id: "q3",
        question: "What's the risk of guaranteeing an exact payment over the phone?",
        options: [
          "There is no risk",
          "It could be wrong once credit/trade/fees are factored in, damaging trust when they arrive",
          "It always helps close the deal faster",
          "It's required by law",
        ],
        correctIndex: 1,
        explanation: "An inaccurate guarantee that falls apart in person is worse than a well-explained range upfront.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "sales-financing-credit-concern",
    role: "sales",
    level: "superstar",
    title: "Financing Question with Credit Concerns",
    situation:
      "A caller is upfront that their credit isn't great and wants a guaranteed interest rate and payment before agreeing to come in.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/c9bcfadb-1991-4144-8634-21684f9ad7d8.mp3",
    checklist: [
      "Responded with empathy, not judgment, about their credit concern",
      "Explained that rate/payment depends on an actual credit application",
      "Reassured them that many credit situations can still be worked with",
      "Avoided promising a specific rate without an application",
      "Invited them to start a soft/no-obligation credit conversation",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you respond to their credit concern?",
        options: [
          "Tell them it's probably not going to work out",
          "Respond with empathy and explain the dealership works with a range of credit situations",
          "Ignore the concern and just quote a rate",
          "Ask them to fix their credit first and call back",
        ],
        correctIndex: 1,
        explanation: "Empathy keeps the caller engaged instead of scaring them off before they even apply.",
      },
      {
        id: "q2",
        question: "Can you guarantee an exact interest rate over the phone?",
        options: [
          "Yes, always",
          "No — actual rate depends on a real credit application and lender approval",
          "Only for good credit customers",
          "Only if they ask twice",
        ],
        correctIndex: 1,
        explanation: "Interest rates are lender-determined based on an actual application, not something to promise in advance.",
      },
      {
        id: "q3",
        question: "What's a good next step to offer this caller?",
        options: [
          "Tell them there's nothing you can do until they apply",
          "Offer a soft, no-obligation credit conversation or pre-qualification step",
          "Hang up since it's not a guaranteed sale",
          "Promise the best possible rate to get them in",
        ],
        correctIndex: 1,
        explanation: "A low-pressure next step keeps the door open without over-promising.",
      },
    ],
    passingScore: 85,
  },

  // ---------- RECEPTION ----------
  {
    id: "reception-hours-location",
    role: "reception",
    level: "newbie",
    title: "Hours & Location Info Call",
    situation:
      "A simple info call — the caller wants to know Saturday hours and exact location relative to the highway.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/09ca90b6-4955-4ee3-92cb-3c0ba28fd0ca.mp3",
    checklist: [
      "Answered clearly and confidently without checking multiple times",
      "Gave clear directions relative to a known landmark",
      "Asked if there was anything else they needed help with",
      "Used the moment to invite them in (soft opportunity)",
      "Kept the call brief and friendly",
    ],
    questions: [
      {
        id: "q1",
        question: "Even for a simple info call, you should still:",
        options: [
          "Rush them off as fast as possible",
          "Answer clearly and ask if there's anything else you can help with",
          "Transfer them to voicemail for basic info",
          "Give vague directions",
        ],
        correctIndex: 1,
        explanation: "Every call is an opportunity — a quick, helpful answer plus an open door for more.",
      },
      {
        id: "q2",
        question: "What's a good way to give directions?",
        options: [
          "Assume they know the area",
          "Reference a well-known landmark or exit",
          "Just give an address with no context",
          "Tell them to use GPS and hang up",
        ],
        correctIndex: 1,
        explanation: "Landmark-based directions are easier for callers to follow than an address alone.",
      },
      {
        id: "q3",
        question: "Should you try to create a soft opportunity on an info-only call?",
        options: [
          "No, just answer and hang up",
          "Yes — a brief, natural invite to stop by can turn info calls into visits",
          "Only if they ask about buying",
          "Never mention sales on an info call",
        ],
        correctIndex: 1,
        explanation: "A light, natural invite doesn't feel pushy and can turn a simple call into a visit.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "reception-routing-recall",
    role: "reception",
    level: "newbie",
    title: "Mixed Request: Paperwork + Recall",
    situation:
      "A past customer isn't sure who to talk to — they have a paperwork question AND a recall notice.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/58710239-fa28-45e3-9ef4-ab82ccb0af61.mp3",
    checklist: [
      "Stayed patient while the caller figured out what they needed",
      "Identified both requests before transferring",
      "Explained who they'd be transferred to and why",
      "Offered to take a message if the right person was unavailable",
      "Confirmed a callback number",
    ],
    questions: [
      {
        id: "q1",
        question: "The caller has two different needs. What should you do first?",
        options: [
          "Transfer immediately to the first department mentioned",
          "Politely identify both needs so you can route or message correctly",
          "Tell them to call back twice, once per issue",
          "Put them on hold indefinitely",
        ],
        correctIndex: 1,
        explanation: "Clarifying both needs prevents a mis-transfer and a frustrated second call.",
      },
      {
        id: "q2",
        question: "Before transferring a caller, best practice is to:",
        options: [
          "Just transfer silently",
          "Tell them who you're transferring them to and why",
          "Ask them to hang up and call the direct line",
          "Warn them the person probably won't help",
        ],
        correctIndex: 1,
        explanation: "Telling the caller who/why builds confidence the call is going to the right place.",
      },
      {
        id: "q3",
        question: "If the right person isn't available, you should:",
        options: [
          "Hang up",
          "Take a detailed message and confirm a callback number",
          "Tell them to call the manufacturer instead",
          "Leave them on hold with no explanation",
        ],
        correctIndex: 1,
        explanation: "A detailed message with callback info keeps the customer experience intact.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "reception-escalation",
    role: "reception",
    level: "seasoned",
    title: "Escalated / Frustrated Caller",
    situation:
      "A visibly frustrated customer calls the front desk because their car isn't ready as promised.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/4dde5743-e14c-4ff9-b259-bd9d4835821e.mp3",
    checklist: [
      "Let the customer vent without interrupting",
      "Apologized for the inconvenience without making excuses",
      "Avoided sounding defensive or dismissive",
      "Routed to the right person quickly with context passed along",
      "Set a clear expectation for what happens next",
    ],
    questions: [
      {
        id: "q1",
        question: "When a caller is angry, your first move should be:",
        options: [
          "Interrupt to defend the dealership immediately",
          "Let them finish, acknowledge the frustration, and apologize for the inconvenience",
          "Put them on hold right away",
          "Tell them to calm down",
        ],
        correctIndex: 1,
        explanation: "Letting them vent and acknowledging frustration de-escalates before you problem-solve.",
      },
      {
        id: "q2",
        question: "When you transfer this call, you should:",
        options: [
          "Transfer cold with no context",
          "Give the next person a quick heads-up on the situation before connecting",
          "Tell the caller it's not your problem",
          "Ask them to call back later",
        ],
        correctIndex: 1,
        explanation: "A warm handoff with context avoids making the customer repeat their frustration.",
      },
      {
        id: "q3",
        question: "What tone should you use throughout the call?",
        options: [
          "Defensive and rushed",
          "Calm, empathetic, and solution-focused",
          "Overly apologetic to the point of over-promising",
          "Flat and disinterested",
        ],
        correctIndex: 1,
        explanation: "Calm and solution-focused tone rebuilds trust without over-promising.",
      },
    ],
    passingScore: 75,
  },
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
