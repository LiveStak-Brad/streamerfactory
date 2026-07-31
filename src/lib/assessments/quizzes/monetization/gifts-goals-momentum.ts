import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "gifts-goals-momentum",
  programKey: "monetization",
  title: "Quiz: How gifting works",
  questions: [
    question("q1", "A new viewer asks how gifting works mid-LIVE. What's the best response?", [
      ["Give a short, confident two-to-three sentence explanation — coins to gifts to creator value — then return to content", true, "Correct — literacy without a finance lecture keeps the room moving; a short, confident answer beats a long, defensive one."],
      ["Ignore them, since talking about gifts is always begging", false, "Wrong — clear, calm education is not begging; avoiding the topic entirely is one of the two failure patterns this lesson warns about."],
      ["Quote exact payout thresholds and coin conversion math", false, "Wrong — this lesson explicitly says not to quote exact numbers, since terms change over time and aren't something to guess on stream."],
      ["Tell them gifts are owed to you for showing up", false, "Wrong — entitlement language damages the trust that makes gifting happen naturally."],
    ]),
    question("q2", "Which of these lines is momentum instead of begging?", [
      ["\"We're about two-thirds of the way there — let's see where we land by the end.\"", true, "Correct — this is energy-forward and inclusive; it invites people in without pointing out what's missing."],
      ["\"Nobody has gifted in five minutes — I really need this.\"", false, "Wrong — this is need-forward and only makes sense because of the ask, which makes it begging."],
      ["\"If you don't gift you're not a real fan.\"", false, "Wrong — this is exclusionary and directly damages trust with the room."],
      ["Exaggerating how close you are to a goal to create urgency", false, "Wrong — an invented number designed to manufacture urgency is not transparent, and it destroys trust once noticed."],
    ]),
    question("q3", "Why does this lesson say to understand the gifting mechanics before you start asking for support?", [
      ["So you never sound confused or cagey when a viewer asks how it works, and your language matches how the feature actually functions", true, "Correct — literacy is what lets you talk about gifting clearly, briefly, and without anxiety instead of guessing."],
      ["Because understanding mechanics replaces the need for good content", false, "Wrong — a well-run room is still the foundation; gifting is a byproduct of it, not a substitute for it."],
      ["So you can find loopholes in the payout terms", false, "Wrong — this lesson isn't about exploiting mechanics, it's about explaining them honestly."],
      ["Because viewers expect you to recite exact coin prices from memory", false, "Wrong — this lesson explicitly treats this like currency literacy, not accounting."],
    ]),
    question("q4", "A small gift and a large gift arrive close together. What does this lesson say about how to react to each?", [
      ["Thank both with genuine warmth, scaled naturally, without treating the small one as unworthy of acknowledgment", true, "Correct — the same warmth curve for every gift size keeps the room feeling inclusive rather than split into who matters and who doesn't."],
      ["Only celebrate the large gift and skip the small one", false, "Wrong — this teaches the room that only big gifts are worth acknowledging, which discourages everyone."],
      ["React to both with identical, word-for-word phrasing", false, "Wrong — this lesson recommends varying your language so gratitude doesn't start sounding automated."],
      ["Wait until the end of the session to thank either one", false, "Wrong — a gift that sits unacknowledged for even ten seconds can feel ignored."],
    ]),
    question("q5", "How does this lesson say you should introduce a session goal?", [
      ["State it once near the start in a single honest sentence, then let it sit in the background", true, "Correct — a transparent goal gives the room a shared reference point without dominating the stream."],
      ["Repeat a dramatized story about needing the goal every few minutes", false, "Wrong — this lesson says a dramatized story designed for sympathy is not transparent, and viewers can tell the difference."],
      ["Keep the reason behind the goal vague so it feels more urgent", false, "Wrong — transparency requires the reason behind the goal to be honest, not exaggerated."],
      ["Only mention the goal if someone in chat asks about it", false, "Wrong — this lesson says to state the goal out loud and visibly, not wait to be asked."],
    ]),
    question("q6", "The room goes quiet right after a big gift comes in. What's the best move?", [
      ["React warmly, keep talking about your actual content, and let the moment breathe", true, "Correct — an instant follow-up ask right after a big gift reads as opportunistic rather than appreciative."],
      ["Immediately ask for another gift to keep the momentum going", false, "Wrong — this pressures the room right after a generous moment, which undercuts the goodwill you just earned."],
      ["Apologize for having received such a big gift", false, "Wrong — gratitude should feel clean and genuine, not apologetic."],
      ["End the LIVE right away so the gift feels more special", false, "Wrong — ending the session has nothing to do with honoring the gift and just cuts the session short."],
    ]),
    question("q7", "What self-check does this lesson use to separate momentum language from begging?", [
      ["Would this line still make sense if I removed all mention of gifting?", true, "Correct — if the sentence collapses into nothing without the ask attached, it's begging; if it's really a comment about the room's energy, it's momentum."],
      ["Did the viewer count increase in the last ten seconds?", false, "Wrong — viewer count has nothing to do with whether language is healthy or pressuring."],
      ["Did I say please enough times?", false, "Wrong — politeness alone doesn't determine whether a line is momentum or begging."],
      ["Is the gift animation expensive enough to justify the reaction?", false, "Wrong — price has nothing to do with the ethics test this lesson teaches."],
    ]),
    question("q8", "What does success look like for this lesson's LIVE Mission?", [
      ["A real LIVE where you state one transparent goal, react with varied gratitude, and never use begging or guilt language — regardless of gift totals", true, "Correct — this mission grades culture and clarity, not how many diamonds came in."],
      ["Hitting a specific diamond total during the session", false, "Wrong — totals are explicitly not the pass condition for this mission."],
      ["Reading about gifting without actually going live", false, "Wrong — the mission requires a real 60+ minute LIVE, not just study."],
      ["Making non-gifters feel like they're missing out", false, "Wrong — this directly contradicts the inclusive gratitude principle at the core of this lesson."],
    ]),
  ],
});
