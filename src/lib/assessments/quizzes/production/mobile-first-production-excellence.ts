import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "mobile-first-production-excellence",
  programKey: "production",
  title: "Quiz: Mobile-First Production Excellence",
  questions: [
    question(
      "q1",
      "Mobile excellence prioritizes…",
      [
        [
          "Stand stability, power, heat, and connectivity habits for long sessions",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Handholding the phone for six hours",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Ignoring battery warnings",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Only filming outdoors with no plan",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q2",
      "Heat management matters because…",
      [
        [
          "Phones throttle or fail when overheated during long LIVEs",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Heat improves skin tones",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Platforms require high temperature",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Heat replaces lighting",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q3",
      "Power management best practice?",
      [
        [
          "Plan charge/cable/power-bank strategy before a 90-minute session",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Start at 8% battery for urgency content",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Unplug randomly mid-sentence for 'raw' energy",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Run unsafe DIY battery mods",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q4",
      "Connectivity for mobile LIVEs should…",
      [
        [
          "Prefer stable connections and have a tested backup path when possible",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Only use congested public Wi-Fi with no test",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Never check signal before LIVE",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Stream over airplane mode",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q5",
      "Phone stand habit?",
      [
        [
          "Lock height/angle so framing stays consistent without hand shake",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Balance the phone on a soda can",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Change angle every 30 seconds for 'cinema'",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Cover the mic with the stand clamp",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q6",
      "Mission success is…",
      [
        [
          "Kit list + session log proving a 90-minute plan/rehearsal without preventable failure",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Buying a new phone brand tonight",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Chat saying 'mobile queen'",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "A Growth diagnosis",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q7",
      "Brand favoritism is avoided when…",
      [
        [
          "You choose stands/cables by fit and reliability criteria, not logo hype",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "You only use one celebrity's exact phone",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "You shame other creators' devices",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "You require viewers to buy your affiliate kit",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q8",
      "Core longer-lives callback means…",
      [
        [
          "Mobile production must survive longer sessions without preventable tech death",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Rewrite the entire Core structure lesson",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Skip audio because mobile is visual",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Only stream 5 minutes forever",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
  ],
});
