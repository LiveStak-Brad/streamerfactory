import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "interviewing-creators-like-a-professional",
  programKey: "multiguest",
  title: "Quiz: Interviewing Creators Like a Professional",
  questions: [
    question(
      "q1",
      "What is a useful interview opening question?",
      [
        ["What did you test before choosing that format?", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Tell us everything about your life.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Why are you controversial?", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Can you answer three questions at once?", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q2",
      "A surprising answer appears. Best host move?",
      [
        ["Ask a relevant follow-up based on what the guest said.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Ignore it for the next scripted question.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Challenge the guest to create drama.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Read a rumor from chat.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q3",
      "What is research for?",
      [
        ["Relevant context, accurate introduction, and useful questions.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Finding private details.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Ranking a guest.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Guaranteeing a viral clip.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q4",
      "How should invasive audience questions be handled?",
      [
        ["Decline or reframe them and protect the agreed boundary.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Read them because chat asked.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Require an answer.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Make the guest defend privacy.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q5",
      "What does one-question-at-a-time prevent?",
      [
        ["Confusion and a host who cannot listen.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Professional structure.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Guest autonomy.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Clear answers.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q6",
      "What should an interview close include?",
      [
        ["A concrete reflection, specific thanks, and voluntary final message.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A forced promotion.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A surprise personal question.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A viewer goal.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q7",
      "What does CM-08 provide here?",
      [
        ["A Community Mastery interviewing foundation that this lesson deepens live.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Battle strategy.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Native private chat.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Ranking rules.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q8",
      "A guest gives a brief answer. Best response?",
      [
        ["Offer a narrower prompt or move on without pressure.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Demand a longer story.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Ask chat to pressure them.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Assume they are hostile.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
  ],
});
