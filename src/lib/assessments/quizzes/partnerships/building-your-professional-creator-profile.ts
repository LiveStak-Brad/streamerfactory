import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "building-your-professional-creator-profile",
  programKey: "partnerships",
  title: "Quiz: Building Your Professional Creator Profile",
  questions: [
    question("q1", "Best bio tone for brand readers?", [
      ["Professional, specific, and scannable—not hype or slang soup.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Inside jokes only day-one fans understand.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Empty superlatives with no proof.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Copied text from a larger creator.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q2", "Audience stats should always include?", [
      ["Platform name and measurement timeframe.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Only lifetime totals with no context.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Purchased follower counts.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Rank versus other creators.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q3", "Portfolio selection should prove?", [
      ["Fit for brand categories you want—not random virality only.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["That you will work for free forever.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["That you never disclose sponsorships.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["That you have no past content.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q4", "A brand manager has two minutes. Your job?", [
      ["Make bio, audience, and samples legible that fast.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Send a twenty-page life story.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Require a call before sharing anything.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Hide all metrics as secret.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q5", "Profile mission graded on?", [
      ["Completed worksheets and selected samples—not deal closure.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Gifts this week.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Viewer count alone.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Number of blind pitches sent.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q6", "Inflated analytics in a profile?", [
      ["Violates trust—use honest numbers.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Is fine if the brand does not check.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Only matters for taxes.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Replaces disclosure.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q7", "Third-person bio helps when?", [
      ["Agencies forward your file and need neutral language.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["You want to hide who you are.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["You refuse all partnerships.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["You skip audience overview.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q8", "BP-02 Capstone evidence?", [
      ["Dated bio, audience overview, and portfolio guide entries.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["A fake testimonial.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Borrowed screenshots.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Undated intentions.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
  ],
});
