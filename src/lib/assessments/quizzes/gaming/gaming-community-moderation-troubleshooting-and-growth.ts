import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "gaming-community-moderation-troubleshooting-and-growth",
  programKey: "gaming",
  title: "Quiz: Gaming Community, Moderation, Troubleshooting, and Growth",
  questions: [
    question(
      "q1",
      "Your Game Capture source goes black mid-session and you have a known-good fallback scene. Best first move?",
      [
        ["Switch to the fallback scene immediately, then diagnose calmly", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Troubleshoot live in front of chat with no fallback used", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Change your bitrate, scene, and audio settings all at once to fix it faster", false, "Wrong — not the professional decision for this scenario."],
        ["End the stream immediately without switching scenes", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not wins."],
      ],
    ),
    question(
      "q2",
      "What is the correct diagnostic order for a technical failure?",
      [
        ["Source → routing → device → software → performance → network, changing one variable at a time", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Guess randomly until something works", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Always assume it's your internet first", false, "Wrong — not the professional decision for this scenario."],
        ["Change every setting simultaneously to save time", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not wins."],
      ],
    ),
    question(
      "q3",
      "A teammate's display name reveals private information during a live match. Correct action?",
      [
        ["Scene-switch, mute, or blur immediately, then address it briefly if needed", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Leave it on screen since you didn't choose the name", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Read the name aloud to acknowledge it", false, "Wrong — not the professional decision for this scenario."],
        ["End the stream permanently over one display name", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not wins."],
      ],
    ),
    question(
      "q4",
      "Why is revealing live lobby codes, friend codes, or match server info risky?",
      [
        ["It can enable doxxing or stream-sniping by giving strangers a way to find or disrupt you in-game", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["It isn't risky as long as viewership is low", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["It only matters for console creators", false, "Wrong — not the professional decision for this scenario."],
        ["It's only a problem during tournaments", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not wins."],
      ],
    ),
    question(
      "q5",
      "Running a community tournament without a stated run-of-show usually leads to…",
      [
        ["Confusion about turns/rounds and dead air between matches", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["A smoother show because rules limit fun", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["No real downside as long as viewers are engaged", false, "Wrong — not the professional decision for this scenario."],
        ["Better moderation outcomes automatically", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not wins."],
      ],
    ),
    question(
      "q6",
      "Ethical gaming-specific monetization means…",
      [
        ["No gift-guilt and no framing rank/wins as a measure of your worth", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Framing every gift as proof of loyalty", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Telling chat your rank determines your value as a creator", false, "Wrong — not the professional decision for this scenario."],
        ["Guilting silent viewers into gifting", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not wins."],
      ],
    ),
    question(
      "q7",
      "Mission success for GM-11 is graded on…",
      [
        ["A working community rules template, a tested fallback scene, and a completed diagnostic log", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Match wins during your tournament session", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Viewer count during the community game", false, "Wrong — not the professional decision for this scenario."],
        ["How dramatic your on-stream failure looked", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not wins."],
      ],
    ),
    question(
      "q8",
      "Hard boundary for collab hosting?",
      [
        ["Agree on moderation responsibility and audio routing before going live, not during", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Negotiate hosting roles live in front of both audiences", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Assume the other creator's moderation team covers your chat too", false, "Wrong — not the professional decision for this scenario."],
        ["Skip audio-routing planning since 'it usually works out'", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not wins."],
      ],
    ),
  ],
});
