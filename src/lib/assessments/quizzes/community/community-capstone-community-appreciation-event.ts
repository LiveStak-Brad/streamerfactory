import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "community-capstone-community-appreciation-event",
  programKey: "community",
  title: "Quiz: Community Capstone — Community Appreciation Event",
  questions: [
    question("q1", "The Community Capstone requires…", [
      [
        "Planning, hosting, and reviewing one Community Appreciation Event with a reviewable evidence pack",
        true,
        "Correct — portfolio Capstone.",
      ],
      ["A guaranteed viral appreciation night", false, "Wrong — never promise virality."],
      ["Gift record highs as the primary grade", false, "Wrong — execution + artifacts grade."],
      ["Community Lab approval before the event counts", false, "Wrong — Lab never gates."],
    ]),
    question("q2", "Objectively reviewable Capstone evidence includes…", [
      [
        "Run-of-show, recognition moments, follow-up plan, and after-action review others can assess",
        true,
        "Correct — not vibes alone.",
      ],
      ["A feeling that chat was wholesome", false, "Wrong — feelings are not evidence."],
      ["Peak viewer screenshots only", false, "Wrong — incomplete and not the grade."],
      ["Bought engagement proof", false, "Wrong — banned and invalid."],
    ]),
    question("q3", "Capstone success is defined as…", [
      [
        "Execution plus reviewable artifacts — not gift totals or peak viewers",
        true,
        "Correct — explicit grading standard.",
      ],
      ["Highest gift total on the path", false, "Wrong — not the grade."],
      ["Biggest concurrent viewers of your career", false, "Wrong — not the grade."],
      ["Skipping after-action if the night felt good", false, "Wrong — review is required."],
    ]),
    question("q4", "Community Lab / Mastery Honors…", [
      [
        "Is optional after the certificate and never gates certification",
        true,
        "Correct — Labs → Honors only.",
      ],
      ["Is required for the Community Mastery Certificate", false, "Wrong — never a gate."],
      ["Replaces the Capstone event", false, "Wrong — Capstone is required; Lab is optional after."],
      ["Is only for agency managers", false, "Wrong — for creators after certificate."],
    ]),
    question("q5", "Compared with CC-06 Community Events on LIVE, this Capstone is…", [
      [
        "Culture and ops proof via an appreciation event — not Content Creation themed-series craft",
        true,
        "Correct — boundary vs CC-06.",
      ],
      ["The same themed-series assignment under a new name", false, "Wrong — different path purpose."],
      ["Only about editing promo clips", false, "Wrong — hosting + culture systems."],
      ["A monetization goal night", false, "Wrong — appreciation ≠ gift contest."],
    ]),
    question("q6", "Recognition on Capstone night should…", [
      [
        "Celebrate belonging habits, helpers, returners, and newcomers — not only gifters",
        true,
        "Correct — appreciation breadth.",
      ],
      ["Only name top gifters", false, "Wrong — gift-only fails the culture test."],
      ["Skip names to save time", false, "Wrong — recognition moments are required evidence."],
      ["Shame people who missed the event", false, "Wrong — guilt is not appreciation."],
    ]),
    question("q7", "Integrating CM-01 through CM-09 means…", [
      [
        "Showing thesis/rituals, return habits, roles, conflict/health/inclusion readiness, optional guest craft if used, and reputation hygiene in the real event",
        true,
        "Correct — full-path ops proof.",
      ],
      ["Listing lesson titles in chat once", false, "Wrong — must operate the systems."],
      ["Only using networking DMs and skipping the LIVE", false, "Wrong — event LIVE required."],
      ["Replacing conflict prep because it is a happy night", false, "Wrong — readiness still required."],
    ]),
    question("q8", "Capstone LIVE Mission success is…", [
      [
        "Hosted appreciation event with full evidence pack filed — run-of-show, recognition, follow-up, after-action",
        true,
        "Correct — execution + artifacts.",
      ],
      ["Lab Honors badge before the replay ends", false, "Wrong — Lab is optional after certificate."],
      ["A gift goal completion screenshot", false, "Wrong — not the grade."],
      ["Skipping the review if promo looked good", false, "Wrong — after-action required."],
    ]),
  ],
});
