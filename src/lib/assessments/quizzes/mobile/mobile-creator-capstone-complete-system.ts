import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "mobile-creator-capstone-complete-system",
  programKey: "mobile",
  title: "Quiz: Mobile Creator Capstone: Complete Mobile Creator System",
  questions: [
    question("q1", "Capstone graded on?", [
      ["Dated system artifacts and evidence checklist.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Viewer peak this week.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Gift totals.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Rank.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q2", "Complete Mobile Creator System includes?", [
      ["MOB-01 through MOB-09 dated artifacts.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Only perfect-day highlight reel.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Purchased followers.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Unsafe IRL clips.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q3", "Ninety-day plan quality means?", [
      ["Three or fewer improvements with review dates.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Forty vague goals.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["No dates.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Rank targets only.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q4", "Missing dated artifact?", [
      ["Complete the lesson artifact before claiming Capstone done.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Write TBD forever.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Use rank screenshot.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Skip safety plan.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q5", "Honors Lab relationship?", [
      ["Optional after certificate; never a gate.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Required to graduate public path.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Replaces Program Final.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Replaces quizzes.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q6", "Public curriculum completion means?", [
      ["Eligible creators may hear about invite-only Leadership Academy next—not internal curriculum details.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Automatic Leadership enrollment.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["All creators must lead immediately.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["End of all Streamer Factory programs.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q7", "Safety in Capstone review?", [
      ["Safety and privacy artifacts must be present and dated.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Optional if views were high.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Replace with risky clips.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignore emergency plan.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q8", "Mobile career success looks like?", [
      ["Reviewable system still true on a bad day ninety days later.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["One lucky travel viral moment.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Gear flex only.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignoring redundancy.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
  ],
});
