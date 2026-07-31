import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "creative-planning-for-real-weeks",
  programKey: "rules",
  title: "Quiz: Creative Planning for Real Weeks",
  questions: [
    question("q1", "What problem does this lesson solve?", [
      ["Inventing the entire show at Go Live with no reusable prep", true, "Correct — professionals keep a plan and segment bank."],
      ["Designing agency org charts", false, "Wrong — outside StreamerU's creator lane."],
      ["Replacing brand with random novelty every day", false, "Wrong — themes should serve brand."],
      ["Skipping the Creator OS calendar", false, "Wrong — planning ties to the OS."],
    ]),
    question("q2", "Creative planning for LIVE should feel like…", [
      ["A menu of segments you can cook from under pressure", true, "Correct — plans free you to respond to chat."],
      ["A word-for-word teleprompter novel every night", false, "Wrong — rigid scripts often create stiffness."],
      ["Zero prep so you stay 'authentic'", false, "Wrong — panic is not authenticity."],
      ["A year-long content bible before your next LIVE", false, "Wrong — two weeks is the discipline."],
    ]),
    question("q3", "How large should your initial segment bank be?", [
      ["At least ten named reusable segments", true, "Correct — ten is the practical minimum."],
      ["One segment forever", false, "Wrong — too thin for real weeks."],
      ["Fifty untested novelty ideas", false, "Wrong — novelty without reuse is not a bank."],
      ["None — banks kill spontaneity", false, "Wrong — banks protect spontaneity."],
    ]),
    question("q4", "What belongs in empty-room contingencies?", [
      ["A pre-decided narrate / teach / ask default", true, "Correct — silence should not become apology theater."],
      ["Ending the LIVE immediately every time chat is quiet", false, "Wrong — Core empty-room skills still apply."],
      ["Reading your analytics dashboard to chat", false, "Wrong — not a contingency segment."],
      ["Abandoning your brand promise", false, "Wrong — contingencies serve the brand."],
    ]),
    question("q5", "Themes for the two-week plan should…", [
      ["Align with your brand promise and OS capacity", true, "Correct — themes are not random niche jumps."],
      ["Change to a new niche every session", false, "Wrong — that creates brand leaks."],
      ["Ignore the scorecard completely", false, "Wrong — numbers can suggest theme focus."],
      ["Only exist if you hire a writer", false, "Wrong — creators write their own simple plans."],
    ]),
    question("q6", "A hooks library should be…", [
      ["Small and rotatable — five to eight open lines", true, "Correct — short libraries beat second-zero panic."],
      ["Hundreds of lines you never practice", false, "Wrong — unused volume is not a library."],
      ["Copied catchphrases from bigger creators only", false, "Wrong — write your own words."],
      ["Optional if you have a logo", false, "Wrong — logos do not open LIVEs."],
    ]),
    question("q7", "How does planning connect to Capstone?", [
      ["The two-week plan and segment bank become Capstone dossier pages", true, "Correct — Capstone needs creative fuel evidence."],
      ["Planning replaces the Capstone month", false, "Wrong — Capstone still requires the sprint."],
      ["Only Honors Lab needs a segment bank", false, "Wrong — Capstone requires it; labs are optional."],
      ["Planning is only for Manager College", false, "Wrong — creator craft lane."],
    ]),
    question("q8", "Planned Show LIVE success looks like…", [
      ["A written hook plus at least two banked segments on a 45+ minute LIVE", true, "Correct — prep made visible on camera."],
      ["Reading a full script without looking up", false, "Wrong — menu, not prison."],
      ["Skipping prep because the worksheet looks neat", false, "Wrong — LIVE proof required."],
      ["Inventing ten new formats mid-stream", false, "Wrong — that is the leak this lesson fixes."],
    ]),
  ],
});
