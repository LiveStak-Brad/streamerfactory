import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "community-events-on-live",
  programKey: "creation",
  title: "Quiz: Community Events on LIVE",
  questions: [
    question(
      "q1",
      "You want regulars to invite friends to one special night. What makes CC-06 different from a normal LIVE?",
      [
        [
          "A designed community event with run-of-show, roles, and promo timeline — content *and* belonging",
          true,
          "Correct — events give people a reason to invite others.",
        ],
        [
          "Going LIVE longer than usual with no structural change",
          false,
          "Wrong — duration alone isn't an event.",
        ],
        [
          "Turning off chat rules so anything goes",
          false,
          "Wrong — events need structure, not chaos.",
        ],
        [
          "Only running events when a brand pays for them",
          false,
          "Wrong — community events are showcraft, not sponsor-only.",
        ],
      ],
    ),
    question(
      "q2",
      "You're planning a 'Viewer Showcase Night.' What belongs in the event run-of-show?",
      [
        [
          "Open promise, segment order, how viewers participate, time limits, and host recovery beats",
          true,
          "Correct — CC-06 deliverable is event run-of-show + promo checklist.",
        ],
        [
          "A vague note: 'hang out and maybe call people up'",
          false,
          "Wrong — unstructured call-ins become unfair chaos.",
        ],
        [
          "Full scripts for every viewer who might appear",
          false,
          "Wrong — hostable structure, not scripted drama.",
        ],
        [
          "Only battle rules copied from Core battles lessons",
          false,
          "Wrong — events span game nights, showcases, milestones — not battles only.",
        ],
      ],
    ),
    question(
      "q3",
      "Five-day promo timeline: what's the professional pattern?",
      [
        [
          "Escalating teasers — what the event is, who it's for, how to participate, day-of reminder",
          true,
          "Correct — CC-06 includes 5-day promo checklist, not day-of surprise.",
        ],
        [
          "Silence until Go Live so it feels spontaneous",
          false,
          "Wrong — invite moments need advance notice for friends to show up.",
        ],
        [
          "Post the entire run-of-show verbatim five days early",
          false,
          "Wrong — promo sells the event, not the whole script.",
        ],
        [
          "Promo only in DMs to top gifters",
          false,
          "Wrong — events widen belonging; promo should reach the community.",
        ],
      ],
    ),
    question(
      "q4",
      "Mid-event, one viewer hogs the mic and others feel ignored. Best host move?",
      [
        [
          "Apply the time limits and rotation rules from the run-of-show — thank, transition, next slot",
          true,
          "Correct — fairness norms are part of event design.",
        ],
        [
          "Let them talk until they leave — conflict avoidance",
          false,
          "Wrong — hogging teaches others not to return for events.",
        ],
        [
          "End the event immediately and blame chat",
          false,
          "Wrong — recovery beats exist for a reason.",
        ],
        [
          "Start a battle to reset energy without addressing rotation",
          false,
          "Wrong — unrelated pivots don't fix participation fairness.",
        ],
      ],
    ),
    question(
      "q5",
      "Event night viewer count is lower than a normal Tuesday. How should you grade success?",
      [
        [
          "Did the run-of-show execute, participation rules hold, and regulars get an invite-worthy moment?",
          true,
          "Correct — CC-06 grades craft and belonging, not peak count alone.",
        ],
        [
          "Low count means cancel all future events forever",
          false,
          "Wrong — one night isn't the whole system.",
        ],
        [
          "Success requires doubling viewer count or the event failed",
          false,
          "Wrong — peaks are notes, not the primary grade.",
        ],
        [
          "Rewrite the niche statement because the event flopped",
          false,
          "Wrong — diagnose execution and promo before identity surgery.",
        ],
      ],
    ),
    question(
      "q6",
      "How do CC-06 events connect to themed weeks (CC-04)?",
      [
        [
          "An event can be the finale payoff of a themed week — same promo muscle, bigger belonging beat",
          true,
          "Correct — themes and events stack narrative gravity.",
        ],
        [
          "Events and themed weeks cannot coexist in one month",
          false,
          "Wrong — they're complementary tools.",
        ],
        [
          "Themed weeks replace events after CC-04",
          false,
          "Wrong — CC-06 adds invite-scale belonging.",
        ],
        [
          "Events are only for Community Mastery, not Content Creation",
          false,
          "Wrong — CC-06 is explicitly in this path.",
        ],
      ],
    ),
    question(
      "q7",
      "Tech fails mid-showcase. PR-08-style recovery for events?",
      [
        [
          "Short recovery script, restate who's up next, return to the run-of-show beat",
          true,
          "Correct — events still need composure patterns when pressure hits.",
        ],
        [
          "Rage-quit because events must be perfect",
          false,
          "Wrong — destroys trust and practice reps.",
        ],
        [
          "Ignore the fail and hope viewers didn't notice",
          false,
          "Wrong — clean reset language matters.",
        ],
        [
          "Convert the event into unstructured Q&A for the rest of the night",
          false,
          "Wrong — abandoning structure wastes promo and participation prep.",
        ],
      ],
    ),
    question(
      "q8",
      "CC-06 mission success is…",
      [
        [
          "One community event run-of-show executed with 5-day promo checklist completed",
          true,
          "Correct — checklist + template on a real event night.",
        ],
        [
          "Planning docs only — running the event optional if nervous",
          false,
          "Wrong — events must survive a real LIVE.",
        ],
        [
          "Honors Lab attendance as proof the event counted",
          false,
          "Wrong — labs are optional and never gate.",
        ],
        [
          "A milestone only if a famous guest appears",
          false,
          "Wrong — showcases and game nights don't require fame.",
        ],
      ],
    ),
  ],
});
