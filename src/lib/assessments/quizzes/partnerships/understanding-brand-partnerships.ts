import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "understanding-brand-partnerships",
  programKey: "partnerships",
  title: "Quiz: Understanding Brand Partnerships",
  questions: [
    question("q1", "A creator buys followers before pitching brands. Professional response?", [
      ["Never—honest metrics and reviewable artifacts are the standard.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Do it quietly if engagement looks low.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Hide the purchase in a footnote.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Brands never check audience quality.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q2", "BP-01 success should be graded on?", [
      ["Completed readiness artifacts with honest self-assessment.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Landing a sponsorship this week.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Gift totals on stream.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Viewer rank versus peers.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q3", "Integrated sponsorship typically means?", [
      ["Brand message woven into content with clear disclosure.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Secret advertising with no label.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Only affiliate links with no creative work.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Fake testimonials you did not experience.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q4", "Brand safety values card purpose?", [
      ["Pre-decide categories and lines you will not cross for any fee.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Replace legal contract review.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Guarantee every pitch succeeds.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Eliminate disclosure requirements.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q5", "Which model is often lowest commitment?", [
      ["Gifting or seeding with clear expectations—not hidden ads.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Exclusive multi-year ambassador with broad usage rights.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Integrated campaign with reporting duties.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Whitelisted ad spend requiring asset handoff.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q6", "This path must never teach?", [
      ["Fake metrics, hidden advertising, or buying followers.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Disclosure planning.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Professional outreach templates.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Honest audience overviews.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q7", "Readiness before outreach means?", [
      ["Documented bio, audience context, portfolio samples, and values.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Waiting until you are famous.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Copying another creator's media kit.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Avoiding all brand contact until viral.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q8", "Capstone connection for BP-01?", [
      ["Readiness checklist and values card filed in the portfolio.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Screenshot of a rejected pitch.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Purchased engagement proof.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Empty promise to pitch someday.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
  ],
});
