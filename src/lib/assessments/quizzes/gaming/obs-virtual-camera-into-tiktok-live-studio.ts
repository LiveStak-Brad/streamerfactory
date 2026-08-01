import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "obs-virtual-camera-into-tiktok-live-studio",
  programKey: "gaming",
  title: "Quiz: OBS Virtual Camera into TikTok LIVE Studio",
  questions: [
    question(
      "q1",
      "What does OBS Virtual Camera actually carry into TikTok LIVE Studio?",
      [
        ["Video only — never audio", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Full mixed audio and video together", false, "Wrong — this is the single most important fact in this lesson, and it is false."],
        ["Audio only, with video handled separately", false, "Wrong — it is the reverse: video only, audio handled separately."],
        ["Neither audio nor video — just a scene-switch signal", false, "Wrong — Virtual Camera does carry the picture."],
      ],
    ),
    question(
      "q2",
      "Your stream has picture but no sound after adding OBS Virtual Camera as a camera source. Likely cause?",
      [
        ["Audio was never routed separately — Virtual Camera never carries sound", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Your webcam resolution is set too low", false, "Wrong — resolution does not affect whether audio exists."],
        ["LIVE Studio is broken and needs reinstalling", false, "Wrong — this is an expected result of skipping the audio-routing step."],
        ["OBS Virtual Camera silently muted your microphone", false, "Wrong — Virtual Camera does not touch microphone state; it simply never carries audio."],
      ],
    ),
    question(
      "q3",
      "What is the recommended default audio path for this workflow?",
      [
        ["Route audio through LIVE Studio's own mic/device selection, independent of OBS", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Always use a virtual audio cable, even with a simple setup", false, "Wrong — that adds unnecessary complexity for most creators."],
        ["Rely on OBS Virtual Camera to carry the mix automatically", false, "Wrong — Virtual Camera never carries audio."],
        ["Skip audio setup and add it after your first LIVE", false, "Wrong — audio must be verified before going LIVE, not after."],
      ],
    ),
    question(
      "q4",
      "When is the virtual-audio-cable-plus-OBS-monitoring path appropriate?",
      [
        ["Only when a complex OBS-built audio mix genuinely cannot be reproduced through LIVE Studio's own device selection", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["For every single Virtual Camera setup, as a default", false, "Wrong — it adds complexity and should be used only when needed."],
        ["Never — this path should never be used under any circumstances", false, "Wrong — it is a legitimate secondary path for specific complex mixes."],
        ["Only if you also want to bypass stream-key eligibility", false, "Wrong — this workflow is not a bypass of anything and should never be framed that way."],
      ],
    ),
    question(
      "q5",
      "Chat reports hearing your voice twice. What should you check?",
      [
        ["Whether two audio paths (for example, LIVE Studio's direct selection and a virtual cable) are both active for the same sound source", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Your Virtual Camera frame rate setting", false, "Wrong — frame rate does not cause duplicate audio."],
        ["Whether your webcam has two lenses", false, "Wrong — not a real audio-routing concern."],
        ["Whether your game's in-game audio settings are too loud", false, "Wrong — loudness is a separate issue from duplicated audio paths."],
      ],
    ),
    question(
      "q6",
      "How should you verify picture/audio sync before trusting this setup live?",
      [
        ["Run a clap or count-in test and review the recorded clip for drift", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Assume sync is fine if OBS's preview looks normal", false, "Wrong — OBS's own preview does not confirm sync through the separate audio path."],
        ["Ask viewers live whether it looks synced", false, "Wrong — verify privately before going LIVE, not by testing on your audience."],
        ["Skip sync checks since Virtual Camera guarantees sync automatically", false, "Wrong — picture and audio travel through separate systems and can drift."],
      ],
    ),
    question(
      "q7",
      "LIVE Studio does not detect OBS Virtual Camera mid-session. First recovery step?",
      [
        ["Confirm Virtual Camera is actually started in OBS, then reopen LIVE Studio's camera-source list", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Immediately restart your entire computer", false, "Wrong — that is a last resort, not the first step."],
        ["Switch to a completely different game", false, "Wrong — not related to the actual detection problem."],
        ["Assume the workflow is broken and abandon it permanently", false, "Wrong — this is a common, recoverable failure with a known sequence."],
      ],
    ),
    question(
      "q8",
      "How should this workflow be understood in relation to platform rules?",
      [
        ["It is a legitimate, supported LIVE Studio camera-source workflow — not a bypass of stream-key eligibility or platform requirements", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["It is a way to stream directly from OBS without ever needing LIVE Studio", false, "Wrong — you are still publishing through LIVE Studio under its own rules."],
        ["It is a workaround for creators who are not eligible for a stream key", false, "Wrong — this course never frames or teaches it as a workaround."],
        ["It requires disabling TikTok's own eligibility checks", false, "Wrong — no such action is part of this workflow."],
      ],
    ),
  ],
});
