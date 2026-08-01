import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "voice-that-holds-a-room",
  programKey: "presence",
  title: "Quiz: Voice That Holds a Room",
  questions: [
    question("q1", "A voice that holds a room primarily needs…", [
      ["Breath support, paced variety, emphasis, and energy you can sustain when tired", true, "Correct — five-tool craft, not volume alone."],
      ["Maximum volume for the entire LIVE", false, "Wrong — maxed energy flattens and burns out."],
      ["Reading every sentence at identical speed", false, "Wrong — flat pace kills retention."],
      ["Whispering for an hour so people lean in", false, "Wrong — unclear and unsustainable."],
    ]),
    question("q2", "Chat goes quiet and your voice shrinks to a mumble. Best move?", [
      ["Project one full sentence to the room, then continue the teach", true, "Correct — quiet chat is not permission to disappear sonically."],
      ["Match the silence by whispering everything", false, "Wrong — vocal shrink."],
      ["Stop talking until someone comments", false, "Wrong — abandons hosting."],
      ["Apologize for being boring", false, "Wrong — trains distrust."],
    ]),
    question("q3", "You catch yourself rush-talking. Recovery looks like…", [
      ["Exhale, drop to about 80% speed, continue without a shame speech", true, "Correct — mechanical recovery."],
      ["Explain for two minutes why you talk fast when nervous", false, "Wrong — apology theater."],
      ["Speed up more to finish the topic", false, "Wrong — doubles the problem."],
      ["End the segment immediately", false, "Wrong — unnecessary."],
    ]),
    question("q4", "Vocal variety on a segment should be…", [
      ["Scheduled contrast — clear open, teach with emphasis, lift, settle", true, "Correct — planned variety beats hoping."],
      ["Random yelling every thirty seconds", false, "Wrong — chaos, not craft."],
      ["One monotone tone for 'professionalism'", false, "Wrong — monotone loses rooms."],
      ["Saved only for battle nights", false, "Wrong — practice on normal LIVEs."],
    ]),
    question("q5", "Tired-day voice strategy is…", [
      ["Clarity and paced variety over fake hype you cannot sustain", true, "Correct — honest energy that holds."],
      ["Pretend you slept eight hours and scream", false, "Wrong — fake hype crashes."],
      ["Skip warm-up because you are tired", false, "Wrong — tired days need the warm-up most."],
      ["Only whisper so you conserve", false, "Wrong — unclear hosting."],
    ]),
    question("q6", "Mission success for this lesson is…", [
      ["Warm-up done + 15-minute variety segment + before/after notes", true, "Correct — behavior graded."],
      ["Hitting a gift goal during the warm-up", false, "Wrong — not the grade."],
      ["Sounding like a radio announcer for an hour", false, "Wrong — listenable, not theatrical."],
      ["Skipping notes if the segment felt fine", false, "Wrong — notes make practice compound."],
    ]),
    question("q7", "Capstone connection?", [
      ["Before/after voice notes feed Capstone delivery / vocal-pacing evidence", true, "Correct — signature 20 needs listenable voice."],
      ["Voice work replaces the Capstone LIVE", false, "Wrong — still need full Capstone."],
      ["Only Honors Lab reviews voice", false, "Wrong — Capstone requires it; labs optional."],
      ["Monotone is fine if framing is perfect", false, "Wrong — voice decides whether they stay."],
    ]),
    question("q8", "The warm-up card is most useful when…", [
      ["Filled with your personal lines and reused until stale, then revised", true, "Correct — personal and repeatable."],
      ["Copied from a stranger and never spoken aloud", false, "Wrong — unused card."],
      ["Rewritten into a new persona every LIVE", false, "Wrong — inconsistency."],
      ["Ignored once you feel 'naturally good'", false, "Wrong — fundamentals stay."],
    ]),
  ],
});
