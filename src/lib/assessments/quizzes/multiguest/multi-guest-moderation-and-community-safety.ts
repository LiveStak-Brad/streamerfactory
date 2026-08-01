import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "multi-guest-moderation-and-community-safety",
  programKey: "multiguest",
  title: "Quiz: Multi-Guest Moderation and Community Safety",
  questions: [
    question(
      "q1",
      "A guest becomes offensive after a clear boundary. What is appropriate?",
      [
        ["Use the verified removal workflow and a brief neutral statement.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Ask chat to mock them.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Keep them for engagement.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Start a public argument.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q2",
      "What should moderators know?",
      [
        ["The room purpose, boundaries, roles, and escalation threshold.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Only a follower goal.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["How to create conflict.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A promise of private native chat.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q3",
      "A viewer targets a vulnerable participant. First priority?",
      [
        ["Protect the person, remove targeting, and avoid exposing private information.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Ask the participant to defend themselves.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Read the messages to the room.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Wait for higher viewer count.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q4",
      "What is an escalation ladder for?",
      [
        ["Matching response to severity and repetition, from redirect to removal/report.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Making every error a public debate.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Avoiding host controls.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Ranking guests.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q5",
      "How should a host handle good-faith disagreement?",
      [
        ["Set turns, summarize ideas accurately, and stop personal attacks.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Encourage insults for energy.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Let the loudest participant decide.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Promise a battle strategy.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q6",
      "Why not read abusive comments aloud?",
      [
        ["It amplifies harm and can invite dogpiling.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["It improves moderation speed.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["It protects privacy.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["It guarantees reporting.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q7",
      "What must be verified before relying on it?",
      [
        ["Your own app’s emergency host controls and menu options.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A viewer’s age.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Gift targets.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["An old tutorial’s labels.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q8",
      "What is never an acceptable safety tactic?",
      [
        ["Humiliation, harassment, dogpiling, or clickbait conflict.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A calm redirect.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A moderator brief.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A documented debrief.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
  ],
});
