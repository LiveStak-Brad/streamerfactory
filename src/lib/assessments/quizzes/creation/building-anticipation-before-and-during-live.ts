import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "building-anticipation-before-and-during-live",
  programKey: "creation",
  title: "Quiz: Building Anticipation Before and During LIVE",
  questions: [
    question(
      "q1",
      "You tease 'big announcement tonight' then forget to deliver. Regulars stop trusting your promos. What does CC-09 fix?",
      [
        [
          "An anticipation system across pre-, mid-, and end-LIVE — including kept promises you log",
          true,
          "Correct — anticipation is a content skill with accountability.",
        ],
        [
          "Bigger teasers every day regardless of delivery",
          false,
          "Wrong — empty hype erodes return habits faster than silence.",
        ],
        [
          "Never tease anything so you can't break promises",
          false,
          "Wrong — CC-09 installs anticipation, not avoidance.",
        ],
        [
          "Only tease gifts and battles because those are real stakes",
          false,
          "Wrong — showcraft promises — segments, arcs, events — matter too.",
        ],
      ],
    ),
    question(
      "q2",
      "Pre-LIVE anticipation: what belongs in the playbook?",
      [
        [
          "Specific hooks — what tonight is, what carries from last time, and what finales are coming",
          true,
          "Correct — pre-LIVE sets appointment energy before Go Live.",
        ],
        [
          "Generic 'going LIVE' posts with no thread to your show",
          false,
          "Wrong — generic promo doesn't build serial return.",
        ],
        [
          "Full run-of-show spoilers for the entire month",
          false,
          "Wrong — tease loops, don't dump the script.",
        ],
        [
          "Silence until the open mic — surprise only",
          false,
          "Wrong — CC-09 starts before the session.",
        ],
      ],
    ),
    question(
      "q3",
      "Mid-LIVE unfinished loop: you open a mystery box segment but run out of time. Best anticipation move?",
      [
        [
          "Name what's unfinished, when it resolves, and log the kept promise for next session",
          true,
          "Correct — unfinished loops work when closure is scheduled and delivered.",
        ],
        [
          "Never mention the box again — hope they forget",
          false,
          "Wrong — ghosted loops punish return viewers.",
        ],
        [
          "Rush a sloppy payoff in thirty seconds while signing off",
          false,
          "Wrong — rushed payoffs feel like gimmicks.",
        ],
        [
          "Blame chat for asking too many questions",
          false,
          "Wrong — host owns loops you open.",
        ],
      ],
    ),
    question(
      "q4",
      "End-LIVE 'next time' promise should be…",
      [
        [
          "One specific kept promise tied to segments, arcs, or events — not vague 'see you soon'",
          true,
          "Correct — end-LIVE is where appointment viewing gets its next hook.",
        ],
        [
          "Whatever sounds exciting in the moment with no plan",
          false,
          "Wrong — vibe promises break trust when unplanned.",
        ],
        [
          "Omitted if viewer count was low — they don't deserve promos",
          false,
          "Wrong — small rooms still need return hooks.",
        ],
        [
          "A different promise every thirty seconds in the close",
          false,
          "Wrong — promise sprawl means none land.",
        ],
      ],
    ),
    question(
      "q5",
      "How does CC-09 connect to Core hooks (L11)?",
      [
        [
          "Hooks open sessions; anticipation threads sessions — both need clarity, not clickbait",
          true,
          "Correct — CC-09 extends hook thinking across time.",
        ],
        [
          "Hooks replace anticipation after Core graduation",
          false,
          "Wrong — they stack, not replace.",
        ],
        [
          "Anticipation means misleading titles for FYP",
          false,
          "Wrong — kept promises are the ethical standard.",
        ],
        [
          "Core hooks are trivia — CC-09 ignores them",
          false,
          "Wrong — CC-09 explicitly connects to L11.",
        ],
      ],
    ),
    question(
      "q6",
      "You broke a promise last week. Repair pattern for CC-09?",
      [
        [
          "Acknowledge briefly, deliver the owed beat early this LIVE, update the kept-promise log",
          true,
          "Correct — accountability restores trust faster than pretending.",
        ],
        [
          "Never mention broken promises — move on silently",
          false,
          "Wrong — silence reads as unreliability.",
        ],
        [
          "Over-apologize for ten minutes instead of delivering",
          false,
          "Wrong — shame isn't the product; delivery is.",
        ],
        [
          "Make a bigger promise to distract from the miss",
          false,
          "Wrong — promise inflation worsens the cycle.",
        ],
      ],
    ),
    question(
      "q7",
      "Clip strategy (Growth GR-08) meets anticipation how?",
      [
        [
          "Clips can tease unfinished loops — if the full payoff is scheduled and kept on LIVE",
          true,
          "Correct — clips extend anticipation when LIVE delivers closure.",
        ],
        [
          "Clips should spoil every payoff so LIVE isn't needed",
          false,
          "Wrong — that kills appointment viewing.",
        ],
        [
          "Anticipation forbids clips entirely",
          false,
          "Wrong — GR-08 and CC-09 can align.",
        ],
        [
          "Only clip gift moments — story loops don't clip",
          false,
          "Wrong — segment and arc beats clip too.",
        ],
      ],
    ),
    question(
      "q8",
      "CC-09 mission success is…",
      [
        [
          "Anticipation playbook (pre / mid / end) plus kept-promise log showing at least one delivered thread",
          true,
          "Correct — playbook + measurable improvement on real LIVEs.",
        ],
        [
          "Maximum hype language in every post regardless of delivery",
          false,
          "Wrong — hype without kept promises fails CC-09.",
        ],
        [
          "Playbook written but no promises tracked or delivered",
          false,
          "Wrong — the log is part of the deliverable.",
        ],
        [
          "Viewer count spike on teaser day only",
          false,
          "Wrong — not graded by peaks alone.",
        ],
      ],
    ),
  ],
});
