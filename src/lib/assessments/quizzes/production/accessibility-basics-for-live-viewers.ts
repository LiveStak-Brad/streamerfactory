import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "accessibility-basics-for-live-viewers",
  programKey: "production",
  title: "Quiz: Accessibility Basics for LIVE Viewers",
  questions: [
    question(
      "q1",
      "LIVE accessibility basics include…",
      [
        [
          "Clear speech, readable text, contrast, and inclusive hosting habits",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Tiny cursive overlays for aesthetic",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Low-contrast white text on bright windows",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Speaking only in unexplained insider slang",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q2",
      "Readable on-screen text should…",
      [
        [
          "Be large enough, high-contrast, and not collide with platform UI",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Cover the face entirely",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Blink rapidly for attention",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Use five fonts at once",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q3",
      "Contrast failures hurt because…",
      [
        [
          "Viewers can't read goals/names/CTAs — friction rises and trust drops",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "They increase bitrate",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "They improve SEO automatically",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Platforms require low contrast",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q4",
      "Inclusive hosting (production lens) means…",
      [
        [
          "Habits that reduce friction for more viewers without rewriting Community CM-06",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "A full moderation handbook rewrite",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Never greeting anyone",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Only serving returning whales",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q5",
      "Five accessibility upgrades mission means…",
      [
        [
          "Apply five concrete upgrades to setup/hosting and document them",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Buy five expensive gadgets",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Post five TikToks about accessibility theory",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Skip if you already have gifts",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q6",
      "PR-02 voice callback here is…",
      [
        [
          "Brief — clear speech supports access; this lesson doesn't reteach full vocal training",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "A full Presence rewrite",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Ignored entirely always",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Replaced by overlays",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q7",
      "Capstone evidence for PD-08 is…",
      [
        [
          "Accessibility checklist applied to your real show",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "A legal certification as an auditor",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Viewer medical data collection",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Agency compliance paperwork",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q8",
      "If chat says they can't read your goal text…",
      [
        [
          "Treat it as a production defect — fix size/contrast/placement",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Tell them to buy better phones",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Ignore it as a vibe issue",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Add more animations",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
  ],
});
