import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "first-10-tiktok-live-sessions",
  programKey: "beginner",
  title: "Quiz: First 30-minute live session",
  questions: [
  question("q1", "Why is a 30-minute minimum useful early?", [
    ["It forces real pacing practice beyond a short test stream", true, "Correct — short dips do not build stamina or structure habits."],
    ["TikTok bans streams under 30 minutes", false, "Wrong — there is no such ban; this is a training standard."],
    ["You only rank if you hit exactly 30:00", false, "Wrong — ranking myths distract from skill practice."],
    ["Sponsors require it on day one", false, "Wrong — brand deals are not the beginner milestone."],
  ]),
  question("q2", "What should you do before the 30-minute LIVE?", [
    ["Announce and block the time so you actually show up", true, "Correct — pre-live ritual + calendar commitment makes completion likely."],
    ["Wait until you feel viral-ready", false, "Wrong — waiting indefinitely skips the practice loop."],
    ["Buy a second phone solely for analytics", false, "Wrong — unnecessary gear is not the blocker."],
    ["Disable comments so nobody distracts you", false, "Wrong — chat interaction is part of LIVE skill."],
  ]),
  question("q3", "Continuous talk during a first long LIVE mainly builds…", [
    ["Presence and comfort when the room is quiet", true, "Correct — narration skill is foundational for retention."],
    ["Guaranteed For You Page placement", false, "Wrong — no talk style guarantees FYP outcomes."],
    ["Automatic battle invitations", false, "Wrong — battles are a separate skill track."],
    ["Higher gift multipliers from TikTok", false, "Wrong — gift economics are not unlocked by talking alone."],
  ]),
  question("q4", "Which pre-live actions support a first 30-minute session?", [
    ["Light promotion: story/post + clear start time", true, "Correct — even small audiences need a cue to show up."],
    ["Spamming every comment section on the app", false, "Wrong — spammy promo can hurt trust and violate norms."],
    ["Promising unrealistic income in the caption", false, "Wrong — hype claims damage credibility."],
    ["Going live with no topic so it feels authentic", false, "Wrong — authenticity still needs a topic and plan."],
  ]),
  question("q5", "What is a healthy mindset for session one of many?", [
    ["Treat it as proof you can complete a full block", true, "Correct — completion and structure matter more than peak viewers."],
    ["Quit if the first five minutes are quiet", false, "Wrong — quiet opens are normal; quitting early blocks growth."],
    ["Only count the session if you trend", false, "Wrong — trends are not the training metric."],
    ["Compare diamonds to top creators immediately", false, "Wrong — comparison at this stage kills consistency."],
  ]),
  question("q6", "Hashtags and announcement mainly help you…", [
    ["Tell people a LIVE is happening and what it is about", true, "Correct — discovery starts with clear signaling."],
    ["Bypass all platform rules", false, "Wrong — hashtags do not exempt you from rules."],
    ["Replace the need for a niche", false, "Wrong — niche clarity still matters."],
    ["Guarantee a battle win", false, "Wrong — unrelated to battle outcomes."],
  ]),
  ],
});
