import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "first-week-of-lives-consistency",
  programKey: "beginner",
  title: "Quiz: First week of lives (consistency)",
  questions: [
  question("q1", "What beats intensity in the first week?", [
    ["Consistency on a defendable schedule", true, "Correct — showing up repeatedly trains you and your audience."],
    ["One 8-hour marathon then disappearing", false, "Wrong — spikes without rhythm do not build habit."],
    ["Streaming only when you feel inspired", false, "Wrong — inspiration-only schedules are unreliable."],
    ["Skipping days whenever chat is small", false, "Wrong — small chat is expected; skipping resets momentum."],
  ]),
  question("q2", "How should you pick LIVE windows?", [
    ["Times you can actually protect for a full week", true, "Correct — realistic windows beat ambitious fantasy schedules."],
    ["Only peak primetime even if you work then", false, "Wrong — impossible times guarantee missed sessions."],
    ["Random times so the algorithm ‘notices variety’", false, "Wrong — randomness confuses return viewers."],
    ["Whenever a viral sound is trending", false, "Wrong — trends are not a weekly schedule."],
  ]),
  question("q3", "What is the debrief habit after each session?", [
    ["One line: what worked, one friction, one tweak", true, "Correct — tiny notes compound faster than vague ‘fix everything’ plans."],
    ["Rewrite your entire niche every night", false, "Wrong — constant identity resets prevent learning."],
    ["Ignore results until the month ends", false, "Wrong — short feedback loops accelerate improvement."],
    ["Only track diamonds and nothing else", false, "Wrong — early weeks need process metrics too."],
  ]),
  question("q4", "What does ‘seven intentional sessions’ mean?", [
    ["At least one qualifying LIVE per day for 7 days", true, "Correct — the mission is a week of scheduled practice."],
    ["Seven different niches in seven days", false, "Wrong — that is chaos, not consistency."],
    ["Seven battles with strangers", false, "Wrong — battles are not this lesson’s requirement."],
    ["Seven minutes total for the week", false, "Wrong — the standard is real sessions, not token minutes."],
  ]),
  question("q5", "Light daily promotion exists to…", [
    ["Teach a small audience when to show up", true, "Correct — schedule training matters more than viral reach early."],
    ["Guarantee 10k viewers", false, "Wrong — promo is a cue, not a viewer guarantee."],
    ["Replace streaming if you are tired", false, "Wrong — promo without the LIVE breaks trust."],
    ["Unlock Manager College early", false, "Wrong — college pathways come after graduation."],
  ]),
  question("q6", "By week’s end you should feel…", [
    ["A rhythm: setup → go live → short debrief", true, "Correct — rhythm is what scales later."],
    ["Ready to quit unless you are famous", false, "Wrong — fame is not the week-one outcome."],
    ["Done with LIVE forever", false, "Wrong — this week is the start of habit, not the end."],
    ["Forced to buy ads to continue", false, "Wrong — ads are optional; habit is the lesson."],
  ]),
  ],
});
