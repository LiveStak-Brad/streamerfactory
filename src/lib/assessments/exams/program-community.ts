import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Community Mastery (programKey `community`).
 */
export const exam = programFinal({
  programKey: "community",
  programName: "Community Mastery",
  title: "Program Final: Community Mastery",
  questions: [
    question("cm1", "Community Mastery answers which core question?", [
      [
        "How do I turn viewers into a belonging culture with rituals, roles, conflict readiness, and professional relationships?",
        true,
        "Correct — culture systems, not accidental vibes.",
      ],
      ["How do I guarantee viral community nights?", false, "Wrong — never promise virality."],
      ["How do I recruit creators into my agency?", false, "Wrong — out of scope."],
      ["How do I replace moderation with hope?", false, "Wrong — systems required."],
    ]),
    question("cm2", "Community Design: Belonging on Purpose (CM-01) starts by…", [
      [
        "Defining a community thesis and weekly rituals people can recognize",
        true,
        "Correct — CM-01.",
      ],
      ["Copying another creator's insider jokes blindly", false, "Wrong — design on purpose."],
      ["Skipping rituals until you are famous", false, "Wrong — belonging starts now."],
      ["Making gifts the only belonging signal", false, "Wrong — incomplete culture."],
    ]),
    question("cm3", "Chat culture and return habits emphasize…", [
      [
        "Rewarding the behavior you want and installing open/close return habits",
        true,
        "Correct — CM-02.",
      ],
      ["Begging viewers not to leave", false, "Wrong — needy energy."],
      ["Ignoring first-timers so regulars stay exclusive", false, "Wrong — harms belonging."],
      ["Only posting schedule changes in DMs", false, "Wrong — LIVE habits matter."],
    ]),
    question("cm4", "Moderation systems that scale treat mods as…", [
      [
        "Culture carriers with roles, rules, and a clear escalation path",
        true,
        "Correct — CM-03.",
      ],
      ["Silent unpaid janitors with no briefing", false, "Wrong — train and empower."],
      ["Owners of the creator's account", false, "Wrong — boundary fail."],
      ["Optional until a ban wave hits", false, "Wrong — build before crisis."],
    ]),
    question("cm5", "Conflict and boundary enforcement should…", [
      [
        "Use a calm decision tree for ignore vs warn vs remove — without making drama the show",
        true,
        "Correct — CM-04.",
      ],
      ["Debate every troll for engagement", false, "Wrong — regret content."],
      ["Wait until the room is ruined to act", false, "Wrong — late enforcement feels personal."],
      ["Outsource all judgment to random chat votes", false, "Wrong — host responsibility."],
    ]),
    question("cm6", "Protecting community health includes…", [
      [
        "Written boundaries that protect creator and audience from parasocial harm and unsafe oversharing",
        true,
        "Correct — CM-05.",
      ],
      ["Sharing every private detail to prove authenticity", false, "Wrong — unsafe."],
      ["Ignoring harassment because 'it's just the internet'", false, "Wrong — health required."],
      ["Only protecting top gifters", false, "Wrong — whole-room health."],
    ]),
    question("cm7", "Accessibility and inclusion on LIVE means…", [
      [
        "Welcome and language choices that help newcomers belong fast without insider-only barriers",
        true,
        "Correct — CM-06.",
      ],
      ["Gatekeeping jokes as a loyalty test", false, "Wrong — exclusion."],
      ["Assuming everyone already knows your rituals", false, "Wrong — translate and invite."],
      ["Skipping welcomes when the room is busy", false, "Wrong — inclusion still matters."],
    ]),
    question("cm8", "Guest hosting and interviewing succeed when…", [
      [
        "Agendas, roles, listening, and exit ramps elevate both audiences without awkward Zoom energy",
        true,
        "Correct — CM-07 / CM-08.",
      ],
      ["Guests arrive with no plan and no promo exchange", false, "Wrong — prep required."],
      ["The host dominates every answer", false, "Wrong — listening matters."],
      ["The night becomes a recruiting pitch", false, "Wrong — out of scope."],
    ]),
    question("cm9", "Professional networking for creators requires…", [
      [
        "A 30-day plan of meaningful give-first touches, clean follow-up, and reputation hygiene — not spam or agency recruiting",
        true,
        "Correct — CM-09.",
      ],
      ["Mass identical DMs for reach", false, "Wrong — spam."],
      ["Battle Finder as the only relationship system", false, "Wrong — Battles boundary."],
      ["Desperate collab pitching on every LIVE", false, "Wrong — reputation damage."],
    ]),
    question("cm10", "The Community Capstone and Lab/Honors relationship is…", [
      [
        "Capstone (Community Appreciation Event with evidence pack) is required for the certificate; Community Lab / Mastery Honors is optional after — never a gate",
        true,
        "Correct — CM-10 + Labs policy.",
      ],
      ["Honors Lab gates the certificate", false, "Wrong — labs never gate."],
      ["Capstone is optional vibes if chat was nice", false, "Wrong — Capstone is required evidence."],
      ["Gift totals are required Capstone evidence", false, "Wrong — execution and artifacts grade."],
    ]),
  ],
});
