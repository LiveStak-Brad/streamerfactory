import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "delivering-outstanding-campaigns",
  programKey: "partnerships",
  title: "Quiz: Delivering Outstanding Campaigns",
  questions: [
    question("q1", "Before LIVE sponsored content goes out?", [
      ["Confirm approval status and disclosure placement in writing.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Improvise disclosure if chat asks.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Hide sponsorship for authenticity.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Skip brief review.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q2", "Deliverables checklist includes?", [
      ["Draft, approval, publish, disclosure, and proof capture.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Only going LIVE.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Only invoice sending.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Only gift counting.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q3", "FTC disclosure reminder card purpose?", [
      ["Pre-plan clear sponsorship labels per format.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Eliminate all labels.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Hide #ad in fine print off-screen.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Replace attorney review.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q4", "Late delivery best handled by?", [
      ["Proactive brand notice with revised timeline—not ghosting.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Silence until they forget.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Blaming chat.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Deleting evidence.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q5", "Campaign planner should include?", [
      ["Milestones, owners, buffers, and asset needs.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Only vibes.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Purchased engagement plan.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Fake testimonial script.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q6", "Hidden advertising?", [
      ["Violates trust and program standards—always disclose.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Fine for gifting.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Required for renewals.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Better for engagement.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q7", "Mission success?", [
      ["Completed planner, checklist, and disclosure card.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Brand renewal guaranteed.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Gift spike.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Rank jump.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q8", "Proof capture means?", [
      ["Honest screenshots and links with timeframe labels.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Inflated metrics.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Borrowed results.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Deleted posts.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
  ],
});
