import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "common-live-mistakes-new-creators",
  programKey: "beginner",
  title: "Quiz: Avoiding beginner mistakes",
  questions: [
  question("q1", "A common beginner mistake is…", [
    ["Ending early when energy or chat dips", true, "Correct — quitting trains the habit of abandoning the plan."],
    ["Having a written outline", false, "Wrong — outlines prevent mistakes; they are not a mistake."],
    ["Streaming at a consistent time", false, "Wrong — consistency is a strength."],
    ["Greeting new viewers by name when you can", false, "Wrong — recognition is good practice."],
  ]),
  question("q2", "How should you handle a quiet chat?", [
    ["Narrate, teach, or work the plan aloud", true, "Correct — empty-room skill keeps the stream alive."],
    ["Sit in silence until someone tips", false, "Wrong — silence accelerates exits."],
    ["Threaten to end unless people gift", false, "Wrong — pressure tactics damage culture and retention."],
    ["Switch accounts mid-stream", false, "Wrong — that confuses everyone and breaks continuity."],
  ]),
  question("q3", "Before this lesson’s mission LIVE, you should…", [
    ["Name one pitfall you will actively avoid", true, "Correct — deliberate practice targets a specific mistake."],
    ["Avoid preparing so it feels spontaneous", false, "Wrong — preparation is how you avoid mistakes."],
    ["Only go live if a mentor is watching", false, "Wrong — you own the practice loop."],
    ["Focus only on gift goals", false, "Wrong — this lesson is about mistake-proofing behavior."],
  ]),
  question("q4", "Why is ‘waiting for the perfect setup’ a trap?", [
    ["It delays the reps that actually build skill", true, "Correct — gear polish cannot replace stream time."],
    ["TikTok deletes unfinished studios", false, "Wrong — not a real rule."],
    ["Viewers only watch 4K streams", false, "Wrong — clarity and energy beat ultra gear early."],
    ["Missions require cinema cameras", false, "Wrong — phone setups are valid."],
  ]),
  question("q5", "Recovery skill means…", [
    ["Returning to your plan after a dip without ending early", true, "Correct — resilience on stream is a trainable habit."],
    ["Never acknowledging awkward moments", false, "Wrong — honest resets can rebuild energy."],
    ["Blaming chat for low energy", false, "Wrong — ownership beats blame."],
    ["Only streaming when hype is guaranteed", false, "Wrong — guarantees do not exist."],
  ]),
  question("q6", "Which metric best matches this lesson’s mission?", [
    ["A 30+ minute LIVE showing deliberate recovery/avoidance", true, "Correct — behavior under friction is the proof."],
    ["Highest gift of the week", false, "Wrong — gifts are not the pass condition here."],
    ["Number of duet requests", false, "Wrong — unrelated success metric for this lesson."],
    ["Follower count crossing 10k", false, "Wrong — vanity metrics are not the mission."],
  ]),
  ],
});
