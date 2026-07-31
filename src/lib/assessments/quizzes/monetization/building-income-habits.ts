import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "building-income-habits",
  programKey: "monetization",
  title: "Quiz: Building income habits",
  questions: [
  question("q1", "Income habits are…", [
    ["Repeatable behaviors that make support more likely over time", true, "Correct — habits > one-off hustles."],
    ["A promise of overnight wealth", false, "Wrong — unhealthy expectation."],
    ["Only for graduates of Manager College", false, "Wrong — creators build habits throughout StreamerU."],
    ["Illegal tracking of diamonds", false, "Wrong — reviewing your own metrics is fine."],
  ]),
  question("q2", "A healthy income habit stack includes…", [
    ["Show up, deliver value, ask clearly, thank, review", true, "Correct — the loop is teachable and repeatable."],
    ["Ask constantly with no value", false, "Wrong — extractive."],
    ["Never ask, never thank", false, "Wrong — both extremes fail."],
    ["Fake scarcity every night", false, "Wrong — trust erosion."],
  ]),
  question("q3", "Tracking matters when it…", [
    ["Informs next week’s experiments calmly", true, "Correct — data serves iteration, not panic."],
    ["Becomes your only self-worth", false, "Wrong — dangerous mindset."],
    ["Is falsified for social media", false, "Wrong — dishonest."],
    ["Replaces going live", false, "Wrong — tracking ≠ streaming."],
  ]),
  question("q4", "Boundaries protect income because…", [
    ["Burnout and rule-breaking destroy long-term earning", true, "Correct — sustainability is strategy."],
    ["Boundaries stop all growth", false, "Wrong — they enable durable growth."],
    ["TikTok bans creators with calendars", false, "Wrong — false."],
    ["Sleep is optional for top earners only", false, "Wrong — unhealthy myth."],
  ]),
  question("q5", "Community relationships affect income by…", [
    ["Turning regulars into advocates who show up for goals", true, "Correct — belonging fuels support."],
    ["Making gifts irrelevant forever", false, "Wrong — relationships often increase support."],
    ["Allowing you to ignore thank-yous", false, "Wrong — gratitude still matters."],
    ["Replacing compliance with vibes", false, "Wrong — rules still bind."],
  ]),
  question("q6", "This program’s monetization arc should leave you with…", [
    ["Practical habits, not magic tricks", true, "Correct — StreamerU teaches durable skill."],
    ["Guaranteed salary from TikTok", false, "Wrong — not how the platform works."],
    ["Permission to skip safety", false, "Wrong — never."],
    ["No need for further practice", false, "Wrong — habits require ongoing reps."],
  ]),
  ],
});
