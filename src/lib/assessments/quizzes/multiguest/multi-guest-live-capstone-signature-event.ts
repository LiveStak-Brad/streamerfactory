import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "multi-guest-live-capstone-signature-event",
  programKey: "multiguest",
  title: "Quiz: Multi-Guest LIVE Capstone: Signature Event",
  questions: [
    question(
      "q1",
      "What makes capstone evidence objectively reviewable?",
      [
        ["A concept, lineup, run sheet, questions, mods, backup, technical check, replay review, and improvement report.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A claim that the event was popular.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A gift total.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A rank screenshot.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q2",
      "What should the capstone technical check verify?",
      [
        ["Actual in-app guest/layout controls, audio awareness, handoffs, emergency layout, and removal workflow.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Guaranteed 9-box availability.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["OBS/TikTok feature parity.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A viewer target.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q3",
      "A guest drops during the event. Best capstone behavior?",
      [
        ["Use the backup segment, continue safely, and document the improvement.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Blame the guest.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Create conflict for attention.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Abandon all evidence.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q4",
      "What is a useful improvement report?",
      [
        ["Cause, specific change, and next test based on replay evidence.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A promise to get more viewers.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A complaint about rank.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A list of gifts.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q5",
      "What should open the signature event?",
      [
        ["Audience promise, format orientation, and conduct standard.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A surprise guest confrontation.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A payment demand.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["An unverified feature claim.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q6",
      "Why file moderator assignments?",
      [
        ["They show safety coverage and responsibility before the room opens.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["They guarantee growth.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["They replace host judgment.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["They create a private guest chat.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q7",
      "Can a small two-person event meet capstone standard?",
      [
        ["Yes, if it has clear purpose, preparation, safe delivery, and evidence.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["No, it must use nine guests.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Only if it wins a Match.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Only with gifts.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q8",
      "What should the host do if safety requires ending early?",
      [
        ["End professionally, protect people, and document the reason and next improvement.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Keep going for engagement.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Invite chat to decide.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Publicly shame the cause.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
  ],
});
