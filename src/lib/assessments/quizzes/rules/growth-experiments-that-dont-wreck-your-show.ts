import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "growth-experiments-that-dont-wreck-your-show",
  programKey: "rules",
  title: "Quiz: Growth Experiments That Don't Wreck Your Show",
  questions: [
    question("q1", "What separates an experiment from thrashing?", [
      ["One variable, a defined window, success criteria, and a kill rule", true, "Correct — that is professional experiment hygiene."],
      ["Changing niche, schedule, and CTA in the same week", false, "Wrong — that is thrash."],
      ["Copying every viral tip immediately", false, "Wrong — superstition, not science."],
      ["Skipping the log because you 'felt' it worked", false, "Wrong — no log, no learning."],
    ]),
    question("q2", "Which variable lanes does this lesson recommend?", [
      ["Schedule, hook, topic/segment emphasis, or CTA", true, "Correct — four safe lanes."],
      ["Safety policy, brand honesty, and copyright violations", false, "Wrong — ethics are not hackable variables."],
      ["Only peak viewers as the variable", false, "Wrong — peaks are outcomes/notes, not the controlled variable."],
      ["Recruiting creators into your network", false, "Wrong — outside scope."],
    ]),
    question("q3", "When should you write the kill rule?", [
      ["Before session one of the experiment", true, "Correct — decide the stop condition first."],
      ["Only after the experiment fails publicly", false, "Wrong — too late."],
      ["Never — professionals always push through", false, "Wrong — kill rules protect the show."],
      ["After you change five other variables", false, "Wrong — one variable only."],
    ]),
    question("q4", "An experiment that requires breaking platform safety is…", [
      ["Not allowed — kill before you start", true, "Correct — ethics first."],
      ["Fine if the peak is high enough", false, "Wrong — never."],
      ["Required for Advanced Creator credit", false, "Wrong — false."],
      ["Only a problem for beginners", false, "Wrong — safety scales with you."],
    ]),
    question("q5", "During the two-week window you should…", [
      ["Keep brand and OS capacity stable while logging the one variable", true, "Correct — stable base, single change."],
      ["Start a second experiment mid-week if bored", false, "Wrong — stacked variables erase learning."],
      ["Abandon the calendar for a heroic growth binge", false, "Wrong — capacity rules stay."],
      ["Ignore results until next year", false, "Wrong — end with keep/adapt/kill."],
    ]),
    question("q6", "End-of-window decisions are…", [
      ["Keep, adapt, or kill — with one sentence why", true, "Correct — calm decision language."],
      ["Quit creating forever if peaks did not explode", false, "Wrong — judge the criterion you wrote."],
      ["Rebrand completely as the only option", false, "Wrong — panic, not analysis."],
      ["Hide the log if results were mixed", false, "Wrong — honesty feeds Capstone."],
    ]),
    question("q7", "Capstone connection for experiments?", [
      ["Brief + results log become Capstone retrospective evidence", true, "Correct — one real experiment, documented."],
      ["Experiments replace the Capstone dossier", false, "Wrong — they are one dossier piece."],
      ["Only optional Honors Lab needs experiment logs", false, "Wrong — Capstone needs them; labs are optional."],
      ["Experiments are banned during Capstone", false, "Wrong — one experiment window is expected."],
    ]),
    question("q8", "Experiment Day-One LIVE success is…", [
      ["A completed brief plus a 45+ minute LIVE that executes the variable on purpose", true, "Correct — clean day-one execution."],
      ["A viral spike validating the myth", false, "Wrong — spike is not the grade."],
      ["Skipping LIVE because the brief looks scientific", false, "Wrong — execution required."],
      ["Testing three CTAs in one session", false, "Wrong — one variable."],
    ]),
  ],
});
