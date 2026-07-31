import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "structure-your-first-battle-week",
  programKey: "battles",
  title: "Quiz: Running your first battle",
  questions: [
    question("q1", "You and a potential partner have exchanged a friendly \"maybe this weekend, sounds fun\" in DMs. Is your battle scheduled?", [
      ["No — it isn't real until it's on Battle Hub's shared calendar with a date, time, and format both people can see", true, "Correct — a soft DM agreement is easy for either side to quietly abandon; Battle Hub scheduling makes it visible and real."],
      ["Yes — any verbal agreement counts as a confirmed booking", false, "Wrong — a vague 'maybe' is not the explicit yes this lesson requires."],
      ["Yes, as long as you post about it publicly first", false, "Wrong — promoting before the partner has confirmed is a common early mistake, not a substitute for confirmation."],
      ["No — you need a signed contract before it counts", false, "Wrong — a simple agreement covering date, format, and reschedule plan is enough; no formal contract is required."],
    ]),
    question("q2", "You're hosting your first real battle and aren't sure what to do between rounds while the app resets the timer. What should you do?", [
      ["Use the gap deliberately — recap what just happened, thank a gifter you missed, and set up what's next", true, "Correct — the gaps between rounds are exactly where energy tends to leak out; filling them intentionally keeps the room engaged."],
      ["Go silent until the next round starts so you don't talk over the app", false, "Wrong — dead air between rounds reads as unintentional and lets energy drop."],
      ["Check your phone notifications since nothing important is happening", false, "Wrong — staying present matters just as much between rounds as during them."],
      ["End the stream early since the round already finished", false, "Wrong — ending abruptly mid-battle is a form of ghosting."],
    ]),
    question("q3", "You're losing badly with one round left and part of you wants to just end the stream. What does this lesson say to do?", [
      ["Finish the agreed rounds, keep your energy up, and close gracefully — a lopsided loss handled well costs you nothing", true, "Correct — this is exactly what the no-ghosting rule exists for; ending early costs your partner's trust far more than a bad scoreboard does."],
      ["End the LIVE immediately to avoid embarrassment", false, "Wrong — this is ghosting, the single most damaging thing you can do to your reputation in Battle Hub."],
      ["Blame the app or your connection to explain the loss", false, "Wrong — making excuses without evidence undermines sportsmanship."],
      ["Ask your partner to let you win the last round", false, "Wrong — this isn't sportsmanship, it's manipulating the result."],
    ]),
    question("q4", "Your audio cuts out for ten seconds in the middle of a round. What's the right move?", [
      ["Say what's happening the moment you notice it, fix what you can, and keep talking through the gap", true, "Correct — narrating a technical problem out loud turns a hiccup into a minor moment instead of a story about you disappearing."],
      ["Stay silent and hope nobody notices until it resolves itself", false, "Wrong — silence turns a fixable glitch into what looks like ghosting."],
      ["End the battle immediately since something went wrong", false, "Wrong — technical issues don't excuse abandoning the commitment; communicate and finish."],
      ["Wait until after the battle to mention it happened at all", false, "Wrong — viewers and your partner deserve to know what's happening in real time."],
    ]),
    question("q5", "You won your first battle by a wide margin. What should your closing look like?", [
      ["Thank your opponent by name, thank both chats, and say something concrete about what's next", true, "Correct — sportsmanship at the close matters more to your reputation than the scoreboard, win or lose."],
      ["Celebrate the win loudly and cut the stream immediately after", false, "Wrong — a rushed exit reads as indifference even after a win, and skips the debrief entirely."],
      ["Point out everything the opponent did wrong during the match", false, "Wrong — this damages your reputation regardless of who won."],
      ["Skip the closing since a big win speaks for itself", false, "Wrong — how you close is remembered longer than the final number."],
    ]),
    question("q6", "It's an hour after your first real battle ended. What should you have already done?", [
      ["Answered three questions in writing: what worked, one specific thing to improve, and what you'll test next time", true, "Correct — a same-night debrief while the match is fresh is what turns one battle into real improvement instead of a one-off event."],
      ["Waited a few days until you've fully recovered emotionally before reflecting", false, "Wrong — waiting too long loses the specific details that make a debrief useful."],
      ["Made a list of ten different things to change before your next battle", false, "Wrong — this lesson favors one specific, testable change over a long list."],
      ["Moved straight on to scheduling the next battle without reviewing this one", false, "Wrong — skipping the debrief is the most common reason creators battle repeatedly without visibly improving."],
    ]),
    question("q7", "Your partner is 10 minutes late for the scheduled start time and chat is starting to ask questions. What's the best response?", [
      ["Stay live, keep your audience engaged, and communicate honestly — \"we're waiting on [partner], give us a few\"", true, "Correct — honest, direct communication keeps the room's trust; pretending nothing's wrong or going silent does not."],
      ["End the LIVE and reschedule everything from scratch", false, "Wrong — an overreaction to a manageable delay; hold the room instead."],
      ["Say nothing and let chat wonder what's happening", false, "Wrong — silence in the face of a visible problem reads as disorganized or evasive."],
      ["Publicly call out the partner for being unreliable while waiting", false, "Wrong — this damages the partnership before the battle has even started."],
    ]),
    question("q8", "What does this lesson consider the actual measure of success for your first real battle?", [
      ["Scheduling something real, hosting through whatever happens, closing with sportsmanship, and reflecting honestly afterward", true, "Correct — that combination, not the final scoreboard number, is what the rest of the program builds on."],
      ["Winning the match by the largest possible margin", false, "Wrong — the scoreboard is not the pass criteria for this mission."],
      ["Getting the highest viewer count of any battle that week", false, "Wrong — this lesson measures behavior and structure, not audience size."],
      ["Avoiding any awkward moments during the entire session", false, "Wrong — some messiness is expected in a first real battle; how you handle it is what matters."],
    ]),
  ],
});
