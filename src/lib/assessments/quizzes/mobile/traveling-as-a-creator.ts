import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "traveling-as-a-creator",
  programKey: "mobile",
  title: "Quiz: Traveling as a Creator",
  questions: [
    question("q1", "Travel packing guide should include?", [
      ["Weight limits and redundancy layers.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Every studio item regardless of weight.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Zero power plan.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Unsafe location targets.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q2", "Airport checklist is?", [
      ["General awareness—not travel-lawyer advice.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Binding legal interpretation.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Reason to hide batteries illegally.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Permission to ignore airline staff.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q3", "Hotel stream runbook includes?", [
      ["Neighbor respect, lighting, audio, bandwidth.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Loudest possible setup always.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Filming staff without consent.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignoring hotel rules always.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q4", "Travel breaks creators who?", [
      ["Pack from memory without lists.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Use dated checklists.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Plan redundancy.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Respect weight limits.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q5", "Mission graded on?", [
      ["Completed travel artifacts.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Viewer count abroad.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Gifts.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Rank.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q6", "Redundancy on travel means?", [
      ["Backup mic, power, and storage where rules allow.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Single cable only.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["No checklist.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Dangerous shortcuts.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q7", "Unsafe-tired streaming?", [
      ["Decline or shorten—professionalism includes rest.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Push through always.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Drive while LIVE.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignore exits.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q8", "MOB-06 Capstone evidence?", [
      ["Dated packing guide and hotel runbook.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Vacation photo only.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Fake travel stats.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Empty list.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
  ],
});
