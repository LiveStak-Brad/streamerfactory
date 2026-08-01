import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "production-decisions-before-gear-purchases",
  programKey: "production",
  title: "Quiz: Production Decisions Before Gear Purchases",
  questions: [
    question(
      "q1",
      "A creator wants a new camera because a friend upgraded. Their audio is muddy and their light is a bare overhead bulb. Best next move?",
      [
        [
          "Audit setup and fix process/placement (audio + light) before any camera purchase",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Buy the same camera as the friend immediately",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Skip audit if gifts were good last week",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Only upgrade after 10,000 followers",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q2",
      "What makes an upgrade 'highest ROI' in Production Mastery?",
      [
        [
          "It removes the biggest trust leak for the least cost/effort, including free fixes",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "It is the most expensive item on a influencer shopping list",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "It has the most Amazon reviews regardless of their room",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "It adds the most animated overlays",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q3",
      "A Setup Audit Worksheet shows cluttered background and no mic check habit. Best decision memo conclusion?",
      [
        [
          "Do free/low-cost fixes first; delay gear until standards are written",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Buy a green screen and three cameras this week",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Ignore the audit because vibes feel fine",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Hire an agency to redesign everything",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q4",
      "When is 'buy nothing' the correct upgrade decision?",
      [
        [
          "When process and placement can close the gap without new hardware",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Never — professionals always buy weekly",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Only when broke",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Only after Capstone",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q5",
      "Brand favoritism shows up when a creator…",
      [
        [
          "Buys a logo because a streamer used it, without matching their constraints",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Compares two mics by placement and room noise rejection",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Chooses a stand that fits their desk height",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Writes a gear ROI scorecard",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q6",
      "Unsafe electrical practices are…",
      [
        [
          "Out of scope and never taught — use manufacturer-safe power only",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Fine if the stream looks brighter",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Required for 'pro' lighting",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Okay with daisy-chained power strips overloaded mid-LIVE",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q7",
      "Capstone connection for PD-01 means…",
      [
        [
          "The audit and decision memo become evidence in the production bible",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "You must buy gear before Capstone",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Honors Lab replaces the audit",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Viewer count proves the audit",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q8",
      "Mission success for this lesson is graded on…",
      [
        [
          "Completing the audit/memo and applying one free/low-cost fix",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "How many gifts arrive after buying gear",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Whether chat compliments the new camera",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Follower growth that week",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
  ],
});
