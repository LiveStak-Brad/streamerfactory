import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "interviewing-skills-for-creators",
  programKey: "community",
  title: "Quiz: Interviewing Skills for Creators",
  questions: [
    question("q1", "Structured curiosity on LIVE means…", [
      [
        "Genuine interest guided by opener, depth, and close question lanes",
        true,
        "Correct — curiosity with a map.",
      ],
      ["Asking whatever pops into your head with no map", false, "Wrong — improvisation-only fails."],
      ["Reading a script word-for-word with no listening", false, "Wrong — not curiosity."],
      ["Only asking for follows", false, "Wrong — extractive."],
    ]),
    question("q2", "Compared with Presence PR-09, this lesson should…", [
      [
        "Deepen creator interview systems for community — not re-teach interview energy fundamentals",
        true,
        "Correct — boundary honored.",
      ],
      ["Restart camera presence from zero", false, "Wrong — wrong program focus."],
      ["Replace listening with louder questions", false, "Wrong — listening still matters."],
      ["Ignore PR-09 entirely as irrelevant", false, "Wrong — it is a prerequisite callback."],
    ]),
    question("q3", "A strong Tier 2 depth question usually asks about…", [
      ["Decisions, tradeoffs, or community habits — not a full biography", true, "Correct — depth over bio."],
      ["Only follower counts", false, "Wrong — vanity."],
      ["Private trauma details on LIVE", false, "Wrong — unsafe."],
      ["Whatever product they sell first", false, "Wrong — pitching lane."],
    ]),
    question("q4", "A listening redirect is for…", [
      [
        "Protecting time, safety, or tone while staying warm and curious",
        true,
        "Correct — protect the segment.",
      ],
      ["Shaming the guest for talking", false, "Wrong — redirects are not attacks."],
      ["Ending the LIVE immediately every time", false, "Wrong — overkill."],
      ["Ignoring chat forever", false, "Wrong — chat redirect parks debates, not people forever."],
    ]),
    question("q5", "A highlight moment should be…", [
      ["Named in the moment when possible and logged afterward with who / line / why it mattered", true, "Correct — community memory."],
      ["Left unspoken because logging kills vibes", false, "Wrong — naming helps the room."],
      ["Only clipped if it goes viral", false, "Wrong — community value ≠ virality."],
      ["Reserved for gifters only", false, "Wrong — paywalls belonging."],
    ]),
    question("q6", "Chat-as-interview format…", [
      [
        "Uses the same question tiers with chatters as interviewees — full credit for the mission",
        true,
        "Correct — guest optional.",
      ],
      ["Does not count unless a famous guest appears", false, "Wrong — dry formats count."],
      ["Means you never reflect names", false, "Wrong — names build belonging."],
      ["Requires abandoning redirects", false, "Wrong — redirects still apply."],
    ]),
    question("q7", "If a guest turns every answer into a hard pitch…", [
      [
        "Use a promo redirect once, pivot to a community-depth question, and exit early if it continues",
        true,
        "Correct — protect the room.",
      ],
      ["Let the soft ad run for the full hour", false, "Wrong — harms trust."],
      ["Argue with them on camera", false, "Wrong — escalates."],
      ["Delete the agenda and match their pitch energy", false, "Wrong — abandons craft."],
    ]),
    question("q8", "LIVE Mission success for this lesson is…", [
      [
        "A 15+ minute structured interview segment plus two logged highlight moments",
        true,
        "Correct — artifacts + behavior.",
      ],
      ["A viral clip only", false, "Wrong — not the grade."],
      ["Writing questions but never running the segment", false, "Wrong — execution required."],
      ["Skipping the log because you will remember", false, "Wrong — logging is required."],
    ]),
  ],
});
