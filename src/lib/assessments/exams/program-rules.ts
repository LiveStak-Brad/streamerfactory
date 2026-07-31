import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Advanced Creator.
 * programKey remains `rules` so local/server assessment IDs stay stable after
 * the Rules & Safety → Advanced Creator reorganization.
 */
export const exam = programFinal({
  programKey: "rules",
  programName: "Advanced Creator",
  title: "Program Final: Advanced Creator",
  questions: [
    question("ac1", "Advanced Creator exists to mark the shift from…", [
      [
        "I can stream → I operate like a professional",
        true,
        "Correct — the black-belt bridge after Core.",
      ],
      ["Hobbyist → agency owner who recruits creators", false, "Wrong — StreamerU does not teach agency ownership."],
      ["Core Graduate → finished learning forever", false, "Wrong — Mastery Paths continue after."],
      ["Safe creator → rules no longer matter", false, "Wrong — safety stays."],
    ]),
    question("ac2", "A Creator Operating System is best described as…", [
      [
        "A one-page weekly agreement: aim, calendar, one metric, capacity rules, review",
        true,
        "Correct — AC-01.",
      ],
      ["A binder of every dashboard metric available", false, "Wrong — one metric leads."],
      ["A motivational quote board", false, "Wrong — not operational."],
      ["An agency SOP for managing other creators", false, "Wrong — outside scope."],
    ]),
    question("ac3", "Brand that survives the feed is primarily…", [
      [
        "A three-second promise plus three proof behaviors",
        true,
        "Correct — AC-02.",
      ],
      ["A finished logo before any LIVE habits", false, "Wrong — promise first."],
      ["A new persona every session", false, "Wrong — that creates confusion."],
      ["Whatever is trending this hour", false, "Wrong — brand leaks."],
    ]),
    question("ac4", "Weekly LIVE analytics literacy means…", [
      [
        "Three metrics (Integrity, Experience, Relationship) and one decision",
        true,
        "Correct — AC-03.",
      ],
      ["Screenshotting peaks and calling it a system", false, "Wrong — screenshots ≠ analysis."],
      ["Making someone else's gift total your OS metric", false, "Wrong — vanity trap."],
      ["Ignoring missed days if one peak felt good", false, "Wrong — Integrity vetoes that."],
    ]),
    question("ac5", "Creative planning for real weeks requires…", [
      [
        "A two-week plan and a reusable segment bank (10+), not inventing the show at Go Live",
        true,
        "Correct — AC-04.",
      ],
      ["A year-long novel script before every session", false, "Wrong — overplanning trap."],
      ["Zero prep to stay authentic", false, "Wrong — panic is not authenticity."],
      ["Changing niche every LIVE for novelty", false, "Wrong — brand leak."],
    ]),
    question("ac6", "A professional growth experiment…", [
      [
        "Changes one ethical variable with success criteria and a kill rule",
        true,
        "Correct — AC-05.",
      ],
      ["Changes niche, schedule, and CTA in the same week", false, "Wrong — thrash."],
      ["Breaks safety if reach might improve", false, "Wrong — never."],
      ["Needs no log if you feel confident", false, "Wrong — no log, no learning."],
    ]),
    question("ac7", "Professional standards on LIVE prioritize…", [
      [
        "Predictable time, chat, recovery, and reputation hygiene — written for tired days",
        true,
        "Correct — AC-06.",
      ],
      ["Being corporate and joyless at all times", false, "Wrong — reliable, not joyless."],
      ["Rage content whenever growth stalls", false, "Wrong — reputation risk."],
      ["Silent cancellations as a growth hack", false, "Wrong — silence trains distrust."],
    ]),
    question("ac8", "Privacy and security hygiene means…", [
      [
        "Account recovery/2FA habits, pattern control, and clear never-on-LIVE boundaries",
        true,
        "Correct — AC-07.",
      ],
      ["Sharing your address to seem authentic", false, "Wrong — unsafe."],
      ["Letting sketchy growth tools hold your login", false, "Wrong — security failure."],
      ["Skipping Core safety because you are advanced", false, "Wrong — safety scales with you."],
    ]),
    question("ac9", "The Advanced Creator Capstone is…", [
      [
        "A 30-day Pro Sprint with a reviewable dossier and before/after retrospective",
        true,
        "Correct — AC-08.",
      ],
      ["Watching the final lesson without running the month", false, "Wrong — time evidence required."],
      ["An agency launch project", false, "Wrong — outside scope."],
      ["Optional fluff with no packet", false, "Wrong — objectively reviewable."],
    ]),
    question("ac10", "Honors Labs after Advanced Creator…", [
      [
        "Are optional portfolio/mentor reviews and never gate the certificate",
        true,
        "Correct — honors, not gates.",
      ],
      ["Must be finished before Capstone counts", false, "Wrong — non-gating."],
      ["Replace the Program Final", false, "Wrong — final still required."],
      ["Are required for Core Graduation", false, "Wrong — Advanced Creator optional honors."],
    ]),
    question("ac11", "This program certificate requires…", [
      [
        "Advanced Creator lessons complete (including Capstone path) plus this final passed",
        true,
        "Correct — exam-gated black belt.",
      ],
      ["Ignoring brand, analytics, and standards", false, "Wrong — they are the focus."],
      ["Failing Beginner Foundations on purpose", false, "Wrong — Core stays required."],
      ["Paying for Manager College", false, "Wrong — false."],
    ]),
    question("ac12", "After Advanced Creator you are preparing to…", [
      [
        "Specialize via Mastery Paths — Presence recommended first for most creators",
        true,
        "Correct — black belt unlocks craft specialization.",
      ],
      ["Treat platform rules as optional", false, "Wrong — never."],
      ["Stop learning because the university is finished", false, "Wrong — Mastery Paths continue."],
      ["Skip all further credentials", false, "Wrong — Professional/Career ladders continue."],
    ]),
  ],
});
