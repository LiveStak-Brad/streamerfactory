import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "mobile-audio-and-lighting",
  programKey: "mobile",
  title: "Quiz: Mobile Audio & Lighting",
  questions: [
    question("q1", "Mobile audio priority?", [
      ["Intelligibility with monitoring and wind protection.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Loudest possible gain always.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Ignoring background noise.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Only visual filters.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q2", "Wind and noise plan should include?", [
      ["When to pause, move, or end—not only gear.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Streaming in traffic for hype.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Filming private conversations.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Dangerous driving commentary.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q3", "Portable lighting checklist must note?", [
      ["Battery draw and heat—not only brightness.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Studio grid requirements.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Permanent installs.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignoring power limits.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q4", "Average video versus bad audio?", [
      ["Viewers tolerate average video faster than bad audio.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Audio never matters on mobile.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Only rank matters.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Lighting replaces mic.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q5", "Monitoring habit purpose?", [
      ["Catch clipping and wind early before going LIVE.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Look professional only.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Replace safety checklist.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Hide redundancy.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q6", "Mission success?", [
      ["Completed audio card, lighting checklist, wind plan.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Viewer count.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Gifts.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Rank.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q7", "Crowded location noise?", [
      ["Move, pause, or end—do not ignore safety and clarity.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Shout over everyone forever.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Film strangers without care.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Chase chaos.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q8", "MOB-03 Capstone evidence?", [
      ["Dated audio and lighting artifacts.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Stock photo studio.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Fake mic brand deal.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Empty card.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
  ],
});
