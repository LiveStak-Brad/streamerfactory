import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "creating-high-quality-videos-on-your-phone",
  programKey: "mobile",
  title: "Quiz: Creating High-Quality Videos on Your Phone",
  questions: [
    question("q1", "Phone edit workflow should be?", [
      ["Repeatable steps you can run every week.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["One-off trick you cannot reproduce.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Desktop-only process.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Rank-dependent.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q2", "Mobile caption checklist includes?", [
      ["Contrast, timing, safe areas, readability.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Tiny unreadable text only.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Ignoring accessibility.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Random fonts every video.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q3", "Thumbnail on phone guide emphasizes?", [
      ["Legibility and one clear subject.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Cluttered collages.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Stolen images.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Zero brand consistency.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q4", "MOB-05 mission success?", [
      ["Completed workflow and checklists.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Viral view count.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Gift spike.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Leaderboard rank.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q5", "Quality on phone means?", [
      ["Consistent steps—not latest app hype.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["New phone required yearly.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Unsafe location B-roll.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignoring audio from MOB-03.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q6", "Export backup habit?", [
      ["Save to named cloud folder with offline copy plan.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Single device only.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Delete originals immediately.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Skip captions.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q7", "This lesson complements Production Mastery by?", [
      ["Owning phone-first post workflows.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Replacing all studio teaching.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Teaching trespass.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignoring safety.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q8", "Capstone evidence?", [
      ["Dated workflow and caption checklist.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Borrowed edit screenshot.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Empty template.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Undated promise.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
  ],
});
