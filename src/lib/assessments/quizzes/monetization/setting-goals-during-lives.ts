import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "setting-goals-during-lives",
  programKey: "monetization",
  title: "Quiz: Setting goals during lives",
  questions: [
    question("q1", "You stated your goal once at the two-minute mark and never mentioned it again. What's the most likely result?", [
      ["Most viewers forget the goal exists, especially late joiners", true, "Correct — a single mention fades fast, which is exactly why this lesson builds three checkpoints instead of one."],
      ["Viewers will remember it perfectly for the entire session", false, "Wrong — a room's memory of a single early mention fades quickly, especially as new viewers join."],
      ["It doesn't matter how often you mention it as long as it's true", false, "Wrong — honesty matters, but visibility across the session matters too."],
      ["TikTok automatically displays the goal on screen the whole time", false, "Wrong — visibility is something you build and reinforce, not something the platform guarantees."],
    ]),
    question("q2", "What should your midpoint checkpoint sound like, compared to your opening checkpoint?", [
      ["A different framing — a factual progress update with genuine appreciation", true, "Correct — varying the framing keeps the goal from feeling like a copy-pasted reminder."],
      ["The exact same sentence you used at the open, repeated word for word", false, "Wrong — repeating the identical line makes the goal feel repetitive rather than like a real update."],
      ["A more urgent, pressuring version of the opening line", false, "Wrong — escalating pressure mid-stream drifts toward begging, not an honest update."],
      ["You should skip the midpoint checkpoint if the opening one already landed well", false, "Wrong — the midpoint checkpoint is part of the full three-checkpoint arc, not optional filler."],
    ]),
    question("q3", "Your goal is reached with 40 minutes still left in the session. What's the best next move?", [
      ["Set a new, honestly-framed goal for the rest of the stream", true, "Correct — this keeps the session going with a clear purpose instead of drifting goal-less or ending early."],
      ["End the session immediately since the original goal is done", false, "Wrong — ending early just because a goal was hit cuts the session short for no real reason."],
      ["Keep the same goal number displayed without saying anything", false, "Wrong — leaving a completed goal on screen without addressing it is confusing and unclear."],
      ["Quietly raise the target without telling viewers", false, "Wrong — silent adjustments damage trust; announce any change plainly."],
    ]),
    question("q4", "The goal clearly won't be reached tonight. What should your closing checkpoint sound like?", [
      ["An honest, upbeat acknowledgment that the session was still worth it", true, "Correct — a missed goal is neutral information, not a failure that needs an apology."],
      ["A guilt-tinged comment implying the room let you down", false, "Wrong — this damages trust and turns a neutral outcome into pressure."],
      ["No mention at all — just end the stream and hope nobody notices", false, "Wrong — skipping the closing checkpoint leaves the goal's story unresolved."],
      ["A promise that you'll definitely hit double the goal tomorrow to compensate", false, "Wrong — overcompensating with a new promise isn't part of an honest close."],
    ]),
    question("q5", "A viewer asks, in a slightly challenging tone, whether you'll actually reach your goal tonight. What's the best response?", [
      ["Answer calmly and honestly based on actual pace, without overpromising", true, "Correct — calm honesty matches the lesson's approach to handling pushback."],
      ["Get defensive and argue that the viewer is being rude", false, "Wrong — defensiveness escalates a small moment into unnecessary tension."],
      ["Promise a guaranteed outcome to shut down the question", false, "Wrong — guaranteeing an uncertain outcome isn't honest and can backfire."],
      ["Ignore the question completely and change the subject", false, "Wrong — ignoring a direct, reasonable question can read as evasive."],
    ]),
    question("q6", "How should a visible goal tracker function during your session?", [
      ["Present and glance-able, without dominating your attention or the screen", true, "Correct — the tracker should support the show, not become the show."],
      ["Front and center at all times so viewers are always staring at the number", false, "Wrong — over-focusing on the tracker flips the session's energy from hanging out to chasing a number."],
      ["Hidden completely so nobody ever sees any progress", false, "Wrong — some visibility helps the room feel oriented; the goal is balance, not total secrecy."],
      ["Updated only by shouting the exact number every thirty seconds", false, "Wrong — constant repetition turns an update into noise and pressure."],
    ]),
    question("q7", "You realize you completely forgot your planned midpoint checkpoint. What should you do?", [
      ["Slide it in naturally at the next pause, simply framed as a quick update", true, "Correct — a natural, late insertion is better than forcing an awkward interruption or skipping it entirely."],
      ["Skip it entirely since the moment already passed", false, "Wrong — you can still deliver it at the next natural break rather than losing it completely."],
      ["Stop your current segment abruptly mid-sentence to squeeze it in", false, "Wrong — forcing it awkwardly breaks the flow more than a brief natural pause would."],
      ["Wait until the very end and combine it with your closing checkpoint", false, "Wrong — combining them removes the distinct beats that make checkpoints work."],
    ]),
    question("q8", "You realize your original goal was set way too high and the room's energy is dropping because it feels unreachable. What's the honest move?", [
      ["Say so plainly and adjust it to something more realistic", true, "Correct — transparent adjustment protects both morale and trust."],
      ["Leave it as is and let the session end on a discouraging note", false, "Wrong — an obviously unreachable goal left unaddressed drags down the room for no reason."],
      ["Quietly lower it on-screen without mentioning the change", false, "Wrong — silent adjustments, even reasonable ones, damage trust if left unannounced."],
      ["Blame the room for not gifting enough to keep pace", false, "Wrong — blaming viewers turns an honest pacing issue into guilt-based pressure."],
    ]),
  ],
});
