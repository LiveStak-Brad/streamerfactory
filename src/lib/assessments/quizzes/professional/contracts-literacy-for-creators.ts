import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "contracts-literacy-for-creators",
  programKey: "professional",
  title: "Quiz: Contracts Literacy for Creators (Basics)",
  questions: [
    question(
      "q1",
      "What does this lesson explicitly say it teaches?",
      [
        ["Literacy — reading for red flags and knowing when to pause, not legal practice", true, "Correct — the lesson is explicit that it is not a substitute for a lawyer."],
        ["Full legal training sufficient to draft your own contracts", false, "Wrong — the lesson explicitly rejects this framing."],
        ["How to represent other creators in contract negotiations", false, "Wrong — that would be agency practice, outside this lesson's scope."],
        ["How to void any contract you regret signing", false, "Wrong — the lesson does not teach legal remedies."],
      ],
    ),
    question(
      "q2",
      "An agreement says: 'No promotion of direct competitor beverage brands for 30 days after the campaign.' How should this exclusivity clause be read?",
      [
        ["As a reasonable, narrow, time-limited term — not a red flag", true, "Correct — narrow scope and clear duration make this a normal negotiable term."],
        ["As an automatic red flag requiring you to walk away", false, "Wrong — narrow, time-limited exclusivity is a normal industry term."],
        ["As identical in risk to an unlimited, open-ended exclusivity clause", false, "Wrong — scope and duration are exactly what differentiate reasonable from risky."],
        ["As irrelevant because exclusivity clauses never matter", false, "Wrong — exclusivity is one of the five zones worth reading carefully."],
      ],
    ),
    question(
      "q3",
      "A content rights clause grants the brand perpetual, worldwide reuse of your name, image, and content with no further compensation. This is an example of a red flag in which zone?",
      [
        ["Content rights", true, "Correct — unlimited, uncompensated, perpetual reuse is the classic content-rights red flag."],
        ["Cancellation", false, "Wrong — cancellation covers what happens if the deal ends early, not content reuse."],
        ["Usage windows", false, "Wrong — usage windows cover how long content stays live, related but distinct from ownership/reuse rights."],
        ["Exclusivity", false, "Wrong — exclusivity covers what else you can promote, not content ownership."],
      ],
    ),
    question(
      "q4",
      "A payment clause says payment is due 'upon brand's satisfaction with final deliverable' with no defined standard or deadline. What should a creator do?",
      [
        ["Flag it and ask for a specific, defined standard and a payment date in writing", true, "Correct — vague subjective approval language with no deadline is a payment red flag worth resolving before signing."],
        ["Sign it as-is since most brands are fair about payment eventually", false, "Wrong — the lesson explicitly flags vague, subjective payment conditions as a red flag."],
        ["Refuse the entire deal without asking any clarifying question", false, "Wrong — a red flag is a question to ask first, not always an automatic rejection."],
        ["Ignore it since payment terms rarely matter as much as the headline number", false, "Wrong — payment terms are one of the five zones that matter most."],
      ],
    ),
    question(
      "q5",
      "A partner says, 'Everyone signs this, don't worry about reading it closely.' How should this be interpreted?",
      [
        ["As a signal worth noting — reputable partners expect a careful read, not pressure to skip it", true, "Correct — pressure to skip reading is itself a signal, not reassurance."],
        ["As a normal and reassuring thing for a professional partner to say", false, "Wrong — the lesson calls this phrase out specifically as worth noting."],
        ["As proof the agreement must be a scam", false, "Wrong — it's a signal to read more carefully, not automatic proof of anything."],
        ["As irrelevant to how you should read the agreement", false, "Wrong — it directly affects how much scrutiny the agreement deserves."],
      ],
    ),
    question(
      "q6",
      "When should a creator pause and seek qualified professional help, according to this lesson?",
      [
        ["When the dollar amount is significant, or exclusivity/content-rights language is broad or unclear", true, "Correct — these are the specific pause triggers named in the lesson."],
        ["Never — this lesson's checklist is designed to replace needing outside help entirely", false, "Wrong — the lesson explicitly says it does not replace a lawyer."],
        ["Only if the creator personally enjoys reading legal documents", false, "Wrong — the decision is based on stakes and clarity, not personal preference."],
        ["Only after already signing, in case something goes wrong later", false, "Wrong — pausing should happen before signing, not after."],
      ],
    ),
    question(
      "q7",
      "What is the correct relationship between this lesson (PC-08) and the prior brand-deals lesson (PC-06)?",
      [
        ["PC-08 picks up after PC-06's evaluation, once a written agreement actually shows up", true, "Correct — PC-06 evaluates whether to engage; PC-08 covers reading the resulting agreement."],
        ["PC-08 replaces PC-06 entirely and should be done first", false, "Wrong — PC-06 is a stated prerequisite for this lesson."],
        ["PC-08 and PC-06 cover identical material with no distinction", false, "Wrong — they are explicitly different steps in the same process."],
        ["PC-08 is unrelated to brand or partner inquiries", false, "Wrong — contract literacy directly follows from evaluating those inquiries."],
      ],
    ),
    question(
      "q8",
      "What does the LIVE Mission for this lesson require regarding the five flags or green checks?",
      [
        ["List five specific flags or green checks with the exact language that triggered each", true, "Correct — the mission requires specificity tied to real language in the agreement."],
        ["List five random contract clauses unrelated to the actual agreement reviewed", false, "Wrong — the flags must come from the actual agreement being reviewed."],
        ["Only note flags, since green checks don't count toward the mission", false, "Wrong — both flags and green checks are explicitly acceptable."],
        ["Have a lawyer complete the checklist on the creator's behalf", false, "Wrong — this is a creator-completed literacy exercise, not delegated legal work."],
      ],
    ),
  ],
});
