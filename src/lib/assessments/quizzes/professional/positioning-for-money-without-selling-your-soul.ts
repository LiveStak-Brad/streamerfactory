import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "positioning-for-money-without-selling-your-soul",
  programKey: "professional",
  title: "Quiz: Positioning for Money (Without Selling Your Soul)",
  questions: [
    question(
      "q1",
      "A creator writes: \"Support me if you really love the content — real fans always find a way.\" What is the best judgment on this line?",
      [
        [
          "It fails as positioning because it uses comparison and guilt to work",
          true,
          "Correct — a positioning statement should stand alone without guilt or comparison tools.",
        ],
        [
          "It is fine because it mentions gifting clearly",
          false,
          "Wrong — clarity about gifting doesn't excuse guilt-based framing.",
        ],
        [
          "It only needs a countdown added to become income-safe",
          false,
          "Wrong — adding urgency makes it worse, not income-safe.",
        ],
        [
          "It is acceptable if said only once per stream",
          false,
          "Wrong — frequency doesn't fix a line built on guilt and comparison.",
        ],
      ],
    ),
    question(
      "q2",
      "A won't-do list entry reads: \"I won't be pushy about gifts.\" What should this creator do?",
      [
        [
          "Rewrite it as a specific, observable action, like naming an exact tactic they refuse",
          true,
          "Correct — vague mood statements are hard to check against in the moment.",
        ],
        [
          "Leave it as is since the intent is clear",
          false,
          "Wrong — vague entries are easy to unintentionally break under pressure.",
        ],
        [
          "Delete it since won't-do lists should only cover legal issues",
          false,
          "Wrong — won't-do lists are about personal and relationship boundaries, not just legality.",
        ],
        [
          "Move it to the positioning statement instead",
          false,
          "Wrong — the positioning statement and won't-do list serve different, complementary jobs.",
        ],
      ],
    ),
    question(
      "q3",
      "An offer idea passes the platform-safe and relationship-safe filters but the creator would be embarrassed if chat screenshotted exactly what they said. What filter does this fail?",
      [
        [
          "Reputation-safe",
          true,
          "Correct — reputation-safe checks whether you'd be comfortable with the exact words being shared publicly.",
        ],
        [
          "Platform-safe",
          false,
          "Wrong — the scenario states platform-safe already passed.",
        ],
        [
          "Relationship-safe",
          false,
          "Wrong — the scenario states relationship-safe already passed.",
        ],
        [
          "None — if it passes two filters it is income-safe",
          false,
          "Wrong — an offer must pass all three filters, not just two.",
        ],
      ],
    ),
    question(
      "q4",
      "During the LIVE Mission, how many times should a creator say their positioning statement?",
      [
        [
          "Once, calmly, without following it with an ask",
          true,
          "Correct — repetition turns a stated value into a pitch.",
        ],
        [
          "As many times as chat seems receptive",
          false,
          "Wrong — repeating the line based on reception turns it into selling.",
        ],
        [
          "Only at the very end of the stream as a closing pitch",
          false,
          "Wrong — the mission calls for a calm mid-session mention, not a closing pitch.",
        ],
        [
          "Zero times — positioning is written only, never spoken",
          false,
          "Wrong — the LIVE Mission specifically requires saying it once on a real session.",
        ],
      ],
    ),
    question(
      "q5",
      "A viewer asks the creator to start managing their TikTok account and recruit them into a team. How should this lesson's boundaries guide the response?",
      [
        [
          "Decline — recruiting creators into an agency or team is explicitly out of scope",
          true,
          "Correct — agency ownership and recruiting are hard boundaries for this entire path.",
        ],
        [
          "Accept if the positioning statement allows for growth opportunities",
          false,
          "Wrong — no positioning statement should include recruiting or agency framing.",
        ],
        [
          "Redirect the conversation to a paid mentorship instead",
          false,
          "Wrong — this still edges toward agency-style recruiting, which is out of scope.",
        ],
        [
          "Say yes but only after checking the won't-do list",
          false,
          "Wrong — the won't-do list addresses tactics, not whether to build a competing agency.",
        ],
      ],
    ),
    question(
      "q6",
      "Which of the following is the strongest example of a specific, observable won't-do entry?",
      [
        [
          "\"I will not run a countdown that implies the stream ends early if a goal isn't hit.\"",
          true,
          "Correct — it names an exact, checkable behavior.",
        ],
        [
          "\"I won't be greedy.\"",
          false,
          "Wrong — this is a vague mood statement, not an observable action.",
        ],
        [
          "\"I won't be annoying about money.\"",
          false,
          "Wrong — 'annoying' is subjective and impossible to check against consistently.",
        ],
        [
          "\"I'll try to keep things classy.\"",
          false,
          "Wrong — this has no specific, checkable behavior attached to it.",
        ],
      ],
    ),
    question(
      "q7",
      "A creator wants to add tax-saving tips to their positioning content to seem more professional. What's the correct move?",
      [
        [
          "Leave specific tax advice out entirely — this path teaches literacy, not tax advice",
          true,
          "Correct — specific tax advice is a hard boundary for the entire Professional Creator Mastery path.",
        ],
        [
          "Include general deduction percentages since they're common knowledge",
          false,
          "Wrong — specific deduction claims count as tax advice and are out of scope.",
        ],
        [
          "Only mention it if the creator has done their own taxes before",
          false,
          "Wrong — personal experience doesn't qualify someone to give tax advice to an audience.",
        ],
        [
          "Add it only to the won't-do list, not the positioning statement",
          false,
          "Wrong — tax advice doesn't belong in either document; it's out of scope for this lesson.",
        ],
      ],
    ),
    question(
      "q8",
      "How does this lesson connect to the next one, Offer Design for LIVE Creators?",
      [
        [
          "The positioning statement and won't-do list become the spine that the offer sheet builds on",
          true,
          "Correct — offer design inherits the values already decided here rather than re-deciding them.",
        ],
        [
          "Offer Design replaces the need for a positioning statement",
          false,
          "Wrong — positioning stays foundational; offer design builds on top of it.",
        ],
        [
          "They are unrelated lessons in different certificates",
          false,
          "Wrong — Offer Design for LIVE Creators is the very next lesson in this same path.",
        ],
        [
          "The won't-do list gets discarded once offers are designed",
          false,
          "Wrong — the won't-do list continues to filter every offer going forward.",
        ],
      ],
    ),
  ],
});
