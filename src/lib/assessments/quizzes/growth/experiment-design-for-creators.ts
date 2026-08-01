import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "experiment-design-for-creators",
  programKey: "growth",
  title: "Quiz: Experiment Design for Creators",
  questions: [
    question("q1", "Clean experiment design requires…", [
      ["One variable, documented criteria, kill rules, and sample-size humility", true, "Correct — professional test hygiene."],
      ["Changing five things to learn faster", false, "Wrong — stacked variables erase learning."],
      ["No log if you feel confident", false, "Wrong — no log, no experiment."],
      ["Breaking safety if reach might rise", false, "Wrong — ethics first."],
    ]),
    question("q2", "Sample-size humility means…", [
      ["One quiet session does not prove a career truth", true, "Correct — avoid overclaiming from tiny samples."],
      ["You need millions of viewers before deciding", false, "Wrong — humility ≠ impossibility."],
      ["Never decide keep/adapt/kill", false, "Wrong — you still decide after a fair window."],
      ["Ignore all data", false, "Wrong — humility guides interpretation."],
    ]),
    question("q3", "A kill criterion should be written…", [
      ["Before the experiment starts", true, "Correct — stop conditions first."],
      ["Only after public failure", false, "Wrong — too late."],
      ["Never — always push through", false, "Wrong — kill rules protect the show."],
      ["After you invent a second variable", false, "Wrong — one variable."],
    ]),
    question("q4", "Compared with Advanced Creator experiment hygiene, this lesson emphasizes…", [
      ["Deeper design, documentation, and humility about what a small LIVE sample can prove", true, "Correct — Growth Mastery depth."],
      ["Skipping ethics for growth", false, "Wrong — ethics stay."],
      ["Agency A/B labs on other creators", false, "Wrong — out of scope."],
      ["Virality guarantees", false, "Wrong — never."],
    ]),
    question("q5", "If the variable was barely present in the window, conclude…", [
      ["Execution failed — redesign or restart; do not pretend you tested it", true, "Correct — honesty over fiction."],
      ["The algorithm failed you", false, "Wrong — you did not run the test."],
      ["It worked because you meant to", false, "Wrong — intent ≠ execution."],
      ["Hide the log", false, "Wrong — Capstone needs truth."],
    ]),
    question("q6", "End-of-experiment language should be…", [
      ["Keep, adapt, or kill — with a written why", true, "Correct — calm decision."],
      ["Quit creating if peaks did not explode", false, "Wrong — judge the criterion."],
      ["Rebrand completely as the only option", false, "Wrong — panic."],
      ["Buy followers to 'confirm' the test", false, "Wrong — banned."],
    ]),
    question("q7", "Capstone connection?", [
      ["Experiment log + conclusion become the core of the 30-day growth experiment dossier", true, "Correct — Capstone is a documented experiment."],
      ["Experiments are banned during Capstone", false, "Wrong — Capstone IS the experiment."],
      ["Only Honors Lab needs experiment logs", false, "Wrong — Capstone requires them."],
      ["Logs are optional vibes", false, "Wrong — objectively reviewable evidence."],
    ]),
    question("q8", "Experiment Design LIVE Mission success is…", [
      ["A clean design sheet plus a LIVE that executes the single variable with logging", true, "Correct — design + execution."],
      ["A viral outcome", false, "Wrong — not the grade."],
      ["Three variables in one session", false, "Wrong — one variable."],
      ["Worksheet only, no LIVE", false, "Wrong — LIVE required."],
    ]),
  ],
});
