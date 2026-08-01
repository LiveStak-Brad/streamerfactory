import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "tiktok-live-studio-for-gaming",
  programKey: "gaming",
  title: "Quiz: TikTok LIVE Studio for Gaming",
  questions: [
    question(
      "q1",
      "You want the cleanest gameplay capture inside TikTok LIVE Studio. Best first choice?",
      [
        ["Game/window capture of the specific game, over full-screen display capture", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Full-screen display capture because it is easier to set up", false, "Wrong — that choice exposes notifications and other windows on stream."],
        ["Skip capture setup and use only the camera source", false, "Wrong — viewers came to see the game, not just your face."],
        ["Capture your entire second monitor at all times", false, "Wrong — Gaming LIVE Mastery grades execution and privacy discipline, not convenience shortcuts."],
      ],
    ),
    question(
      "q2",
      "Chat says they hear an echo of your voice. Most likely cause inside LIVE Studio?",
      [
        ["Mic input and system/desktop audio are both capturing the same sound at once", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Your camera resolution is set too high", false, "Wrong — that setting does not affect audio duplication."],
        ["You need a better graphics card", false, "Wrong — this is a routing problem, not a hardware bottleneck."],
        ["Echo is normal for all gaming streams", false, "Wrong — Gaming LIVE Mastery grades execution, not accepted broken audio."],
      ],
    ),
    question(
      "q3",
      "Designing a gaming layout for TikTok LIVE means…",
      [
        ["Building vertical (9:16) first, leaving room for TikTok's own chat/UI overlay", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Building a horizontal layout and hoping it crops acceptably", false, "Wrong — that choice fights how TikTok LIVE actually displays your stream."],
        ["Filling the entire vertical frame with alerts", false, "Wrong — the game is the primary visual, not the overlay."],
        ["Ignoring layout since LIVE Studio auto-formats everything", false, "Wrong — Gaming LIVE Mastery grades intentional setup, not assumptions."],
      ],
    ),
    question(
      "q4",
      "OBS Virtual Camera appears as a camera-source option inside LIVE Studio. This means…",
      [
        ["It is a legitimate production-source workflow — build the full version carefully in GM-07 before relying on it", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["LIVE Studio can now run every OBS filter", false, "Wrong — there is no feature parity between LIVE Studio and OBS."],
        ["It replaces the need for any camera or capture setup entirely", false, "Wrong — not the accurate description of this workflow."],
        ["It requires a stream key to use", false, "Wrong — LIVE Studio itself does not require a stream key."],
      ],
    ),
    question(
      "q5",
      "Your game capture shows a black box after you relaunch the game. First fix?",
      [
        ["Reselect the game/window capture source", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Reinstall TikTok LIVE Studio immediately", false, "Wrong — that is an overcorrection for a common, simple issue."],
        ["Switch to a completely different game", false, "Wrong — not the professional decision for this scenario."],
        ["Assume your PC cannot run the game and stream at once", false, "Wrong — Gaming LIVE Mastery grades diagnosis before drastic changes."],
      ],
    ),
    question(
      "q6",
      "What is the honest relationship between LIVE Studio and OBS for gaming?",
      [
        ["LIVE Studio is a simpler, self-contained no-stream-key tool with real limits — there is no feature parity with OBS", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["They are identical tools with different logos", false, "Wrong — that choice ignores real, documented feature differences."],
        ["LIVE Studio will eventually replace OBS entirely for every gaming creator", false, "Wrong — not a claim this course supports."],
        ["OBS is required before you can ever use LIVE Studio", false, "Wrong — LIVE Studio is a standalone, self-contained tool."],
      ],
    ),
    question(
      "q7",
      "Mission success for GM-05 is graded on…",
      [
        ["A working, tested LIVE Studio setup plus an honest LIVE Studio vs OBS limitations list", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Viewer count on your first gaming LIVE", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["How many alerts and overlays you can fit on screen", false, "Wrong — not the professional decision for this scenario."],
        ["Winning your match while streaming", false, "Wrong — Gaming LIVE Mastery grades execution, not viewers, gifts, or match outcomes."],
      ],
    ),
    question(
      "q8",
      "Before trusting your audio setup live, the correct verification step is…",
      [
        ["Record and play back a private test clip — meters moving is not proof viewers can hear you", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Assume it works if the meters move at all", false, "Wrong — meters moving does not confirm the stream mix is correct."],
        ["Skip testing since LIVE Studio configures audio automatically", false, "Wrong — device selection is explicit and must be verified."],
        ["Ask chat to tell you live if something is wrong", false, "Wrong — Gaming LIVE Mastery grades preparation, not live troubleshooting by default."],
      ],
    ),
  ],
});
