import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "your-first-live-structure",
  programKey: "beginner",
  title: "Quiz: Your first live structure",
  questions: [
  question("q1", "What is a simple run-of-show for a LIVE?", [
    ["Open → middle segments → close", true, "Correct — beginning, middle, and end keep the stream intentional."],
    ["Whatever happens until you get bored", false, "Wrong — structure prevents endless ramble."],
    ["Only battles for the entire session", false, "Wrong — battles are not the beginner structure focus."],
    ["Start with goals and skip introductions", false, "Wrong — the open tells people who you are and what today is."],
  ]),
  question("q2", "Why use a timer or segment labels?", [
    ["Viewers (and you) know where you are in the stream", true, "Correct — orientation reduces freeze-ups and aimless pacing."],
    ["Timers force people to gift faster", false, "Wrong — timers organize time; they are not gift pressure tools."],
    ["TikTok requires on-screen clocks", false, "Wrong — timers are a creator habit, not a platform requirement."],
    ["So you can leave the camera without talking", false, "Wrong — structure supports talk; it does not replace presence."],
  ]),
  question("q3", "How many primary segments should a first structured LIVE outline?", [
    ["About three segments with a hook at each start", true, "Correct — three blocks are enough to practice without overload."],
    ["Twenty micro-segments of 30 seconds each", false, "Wrong — too many cuts make the stream frantic and hard to hold."],
    ["One continuous rant with no breaks", false, "Wrong — breaks and hooks help retention and clarity."],
    ["Zero segments — pure improvisation only", false, "Wrong — improvisation inside a plan is fine; no plan is chaos."],
  ]),
  question("q4", "What makes a segment ‘repeatable’?", [
    ["You can run a similar format weekly at a consistent time", true, "Correct — repeatable segments train return viewers."],
    ["It only works once if it goes viral", false, "Wrong — virality is not the definition of a good segment."],
    ["It requires new equipment every time", false, "Wrong — sustainable segments use tools you already have."],
    ["Nobody knows what will happen, including you", false, "Wrong — surprise can exist inside a known container."],
  ]),
  question("q5", "What should the close of a LIVE include?", [
    ["A recap and a clear ‘next time’ cue", true, "Correct — closings create continuity and return reasons."],
    ["Suddenly ending when diamonds stall", false, "Wrong — abrupt exits teach viewers the show is unreliable."],
    ["Deleting the stream so nobody rewatches", false, "Wrong — endings are part of the product, not something to hide."],
    ["Starting a new niche announcement every night", false, "Wrong — consistency of identity beats constant rebrands."],
  ]),
  question("q6", "What proves this lesson’s mission?", [
    ["A 30+ minute LIVE that follows your outline", true, "Correct — the mission is intentional time-on-stream with structure."],
    ["A screenshot of someone else’s stream plan", false, "Wrong — you must execute your own LIVE."],
    ["Reading the lesson twice without going live", false, "Wrong — study alone does not complete the mission."],
    ["Getting one gift during the first minute", false, "Wrong — gifts are not the beginner structure pass condition."],
  ]),
  ],
});
