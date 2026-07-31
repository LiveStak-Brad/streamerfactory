import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "growth-weekly-system",
  programKey: "content",
  title: "Quiz: Building repeat viewers",
  questions: [
  question("q1", "Repeat viewers grow from…", [
    ["Reliable schedule + recognizable show loops", true, "Correct — people return when they know what and when."],
    ["Random surprise streams only", false, "Wrong — randomness fights habit formation."],
    ["Buying comments", false, "Wrong — fake engagement is risky and hollow."],
    ["Never stating when you will be back", false, "Wrong — ‘next time’ cues matter."],
  ]),
  question("q2", "A weekly system should include…", [
    ["Planned sessions, promo cues, and light review", true, "Correct — systems beat vibes-only growth."],
    ["A new niche every day", false, "Wrong — identity churn kills repeats."],
    ["Ignoring chat names to seem mysterious", false, "Wrong — recognition builds belonging."],
    ["Only caring about strangers, never regulars", false, "Wrong — regulars are the asset."],
  ]),
  question("q3", "Why call out returning viewers?", [
    ["Social proof and belonging increase stickiness", true, "Correct — people stay where they feel known."],
    ["It violates TikTok rules", false, "Wrong — greeting people is fine."],
    ["It reduces retention", false, "Wrong — opposite effect for healthy communities."],
    ["It replaces needing content", false, "Wrong — recognition complements content; it does not replace it."],
  ]),
  question("q4", "Growth without a weekly system often fails because…", [
    ["Effort is inconsistent and unmeasurable", true, "Correct — systems create compounding reps."],
    ["TikTok forbids weekly plans", false, "Wrong — not true."],
    ["Viewers hate knowing the schedule", false, "Wrong — schedules help them attend."],
    ["Quizzes ban growth talk", false, "Wrong — nonsense."],
  ]),
  question("q5", "A simple weekly review asks…", [
    ["What loop worked, what to repeat, what to cut", true, "Correct — iteration keeps the system honest."],
    ["How to copy a rival’s entire brand overnight", false, "Wrong — learn patterns; do not erase yourself."],
    ["Whether to quit unless diamond leaderboard #1", false, "Wrong — unhealthy binary."],
    ["Only whether a manager noticed you", false, "Wrong — self-owned systems come first."],
  ]),
  question("q6", "Repeat-viewer strategy pairs best with…", [
    ["Consistent LIVE times and clear show promises", true, "Correct — promise + delivery builds trust."],
    ["Ghosting for weeks after a good night", false, "Wrong — breaks the habit loop."],
    ["Constantly moving your niche label", false, "Wrong — confusion."],
    ["Hiding your schedule intentionally", false, "Wrong — opacity fights attendance."],
  ]),
  ],
});
