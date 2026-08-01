import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "game-audio-mic-balance-and-discord-routing",
  programKey: "gaming",
  title: "Quiz: Game Audio, Mic Balance, and Discord Routing",
  questions: [
    question(
      "q1",
      "Lowering 'the volume' always lowers your mic, game, and music at once. What is the actual problem?",
      [
        ["You do not have separate source control yet — each source needs its own independent slider", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Your microphone is defective and needs replacement", false, "Wrong — that choice skips diagnosing the real routing problem."],
        ["Your internet connection is too slow", false, "Wrong — not the professional decision for this scenario."],
        ["You need to buy a second PC to fix this", false, "Wrong — Gaming LIVE Mastery teaches routing fixes before hardware purchases."],
      ],
    ),
    question(
      "q2",
      "A creator wants to capture only their game's audio separately from Discord using OBS. What should they check first?",
      [
        ["Whether their OBS version actually supports Application Audio Capture (OBS 28+ Windows; Capture Audio on Game/Window Capture in 30.1+)", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Assume every OBS version has this feature identically", false, "Wrong — that choice fights the version-aware standard in this lesson."],
        ["Buy new hardware immediately", false, "Wrong — not the professional decision for this scenario."],
        ["Skip audio separation entirely since it's too complex", false, "Wrong — Gaming LIVE Mastery teaches practical separation, not avoidance."],
      ],
    ),
    question(
      "q3",
      "A creator hears an echo of their own voice on stream. Most likely cause and fix?",
      [
        ["Their mic is being captured twice (e.g., directly and again through Discord or desktop capture) — identify and disable the duplicate", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Their internet upload speed is too low", false, "Wrong — that choice misdiagnoses a routing issue as a bandwidth issue."],
        ["Their headset battery is low", false, "Wrong — not the professional decision for this scenario."],
        ["Their game's in-game audio settings are wrong", false, "Wrong — Gaming LIVE Mastery traces echo to duplicate capture paths first."],
      ],
    ),
    question(
      "q4",
      "What is the correct gain-staging order for gaming audio?",
      [
        ["Input gain → clean balance across sources → compressor/gate/noise suppression → limiter last", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Limiter first, then adjust input gain afterward", false, "Wrong — that order fights the gain-staging standard in this lesson."],
        ["Noise gate first, then worry about input gain later", false, "Wrong — not the professional decision for this scenario."],
        ["Add every filter at once and adjust by ear", false, "Wrong — Gaming LIVE Mastery requires filters after gain staging, in order."],
      ],
    ),
    question(
      "q5",
      "A creator wants to stream their Discord teammate's voice to the audience. What must happen first?",
      [
        ["Get the teammate's consent and document the decision on the Discord Routing Worksheet", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Stream it automatically since it's normal for team games", false, "Wrong — that choice skips the consent requirement in this lesson."],
        ["Route it at full volume without checking balance against the mic", false, "Wrong — not the professional decision for this scenario."],
        ["Avoid ever streaming teammate audio under any circumstance", false, "Wrong — Gaming LIVE Mastery allows it with consent and documentation, not a blanket ban."],
      ],
    ),
    question(
      "q6",
      "What is the recommended beginner audio setup in this lesson?",
      [
        ["Mic + game audio only, each with its own slider — a complete, valid starting setup", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["All six sources (mic, game, Discord, music, soundboard, alerts) from day one", false, "Wrong — that choice contradicts the simple-first standard in this lesson."],
        ["No mic at all until gear is upgraded", false, "Wrong — not the professional decision for this scenario."],
        ["Whatever configuration looks most impressive on camera", false, "Wrong — Gaming LIVE Mastery grades reliability and clarity, not appearance."],
      ],
    ),
    question(
      "q7",
      "An alert sound blasts far louder than the mic and game. Best fix?",
      [
        ["Normalize the alert's playback level against the already-balanced mic and game levels", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Leave it since alerts are supposed to stand out no matter what", false, "Wrong — that choice ignores the balance standard in this lesson."],
        ["Mute all alerts permanently instead of adjusting the level", false, "Wrong — not the professional decision for this scenario."],
        ["Only fix it if a viewer complains", false, "Wrong — Gaming LIVE Mastery grades proactive checklist use, not reactive fixes."],
      ],
    ),
    question(
      "q8",
      "Capstone connection and grading standard for GM-04?",
      [
        ["The Audio-Routing Map, Balance Checklist, and Discord Worksheet feed the Signature Gaming LIVE Show Capstone, graded on implementation and documentation", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Success is graded on how many viewers reacted positively to the audio", false, "Wrong — that framing fights the execution-based grading standard."],
        ["Honors Lab replaces completing the routing map and checklist", false, "Wrong — not the professional decision for this scenario."],
        ["Viewer gift totals determine whether the audio mission passed", false, "Wrong — Gaming LIVE Mastery never grades on viewers, gifts, wins, or rank."],
      ],
    ),
  ],
});
