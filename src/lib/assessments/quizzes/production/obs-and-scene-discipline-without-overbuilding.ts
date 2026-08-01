import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "obs-and-scene-discipline-without-overbuilding",
  programKey: "production",
  title: "Quiz: OBS and Scene Discipline (Without Overbuilding)",
  questions: [
    question(
      "q1",
      "Three-scene discipline typically means…",
      [
        [
          "A small set like Starting Soon / Main / BRB (or equivalent) you can run under stress",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Twenty scenes with unique animations each",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "No scenes — improvise every click",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Scenes only for battles",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q2",
      "Overbuilding hurts because…",
      [
        [
          "Complexity fails under stress and can drop frames or confuse you mid-LIVE",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "OBS forbids more than one source",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Viewers hate any lower-third ever",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Capstone bans overlays entirely",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q3",
      "A tech-fail backup plan should include…",
      [
        [
          "A simplified emergency path (scene/profile/mobile fallback) you rehearsed",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Pirated plugins that 'auto-fix' everything",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Yelling at chat until it reconnects",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Unsafe power resets with wet hands",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q4",
      "Legal OBS guidance means…",
      [
        [
          "Use legitimate free/paid tools — never illegal cracked software",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Torrent premium suites",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Bypass platform rules with injectors",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Share cracked stream keys",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q5",
      "Battle overlay caution (BT-05) here means…",
      [
        [
          "Don't let overlays destroy clarity — keep scenes readable",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Battles require 15 animated alerts always",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Never use OBS for battles",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Overlays replace audio checks",
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
          "A three-scene system + backup plan rehearsed under stress once",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "The flashiest transition pack",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Viewer count during rehearsal",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Buying a hardware switcher first",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q7",
      "Hotkeys help when…",
      [
        [
          "They map to your minimal scenes so you can switch without hunting menus",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "You bind fifty unused effects",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "You hide the panic slate forever",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "You disable Studio Mode always",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
    question(
      "q8",
      "If GPU is melting on complex scenes…",
      [
        [
          "Simplify sources/scenes; reliability beats decoration",
          true,
          "Correct — matches Production Mastery standards for this lesson.",
        ],
        [
          "Add more webcams",
          false,
          "Wrong — that choice fights the production-systems approach.",
        ],
        [
          "Increase bitrate blindly",
          false,
          "Wrong — not the professional decision for this scenario.",
        ],
        [
          "Ignore dropped frames",
          false,
          "Wrong — production quality is graded on systems and implementation.",
        ],
      ],
    ),
  ],
});
