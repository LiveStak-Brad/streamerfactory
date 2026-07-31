import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "gifts-goals-momentum",
  programKey: "monetization",
  title: "Quiz: How gifting works",
  questions: [
    question(
      "q1",
      "A new viewer asks how gifting works mid-LIVE. Best response?",
      [
        [
          "Give a short, confident two–three sentence explanation (coins → gifts → creator value), then return to content",
          true,
          "Correct — literacy without a finance lecture keeps the room moving.",
        ],
        [
          "Ignore them because talking about gifts is always begging",
          false,
          "Wrong — clear education is not begging.",
        ],
        [
          "Quote exact payout thresholds and coin math for five minutes",
          false,
          "Wrong — this lesson avoids fragile numbers; keep it conceptual.",
        ],
        [
          "Tell them gifts are owed to you for showing up",
          false,
          "Wrong — entitlement kills culture.",
        ],
      ],
    ),
    question(
      "q2",
      "Which line is momentum instead of begging?",
      [
        [
          "“We’re about two-thirds of the way there — let’s see where we land by the end.”",
          true,
          "Correct — energy-forward and inclusive; invites without guilt.",
        ],
        [
          "“Nobody has gifted in five minutes — I really need this or I’ll end.”",
          false,
          "Wrong — need-forward pressure is begging.",
        ],
        [
          "“If you don’t gift you’re not a real fan.”",
          false,
          "Wrong — exclusionary and harmful.",
        ],
        [
          "Lying about the total to create fake urgency",
          false,
          "Wrong — destroys trust.",
        ],
      ],
    ),
    question(
      "q3",
      "Why understand gift mechanics before heavy asks?",
      [
        [
          "So your CTAs match how the feature actually works and you never sound cagey",
          true,
          "Correct — confused asks underperform; literacy builds confidence.",
        ],
        [
          "Mechanics knowledge replaces needing good content",
          false,
          "Wrong — content still carries the room.",
        ],
        [
          "So you can hunt loopholes forever",
          false,
          "Wrong — loophole hunting risks bans and trust.",
        ],
        [
          "Because you must memorize every coin price",
          false,
          "Wrong — conceptual understanding beats trivia.",
        ],
      ],
    ),
    question(
      "q4",
      "A small gift and a large gift land close together. Best gratitude approach?",
      [
        [
          "Thank both with warmth — scale energy naturally without treating small gifts as worthless",
          true,
          "Correct — inclusive gratitude protects culture.",
        ],
        [
          "Only celebrate the large gift; ignore the small one",
          false,
          "Wrong — teaches that only big gifts matter.",
        ],
        [
          "Shame people who sent small gifts for 'not trying'",
          false,
          "Wrong — drives people away.",
        ],
        [
          "Wait until the end of the LIVE to thank anyone",
          false,
          "Wrong — delayed thanks feels like being ignored.",
        ],
      ],
    ),
    question(
      "q5",
      "How should you introduce a stream goal in this lesson’s model?",
      [
        [
          "State a real, honest goal once near the start in plain language, then return to content",
          true,
          "Correct — transparent goals sit in the background; they do not dominate.",
        ],
        [
          "Repeat a dramatized guilt story every two minutes",
          false,
          "Wrong — viewers detect manufactured urgency.",
        ],
        [
          "Hide the goal until after people gift",
          false,
          "Wrong — people need the reason up front.",
        ],
        [
          "Set an infinite goal that never ends",
          false,
          "Wrong — no finish line, no clear momentum.",
        ],
      ],
    ),
    question(
      "q6",
      "The room goes quiet right after a big gift. Best move?",
      [
        [
          "React warmly, keep hosting real content, and let the moment breathe before any follow-up ask",
          true,
          "Correct — an instant second ask reads as opportunistic.",
        ],
        [
          "Immediately demand the next gift to 'keep the streak'",
          false,
          "Wrong — pressure dumps the goodwill you just earned.",
        ],
        [
          "Apologize for receiving gifts",
          false,
          "Wrong — gratitude should be clean, not shameful.",
        ],
        [
          "End the LIVE so the gift stays 'special'",
          false,
          "Wrong — ending randomly wastes the session.",
        ],
      ],
    ),
    question(
      "q7",
      "Which self-check separates momentum from begging?",
      [
        [
          "Would this line still make sense if I removed all mention of gifting?",
          true,
          "Correct — if the sentence collapses without the ask, it is begging.",
        ],
        [
          "Did viewer count go up in the last ten seconds?",
          false,
          "Wrong — viewer count is not the ethics test.",
        ],
        [
          "Did I say please at least three times?",
          false,
          "Wrong — politeness alone is not the distinction.",
        ],
        [
          "Is the gift animation expensive enough?",
          false,
          "Wrong — price is not the culture test.",
        ],
      ],
    ),
    question(
      "q8",
      "What proves this lesson’s LIVE Mission?",
      [
        [
          "A real LIVE where you explain gifting briefly if needed, state one transparent goal, practice gratitude, and avoid begging — regardless of gift totals",
          true,
          "Correct — StreamerU grades culture and clarity, not diamond count.",
        ],
        [
          "Hitting a specific diamond number",
          false,
          "Wrong — totals are not the pass condition.",
        ],
        [
          "Reading about gifts without going live",
          false,
          "Wrong — study alone does not complete the mission.",
        ],
        [
          "Threatening to ban non-gifters",
          false,
          "Wrong — antithetical to this lesson.",
        ],
      ],
    ),
  ],
});
