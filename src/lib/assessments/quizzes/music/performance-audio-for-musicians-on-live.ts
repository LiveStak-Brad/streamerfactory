import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "performance-audio-for-musicians-on-live",
  programKey: "music",
  title: "Quiz: Performance Audio for Musicians on LIVE",
  questions: [
    question(
      "q1",
      "Your interface shows in OBS but meters do not move. First check?",
      [
        ["Confirm the correct input channels, gain, mute/pad, cable path, and that the source is actually sending signal", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Buy a new interface immediately", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Add five compressors first", false, "Wrong — not the professional decision for this scenario."],
        ["Ignore it if the webcam looks fine", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q2",
      "Gain staging before filters means…",
      [
        ["Set clean source levels first, then add gate/compressor/EQ only as needed", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Max every fader then fix clipping with plugins", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Only use noise suppression at maximum forever", false, "Wrong — not the professional decision for this scenario."],
        ["Skip levels if you use USB mics", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q3",
      "Electric guitar into a mixer mic input without DI/Hi-Z often fails because…",
      [
        ["Impedance and level mismatch — use instrument/Hi-Z input or a DI into a mic-level path", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Guitars cannot be streamed", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["You must always mic an amp even for bedroom streams", false, "Wrong — not the professional decision for this scenario."],
        ["OBS cannot accept instrument audio ever", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q4",
      "TikTok LIVE Studio vs OBS for musicians?",
      [
        ["LIVE Studio has a simpler mixer/source model; many musicians pre-mix on interface/mixer and present one clean device — do not assume OBS-identical filters", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["They support identical VST chains always", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["LIVE Studio never needs device selection", false, "Wrong — not the professional decision for this scenario."],
        ["OBS cannot capture interfaces", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q5",
      "Viewers hear double vocals while you hear fine on headphones. Likely cause?",
      [
        ["Desktop/speakers or a second capture path is also sending the mic — remove the duplicate route", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["You need phantom power on a dynamic USB mic", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Sample rate is always irrelevant", false, "Wrong — not the professional decision for this scenario."],
        ["Double audio is required for music streams", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q6",
      "Best monitoring approach for singers when possible?",
      [
        ["Hardware direct monitoring with low latency; avoid relying on delayed software monitor loops while performing", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Bluetooth earbuds only", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Room speakers pointed at the vocal mic", false, "Wrong — not the professional decision for this scenario."],
        ["Monitor Off forever with no check", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q7",
      "Mission success for MU-02 is…",
      [
        ["Completed signal-flow map, sound check, and a short test clip documenting OBS or LIVE Studio path", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Buying three new microphones", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Hitting a gift goal during the test", false, "Wrong — not the professional decision for this scenario."],
        ["Skipping monitoring because meters moved once", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
    question(
      "q8",
      "Keyboard stereo into a mono path sounds thin/narrow. Fix?",
      [
        ["Preserve L/R correctly or intentionally mono-sum with level matching — do not hard-pan one side only by mistake", true, "Correct — matches Music LIVE Mastery standards for this lesson."],
        ["Always discard the right channel", false, "Wrong — that choice fights reliable music LIVE craft."],
        ["Add more reverb until it feels wide", false, "Wrong — not the professional decision for this scenario."],
        ["Switch to Bluetooth MIDI only", false, "Wrong — Music LIVE Mastery grades execution and rights-aware craft, not virality."],
      ],
    ),
  ],
});
