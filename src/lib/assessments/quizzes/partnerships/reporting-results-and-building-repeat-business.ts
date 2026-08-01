import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "reporting-results-and-building-repeat-business",
  programKey: "partnerships",
  title: "Quiz: Reporting Results & Building Repeat Business",
  questions: [
    question("q1", "Campaign report should use?", [
      ["Honest metrics with timeframe labels and clear learnings.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Purchased engagement boosts.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Borrowed peer screenshots.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Inflated numbers for renewal.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q2", "Renewal conversation starts with?", [
      ["Gratitude and reliable execution recap—not desperation.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Threats to go to competitors.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Hidden ad promises.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Silence until they chase you.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q3", "Proof metrics worksheet prevents?", [
      ["Vague claims with no platform context.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["All reporting.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Disclosure.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Written scope.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q4", "Mixed campaign results?", [
      ["Report honestly with learnings and next-step ideas.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Hide the report.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Fabricate better numbers.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Blame audience only.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q5", "Repeat business comes from?", [
      ["Reliability, communication, honest reporting, and fit—not hype.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Ghosting after payment.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Hidden sponsorship.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Fake testimonials.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q6", "Report timing?", [
      ["On agreed schedule—even if results are still settling with labeled timeframes.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Never send reports.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Only send if numbers beat everyone.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["One year late.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q7", "Mission evidence?", [
      ["Report template, renewal checklist, metrics worksheet completed.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Real brand payment.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Gift total.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Rank.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q8", "Qualitative themes in reports?", [
      ["Audience reactions and content notes brands can use internally.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Insults toward the brand.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Chat drama screenshots only.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Purchased comments.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
  ],
});
