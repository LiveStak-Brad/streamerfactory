import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "scaling-consistency",
  programKey: "monetization",
  title: "Quiz: Scaling consistency",
  questions: [
  question("q1", "Scaling monetization sustainably starts with…", [
    ["Protecting a schedule you can repeat", true, "Correct — income habits need calendar reality."],
    ["Random 12-hour days then burnout", false, "Wrong — boom-bust kills compounding."],
    ["Ignoring health completely", false, "Wrong — burnout ends careers."],
    ["Quitting all non-gift segments", false, "Wrong — entertainment still drives support."],
  ]),
  question("q2", "As volume rises, you should…", [
    ["Keep quality bars: structure, talk, gratitude", true, "Correct — scale process, not just hours."],
    ["Drop all prep to ‘save time’", false, "Wrong — prep debt shows on stream."],
    ["Stop reviewing what works", false, "Wrong — review becomes more important."],
    ["Violate rules for faster cash", false, "Wrong — short-term gains, long-term bans."],
  ]),
  question("q3", "Consistency scales better than…", [
    ["Occasional heroic streams with long disappearances", true, "Correct — audiences learn reliability."],
    ["Showing up as promised", false, "Wrong — that is the good pattern."],
    ["Clear weekly systems", false, "Wrong — good."],
    ["Sustainable session lengths", false, "Wrong — good."],
  ]),
  question("q4", "A scaling checkpoint asks…", [
    ["Can I still deliver energy at this cadence?", true, "Correct — capacity checks prevent collapse."],
    ["How do I never sleep again?", false, "Wrong — unsustainable."],
    ["How do I hide declining quality?", false, "Wrong — fix quality instead."],
    ["How do I skip safety rules?", false, "Wrong — never."],
  ]),
  question("q5", "Systems that help scale include…", [
    ["Templates for opens, goals, and debriefs", true, "Correct — templates reduce decision fatigue."],
    ["No notes ever", false, "Wrong — memory does not scale."],
    ["New niche daily", false, "Wrong — anti-scale for brand."],
    ["Relying only on panic motivation", false, "Wrong — fragile."],
  ]),
  question("q6", "Monetization without consistency usually…", [
    ["Spikes then fades because trust resets", true, "Correct — audiences need rhythm."],
    ["Compounds automatically", false, "Wrong — inconsistency breaks compounding."],
    ["Unlocks graduation instantly", false, "Wrong — unrelated shortcut."],
    ["Replaces the need for quizzes", false, "Wrong — false."],
  ]),
  ],
});
