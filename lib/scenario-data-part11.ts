import { Scenario } from "@/types";

export const scenariosPart11: Scenario[] = [
  {
    "id": "sales-video-specific-feature-check",
    "role": "sales",
    "level": "newbie",
    "title": "A Walkaround With a Specific Purpose",
    "situation": "A shopper wants a close look at rear-seat space and a cargo measurement before deciding whether to visit. Practice answering the actual question and offering a useful video.",
    "audioUrl": "/audio/scenarios/sales-video-specific-feature-check.mp3",
    "checklist": [
      "Confirmed the exact vehicle and what the shopper needs to fit",
      "Offered to verify cargo measurements on that vehicle rather than estimate",
      "Planned a personalized video showing the requested seats and cargo area",
      "Confirmed the preferred delivery method and a specific callback time",
      "Offered a visit after addressing the fit question without pressuring"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "What should your video focus on?",
        "options": [
          "The dealership entrance and your business card",
          "A generic exterior walkaround",
          "The requested rear seats, cargo area, and verified measurements",
          "Only the monthly payment"
        ],
        "correctIndex": 2,
        "explanation": "A targeted video answers the shopper’s practical question and gives the next conversation a purpose."
      },
      {
        "id": "q2",
        "question": "You have not measured the cargo space yet. What should you say?",
        "options": [
          "Confirm the exact vehicle, offer to measure it, and agree on a callback time",
          "Promise the stroller will fit",
          "Quote a measurement from a different trim",
          "Require an appointment before answering"
        ],
        "correctIndex": 0,
        "explanation": "Verify the actual vehicle and commit to a clear follow-up instead of guessing."
      },
      {
        "id": "q3",
        "question": "What should happen after you send the video?",
        "options": [
          "Assume the customer will call if interested",
          "Send repeated appointment demands",
          "Mark the customer as unresponsive immediately",
          "Follow up at the agreed time to ask whether the video answered their question"
        ],
        "correctIndex": 3,
        "explanation": "A specific follow-up closes the loop and lets the shopper choose a useful next step."
      }
    ],
    "passingScore": 70
  },
  {
    "id": "sales-appointment-without-day-of-response",
    "role": "sales",
    "level": "newbie",
    "title": "Video Sent, Appointment Still Unconfirmed",
    "situation": "A guest received an appointment video yesterday but has not responded today. They call to ask who will greet them if they come. Practice reconfirming the visit accurately.",
    "audioUrl": "/audio/scenarios/sales-appointment-without-day-of-response.mp3",
    "checklist": [
      "Acknowledged the guest’s question and identified who will greet them",
      "Verified today’s appointment time and the guest’s current plan",
      "Asked for an explicit day-of yes before marking the appointment confirmed",
      "Distinguished sending or viewing a video from actual confirmation",
      "Repeated the agreed time, contact, and directions or next follow-up"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "Does sending yesterday’s video confirm today’s appointment?",
        "options": [
          "Yes, any sent video counts",
          "No; confirmation requires the guest’s explicit day-of yes",
          "Yes, if the guest opened it",
          "Only if the video included the vehicle"
        ],
        "correctIndex": 1,
        "explanation": "A video supports the experience, but it does not establish that the guest still plans to arrive today."
      },
      {
        "id": "q2",
        "question": "The guest says, “If I can make it.” What is the best next question?",
        "options": [
          "Why did you ignore our texts?",
          "Can you bring a deposit?",
          "Would you like me to keep 5:15 tentative, or can you confirm you’ll be here today?",
          "Should I mark you as a no-show?"
        ],
        "correctIndex": 2,
        "explanation": "Clarify the plan respectfully without turning tentative language into a confirmed appointment."
      },
      {
        "id": "q3",
        "question": "If the guest cannot confirm yet, what should you do?",
        "options": [
          "Keep the status tentative and agree on a specific follow-up time",
          "Record a confirmation anyway",
          "Cancel immediately without asking",
          "Send another video and mark confirmed"
        ],
        "correctIndex": 0,
        "explanation": "An accurate status and a clear follow-up help the team prepare without overstating commitment."
      }
    ],
    "passingScore": 70
  },
  {
    "id": "sales-proposal-assumptions-clarification",
    "role": "sales",
    "level": "seasoned",
    "title": "Why the Proposal Shows Different Payments",
    "situation": "A shopper has received a deal structure with several term and down-payment options and wants to understand why the payments differ. Practice explaining assumptions transparently.",
    "audioUrl": "/audio/scenarios/sales-proposal-assumptions-clarification.mp3",
    "checklist": [
      "Asked which term and down-payment option the shopper is considering",
      "Explained how term, down payment, rate, and amount financed affect payments",
      "Verified whether taxes and fees are included in this proposal",
      "Clarified that estimates and any financing approval conditions are not guaranteed terms",
      "Offered a revised written proposal with clearly labeled assumptions and a callback time"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "Before explaining one payment, what should you clarify?",
        "options": [
          "Which term and down-payment option the shopper wants to review",
          "Whether they will buy today",
          "Whether they have read every page",
          "Why they did not call finance directly"
        ],
        "correctIndex": 0,
        "explanation": "Choose the relevant option first so the explanation answers the shopper’s actual concern."
      },
      {
        "id": "q2",
        "question": "How should you describe the displayed rate?",
        "options": [
          "Guaranteed for every shopper",
          "Available regardless of credit or vehicle",
          "A reason to avoid a written quote",
          "According to the proposal’s actual assumptions and approval conditions"
        ],
        "correctIndex": 3,
        "explanation": "Estimated financing terms must be distinguished from terms approved for that customer."
      },
      {
        "id": "q3",
        "question": "You are unsure whether fees are included. What is the best response?",
        "options": [
          "Say yes because that is usually true",
          "Check the itemized proposal and send a clarified version",
          "Tell them fees never change the payment",
          "Avoid discussing fees until arrival"
        ],
        "correctIndex": 1,
        "explanation": "Checking and labeling the actual figures keeps the proposal understandable and trustworthy."
      }
    ],
    "passingScore": 75
  },
  {
    "id": "sales-home-delivery-logistics",
    "role": "sales",
    "level": "seasoned",
    "title": "Home Delivery Before a Work Shift",
    "situation": "A buyer wants home delivery during a narrow time window. Practice checking logistics and setting expectations without guaranteeing an unverified service.",
    "audioUrl": "/audio/scenarios/sales-home-delivery-logistics.mp3",
    "checklist": [
      "Clarified the address area, requested date, and delivery window",
      "Checked whether delivery is available and whether costs or distance limits apply",
      "Explained only verified paperwork, identity, payment, and trade-appraisal arrangements",
      "Avoided guaranteeing delivery or a final trade value before approval and inspection",
      "Assigned an owner and a specific time to confirm the delivery plan in writing"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "What should happen before promising delivery before 3 p.m.?",
        "options": [
          "Assume someone can drive it over",
          "Ask the buyer to skip work",
          "Verify delivery availability, staffing, timing, and any conditions",
          "Promise delivery if they give a card number"
        ],
        "correctIndex": 2,
        "explanation": "A narrow delivery window needs a verified plan, not an improvised promise."
      },
      {
        "id": "q2",
        "question": "What should you clarify about the trade-in?",
        "options": [
          "Any inspection and appraisal requirements before a final value is confirmed",
          "That its value cannot change under any conditions",
          "That it is automatically paid off",
          "That its title is unnecessary"
        ],
        "correctIndex": 0,
        "explanation": "Explain the actual trade process and keep preliminary estimates separate from final figures."
      },
      {
        "id": "q3",
        "question": "What is the strongest next step?",
        "options": [
          "End with “we’ll try”",
          "Ask the customer to call every department",
          "Promise paperwork will take only a minute",
          "Send an agreed written plan after the responsible team verifies the details"
        ],
        "correctIndex": 3,
        "explanation": "A confirmed plan gives the buyer a useful commitment and the team clear responsibilities."
      }
    ],
    "passingScore": 75
  },
  {
    "id": "sales-listed-vehicle-sold-after-travel-plan",
    "role": "sales",
    "level": "superstar",
    "title": "The Vehicle Sold After the Guest Planned a Trip",
    "situation": "A shopper arranged a two-hour trip after discussing a vehicle yesterday. It sold before a deposit or hold was agreed. Practice taking ownership and offering honest alternatives.",
    "audioUrl": "/audio/scenarios/sales-listed-vehicle-sold-after-travel-plan.mp3",
    "checklist": [
      "Acknowledged the lost time and inconvenience without blaming the guest",
      "Verified sale status and reviewed what was actually promised about availability or a hold",
      "Explained the facts honestly and avoided inventing a reservation or replacement guarantee",
      "Asked which features, price range, and travel constraints matter before suggesting alternatives",
      "Took ownership of a manager handoff or verified alternative plan with a specific callback time"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "What is the best opening response?",
        "options": [
          "Vehicles sell; you should have left a deposit",
          "Acknowledge the disrupted trip and offer to verify what happened",
          "Say the listing must be wrong without checking",
          "Promise an identical vehicle today"
        ],
        "correctIndex": 1,
        "explanation": "Recognize the customer’s inconvenience before investigating and offering a realistic solution."
      },
      {
        "id": "q2",
        "question": "Before discussing why the vehicle sold, what should you review?",
        "options": [
          "Only whether the customer was friendly",
          "Only today’s inventory count",
          "The sale status and the actual conversation or hold agreement",
          "Whether another salesperson can take the call"
        ],
        "correctIndex": 2,
        "explanation": "The response should reflect the real facts, including any promise the dealership made."
      },
      {
        "id": "q3",
        "question": "Which alternative best preserves trust?",
        "options": [
          "Offer only verified options that fit the guest’s needs and confirm a specific follow-up",
          "Send any vehicle just to keep the appointment",
          "Hide differences in price and equipment",
          "Guarantee a replacement before checking stock"
        ],
        "correctIndex": 0,
        "explanation": "Relevant, verified choices and clear ownership help recover the experience without creating another broken promise."
      }
    ],
    "passingScore": 80
  },
  {
    "id": "reception-salesperson-running-late",
    "role": "reception",
    "level": "newbie",
    "title": "The Guest Arrives Before Their Salesperson",
    "situation": "A guest calls from the parking lot for an appointment, but their assigned salesperson is with another customer. Practice making the arrival comfortable and arranging an accountable handoff.",
    "audioUrl": "/audio/scenarios/reception-salesperson-running-late.mp3",
    "checklist": [
      "Verified the guest’s name, appointment, and arrival location",
      "Welcomed them and explained a clear place to meet a team member",
      "Checked the salesperson’s availability without guessing the wait",
      "Arranged a specific backup or manager handoff if needed",
      "Passed along the appointment context so the guest need not start over"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "What should you do first?",
        "options": [
          "Tell them to wait in the car indefinitely",
          "Ask them to reschedule immediately",
          "Verify the appointment and welcome them with a clear meeting point",
          "Transfer to voicemail without explanation"
        ],
        "correctIndex": 2,
        "explanation": "A clear welcome and meeting point reduce uncertainty at the start of the visit."
      },
      {
        "id": "q2",
        "question": "You do not know Alex’s remaining wait. What should you do?",
        "options": [
          "Say five minutes because it sounds reasonable",
          "Check availability and arrange a named backup if needed",
          "Ignore the delay",
          "Tell the guest all appointments run late"
        ],
        "correctIndex": 1,
        "explanation": "Only share verified timing, and make sure someone owns the guest’s arrival."
      },
      {
        "id": "q3",
        "question": "What information should the backup receive?",
        "options": [
          "Only the guest’s first name",
          "Nothing; they can ask again",
          "The customer’s entire unrelated history",
          "The guest’s name, vehicle interest, appointment, and current arrival situation"
        ],
        "correctIndex": 3,
        "explanation": "A focused handoff lets the next team member continue smoothly."
      }
    ],
    "passingScore": 70
  },
  {
    "id": "reception-accessible-visit-planning",
    "role": "reception",
    "level": "newbie",
    "title": "Planning an Accessible Dealership Visit",
    "situation": "A caller using a wheelchair asks about the entrance and a place to meet. Practice verifying arrangements and respecting the caller’s preferences.",
    "audioUrl": "/audio/scenarios/reception-accessible-visit-planning.mp3",
    "checklist": [
      "Asked what arrangements would make the visit easier without requesting medical details",
      "Verified the accessible entrance, parking, and meeting location",
      "Confirmed the appointment and a named contact for arrival",
      "Avoided assuming what assistance the caller wants",
      "Shared the agreed arrangements with the host and confirmed them back"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "What should guide the arrangements?",
        "options": [
          "Your assumptions about what wheelchair users need",
          "The caller’s stated preferences and verified site access",
          "A request for the caller’s medical diagnosis",
          "The salesperson’s convenience only"
        ],
        "correctIndex": 1,
        "explanation": "Ask about practical preferences and verify the facility instead of making assumptions."
      },
      {
        "id": "q2",
        "question": "You are unsure which entrance is accessible. What should you do?",
        "options": [
          "Check with the on-site team and confirm the details before the visit",
          "Guess based on the building photo",
          "Tell them to drive around until they find it",
          "Promise every entrance is accessible"
        ],
        "correctIndex": 0,
        "explanation": "Verified directions prevent an avoidable problem when the guest arrives."
      },
      {
        "id": "q3",
        "question": "How should you complete the call?",
        "options": [
          "Leave the host uninformed",
          "Tell them to explain everything again on arrival",
          "Confirm the date, contact, entrance, and agreed meeting arrangements",
          "Offer assistance without asking whether it is wanted"
        ],
        "correctIndex": 2,
        "explanation": "Confirming and sharing the plan gives the caller an organized welcome."
      }
    ],
    "passingScore": 70
  },
  {
    "id": "reception-failed-transfer-recovery",
    "role": "reception",
    "level": "seasoned",
    "title": "A Second Call After a Dropped Transfer",
    "situation": "A caller was disconnected during a transfer and calls again. Practice recovering the handoff while minimizing repetition.",
    "audioUrl": "/audio/scenarios/reception-failed-transfer-recovery.mp3",
    "checklist": [
      "Acknowledged the dropped transfer and inconvenience",
      "Collected only the context needed to identify the correct destination",
      "Confirmed a callback number in case the connection fails again",
      "Checked availability and briefed the receiving team before connecting",
      "Offered an owned callback with a specific time if a live handoff is unavailable"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "What is the most useful information to confirm before another transfer?",
        "options": [
          "Every detail from the beginning regardless of relevance",
          "A callback number and the essential reason for the call",
          "Only whether they are upset",
          "Their social security number"
        ],
        "correctIndex": 1,
        "explanation": "A callback number and concise context make the next handoff resilient without excessive repetition."
      },
      {
        "id": "q2",
        "question": "How should the next transfer be handled?",
        "options": [
          "Send the caller to a random extension",
          "Blind-transfer to the same line again",
          "Check availability and give the receiver a brief explanation",
          "Ask the caller to locate a direct number online"
        ],
        "correctIndex": 2,
        "explanation": "A warm handoff reduces the risk of another failed connection."
      },
      {
        "id": "q3",
        "question": "If no one is available, what should you offer?",
        "options": [
          "A named owner and an agreed callback time",
          "An unspecified callback sometime",
          "Another unverified transfer",
          "A promise that any receptionist can resolve the paperwork"
        ],
        "correctIndex": 0,
        "explanation": "A clear owner and time give the guest a meaningful next step."
      }
    ],
    "passingScore": 75
  },
  {
    "id": "reception-sales-to-service-handoff",
    "role": "reception",
    "level": "seasoned",
    "title": "One Call, Two Appointments",
    "situation": "A guest wants a test drive and a separate service appointment for their current vehicle on the same day. Practice coordinating two departments without assuming availability.",
    "audioUrl": "/audio/scenarios/reception-sales-to-service-handoff.mp3",
    "checklist": [
      "Clarified the two needs and the guest’s time constraints",
      "Checked sales and service availability separately",
      "Avoided treating either appointment as confirmed before its department accepts",
      "Explained whether the schedules can realistically align and offered alternatives",
      "Confirmed both times, contacts, locations, and any remaining unanswered items"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "Can a sales appointment alone confirm the oil change?",
        "options": [
          "Yes, all calendars are interchangeable",
          "Yes, if the salesperson agrees",
          "Only if the guest arrives early",
          "No; service availability must be checked and accepted separately"
        ],
        "correctIndex": 3,
        "explanation": "Each department needs to confirm its own capacity and appointment."
      },
      {
        "id": "q2",
        "question": "What is the first scheduling detail to clarify?",
        "options": [
          "The guest’s available time window and both requested services",
          "Whether they can stay all day instead",
          "Whether they will buy the crossover",
          "Which appointment you prefer to book"
        ],
        "correctIndex": 0,
        "explanation": "The time constraint should shape the coordination plan from the start."
      },
      {
        "id": "q3",
        "question": "What should the final confirmation include?",
        "options": [
          "Only “Friday morning”",
          "Just the salesperson’s name",
          "Both appointment times, department contacts, and any unresolved scheduling conditions",
          "A guarantee that neither department will ever run late"
        ],
        "correctIndex": 2,
        "explanation": "Specific details let the guest plan the visit and understand the limits of the arrangement."
      }
    ],
    "passingScore": 75
  },
  {
    "id": "reception-private-account-information-request",
    "role": "reception",
    "level": "superstar",
    "title": "A Caller Requests Another Customer’s Details",
    "situation": "Someone claiming to be a customer’s relative asks for purchase and financing details. Practice a helpful response without disclosing private account information.",
    "audioUrl": "/audio/scenarios/reception-private-account-information-request.mp3",
    "checklist": [
      "Recognized that knowing a name and vehicle does not establish authorization",
      "Avoided confirming or disclosing private purchase or financing information",
      "Explained the authorized verification process respectfully",
      "Offered to connect the customer or route the request to the responsible team",
      "Did not request sensitive documents through an unapproved channel or promise disclosure"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "Does knowing the customer’s name and model authorize disclosure?",
        "options": [
          "Yes, relatives are automatically authorized",
          "No; follow the dealership’s approved verification and authorization process",
          "Yes, if the caller sounds helpful",
          "Yes, if the purchase was recent"
        ],
        "correctIndex": 1,
        "explanation": "Familiar details do not establish permission to receive private account information."
      },
      {
        "id": "q2",
        "question": "What is a helpful response?",
        "options": [
          "Read the financing figures aloud",
          "Email the paperwork to the address the caller provides",
          "Explain the verification process and offer a handoff to the responsible team",
          "Accuse the caller of fraud"
        ],
        "correctIndex": 2,
        "explanation": "A respectful process-based response protects the customer while keeping legitimate assistance possible."
      },
      {
        "id": "q3",
        "question": "What should you avoid in the handoff?",
        "options": [
          "Including the caller’s stated reason",
          "Identifying which team handles document requests",
          "Telling the receiver authorization still needs checking",
          "Promising the caller will receive documents before authorization is verified"
        ],
        "correctIndex": 3,
        "explanation": "The handoff should preserve the verification requirement instead of promising an outcome."
      }
    ],
    "passingScore": 80
  },
  {
    "id": "service-after-hours-key-drop",
    "role": "service",
    "level": "newbie",
    "title": "First-Time After-Hours Drop-Off",
    "situation": "A customer has a morning service appointment but must leave the vehicle the night before. Practice explaining the verified drop-off process.",
    "audioUrl": "/audio/scenarios/service-after-hours-key-drop.mp3",
    "checklist": [
      "Verified the appointment and whether after-hours drop-off is available",
      "Explained the actual parking and secure key-drop instructions",
      "Asked the guest to note the concern and a reachable contact method",
      "Clarified that drop-off is not authorization for unspecified extra work",
      "Explained when and how the service team will acknowledge receipt"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "Before giving instructions, what should you verify?",
        "options": [
          "That every dealership uses the same key box",
          "That after-hours drop-off is available at this location",
          "That the vehicle is unlocked",
          "That the customer can leave keys under the mat"
        ],
        "correctIndex": 1,
        "explanation": "Use the location’s actual secure process rather than general assumptions."
      },
      {
        "id": "q2",
        "question": "What should the customer provide with the vehicle?",
        "options": [
          "A blank signed repair authorization",
          "Only the keys",
          "The reported concern and a reachable contact method through the approved process",
          "Sensitive payment information on an exposed note"
        ],
        "correctIndex": 2,
        "explanation": "Clear concerns and contact details help the advisor follow up accurately."
      },
      {
        "id": "q3",
        "question": "How should you describe additional work?",
        "options": [
          "Only work authorized through the agreed process should proceed",
          "Dropping the car off authorizes any recommended repair",
          "The shop decides without contacting the customer",
          "All extra work is automatically free"
        ],
        "correctIndex": 0,
        "explanation": "A drop-off does not replace the customer’s repair authorization."
      }
    ],
    "passingScore": 70
  },
  {
    "id": "service-customer-contact-window",
    "role": "service",
    "level": "newbie",
    "title": "The Customer Cannot Answer During Work",
    "situation": "A guest cannot take calls for several hours during their service visit. Practice agreeing on communication and authorization expectations.",
    "audioUrl": "/audio/scenarios/service-customer-contact-window.mp3",
    "checklist": [
      "Confirmed the approved communication channel and reachable time window",
      "Acknowledged the request not to proceed with unapproved extra work",
      "Explained how estimates and approvals will be handled",
      "Set a realistic update time without guaranteeing completion",
      "Documented the communication and authorization preferences for the advisor"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "What should you document?",
        "options": [
          "That no response counts as approval",
          "Only the guest’s work schedule",
          "The preferred contact channel, available window, and limits on authorization",
          "That every repair must finish by noon"
        ],
        "correctIndex": 2,
        "explanation": "The advisor needs both a contact plan and clear authorization boundaries."
      },
      {
        "id": "q2",
        "question": "The customer does not answer a proposed repair text. What should you do?",
        "options": [
          "Treat the read receipt as approval",
          "Wait for explicit approval through the agreed process before extra work",
          "Complete the repair to save time",
          "Approve it on their behalf"
        ],
        "correctIndex": 1,
        "explanation": "Silence is not consent for additional work."
      },
      {
        "id": "q3",
        "question": "What is a reasonable commitment?",
        "options": [
          "Agree on a status update time and explain that repair timing depends on findings and approval",
          "Guarantee completion before their meeting ends",
          "Promise unlimited text access to the technician",
          "Avoid giving any update plan"
        ],
        "correctIndex": 0,
        "explanation": "A status commitment can be reliable even when the completion time remains uncertain."
      }
    ],
    "passingScore": 70
  },
  {
    "id": "service-estimate-changes-after-inspection",
    "role": "service",
    "level": "seasoned",
    "title": "The Estimate Changed Before Work Started",
    "situation": "Inspection revealed a different repair than the customer expected from an initial estimate. Practice explaining the change and obtaining approval before work.",
    "audioUrl": "/audio/scenarios/service-estimate-changes-after-inspection.mp3",
    "checklist": [
      "Reviewed the initial estimate and verified inspection findings before explaining",
      "Acknowledged the difference between the preliminary and updated estimate",
      "Explained the changed scope, itemized cost, and technician-supported priorities clearly",
      "Presented options without inventing urgency or pressuring approval",
      "Obtained explicit authorization for the chosen work and documented the agreed total or limits"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "What should you review before explaining the increase?",
        "options": [
          "Only the newest total",
          "The initial assumptions and the verified inspection findings",
          "The customer’s ability to pay",
          "Another customer’s invoice"
        ],
        "correctIndex": 1,
        "explanation": "Comparing the original assumptions with the findings explains what actually changed."
      },
      {
        "id": "q2",
        "question": "How should you discuss what can wait?",
        "options": [
          "Say everything is urgent regardless of findings",
          "Guess which repair matters least",
          "Use verified technician guidance to distinguish priorities and options",
          "Tell the customer price is the only factor"
        ],
        "correctIndex": 2,
        "explanation": "Repair priorities should be based on findings and qualified guidance, not pressure or guesses."
      },
      {
        "id": "q3",
        "question": "When can the additional repair begin?",
        "options": [
          "When the customer reads the estimate",
          "When the advisor believes it is necessary",
          "As soon as a technician is free",
          "After explicit customer authorization through the approved process"
        ],
        "correctIndex": 3,
        "explanation": "A revised estimate needs approval before the additional work proceeds."
      }
    ],
    "passingScore": 75
  },
  {
    "id": "service-invoice-explanation-before-pickup",
    "role": "service",
    "level": "seasoned",
    "title": "The Final Invoice Before Pickup",
    "situation": "A guest wants to review their completed service invoice before arranging pickup. Practice reconciling charges with authorization and explaining the bill.",
    "audioUrl": "/audio/scenarios/service-invoice-explanation-before-pickup.mp3",
    "checklist": [
      "Verified the invoice, repair order, and recorded authorization",
      "Explained parts, labor, and other actual charges in plain language",
      "Checked any discrepancy rather than dismissing or guessing",
      "Escalated unrecognized or unapproved charges to the responsible advisor or manager",
      "Confirmed the resolved total, payment process, and pickup arrangements"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "What records should you compare?",
        "options": [
          "The invoice and recorded repair authorization",
          "Only the posted hourly rate",
          "Last month’s average bill",
          "The price of a similar vehicle"
        ],
        "correctIndex": 0,
        "explanation": "The customer wants to know whether this invoice matches the work and cost they approved."
      },
      {
        "id": "q2",
        "question": "You do not recognize a charge. What is the best response?",
        "options": [
          "Call it standard without checking",
          "Tell the guest all charges are mandatory",
          "Verify what it covers and involve the responsible advisor if needed",
          "Remove it without authority"
        ],
        "correctIndex": 2,
        "explanation": "A verified explanation or appropriate review resolves uncertainty without inventing policy."
      },
      {
        "id": "q3",
        "question": "What should you confirm before pickup?",
        "options": [
          "Only that the car is outside",
          "The resolved total and the actual payment and pickup arrangements",
          "That invoices never need correction",
          "That the customer should pay before any questions are answered"
        ],
        "correctIndex": 1,
        "explanation": "Clear financial and pickup details let the guest finish the visit confidently."
      }
    ],
    "passingScore": 75
  },
  {
    "id": "service-concern-returned-after-repair",
    "role": "service",
    "level": "superstar",
    "title": "The Same Symptom Returns After Pickup",
    "situation": "A customer reports the same symptom shortly after a repair and is concerned about paying again. Practice ownership and a prompt reassessment without promising a diagnosis or coverage.",
    "audioUrl": "/audio/scenarios/service-concern-returned-after-repair.mp3",
    "checklist": [
      "Acknowledged the frustration and took ownership of arranging review",
      "Clarified the symptom and any immediate concern without diagnosing by phone",
      "Reviewed the prior repair order and arranged a technician or advisor reassessment",
      "Explained that cause and any applicable coverage or charges must be verified before promises",
      "Agreed on a named contact, reassessment plan, and specific update time"
    ],
    "questions": [
      {
        "id": "q1",
        "question": "What should you avoid promising before reassessment?",
        "options": [
          "That an advisor will review the repair order",
          "That you will confirm the next update time",
          "That you will document the recurring symptom",
          "A specific diagnosis or guaranteed free repair without checking"
        ],
        "correctIndex": 3,
        "explanation": "The cause and applicable coverage need verification; ownership does not require an unsupported guarantee."
      },
      {
        "id": "q2",
        "question": "What is the strongest immediate next step?",
        "options": [
          "Tell the guest every vibration is normal",
          "Arrange review of the previous work and a qualified reassessment with a named owner",
          "Sell another repair over the phone",
          "Ask the guest to call back if it gets worse"
        ],
        "correctIndex": 1,
        "explanation": "A clear reassessment plan addresses the concern and connects it to the previous repair."
      },
      {
        "id": "q3",
        "question": "How should you close the call?",
        "options": [
          "Agree on the contact, reassessment arrangements, and a specific update time",
          "Promise the car will be fixed by lunch regardless of availability",
          "End after saying “sorry”",
          "Assume the previous invoice proves the symptom is resolved"
        ],
        "correctIndex": 0,
        "explanation": "Concrete ownership and follow-up help rebuild trust while the facts are established."
      }
    ],
    "passingScore": 80
  }
];
