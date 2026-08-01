import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "mobile-gaming-live-workflows",
  programKey: "gaming",
  title: "Quiz: Mobile Gaming LIVE Workflows",
  questions: [
    question(
      "q1",
      "You play a mobile-exclusive game and don't need overlays. Best path?",
      [
        ["Native mobile LIVE, if your account and game currently support it", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Buy a capture card immediately", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Mirror wirelessly with no testing", false, "Wrong — not the professional decision for this scenario."],
        ["Skip privacy settings since it's 'just a phone'", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not virality."],
      ],
    ),
    question(
      "q2",
      "Your phone overheats and throttles about 20 minutes into every session. Best fix order?",
      [
        ["Improve airflow and remove vent-blocking cases first, then shorten sessions if still needed", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Ignore it — throttling is unavoidable", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Immediately buy a new phone", false, "Wrong — not the professional decision for this scenario."],
        ["Stream in direct sunlight for better lighting", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not virality."],
      ],
    ),
    question(
      "q3",
      "A private message preview flashed on your mirrored screen during a test clip. Correct response?",
      [
        ["Lock Do Not Disturb and disable lock-screen previews before any further sessions", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Trust yourself to just ignore future notifications", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Only fix it if it happens again", false, "Wrong — not the professional decision for this scenario."],
        ["Switch to Display Capture for more visibility", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not virality."],
      ],
    ),
    question(
      "q4",
      "Wireless mirroring keeps freezing every ten minutes. What is the correct diagnostic step?",
      [
        ["Test USB mirroring as a controlled variable to isolate whether the network is the cause", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Immediately blame your internet provider without testing", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Restart the stream repeatedly with no changes", false, "Wrong — not the professional decision for this scenario."],
        ["Switch games to see if the game caused it", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not virality."],
      ],
    ),
    question(
      "q5",
      "USB mirroring vs wireless mirroring — how should you choose?",
      [
        ["USB when stability matters most; wireless when cable-free movement matters more, but test both before trusting either", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Always choose wireless because it looks more professional", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Always choose USB and never test wireless", false, "Wrong — not the professional decision for this scenario."],
        ["It never matters which you choose", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not virality."],
      ],
    ),
    question(
      "q6",
      "Mission success for GM-09 is graded on…",
      [
        ["A tested, reliable mobile path with locked privacy settings and a documented fallback", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Viewer count on your first mobile LIVE", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["How expensive your phone is", false, "Wrong — not the professional decision for this scenario."],
        ["Whether a clip from the test went viral", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not virality."],
      ],
    ),
    question(
      "q7",
      "You're mirroring your phone into OBS, which also captures desktop audio. What should you check?",
      [
        ["That the same audio source isn't being captured twice through two different paths", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Nothing — more audio sources always sound better", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Only the video crop, audio doesn't matter here", false, "Wrong — not the professional decision for this scenario."],
        ["Whether the mic brand matches the phone brand", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not virality."],
      ],
    ),
    question(
      "q8",
      "Hard boundary for mobile gaming LIVE setups?",
      [
        ["Do not assume every account/device has identical native LIVE options — verify current support first", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Assume all phones behave identically for LIVE", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Skip testing since mobile is 'always simple'", false, "Wrong — not the professional decision for this scenario."],
        ["Leave notification previews on for 'authenticity'", false, "Wrong — Gaming LIVE Mastery grades execution and safety, not virality."],
      ],
    ),
  ],
});
