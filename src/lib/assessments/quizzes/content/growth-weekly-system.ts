import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "growth-weekly-system",
  programKey: "content",
  title: "Quiz: Building repeat viewers",
  questions: [
    question(
      "q1",
      "You had a great solo LIVE last night, but this lesson says that success alone doesn't guarantee growth. Why not?",
      [
        ["Because it doesn't tell you whether anyone who watched has a reason to come back next week", true, "Correct — session-by-session thinking misses the bigger lever: return viewership."],
        ["Because TikTok penalizes creators for having good single sessions", false, "Wrong — there's no such penalty; the issue is about continuity, not punishment."],
        ["Because a good session always means low viewer counts", false, "Wrong — session quality and viewer count aren't the point of this lesson's argument."],
        ["Because gifts only count on a creator's second LIVE", false, "Wrong — this isn't about gift eligibility rules."],
      ],
    ),
    question(
      "q2",
      "What should you say near the start of a session to build continuity, according to this lesson?",
      [
        ["An explicit reference to your last stream, like what you promised and are following up on", true, "Correct — assuming context carries over is a mistake; say 'last time' directly."],
        ["Nothing about the past — always start each session as a clean slate", false, "Wrong — treating every session as standalone is a named mistake in this lesson."],
        ["An apology for how long it's been since you last streamed", false, "Wrong — an apology isn't the callback this lesson teaches; a specific reference is."],
        ["A guess about who might be watching without checking your notes", false, "Wrong — the lesson recommends reviewing your last session's notes so the callback is accurate."],
      ],
    ),
    question(
      "q3",
      "Which closing line best matches this lesson's teaching on 'teasing what's next'?",
      [
        ["\"Next stream, I'm planning to try [specific thing] — probably around the same time Thursday. I want you back for that one.\"", true, "Correct — specific and schedule-anchored, giving viewers something concrete to anticipate."],
        ["\"Thanks everyone, see you next time I guess.\"", false, "Wrong — this is exactly the vague sign-off this lesson says gives viewers no reason to remember you."],
        ["\"I'm not sure when I'll go live again.\"", false, "Wrong — uncertainty about timing is named as a silent killer of return viewership."],
        ["\"Follow me or I won't stream again.\"", false, "Wrong — this is a guilt-based ultimatum, not a genuine tease."],
      ],
    ),
    question(
      "q4",
      "A viewer you don't fully remember joins your chat. What does this lesson recommend?",
      [
        ["Acknowledge them generously without guessing wrong details — e.g. 'good to see this name, whether it's your first time or your tenth'", true, "Correct — generous acknowledgment avoids an awkward misfire from an incorrect specific guess."],
        ["Say nothing since you're not sure if they've been here before", false, "Wrong — ignoring potential returners skips the recognition ritual entirely."],
        ["Guess a specific past moment even if you're not confident it's accurate", false, "Wrong — an incorrect specific guess is more awkward than a generous general welcome."],
        ["Ask them to prove they watched a previous session", false, "Wrong — this creates friction instead of the low-effort recognition this lesson teaches."],
      ],
    ),
    question(
      "q5",
      "Last week you promised a specific topic for 'next time' and didn't get to it. What should you do this session?",
      [
        ["Address it honestly — explain why, and say when you actually will cover it", true, "Correct — honesty builds more trust than silently dropping the topic."],
        ["Never mention it again and hope no one noticed", false, "Wrong — silently dropping a promise damages the trust continuity is meant to build."],
        ["Cancel your continuity habit entirely since you broke one promise", false, "Wrong — one missed promise doesn't mean abandoning the system; it means addressing it directly."],
        ["Blame chat for expecting too much", false, "Wrong — this shifts responsibility instead of owning the miss."],
      ],
    ),
    question(
      "q6",
      "You have almost no returning viewers yet. Should you start using continuity language now?",
      [
        ["Yes — the people watching today are who you're training to become next week's returners", true, "Correct — starting the habit early makes it automatic before a real recurring audience forms."],
        ["No — wait until you have a large following before referencing past sessions", false, "Wrong — the lesson explicitly says to start the habit even with a small or new audience."],
        ["No — continuity language only works for creators who battle", false, "Wrong — this lesson is about solo LIVE growth, unrelated to battles."],
        ["Yes, but only to people who have given you gifts", false, "Wrong — recognition isn't limited to gifters; it's for any returning viewer."],
      ],
    ),
    question(
      "q7",
      "Why does this lesson say continuity habits feel slow to pay off?",
      [
        ["Because the effect compounds over several sessions rather than landing immediately on your first attempt", true, "Correct — early callbacks may land on only one or two people; the effect grows as more viewers accumulate shared history with you."],
        ["Because TikTok delays algorithm credit for repeat viewers by 30 days", false, "Wrong — no such platform mechanic is referenced in this lesson."],
        ["Because continuity language is against community guidelines for new accounts", false, "Wrong — there's no rules conflict here."],
        ["Because it only works once you've completed a battle", false, "Wrong — continuity is a solo-session skill, independent of battles."],
      ],
    ),
    question(
      "q8",
      "What does success look like for this lesson's LIVE Mission?",
      [
        ["A return viewer would clearly recognize the continuity from your last session, not just enjoy this one in isolation", true, "Correct — that's the explicit success bar this lesson sets for the mission."],
        ["Reaching a specific number of total viewers for the session", false, "Wrong — viewer count isn't the pass condition here."],
        ["Getting at least one gift during the session", false, "Wrong — monetization isn't the focus of this mission."],
        ["Avoiding any mention of past or future sessions to keep things fresh", false, "Wrong — that's the opposite of what this lesson teaches."],
      ],
    ),
  ],
});
