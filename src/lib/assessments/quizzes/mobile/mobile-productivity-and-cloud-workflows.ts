import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "mobile-productivity-and-cloud-workflows",
  programKey: "mobile",
  title: "Quiz: Mobile Productivity & Cloud Workflows",
  questions: [
    question("q1", "Cloud organization system needs?", [
      ["Naming rules a collaborator could follow.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Random folders only.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Single device with no backup.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignoring offline fallbacks.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q2", "Battery planner maps?", [
      ["Session length to chargers and swap points.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Only viewer goals.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Rank targets.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Gift totals.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q3", "Offline workflow card covers?", [
      ["Dead zones, failed sync, dead batteries.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Perfect network always.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Illegal uploads.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Privacy ignore.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q4", "Dead zone scenario?", [
      ["Plan what still works locally before upload returns.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Panic and delete footage.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Stream while driving.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Trespass for signal.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q5", "Mission success?", [
      ["Completed cloud, battery, offline artifacts.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Viral clip.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Rank jump.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Gift record.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q6", "Mobility plus cloud means?", [
      ["Portability with redundancy—not one fragile path.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Desktop only.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["No backups.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Skip labeling.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q7", "Sync before travel?", [
      ["Decide what must finish versus can wait.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Ignore until airport.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Hide battery limits.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Skip captions.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q8", "MOB-07 Capstone evidence?", [
      ["Dated cloud and offline cards.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Empty drive.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Borrowed folder screenshot.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Undated plan.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
  ],
});
