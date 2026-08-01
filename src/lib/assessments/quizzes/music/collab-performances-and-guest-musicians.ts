import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "collab-performances-and-guest-musicians",
  programKey: "music",
  title: "Quiz: Collab Performances and Guest Musicians",
  questions: [
    question(
      "q1",
      "Music collabs succeed when…",
      [
        ["Roles, audio plan, promo, and run-of-show are clear before going LIVE", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Guests show up unannounced with no levels", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Only one person can hear monitors", false, "Wrong — not the professional decision for this scenario."],
        ["You skip rehearsal always", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q2",
      "Guest audio logistics should include…",
      [
        ["Inputs, monitoring, latency checks, backup path, and who controls the mix", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Hope the phone mic catches everything", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Bluetooth for all performers", false, "Wrong — not the professional decision for this scenario."],
        ["No sound check with guests", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q3",
      "If a guest cable fails mid-song…",
      [
        ["Use the backup plan — talk break, solo cover, or reroute — then recover with composure", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Argue on stream for five minutes", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["End without explanation", false, "Wrong — not the professional decision for this scenario."],
        ["Blame the guest publicly", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q4",
      "Mission success for MU-08 is…",
      [
        ["Completed collab run-of-show + audio plan (live rehearsal or fully documented simulation)", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Gift split percentages only", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Recruiting for an agency", false, "Wrong — not the professional decision for this scenario."],
        ["Skipping promo", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q5",
      "CM-07 callback means…",
      [
        ["Brief — guest hosting craft helps; this lesson covers music-specific audio and performance ops", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Full Community rewrite", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Ignore audio if vibes are good", false, "Wrong — not the professional decision for this scenario."],
        ["Collabs replace solo practice forever", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q6",
      "Multiple vocalists need…",
      [
        ["Gain-staged inputs, bleed control, and a clear who-sings-when plan", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["One shared dynamic mic with no discipline", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Maximum compressor on every channel blindly", false, "Wrong — not the professional decision for this scenario."],
        ["No cueing system", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q7",
      "Promo for collabs should…",
      [
        ["Give both audiences time, place, roles, and why to show up — with consent", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Tag spam without agreement", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Hide the guest until LIVE starts always", false, "Wrong — not the professional decision for this scenario."],
        ["Promise illegal song medleys", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q8",
      "Capstone uses collab planning by…",
      [
        ["Optional but valuable evidence of professional music ops if your signature show includes guests", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Requiring a 10-person band", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Replacing signal-flow maps", false, "Wrong — not the professional decision for this scenario."],
        ["Honors-only paperwork", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
  ],
});
