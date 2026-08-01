import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "becoming-a-long-term-brand-partner",
  programKey: "partnerships",
  title: "Quiz: Becoming a Long-Term Brand Partner",
  questions: [
    question("q1", "Between-campaign touchpoints should?", [
      ["Add value without spam—check-ins and relevant ideas.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Demand new contracts weekly.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Send hidden ads.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Buy followers before each ping.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q2", "Reputation scorecard tracks?", [
      ["Reliability, communication, disclosure, and fit.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Only gift totals.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Only viewer rank.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Only gear spending.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q3", "Renewal roadmap includes?", [
      ["Twelve-month plan with anchor relationships and review dates.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Hope without dates.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Fake testimonials.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Contract avoidance.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q4", "Late delivery pattern hurts because?", [
      ["Brands plan campaigns around trust and calendars.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Only small creators care.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Disclosure fixes it.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Reports do not matter.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q5", "Easy to rebook means?", [
      ["Clear communication, on-time work, honest reporting—not hype.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Always lowest price.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Hidden sponsorship.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Never saying no.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q6", "Anchor brand in roadmap can be?", [
      ["Real partner or well-researched mock target with honest fit notes.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Only Fortune 500 fantasy.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Random logo with no research.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Competitor you secretly bash.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q7", "Mission success?", [
      ["Relationship planner, reputation scorecard, renewal roadmap dated.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Guaranteed multi-year deal.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Gift record.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Rank one.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q8", "Optional Honors Lab?", [
      ["Never gates the Brand Partnerships Mastery Certificate.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Required before BP-01.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Replaces Capstone.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Replaces quizzes.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
  ],
});
