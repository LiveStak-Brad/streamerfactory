import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "irl-streaming-safely-and-responsibly",
  programKey: "mobile",
  title: "Quiz: IRL Streaming Safely & Responsibly",
  questions: [
    question("q1", "IRL safety checklist includes?", [
      ["Visibility, exits, and end triggers—not only start hype.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Dangerous driving.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Trespassing for views.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignoring minors' privacy.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q2", "Public privacy checklist prevents?", [
      ["Filming people and places you should not.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["All outdoor streams.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Audio planning.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Battery planning.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q3", "Emergency backup plan covers?", [
      ["Connectivity loss, harassment, medical need, quick end.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Only gift totals.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Rank recovery.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Buying viewers.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q4", "Chasing chaos for clips?", [
      ["Violates program standards—choose safety.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Required for growth.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Replaces redundancy.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Better than planning.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q5", "Streaming while driving?", [
      ["Never taught or acceptable.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Fine for engagement.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Audio workaround.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Privacy solution.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q6", "Mission graded on?", [
      ["Completed safety and privacy artifacts.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Viewer spike from risky shot.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Gifts.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Rank.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q7", "Chat pushes risky location?", [
      ["Decline using pre-written boundary.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Always obey chat.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Hide stream.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignore exits.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q8", "MOB-08 Capstone evidence?", [
      ["Dated safety, privacy, emergency plans.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Risky clip highlight.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Fake permission note.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Empty checklist.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
  ],
});
