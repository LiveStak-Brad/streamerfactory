import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "console-capture-and-party-chat-routing",
  programKey: "gaming",
  title: "Quiz: Console Capture and Party-Chat Routing",
  questions: [
    question(
      "q1",
      "Setting up console capture for the first time, what is the correct connection order?",
      [
        ["Console → capture card → display first; confirm normal play, then add the computer connection", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Console → computer directly, skipping a display entirely", false, "Wrong — without passthrough to a display, you may be streaming blind."],
        ["Computer → capture card → console, in that order", false, "Wrong — that reverses the actual signal direction from the console."],
        ["Connect everything at once and debug all four hops simultaneously", false, "Wrong — debugging one connection at a time is faster and clearer."],
      ],
    ),
    question(
      "q2",
      "Your commentary is inaudible under game sound on a console stream. Likely cause and fix?",
      [
        ["Mic and console/game audio are mixed into one feed — separate them at the source where your capture method allows it", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Your microphone is broken and needs replacing", false, "Wrong — this is usually a routing problem, not a hardware failure."],
        ["Turn game audio all the way down permanently", false, "Wrong — that removes game sound entirely instead of separating the mix."],
        ["This is unfixable on console and should be accepted", false, "Wrong — separating mic and game audio at the source is a real, documented fix."],
      ],
    ),
    question(
      "q3",
      "What is the honest limitation of console game chat for streaming?",
      [
        ["Game chat is often mixed into console audio and may not be isolatable from your own commentary — document this rather than overpromising", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Game chat can always be perfectly isolated with any capture card", false, "Wrong — this overstates what most setups can actually do."],
        ["Game chat should always be muted entirely with no exceptions", false, "Wrong — the lesson does not require muting it outright, only honest documentation of its limits."],
        ["Game chat and party chat behave identically on every platform", false, "Wrong — they often route and behave differently."],
      ],
    ),
    question(
      "q4",
      "You notice stream audio feels out of sync with the picture on a console setup. How do you verify it?",
      [
        ["Run a clap test recorded through the actual capture path, not by how it feels playing live", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Assume it is fine since gameplay feels normal to you", false, "Wrong — your live feel does not confirm the capture path's actual sync."],
        ["Ask chat to guess whether it looks synced", false, "Wrong — verify privately before relying on viewer guesses."],
        ["Ignore it since capture cards never introduce latency", false, "Wrong — capture-card latency is a real, documented factor."],
      ],
    ),
    question(
      "q5",
      "You keep getting a black screen with certain content on your console capture. What should you suspect?",
      [
        ["HDCP/protected-output enforcement blocking that specific content", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Your capture card is completely broken and needs replacing", false, "Wrong — check for a content-specific pattern before assuming hardware failure."],
        ["Your internet connection is too slow", false, "Wrong — a black screen limited to certain content points to protected-output enforcement, not bandwidth."],
        ["Your console needs a full factory reset", false, "Wrong — an overcorrection before diagnosing the actual cause."],
      ],
    ),
    question(
      "q6",
      "What is the correct privacy default before opening party chat on a public gaming LIVE?",
      [
        ["Keep friend lists and social screens off stream, and confirm names and voice-chat consent with your squad in advance", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Show friend lists so viewers can see who you play with", false, "Wrong — friend lists should never be exposed on a public stream."],
        ["Announce teammates' real usernames for authenticity", false, "Wrong — private usernames should not be broadcast without consent."],
        ["Only worry about privacy if a teammate complains afterward", false, "Wrong — Gaming LIVE Mastery grades setting the default in advance, not reacting after a mistake."],
      ],
    ),
    question(
      "q7",
      "When should you reach for a hardware audio extractor or chat-link-style solution?",
      [
        ["Only after identifying a specific problem that software routing alone cannot solve", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Before setting up anything else, as a default purchase", false, "Wrong — it should be a targeted fix, not a default first step."],
        ["Never, regardless of the problem", false, "Wrong — it is a legitimate targeted solution for confirmed problems."],
        ["Only to bypass a platform's chat restrictions", false, "Wrong — this is not the purpose described in the lesson."],
      ],
    ),
    question(
      "q8",
      "Mission success for GM-08 is graded on…",
      [
        ["Working, documented video/audio routing plus real privacy discipline for party chat", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Viewer count or gifts during a console session", false, "Wrong — Gaming LIVE Mastery grades execution, not viewers or gifts."],
        ["Winning matches while streaming", false, "Wrong — not the professional decision for this scenario."],
        ["How expensive your capture card is", false, "Wrong — not the grading criterion for this lesson."],
      ],
    ),
  ],
});
