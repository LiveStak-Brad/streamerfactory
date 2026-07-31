import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "improving-battle-performance",
  programKey: "battles",
  title: "Quiz: Improving battle performance",
  questions: [
    question("q1", "After your last battle, you're writing your debrief and have a list of eight things you'd like to change. What should you do?", [
      ["Pick the single most important one and let the rest wait", true, "Correct — one specific, testable change per battle compounds fast; a long list means you'll fix none of it properly."],
      ["Try to fix all eight in your next battle", false, "Wrong — this lesson explicitly warns that trying to fix five or more things after one battle rarely gets tested properly."],
      ["Skip the debrief since there's too much to address", false, "Wrong — skipping the debrief is the single most common reason creators battle repeatedly without improving."],
      ["Wait until you've battled ten more times before addressing anything", false, "Wrong — waiting that long loses the specific, fresh detail a debrief needs."],
    ]),
    question("q2", "You're mid-battle and notice gifts starting to arrive faster, but the scoreboard hasn't crossed over yet. What's the advanced move this lesson teaches?", [
      ["Build anticipation out loud based on the gift pace, a few seconds before the swing fully lands", true, "Correct — reading the room a beat ahead of the number, based on visible momentum, makes you feel like you're leading rather than just narrating."],
      ["Wait until the scoreboard actually changes before saying anything", false, "Wrong — this is the basic version from Lesson 17; the advanced skill is anticipating the swing, not just reacting to it."],
      ["Ignore gift pace entirely and only watch the total", false, "Wrong — chat tone and gift pace often shift before the numbers do, and this lesson teaches you to watch both."],
      ["Ask viewers directly whether they plan to gift more", false, "Wrong — this reads as a direct ask rather than reading the room's existing energy."],
    ]),
    question("q3", "During a slow gifting stretch, you're tempted to say: \"Come on guys, we're barely getting any gifts tonight.\" What does this lesson call this?", [
      ["Toxic pressure — it shames viewers and would collapse into nothing without the ask attached", true, "Correct — running the momentum test on this line shows it only exists because of the ask, which makes it pressure, not energy."],
      ["Healthy momentum, since it's honest about what's happening", false, "Wrong — this line only exists to manufacture guilt around a low-gift stretch, which is the definition of pressure this lesson warns against."],
      ["Neutral — it doesn't matter as long as gifts increase afterward", false, "Wrong — the outcome doesn't change what the language is doing to trust in the room."],
      ["A fine way to create urgency during a lull", false, "Wrong — manufactured urgency is explicitly listed as something to avoid."],
    ]),
    question("q4", "Which of these passes the \"momentum test\" from this lesson — it still makes sense with the gift mention removed?", [
      ["\"We're closing the gap fast, I think we've got this!\"", true, "Correct — this is really a comment about the room's energy and progress; it holds up even without an explicit ask attached."],
      ["\"If we don't hit this goal I'll be really upset.\"", false, "Wrong — remove the goal and this line collapses into nothing; that's the definition of pressure, not momentum."],
      ["\"Nobody has gifted in five minutes, I really need this.\"", false, "Wrong — this only exists because of the ask, which makes it begging."],
      ["\"Come on, help us out here.\"", false, "Wrong — a generic plea like this has nothing behind it once you remove the ask."],
    ]),
    question("q5", "You review your battle log after five matches and notice your energy consistently dips in round two. What should you do with that observation?", [
      ["Name it as your specific test for the next battle — a planned energy check-in at the start of round two", true, "Correct — this is exactly what the iteration loop is for: real patterns across several logged battles, turned into one concrete test."],
      ["Ignore it since it only happened once or twice", false, "Wrong — five logged battles showing the same pattern is meaningful data, not an outlier."],
      ["Assume you're simply not cut out for battling and stop", false, "Wrong — this lesson treats every match as data, not a verdict on your ability."],
      ["Change your entire hosting style immediately based on this single pattern", false, "Wrong — the fix should be one specific, testable change, not a full overhaul."],
    ]),
    question("q6", "What does this lesson mean by \"not toxic grind\"?", [
      ["Improvement comes from a training rhythm — battle, debrief, one test, recovery time, repeat", true, "Correct — stacking matches with no recovery and chasing bigger numbers as the only measure of progress is exactly the grind culture this lesson warns against."],
      ["You should battle as often as physically possible to improve fastest", false, "Wrong — this is the grind pattern the lesson explicitly says to avoid."],
      ["Recovery time is optional if you're determined enough", false, "Wrong — voice and emotional fatigue compound if you skip recovery, which shows up as flat energy."],
      ["A bad night means you should battle again immediately to prove something", false, "Wrong — this exact mindset is named as a grind-culture trap."],
    ]),
    question("q7", "The mission for this lesson asks you to open your LIVE with a debrief of your last battle. What should that look like?", [
      ["Tight and specific — state what happened in one sentence, name the one thing you're testing tonight, and move on", true, "Correct — regulars want continuity and new viewers want a hook, not a long blow-by-blow replay."],
      ["A full ten-minute replay of the entire previous battle", false, "Wrong — this lesson specifically warns against a long replay; keep it under five minutes."],
      ["Skip mentioning the last battle at all to avoid seeming repetitive", false, "Wrong — the mission specifically asks you to reference your last match on camera."],
      ["Only mention it if you won", false, "Wrong — the debrief habit applies regardless of the previous outcome."],
    ]),
    question("q8", "Why does this lesson say to protect what worked, not just fix what didn't?", [
      ["Because naming what worked tells you which habits to repeat, rather than accidentally changing them", true, "Correct — new creators tend to skip straight to what went wrong, but protecting good habits matters just as much as fixing bad ones."],
      ["Because what worked once will always work in every future battle", false, "Wrong — this lesson treats every battle as one rep in a pattern, not a guarantee."],
      ["Because the debrief framework doesn't include a 'what worked' question", false, "Wrong — 'what worked' is the first of the three debrief questions."],
      ["Because it's more important than testing new fixes", false, "Wrong — both matter; protecting and testing work together in the same loop."],
    ]),
  ],
});
