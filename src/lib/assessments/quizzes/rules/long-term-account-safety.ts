import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "long-term-account-safety",
  programKey: "rules",
  title: "Quiz: Long-term account safety",
  questions: [
  question("q1", "Long-term safety is a…", [
    ["Career asset that protects compounding growth", true, "Correct — clean history enables future opportunities."],
    ["Temporary beginner concern only", false, "Wrong — it matters more as stakes rise."],
    ["Reason to never innovate on content", false, "Wrong — innovate inside safe bounds."],
    ["Substitute for hosting skill", false, "Wrong — both required."],
  ]),
  question("q2", "Account security basics include…", [
    ["Strong auth practices and careful collaborator access", true, "Correct — hacks and takeovers are real risks."],
    ["Sharing passwords in Discord for convenience", false, "Wrong — major risk."],
    ["Letting strangers ‘borrow’ the account for battles", false, "Wrong — dangerous."],
    ["Disabling 2FA because it is annoying", false, "Wrong — weakens security."],
  ]),
  question("q3", "Sustainable creator careers treat bans as…", [
    ["Existential risks to avoid, not badges of honor", true, "Correct — professionalism > shock clout."],
    ["Marketing strategies", false, "Wrong — reckless."],
    ["Irrelevant if diamonds are high this week", false, "Wrong — short-termism."],
    ["Only a Manager’s problem", false, "Wrong — your account, your responsibility."],
  ]),
  question("q4", "Periodic policy refreshers matter because…", [
    ["Platforms update enforcement and guidance over time", true, "Correct — yesterday’s okay can become today’s risk."],
    ["Rules never change", false, "Wrong — they do."],
    ["Quizzes replace official updates forever", false, "Wrong — keep learning from primary sources."],
    ["You graduate out of compliance", false, "Wrong — never."],
  ]),
  question("q5", "Safety + growth together look like…", [
    ["Ambitious content inside clear boundaries", true, "Correct — the StreamerU endgame skill."],
    ["Fearful blank streams only", false, "Wrong — over-correction."],
    ["Growth hacks that ignore people", false, "Wrong — culture matters."],
    ["Ignoring battles, gifts, and community", false, "Wrong — you can do them safely."],
  ]),
  question("q6", "After Rules & Safety, you are preparing to…", [
    ["Sit Program Finals and move toward graduation readiness", true, "Correct — assessments certify the learning before diploma."],
    ["Skip all remaining exams", false, "Wrong — finals/graduation remain."],
    ["Become a Manager automatically tonight", false, "Wrong — Manager College is a later pathway."],
    ["Delete your safety notes", false, "Wrong — keep them."],
  ]),
  ],
});
