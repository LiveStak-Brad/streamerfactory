import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Growth Mastery (programKey `growth`).
 */
export const exam = programFinal({
  programKey: "growth",
  programName: "Growth Mastery",
  title: "Program Final: Growth Mastery",
  questions: [
    question("gr1", "Growth Mastery answers which core question?", [
      [
        "How do I consistently grow my LIVE audience over months and years with durable systems?",
        true,
        "Correct — systems growth, not hacks.",
      ],
      ["How do I guarantee virality this week?", false, "Wrong — never promise virality."],
      ["How do I buy followers safely?", false, "Wrong — banned."],
      ["How do I recruit creators into my agency?", false, "Wrong — out of scope."],
    ]),
    question("gr2", "The Growth Diagnosis Framework starts by…", [
      [
        "Naming whether the leak is discovery, retention, conversion, or consistency — with evidence",
        true,
        "Correct — GR-01.",
      ],
      ["Changing every tactic at once", false, "Wrong — thrash."],
      ["Blaming the algorithm with no notes", false, "Wrong — not diagnosis."],
      ["Skipping to collabs", false, "Wrong — diagnose first."],
    ]),
    question("gr3", "Retention science beyond Core loops emphasizes…", [
      [
        "Mid-LIVE drop-off, re-entry, and one structural change proven across sessions",
        true,
        "Correct — GR-02.",
      ],
      ["Begging viewers not to leave", false, "Wrong — needy energy."],
      ["Fake viewer bots", false, "Wrong — banned."],
      ["Only the first three seconds forever", false, "Wrong — mid-LIVE matters."],
    ]),
    question("gr4", "A monthly analytics review should produce…", [
      ["Three decisions maximum", true, "Correct — GR-03."],
      ["Forty unordered priorities", false, "Wrong — overload."],
      ["A virality forecast", false, "Wrong — never."],
      ["No decisions — screenshots only", false, "Wrong — incomplete."],
    ]),
    question("gr5", "Clean experiment design requires…", [
      [
        "One variable, kill criteria, documentation, and sample-size humility",
        true,
        "Correct — GR-04.",
      ],
      ["Five variables for faster learning", false, "Wrong — stacked variables erase learning."],
      ["No kill rule", false, "Wrong — kill rules protect the show."],
      ["Policy risk for reach", false, "Wrong — ethics first."],
    ]),
    question("gr6", "Scheduling as strategy means…", [
      [
        "Testing slots and sustainable cadence with integrity notes — not heroic burnout calendars",
        true,
        "Correct — GR-05.",
      ],
      ["Copying any viral creator's hours blindly", false, "Wrong — audience and life differ."],
      ["Going LIVE only when inspired", false, "Wrong — not strategy."],
      ["Seven daily LIVEs with no recovery", false, "Wrong — unsustainable."],
    ]),
    question("gr7", "Discovery inventory is for…", [
      [
        "Stocking clip moments, promos, and CTAs — not rewriting show craft",
        true,
        "Correct — GR-06 boundary with Content Creation.",
      ],
      ["Rebuilding niche and arcs inside Growth", false, "Wrong — Content Creation territory."],
      ["Engagement bait libraries", false, "Wrong — banned."],
      ["Agency content factories", false, "Wrong — out of scope."],
    ]),
    question("gr8", "Algorithm-durable growth rejects…", [
      [
        "Myth hacks, fake engagement, spam, follow-for-follow, and career bets on temporary tricks",
        true,
        "Correct — GR-07.",
      ],
      ["Consistency and clear return offers", false, "Wrong — those are durable."],
      ["Honest experiment logs", false, "Wrong — durable."],
      ["Written diagnosis", false, "Wrong — durable."],
    ]),
    question("gr9", "Clip-to-LIVE loops should…", [
      [
        "Serve the show with CTAs and focus guardrails so editing does not steal LIVE capacity",
        true,
        "Correct — GR-08.",
      ],
      ["Replace LIVE entirely", false, "Wrong — split-focus fail."],
      ["Require bought views", false, "Wrong — banned."],
      ["Hide that you go LIVE", false, "Wrong — destination matters."],
    ]),
    question("gr10", "AI for LIVE creators should…", [
      [
        "Assist prep while authenticity rules keep you sounding like you on camera",
        true,
        "Correct — GR-09.",
      ],
      ["Replace presence with robotic scripts", false, "Wrong — assist, don't replace."],
      ["Generate fake social proof", false, "Wrong — deceptive."],
      ["Bypass platform rules", false, "Wrong — never."],
    ]),
    question("gr11", "Collaboration growth without begging requires…", [
      [
        "Professional outreach, mutual value exchange, and post-collab retention — not recruiting playbooks",
        true,
        "Correct — GR-10.",
      ],
      ["Guilt DMs and spam", false, "Wrong — begging."],
      ["Agency ownership of partners", false, "Wrong — out of scope."],
      ["Follow-for-follow pressure", false, "Wrong — banned pattern."],
    ]),
    question("gr12", "The Growth Capstone and Honors Lab relationship is…", [
      [
        "Capstone (30-day documented experiment) is required for the certificate; Growth Lab is optional Honors after — never a gate",
        true,
        "Correct — GR-12 + Labs policy.",
      ],
      ["Honors Lab gates the certificate", false, "Wrong — labs never gate."],
      ["Capstone is optional vibes", false, "Wrong — Capstone is required."],
      ["Virality is required evidence", false, "Wrong — execution and documentation grade."],
    ]),
  ],
});
