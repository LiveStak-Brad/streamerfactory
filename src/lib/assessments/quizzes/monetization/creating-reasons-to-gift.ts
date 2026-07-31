import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "creating-reasons-to-gift",
  programKey: "monetization",
  title: "Quiz: Creating reasons to gift",
  questions: [
    question("q1", "You're planning tonight's LIVE and want to build a genuine 'reason to stay' instead of just hoping for gifts. What should you do first?", [
      ["Sketch at least one entertainment, milestone, or utility moment before you go live", true, "Correct — value moments work best when planned in advance, not improvised mid-session."],
      ["Decide you'll ask for gifts five separate times to increase your odds", false, "Wrong — repeated asking without value is begging, not a reason to stay."],
      ["Skip planning and just react to whatever chat brings up", false, "Wrong — reacting only works once you already have a plan running underneath it."],
      ["Wait until viewers seem bored, then announce a surprise gift goal", false, "Wrong — a goal announced out of desperation is not a designed value moment."],
    ]),
    question("q2", "A viewer says your milestone celebration felt like the best part of the stream. What made it work?", [
      ["You stopped, acknowledged the real progress out loud, and connected it to the room", true, "Correct — milestones work because they mark genuine progress and invite people into a bigger story."],
      ["You mentioned the milestone once in the title and never brought it up again", false, "Wrong — an unacknowledged milestone doesn't create a value moment."],
      ["You used the milestone as a reason to ask for gifts three times in a row", false, "Wrong — that turns a milestone into pressure instead of celebration."],
      ["You only mentioned it to viewers who had already gifted that night", false, "Wrong — excluding non-gifters damages the room's culture."],
    ]),
    question("q3", "Halfway through your session, you realize you haven't delivered a utility moment yet. What's the best fix?", [
      ["Answer a question that's come up recently in your chat history, properly, as a mini-lesson", true, "Correct — this turns a real audience need into a genuine utility moment on the spot."],
      ["Skip it — utility moments are optional if you already did an entertainment segment", false, "Wrong — the mission asks for all three categories, and utility appeals to a different kind of viewer."],
      ["Invent a fake question from chat so it looks responsive", false, "Wrong — dishonesty undermines the whole point of a value moment."],
      ["Rush through a two-second tip so you can get back to your goal update", false, "Wrong — rushing signals the moment wasn't actually important."],
    ]),
    question("q4", "You planned an entertainment segment, but it clearly falls flat with your room. What should you do?", [
      ["Acknowledge it lightly and move confidently into your next planned moment", true, "Correct — a quick, confident recovery reads better than dwelling on a segment that didn't land."],
      ["Apologize repeatedly for several minutes before continuing", false, "Wrong — over-apologizing draws more attention to the miss than needed."],
      ["Immediately ask for gifts to recover the room's energy", false, "Wrong — using an ask to patch a flat moment turns it into pressure."],
      ["End the LIVE early since the plan didn't work", false, "Wrong — one flat segment isn't a reason to abandon the session."],
    ]),
    question("q5", "Which planned moment passes the lesson's 'honesty test'?", [
      ["A milestone shoutout that would still be worth saying even if gifting didn't exist", true, "Correct — real value moments hold up completely without any ask attached."],
      ["A 'challenge' that only exists to pause and ask viewers to gift before you continue", false, "Wrong — this collapses into nothing without the ask, which fails the test."],
      ["A story that's really just a lead-in to a guilt-based request", false, "Wrong — a lead-in built around guilt is a disguised ask, not a value moment."],
      ["A segment you only run when the room seems reluctant to gift", false, "Wrong — using a moment reactively as leverage is the opposite of designing it for its own sake."],
    ]),
    question("q6", "How should you space your three value moments across a 60-minute-plus session?", [
      ["Spread them across the session — for example, early, mid, and late thirds", true, "Correct — spacing gives each moment full attention instead of feeling like a rushed checklist."],
      ["Deliver all three back-to-back in the first ten minutes", false, "Wrong — clustering moments crowds them and rushes the rest of the session."],
      ["Save all three for the final five minutes before you close", false, "Wrong — cramming moments at the end doesn't give any of them room to land."],
      ["Only include a moment if a viewer specifically requests one", false, "Wrong — value moments should be planned, not dependent on a request."],
    ]),
    question("q7", "A milestone happens unexpectedly, mid-sentence, and wasn't part of your plan. What's the right move?", [
      ["Pause briefly, acknowledge it in real time, then continue", true, "Correct — unplanned milestones are genuine moments and shouldn't be skipped just because they weren't scheduled."],
      ["Ignore it since it wasn't on your outline and stick to the plan exactly", false, "Wrong — skipping real, spontaneous progress wastes one of the most authentic moments available."],
      ["Stop the stream to plan a formal celebration for a future session instead", false, "Wrong — the moment is happening now; that's when it should be acknowledged."],
      ["Mention it only in a follow-up post after the stream ends", false, "Wrong — the room experiencing it live is the whole value of a milestone moment."],
    ]),
    question("q8", "Why does rotating which value-moment category you lead with matter session to session?", [
      ["It keeps content from feeling formulaic and predictable to regulars", true, "Correct — repeating the same structure every night trains viewers to predict and tune out."],
      ["TikTok's algorithm requires a different category order each time", false, "Wrong — this isn't a platform mechanic; it's a content-freshness habit."],
      ["It guarantees a bigger gift total than a fixed order would", false, "Wrong — rotation supports variety, not a guaranteed financial outcome."],
      ["It replaces the need to plan moments in advance", false, "Wrong — rotation is still something you plan ahead of time."],
    ]),
  ],
});
