import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "first-week-of-lives-consistency",
  programKey: "beginner",
  title: "Quiz: First week of lives (consistency)",
  questions: [
    question("q1", "You're planning your first consistency week. What schedule approach does this lesson recommend?", [
      ["Pick one time window and hold it for all seven days", true, "Correct — one defendable window beats scattering different slots you can each talk yourself out of."],
      ["Stream at a different random time each day to test variety", false, "Wrong — randomness confuses viewers and is harder to defend against excuses."],
      ["Only stream when you feel most motivated that day", false, "Wrong — motivation-only scheduling is exactly what this lesson warns against."],
      ["Wait until peak hours align perfectly with your free time", false, "Wrong — perfect alignment can wait; a defendable window matters now."],
    ]),
    question("q2", "Day four arrives and you're exhausted with no topic prepared. What should you do?", [
      ["Run a stripped-down, low-prep session like open Q&A instead of skipping", true, "Correct — a low-effort session that happens still counts; a skipped one does not."],
      ["Skip the day and make it up with a longer session later", false, "Wrong — this lesson explicitly says a skipped session doesn't count, no matter the reason."],
      ["Cancel the whole week and restart next week with a better plan", false, "Wrong — one hard day doesn't invalidate the week; keep going."],
      ["Go live with no plan and hope something comes to you", false, "Wrong — even a low-prep session needs a simple fallback format, not zero plan."],
    ]),
    question("q3", "What is the recommended promotion cadence across seven consecutive days?", [
      ["A light, quick announcement most days, with one slightly bigger mid-week post", true, "Correct — heavy promotion every single day risks burning you out before the week ends."],
      ["A fully polished, unique promotional video before every single session", false, "Wrong — that's unsustainable across seven days and not what's recommended."],
      ["No promotion at all once you've done it once", false, "Wrong — some light promotion each day still helps viewers find you."],
      ["Only promote on the days you feel confident about your content", false, "Wrong — promotion should be consistent, not mood-dependent."],
    ]),
    question("q4", "What is the one-line debrief habit for, according to this lesson?", [
      ["Turning seven separate sessions into a connected learning sequence", true, "Correct — a quick note after each session prevents repeating the same small mistake all week."],
      ["Providing content for your next promotional post", false, "Wrong — that's not its stated purpose in this lesson."],
      ["Proving to StreamerU that you actually went live", false, "Wrong — it's a personal learning tool, not a verification mechanism."],
      ["Replacing the need to plan your next session's topic", false, "Wrong — it's a reflection habit, not a planning replacement."],
    ]),
    question("q5", "One session this week runs noticeably worse than the others. What should you do?", [
      ["Write an honest debrief and continue the schedule the next day", true, "Correct — the week is measured by seven completed sessions, not seven great ones."],
      ["Skip the next day to recover your confidence", false, "Wrong — skipping breaks the exact habit this week is building."],
      ["Delete the session data and pretend it didn't happen", false, "Wrong — honest reflection is the point of the debrief habit."],
      ["Restart the whole week from day one", false, "Wrong — one weak session doesn't reset progress."],
    ]),
    question("q6", "Why does this lesson say mentioning your own schedule during a LIVE matters?", [
      ["It tells anyone already watching exactly when to return — often more effective than outside promotion", true, "Correct — in-session mentions directly reach people who are already engaged."],
      ["It's required by TikTok's terms of service", false, "Wrong — not a platform requirement, a retention habit."],
      ["It replaces the need for any pre-live announcement", false, "Wrong — it complements light pre-live promotion, not replaces it."],
      ["It only matters once you have a large following", false, "Wrong — it helps at any audience size, especially small ones building habits."],
    ]),
    question("q7", "By day three, you realize your chosen time window doesn't actually fit your schedule. What should you do?", [
      ["Shift to a more realistic window and hold it consistently for the rest of the week", true, "Correct — one deliberate adjustment is fine; treat the new time with the same commitment."],
      ["Keep the bad window anyway since you already committed", false, "Wrong — a genuinely unworkable window just guarantees more missed days."],
      ["Use the realization as permission to go live whenever convenient", false, "Wrong — that loosens the whole plan instead of making one clean adjustment."],
      ["Abandon the consistency mission entirely", false, "Wrong — adjusting the window is fine; quitting the mission is not the lesson."],
    ]),
    question("q8", "What ultimately defines success for this lesson's mission?", [
      ["Seven qualifying 30+ minute sessions completed across seven separate days", true, "Correct — the mission measures the habit of showing up, not any single session's quality."],
      ["Your single best session of the week", false, "Wrong — one great night doesn't prove a habit; seven completed days does."],
      ["Total viewer count across the week", false, "Wrong — viewer count is an outcome, not the behavior being measured."],
      ["How polished your promotional posts were", false, "Wrong — promotion should be light and sustainable, not a grading criterion."],
    ]),
  ],
});
