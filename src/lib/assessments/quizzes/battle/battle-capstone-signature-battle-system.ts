import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "battle-capstone-signature-battle-system",
  programKey: "battle",
  title: "Quiz: Battle Capstone: Signature Battle System",
  questions: [
    question(
      "q1",
      "Signature Battle System Capstone requires…",
      [
        ["A playbook plus a week of objectively reviewable battle results", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Gift screenshots only", false, "Wrong — that choice fights ethical battle craft."],
        ["Honors Lab before certificate", false, "Wrong — not the professional decision for this scenario."],
        ["Fake rivalry content pack", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q2",
      "Objectively reviewable evidence includes…",
      [
        ["Plans, partner coordination, replays/debriefs, communication notes, post-event analysis", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Vibes and gift totals alone", false, "Wrong — that choice fights ethical battle craft."],
        ["Private family documents", false, "Wrong — not the professional decision for this scenario."],
        ["Stolen opponent strategies posted to shame them", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q3",
      "Battle Lab / Honors is…",
      [
        ["Optional after certificate — never a gate; may include AI/mentor/optional Brad review", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Required before Capstone", false, "Wrong — that choice fights ethical battle craft."],
        ["Required for Program Final", false, "Wrong — not the professional decision for this scenario."],
        ["Required for Core Graduate", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q4",
      "Assembling BT-01…BT-07 means…",
      [
        ["Integrate strategy, energy, partners, clutch, production, debrief, and pacing into one system", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Delete old worksheets", false, "Wrong — that choice fights ethical battle craft."],
        ["Only keep the biggest gift night", false, "Wrong — not the professional decision for this scenario."],
        ["Replace ethics with drama", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q5",
      "Mission success is graded on…",
      [
        ["Documented week execution of the system — not viewer or gift count", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Peak concurrent viewers", false, "Wrong — that choice fights ethical battle craft."],
        ["Diamond records", false, "Wrong — not the professional decision for this scenario."],
        ["Number of opponents dunked on", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q6",
      "Sportsmanship in Capstone means…",
      [
        ["Fair play, gracious wins/losses, and no guilt/harassment tactics in the evidence", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Winning excuses any behavior", false, "Wrong — that choice fights ethical battle craft."],
        ["Mock montages required", false, "Wrong — not the professional decision for this scenario."],
        ["Pressure scripts required", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q7",
      "A playbook is 'signature' when…",
      [
        ["You can recreate your battle approach on purpose across a week", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["It copies a famous creator word-for-word", false, "Wrong — that choice fights ethical battle craft."],
        ["It only works once", false, "Wrong — not the professional decision for this scenario."],
        ["It depends on illegal tools", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q8",
      "Which statement is correct?",
      [
        ["Capstone is required for Battle Mastery Certificate; Honors Lab is optional prestige", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Honors replaces Capstone", false, "Wrong — that choice fights ethical battle craft."],
        ["Certificate requires agency ownership", false, "Wrong — not the professional decision for this scenario."],
        ["You can skip debriefs if you win the week", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
  ],
});
