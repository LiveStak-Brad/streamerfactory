import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "growth-capstone-30-day-growth-experiment",
  programKey: "growth",
  title: "Quiz: Growth Capstone — 30-Day Growth Experiment",
  questions: [
    question("q1", "The Growth Capstone requires…", [
      ["A documented 30-day growth experiment with diagnosis, one clean test, notes, and results narrative", true, "Correct — portfolio-ready dossier."],
      ["A guaranteed viral month", false, "Wrong — never promise virality."],
      ["Agency approval", false, "Wrong — out of scope."],
      ["Skipping missions if the quiz is passed", false, "Wrong — Capstone needs LIVE kickoff + thirty days."],
    ]),
    question("q2", "Objectively reviewable evidence means…", [
      ["Written diagnosis, experiment log, schedule/discovery notes, and a results narrative others can assess", true, "Correct — not vibes."],
      ["A feeling that you grew", false, "Wrong — feelings are not evidence."],
      ["Secret screenshots only you understand", false, "Wrong — must be reviewable."],
      ["Bought follower screenshots", false, "Wrong — banned and invalid."],
    ]),
    question("q3", "The Capstone experiment should change…", [
      ["One primary growth lever with kill criteria — not everything at once", true, "Correct — clean test."],
      ["Niche, schedule, CTA, and brand in week one", false, "Wrong — thrash."],
      ["Safety rules for reach", false, "Wrong — never."],
      ["Nothing — just hope for thirty days", false, "Wrong — documented experiment required."],
    ]),
    question("q4", "Growth Mastery Honors Lab…", [
      ["Is optional after the certificate and never gates certification", true, "Correct — Labs → Honors only."],
      ["Is required for the Growth Mastery Certificate", false, "Wrong — never a gate."],
      ["Replaces the Capstone", false, "Wrong — Capstone is required; Lab is optional after."],
      ["Is only for agency managers", false, "Wrong — for creators after certificate."],
    ]),
    question("q5", "A Capstone results narrative should include…", [
      ["What you tested, what happened, what you decided, and what you will keep", true, "Correct — decisions and outcomes."],
      ["Only peak viewers", false, "Wrong — incomplete."],
      ["Blame with no decisions", false, "Wrong — not professional."],
      ["A promise you will be famous next month", false, "Wrong — never."],
    ]),
    question("q6", "Before the thirty days start you need…", [
      ["Diagnosis, planner, dossier checklist, and a Capstone Kickoff LIVE", true, "Correct — assemble then start the clock."],
      ["A viral clip first", false, "Wrong — not required."],
      ["Honors Lab approval", false, "Wrong — labs are after certificate."],
      ["To finish Professional Creator Mastery first", false, "Wrong — Growth Capstone stands alone."],
    ]),
    question("q7", "After Growth Mastery Certificate, most creators should…", [
      ["Continue compounding systems; optional Growth Lab for Honors; Career Creator path may include Professional Creator Mastery later", true, "Correct — living academy path."],
      ["Stop learning forever", false, "Wrong — academy continues."],
      ["Start an agency school track", false, "Wrong — not taught here."],
      ["Delete their experiment logs", false, "Wrong — portfolio evidence stays."],
    ]),
    question("q8", "Capstone Kickoff LIVE success is…", [
      ["Dossier/planner assembled, experiment goal stated, thirty-day clock started on a real LIVE", true, "Correct — kickoff behavior proof."],
      ["Finishing all thirty days in one session", false, "Wrong — impossible and not the kickoff."],
      ["A gift record", false, "Wrong — not the grade."],
      ["Skipping LIVE because the planner looks good", false, "Wrong — LIVE required."],
    ]),
  ],
});
