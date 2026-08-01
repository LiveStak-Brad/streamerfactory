import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "becoming-a-better-multi-guest-host",
  programKey: "multiguest",
  title: "Quiz: Becoming a Better Multi-Guest Host",
  questions: [
    question(
      "q1",
      "Two guests answer at once. What should the host do?",
      [
        ["Pause respectfully, name an order, and return to the interrupted speaker.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Let them compete for volume.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Mute both without explanation.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Ask chat who should win.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q2",
      "What belongs in a professional opening?",
      [
        ["Topic, purpose, guest orientation, participation standard, and first segment.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A viewer goal and gift challenge.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["An unverified feature tutorial.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A promise that nothing can go wrong.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q3",
      "Why use transition language?",
      [
        ["It changes segments clearly without talking over or humiliating guests.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["It makes the host sound more important.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["It avoids listening.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["It creates conflict.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q4",
      "A guest’s audio stops working. Best recovery?",
      [
        ["State the useful fact, run a backup prompt, and let them reconnect without blame.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Mock their setup.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["End the entire event immediately.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Demand they fix it while speaking.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q5",
      "What does a speaking-order guide protect?",
      [
        ["Fair opportunity to contribute in a multi-person room.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Rank position.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Native private chat access.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Gift totals.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q6",
      "A quiet guest has not spoken. Best handoff?",
      [
        ["Offer a specific, low-pressure question or an explicit pass.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Call them out for being silent.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Ignore them.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Ask viewers to pressure them.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q7",
      "What should a close include?",
      [
        ["A recap, specific thanks, and a clear release for guests.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A long unscripted afterparty.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A ranking of who performed best.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A request for more gifts.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q8",
      "Which evidence shows host leadership?",
      [
        ["A run sheet and replay notes showing openings, handoffs, and recovery.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A large viewer count.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A screenshot of rank.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A claim that guests liked it.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
  ],
});
