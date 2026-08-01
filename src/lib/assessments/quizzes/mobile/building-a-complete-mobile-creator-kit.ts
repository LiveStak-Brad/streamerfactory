import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "building-a-complete-mobile-creator-kit",
  programKey: "mobile",
  title: "Quiz: Building a Complete Mobile Creator Kit",
  questions: [
    question("q1", "Complete kit means?", [
      ["Redundancy layers with tested backups.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Most expensive bag available.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Maximum weight regardless of travel.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Zero inventory list.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q2", "Kit redundancy map shows?", [
      ["What fails and what backup covers it.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Only primary gear.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Viewer targets.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Rank goals.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q3", "Ninety-day upgrade plan should?", [
      ["Fix one reliability bottleneck with review date.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Buy every trending accessory.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Ignore battery health.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Skip testing.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q4", "Inventory honesty requires?", [
      ["Items you actually carry and test.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Aspirational influencer photos.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Borrowed gear lists.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Hidden unsafe tools.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q5", "Mission success?", [
      ["Inventory, redundancy map, upgrade plan dated.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Gift total.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Viewer count.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Rank.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q6", "Unused gear in bag?", [
      ["Remove to save weight and confusion.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Keep forever untouched.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Add more blindly.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Skip labeling.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q7", "Redundancy layers include?", [
      ["Power, audio, storage, connectivity.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Only thumbnails.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Only captions.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Only rank trackers.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q8", "MOB-09 Capstone evidence?", [
      ["Dated inventory and redundancy map.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Shopping cart screenshot.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Fake unboxing.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Empty bag photo only.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
  ],
});
