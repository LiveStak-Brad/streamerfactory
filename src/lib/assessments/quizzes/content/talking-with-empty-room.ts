import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "talking-with-empty-room",
  programKey: "content",
  title: "Quiz: Talking when no one is watching",
  questions: [
  question("q1", "Empty-room skill primarily trains…", [
    ["Narration and retention when viewership is low", true, "Correct — you must entertain the room that exists, even if tiny."],
    ["How to hide when nobody is there", false, "Wrong — hiding ends the practice."],
    ["Only talking after gifts appear", false, "Wrong — that makes energy conditional and fragile."],
    ["Leaving after 60 seconds of silence", false, "Wrong — the mission is sustaining talk through silence."],
  ]),
  question("q2", "Dead air is costly because…", [
    ["It signals nothing is happening, so people leave", true, "Correct — silence is a retention leak."],
    ["TikTok fines you per silent second", false, "Wrong — there is no silence fine."],
    ["It increases your diamond multiplier", false, "Wrong — dead air does not help monetization."],
    ["It unlocks battles automatically", false, "Wrong — unrelated."],
  ]),
  question("q3", "A good empty-room tactic is…", [
    ["Narrate your plan, teach, or talk through segments", true, "Correct — structured talk fills space with value."],
    ["Play copyrighted music and stay mute", false, "Wrong — mute + music risks violations and zero presence."],
    ["Ask chat to carry the entire show", false, "Wrong — you lead; chat supports."],
    ["End and restart until people arrive", false, "Wrong — restart loops break trust."],
  ]),
  question("q4", "This lesson’s mission duration target is…", [
    ["45+ minutes with minimal cumulative dead air", true, "Correct — longer holds prove narration stamina."],
    ["5 minutes of silent posing", false, "Wrong — opposite of the skill."],
    ["Only the time until first gift", false, "Wrong — gifts are not the timer."],
    ["Exactly one minute per viewer", false, "Wrong — viewer count does not set the clock."],
  ]),
  question("q5", "Why practice before the room is full?", [
    ["Crowds arrive later; skills must already exist", true, "Correct — empty-room reps prepare you for growth."],
    ["Full rooms never happen on TikTok", false, "Wrong — rooms can grow; that is not the point."],
    ["Algorithms punish practice streams", false, "Wrong — practice is how you improve delivery."],
    ["Managers forbid empty rooms", false, "Wrong — not a rule."],
  ]),
  question("q6", "Peak CCV should be treated as…", [
    ["Not the scoreboard for this retention lesson", true, "Correct — the goal is sustained presence, not a spike screenshot."],
    ["The only number that matters ever", false, "Wrong — process metrics matter in training."],
    ["Proof you should quit if it is low", false, "Wrong — low CCV is the practice environment."],
    ["A reason to skip the quiz", false, "Wrong — assessments check understanding regardless of CCV."],
  ]),
  ],
});
