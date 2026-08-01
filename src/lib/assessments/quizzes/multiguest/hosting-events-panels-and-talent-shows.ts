import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "hosting-events-panels-and-talent-shows",
  programKey: "multiguest",
  title: "Quiz: Hosting Events, Panels, and Talent Shows",
  questions: [
    question(
      "q1",
      "What makes a talent-show score sheet ethical?",
      [
        ["It uses transparent craft criteria and never gifts, viewers, or rank.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["It ranks people by audience size.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["It invites harsh public comments.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["It hides criteria until after performances.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q2",
      "What belongs on an event run sheet?",
      [
        ["Pre-check, opening, segments, roles, backup, close, and review.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Only a title.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A native breakout plan.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Gift targets.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q3",
      "A panelist repeatedly interrupts. Best response?",
      [
        ["Restore speaking order and the participation standard.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Let them win the room.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Ask chat to attack them.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["End without explanation.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q4",
      "What is a fair talent-show exit?",
      [
        ["Thank the performer and let them leave without humiliation.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Force them to stay for ranking.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Read negative comments.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Make them defend a score.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q5",
      "Why assign a timekeeper?",
      [
        ["To protect the program and participant expectations.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["To increase conflict.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["To count viewers.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["To replace the host.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q6",
      "A segment has technical trouble. What should happen?",
      [
        ["Use a planned recap or audience prompt while resolving it.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Mock the participant.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Invent a new contest.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Hide the issue.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q7",
      "What should determine event selection?",
      [
        ["Published fit and participation process.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Rank.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Gifts.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Potential for drama.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q8",
      "What review question is useful?",
      [
        ["Did the promise, roles, moderation, and timing hold?", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Did every person become popular?", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Did the room receive enough gifts?", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Was there enough conflict?", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
  ],
});
