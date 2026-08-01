import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "negotiating-sponsorships-professionally",
  programKey: "partnerships",
  title: "Quiz: Negotiating Sponsorships Professionally",
  questions: [
    question("q1", "Negotiation scope worksheet should list?", [
      ["Deliverables, dates, approval steps, and revision limits in plain language.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Only a dollar amount with no details.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Verbal handshake promises.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Hidden ad instructions.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q2", "Rate card purpose?", [
      ["Package tiers that help you know your floor—even if private.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Public shaming of other creators' rates.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Legal contract replacement.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Fake metric guarantees.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q3", "Exclusivity clause you do not understand?", [
      ["Pause and consult a qualified attorney—not guess on stream.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Sign immediately for speed.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Ignore it.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Ask chat to interpret.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q4", "Usage rights concern?", [
      ["How long and where a brand may use your likeness or clips.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Only gift totals.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Chat emoji choices.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Stream title fonts.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q5", "Handshake deals risk?", [
      ["Scope drift, payment disputes, and missing disclosure clarity.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Nothing—they are always best.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Only for small creators.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Required by FTC.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q6", "Must-haves versus nice-to-haves help?", [
      ["Prevent accidental concessions during live calls.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Eliminate all negotiation.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Replace written scope.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Hide sponsorship.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q7", "Mission evidence?", [
      ["Scope worksheet, rate planner, and deal terms checklist.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Signed contract without reading.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Gift screenshot.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Viewer rank.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q8", "This path teaches contracts as?", [
      ["High-level awareness—not legal advice.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Attorney replacement.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Optional jokes.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Reason to avoid disclosure.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
  ],
});
