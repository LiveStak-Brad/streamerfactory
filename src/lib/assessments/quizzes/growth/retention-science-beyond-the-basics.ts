import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "retention-science-beyond-the-basics",
  programKey: "growth",
  title: "Quiz: Retention Science Beyond the Basics",
  questions: [
    question("q1", "Beyond Core hooks and loops, this lesson focuses on…", [
      ["Mid-LIVE drop-off patterns, re-entry moments, and segment sequencing", true, "Correct — deeper retention science."],
      ["Buying comment bots", false, "Wrong — fake engagement is banned."],
      ["Only the first five seconds forever", false, "Wrong — mid-LIVE leaks matter too."],
      ["Agency retention contracts", false, "Wrong — out of scope."],
    ]),
    question("q2", "The professional way to improve retention here is…", [
      ["One structural change tested across two sessions with comparison notes", true, "Correct — prove the change."],
      ["Change opening, middle, CTA, and niche in one night", false, "Wrong — thrash."],
      ["Beg viewers not to leave every minute", false, "Wrong — needy energy hurts retention."],
      ["Promise gifts for staying", false, "Wrong — not the lesson method."],
    ]),
    question("q3", "A mid-LIVE drop-off map helps you…", [
      ["See where energy or structure collapses so you can redesign one beat", true, "Correct — locate the leak."],
      ["Blame the algorithm for every leave", false, "Wrong — map your show first."],
      ["Prove you need fake viewers", false, "Wrong — never."],
      ["Skip logging because memory is enough", false, "Wrong — notes beat vibes."],
    ]),
    question("q4", "Re-entry moments are useful because…", [
      ["Late joiners need a clear on-ramp back into the show", true, "Correct — re-entry is retention craft."],
      ["You should restart the entire LIVE every five minutes", false, "Wrong — over-resetting kills flow."],
      ["Only battles need re-entry", false, "Wrong — solo LIVEs need it too."],
      ["Re-entry replaces having a plan", false, "Wrong — it sits inside structure."],
    ]),
    question("q5", "If session two shows no improvement after your change, you should…", [
      ["Log the comparison honestly and adapt or kill the change", true, "Correct — evidence decides."],
      ["Declare retention impossible", false, "Wrong — one test is not a career verdict."],
      ["Add three more changes immediately", false, "Wrong — keep one variable."],
      ["Hide the notes from your Capstone dossier", false, "Wrong — honesty is portfolio."],
    ]),
    question("q6", "Retention work in Growth Mastery is not the same as…", [
      ["Building full show craft in Content Creation Mastery", true, "Correct — boundary: retention science vs show-making depth."],
      ["Logging drop-off", false, "Wrong — logging is part of this lesson."],
      ["Comparing two sessions", false, "Wrong — comparison is required."],
      ["Using Core loops as a foundation", false, "Wrong — Core is the floor; this goes deeper."],
    ]),
    question("q7", "Capstone connection?", [
      ["Retention redesign + comparison notes become experiment evidence if retention is your bottleneck", true, "Correct — dossier fuel."],
      ["Retention notes replace diagnosis", false, "Wrong — diagnosis still comes first."],
      ["Only peaks matter for Capstone", false, "Wrong — behavior and notes matter."],
      ["Honors Lab is required to keep retention notes", false, "Wrong — labs never gate."],
    ]),
    question("q8", "Retention LIVE Mission success is…", [
      ["One structural change executed on a 45+ minute LIVE with comparison notes filed", true, "Correct — execution proof."],
      ["A viral spike proving the myth", false, "Wrong — spike is not the grade."],
      ["Zero leaves for the whole session", false, "Wrong — impossible perfection is not the goal."],
      ["Skipping the second session comparison", false, "Wrong — two-session proof is the point."],
    ]),
  ],
});
