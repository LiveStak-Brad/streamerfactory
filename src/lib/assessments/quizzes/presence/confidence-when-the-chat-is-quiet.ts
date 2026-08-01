import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "confidence-when-the-chat-is-quiet",
  programKey: "presence",
  title: "Quiz: Confidence When the Chat Is Quiet",
  questions: [
    question("q1", "When chat goes quiet, the professional move is to…", [
      ["Run a prepared quiet-chat protocol and finish the segment without spiraling", true, "Correct — silence is data, not a final grade."],
      ["Apologize repeatedly for the empty room", false, "Wrong — apologies train people to leave."],
      ["End the LIVE to protect your ego", false, "Wrong — you lose the reps."],
      ["Beg for comments before finishing your thought", false, "Wrong — needy energy kills presence."],
    ]),
    question("q2", "Quiet chat primarily means…", [
      ["Low chat activity — not automatic proof you are a bad host", true, "Correct — separate silence from hosting quality."],
      ["Your career is over", false, "Wrong — catastrophic story."],
      ["You must switch niches immediately", false, "Wrong — protocol first."],
      ["Only battles can save you", false, "Wrong — composure is the skill."],
    ]),
    question("q3", "First step of a strong quiet-chat protocol is usually…", [
      ["A quick body reset — breath, shoulders, home position — then continue with a plan", true, "Correct — body before story spiral."],
      ["Refreshing the viewer count until it rises", false, "Wrong — feeds the spiral."],
      ["Reading hate comments for motivation", false, "Wrong — destructive."],
      ["Going silent yourself to 'match the room'", false, "Wrong — abandons hosting."],
    ]),
    question("q4", "You hit ninety seconds with zero comments mid-teach. Best action?", [
      ["Continue the teach or a self-contained Narrate/Plan/Teach move from your protocol card", true, "Correct — finish the beat."],
      ["Ask 'is anyone even here?' five times", false, "Wrong — panic prompt."],
      ["Sit mute staring at chat", false, "Wrong — statue spiral."],
      ["Force a roast of quiet viewers", false, "Wrong — punches down."],
    ]),
    question("q5", "Mission success looks like…", [
      ["Completing a full segment with zero/minimal chat using the protocol — without ending early", true, "Correct — behavior over validation."],
      ["Getting ten comments before you allow yourself to continue", false, "Wrong — chat is not the gate."],
      ["Skipping the protocol card because you 'know yourself'", false, "Wrong — write it before panic."],
      ["Only practicing when the room is already loud", false, "Wrong — quiet is the training ground."],
    ]),
    question("q6", "Quiet-chat confidence connects to Capstone because…", [
      ["Signature 20 minutes will be fragile if silence still collapses you", true, "Correct — composure is required evidence."],
      ["Capstone bans silence", false, "Wrong — silent Capstones can still pass."],
      ["Honors Lab grades comment count", false, "Wrong — labs optional; comments not the grade."],
      ["You only need protocol for Advanced Creator", false, "Wrong — Presence skill."],
    ]),
    question("q7", "A useful protocol card includes…", [
      ["Trigger, reset actions, go-to lines, and what you refuse to do mid-spiral", true, "Correct — executable under stress."],
      ["Only motivational quotes", false, "Wrong — not actionable."],
      ["Competitor usernames to envy", false, "Wrong — irrelevant."],
      ["A promise to never go live alone again", false, "Wrong — avoidance, not skill."],
    ]),
    question("q8", "Core empty-room talk vs this lesson?", [
      ["Core taught what to say; PR-03 adds composure so silence does not rewrite your identity", true, "Correct — protocol on top of Narrate/Plan/Teach."],
      ["This lesson replaces Narrate/Plan/Teach entirely", false, "Wrong — still available."],
      ["You should ignore Core habits now", false, "Wrong — keep them."],
      ["Quiet chat only matters in battles", false, "Wrong — solo LIVE skill."],
    ]),
  ],
});
