import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "managing-2-4-and-9-box-lives",
  programKey: "multiguest",
  title: "Quiz: Managing 2-, 4-, and 9-Box LIVEs",
  questions: [
    question(
      "q1",
      "When is a larger grid appropriate?",
      [
        ["When a rotating showcase or event has roles, timing, and verified capacity.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Whenever the host wants more activity.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Before checking what layouts exist.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["To make guests compete for attention.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q2",
      "What should a 4-person panel have?",
      [
        ["Distinct roles, opening order, and transition plan.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["No host involvement.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A gift leaderboard.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Private native chat.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q3",
      "A demo is too small to see in a grid. Best move?",
      [
        ["Reduce active tiles or give a verified featured turn and narrate clearly.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Add more tiles.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["Tell viewers to zoom.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Ignore the issue.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q4",
      "What is a 2-box best for?",
      [
        ["Depth: interview, co-hosting, or detailed exchange.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A nine-person talent show.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A Battle Mastery tactic.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A random open-seat room.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q5",
      "What must be verified in-app?",
      [
        ["Multi-guest availability, capacity, and actual layout/control options.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Whether 2-box is a product name.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A guest’s audience size.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A rank target.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q6",
      "A guest drops from a panel. Best response?",
      [
        ["Use the prepared fallback layout or host recap calmly.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["Blame them on air.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["End without a close.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["Fill the spot with a hostile commenter.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q7",
      "Why plan rotation?",
      [
        ["It makes entry, active contribution, and exit fair and understandable.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["It increases gift totals.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["It removes host responsibility.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["It guarantees every guest equal popularity.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
    question(
      "q8",
      "What is an emergency layout?",
      [
        ["A preplanned clear room structure after a drop, audio issue, or removal.", true, "Correct — this protects a clear, ethical, well-run multi-guest room."],
        ["A native TikTok breakout room.", false, "Wrong — that choice weakens professional hosting or guest safety."],
        ["A hidden guest chat.", false, "Wrong — it does not meet Multi-Guest LIVE Mastery standards."],
        ["A way to avoid moderation.", false, "Wrong — success is execution and care, not attention at any cost."],
      ],
    ),
  ],
});
