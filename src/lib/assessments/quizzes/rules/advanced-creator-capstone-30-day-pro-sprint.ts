import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "advanced-creator-capstone-30-day-pro-sprint",
  programKey: "rules",
  title: "Quiz: Advanced Creator Capstone",
  questions: [
    question("q1", "What makes the Capstone objectively reviewable?", [
      ["A dossier with OS, brand, scorecards, plan, experiment, standards, privacy, and before/after review", true, "Correct — inspectable evidence."],
      ["A feeling that you streamed a lot", false, "Wrong — vibes are not a Capstone."],
      ["A logo redesign only", false, "Wrong — incomplete."],
      ["Recruiting five creators", false, "Wrong — outside scope."],
    ]),
    question("q2", "How many growth experiments belong inside the 30-day sprint?", [
      ["One clean experiment window — not five stacked tests", true, "Correct — measurement needs restraint."],
      ["At least one new experiment every day", false, "Wrong — thrash."],
      ["Zero — experiments are banned", false, "Wrong — one is expected."],
      ["Unlimited if peaks rise", false, "Wrong — destroys learning."],
    ]),
    question("q3", "Honors Lab review…", [
      ["Is optional after the certificate and never gates certification", true, "Correct — labs are honors, not gates."],
      ["Must be finished before you can pass Capstone", false, "Wrong — non-gating."],
      ["Replaces the Program Final", false, "Wrong — final still exists."],
      ["Is required for every Core Graduate", false, "Wrong — Advanced Creator optional honors."],
    ]),
    question("q4", "If life explodes mid-sprint you should…", [
      ["Rewrite capacity honestly, document it, continue a smaller real sprint", true, "Correct — honest adjustment beats ghosting."],
      ["Fake a perfect dossier anyway", false, "Wrong — honesty is the standard."],
      ["Quit and delete all worksheets", false, "Wrong — document and continue."],
      ["Start three new brands to cope", false, "Wrong — freeze brand and finish."],
    ]),
    question("q5", "Before snapshot matters because…", [
      ["After review needs contrast — otherwise the close is vibes", true, "Correct — capture before on kickoff day."],
      ["Brad requires screenshots of competitors", false, "Wrong — unrelated."],
      ["You must freeze forever at baseline", false, "Wrong — sprint is for improvement."],
      ["It replaces weekly scorecards", false, "Wrong — you still file weekly scorecards."],
    ]),
    question("q6", "After Advanced Creator Certificate, most creators should…", [
      ["Enter Mastery Paths — Presence recommended first for most", true, "Correct — specialize after the black belt."],
      ["Stop learning because the university is done", false, "Wrong — Mastery Paths continue."],
      ["Immediately open a competing agency", false, "Wrong — outside educational lane."],
      ["Skip Presence and only study recruiting", false, "Wrong — false path."],
    ]),
    question("q7", "Capstone Kickoff LIVE success is…", [
      ["Sprint plan assembled plus a 45+ minute LIVE stating the goal and starting the clock", true, "Correct — real kickoff."],
      ["Watching the lesson without scheduling the month", false, "Wrong — execution required."],
      ["Waiting for Honors Lab approval before starting", false, "Wrong — labs never gate."],
      ["Changing brand three times during the kickoff", false, "Wrong — freeze and run."],
    ]),
    question("q8", "The black-belt meaning of Advanced Creator is…", [
      ["You operate like a professional with evidence — then you specialize", true, "Correct — think + operate, then Mastery Paths."],
      ["You memorized slogans without running a month", false, "Wrong — Capstone needs time evidence."],
      ["You finished Core only", false, "Wrong — Core is the floor; this is the bridge."],
      ["You unlocked agency ownership curriculum", false, "Wrong — not taught here."],
    ]),
  ],
});
