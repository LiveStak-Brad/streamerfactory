import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "interactive-shows-that-arent-chaos",
  programKey: "creation",
  title: "Quiz: Interactive Shows That Aren't Chaos",
  questions: [
    question(
      "q1",
      "You launch a chat vote with no rules. Within minutes, chat spam breaks the segment. What did CC-07 require upfront?",
      [
        [
          "An interactive format card — rules, roles, and kill-switches you can run when chat spikes",
          true,
          "Correct — interaction without structure becomes noise.",
        ],
        [
          "Maximum volume from the host so chat obeys",
          false,
          "Wrong — yelling isn't structure.",
        ],
        [
          "Banning interaction whenever more than ten people comment",
          false,
          "Wrong — CC-07 designs hostable interaction, not avoidance.",
        ],
        [
          "Letting chat lead entirely so it feels democratic",
          false,
          "Wrong — democracy without roles becomes chaos.",
        ],
      ],
    ),
    question(
      "q2",
      "Your format card includes a kill-switch. When should you use it?",
      [
        [
          "When predefined chaos triggers hit — spam, pile-ons, segment overruns — per your written rules",
          true,
          "Correct — kill-switches are planned exits, not panic buttons.",
        ],
        [
          "Never — using kill-switches means you failed as a host",
          false,
          "Wrong — professionals end formats cleanly before damage spreads.",
        ],
        [
          "Only when Honors Lab mentors tell you to stop",
          false,
          "Wrong — you own the format; labs don't gate LIVE decisions.",
        ],
        [
          "Whenever one viewer complains about losing",
          false,
          "Wrong — single complaints aren't automatic kill triggers unless rules say so.",
        ],
      ],
    ),
    question(
      "q3",
      "Designing roles for a 'Build Battle' interactive show. Strongest role design?",
      [
        [
          "Clear host, contestants, and chat role — what each can do, when, and how you reset",
          true,
          "Correct — roles keep interaction hostable at scale.",
        ],
        [
          "Everyone can do everything simultaneously for maximum energy",
          false,
          "Wrong — permission sprawl creates unmaintainable noise.",
        ],
        [
          "Roles assigned randomly mid-show with no explanation",
          false,
          "Wrong — confusion isn't interactivity.",
        ],
        [
          "Host does all actions while chat watches silently",
          false,
          "Wrong — that's not an interactive format.",
        ],
      ],
    ),
    question(
      "q4",
      "Chat spikes during a challenge segment. PR-08 composure meets CC-07 structure — best move?",
      [
        [
          "Run the format card reset line, restate rules once, continue or kill-switch per plan",
          true,
          "Correct — structure + composure beats reactive screaming.",
        ],
        [
          "Abandon all rules to ride the spike for gifts",
          false,
          "Wrong — gift-chasing without structure trains chaos.",
        ],
        [
          "Argue with rule-breakers until they leave",
          false,
          "Wrong — feeds the interruption; use roles and switches.",
        ],
        [
          "End the entire LIVE immediately",
          false,
          "Wrong — overreaction wastes the format you built.",
        ],
      ],
    ),
    question(
      "q5",
      "How should interactive formats relate to recurring segments (CC-03)?",
      [
        [
          "A segment can *be* the interactive format — named, rule-bound, repeatable",
          true,
          "Correct — segments give interaction a container viewers learn.",
        ],
        [
          "Interactive shows must never repeat — novelty only",
          false,
          "Wrong — repeatability builds expectation and skill.",
        ],
        [
          "Segments and interactive formats are unrelated paths",
          false,
          "Wrong — CC-07 builds on CC-03 segment discipline.",
        ],
        [
          "Only one interactive format allowed for your entire career",
          false,
          "Wrong — one well-built format is the lesson outcome, not a lifetime limit.",
        ],
      ],
    ),
    question(
      "q6",
      "You want votes, challenges, and games in one LIVE with no plan. Professional warning?",
      [
        [
          "Stacking formats without a run-of-show usually collapses when chat spikes — pick one card per session first",
          true,
          "Correct — master one hostable format before stacking.",
        ],
        [
          "More formats always equals better retention",
          false,
          "Wrong — stacking unmaintained formats increases chaos.",
        ],
        [
          "Games are only for Battle Mastery, not Content Creation",
          false,
          "Wrong — CC-07 explicitly covers games with structure.",
        ],
        [
          "Challenges don't need rules if your personality is strong enough",
          false,
          "Wrong — personality without rules doesn't scale on LIVE.",
        ],
      ],
    ),
    question(
      "q7",
      "After a messy interactive night, what review question fits CC-07?",
      [
        [
          "Which rule was missing, which kill-switch fired late, and what one change goes on the format card?",
          true,
          "Correct — debrief changes next behavior on the card.",
        ],
        [
          "Whether chat was 'toxic' so you can blame the room",
          false,
          "Wrong — hostable design is your lever first.",
        ],
        [
          "If you should quit interactive content forever",
          false,
          "Wrong — one messy night is calibration, not identity.",
        ],
        [
          "Only whether gifts increased — no format review needed",
          false,
          "Wrong — structure grade is separate from monetization spikes.",
        ],
      ],
    ),
    question(
      "q8",
      "CC-07 mission success is…",
      [
        [
          "Interactive format card completed and one LIVE run using rules, roles, and at least one practiced kill-switch",
          true,
          "Correct — system + LIVE mission with hostable evidence.",
        ],
        [
          "Chat commented a lot — structure optional",
          false,
          "Wrong — activity without structure isn't the deliverable.",
        ],
        [
          "Format card written but never tested on LIVE",
          false,
          "Wrong — cards must survive contact with real chat.",
        ],
        [
          "Zero rule breaks because chat was quiet",
          false,
          "Wrong — quiet rooms don't prove spike-hosting skill; design still must exist.",
        ],
      ],
    ),
  ],
});
