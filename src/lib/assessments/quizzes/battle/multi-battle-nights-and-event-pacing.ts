import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "multi-battle-nights-and-event-pacing",
  programKey: "battle",
  title: "Quiz: Multi-Battle Nights and Event Pacing",
  questions: [
    question(
      "q1",
      "Multi-battle night risk is…",
      [
        ["Stacked battles without recovery destroy voice, brand, and decision quality", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Always more battles = always better", false, "Wrong — that choice fights ethical battle craft."],
        ["Recovery is weakness", false, "Wrong — not the professional decision for this scenario."],
        ["Narrative continuity is optional fluff", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q2",
      "Recovery blocks should…",
      [
        ["Be scheduled on purpose between battles for voice, water, and reset", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Be skipped if gifts are good", false, "Wrong — that choice fights ethical battle craft."],
        ["Be filled with more battles", false, "Wrong — not the professional decision for this scenario."],
        ["Be used for guilt content", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q3",
      "Event narrative continuity means…",
      [
        ["The night has a story thread viewers can follow across matchups", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Random chaos with no callbacks", false, "Wrong — that choice fights ethical battle craft."],
        ["Fake rivalries without consent", false, "Wrong — not the professional decision for this scenario."],
        ["Ignoring partner intros", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q4",
      "MS-02 callback means…",
      [
        ["Brief burnout awareness; this lesson designs battle-night load", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Full Mindset rewrite", false, "Wrong — that choice fights ethical battle craft."],
        ["Permission to ignore recovery", false, "Wrong — not the professional decision for this scenario."],
        ["Quit battles forever", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q5",
      "Mission success is…",
      [
        ["A paced multi-battle night plan with recovery and continuity (executed or fully timed tabletop)", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Most battles possible until collapse", false, "Wrong — that choice fights ethical battle craft."],
        ["Gift record only", false, "Wrong — not the professional decision for this scenario."],
        ["No partner coordination", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q6",
      "Fight-card pacing lesson for battles…",
      [
        ["Design openers and mid-card so the finale still matters — momentum is cumulative", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Bet everything on one random invite", false, "Wrong — that choice fights ethical battle craft."],
        ["Never warm up the room", false, "Wrong — not the professional decision for this scenario."],
        ["End with six scream rounds identical", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q7",
      "If your voice is fraying mid-night…",
      [
        ["Protect recovery — shorten stack or stop; craft beats heroics", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Scream louder", false, "Wrong — that choice fights ethical battle craft."],
        ["Add more battles", false, "Wrong — not the professional decision for this scenario."],
        ["Drink energy drinks as the only plan", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
    question(
      "q8",
      "Capstone uses night planning by…",
      [
        ["Including event pacing as part of the signature battle system week", true, "Correct — matches Battle Mastery standards for this lesson."],
        ["Ignoring recovery in the playbook", false, "Wrong — that choice fights ethical battle craft."],
        ["Optional only if you lose", false, "Wrong — not the professional decision for this scenario."],
        ["Replacing strategy with volume", false, "Wrong — Battle Mastery grades execution and sportsmanship, not manipulation."],
      ],
    ),
  ],
});
