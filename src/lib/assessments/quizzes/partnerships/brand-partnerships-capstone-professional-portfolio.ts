import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "brand-partnerships-capstone-professional-portfolio",
  programKey: "partnerships",
  title: "Quiz: Brand Partnerships Capstone: Professional Portfolio",
  questions: [
    question("q1", "Capstone graded on?", [
      ["Dated portfolio artifacts, EPK checklist, and ninety-day plan.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Securing a sponsorship during Capstone week.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Gift totals.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Viewer rank.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q2", "EPK evidence checklist verifies?", [
      ["Every defined field complete or honestly marked in progress.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Only follower count.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Only logo.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Hidden ads.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q3", "Ninety-day plan quality means?", [
      ["Three or fewer improvements with review dates.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Forty infinite goals.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["No dates.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Only vibes.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q4", "Missing dated artifact in portfolio?", [
      ["Complete the lesson artifact before claiming Capstone done.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Write TBD forever.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Replace with rank screenshot.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Skip and hope.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q5", "Public EPK page URL in Capstone?", [
      ["Required evidence that brands can open your kit.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Optional if you never pitch.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Replaces all disclosure.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Hosts fake reviews.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q6", "Honors Lab relationship?", [
      ["Optional after certificate; never a gate.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Required to graduate.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Replaces Program Final.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Replaces EPK.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q7", "Contract questions in Capstone?", [
      ["Note attorney handoff; do not pretend worksheets are legal advice.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["Sign anything quickly.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Avoid all mention.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Ask chat to review.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
    question("q8", "Career partnership success looks like?", [
      ["Reviewable professionalism still true ninety days later.", true, "Correct — that choice protects professional brand partnership readiness with reviewable evidence."],
      ["One lucky reply.", false, "Wrong — that choice favors hype, hidden ads, or unreviewable outcomes."],
      ["Purchased followers.", false, "Wrong — partnership mastery is graded on artifact quality, not vanity metrics."],
      ["Hidden sponsorship habit.", false, "Wrong — protect transparency, preparation, and honest communication."],
    ]),
  ],
});
