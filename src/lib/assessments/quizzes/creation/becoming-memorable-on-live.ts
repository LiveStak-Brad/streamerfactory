import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "becoming-memorable-on-live",
  programKey: "creation",
  title: "Quiz: Becoming Memorable on LIVE",
  questions: [
    question(
      "q1",
      "Your structure is solid but friends say they can't describe your show after watching. What does CC-02 prioritize?",
      [
        [
          "Three signature elements — phrase, visual cue, emotional texture — viewers could repeat to a friend",
          true,
          "Correct — memorable creators aren't just organized; they're describable.",
        ],
        [
          "Louder energy every segment so people remember volume",
          false,
          "Wrong — volume without signatures still blurs together in the feed.",
        ],
        [
          "A new random bit every LIVE so nothing repeats",
          false,
          "Wrong — repetition of *signature* elements builds memory; randomness prevents it.",
        ],
        [
          "Copying another creator's catchphrase because it already went viral",
          false,
          "Wrong — borrowed signatures that don't fit you read as imitation, not identity.",
        ],
      ],
    ),
    question(
      "q2",
      "You designed a signature phrase but only used it once in month one. What's the professional read?",
      [
        [
          "Signatures need a usage plan — when they fire, how often, and what triggers them",
          true,
          "Correct — CC-02 includes a memorability kit with usage plan, not just ideas.",
        ],
        [
          "The phrase failed and should be replaced before the next LIVE",
          false,
          "Wrong — one use isn't enough data; consistency trains recognition.",
        ],
        [
          "Use the phrase every thirty seconds so nobody misses it",
          false,
          "Wrong — overuse becomes noise and erodes the special texture.",
        ],
        [
          "Wait for Honors Lab to tell you if the phrase is good enough",
          false,
          "Wrong — labs are optional polish; you test signatures on LIVE yourself.",
        ],
      ],
    ),
    question(
      "q3",
      "Mid-LIVE you forget your planned visual cue (a specific mug flip before advice segments). Best recovery?",
      [
        [
          "Acknowledge lightly if needed, run the cue on the next segment, and log the miss in your kit",
          true,
          "Correct — signatures are trainable habits; recovery beats abandoning the system.",
        ],
        [
          "End the LIVE because the memorability plan is ruined",
          false,
          "Wrong — one missed cue isn't failure; the system is built over weeks.",
        ],
        [
          "Invent a new cue on the spot every segment so viewers stay surprised",
          false,
          "Wrong — surprise without repetition doesn't build describable memory.",
        ],
        [
          "Apologize for five minutes about forgetting creator homework",
          false,
          "Wrong — shame becomes the memorable moment — the wrong kind.",
        ],
      ],
    ),
    question(
      "q4",
      "Which emotional texture fits CC-02 if your niche is calm co-working?",
      [
        [
          "Steady warmth and quiet hype — a texture you can sustain for an hour",
          true,
          "Correct — emotional texture must match niche and stamina, not borrowed chaos.",
        ],
        [
          "Maximum shock humor every two minutes to 'stand out'",
          false,
          "Wrong — incompatible texture breaks the promise and burns you out.",
        ],
        [
          "Emotional flatness so you seem serious and professional",
          false,
          "Wrong — flat isn't memorable; intentional texture is.",
        ],
        [
          "Whatever mood the chat sets with no host lead",
          false,
          "Wrong — you design texture; chat reacts to it.",
        ],
      ],
    ),
    question(
      "q5",
      "A clipper asks which moments to cut. How do signatures help?",
      [
        [
          "Named signature beats become predictable clip windows — open cue, phrase drop, texture shift",
          true,
          "Correct — CC-02 connects to later discovery inventory of segment/clip moments.",
        ],
        [
          "Signatures mean you should never allow clips — LIVE only",
          false,
          "Wrong — memorability aids discovery; it doesn't forbid clips.",
        ],
        [
          "Tell them to clip whatever had the highest viewer count only",
          false,
          "Wrong — peaks without signature beats may not communicate your show.",
        ],
        [
          "Change signatures weekly so clips always feel fresh",
          false,
          "Wrong — weekly reinvention prevents viewers (and clippers) from learning your show.",
        ],
      ],
    ),
    question(
      "q6",
      "You have three signatures but they clash — chaotic phrase, zen visual, aggressive texture. Fix?",
      [
        [
          "Revise until the trio tells one coherent story a friend could summarize",
          true,
          "Correct — signatures should stack, not fight each other.",
        ],
        [
          "Keep all three because contrast is always memorable",
          false,
          "Wrong — incoherent contrast reads as random, not signature.",
        ],
        [
          "Drop signatures entirely and rely on Presence alone",
          false,
          "Wrong — PR skills help delivery; CC-02 is about describable identity.",
        ],
        [
          "Add a fourth signature to cover the confusion",
          false,
          "Wrong — more elements won't fix misalignment.",
        ],
      ],
    ),
    question(
      "q7",
      "How should CC-02 respect CC-01 niche boundaries?",
      [
        [
          "Signatures express the niche — they don't smuggle in off-brand chaos for attention",
          true,
          "Correct — memorability serves the promise, not random virality.",
        ],
        [
          "Memorable always means broader — niche should widen every week",
          false,
          "Wrong — CC-01 boundaries still filter what signatures you build.",
        ],
        [
          "Niche only matters for Growth analytics, not on LIVE",
          false,
          "Wrong — signatures are LIVE-native identity tools.",
        ],
        [
          "If a signature gets views, niche boundaries no longer apply",
          false,
          "Wrong — spike chasing scatters the show CC-01 defined.",
        ],
      ],
    ),
    question(
      "q8",
      "Mission success for CC-02 is graded on…",
      [
        [
          "Memorability kit completed (3 signatures + usage plan) and at least one LIVE where all three appeared by design",
          true,
          "Correct — template + LIVE mission; behavior evidence, not follower count.",
        ],
        [
          "A friend confirming you're famous now",
          false,
          "Wrong — fame isn't the rubric; describable signatures are.",
        ],
        [
          "Viewer count doubling after one phrase drop",
          false,
          "Wrong — metrics may move; they're not the CC-02 grade.",
        ],
        [
          "Planning docs only — running LIVE optional if tired",
          false,
          "Wrong — the kit must survive contact with a real session.",
        ],
      ],
    ),
  ],
});
