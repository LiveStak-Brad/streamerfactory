import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "gaming-live-capstone-signature-show",
  programKey: "gaming",
  title: "Quiz: Gaming LIVE Capstone: Signature Gaming Show",
  questions: [
    question(
      "q1",
      "Your dossier has every artifact except a tested backup scene. Is the Capstone ready?",
      [
        ["No — a backup scene is a required artifact; the dossier is not ready until it's built and tested", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Yes — backup scenes are optional flourishes", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Yes, as long as viewer count was high on the recorded show", false, "Wrong — not the professional decision for this scenario."],
        ["Only required if you plan to use OBS", false, "Wrong — Gaming LIVE Mastery grades dossier completeness, not virality."],
      ],
    ),
    question(
      "q2",
      "Your replay recording failed to save. What is the correct fallback?",
      [
        ["File timestamped documentation (run-of-show, screenshots, partial clips, written report) explaining the method used", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Submit the Capstone with no proof at all", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Fabricate a replay link to avoid explaining the failure", false, "Wrong — not the professional decision for this scenario."],
        ["Skip the Capstone until you can re-record a 'perfect' show", false, "Wrong — Gaming LIVE Mastery grades dossier completeness, not virality."],
      ],
    ),
    question(
      "q3",
      "You scored several rubric categories as honest 3s with clear evidence sentences. Does this pass Capstone review?",
      [
        ["Yes — honest scoring with evidence and a real improvement plan is the standard, not a perfect score", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["No — every category must score a 5 to pass", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["No — scores don't matter if the stream had high viewership", false, "Wrong — not the professional decision for this scenario."],
        ["No — 3s mean you should not submit at all", false, "Wrong — Gaming LIVE Mastery grades dossier completeness, not virality."],
      ],
    ),
    question(
      "q4",
      "You haven't completed Advanced Creator yet, but your Capstone dossier is fully assembled. What happens?",
      [
        ["You may complete Capstone work as portfolio practice, but certificate award waits on Advanced Creator", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["The dossier work is wasted without Advanced Creator", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Gaming LIVE Lab / Honors replaces the Advanced Creator requirement", false, "Wrong — not the professional decision for this scenario."],
        ["Core Certification alone is enough to award the certificate", false, "Wrong — Gaming LIVE Mastery grades dossier completeness, not virality."],
      ],
    ),
    question(
      "q5",
      "A reviewer opens your dossier and cannot tell whether you used a stream key or a no-stream-key workflow. What's missing?",
      [
        ["Your stream-key or no-stream-key workflow documentation — a required artifact", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Nothing — reviewers should assume OBS with a key by default", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Nothing — this detail doesn't matter for Capstone review", false, "Wrong — not the professional decision for this scenario."],
        ["Only your soundboard plan is actually required", false, "Wrong — Gaming LIVE Mastery grades dossier completeness, not virality."],
      ],
    ),
    question(
      "q6",
      "What does the Capstone require regarding technical reliability and hosting?",
      [
        ["Both — a flawless setup with disengaged hosting, or charismatic hosting on a glitching setup, are each incomplete", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Only technical reliability matters; hosting is optional", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Only hosting energy matters; technical issues are forgivable if you're entertaining", false, "Wrong — not the professional decision for this scenario."],
        ["Neither matters if the game itself is exciting", false, "Wrong — Gaming LIVE Mastery grades dossier completeness, not virality."],
      ],
    ),
    question(
      "q7",
      "Is Gaming LIVE Lab / Honors required before the Gaming LIVE Mastery Certificate is awarded?",
      [
        ["No — it is optional and never gates certification; Advanced Creator plus Capstone is what's required", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Yes — Honors must be completed first", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Yes, but only for console creators", false, "Wrong — not the professional decision for this scenario."],
        ["Yes, and it replaces the Capstone requirement", false, "Wrong — Gaming LIVE Mastery grades dossier completeness, not virality."],
      ],
    ),
    question(
      "q8",
      "Mission success for the Gaming LIVE Capstone is graded on…",
      [
        ["Dossier completeness, show execution, and honest review — never viewers, gifts, or wins", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Whether you won your matches during the recorded show", false, "Wrong — that choice fights reliable gaming LIVE craft."],
        ["Total gifts received during the Signature Show", false, "Wrong — not the professional decision for this scenario."],
        ["Peak concurrent viewers during delivery", false, "Wrong — Gaming LIVE Mastery grades dossier completeness, not virality."],
      ],
    ),
  ],
});
