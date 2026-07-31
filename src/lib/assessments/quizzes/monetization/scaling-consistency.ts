import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "scaling-consistency",
  programKey: "monetization",
  title: "Quiz: Scaling consistency",
  questions: [
    question("q1", "What does 'scaling consistency' actually mean in this lesson?", [
      ["Raising your total LIVE volume in a way you can repeat next week, not just today", true, "Correct — a single big session proves nothing; a repeatable baseline is the actual goal."],
      ["Streaming the maximum number of hours humanly possible this week", false, "Wrong — a one-time marathon is the opposite of sustainable scaling."],
      ["Hitting the exact same viewer count every single session", false, "Wrong — this lesson is about volume and sustainability, not viewer count."],
      ["Replacing your goal checkpoints and value moments with more streaming hours", false, "Wrong — the existing toolkit should stay intact even as volume rises."],
    ]),
    question("q2", "You're building your weekly streaming calendar. What should it be based on?", [
      ["Your actual, current life and realistic capacity", true, "Correct — a realistic four-day calendar you can follow beats an ambitious one you abandon by Wednesday."],
      ["The most aggressive schedule you can imagine to force growth", false, "Wrong — aspirational calendars based on best-case assumptions tend to collapse quickly."],
      ["Whatever schedule the highest-earning creator you know follows", false, "Wrong — someone else's schedule may not reflect your actual capacity or life."],
      ["A schedule with no rest days, to maximize total hours", false, "Wrong — recovery is a planned part of scaling, not something to cut."],
    ]),
    question("q3", "When does session stacking (two shorter sessions instead of one long one) make the most sense?", [
      ["When your energy dips and recovers across the day, or a single long block isn't realistic", true, "Correct — stacking is a tool for specific situations, not an automatic upgrade over one session."],
      ["Every single day, regardless of your schedule or energy", false, "Wrong — stacking isn't automatically better; it depends on your schedule and audience."],
      ["Only when you've already run out of things to say in one session", false, "Wrong — running out of content is a planning problem, not a reason to stack sessions."],
      ["Never — one long session is always superior to two shorter ones", false, "Wrong — the lesson presents stacking as a legitimate tool, not a mistake."],
    ]),
    question("q4", "You're 45 minutes into a planned 60-minute session and clearly out of energy. What should you do?", [
      ["Close the session cleanly rather than dragging it to hit a number", true, "Correct — forcing a weak final stretch to hit a duration target sacrifices quality for no real benefit."],
      ["Push through no matter what, since ending early looks bad", false, "Wrong — a forced, low-energy final stretch is worse than a clean early close."],
      ["Immediately start a second session to make up the difference right then", false, "Wrong — stacking works best as a planned choice, not an improvised reaction to running out of energy."],
      ["Apologize repeatedly to chat for the rest of the session", false, "Wrong — this doesn't fix the energy issue and drags out a weak stretch."],
    ]),
    question("q5", "Which of these is an early warning sign that volume is starting to cost you quality?", [
      ["You're repeating the same three talking points because you haven't prepared anything new", true, "Correct — this is one of the lesson's specific early warning signs of quality slipping."],
      ["You finished a session exactly on schedule with your planned close", false, "Wrong — this describes healthy execution, not a warning sign."],
      ["You logged your session honestly in your calendar afterward", false, "Wrong — honest logging is a good habit, not a red flag."],
      ["You took a recovery day after a stacked session", false, "Wrong — planned recovery is the correct response, not a symptom of a problem."],
    ]),
    question("q6", "Your calendar says stream today, but your actual day changed unexpectedly. What's the right response?", [
      ["Adjust honestly — move or shorten the session and update the calendar", true, "Correct — honest adjustment keeps the calendar a useful, realistic tool instead of a source of guilt."],
      ["Skip the day silently and say nothing about it", false, "Wrong — silent skipping doesn't give you useful information for future planning."],
      ["Force the original session length regardless of what changed", false, "Wrong — rigidly forcing the original plan ignores real life circumstances."],
      ["Delete that day from the calendar entirely going forward", false, "Wrong — removing the day avoids the real question of whether the calendar matches your schedule."],
    ]),
    question("q7", "You had one exceptional 120-minute day with high energy and an engaged room. What should you take from that?", [
      ["It's fine to keep going that day, but it shouldn't become the automatic new baseline expectation", true, "Correct — one strong day doesn't mean tomorrow should match it."],
      ["Every future session should now be at least 120 minutes", false, "Wrong — treating a peak day as the new required standard sets up burnout."],
      ["You should immediately add more streaming days to your calendar", false, "Wrong — one strong day isn't sufficient evidence to permanently expand your schedule."],
      ["The 60–120 minute range no longer applies to you", false, "Wrong — the range still reflects a sustainable target, regardless of one strong day."],
    ]),
    question("q8", "This is the final lesson in the published StreamerU path. What comes next, honestly?", [
      ["The Growth & Monetization Program Final and the Graduation Exam, with Advanced Creator topics on the roadmap", true, "Correct — Advanced Creator topics are planned next, built on the foundation this path just completed."],
      ["Nothing — there is no further path once this lesson is complete", false, "Wrong — the Program Final and Graduation Exam are the immediate next steps."],
      ["Advanced Creator lessons are already published and ready to start immediately", false, "Wrong — Advanced Creator topics are on the roadmap, not yet published lesson content."],
      ["You must restart the entire curriculum from Lesson 1 to continue progressing", false, "Wrong — completing this lesson moves you toward the Program Final and Graduation Exam, not backward."],
    ]),
  ],
});
