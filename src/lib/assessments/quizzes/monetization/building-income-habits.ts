import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "building-income-habits",
  programKey: "monetization",
  title: "Quiz: Building income habits",
  questions: [
    question("q1", "You had an exceptional earning night and feel the urge to immediately push a much longer, higher-intensity session tomorrow. What's the better move?", [
      ["Enjoy it, log it honestly, and return to your normal planned pacing", true, "Correct — chasing a repeat performance on demand usually produces a forced, lower-quality session."],
      ["Double tomorrow's session length to try to repeat the result", false, "Wrong — this breaks the repeatable pacing pattern the lesson is teaching."],
      ["Cancel tomorrow's session since you already 'won' this week", false, "Wrong — one great night isn't a reason to skip your planned schedule."],
      ["Raise your permanent income expectations to match last night's total", false, "Wrong — treating a peak night as the new baseline sets up disappointment later."],
    ]),
    question("q2", "How often should you log your LIVE income, according to this lesson?", [
      ["Weekly — a rough total plus one note about your best and worst session", true, "Correct — weekly tracking reveals real trends without turning every session into an anxious number to refresh."],
      ["Every few minutes during each session, to react quickly", false, "Wrong — constant mid-session checking pulls attention away from the room."],
      ["Only when you have an unusually good night worth remembering", false, "Wrong — logging only highlights skews your own sense of your average."],
      ["Never — tracking income turns creators into number-chasers", false, "Wrong — a simple weekly habit is different from obsessive tracking, and it's genuinely useful."],
    ]),
    question("q3", "A quiet week has you wondering if streaming is even worth continuing. What should you check first?", [
      ["Your weekly log against your own recent average, not the week in isolation", true, "Correct — a single quiet week rarely represents an actual downward trend."],
      ["Another top creator's best night, to see how far behind you are", false, "Wrong — comparing to someone else's highlight night distorts your real trajectory."],
      ["Nothing — quit immediately if any single week underperforms", false, "Wrong — this reacts to normal variance as if it were a permanent verdict."],
      ["Whether your gear or setup has gotten worse recently", false, "Wrong — a quiet week is usually about normal variance, not equipment."],
    ]),
    question("q4", "You notice you've checked your live earnings display six times in the last twenty minutes. What should you do?", [
      ["Treat it as a habit to interrupt — move the display out of constant sightline", true, "Correct — frequent mid-session checking pulls focus from the room and should be actively managed."],
      ["Keep checking — more awareness of the number is always better", false, "Wrong — the lesson specifically warns against obsessive mid-session checking."],
      ["Announce the running total to chat every time you check it", false, "Wrong — this turns a personal habit to fix into a public scoreboard for viewers."],
      ["End the session early since you're clearly distracted", false, "Wrong — the fix is adjusting the habit, not abandoning the session."],
    ]),
    question("q5", "What's the healthiest way to think about a quiet night's earnings?", [
      ["The room was quiet for reasons mostly outside your control — it isn't a verdict on your worth", true, "Correct — separating the session's result from yourself is the core emotional skill in this lesson."],
      ["A quiet night proves your content quality has permanently declined", false, "Wrong — this conflates one data point with a lasting trend."],
      ["A quiet night means you should apologize to your regulars", false, "Wrong — a quiet night is neutral information, not something requiring an apology."],
      ["A quiet night should be hidden from your own log so it doesn't affect morale", false, "Wrong — honest logging, including quiet nights, is what makes the weekly average meaningful."],
    ]),
    question("q6", "Which pattern best describes a creator who has built a real income habit?", [
      ["Their session looks and feels the same whether last night was a big one or a quiet one", true, "Correct — repeatable pacing regardless of yesterday's result is the clearest sign of a real habit."],
      ["Their energy swings dramatically based on the previous night's total", false, "Wrong — this is the rollercoaster pattern the lesson is teaching you to avoid."],
      ["They only run a full session on nights they expect to earn well", false, "Wrong — conditional effort undermines the consistency the lesson is built around."],
      ["They increase session length every single time they have a strong night", false, "Wrong — scaling based on one night's result isn't a sustainable pattern."],
    ]),
    question("q7", "During a genuinely rough week, what does this lesson recommend?", [
      ["Hold your planned schedule most tightly, exactly when it's tempting to pull back", true, "Correct — the temptation to loosen up is strongest exactly when consistency matters most."],
      ["Cancel remaining sessions this week to avoid further disappointment", false, "Wrong — pulling back during a rough patch is the exact pattern the lesson warns against."],
      ["Extend every remaining session by an extra hour to compensate", false, "Wrong — overcompensating with forced length usually produces a lower-quality, more desperate-feeling session."],
      ["Switch your entire format or niche immediately", false, "Wrong — one rough week isn't sufficient evidence to abandon your format."],
    ]),
    question("q8", "Why does this lesson recommend capping how much a single great night changes your near-term plans?", [
      ["Because income arrives in variable bursts and needs to be planned around its average, not its peak", true, "Correct — treating a peak as the new guaranteed baseline sets up disappointment and poor planning."],
      ["Because TikTok limits how often you can have a great night", false, "Wrong — this isn't a platform rule; it's a personal pacing habit."],
      ["Because great nights are actually bad for your account's standing", false, "Wrong — a great night is a good outcome; the caution is about how you react to it, not the night itself."],
      ["Because it guarantees your next session will also be great", false, "Wrong — no single night guarantees the next one's result."],
    ]),
  ],
});
