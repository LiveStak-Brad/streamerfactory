import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "structuring-longer-lives",
  programKey: "content",
  title: "Quiz: Structuring longer lives",
  questions: [
  question("q1", "Longer LIVEs need…", [
    ["Planned energy arcs and segment changes", true, "Correct — stamina without structure collapses into mush."],
    ["Louder yelling every minute", false, "Wrong — volume is not structure."],
    ["No breaks in topic ever", false, "Wrong — paced variety sustains long sessions."],
    ["Ending as soon as gifts slow", false, "Wrong — long-form skill includes pushing through dips."],
  ]),
  question("q2", "An energy arc helps you…", [
    ["Place highs, resets, and calmer beats intentionally", true, "Correct — arcs prevent flat or chaotic pacing."],
    ["Avoid talking for the first hour", false, "Wrong — opposite of useful."],
    ["Only stream when caffeine peaks", false, "Wrong — unreliable planning."],
    ["Skip closings on long streams", false, "Wrong — long streams still need clean ends."],
  ]),
  question("q3", "Mid-stream joiners on long LIVEs need…", [
    ["Periodic re-intros and topic restates", true, "Correct — rooms refresh; context must too."],
    ["To figure it out from silence", false, "Wrong — silence loses joiners."],
    ["A 20-minute backstory dump every time", false, "Wrong — keep re-intros tight."],
    ["To gift before learning the topic", false, "Wrong — understanding first."],
  ]),
  question("q4", "A practical long-LIVE safeguard is…", [
    ["Water, posture, and segment checkpoints", true, "Correct — body + plan sustain duration."],
    ["Ignoring thirst to look dedicated", false, "Wrong — burnout kills consistency."],
    ["Turning off the camera for half the stream", false, "Wrong — presence matters."],
    ["Reading chat only, never speaking", false, "Wrong — you still lead verbally."],
  ]),
  question("q5", "Structure for longer lives differs from short lives mainly in…", [
    ["More planned transitions and stamina management", true, "Correct — scale the plan, do not abandon it."],
    ["Abandoning niches after 20 minutes", false, "Wrong — identity should hold."],
    ["Removing all hooks", false, "Wrong — hooks still reset attention."],
    ["Only playing music beds", false, "Wrong — music is not a substitute for hosting."],
  ]),
  question("q6", "Success on a longer LIVE looks like…", [
    ["Holding the plan across an extended block without collapse", true, "Correct — durable hosting is the skill."],
    ["One viral clip and an early leave", false, "Wrong — clip ≠ completed long session."],
    ["Arguing with moderators the whole time", false, "Wrong — conflict is not the goal."],
    ["Silent AFK farming", false, "Wrong — violates presence standards and often rules."],
  ]),
  ],
});
