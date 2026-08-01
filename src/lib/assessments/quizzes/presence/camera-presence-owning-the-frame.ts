import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "camera-presence-owning-the-frame",
  programKey: "presence",
  title: "Quiz: Camera Presence — Owning the Frame",
  questions: [
    question("q1", "Owning the frame on LIVE primarily means…", [
      ["Framing, eye line, grounded posture, and stillness with life that read as intentional", true, "Correct — four trainable levers."],
      ["Buying expensive gear so the picture looks cinematic", false, "Wrong — intention beats cost."],
      ["Looking at the viewer count while you talk", false, "Wrong — breaks eye line trust."],
      ["Constantly leaning closer to seem energetic", false, "Wrong — restless motion reads as anxiety."],
    ]),
    question("q2", "Best eye-line pattern for arrivals is…", [
      ["Speak to the lens, glance at chat in bursts, return to the lens", true, "Correct — arrivals feel seen."],
      ["Stare only at comments for the whole segment", false, "Wrong — chat-buried eyes."],
      ["Never look at chat so you seem focused", false, "Wrong — ignore real guests."],
      ["Look at yourself in preview the entire time", false, "Wrong — self-surveillance, not hosting."],
    ]),
    question("q3", "You notice yourself frozen on preview mid-LIVE. Best recovery?", [
      ["Exhale, drop shoulders, take one intentional small action, keep talking", true, "Correct — freeze ends with action."],
      ["Apologize for looking awkward for two minutes", false, "Wrong — shame becomes the show."],
      ["End the LIVE immediately", false, "Wrong — unnecessary."],
      ["Start swaying hard to prove you are alive", false, "Wrong — overcorrection."],
    ]),
    question("q4", "Home position exists to…", [
      ["Make mid-stream posture resets mechanical", true, "Correct — mark chair/feet before Go Live."],
      ["Force you to never gesture", false, "Wrong — stillness with life allows intentional gesture."],
      ["Replace framing checks entirely", false, "Wrong — still set frame pre-LIVE."],
      ["Impress Honors Lab judges only", false, "Wrong — labs never gate; home position is for you."],
    ]),
    question("q5", "Presence Drill LIVE success is graded on…", [
      ["Whether framing, eye line, base, and stillness held — plus keep/fix notes", true, "Correct — behavior, not viewers."],
      ["Viewer count during the ten minutes", false, "Wrong — not the grade."],
      ["How expensive the background looks", false, "Wrong — calm beats expensive."],
      ["Skipping self-review if it felt fine", false, "Wrong — write keep/fix anyway."],
    ]),
    question("q6", "Mid-stream you keep tilting to fix uneven light. Better move?", [
      ["Fix light before Go Live or accept it and hold posture", true, "Correct — lighting theater reads unprepared."],
      ["Tilt constantly so half your face is always brighter", false, "Wrong — restless presence."],
      ["Turn the camera off until perfect", false, "Wrong — avoidable delay."],
      ["Blame chat for the shadows", false, "Wrong — not a fix."],
    ]),
    question("q7", "Capstone connection for this lesson?", [
      ["Drill notes become checklist evidence for the signature 20-minute LIVE", true, "Correct — visual floor of Capstone."],
      ["Camera work replaces Capstone entirely", false, "Wrong — still need full Capstone package."],
      ["Only Honors Lab requires framing practice", false, "Wrong — Capstone needs it; labs optional."],
      ["You can skip framing if voice is strong", false, "Wrong — arrivals judge the picture first."],
    ]),
    question("q8", "Self-review after the drill should be…", [
      ["One keep, one fix, and a quick score of the four levers", true, "Correct — improve one fix at a time."],
      ["A multi-page essay of every insecurity", false, "Wrong — novels stall practice."],
      ["Skipped if nobody gifted", false, "Wrong — gifts are irrelevant to presence grade."],
      ["Only about competitor creators", false, "Wrong — review your levers."],
    ]),
  ],
});
