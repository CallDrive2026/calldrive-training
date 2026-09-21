import { Scenario } from "@/types";

export const scenariosPart3: Scenario[] = [
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
  // ---------- SALES ADDITIONS ----------
  {
    id: "sales-inventory-color-check",
    role: "sales",
    level: "newbie",
    title: "Inventory Color Check",
    situation:
      "A caller wants to know if a specific SUV is in stock in a particular color, or if it would need to be ordered.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/42f40b36-6a1a-43fe-b8d7-d17053384a6c.mp3",
    checklist: [
      "Asked which specific model/trim they're referring to",
      "Offered to check live inventory instead of guessing",
      "Explained the difference between in-stock and order/build options if not available",
      "Offered to text or email photos of the in-stock unit",
      "Invited them in for a test drive or to hold the vehicle",
    ],
    questions: [
      {
        id: "sales-inventory-color-check-q1",
        question: "What's the best first step when a caller asks about a specific color/trim?",
        options: ["Guess based on memory", "Check live inventory before answering", "Tell them to check the website themselves", "Say it's probably sold"],
        correctIndex: 1,
        explanation: "Always verify live inventory rather than guessing from memory.",
      },
      {
        id: "sales-inventory-color-check-q2",
        question: "If the color isn't in stock, what's the best next move?",
        options: ["End the call", "Explain order/build options and timelines", "Tell them to try a competitor", "Offer no alternative"],
        correctIndex: 1,
        explanation: "Give them a real path forward, like ordering the vehicle.",
      },
      {
        id: "sales-inventory-color-check-q3",
        question: "What builds confidence and urgency on this type of call?",
        options: ["Being vague about availability", "Offering to send photos and inviting them in", "Rushing the caller off the phone", "Quoting a price with no context"],
        correctIndex: 1,
        explanation: "Visual proof and an invitation to visit drive next steps.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "sales-first-time-buyer-basics",
    role: "sales",
    level: "newbie",
    title: "First-Time Buyer Basics",
    situation:
      "A caller has never bought a car before and wants a simple walkthrough of the buying process.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/0e0dc62c-86b3-4afd-8d64-7ef6670056e6.mp3",
    checklist: [
      "Used a warm, patient, jargon-free tone",
      "Explained the basic steps: browse/test drive, financing/paperwork, delivery",
      "Asked about budget and whether they plan to finance or pay cash",
      "Reassured them that staff will guide them through every step in person",
      "Invited them in for a no-pressure visit",
    ],
    questions: [
      {
        id: "sales-first-time-buyer-basics-q1",
        question: "How should you speak to a first-time buyer?",
        options: ["Use as much industry jargon as possible", "Simply and patiently, avoiding jargon", "Rush through details", "Assume they already know the process"],
        correctIndex: 1,
        explanation: "First-time buyers need clarity, not jargon.",
      },
      {
        id: "sales-first-time-buyer-basics-q2",
        question: "What's a key question to ask early in this call?",
        options: ["Their social security number", "Whether they plan to finance or pay cash", "Their exact credit score", "Nothing, just book an appointment"],
        correctIndex: 1,
        explanation: "Understanding financing intent shapes the right next steps.",
      },
      {
        id: "sales-first-time-buyer-basics-q3",
        question: "What tone reduces first-time buyer anxiety?",
        options: ["Pressuring them to decide today", "Reassuring and no-pressure", "Vague and rushed", "Overly technical"],
        correctIndex: 1,
        explanation: "A reassuring, no-pressure tone builds trust with new buyers.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "sales-stock-check-followup",
    role: "sales",
    level: "newbie",
    title: "Stock Check Follow-Up",
    situation:
      "A caller who inquired earlier wants to confirm a vehicle is still available and set up a time to see it.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/53c31592-da24-4076-bb70-2d8fc277b3d9.mp3",
    checklist: [
      "Looked up or asked for details from the earlier inquiry",
      "Confirmed current availability before promising anything",
      "Proposed a specific time for them to come see the vehicle",
      "Got a callback number in case plans change",
      "Thanked them for following up",
    ],
    questions: [
      {
        id: "sales-stock-check-followup-q1",
        question: "Before confirming availability, you should:",
        options: ["Assume it's still there", "Actually verify current status", "Tell them to just come by and hope", "Transfer them elsewhere"],
        correctIndex: 1,
        explanation: "Never assume — verify before setting expectations.",
      },
      {
        id: "sales-stock-check-followup-q2",
        question: "What's a strong close on a follow-up call like this?",
        options: ["Leave the timing vague", "Propose a specific appointment time", "Tell them to call back later", "End the call abruptly"],
        correctIndex: 1,
        explanation: "A specific time increases the odds they actually show up.",
      },
      {
        id: "sales-stock-check-followup-q3",
        question: "Why get a callback number?",
        options: ["It's not necessary", "In case plans change or vehicle sells", "To spam them later", "Company policy requires it for no reason"],
        correctIndex: 1,
        explanation: "A callback number lets you proactively update them if something changes.",
      },
    ],
    passingScore: 70,
  },
];
