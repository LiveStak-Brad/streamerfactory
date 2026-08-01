import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "offer-design-for-live-creators",
  programKey: "professional",
  title: "Quiz: Offer Design for LIVE Creators",
  questions: [
    question(
      "q1",
      "A creator drafts a primary offer with four tiers and three conditions. What should they do before adding it to the Offer Sheet?",
      [
        [
          "Simplify it to one plain sentence a regular could repeat to a newcomer",
          true,
          "Correct — a good offer passes the 'could chat explain it' test.",
        ],
        [
          "Keep all four tiers since more options give viewers more choice",
          false,
          "Wrong — more tiers create confusion, not clearer support.",
        ],
        [
          "Move the extra tiers into the secondary offer instead",
          false,
          "Wrong — the secondary offer should be a separate, simple offer, not a dumping ground for extra tiers.",
        ],
        [
          "Add a countdown to make the tiers feel more urgent",
          false,
          "Wrong — urgency is a pressure tactic, not a fix for an overloaded offer.",
        ],
      ],
    ),
    question(
      "q2",
      "A creator's secondary offer asks for the exact same action as their primary offer, just worded differently. What is the correct fix?",
      [
        [
          "Delete one of the offers — a room only needs one primary ask per session",
          true,
          "Correct — a secondary offer that duplicates the primary is redundant and confusing.",
        ],
        [
          "Keep both since repetition reinforces the ask",
          false,
          "Wrong — this creates confusion about which is 'the' offer, not reinforcement.",
        ],
        [
          "Raise the secondary offer's ask so it feels distinct",
          false,
          "Wrong — raising the ask doesn't fix the underlying duplication.",
        ],
        [
          "Rename the secondary offer so it sounds different",
          false,
          "Wrong — a cosmetic rename doesn't resolve functional duplication.",
        ],
      ],
    ),
    question(
      "q3",
      "Before adding an offer idea to the Offer Sheet, what must it pass?",
      [
        [
          "The Won't-Do List and the Income-Safe Offer Fit Checker",
          true,
          "Correct — both filters from the previous lesson apply to every new offer.",
        ],
        [
          "Only a gut-feeling check on how exciting it sounds",
          false,
          "Wrong — excitement is not a filter; the written tools are.",
        ],
        [
          "A test run live before deciding whether to write it down",
          false,
          "Wrong — offers should be filtered on paper before ever reaching LIVE.",
        ],
        [
          "Approval from other creators in the same niche",
          false,
          "Wrong — offer design is about your own audience and values, not peer approval.",
        ],
      ],
    ),
    question(
      "q4",
      "What separates an income-safe offer cue from a pressure tactic using nearly identical words?",
      [
        [
          "Tone, frequency, and what happens if nobody responds",
          true,
          "Correct — the same topic can be a calm offer or a coercive tactic depending on these factors.",
        ],
        [
          "Whether the creator smiles while saying it",
          false,
          "Wrong — tone matters, but smiling alone doesn't determine pressure versus offer.",
        ],
        [
          "How much money the offer generates",
          false,
          "Wrong — revenue outcome doesn't determine whether a tactic is ethical.",
        ],
        [
          "Whether it's said during a goal-fill moment",
          false,
          "Wrong — timing alone doesn't distinguish pressure from a clean offer.",
        ],
      ],
    ),
    question(
      "q5",
      "During the LIVE Mission, how many times should the primary offer cue be delivered?",
      [
        [
          "Once, calmly, without repeating it or stacking another ask on top",
          true,
          "Correct — repetition or stacking turns a cue into pressure.",
        ],
        [
          "Every ten minutes to maximize visibility",
          false,
          "Wrong — repeated delivery is exactly the pressure pattern this lesson teaches against.",
        ],
        [
          "Only if the goal hasn't been reached yet",
          false,
          "Wrong — the cue's delivery shouldn't be conditioned on goal progress.",
        ],
        [
          "As many times as needed until someone responds",
          false,
          "Wrong — conditioning repetition on a response is a pressure tactic.",
        ],
      ],
    ),
    question(
      "q6",
      "A creator considers a 'gift now or miss the bonus round forever' framing for their primary offer. What should happen?",
      [
        [
          "Reject it at the Won't-Do List filter stage — it implies a scarcity threat",
          true,
          "Correct — this framing fails the filter before it should ever reach the Offer Sheet.",
        ],
        [
          "Keep it but only say it once per session",
          false,
          "Wrong — frequency doesn't fix a coercive framing; the content itself is the problem.",
        ],
        [
          "Soften the wording slightly and proceed",
          false,
          "Wrong — the core threat (permanent loss) needs to be removed, not softened.",
        ],
        [
          "Move it to the secondary offer instead",
          false,
          "Wrong — the tactic is unethical regardless of which offer slot it occupies.",
        ],
      ],
    ),
    question(
      "q7",
      "A viewer offers to help the creator recruit other streamers into a paid team structure in exchange for a cut of gifts. What is the correct response per this lesson's boundaries?",
      [
        [
          "Decline — recruiting creators into a paid team or agency structure is out of scope",
          true,
          "Correct — agency-style recruiting is a hard boundary across the entire path.",
        ],
        [
          "Accept if it's framed as a 'secondary offer'",
          false,
          "Wrong — no offer framing makes recruiting into a paid structure acceptable here.",
        ],
        [
          "Accept only if the cut is small",
          false,
          "Wrong — the size of the cut doesn't change that this is out-of-scope recruiting.",
        ],
        [
          "Run it through the Income-Safe Offer Fit Checker first",
          false,
          "Wrong — this proposal should be declined outright, not filtered as a legitimate offer.",
        ],
      ],
    ),
    question(
      "q8",
      "How does the completed Offer Sheet connect to the next lesson, Income Systems and Money Operations?",
      [
        [
          "It names what actually generates income, which the tracking system needs as a starting point",
          true,
          "Correct — you can't sensibly track income without first naming its sources.",
        ],
        [
          "It replaces the need for any income tracking",
          false,
          "Wrong — the Offer Sheet and the income tracker serve different, connected purposes.",
        ],
        [
          "It has no connection; the two lessons are independent",
          false,
          "Wrong — Income Systems is the very next lesson and builds directly on the Offer Sheet.",
        ],
        [
          "It determines the creator's tax category",
          false,
          "Wrong — this lesson and the next stay in recordkeeping literacy, not tax categorization.",
        ],
      ],
    ),
  ],
});
