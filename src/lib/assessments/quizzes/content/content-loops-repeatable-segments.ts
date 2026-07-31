import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "content-loops-repeatable-segments",
  programKey: "content",
  title: "Quiz: Viewer retention techniques",
  questions: [
    question("q1", "What is the correct order of the four-part retention loop?", [
      ["Hook → Value → Interaction → Callback", true, "Correct — this is the atomic unit of retention, run every few minutes."],
      ["Value → Hook → Callback → Interaction", false, "Wrong — the hook resets attention first, and the callback bridges out last."],
      ["Interaction → Hook → Value → Callback", false, "Wrong — interaction comes after value delivers the payoff, not before the hook."],
      ["Callback → Hook → Interaction → Value", false, "Wrong — the callback is the bridge to the next loop, not the opener."],
    ]),
    question("q2", "When should you deliver the callback in a loop?", [
      ["Before the silence — while you're still talking, not after you've gone quiet", true, "Correct — a named preview before a pause invites a stay; a silent gap invites an exit."],
      ["After a long pause, once the room feels awkward", false, "Wrong — waiting until after silence defeats the callback's purpose."],
      ["Only at the very end of the entire session", false, "Wrong — callbacks happen at the end of every loop, not just once."],
      ["Only when chat specifically asks what's next", false, "Wrong — callbacks are proactive, not reactive to a request."],
    ]),
    question("q3", "How many named segments does this lesson recommend keeping in your weekly rotation?", [
      ["Three to five", true, "Correct — enough for familiarity and variety without becoming an unmanageable list."],
      ["As many as possible for constant novelty", false, "Wrong — too many segment names undermines the recognition that drives retention."],
      ["Exactly one, reused every single session", false, "Wrong — one segment alone doesn't give the week enough variety."],
      ["A brand-new set every session so nothing repeats", false, "Wrong — repetition and recognition are the point of named segments."],
    ]),
    question("q4", "A planned ten-minute segment runs out of material at minute four. What should you do?", [
      ["Use your default filler loop, then hand off to the next segment early", true, "Correct — ending a segment early is fine; drifting without a name is what hurts retention."],
      ["Apologize and freeze while you figure out what to add", false, "Wrong — freezing breaks the room's momentum rather than protecting it."],
      ["Pad the remaining six minutes with unrelated small talk", false, "Wrong — padding without direction is exactly the drift this lesson warns against."],
      ["End the entire LIVE since the segment failed", false, "Wrong — one short segment doesn't require ending the whole session."],
    ]),
    question("q5", "What does this lesson say should be the scoreboard for this specific mission?", [
      ["Continuity — viewers always knowing what's coming next — not peak concurrent viewers", true, "Correct — a spike in peak viewers can still hide a room that can't hold anyone past two minutes."],
      ["The single highest peak concurrent viewer count of the session", false, "Wrong — this lesson explicitly says peak CCV is not the grade for this skill."],
      ["Total gifts received during the session", false, "Wrong — monetization isn't the focus of this retention-architecture lesson."],
      ["Number of new followers gained", false, "Wrong — follower growth is an outcome, not the behavior being measured here."],
    ]),
    question("q6", "What should you do if chat suddenly gets very busy and hijacks the topic mid-value?", [
      ["Finish the value beat briefly, then fold the hijack into the interaction beat or promise it for a later segment", true, "Correct — this protects the loop order so the room still feels intentional."],
      ["Immediately abandon your planned segment to chase every message", false, "Wrong — chasing every message breaks the architecture you built."],
      ["Ignore chat completely until the segment ends", false, "Wrong — ignoring a busy, engaged chat wastes a valuable moment."],
      ["End the segment early since chat has taken over", false, "Wrong — you can redirect energetic chat without abandoning your structure."],
    ]),
    question("q7", "Why does this lesson recommend building a one-page loop card before going live?", [
      ["Retention architecture fails when it only exists in your head under live pressure", true, "Correct — a visible card protects your segments, hooks, and callbacks when you're on the spot."],
      ["It's required documentation for StreamerU to grade your mission", false, "Wrong — it's a personal tool, not a submission requirement."],
      ["It replaces the need to actually go live", false, "Wrong — the card supports the LIVE mission; it doesn't substitute for it."],
      ["It guarantees higher peak concurrent viewers", false, "Wrong — no planning tool guarantees viewer outcomes."],
    ]),
    question("q8", "What is a 'directed' interaction beat, as opposed to a weak one?", [
      ["A specific ask with a short time window, like a 1-vs-2 choice in the next 30 seconds", true, "Correct — a directed ask is easy to respond to quickly, unlike vague prompts."],
      ["A general invitation like 'chat with me guys'", false, "Wrong — this lesson explicitly calls this kind of prompt undirected and weak."],
      ["Reading every single chat message aloud one by one", false, "Wrong — that's reactive, not a directed interaction beat with a deadline."],
      ["Asking a question and moving on without waiting for any response", false, "Wrong — an interaction beat should give the room a real chance to respond."],
    ]),
  ],
});
