import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "analytics-deep-dive-for-live-creators",
  programKey: "growth",
  title: "Quiz: Analytics Deep Dive for LIVE Creators",
  questions: [
    question("q1", "A monthly LIVE analytics review should produce…", [
      ["Three decisions maximum", true, "Correct — insight without decision overload."],
      ["Forty new tactics with no priority", false, "Wrong — that is thrash."],
      ["A guarantee of next month's viral hit", false, "Wrong — never promise virality."],
      ["Permission to ignore integrity metrics", false, "Wrong — integrity still matters."],
    ]),
    question("q2", "Leading indicators are useful because they…", [
      ["Signal behavior you can influence before lagging totals arrive", true, "Correct — lead vs lag literacy."],
      ["Always equal gift totals", false, "Wrong — gifts are often lagging."],
      ["Replace the need for a calendar", false, "Wrong — consistency still rules."],
      ["Only matter for agencies", false, "Wrong — creators need them."],
    ]),
    question("q3", "Gift concentration risk means…", [
      ["Depending on one or two gifters makes income fragile even if totals look fine", true, "Correct — health beyond totals."],
      ["You should pressure one person to gift more", false, "Wrong — unethical."],
      ["You must ban large gifts", false, "Wrong — awareness, not bans."],
      ["Concentration is always good", false, "Wrong — fragility risk."],
    ]),
    question("q4", "Comparing sessions helps when you…", [
      ["Hold most variables steady and note what actually differed", true, "Correct — clean comparison."],
      ["Compare a chaotic week to a perfect fantasy week", false, "Wrong — unfair comparison."],
      ["Only screenshot peaks", false, "Wrong — peaks ≠ analysis."],
      ["Ignore return viewer patterns", false, "Wrong — cohorts/return signals matter."],
    ]),
    question("q5", "If your review creates twelve 'priorities,' you should…", [
      ["Cut to three decisions max and park the rest", true, "Correct — decision hygiene."],
      ["Try all twelve this week", false, "Wrong — overload."],
      ["Delete the review", false, "Wrong — refine it."],
      ["Post the twelve as engagement bait", false, "Wrong — banned pattern."],
    ]),
    question("q6", "Vanity traps in LIVE analytics include…", [
      ["Treating a single peak as proof your whole system works", true, "Correct — peaks can lie."],
      ["Tracking sessions completed vs planned", false, "Wrong — that is useful integrity."],
      ["Noting return-viewer signals", false, "Wrong — useful."],
      ["Writing three decisions", false, "Wrong — the goal."],
    ]),
    question("q7", "Capstone connection for analytics?", [
      ["Monthly review pages become Capstone dossier evidence and decision history", true, "Correct — reviewable numbers."],
      ["Analytics replace the 30-day experiment", false, "Wrong — they support it."],
      ["Only Honors Lab reads analytics", false, "Wrong — Capstone needs them."],
      ["Analytics are optional vibes", false, "Wrong — complete a real review."],
    ]),
    question("q8", "Analytics LIVE Mission success is…", [
      ["A completed monthly review with ≤3 decisions plus a LIVE that executes one decision", true, "Correct — review → action."],
      ["A bigger gift total than last month", false, "Wrong — not the grade."],
      ["Screenshotting dashboards without decisions", false, "Wrong — incomplete."],
      ["Skipping LIVE because spreadsheets feel productive", false, "Wrong — LIVE required."],
    ]),
  ],
});
