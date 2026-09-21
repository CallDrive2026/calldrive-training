import { Scenario } from "@/types";

export const scenariosPart7: Scenario[] = [
  {
    id: "sales-exact-payment-calculation",
    role: "sales",
    level: "superstar",
    title: "Exact Payment Calculation Demand",
    situation:
      "A caller wants an exact, guaranteed monthly payment calculated on the spot with a specific down payment and trade-in, before they'll agree to come in.",
    audioUrl:
      "https://static.magica.com/4102daa72bb7422da38850a8ea12d615.mp3",
    checklist: [
      "Confirmed the exact vehicle and trim before running any numbers",
      "Explained that a firm payment depends on credit approval and trade appraisal",
      "Gave a realistic estimated range rather than a guaranteed number",
      "Avoided being defensive about the request for exact figures",
      "Still secured a specific appointment or next step",
    ],
    questions: [
      {
        id: "q1",
        question: "The caller demands an exact payment with a specific down payment and trade before committing to anything. Best first move?",
        options: [
          "Refuse to discuss numbers at all",
          "Confirm the exact vehicle/trim first, since payment depends on that",
          "Guess at a number to keep them on the phone",
          "Tell them to just come in with no explanation",
        ],
        correctIndex: 1,
        explanation: "Accurate numbers require knowing the exact vehicle first — everything else builds on that.",
      },
      {
        id: "q2",
        question: "Why can't you guarantee an exact payment over the phone?",
        options: [
          "It's against the law",
          "Credit approval and trade appraisal both affect the real number",
          "Customers don't actually want a real number",
          "It's fine to guarantee it, nobody checks later",
        ],
        correctIndex: 1,
        explanation: "Both financing terms and trade value are confirmed in person — a phone number is only an estimate.",
      },
      {
        id: "q3",
        question: "What should you still aim to secure by the end of this call?",
        options: [
          "Nothing further",
          "A specific appointment to finalize real numbers in person",
          "A guaranteed payment with no visit",
          "Their agreement that the number will change",
        ],
        correctIndex: 1,
        explanation: "A concrete next step turns a pricing standoff into a real opportunity.",
      },
    ],
    passingScore: 85,
  },
  {
    id: "sales-lease-end-options",
    role: "sales",
    level: "seasoned",
    title: "Lease-End Options Walkthrough",
    situation:
      "A caller's lease is ending in about six weeks and they're unsure whether to buy it out, trade it in, or lease something new.",
    audioUrl:
      "https://static.magica.com/2066264ba1ba4b8184e745a205fe5de1.mp3",
    checklist: [
      "Asked which option matters most to them (keeping the car, lowest payment, newest features)",
      "Clearly explained the buyout, trade-in, and new-lease paths in simple terms",
      "Mentioned any lease-end fees or mileage overage they should check",
      "Avoided pushing only the highest-margin option",
      "Invited them in to review their actual lease-end paperwork",
    ],
    questions: [
      {
        id: "q1",
        question: "Before explaining the three options, you should:",
        options: [
          "Launch into all three immediately",
          "Ask what matters most to them (payment, keeping the car, new features)",
          "Only mention the buyout option",
          "Tell them it doesn't matter which they pick",
        ],
        correctIndex: 1,
        explanation: "Tailoring the explanation to their priority makes the conversation useful instead of a generic script.",
      },
      {
        id: "q2",
        question: "What should you proactively mention that could affect their decision?",
        options: [
          "Nothing extra",
          "Potential lease-end fees or mileage overage charges",
          "Unrelated financing promotions",
          "Their neighbor's lease terms",
        ],
        correctIndex: 1,
        explanation: "Lease-end fees and mileage charges materially change which option makes sense.",
      },
      {
        id: "q3",
        question: "What's the best way to move this forward?",
        options: [
          "Tell them to decide on their own and call back",
          "Invite them in to review their actual lease-end paperwork",
          "Guess at their mileage and fees",
          "End the call with no next step",
        ],
        correctIndex: 1,
        explanation: "Real numbers require their actual lease documents, so getting them in is the natural next step.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "sales-manufacturer-incentive-question",
    role: "sales",
    level: "newbie",
    title: "Manufacturer Incentive Question",
    situation:
      "A caller saw an advertised rebate on a new SUV and wants to know if it's still active and whether it stacks with other discounts.",
    audioUrl:
      "https://static.magica.com/009dbe0461e14d8b9cd483f6d57bb744.mp3",
    checklist: [
      "Confirmed the exact vehicle/model the rebate applies to",
      "Gave an honest, current answer rather than guessing from memory",
      "Explained clearly whether incentives can be combined",
      "Avoided overpromising a stacked discount that may not apply",
      "Invited them in to see the real numbers with the incentive applied",
    ],
    questions: [
      {
        id: "q1",
        question: "Before answering about the rebate, you should:",
        options: [
          "Guess based on general SUV promotions",
          "Confirm the exact vehicle/model the rebate applies to",
          "Assume it applies to everything",
          "Tell them to check the manufacturer's website only",
        ],
        correctIndex: 1,
        explanation: "Incentives are usually model-specific, so confirming the exact vehicle avoids giving wrong information.",
      },
      {
        id: "q2",
        question: "How should you handle whether incentives stack?",
        options: [
          "Always say yes to close the deal",
          "Give an honest, accurate answer about what can combine",
          "Refuse to discuss it",
          "Say they never stack, regardless of the truth",
        ],
        correctIndex: 1,
        explanation: "Honest answers about stacking prevent a frustrating surprise when they arrive.",
      },
      {
        id: "q3",
        question: "What's a good way to close this call?",
        options: [
          "End with no next step",
          "Invite them in to see the real numbers with the incentive applied",
          "Tell them to call back later",
          "Quote a final price with no visit",
        ],
        correctIndex: 1,
        explanation: "Seeing real numbers in person confirms the incentive actually applies to their deal.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "sales-appointment-noshow-followup",
    role: "sales",
    level: "seasoned",
    title: "Missed Test Drive Reschedule",
    situation:
      "A caller missed their scheduled test drive appointment yesterday because something came up at work, and wants to know if it's too late to reschedule.",
    audioUrl:
      "https://static.magica.com/f61d739e49c5430b88f6c612d6f1a429.mp3",
    checklist: [
      "Reassured them it's not too late without making them feel bad",
      "Looked up or asked for their original appointment details",
      "Offered a specific new day/time rather than an open-ended one",
      "Confirmed the vehicle they were coming to see is still relevant/available",
      "Got a callback number and confirmed the new appointment before ending",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you respond when they apologize for missing the appointment?",
        options: [
          "Make them feel guilty about it",
          "Reassure them it's not a problem and offer to reschedule",
          "Tell them they lost their spot",
          "Ignore the apology and move on",
        ],
        correctIndex: 1,
        explanation: "A reassuring tone keeps the lead warm instead of making them hesitant to call back again.",
      },
      {
        id: "q2",
        question: "What should you check before offering a new time?",
        options: [
          "Nothing, just pick a random time",
          "Whether the vehicle they wanted is still relevant/available",
          "Their exact work schedule in detail",
          "Their reason for missing it",
        ],
        correctIndex: 1,
        explanation: "Confirming the vehicle is still available avoids setting up a wasted second trip.",
      },
      {
        id: "q3",
        question: "What should you confirm before ending the call?",
        options: [
          "Nothing further",
          "A specific new appointment time and a callback number",
          "That they won't miss it again",
          "A guaranteed discount for missing the first one",
        ],
        correctIndex: 1,
        explanation: "Locking in a specific time and contact info reduces the odds of a second no-show.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "sales-extended-warranty-upsell",
    role: "sales",
    level: "newbie",
    title: "Is the Extended Warranty Worth It?",
    situation:
      "A caller who was quoted numbers online is skeptical about the extended warranty add-on and wants an honest opinion on whether it's worth it.",
    audioUrl:
      "https://static.magica.com/83f6ec6da49840138302e0982689a0fd.mp3",
    checklist: [
      "Answered honestly rather than just pushing the upsell",
      "Explained what the extended warranty actually covers",
      "Related the coverage to their specific situation (mileage, how long they'll keep it)",
      "Avoided being pushy or dismissive of their skepticism",
      "Left the decision with them without pressure",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you respond to their skepticism about the warranty being a sales tactic?",
        options: [
          "Get defensive and insist it's essential",
          "Answer honestly about what it covers and let them decide",
          "Agree it's a scam to build rapport",
          "Refuse to discuss it further",
        ],
        correctIndex: 1,
        explanation: "Honest, non-pushy answers build more trust than either overselling or dismissing the product.",
      },
      {
        id: "q2",
        question: "What helps them decide if it's worth it for them specifically?",
        options: [
          "A generic answer with no context",
          "Relating coverage to their mileage and how long they'll keep the car",
          "Telling them everyone needs it",
          "Refusing to give any details",
        ],
        correctIndex: 1,
        explanation: "Extended warranty value depends heavily on individual driving habits and ownership length.",
      },
      {
        id: "q3",
        question: "What's the right tone to use here?",
        options: [
          "Pushy and urgent",
          "Informative and pressure-free",
          "Dismissive of the product",
          "Evasive about the details",
        ],
        correctIndex: 1,
        explanation: "A pressure-free, informative tone respects the caller's skepticism while still being helpful.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "reception-promised-callback-tracking",
    role: "reception",
    level: "seasoned",
    title: "Third Call About the Same Unfulfilled Promise",
    situation:
      "A caller says this is their third call this week because two promised callbacks about their paperwork never happened, and they want real follow-through this time.",
    audioUrl:
      "https://static.magica.com/f270ab471c7545719033e9122894e1c8.mp3",
    checklist: [
      "Acknowledged the repeated broken promise without making excuses",
      "Avoided promising another vague callback that might not happen",
      "Took ownership of getting them a real update today",
      "Documented the issue clearly so it doesn't get dropped again",
      "Gave a specific, realistic time they'll hear back",
    ],
    questions: [
      {
        id: "q1",
        question: "How should you respond to a caller who says this is their third unanswered callback request?",
        options: [
          "Blame whoever missed the callbacks",
          "Acknowledge the pattern and take ownership of fixing it this time",
          "Tell them to keep calling until someone answers",
          "Argue that it probably wasn't three times",
        ],
        correctIndex: 1,
        explanation: "Acknowledging the pattern and owning the fix rebuilds trust instead of adding another excuse.",
      },
      {
        id: "q2",
        question: "What should you avoid doing this time?",
        options: [
          "Documenting the issue",
          "Promising another vague callback with no real commitment",
          "Getting them a real update now if possible",
          "Setting a specific follow-up time",
        ],
        correctIndex: 1,
        explanation: "After two broken promises, a vague third promise will not rebuild confidence.",
      },
      {
        id: "q3",
        question: "What makes a follow-up commitment credible after repeated misses?",
        options: [
          "A vague \"someone will call\"",
          "A specific, realistic time paired with documentation of the issue",
          "No commitment at all",
          "Blaming the customer for calling too much",
        ],
        correctIndex: 1,
        explanation: "Specificity and documentation are what actually prevent a fourth missed callback.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "reception-new-caller-first-impression",
    role: "reception",
    level: "newbie",
    title: "Simple Inventory Availability Question",
    situation:
      "A caller wants to know if the dealership carries the diesel version of a specific truck trim, or if they need to look elsewhere.",
    audioUrl:
      "https://static.magica.com/6dddb7f78f5549208f257307b77248b9.mp3",
    checklist: [
      "Answered clearly and confidently rather than guessing",
      "Offered to check current inventory if unsure on the spot",
      "Avoided making the caller feel like a bother for asking",
      "Gave a helpful next step regardless of the answer",
      "Kept the tone warm and welcoming",
    ],
    questions: [
      {
        id: "q1",
        question: "If you're not immediately sure whether the diesel trim is in stock, you should:",
        options: [
          "Guess to avoid delay",
          "Offer to check current inventory and follow up",
          "Tell them to Google it",
          "Say no just to end the call quickly",
        ],
        correctIndex: 1,
        explanation: "Checking real inventory avoids giving inaccurate information that could send a customer away needlessly.",
      },
      {
        id: "q2",
        question: "What tone should you use with a brand-new caller asking a simple question?",
        options: [
          "Rushed and short",
          "Warm and welcoming",
          "Indifferent",
          "Overly formal and cold",
        ],
        correctIndex: 1,
        explanation: "A first-time caller's impression of the dealership starts with this simple interaction.",
      },
      {
        id: "q3",
        question: "If the diesel trim isn't currently in stock, what should you still offer?",
        options: [
          "Nothing further",
          "A helpful next step, like checking availability elsewhere in the group or ordering",
          "Tell them to try a competitor",
          "End the call abruptly",
        ],
        correctIndex: 1,
        explanation: "Offering a path forward turns a \"no\" into a continued opportunity.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "reception-parts-department-routing",
    role: "reception",
    level: "newbie",
    title: "Key Fob Replacement Routing",
    situation:
      "A caller needs a replacement key fob for their vehicle and isn't sure who handles that.",
    audioUrl:
      "https://static.magica.com/04512487225741778c193d91cd1badf2.mp3",
    checklist: [
      "Correctly identified that parts (or service, depending on process) handles key fobs",
      "Asked basic details (vehicle make/model/year) to help the right department",
      "Explained why they're being routed there",
      "Offered to take a message if the right person wasn't available",
      "Confirmed a callback number before ending the call",
    ],
    questions: [
      {
        id: "q1",
        question: "A key fob replacement request should typically be routed to:",
        options: [
          "Sales",
          "Parts or Service (whichever handles it at this store)",
          "Whoever answers first",
          "The caller should call the manufacturer instead",
        ],
        correctIndex: 1,
        explanation: "Parts/Service departments handle key fob programming and replacement, not Sales.",
      },
      {
        id: "q2",
        question: "What should you gather before transferring?",
        options: [
          "Nothing at all",
          "Basic vehicle details like make/model/year",
          "Their full driving history",
          "Their trade-in value",
        ],
        correctIndex: 1,
        explanation: "Basic vehicle info helps the receiving department prepare instead of starting from zero.",
      },
      {
        id: "q3",
        question: "If the right department can't take the call immediately, you should:",
        options: [
          "Hang up",
          "Take a detailed message and confirm a callback number",
          "Tell them to call back themselves later",
          "Guess at pricing yourself",
        ],
        correctIndex: 1,
        explanation: "A message with callback info keeps the request moving instead of losing it.",
      },
    ],
    passingScore: 70,
  },
];
