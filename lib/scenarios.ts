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
  {
    id: "sales-competing-offers",
    role: "sales",
    level: "superstar",
    title: "Multiple Competing Offers Comparison",
    situation:
      "A caller claims to have offers from three other dealerships and challenges you to beat all of them combined before they'll even visit.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/46ccabc1-20c2-48aa-a304-dae995f08e1c.mp3",
    checklist: [
      "Stayed calm and didn't get pulled into a bidding war blind",
      "Asked to see the actual competing offers/details before reacting",
      "Focused on value and specifics rather than just chasing a number",
      "Avoided promising to 'beat' anything without details",
      "Still tried to secure an in-person visit or appointment",
    ],
    questions: [
      {
        id: "q1",
        question: "A caller claims multiple better offers exist. First move?",
        options: [
          "Immediately promise to beat all of them",
          "Ask to see the actual offers/details so you can respond specifically",
          "Call them a liar",
          "Give up on the call",
        ],
        correctIndex: 1,
        explanation: "Vague claims of competing offers need specifics before you can respond meaningfully.",
      },
      {
        id: "q2",
        question: "Without seeing real details, you should avoid:",
        options: [
          "Being friendly",
          "Promising to beat an offer you haven't actually seen",
          "Asking questions",
          "Offering an appointment",
        ],
        correctIndex: 1,
        explanation: "Blind promises can trap you into a deal you can't actually honor.",
      },
      {
        id: "q3",
        question: "What should you still try to secure by the end of the call?",
        options: [
          "Nothing, let them go compare",
          "An in-person visit or appointment to review real numbers together",
          "A guaranteed lowest price with no visit",
          "Their social media info",
        ],
        correctIndex: 1,
        explanation: "Getting them in the door lets you compete on the full picture, not just a phone bidding war.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "sales-fees-pushback",
    role: "sales",
    level: "superstar",
    title: "Advertised Price & Hidden Fees Pushback",
    situation:
      "A skeptical caller wants to know upfront whether the advertised price is the real out-the-door price or if fees/add-ons will be sprung on them later.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/c441d12a-b02d-4d89-9b26-630f5debd203.mp3",
    checklist: [
      "Answered honestly about what the advertised price includes",
      "Proactively explained typical fees (tax, title, doc fees) rather than hiding them",
      "Avoided being defensive about the question",
      "Built trust by being transparent rather than vague",
      "Still moved the conversation toward a visit or next step",
    ],
    questions: [
      {
        id: "q1",
        question: "A caller asks if the advertised price is truly out-the-door. Best response?",
        options: [
          "Get defensive and dodge the question",
          "Answer honestly and proactively explain what's included (tax, title, standard fees)",
          "Say there are no additional fees at all, regardless of truth",
          "Refuse to discuss pricing details on the phone",
        ],
        correctIndex: 1,
        explanation: "Transparency about standard fees builds trust and avoids a blowup at signing.",
      },
      {
        id: "q2",
        question: "Why is proactive honesty about fees important here?",
        options: [
          "It isn't, just avoid the topic",
          "It prevents a bigger trust problem when they arrive and see the real numbers",
          "Customers don't actually care about fees",
          "It's required to lie about fees to close deals",
        ],
        correctIndex: 1,
        explanation: "Surprise fees at the desk are one of the biggest trust-killers in car sales.",
      },
      {
        id: "q3",
        question: "After answering their fee question, you should:",
        options: [
          "End the call abruptly",
          "Use the trust you just built to move toward scheduling a visit",
          "Apologize repeatedly for fees existing",
          "Offer to waive all fees immediately",
        ],
        correctIndex: 1,
        explanation: "Transparency is a bridge to the next step, not just a defensive answer.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "reception-multi-location-confusion",
    role: "reception",
    level: "superstar",
    title: "Multi-Location Caller Confusion",
    situation:
      "A caller isn't sure which of your dealer group's locations has their vehicle, and has called other stores in the group before.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/6986ce13-8b1e-419d-8abf-cd5ca414e84f.mp3",
    checklist: [
      "Stayed patient while helping sort out which location is relevant",
      "Asked identifying details (name, phone number, vehicle) to look it up",
      "Coordinated across locations rather than assuming one",
      "Avoided making the caller repeat their whole story to a second location unnecessarily",
      "Confirmed the correct location and next step before ending the call",
    ],
    questions: [
      {
        id: "q1",
        question: "The caller isn't sure which location has their car. First step?",
        options: [
          "Guess a location and transfer",
          "Ask identifying details (name, phone, vehicle) to look it up properly",
          "Tell them to call every location themselves",
          "Assume it's always this location",
        ],
        correctIndex: 1,
        explanation: "Looking the customer up by identifying details avoids a wrong-location wild goose chase.",
      },
      {
        id: "q2",
        question: "If the car is actually at a different location in the group, you should:",
        options: [
          "Make them start over with no information passed along",
          "Coordinate the handoff so they don't have to repeat their whole story",
          "Tell them that's not your problem",
          "Refuse to help since it's not your location",
        ],
        correctIndex: 1,
        explanation: "A smooth cross-location handoff reflects well on the whole dealer group, not just one store.",
      },
      {
        id: "q3",
        question: "What should you confirm before ending the call?",
        options: [
          "Nothing",
          "The correct location and a clear next step",
          "Just say goodbye",
          "That they'll never call again",
        ],
        correctIndex: 1,
        explanation: "Clarity on location and next steps avoids repeat confused calls.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "reception-review-threat",
    role: "reception",
    level: "superstar",
    title: "Caller Threatening a Bad Review",
    situation:
      "A repeat caller with a recurring unresolved issue threatens to post a negative review immediately if it isn't handled today.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/e5618b47-d791-4893-a6bc-f44288097151.mp3",
    checklist: [
      "Took the threat seriously without sounding rattled or defensive",
      "Acknowledged this is a repeat, unresolved issue",
      "Prioritized getting the right person to resolve it same-day",
      "Avoided arguing about whether the review is 'fair'",
      "Followed up with a clear, urgent next step",
    ],
    questions: [
      {
        id: "q1",
        question: "A caller threatens an immediate bad review. Best reaction?",
        options: [
          "Argue that the review would be unfair",
          "Stay calm, acknowledge the repeat issue, and prioritize getting it resolved today",
          "Beg them not to post it",
          "Hang up",
        ],
        correctIndex: 1,
        explanation: "Calm acknowledgment plus real urgency addresses the actual problem instead of the threat itself.",
      },
      {
        id: "q2",
        question: "Since this is a repeat, unresolved issue, you should:",
        options: [
          "Treat it like a first-time call",
          "Acknowledge the history and escalate/prioritize accordingly",
          "Tell them to stop calling",
          "Ignore the pattern",
        ],
        correctIndex: 1,
        explanation: "Recognizing the pattern shows you're taking the ongoing frustration seriously.",
      },
      {
        id: "q3",
        question: "What's the right way to close this call?",
        options: [
          "No follow-up, just hope it goes away",
          "A clear, urgent next step with real ownership",
          "A vague promise with no timeline",
          "Blaming another department",
        ],
        correctIndex: 1,
        explanation: "Concrete urgency is what actually prevents the review, not arguing about it.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "service-diagnostic-fee-dispute",
    role: "service",
    level: "superstar",
    title: "Diagnostic Fee Dispute",
    situation:
      "A customer is upset to learn about a diagnostic fee they say was never explained when they dropped the car off.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/bd328fb8-089f-4960-bd71-b94810a08f1f.mp3",
    checklist: [
      "Acknowledged the miscommunication without being defensive",
      "Verified what was actually disclosed at drop-off before responding",
      "Explained clearly why a diagnostic fee applies",
      "Looked for a fair resolution (waive, apply toward repair, etc.) where reasonable",
      "Made sure future drop-offs won't repeat this same confusion",
    ],
    questions: [
      {
        id: "q1",
        question: "The customer says the fee was never disclosed. First step?",
        options: [
          "Insist they're wrong without checking",
          "Acknowledge the concern and check what was actually communicated at drop-off",
          "Immediately waive it with no discussion",
          "Argue about it",
        ],
        correctIndex: 1,
        explanation: "Verifying the facts first avoids either wrongly blaming the customer or admitting fault you don't actually have.",
      },
      {
        id: "q2",
        question: "How should you explain the diagnostic fee?",
        options: [
          "Don't explain it, just charge it",
          "Clearly and calmly, explaining what it covers",
          "Blame the technician for the confusion",
          "Tell them it's non-negotiable and hang up",
        ],
        correctIndex: 1,
        explanation: "A clear explanation helps the customer understand the value even if they're frustrated.",
      },
      {
        id: "q3",
        question: "If there was a genuine miscommunication, a fair move is to:",
        options: [
          "Do nothing differently",
          "Consider waiving or applying the fee toward the repair as a goodwill gesture",
          "Charge double for the inconvenience",
          "Refuse service going forward",
        ],
        correctIndex: 1,
        explanation: "A reasonable goodwill gesture when your team may have fallen short protects the relationship.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "service-loaner-unavailable",
    role: "service",
    level: "superstar",
    title: "Loaner Car Unavailable",
    situation:
      "A customer was promised a loaner car that isn't available, and they need to be at work in 20 minutes.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/6bd634b8-f53a-4f0a-bf53-85787bda9564.mp3",
    checklist: [
      "Owned the miscommunication without excessive excuse-making",
      "Immediately looked for alternative solutions (rental, shuttle, ride service)",
      "Respected the urgency of their time constraint",
      "Gave a clear, fast plan rather than stalling",
      "Followed up to confirm the alternative actually worked out",
    ],
    questions: [
      {
        id: "q1",
        question: "The promised loaner isn't available and the customer is time-pressured. First priority?",
        options: [
          "Explain in detail why it's not your fault",
          "Quickly find an alternative solution (rental, shuttle, ride service)",
          "Tell them to wait until one frees up with no timeline",
          "Suggest they reschedule their whole day",
        ],
        correctIndex: 1,
        explanation: "Time-pressured customers need a fast alternative, not an explanation first.",
      },
      {
        id: "q2",
        question: "How should you handle the broken promise?",
        options: [
          "Ignore that it was promised",
          "Own it briefly and pivot immediately to solving the problem",
          "Blame whoever scheduled it",
          "Argue that it was never actually promised",
        ],
        correctIndex: 1,
        explanation: "A brief, honest acknowledgment plus fast action rebuilds trust better than excuses.",
      },
      {
        id: "q3",
        question: "After arranging an alternative, you should:",
        options: [
          "Assume it's handled and move on",
          "Confirm it actually worked out for them",
          "Not follow up at all",
          "Charge them for the inconvenience",
        ],
        correctIndex: 1,
        explanation: "Following up ensures the fix actually solved their problem, not just moved it.",
      },
    ],
    passingScore: 85,
  },
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
  "https://galaxy-prod.tlcdn.com/view/user_39iXjxyQdmhoj5bVhki8e1ab0c2/e0b6490a4d464bb1935e4e671e33d475.png";
