import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "first-10-tiktok-live-sessions",
  programKey: "beginner",
  title: "Quiz: First 30-minute live session",
  questions: [
    question("q1", "You are ten minutes into your first real 30-minute LIVE and energy suddenly feels flat. What does this lesson say about that moment?", [
      ["It is a predictable dip around minutes 10–20 — plan your story or a direct question to land right there", true, "Correct — the dip zone is expected, not a sign something is wrong."],
      ["It means the topic was a bad choice and you should end early", false, "Wrong — ending early trains quitting; the dip is normal and recoverable."],
      ["It means you need better gear before your next session", false, "Wrong — gear does not fix pacing; a plan for the dip does."],
      ["It only happens to creators with small audiences", false, "Wrong — the dip is a pacing pattern, not an audience-size problem."],
    ]),
    question("q2", "Where should you slot your prepared personal story for maximum effect?", [
      ["Roughly minutes 10–15, right where energy typically sags", true, "Correct — deploying it in the dip zone prevents the sag instead of reacting to it."],
      ["In the first 30 seconds before anyone can lose interest", false, "Wrong — that front-loads your best material and leaves you flat later."],
      ["Only if chat specifically asks for a story", false, "Wrong — plan it in advance regardless of chat activity."],
      ["During the close, after you've already said goodbye", false, "Wrong — the close should recap and tease, not open a new story."],
    ]),
    question("q3", "What is the right amount of pre-live promotion for this lesson's mission?", [
      ["A short announcement 30–60 minutes ahead with 2–3 specific hashtags", true, "Correct — light, specific promotion beats zero notice or generic hashtag spam."],
      ["No promotion at all, so the session feels authentic", false, "Wrong — even light promotion improves your odds of a warmer start."],
      ["Ten or more generic hashtags to maximize reach", false, "Wrong — broad tags bury you; a few specific ones work better."],
      ["A professional ad campaign before every session", false, "Wrong — unnecessary and unsustainable this early."],
    ]),
    question("q4", "Which four markers does this lesson use to define a completed session?", [
      ["Full duration, structure followed, no long silences, session promoted in advance", true, "Correct — these four behaviors define 'done,' not viewer count."],
      ["Viewer count, gift total, follower growth, and comment count", false, "Wrong — those are outcomes you don't fully control this early."],
      ["Only whether you felt confident the whole time", false, "Wrong — feelings vary; the four behavioral markers are what's measured."],
      ["Whether you trended on the For You feed", false, "Wrong — trending is not a beginner completion marker."],
    ]),
    question("q5", "Nobody has joined your LIVE by minute five. What should you do?", [
      ["Run your open exactly as planned and keep going", true, "Correct — a slow start is normal; the plan and duration still matter."],
      ["End the session and try again later today", false, "Wrong — ending early trains quitting and skips the actual practice."],
      ["Skip your prepared structure since no one is watching yet", false, "Wrong — the structure exists precisely for moments like this."],
      ["Apologize on stream for the low turnout", false, "Wrong — apologizing signals people to leave rather than stay."],
    ]),
    question("q6", "Why does this lesson recommend two or three specific hashtags instead of many generic ones?", [
      ["Specific tags reach people actually interested in the topic; broad tags bury you", true, "Correct — targeted discovery beats being lost in a massive generic tag."],
      ["TikTok limits accounts to three hashtags total", false, "Wrong — not a real platform limit."],
      ["Generic hashtags are against platform rules", false, "Wrong — this is a discovery strategy, not a rules issue."],
      ["More hashtags always guarantee more viewers", false, "Wrong — quantity does not guarantee relevant reach."],
    ]),
    question("q7", "You hit minute 25 and feel tired. What does this lesson say to do?", [
      ["Push through the last five minutes and run a real close", true, "Correct — the close is short and disproportionately valuable to end well."],
      ["End right there since you already covered the main content", false, "Wrong — skipping the close wastes the goodwill you built."],
      ["Hand the session off to chat and stop talking", false, "Wrong — you're still the host until you close on purpose."],
      ["Restart the whole session from the beginning", false, "Wrong — unnecessary and confusing for anyone still watching."],
    ]),
    question("q8", "What is the correct relationship between continuous talk and natural pauses in this lesson?", [
      ["Brief natural pauses for breath are fine; long silent searches for what to say are not", true, "Correct — continuous talk means no long dead stretches, not zero pauses ever."],
      ["Any pause at all counts as a failed session", false, "Wrong — that standard is unrealistic and not what's being measured."],
      ["Talking nonstop with no breathing room is the goal", false, "Wrong — that reads as frantic, not confident."],
      ["Pauses are only a problem if viewer count drops during them", false, "Wrong — the standard is about your preparation, not viewer reaction."],
    ]),
  ],
});
