import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "designing-great-conversations-for-multi-guest-live",
  programKey: "multiguest",
  title: "Quiz: Designing Great Conversations for Multi-Guest LIVE",
  questions: [
    question(
      "q1",
      "A guest gives an unexpectedly useful answer. Best host move?",
      [
        ["Summarize the point and use it to shape a relevant follow-up.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Return to the script word for word.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Ignore it to save time.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Ask a more personal question for drama.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q2",
      "What belongs at the top of a conversation plan?",
      [
        ["One clear audience outcome.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A gift target.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A promise of native polls.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A list of controversial topics.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q3",
      "How should a host handle an invasive audience question?",
      [
        ["Decline or reframe it and offer the guest a pass.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Read it exactly because chat requested it.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Require the guest to answer.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Let other guests guess the answer.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q4",
      "What is a question ladder for?",
      [
        ["Moving from context to useful detail, comparison, and audience application.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Making guests compete for attention.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Replacing listening with a script.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Picking the loudest audience comment.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q5",
      "A timing map should primarily…",
      [
        ["Give the room a rhythm while allowing meaningful answers and recovery.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Cut every speaker at identical seconds.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Guarantee room growth.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Replace a moderator.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q6",
      "How can a host make listening visible?",
      [
        ["Reflect a guest’s point before making the next handoff.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Say “next question” without acknowledgement.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Repeat their answer louder.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Change subjects whenever chat moves.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q7",
      "What should happen to a good off-topic idea?",
      [
        ["Park it respectfully for another session or return it to scope.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Force it into the current segment.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Use it to start conflict.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Dismiss the guest.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q8",
      "What is a safe participation route?",
      [
        ["Select and read relevant questions neutrally, with moderation when possible.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Promise private guest chat in TikTok.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Bring every commenter into the room.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Reward hostile questions with more airtime.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
  ],
});
