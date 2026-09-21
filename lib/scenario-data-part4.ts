import { Scenario } from "@/types";

export const scenariosPart4: Scenario[] = [
  {
    id: "sales-trim-comparison",
    role: "sales",
    level: "seasoned",
    title: "Trim Level Comparison",
    situation:
      "A caller is deciding between the base model and an upgraded trim package and wants the real differences explained.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/342fd4e7-4783-47e8-9299-2da2df85c926.mp3",
    checklist: [
      "Asked what features matter most to the caller before explaining differences",
      "Clearly outlined feature/price differences between trims",
      "Tied differences to the caller's stated needs, not just a feature list",
      "Mentioned availability of each trim",
      "Invited them in to compare both in person",
    ],
    questions: [
      {
        id: "sales-trim-comparison-q1",
        question: "Before explaining trim differences, you should:",
        options: ["Launch into a full feature list immediately", "Ask what matters most to the caller", "Recommend the most expensive one first", "Say trims don't really matter"],
        correctIndex: 1,
        explanation: "Tailoring the explanation to their priorities makes it relevant.",
      },
      {
        id: "sales-trim-comparison-q2",
        question: "What's most persuasive when comparing trims?",
        options: ["A generic list of specs", "Connecting features to their specific needs", "Pressuring them into the upgrade", "Downplaying the base model entirely"],
        correctIndex: 1,
        explanation: "Relevance to their needs is more persuasive than a spec dump.",
      },
      {
        id: "sales-trim-comparison-q3",
        question: "What should you always confirm during this call?",
        options: ["Nothing else is needed", "Availability of each trim", "Their exact income", "Their marital status"],
        correctIndex: 1,
        explanation: "There's no point comparing trims that aren't actually available.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "sales-cpo-vs-new",
    role: "sales",
    level: "seasoned",
    title: "Certified Pre-Owned vs. New",
    situation:
      "A caller is torn between a certified pre-owned vehicle and a brand-new one and wants the real difference explained.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/e8eefced-584e-4662-b65d-45361cf80952.mp3",
    checklist: [
      "Explained what 'certified pre-owned' actually includes (inspection, warranty)",
      "Compared price and warranty coverage honestly between CPO and new",
      "Asked about budget and priorities (newest tech vs. value)",
      "Avoided steering them only toward the higher-margin option",
      "Offered to show both options side by side",
    ],
    questions: [
      {
        id: "sales-cpo-vs-new-q1",
        question: "What does 'certified pre-owned' typically include?",
        options: ["Nothing extra vs. a regular used car", "A multi-point inspection and extended warranty coverage", "Only a new coat of paint", "A shorter warranty than new"],
        correctIndex: 1,
        explanation: "CPO vehicles undergo inspection and come with added warranty coverage.",
      },
      {
        id: "sales-cpo-vs-new-q2",
        question: "How should you approach this comparison?",
        options: ["Push whichever has higher margin", "Honestly compare based on their needs and budget", "Refuse to discuss CPO options", "Only discuss price, ignore warranty"],
        correctIndex: 1,
        explanation: "Honest, needs-based comparison builds trust and long-term loyalty.",
      },
      {
        id: "sales-cpo-vs-new-q3",
        question: "What's a good way to help them decide?",
        options: ["Show both options side by side", "Only describe one option", "Rush them into the more expensive choice", "Refuse to compare warranties"],
        correctIndex: 0,
        explanation: "Side-by-side comparison helps customers make an informed choice.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "sales-trade-equity-downpayment",
    role: "sales",
    level: "seasoned",
    title: "Trade Equity as Down Payment",
    situation:
      "A caller has a trade-in and some cash and isn't sure how both combine toward a down payment.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/45917722-934f-43ca-b132-b27dc4478478.mp3",
    checklist: [
      "Explained that trade equity plus cash can combine into the total down payment",
      "Asked for basic trade details (year/make/model/mileage/condition)",
      "Clarified that trade value is confirmed with an in-person appraisal, not a phone quote",
      "Avoided giving a firm number over the phone",
      "Invited them in for an appraisal and financing conversation",
    ],
    questions: [
      {
        id: "sales-trade-equity-downpayment-q1",
        question: "How do trade equity and cash typically combine?",
        options: ["They can't be combined", "Both can count toward the total down payment", "Only cash counts toward a down payment", "Trade equity replaces financing entirely"],
        correctIndex: 1,
        explanation: "Trade equity and cash can both contribute to the total down payment.",
      },
      {
        id: "sales-trade-equity-downpayment-q2",
        question: "Should you give a firm trade value over the phone?",
        options: ["Yes, always quote an exact number", "No, an in-person appraisal is needed for accuracy", "Only if they insist repeatedly", "Yes, but double it"],
        correctIndex: 1,
        explanation: "Trade values require in-person inspection for an accurate number.",
      },
      {
        id: "sales-trade-equity-downpayment-q3",
        question: "What info should you gather on this call?",
        options: ["Nothing, just book them in", "Basic trade details like year/make/model/mileage", "Only their phone number", "Their exact bank balance"],
        correctIndex: 1,
        explanation: "Basic trade details let you prepare before their visit.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "sales-simultaneous-negotiation",
    role: "sales",
    level: "superstar",
    title: "Simultaneous Price and Trade Negotiation Under Pressure",
    situation:
      "An aggressive caller demands a combined best price on the new vehicle and their trade-in immediately, citing competing offers, and threatens to hang up.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/5a1dfbbc-bcfa-4e3c-ade8-2d0253a56470.mp3",
    checklist: [
      "Stayed calm and did not match the caller's aggressive tone",
      "Explained that an accurate combined number requires basic vehicle and trade details",
      "Did not invent a number just to keep them on the phone",
      "Offered to get them a real, honest figure quickly if they can come in or provide details",
      "Kept the door open even if they threaten to hang up",
    ],
    questions: [
      {
        id: "sales-simultaneous-negotiation-q1",
        question: "How should you respond to aggressive urgency and threats?",
        options: ["Match their aggressive tone", "Stay calm and professional", "Hang up first", "Agree to any number they demand"],
        correctIndex: 1,
        explanation: "Staying calm de-escalates and keeps the conversation productive.",
      },
      {
        id: "sales-simultaneous-negotiation-q2",
        question: "Should you make up a combined number on the spot?",
        options: ["Yes, to keep them from hanging up", "No, that risks a broken promise later", "Yes, always overestimate", "Yes, always underestimate"],
        correctIndex: 1,
        explanation: "Inventing numbers erodes trust when the real figures differ later.",
      },
      {
        id: "sales-simultaneous-negotiation-q3",
        question: "What's the best way to keep this caller engaged?",
        options: ["Let them hang up without a plan", "Offer a clear next step to get a real number fast", "Refuse to discuss trade value at all", "Tell them to call a competitor"],
        correctIndex: 1,
        explanation: "Giving a concrete path to a real answer keeps them engaged despite pressure.",
      },
    ],
    passingScore: 85,
  },
  // ---------- RECEPTION ADDITIONS ----------
  {
    id: "reception-buying-documents",
    role: "reception",
    level: "newbie",
    title: "What Documents to Bring",
    situation:
      "A caller planning to buy this weekend wants to know what documents they need to bring.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/df01f9d7-0980-4082-a828-2ae783da284a.mp3",
    checklist: [
      "Listed standard documents (ID, proof of insurance, proof of income if financing)",
      "Asked if they're financing or paying cash to tailor the list",
      "Mentioned trade-in title/registration if applicable",
      "Offered to connect them to sales for anything specific",
      "Confirmed their appointment day/time",
    ],
    questions: [
      {
        id: "reception-buying-documents-q1",
        question: "What's a standard document most buyers need?",
        options: ["Passport only", "A valid ID", "Their high school diploma", "Nothing at all"],
        correctIndex: 1,
        explanation: "A valid ID is a standard requirement for any purchase.",
      },
      {
        id: "reception-buying-documents-q2",
        question: "Why ask if they're financing or paying cash?",
        options: ["It doesn't matter", "It changes which documents are needed", "To be nosy", "To delay the call"],
        correctIndex: 1,
        explanation: "Financing usually requires proof of income, which cash purchases don't.",
      },
      {
        id: "reception-buying-documents-q3",
        question: "If they have a trade-in, what should you mention?",
        options: ["Nothing extra", "Bringing the title/registration for the trade", "They can't trade in", "They need a lawyer present"],
        correctIndex: 1,
        explanation: "Trade-ins require proof of ownership documents.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "reception-appointment-confirmation",
    role: "reception",
    level: "newbie",
    title: "Appointment Confirmation",
    situation:
      "A caller wants to confirm their appointment for tomorrow is still on the schedule.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/b84105d7-1014-4a0c-9dad-84e721432959.mp3",
    checklist: [
      "Looked up the appointment in the system before answering",
      "Confirmed date, time, and who they're meeting with",
      "Asked if anything changed on their end",
      "Offered directions or parking info if needed",
      "Thanked them for confirming",
    ],
    questions: [
      {
        id: "reception-appointment-confirmation-q1",
        question: "Before confirming, you should:",
        options: ["Guess it's fine", "Actually look up the appointment", "Tell them to call back later", "Assume it's cancelled"],
        correctIndex: 1,
        explanation: "Always verify in the system rather than guessing.",
      },
      {
        id: "reception-appointment-confirmation-q2",
        question: "What details should you confirm together?",
        options: ["Nothing specific", "Date, time, and who they're meeting with", "Only the date", "Only their name"],
        correctIndex: 1,
        explanation: "Full details prevent confusion or missed appointments.",
      },
      {
        id: "reception-appointment-confirmation-q3",
        question: "What's a helpful add-on to offer?",
        options: ["Nothing else needed", "Directions or parking info", "A sales pitch for something else", "Unrelated promotions"],
        correctIndex: 1,
        explanation: "Practical logistics help ensure a smooth visit.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "reception-service-drop-off-directions",
    role: "reception",
    level: "newbie",
    title: "Service Drop-Off Directions",
    situation:
      "A caller has a service appointment tomorrow morning and wants to know exactly where to go and about parking.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/9a980770-1130-4aad-a5f5-b39f69607152.mp3",
    checklist: [
      "Gave clear directions to the service drive/entrance",
      "Mentioned parking availability or where to leave the vehicle",
      "Confirmed their appointment time and advisor if known",
      "Asked if they need a shuttle or loaner information",
      "Offered a callback number for the service department",
    ],
    questions: [
      {
        id: "reception-service-drop-off-directions-q1",
        question: "What should you give clearly on this call?",
        options: ["Vague directions", "Clear directions to the service entrance", "No directions, just tell them to figure it out", "Directions to a different dealership"],
        correctIndex: 1,
        explanation: "Clear directions reduce confusion and late arrivals.",
      },
      {
        id: "reception-service-drop-off-directions-q2",
        question: "What's a good proactive question to ask?",
        options: ["Nothing further", "Whether they need a shuttle or loaner", "Their favorite color", "Their exact income"],
        correctIndex: 1,
        explanation: "Proactively addressing shuttle/loaner needs improves their experience.",
      },
      {
        id: "reception-service-drop-off-directions-q3",
        question: "What should you provide before ending the call?",
        options: ["A callback number for service", "Nothing else", "A sales pitch", "An unrelated survey"],
        correctIndex: 0,
        explanation: "A direct number helps if their plans change.",
      },
    ],
    passingScore: 70,
  },
  {
    id: "reception-location-confusion",
    role: "reception",
    level: "seasoned",
    title: "Multi-Location Confusion",
    situation:
      "A caller isn't sure if they've reached the correct dealership location and wants clarification.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/f6ce3d8c-b46e-4d0a-8fad-ed09a688ee51.mp3",
    checklist: [
      "Clearly stated which location they've reached",
      "Asked what they were trying to accomplish to confirm the right location",
      "Offered the correct number/address if they need a different location",
      "Avoided making them feel silly for asking",
      "Offered to transfer them directly if needed",
    ],
    questions: [
      {
        id: "reception-location-confusion-q1",
        question: "First step when a caller seems unsure of the location?",
        options: ["Assume they're right", "Clearly state which location they've reached", "Hang up", "Ignore the question"],
        correctIndex: 1,
        explanation: "Clarity upfront resolves confusion quickly.",
      },
      {
        id: "reception-location-confusion-q2",
        question: "If they need a different location, you should:",
        options: ["Refuse to help further", "Provide the correct contact info", "Tell them to search online", "Transfer them randomly"],
        correctIndex: 1,
        explanation: "Providing accurate info for the correct location is the most helpful path.",
      },
      {
        id: "reception-location-confusion-q3",
        question: "How should you handle their confusion?",
        options: ["Make them feel silly for asking", "Patiently and without judgment", "Rush them off the phone", "Ignore and change topic"],
        correctIndex: 1,
        explanation: "A patient tone keeps the caller comfortable and willing to continue.",
      },
    ],
    passingScore: 75,
  },
  {
    id: "reception-vague-department-request",
    role: "reception",
    level: "seasoned",
    title: "Vague Department Request",
    situation:
      "A caller says they're calling about a job, not a car, and isn't sure if they reached the right department.",
    audioUrl:
      "https://static.galaxy.ai/user_39iXjxyQdmhoj5bVhki8e1ab0c2/15030716-0382-4cba-ba31-5ad91f50f8cb.mp3",
    checklist: [
      "Clarified that this is a dealership sales/service line, not HR directly",
      "Asked what position or department they're inquiring about",
      "Provided the correct HR contact or offered to transfer/take a message",
      "Stayed polite even though it's an unusual call",
      "Confirmed they have what they need before ending the call",
    ],
    questions: [
      {
        id: "reception-vague-department-request-q1",
        question: "How should you handle an off-topic call like this?",
        options: ["Hang up immediately", "Politely clarify and redirect appropriately", "Ignore their question", "Argue with the caller"],
        correctIndex: 1,
        explanation: "Politely clarifying keeps the interaction professional even off-topic.",
      },
      {
        id: "reception-vague-department-request-q2",
        question: "What's the right next step?",
        options: ["Nothing, just say goodbye", "Provide HR contact info or take a message", "Pretend you can't help at all", "Transfer to sales instead"],
        correctIndex: 1,
        explanation: "Directing them properly ensures their need is actually met.",
      },
      {
        id: "reception-vague-department-request-q3",
        question: "What tone should you maintain?",
        options: ["Dismissive", "Polite and helpful", "Annoyed", "Confused"],
        correctIndex: 1,
        explanation: "Every caller deserves a polite, helpful tone regardless of the reason for calling.",
      },
    ],
    passingScore: 75,
  },
];
