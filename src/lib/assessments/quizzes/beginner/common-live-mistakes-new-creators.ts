import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "common-live-mistakes-new-creators",
  programKey: "beginner",
  title: "Quiz: Avoiding beginner mistakes",
  questions: [
    question("q1", "Right before tonight's mission LIVE, what should you do with the seven-trap catalog?", [
      ["Name exactly one trap you'll actively avoid tonight, out loud", true, "Correct — a specific, named commitment survives contact with a real session better than a vague goal."],
      ["Try to fix all seven traps at once for maximum improvement", false, "Wrong — trying to fix everything at once is itself one of the traps."],
      ["Memorize all seven perfectly before going live again", false, "Wrong — memorization isn't the goal; picking one to actively work on is."],
      ["Ignore the list since you already finished a consistency week", false, "Wrong — the traps apply regardless of how consistent you've been."],
    ]),
    question("q2", "Your chat goes completely quiet mid-session. What is step one of the recovery drill?", [
      ["Name it calmly, once, without panic", true, "Correct — naming it removes its power and signals you're comfortable, not rattled."],
      ["Sit in silence until someone eventually types something", false, "Wrong — silence compounds the problem instead of solving it."],
      ["End the session since the room clearly isn't interested", false, "Wrong — ending early is one of the seven traps this lesson warns against."],
      ["Immediately lower your energy to match the quiet room", false, "Wrong — dropping energy alongside a quiet chat compounds the issue."],
    ]),
    question("q3", "After naming a quiet chat, what should your next question to the room look like?", [
      ["Specific and easy to answer, like a simple either/or choice", true, "Correct — specific, low-effort questions get responses; vague ones rarely land."],
      ["Open-ended and philosophical to spark deep conversation", false, "Wrong — vague open questions are harder to respond to when engagement is already low."],
      ["A demand that someone respond within ten seconds", false, "Wrong — pressure tactics damage the room's culture rather than helping it."],
      ["No question at all — just wait quietly for chat to initiate", false, "Wrong — waiting passively is what got the room quiet in the first place."],
    ]),
    question("q4", "A technical glitch happens mid-stream — your mic cuts out for a second. What does this lesson recommend?", [
      ["Narrate the fix calmly, the same way you'd narrate anything else", true, "Correct — a calm reaction reads better than visible panic; the glitch itself is rarely the real problem."],
      ["Apologize repeatedly and explain in detail what went wrong", false, "Wrong — over-explaining draws more attention to the glitch than needed."],
      ["End the session immediately to avoid looking unprofessional", false, "Wrong — ending over a minor, common glitch is an overreaction."],
      ["Ignore it completely and hope viewers didn't notice", false, "Wrong — a brief calm acknowledgment works better than ignoring it entirely."],
    ]),
    question("q5", "If your chat stays quiet even after naming it and asking a specific question, what should you do next?", [
      ["Shift format — change topic or move into teaching mode — while holding your energy steady", true, "Correct — changing your approach while keeping energy steady is more effective than dropping energy."],
      ["Keep repeating the exact same question until someone answers", false, "Wrong — repeating an unanswered question rarely changes the outcome."],
      ["Lower your energy to match the room's mood", false, "Wrong — dropping energy alongside quiet chat compounds the problem."],
      ["End the session since you've already tried to fix it once", false, "Wrong — one attempt isn't the ceiling; shifting format is the next step."],
    ]),
    question("q6", "What is the actual skill this lesson's mission is measuring?", [
      ["Demonstrated recovery from a quiet or low-energy stretch, not a perfectly smooth room", true, "Correct — a chat that never goes quiet is out of your control; recovering from it is the trainable skill."],
      ["Whether your chat stayed active for the entire session", false, "Wrong — chat activity level is not something you can fully control."],
      ["How many gifts you received during the session", false, "Wrong — gifts are unrelated to this lesson's mistake-recovery focus."],
      ["Whether you avoided every one of the seven traps perfectly", false, "Wrong — the mission asks you to name and avoid exactly one, not all seven."],
    ]),
    question("q7", "Which of these is one of the seven beginner traps named in this lesson?", [
      ["Ending the session early at the first sign of difficulty", true, "Correct — ending early trains you to treat discomfort as a stop signal."],
      ["Glancing at chat every 20–30 seconds to acknowledge comments", false, "Wrong — that's the recommended fix, not a trap."],
      ["Keeping two or three loose topic bullets visible during a casual session", false, "Wrong — that's a fix for rambling, not a mistake itself."],
      ["Narrating a technical fix calmly instead of panicking", false, "Wrong — that's the recommended response to a glitch, not a trap."],
    ]),
    question("q8", "Why does this lesson deliberately not go deep on sustained empty-room talk?", [
      ["That full system gets its own dedicated lesson right after this one", true, "Correct — this lesson builds the recovery foundation the next lesson expands into a complete system."],
      ["Empty rooms are rare enough that they don't need coverage", false, "Wrong — empty rooms are common, which is exactly why they get a full lesson."],
      ["It's considered an advanced-only topic beyond this curriculum", false, "Wrong — it's the very next lesson, not an advanced topic reserved for later."],
      ["Because viewer-count fixation makes it an unteachable skill", false, "Wrong — it's a trainable system covered in depth in the next lesson."],
    ]),
  ],
});
