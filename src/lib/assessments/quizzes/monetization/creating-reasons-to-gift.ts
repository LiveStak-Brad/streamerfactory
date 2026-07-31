import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "creating-reasons-to-gift",
  programKey: "monetization",
  title: "Quiz: Creating reasons to gift",
  questions: [
  question("q1", "People gift more when there is…", [
    ["A clear emotional or communal reason", true, "Correct — reasons beat generic ‘gift me’ spam."],
    ["Constant begging with no story", false, "Wrong — fatigue sets in fast."],
    ["Silence and hope", false, "Wrong — unclear asks underperform."],
    ["Threats", false, "Wrong — harmful and brittle."],
  ]),
  question("q2", "A ‘reason to gift’ can be…", [
    ["Milestones, challenges, gratitude moments, team goals", true, "Correct — concrete frames invite participation."],
    ["Only insulting non-payers", false, "Wrong — toxic."],
    ["Hiding the goal on purpose", false, "Wrong — opacity hurts."],
    ["Claiming fake emergencies", false, "Wrong — unethical."],
  ]),
  question("q3", "Timing an ask matters because…", [
    ["Energy and context make the same words land differently", true, "Correct — ask when the room is with you."],
    ["Asks only work at 3am", false, "Wrong — not a rule."],
    ["You should ask before saying hello", false, "Wrong — relationship first."],
    ["Timing is irrelevant if you yell", false, "Wrong — volume ≠ timing skill."],
  ]),
  question("q4", "Over-asking without value causes…", [
    ["Viewer fatigue and distrust", true, "Correct — extractive vibes shrink the room."],
    ["Guaranteed diamonds", false, "Wrong — often the opposite."],
    ["Automatic algorithm boosts", false, "Wrong — myth."],
    ["Program certificates", false, "Wrong — unrelated."],
  ]),
  question("q5", "Recognition after a gift should be…", [
    ["Specific and warm, then return to the show", true, "Correct — thank, then keep momentum."],
    ["A 15-minute halt every time", false, "Wrong — stalls the room."],
    ["Ignored to look humble", false, "Wrong — people want to feel seen."],
    ["Used to dunk on other viewers", false, "Wrong — creates hierarchy toxicity."],
  ]),
  question("q6", "Reasons must stay…", [
    ["Honest and aligned with your brand", true, "Correct — authenticity compounds; gimmick lies do not."],
    ["Exaggerated until banned", false, "Wrong — short-term thinking."],
    ["Copied from gambling patterns", false, "Wrong — risky and often non-compliant."],
    ["Secret from your regulars", false, "Wrong — regulars help carry goals."],
  ]),
  ],
});
