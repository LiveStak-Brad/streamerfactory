import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Battle Mastery (programKey `battle`).
 */
export const exam = programFinal({
  programKey: "battle",
  programName: "Battle Mastery",
  title: "Program Final: Battle Mastery",
  questions: [
    question("bt1", "Battle Mastery answers which core question?", [
      [
        "How do I consistently perform at a high level in LIVE battles while creating entertaining, ethical competitive experiences?",
        true,
        "Correct — elite craft and entertainment, not manipulation.",
      ],
      ["How do I maximize gifts with guilt and pressure?", false, "Wrong — forbidden."],
      ["How do battles work for the first time?", false, "Wrong — Core already taught that."],
      ["How do I fake rivalries for drama?", false, "Wrong — unethical."],
    ]),
    question("bt2", "Battle strategy beyond basics (BT-01) starts by…", [
      [
        "Using a matchup scorecard and knowing when to refuse an invite",
        true,
        "Correct — BT-01.",
      ],
      ["Accepting every invite to look busy", false, "Wrong — strategy includes no."],
      ["Only battling much larger creators for clout", false, "Wrong — mismatch often hurts entertainment."],
      ["Skipping prep if you feel lucky", false, "Wrong — systems beat vibes."],
    ]),
    question("bt3", "Energy architecture for timed battles means…", [
      [
        "Designing openings, mid-fight resets, and final-minute craft without sounding desperate",
        true,
        "Correct — BT-02.",
      ],
      ["Screaming the entire round", false, "Wrong — unsustainable and desperate."],
      ["Ignoring the clock", false, "Wrong — battles are timed theater."],
      ["Saving all energy for insults", false, "Wrong — sportsmanship."],
    ]),
    question("bt4", "Partner ecosystems emphasize…", [
      [
        "A roster with fairness norms and long-term reputation — not one lucky partner",
        true,
        "Correct — BT-03.",
      ],
      ["Burning partners after one win", false, "Wrong — reputation dies."],
      ["Only random invites forever", false, "Wrong — systems beat randomness."],
      ["Recruiting for a competing agency network", false, "Wrong — out of scope."],
    ]),
    question("bt5", "Ethical clutch hosting means…", [
      [
        "Composure and clear asks without guilt, comparison, or harassment",
        true,
        "Correct — BT-04.",
      ],
      ["Telling chat they don't love you if they don't gift", false, "Wrong — guilt banned."],
      ["Fake urgency that implies the stream ends if you lose", false, "Wrong — pressure tactic."],
      ["Attacking the opponent personally", false, "Wrong — harassment."],
    ]),
    question("bt6", "Battle production clarity is about…", [
      [
        "Overlays, sound, and camera that let viewers follow the fight",
        true,
        "Correct — BT-05.",
      ],
      ["Covering the scoreboard with decorations", false, "Wrong — clarity fails."],
      ["Pirated plugins for flashier alerts", false, "Wrong — illegal software."],
      ["Ignoring audio because battles are visual", false, "Wrong — audio still matters."],
    ]),
    question("bt7", "Debrief mastery improves you by…", [
      [
        "Writing what worked, what failed, and one behavior to test next — then changing",
        true,
        "Correct — BT-06.",
      ],
      ["Only checking gift totals", false, "Wrong — incomplete."],
      ["Blaming chat forever", false, "Wrong — no learning."],
      ["Skipping review after wins", false, "Wrong — wins hide leaks too."],
    ]),
    question("bt8", "Multi-battle nights require…", [
      [
        "Recovery blocks and narrative continuity so voice and brand survive the stack",
        true,
        "Correct — BT-07.",
      ],
      ["Zero breaks until you collapse", false, "Wrong — burnout."],
      ["Six identical high-scream rounds with no story", false, "Wrong — pacing fails."],
      ["Ignoring partner schedules", false, "Wrong — event ops matter."],
    ]),
    question("bt9", "The Capstone requires…", [
      [
        "A signature battle system playbook plus a week of objectively reviewable results",
        true,
        "Correct — BT-08.",
      ],
      ["Proof of maximum gift totals only", false, "Wrong — not gift graded."],
      ["Optional Honors Lab before any certificate", false, "Wrong — Lab never gates."],
      ["Fake rivalry storylines for drama", false, "Wrong — unethical."],
    ]),
    question("bt10", "Which statement about certification is correct?", [
      [
        "Capstone is required for the certificate; Battle Lab / Honors is optional and never a gate",
        true,
        "Correct — Labs never gate certificates.",
      ],
      ["Honors Lab is required before Capstone", false, "Wrong — never a gate."],
      ["Program Final replaces the Capstone", false, "Wrong — both are in the chain."],
      ["You can skip sportsmanship if you win", false, "Wrong — reputation is craft."],
    ]),
  ],
});
