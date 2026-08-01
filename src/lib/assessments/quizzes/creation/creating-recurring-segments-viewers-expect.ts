import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "creating-recurring-segments-viewers-expect",
  programKey: "creation",
  title: "Quiz: Creating Recurring Segments Viewers Expect",
  questions: [
    question(
      "q1",
      "Viewers say they liked your LIVE but don't know when to return for 'their' bit. What does CC-03 solve?",
      [
        [
          "Named recurring segments with rules, length, and payoff — so return viewing has a hook",
          true,
          "Correct — segments turn one-time watchers into appointment viewers.",
        ],
        [
          "Longer sessions so more random moments happen",
          false,
          "Wrong — length without named segments doesn't teach return habits.",
        ],
        [
          "Posting daily schedule screenshots with no segment names",
          false,
          "Wrong — calendars help, but unnamed blocks don't build 'their' bit.",
        ],
        [
          "Copying Core retention loops verbatim without adapting to your niche",
          false,
          "Wrong — CC-03 builds on Core L12 but needs your segment bible entries.",
        ],
      ],
    ),
    question(
      "q2",
      "You're drafting 'Hot Take Roulette' — a five-minute segment. What belongs in the segment bible entry?",
      [
        [
          "Name, trigger, length, rules, viewer promise, and payoff — so you can host it when chat spikes",
          true,
          "Correct — segment bibles are hostable specs, not vibes.",
        ],
        [
          "Only a catchy title for the thumbnail",
          false,
          "Wrong — titles without rules become chaos when interaction rises.",
        ],
        [
          "A script you read word-for-word every time",
          false,
          "Wrong — CC-03 is structured improv, not scripted drama.",
        ],
        [
          "Whatever topics trend that day with no fixed length",
          false,
          "Wrong — unbounded segments don't train expectation.",
        ],
      ],
    ),
    question(
      "q3",
      "Chat demands you extend a segment past its bible length because it's popping off. Best move?",
      [
        [
          "Honor the planned length or extend deliberately with a stated rule change — then log what happened",
          true,
          "Correct — professionals lead segments; spikes don't erase structure silently.",
        ],
        [
          "Always ride the spike until energy dies — rules are for beginners",
          false,
          "Wrong — endless segments wreck pacing and tomorrow's return promise.",
        ],
        [
          "Kill the segment instantly to punish chat for asking",
          false,
          "Wrong — abrupt punishment breaks belonging.",
        ],
        [
          "Start a third unplanned segment instead of finishing the show arc",
          false,
          "Wrong — stacking unplanned bits scatters the session.",
        ],
      ],
    ),
    question(
      "q4",
      "You launched two segments but viewers only remember one. Likely gap?",
      [
        [
          "The forgotten segment lacks a distinct trigger, name call, or consistent slot in the run of show",
          true,
          "Correct — expectation requires repetition in the same recognizable container.",
        ],
        [
          "You need five segments minimum before any can work",
          false,
          "Wrong — CC-03 asks for two well-built segments, not quantity for its own sake.",
        ],
        [
          "One segment must be deleted — only one allowed per creator",
          false,
          "Wrong — two segments are the lesson outcome.",
        ],
        [
          "The segment failed because Honors Lab didn't review it",
          false,
          "Wrong — labs never gate; hosting discipline builds memory.",
        ],
      ],
    ),
    question(
      "q5",
      "A regular arrives late and asks 'did I miss the bit?' How should segments help you answer?",
      [
        [
          "You can name the segment, say when it usually runs, and tease the next slot — appointment language",
          true,
          "Correct — segments create schedule language viewers learn.",
        ],
        [
          "Tell them segments aren't real — every LIVE is unique",
          false,
          "Wrong — that trains them not to prioritize return timing.",
        ],
        [
          "Replay the entire segment immediately, pausing the LIVE for ten minutes",
          false,
          "Wrong — full replays mid-show break pacing; brief tease + next appointment is cleaner.",
        ],
        [
          "Ignore the question so newcomers don't feel behind",
          false,
          "Wrong — insiders want acknowledgment of the ritual.",
        ],
      ],
    ),
    question(
      "q6",
      "Your second segment overlaps the first's topic area. Professional fix before next LIVE?",
      [
        [
          "Differentiate promises — each segment needs its own viewer payoff and rule set",
          true,
          "Correct — overlapping segments feel like one blurry loop.",
        ],
        [
          "Merge them into one long unstructured block",
          false,
          "Wrong — merges remove the named return hooks.",
        ],
        [
          "Alternate randomly which segment runs so viewers stay guessing",
          false,
          "Wrong — randomness prevents 'viewers expect' behavior.",
        ],
        [
          "Add gifts as the only difference between segments",
          false,
          "Wrong — monetization hooks aren't segment identity.",
        ],
      ],
    ),
    question(
      "q7",
      "How do CC-03 segments connect to themed weeks (CC-04)?",
      [
        [
          "Segments become daily angles inside a week theme — same names, themed variations",
          true,
          "Correct — segments are building blocks for larger narrative gravity.",
        ],
        [
          "Themed weeks replace segments entirely",
          false,
          "Wrong — themes map across sessions; segments still anchor familiarity.",
        ],
        [
          "Segments only matter for Growth Mastery, not Content Creation",
          false,
          "Wrong — CC-03 is core showcraft in this path.",
        ],
        [
          "You must retire all segments before planning a theme",
          false,
          "Wrong — themes layer on segments; they don't erase them.",
        ],
      ],
    ),
    question(
      "q8",
      "CC-03 mission success looks like…",
      [
        [
          "Segment bible entries for two named segments, each used on LIVE with stated rules and payoff",
          true,
          "Correct — system + downloadable resource exercised on air.",
        ],
        [
          "Ten unnamed bits that felt fun in the moment",
          false,
          "Wrong — fun without bible entries isn't the deliverable.",
        ],
        [
          "Viewer count doubling after launching segment one",
          false,
          "Wrong — not graded by virality.",
        ],
        [
          "Worksheets completed but segments never aired",
          false,
          "Wrong — segments must survive a real LIVE.",
        ],
      ],
    ),
  ],
});
