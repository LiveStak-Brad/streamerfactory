import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "streaming-anywhere-professionally",
  programKey: "mobile",
  title: "Quiz: Streaming Anywhere Professionally",
  questions: [
    question("q1", "Anywhere setup runbook includes?", [
      ["Time-boxed setup, stream, teardown, and exits.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Only aesthetic location picks.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Dangerous driving streams.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignoring heat limits.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q2", "Heat and power checklist prevents?", [
      ["Mid-stream death from throttling and dead batteries.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["All travel.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Audio monitoring.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Caption workflows.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q3", "Bandwidth fallback means?", [
      ["Planned lower quality or graceful end—not panic.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Never ending a stream.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Illegal recording tricks.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignoring privacy.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q4", "Before going LIVE anywhere?", [
      ["Confirm safe location, power, audio, and exit plan.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Start immediately for hype.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Trespass for better background.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignore venue rules always.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q5", "Mission graded on?", [
      ["Completed checklist, runbook, heat-power plan.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Viewer peak.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Gifts.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Rank.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q6", "Professional mobile streaming avoids?", [
      ["Improvisation without power and heat planning.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Written runbooks.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Redundancy.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Teardown order.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q7", "Thermal pause rule?", [
      ["Stop or simplify before damage and unintelligible audio.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Keep going until phone shuts down.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Hide overheating from chat.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Drive while streaming.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q8", "MOB-04 Capstone evidence?", [
      ["Dated runbook and heat-power checklist.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Highlight reel only.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Fake location claim.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Undated notes.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
  ],
});
