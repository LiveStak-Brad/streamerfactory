import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Content Creation Mastery (programKey `creation`).
 */
export const exam = programFinal({
  programKey: "creation",
  programName: "Content Creation Mastery",
  title: "Program Final: Content Creation Mastery",
  questions: [
    question("cr1", "A creator's LIVEs are structured but forgettable — viewers can't say what the show is for. Best CC-01 move?", [
      [
        "Write a niche statement at the love / LIVE skill / return-reason intersection plus in/out boundaries",
        true,
        "Correct — CC-01: clear reason to stay without boxing yourself in.",
      ],
      [
        "Pick the broadest trending label each week",
        false,
        "Wrong — trend labels without intersection scatter identity.",
      ],
      [
        "Wait for 10k followers before defining anything",
        false,
        "Wrong — CC-01 deliverable is now, not follower-deferred.",
      ],
      [
        "Copy a bigger creator's niche because it already works for them",
        false,
        "Wrong — their intersection isn't yours.",
      ],
    ]),
    question("cr2", "CC-02 memorability fails when…", [
      [
        "Signatures exist on paper but never fire on LIVE with a usage plan",
        true,
        "Correct — three describable elements need deliberate repetition.",
      ],
      [
        "The creator repeats one phrase too many times in a year",
        false,
        "Wrong — consistent signatures build memory; one year of use is healthy.",
      ],
      [
        "Viewers can describe the show to a friend",
        false,
        "Wrong — that's success, not failure.",
      ],
      [
        "Signatures match the niche emotional texture",
        false,
        "Wrong — alignment is required, not a failure mode.",
      ],
    ]),
    question("cr3", "Recurring segments (CC-03) stay hostable when chat spikes because…", [
      [
        "Segment bible entries define name, rules, length, payoff, and triggers",
        true,
        "Correct — named segments with rules beat unstructured bits.",
      ],
      [
        "The host extends every hot segment until energy dies",
        false,
        "Wrong — unbounded segments wreck pacing and expectation.",
      ],
      [
        "Segments are renamed daily for novelty",
        false,
        "Wrong — renaming prevents 'viewers expect' behavior.",
      ],
      [
        "Only one segment is allowed for the entire program",
        false,
        "Wrong — CC-03 asks for two well-built segments.",
      ],
    ]),
    question("cr4", "Themed week (CC-04) success requires…", [
      [
        "One theme, daily angles, and a finale payoff — not seven unrelated trending topics",
        true,
        "Correct — narrative gravity across sessions.",
      ],
      [
        "Abandoning recurring segments so the theme has full attention",
        false,
        "Wrong — segments anchor familiarity inside themed angles.",
      ],
      [
        "A new niche statement every day",
        false,
        "Wrong — CC-01 niche stays; themes express it.",
      ],
      [
        "Perfect attendance all seven days or the theme is invalid",
        false,
        "Wrong — replan remaining days; perfection isn't required.",
      ],
    ]),
    question("cr5", "Multi-LIVE story arcs (CC-05) differ from single sessions because…", [
      [
        "Checkpoints and finales create appointment viewing without scripted drama",
        true,
        "Correct — arcs span 3–7 sessions with hostable beats.",
      ],
      [
        "They require fully written scripts read line-for-line",
        false,
        "Wrong — CC-05 avoids turning LIVE into scripted drama.",
      ],
      [
        "They never pay off so mystery stays forever",
        false,
        "Wrong — finales are required.",
      ],
      [
        "They only work for personal oversharing vlogs",
        false,
        "Wrong — series and challenge arcs fit many formats.",
      ],
    ]),
    question("cr6", "Community events on LIVE (CC-06) should include…", [
      [
        "Event run-of-show plus promo timeline so viewers can invite friends",
        true,
        "Correct — events are content and belonging.",
      ],
      [
        "Unstructured call-ins with no time limits",
        false,
        "Wrong — fairness and rotation need rules.",
      ],
      [
        "Silence until Go Live for maximum surprise",
        false,
        "Wrong — invite moments need advance promo.",
      ],
      [
        "Success graded only by doubling viewer count",
        false,
        "Wrong — craft and belonging matter beyond peaks.",
      ],
    ]),
    question("cr7", "Interactive shows that aren't chaos (CC-07) depend on…", [
      [
        "Format cards with rules, roles, and kill-switches for spike moments",
        true,
        "Correct — interaction without structure becomes noise.",
      ],
      [
        "Letting chat lead whenever energy rises",
        false,
        "Wrong — roles and switches keep you hostable.",
      ],
      [
        "Never ending a format once started",
        false,
        "Wrong — kill-switches are planned professional exits.",
      ],
      [
        "Stacking votes, games, and challenges with no run-of-show",
        false,
        "Wrong — master one hostable format before stacking.",
      ],
    ]),
    question("cr8", "Seasonal content without gimmicks (CC-08) means…", [
      [
        "A 90-day calendar with three season peaks tied to niche — not forced trend-chasing",
        true,
        "Correct — seasons pulse the calendar intentionally.",
      ],
      [
        "Copying every holiday trend regardless of in/out boundaries",
        false,
        "Wrong — off-brand seasons scatter identity.",
      ],
      [
        "Ignoring all holidays to stay pure",
        false,
        "Wrong — CC-08 uses seasons deliberately.",
      ],
      [
        "Peaks defined only by unexpected viewer spikes",
        false,
        "Wrong — peaks are planned design.",
      ],
    ]),
    question("cr9", "Anticipation systems (CC-09) fail most often when…", [
      [
        "Teasers outrun kept promises — pre, mid, and end loops aren't logged or delivered",
        true,
        "Correct — anticipation requires accountability across sessions.",
      ],
      [
        "The creator delivers one specific next-time promise",
        false,
        "Wrong — that's success.",
      ],
      [
        "Unfinished loops close on a scheduled LIVE",
        false,
        "Wrong — scheduled closure builds trust.",
      ],
      [
        "Pre-LIVE promo mentions the theme and carryover thread",
        false,
        "Wrong — that's proper pre-LIVE anticipation.",
      ],
    ]),
    question("cr10", "The Content Creation Capstone (CC-10) requires…", [
      [
        "A 7-day themed LIVE series with plan, execution log, review, and keep/change/test reinvention judgment",
        true,
        "Correct — portfolio artifact integrating CC-01 through CC-09.",
      ],
      [
        "One viral night with no documentation",
        false,
        "Wrong — evidence must be reviewable.",
      ],
      [
        "Honors Lab sign-off before day one",
        false,
        "Wrong — labs never gate.",
      ],
      [
        "A new niche every day of the series",
        false,
        "Wrong — niche anchors the series.",
      ],
    ]),
    question("cr11", "Content Creation Mastery Honors Lab…", [
      [
        "Is optional after the certificate — AI/mentor review never gates certification",
        true,
        "Correct — honors, not gates.",
      ],
      [
        "Must be finished before CC-10 counts",
        false,
        "Wrong — non-gating.",
      ],
      [
        "Replaces the Program Final",
        false,
        "Wrong — final still required.",
      ],
      [
        "Is required for the Core StreamerU Diploma",
        false,
        "Wrong — Core diploma is Core 24.",
      ],
    ]),
    question("cr12", "After Content Creation Mastery, most creators should…", [
      [
        "Continue into Growth Mastery (recommended next craft path) while keeping showcraft habits alive",
        true,
        "Correct — Content Creation then Growth in the recommended path.",
      ],
      [
        "Treat showcraft as finished and stop reviewing series logs",
        false,
        "Wrong — craft decays without review.",
      ],
      [
        "Skip Growth and jump only to gear shopping",
        false,
        "Wrong — Production is separate; Growth is next craft.",
      ],
      [
        "Drop Advanced Creator OS habits because content replaces systems",
        false,
        "Wrong — OS and brand still matter.",
      ],
    ]),
  ],
});
