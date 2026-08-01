import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "building-a-mobile-creator-mindset",
  programKey: "mobile",
  title: "Quiz: Building a Mobile Creator Mindset",
  questions: [
    question("q1", "Mobile creator freedom means?", [
      ["Prepared gear, power, exits, and repeatable systems.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Streaming anywhere with no plan.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Chasing dangerous locations for clips.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Ignoring battery and heat limits.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q2", "MOB-01 success should be graded on?", [
      ["Completed mindset artifacts with honest tradeoffs.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Viewer count on a travel stream.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Gift totals this week.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Rank versus peers.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q3", "Mobility-versus-studio scorecard helps by?", [
      ["Forcing honest tradeoffs before you commit to a format.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Proving studio is always worse.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Replacing safety planning.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Eliminating redundancy.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q4", "Freedom operating principles should include?", [
      ["Gear, power, exit, and simplicity rules—not slogans.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Only aesthetic mood boards.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Secret unsafe location list.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Yearly phone model requirements.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q5", "This path must never teach?", [
      ["Unsafe filming, trespassing, privacy ignore, or dangerous driving.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Redundancy planning.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Setup runbooks.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Honest capability worksheets.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q6", "Mobile mindset before gear buys means?", [
      ["Naming reliability goals and constraints first.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Buying the most expensive backpack.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Waiting for a new phone launch.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Skipping checklists.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q7", "Capstone connection for MOB-01?", [
      ["Mindset checklist and principles card filed in the system.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Screenshot of a viral travel clip.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Purchased rank boost.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Empty promise to pack someday.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
    question("q8", "Principle over phone model means?", [
      ["Teach storage, battery, heat, and ports—not yearly hype.", true, "Correct — that choice protects mobile creator readiness with reviewable evidence and safe boundaries."],
      ["Recommend one phone for everyone.", false, "Wrong — that choice favors hype, unsafe IRL, or unreviewable outcomes."],
      ["Ignore thermal throttling.", false, "Wrong — mobile mastery is graded on artifact quality, not vanity metrics."],
      ["Skip audio planning.", false, "Wrong — protect preparation, safety, redundancy, and honest communication."],
    ]),
  ],
});
