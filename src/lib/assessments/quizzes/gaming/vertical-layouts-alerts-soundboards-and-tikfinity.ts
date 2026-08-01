import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "vertical-layouts-alerts-soundboards-and-tikfinity",
  programKey: "gaming",
  title: "Quiz: Vertical Layouts, Alerts, Soundboards, and TikFinity",
  questions: [
    question(
      "q1",
      "Your minimap is covered by a chat overlay in your vertical layout. Correct fix?",
      [
        ["Rebuild the layout so the minimap/HUD is a protected zone, then place chat elsewhere", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Leave it — chat engagement matters more than the HUD", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Remove chat entirely instead of repositioning it", false, "Wrong — not the professional decision for this scenario."],
        ["Shrink the whole game feed to add more overlay space", false, "Wrong — Gaming LIVE Mastery grades execution and clarity, not virality."],
      ],
    ),
    question(
      "q2",
      "You want to add TikFinity triggers, alerts, and a large soundboard all at once for launch night. Best approach?",
      [
        ["Add one layer at a time — layout, then alerts, then soundboard, then TikFinity in test mode — testing each before the next", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Enable everything at once since launch night should be maximal", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Skip testing since TikFinity 'just works'", false, "Wrong — not the professional decision for this scenario."],
        ["Only test automation after going live for the first time", false, "Wrong — Gaming LIVE Mastery grades execution and clarity, not virality."],
      ],
    ),
    question(
      "q3",
      "A soundboard clip misfires and loops during a live moment. Correct first action?",
      [
        ["Hit the emergency mute immediately, then address it briefly and move on", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Let it keep playing so chat doesn't notice you reacting", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["End the stream immediately", false, "Wrong — not the professional decision for this scenario."],
        ["Turn up your mic to talk over it instead of muting the clip", false, "Wrong — Gaming LIVE Mastery grades execution and clarity, not virality."],
      ],
    ),
    question(
      "q4",
      "TikFinity feature availability across accounts should be treated as…",
      [
        ["Something to verify in your own setup — capability and eligibility can vary and change", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Identical for every account and always available", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Guaranteed once you've seen it work for one other creator", false, "Wrong — not the professional decision for this scenario."],
        ["Irrelevant — just promise chat every feature", false, "Wrong — Gaming LIVE Mastery grades execution and clarity, not virality."],
      ],
    ),
    question(
      "q5",
      "Chat is commenting more on your sound-effect spam than on your gameplay. What does this signal mean?",
      [
        ["Automation has crossed into distraction — pull back on soundboard/alert frequency", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["You should add more sound effects since chat is engaged", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Ignore it — any chat activity is good chat activity", false, "Wrong — not the professional decision for this scenario."],
        ["Increase soundboard volume so effects stand out more", false, "Wrong — Gaming LIVE Mastery grades execution and clarity, not virality."],
      ],
    ),
    question(
      "q6",
      "Copyright risk on a gaming soundboard is best managed by…",
      [
        ["Preferring original, licensed, or clearly cleared audio clips", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Using popular commercial music clips because they're recognizable", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Assuming short clips are always safe", false, "Wrong — not the professional decision for this scenario."],
        ["Ignoring the issue since soundboards are 'just for fun'", false, "Wrong — Gaming LIVE Mastery grades execution and clarity, not virality."],
      ],
    ),
    question(
      "q7",
      "Mission success for GM-10 is graded on…",
      [
        ["A readable layout plus disciplined, verified alerts/soundboard/automation", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["How many TikFinity triggers you enabled", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Viewer count during your test session", false, "Wrong — not the professional decision for this scenario."],
        ["How loud your soundboard got", false, "Wrong — Gaming LIVE Mastery grades execution and clarity, not virality."],
      ],
    ),
    question(
      "q8",
      "Hard boundary for TikFinity/automation setups?",
      [
        ["Set cooldowns, user restrictions, and an emergency stop before relying on any trigger live", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Skip cooldowns to maximize trigger frequency", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Assume moderation isn't needed for automated effects", false, "Wrong — not the professional decision for this scenario."],
        ["Enable every trigger type without a test mode pass", false, "Wrong — Gaming LIVE Mastery grades execution and clarity, not virality."],
      ],
    ),
  ],
});
