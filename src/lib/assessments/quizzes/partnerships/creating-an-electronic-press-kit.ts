import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "creating-an-electronic-press-kit",
  programKey: "partnerships",
  title: "Quiz: Creating an Electronic Press Kit (EPK)",
  questions: [
    question("q1", "Platform statistics in an EPK must include?", [
      ["Platform name and measurement timeframe for each stat.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Only vanity totals with no labels.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Purchased follower boosts.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Rank screenshots only.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q2", "Rate card in EPK is typically?", [
      ["Optional and often private until appropriate.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Required public list of every competitor's rates.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Illegal to write.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Replaced by hidden ads.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q3", "Public EPK page URL purpose?", [
      ["Let brands open your kit without repeated access requests.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Hide all stats from everyone.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Replace disclosure on sponsored posts.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Host fake testimonials.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q4", "Press photos should be?", [
      ["High-resolution, current, and approved for brand use.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Blurry screenshots from stream.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Stolen from other creators.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Optional if you have a logo only.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q5", "Previous collaborations field should list?", [
      ["Real past brand work with permitted outcomes—not fiction.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Every brand you wish you worked with.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Secret undeclared ads.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Nothing until you are huge.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q6", "Media kit layout best practice?", [
      ["Lead with scannable bio and proof before dense paragraphs.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Hide contact info to seem exclusive.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Omit demographics entirely.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Use only fan slang.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q7", "EPK mission success means?", [
      ["Field worksheet, layout checklist, and assets inventory completed.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["A brand signed you.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Gifts increased.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Rank improved.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q8", "When analytics UI changes?", [
      ["Re-label stats from the current dashboard with new timeframe notes.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Keep old screenshots forever unlabeled.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Inflate numbers to match.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Delete the EPK.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
  ],
});
