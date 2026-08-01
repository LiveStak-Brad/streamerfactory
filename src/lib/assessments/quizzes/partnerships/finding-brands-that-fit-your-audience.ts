import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "finding-brands-that-fit-your-audience",
  programKey: "partnerships",
  title: "Quiz: Finding Brands That Fit Your Audience",
  questions: [
    question("q1", "Brand fit scorecard prevents?", [
      ["Spray-and-pray pitching to mismatched companies.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["All research.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Any outreach ever.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Disclosure requirements.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q2", "A high fit score requires?", [
      ["Honest audience overlap and values alignment—not wanting the logo.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Purchased followers.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Hidden ads.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Fake case studies.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q3", "Target research sheet should capture?", [
      ["Recent campaigns, partners, and contact paths.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Only CEO home addresses.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Competitors' private contracts.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Rumored budgets with no source.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q4", "Sponsorship tracker helps by?", [
      ["Making next actions and follow-ups visible—not hopeful memory.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Guaranteeing replies.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Replacing written scope.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Hiding failed pitches.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q5", "Creator pitches energy drink to toddler-family channel. Fit?", [
      ["Poor—values and audience mismatch should block the pitch.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Perfect if fee is high.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Fine if disclosure is hidden.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Required for growth.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q6", "Research before outreach means?", [
      ["Brand-specific notes in the first email—not generic praise.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Copy-paste fifty identical emails.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Buy followers first.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Skip audience overview.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q7", "Mission graded on?", [
      ["Completed scorecard, tracker, and research sheet.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["One brand reply.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Gift totals.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Viewer rank.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q8", "Conflicting brand values?", [
      ["Decline or skip—even when budget looks attractive.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Accept and hide sponsorship.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Change values card secretly.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Never document the decision.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
  ],
});
