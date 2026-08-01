import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "financial-wellness-for-variable-income",
  programKey: "wellness",
  title: "Quiz: Financial Wellness for Variable Income",
  questions: [
    question("q1", "Best personal baseline for variable income?", [
      ["A trailing median of recent months, not your best spike.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Your highest month forever.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Zero planning.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Only gift goals.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q2", "An emergency fund here means?", [
      ["Months of essential personal expenses you can reach in a slow stretch.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Money for more RGB lights only.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Ignoring taxes.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Spending every peak week.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q3", "Tax set-asides should be?", [
      ["Automated to a separate account and confirmed with a qualified professional.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Skipped until audit day.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Guessed from a viral tip.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Handled by chat advice alone.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q4", "A slow-month playbook should include?", [
      ["Pre-decided tiered cuts and what stays funded.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Panic deleting your channel.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Shame posts daily.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Maxing credit for lifestyle creep.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q5", "This path should NOT replace?", [
      ["Professional Creator Mastery business accounting and contracts.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["A personal buffer plan.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["A tax set-aside habit.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["A slow-month playbook.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q6", "Financial panic often worsens when?", [
      ["Creators treat every dip as career death without a buffer rule.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["They have a written baseline.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["They automate set-asides.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["They review quarterly.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q7", "Diversifying income wisely starts with?", [
      ["Stabilizing a baseline and adding one realistic lane without chaos.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Launching five businesses in a weekend.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Ignoring skills.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Quitting LIVE immediately.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q8", "Mission evidence is?", [
      ["Buffer plan, slow-month playbook, and personal tax-savings checklist.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["A flex screenshot of one big night.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Viewer rank.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Gift leaderboard.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
  ],
});
