import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "guest-selection-and-preparation",
  programKey: "multiguest",
  title: "Quiz: Guest Selection and Preparation",
  questions: [
    question(
      "q1",
      "What should a guest invitation include?",
      [
        ["Topic, role, time, duration, expectations, and ability to decline or leave.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Only a request to bring viewers.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A promise of native greenroom access.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A surprise debate topic.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q2",
      "Why run a tech check?",
      [
        ["To solve access and audio issues respectfully before the room.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["To judge a guest publicly.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["To guarantee a viewer total.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["To teach unverified controls.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q3",
      "A guest declines a personal question. Best host response?",
      [
        ["Confirm the boundary and revise or skip the question.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Ask chat to persuade them.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Insist because they agreed to appear.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Turn it into a joke.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q4",
      "How should a host select a guest?",
      [
        ["For a defined contribution that fits the audience promise.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["For likelihood of conflict.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["For rank.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["For gift potential.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q5",
      "What is a sound no-show plan?",
      [
        ["A solo alternate or shorter segment that protects the guest’s privacy.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Publicly reading their messages.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Inviting random viewers to replace them.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Cancelling with blame.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q6",
      "What does a prep brief protect?",
      [
        ["Clarity, consent, timing, and a fair exit.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Only the host’s brand.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A promise of feature parity.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A competitive advantage in Battle Mastery.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q7",
      "A guest’s connection is weak. Best approach?",
      [
        ["Adapt the segment or reschedule without shame.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Pressure them to join anyway.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Mock the setup.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Hide the issue until live.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q8",
      "What should never be claimed as native TikTok without verification?",
      [
        ["Greenrooms, breakouts, polls, and private guest chat.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Panel and grid layouts.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["That menu names change.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["That capacity varies.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
  ],
});
