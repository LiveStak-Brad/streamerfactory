import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "choosing-your-gaming-live-setup",
  programKey: "gaming",
  title: "Quiz: Choosing Your Gaming LIVE Setup",
  questions: [
    question(
      "q1",
      "You cannot get RTMP stream-key access for TikTok LIVE. What is the professional response?",
      [
        ["Treat access as account-dependent, use OBS Virtual Camera into TikTok LIVE Studio if you want OBS composition now, and never attempt circumvention", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Buy a third-party key from a reseller", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Use a tool that spoofs eligibility until access appears", false, "Wrong — not the professional decision for this scenario."],
        ["Give up on OBS composition entirely and stop streaming", false, "Wrong — Gaming LIVE Mastery grades execution and technical reliability, not virality."],
      ],
    ),
    question(
      "q2",
      "Which statement about OBS and TikTok LIVE Studio is accurate?",
      [
        ["They are different tools with different capabilities, so you should verify features against your own installed build rather than assuming parity", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["They are feature-identical, so any OBS tutorial applies directly", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["LIVE Studio is simply an older copy of OBS", false, "Wrong — not the professional decision for this scenario."],
        ["Anything LIVE Studio does natively must also exist in OBS", false, "Wrong — Gaming LIVE Mastery grades execution and technical reliability, not virality."],
      ],
    ),
    question(
      "q3",
      "A creator wants a dual-PC rig in week one because a large streamer uses one. Best guidance?",
      [
        ["Dual-PC is not necessary for most creators; run single-PC until session data shows it has actually run out of headroom", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Buy the second PC immediately to look professional", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Dual-PC is required for any competitive title", false, "Wrong — not the professional decision for this scenario."],
        ["Skip testing and assume the second machine fixes everything", false, "Wrong — Gaming LIVE Mastery grades execution and technical reliability, not virality."],
      ],
    ),
    question(
      "q4",
      "Which column deliberately does not appear on the Gaming Setup Decision Matrix?",
      [
        ["How impressive the setup looks, because impressiveness is not a reliability measure", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Budget fit, since money should never influence setup", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Reliability under pressure, since that cannot be scored", false, "Wrong — not the professional decision for this scenario."],
        ["Growth room, since setups never need to change", false, "Wrong — Gaming LIVE Mastery grades execution and technical reliability, not virality."],
      ],
    ),
    question(
      "q5",
      "You added three overlays and a second camera before your base chain was tested. What went wrong?",
      [
        ["Visual complexity was layered on an unproven source flow, so failures now have several possible causes instead of one", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Nothing — overlays always improve retention first", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["The overlays were the wrong colour for the game", false, "Wrong — not the professional decision for this scenario."],
        ["You needed more scenes to stabilise the stream", false, "Wrong — Gaming LIVE Mastery grades execution and technical reliability, not virality."],
      ],
    ),
    question(
      "q6",
      "What does the source-flow worksheet require you to map?",
      [
        ["Every hop from game, console, or phone through capture and composing software to encode, platform, and viewer, with audio drawn as a parallel chain", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Only the overlay layout and colour palette", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Just the microphone, since video rarely fails", false, "Wrong — not the professional decision for this scenario."],
        ["Your follower goals for the next month", false, "Wrong — Gaming LIVE Mastery grades execution and technical reliability, not virality."],
      ],
    ),
    question(
      "q7",
      "Mission success for GM-01 is defined as…",
      [
        ["A scored matrix, a completed source-flow map, and one private test session proving the chain holds", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Reaching a viewer count during your first test", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Receiving gifts while testing the new setup", false, "Wrong — not the professional decision for this scenario."],
        ["Winning a ranked match on stream", false, "Wrong — Gaming LIVE Mastery grades execution and technical reliability, not virality."],
      ],
    ),
    question(
      "q8",
      "Your frame rate collapses the moment OBS opens on a single-PC setup. First move?",
      [
        ["Investigate resource contention — source count, encoder settings, and background apps — before assuming new hardware is required", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Order a capture card the same night", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Add more scenes so OBS has something to switch to", false, "Wrong — not the professional decision for this scenario."],
        ["Stream anyway and apologise to chat every few minutes", false, "Wrong — Gaming LIVE Mastery grades execution and technical reliability, not virality."],
      ],
    ),
  ],
});
