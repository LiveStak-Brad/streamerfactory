import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "troubleshooting-under-pressure",
  programKey: "production",
  title: "Quiz: Troubleshooting Under Pressure",
  questions: [
    question(
      "q1",
      "A triage tree should order checks like…",
      [
        [
          "Audio → video → network → app → power (adapt as trained) with calm steps",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Smash every button simultaneously",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Blame trolls first",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Rewire household electricity live",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q2",
      "Recovering a simulated failure in under two minutes proves…",
      [
        [
          "You can execute a written triage card under stress",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "You never need backups",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Panic is the strategy",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Honors Lab is mandatory",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q3",
      "Network redundancy thinking means…",
      [
        [
          "Have a tested backup path/plan when your primary connection fails",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Always stream on the weakest café Wi-Fi for challenge content",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Disable auto-reconnect forever",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Share illegal network hacks",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q4",
      "Post-incident review should capture…",
      [
        [
          "What failed, what triage step worked, and one prevention change",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Only gift totals during the outage",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "A public rant script",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Nothing — never look back",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q5",
      "PR-08 / MS-06 callbacks mean…",
      [
        [
          "Composure and crisis thinking help; this lesson supplies the tech triage system",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Replace Presence and Mindset entirely",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Skip tech cards if you feel confident",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Yell recovery lines instead of fixing audio",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q6",
      "If audio dies mid-LIVE, first calm move is usually…",
      [
        [
          "Follow the audio branch of your triage card (mute/check source/cable/levels) before reinventing the show",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Throw the mic",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Start a battle immediately",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Discuss tax strategy",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q7",
      "Unsafe 'fixes' are…",
      [
        [
          "Never taught — no illegal tools, no dangerous electrical improvisation",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Fine if the stream stays up",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Required for Capstone",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Recommended for Honors",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q8",
      "Mission success is…",
      [
        [
          "Documented recovery of a simulated failure using the triage tree under two minutes",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Never practicing because real panic is more authentic",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Viewer sympathy gifts during outages",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Buying a second house studio",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
  ],
});
