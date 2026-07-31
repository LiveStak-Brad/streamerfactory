import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "professional-standards-on-live",
  programKey: "rules",
  title: "Quiz: Professional Standards on LIVE",
  questions: [
    question("q1", "Professional standards on LIVE primarily protect…", [
      ["Trust through predictable time, chat, recovery, and reputation habits", true, "Correct — standards make brand believable."],
      ["Your right to ignore the audience entirely", false, "Wrong — standards include chat conduct."],
      ["Agency recruiting quotas", false, "Wrong — outside scope."],
      ["A requirement to be corporate and joyless", false, "Wrong — reliable, not joyless."],
    ]),
    question("q2", "Standards should be written for…", [
      ["The tired version of you on a hard day", true, "Correct — mood-based professionalism fails."],
      ["Only your best high-energy nights", false, "Wrong — those are easy mode."],
      ["Someone else's unhinged brand", false, "Wrong — your promise decides."],
      ["Manager College evaluations only", false, "Wrong — creator craft."],
    ]),
    question("q3", "Time standards should…", [
      ["Match your real OS calendar and include delay communication", true, "Correct — honesty at scale."],
      ["Promise nightly streams you cannot keep", false, "Wrong — broken promises train distrust."],
      ["Stay silent when you cancel", false, "Wrong — silence is not a strategy."],
      ["Be ignored once you grow", false, "Wrong — growth never waives trust."],
    ]),
    question("q4", "A professional recovery after a glitch looks like…", [
      ["Acknowledge, state the fix, return to the show", true, "Correct — short and adult."],
      ["Five minutes of shame spiral", false, "Wrong — apology theater becomes the show."],
      ["Blaming chat for the tech fail", false, "Wrong — not recovery."],
      ["Ending forever because one glitch happened", false, "Wrong — extreme and unnecessary."],
    ]),
    question("q5", "Chat standards need…", [
      ["Early, calm enforcement matching tools you actually use", true, "Correct — late enforcement feels personal."],
      ["No rules so the room stays 'raw'", false, "Wrong — raises risk and harms trust."],
      ["Humiliating viewers as entertainment", false, "Wrong — reputation damage."],
      ["A twenty-minute debate every warning", false, "Wrong — enforce, then continue."],
    ]),
    question("q6", "Reputation hygiene includes…", [
      ["Not turning private conflicts into content and watching off-platform public behavior", true, "Correct — clips and identity travel."],
      ["Air all private DMs for transparency", false, "Wrong — often harmful and unprofessional."],
      ["Making reckless accusations for clips", false, "Wrong — reputation risk."],
      ["Ignoring Core safety once certified", false, "Wrong — safety stays."],
    ]),
    question("q7", "Capstone connection?", [
      ["Standards Sheet becomes a Capstone dossier page", true, "Correct — paper standards compared to LIVE habits."],
      ["Standards replace Capstone execution", false, "Wrong — still need the sprint."],
      ["Only Honors Lab requires standards", false, "Wrong — Capstone requires them; labs optional."],
      ["Standards are optional after brand work", false, "Wrong — required Advanced Creator skill."],
    ]),
    question("q8", "Standards on Camera LIVE success is…", [
      ["Demonstrating three written standards on a 45+ minute LIVE", true, "Correct — visible reliability."],
      ["Lecturing about professionalism for the whole hour", false, "Wrong — show standards, don't speechify."],
      ["Skipping LIVE if the sheet looks good", false, "Wrong — proof on camera."],
      ["Breaking standards to seem more entertaining", false, "Wrong — contradicts the lesson."],
    ]),
  ],
});
