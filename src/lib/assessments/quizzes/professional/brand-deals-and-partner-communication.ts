import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "brand-deals-and-partner-communication",
  programKey: "professional",
  title: "Quiz: Brand Deals and Partner Communication",
  questions: [
    question(
      "q1",
      "A vague DM says 'Love your content, want to collab?' with no brand name or ask. What should you do first?",
      [
        ["Sort it as Unclear and reply asking for specifics before scoring", true, "Correct — sort before you score or react."],
        ["Immediately say yes so you don't miss the opportunity", false, "Wrong — enthusiasm before information is a guess, not a system."],
        ["Ignore it because it looks like spam", false, "Wrong — some real opportunities arrive looking vague at first; ask first."],
        ["Score it a 5 on every dimension to be generous", false, "Wrong — scoring requires actual information, not optimism."],
      ],
    ),
    question(
      "q2",
      "On the Brand Inquiry Evaluation Scorecard, which dimension should you weigh most heavily if it scores very low, regardless of the rest?",
      [
        ["Verifiability — you cannot trust a party you cannot confirm is real", true, "Correct — low verifiability deserves a pause no matter how good other scores look."],
        ["Specificity — vague language always disqualifies a message", false, "Wrong — specificity matters but is not the automatic override."],
        ["Audience fit — a low score here always means an instant decline", false, "Wrong — fit matters, but verifiability is the trust gate."],
        ["Terms clarity — unclear terms always mean the brand is lying", false, "Wrong — unclear terms often just mean you need to ask a clarifying question."],
      ],
    ),
    question(
      "q3",
      "A message says: 'We can't pay, but the exposure will be huge for you.' How should this be treated?",
      [
        ["As a soft red flag — exposure is not a payment term, worth a clarifying question", true, "Correct — flag it, ask sharper questions, don't automatically decline or accept."],
        ["As an automatic disqualifier that ends the conversation", false, "Wrong — it's a signal to probe further, not always an instant no."],
        ["As a normal, professional offer you should accept", false, "Wrong — exposure alone is not a payment term."],
        ["As proof the brand is a scam", false, "Wrong — it may just be an inexperienced or small brand; ask questions."],
      ],
    ),
    question(
      "q4",
      "A creator wants to accept a well-paying deal that requires something already on their PC-01 'won't do' list. What's the professional move?",
      [
        ["Decline regardless of the amount — boundaries that bend for money were never real boundaries", true, "Correct — boundary compatibility is part of the scorecard, not optional when money is good."],
        ["Accept it since the pay is strong enough to justify an exception", false, "Wrong — a boundary that bends for the right price isn't a boundary."],
        ["Accept it but hide the arrangement from the audience", false, "Wrong — hiding sponsorship damages trust further."],
        ["Ask the brand to lower the pay so it feels acceptable", false, "Wrong — the issue is the ask itself, not the price."],
      ],
    ),
    question(
      "q5",
      "An inquiry asks the creator to help recruit other streamers into the brand's program for a referral cut. What should the creator do?",
      [
        ["Treat that specific element as out of creator-side scope and decline it", true, "Correct — recruiting other creators is outside this lesson's boundary entirely."],
        ["Accept the whole deal since the pay includes a bonus for recruiting", false, "Wrong — recruiting other creators is an explicit hard boundary."],
        ["Negotiate a higher referral cut instead", false, "Wrong — this isn't a negotiation point, it's out of scope."],
        ["Pass the offer to a talent agency to manage", false, "Wrong — this lesson does not teach agency ownership or referral structures."],
      ],
    ),
    question(
      "q6",
      "Why does the lesson recommend disclosing sponsored content clearly on LIVE?",
      [
        ["Because hidden sponsorship is a trust cost that gets paid later, all at once", true, "Correct — audience trust is a business asset; hiding deals erodes it quietly until it's noticed."],
        ["Because platform rules require a specific disclosure script", false, "Wrong — the lesson teaches the principle, not a mandated legal script."],
        ["Because disclosure guarantees higher gift totals", false, "Wrong — disclosure protects trust, it isn't a monetization tactic."],
        ["Because brands always require public disclosure in their contracts", false, "Wrong — the reasoning is audience trust, not contract mandate."],
      ],
    ),
    question(
      "q7",
      "A creator gets excited and replies 'yes!' to an inquiry before asking any clarifying questions. What's the best recovery?",
      [
        ["Send a professional follow-up asking for deliverables, timeline, and payment terms before finalizing", true, "Correct — recovering professionally beats pretending the mistake didn't happen."],
        ["Ignore the inquiry going forward and hope it fades", false, "Wrong — ghosting after saying yes damages professional reputation."],
        ["Cancel entirely and apologize for replying at all", false, "Wrong — over-correcting isn't necessary; just get the missing information."],
        ["Proceed without asking anything since you already said yes", false, "Wrong — you can still clarify terms after an initial enthusiastic reply."],
      ],
    ),
    question(
      "q8",
      "What is the actual mission requirement for this lesson regarding sending a response email?",
      [
        ["Send it only if the inquiry is real and the reply is appropriate — never invent a fake brand relationship", true, "Correct — the mission explicitly forbids fabricating relationships to complete the exercise."],
        ["Send a response to any inquiry, real or invented, to practice the template", false, "Wrong — inventing a fake brand relationship is explicitly against the mission rules."],
        ["Only complete the scorecard; sending any response is optional busywork", false, "Wrong — drafting a response is required, sending depends on real/appropriate context."],
        ["Post the response publicly on LIVE for accountability", false, "Wrong — the mission asks for a drafted (and conditionally sent) email, not a public LIVE post."],
      ],
    ),
  ],
});
