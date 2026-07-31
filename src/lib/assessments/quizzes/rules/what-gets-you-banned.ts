import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "what-gets-you-banned",
  programKey: "rules",
  title: "Quiz: What gets you banned",
  questions: [
  question("q1", "Ban-level risk often involves…", [
    ["Severe or repeated policy violations", true, "Correct — seriousness and repetition escalate enforcement."],
    ["Saying hello to chat", false, "Wrong — normal behavior."],
    ["Having a battle partner", false, "Wrong — battles are allowed when conducted properly."],
    ["Completing StreamerU quizzes", false, "Wrong — nonsense."],
  ]),
  question("q2", "Why ‘I did not know’ is a weak defense?", [
    ["Creators are expected to follow published rules", true, "Correct — ignorance rarely protects the account."],
    ["TikTok emails a personal lawyer first", false, "Wrong — not how enforcement works."],
    ["Chat absolves you if they laugh", false, "Wrong — false."],
    ["Small accounts are immune", false, "Wrong — false."],
  ]),
  question("q3", "Encouraging harmful behavior on LIVE is…", [
    ["A serious compliance risk", true, "Correct — directing harm can trigger enforcement."],
    ["Fine if framed as a joke always", false, "Wrong — jokes do not guarantee safety."],
    ["Required for battles", false, "Wrong — false."],
    ["Only policed in Private accounts", false, "Wrong — LIVE is highly visible."],
  ]),
  question("q4", "Spammy or deceptive practices can lead to…", [
    ["Restrictions because they harm trust and violate policies", true, "Correct — deception is a common enforcement theme."],
    ["Guaranteed FYP", false, "Wrong — myth."],
    ["Bonus StreamerU XP", false, "Wrong — XP is for legitimate academy progress."],
    ["Automatic Manager eligibility", false, "Wrong — false."],
  ]),
  question("q5", "If you see creators ‘getting away’ with violations…", [
    ["Do not copy them; enforcement is not a permission slip", true, "Correct — others’ risk is not your strategy."],
    ["Copy immediately for growth", false, "Wrong — dangerous."],
    ["Assume the rules changed forever", false, "Wrong — lag ≠ repeal."],
    ["Report yourself preventively", false, "Wrong — just comply."],
  ]),
  question("q6", "The training takeaway is…", [
    ["Know high-risk patterns and design streams to avoid them", true, "Correct — prevention is the skill."],
    ["Memorize every ban appeal letter template only", false, "Wrong — prevention > cleanup."],
    ["Ban-bait for clout", false, "Wrong — reckless."],
    ["Outsource all responsibility to mods forever", false, "Wrong — you remain accountable."],
  ]),
  ],
});
