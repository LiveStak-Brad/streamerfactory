import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "building-battle-partners",
  programKey: "battles",
  title: "Quiz: Building battle partners",
  questions: [
    question(
      "q1",
      "You want a real battle partner network. What builds it?",
      [
        [
          "Reliability, respect, and repeated fair matches over time",
          true,
          "Correct — trust compounds into a partner network.",
        ],
        [
          "One viral clash then ghosting",
          false,
          "Wrong — burns the bridge.",
        ],
        [
          "Public callouts after every loss",
          false,
          "Wrong — toxic and short-sighted.",
        ],
        [
          "Paying people to pretend they like battling you",
          false,
          "Wrong — hollow and risky.",
        ],
      ],
    ),
    question(
      "q2",
      "A match went well with a new creator. Best next step?",
      [
        [
          "Thank them and propose a clear next time (day/window if you can)",
          true,
          "Correct — continuity turns one-offs into partners.",
        ],
        [
          "Block them so they cannot copy your style",
          false,
          "Wrong — fear-based and anti-network.",
        ],
        [
          "Aggressively raid their regulars on stream",
          false,
          "Wrong — damages reputation.",
        ],
        [
          "Never speak off-stream again",
          false,
          "Wrong — light coordination helps.",
        ],
      ],
    ),
    question(
      "q3",
      "Which is a red flag in a potential battle partner?",
      [
        [
          "Consistent disrespect toward chat or other creators",
          true,
          "Correct — culture risk spreads to your brand.",
        ],
        [
          "Clear communication of schedule",
          false,
          "Wrong — that is a green flag.",
        ],
        [
          "Willingness to practice and debrief",
          false,
          "Wrong — green flag.",
        ],
        [
          "Sportsmanship after losses",
          false,
          "Wrong — green flag.",
        ],
      ],
    ),
    question(
      "q4",
      "Why share expectations before match day?",
      [
        [
          "Aligning on vibe, timing, and boundaries prevents mid-battle conflict",
          true,
          "Correct — ambiguity causes friction when stakes feel high.",
        ],
        [
          "So you can demand they gift your side secretly",
          false,
          "Wrong — unethical.",
        ],
        [
          "So you can force them into your niche forever",
          false,
          "Wrong — partners remain themselves.",
        ],
        [
          "Expectations are unnecessary if you are talented",
          false,
          "Wrong — talent does not replace coordination.",
        ],
      ],
    ),
    question(
      "q5",
      "A partner network helps most because…",
      [
        [
          "You get scheduled reps and shared audiences inside a healthier ecosystem",
          true,
          "Correct — ecosystems beat isolated grinding.",
        ],
        [
          "You can ignore StreamerU skills afterward",
          false,
          "Wrong — skills still matter.",
        ],
        [
          "Platform rules no longer apply to collabs",
          false,
          "Wrong — false.",
        ],
        [
          "Quizzes become optional forever",
          false,
          "Wrong — false.",
        ],
      ],
    ),
    question(
      "q6",
      "Long-term partner strategy values…",
      [
        [
          "Mutual growth over single-scoreboard obsession",
          true,
          "Correct — networks compound beyond one night.",
        ],
        [
          "Destroying every partner’s confidence",
          false,
          "Wrong — short-sighted.",
        ],
        [
          "Never battling the same person twice",
          false,
          "Wrong — repeats build chemistry.",
        ],
        [
          "Hiding your schedule from partners",
          false,
          "Wrong — coordination needs clarity.",
        ],
      ],
    ),
    question(
      "q7",
      "Someone is a strong opponent but constantly disrespects your chat. What should you do?",
      [
        [
          "Treat it as a culture red flag — protect your room even if the scoreboard would be exciting",
          true,
          "Correct — brand and safety outrank a spicy matchup.",
        ],
        [
          "Keep booking them because wins matter more than culture",
          false,
          "Wrong — toxic partners train your room the wrong norms.",
        ],
        [
          "Match their disrespect to 'even the score'",
          false,
          "Wrong — escalates harm.",
        ],
        [
          "Publicly drag them for a week",
          false,
          "Wrong — burns energy and reputation.",
        ],
      ],
    ),
    question(
      "q8",
      "What proves this lesson’s mission?",
      [
        [
          "Real outreach/coordination toward fair battle partners plus a LIVE that demonstrates respectful collab habits",
          true,
          "Correct — networks are built by behavior, not wishful thinking.",
        ],
        [
          "Collecting usernames without ever messaging or booking",
          false,
          "Wrong — a list is not a network.",
        ],
        [
          "Winning every match this month",
          false,
          "Wrong — partnership quality is not winrate alone.",
        ],
        [
          "Skipping battles and only posting about finding partners",
          false,
          "Wrong — execution still matters.",
        ],
      ],
    ),
  ],
});
