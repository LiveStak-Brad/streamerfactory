import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "your-first-live-structure",
  programKey: "beginner",
  title: "Quiz: Your first live structure",
  questions: [
    question(
      "q1",
      "You are twelve minutes into a LIVE with no written plan. Chat goes quiet and your mind blanks. What is the best long-term fix this lesson teaches?",
      [
        [
          "Build and use a run sheet (open → three segments → close) so you always know the next beat",
          true,
          "Correct — blank mind is usually a structure problem. A map offloads “what’s next” so you can host the room.",
        ],
        [
          "Wait silently until someone chats so you have something to react to",
          false,
          "Wrong — talking only when chat talks trains dead air. Host first.",
        ],
        [
          "End the LIVE immediately so you do not look awkward",
          false,
          "Wrong — ending randomly teaches quitting. Recover with a segment bullet or emergency prompt, then close on purpose later.",
        ],
        [
          "Switch niches every two minutes until something feels exciting",
          false,
          "Wrong — topic-hopping reads as chaos. Finish a named segment before you bridge.",
        ],
      ],
    ),
    question(
      "q2",
      "A viewer joins at minute 14 during Segment 2. What should you do?",
      [
        [
          "Welcome them briefly, restate the topic and current segment, then continue",
          true,
          "Correct — late joiners missed the open. Short context + current segment is how you re-earn attention.",
        ],
        [
          "Ignore them so you do not break your flow",
          false,
          "Wrong — a one-sentence orientation is part of hosting, not a distraction.",
        ],
        [
          "Restart the entire LIVE from your opening promise",
          false,
          "Wrong — a full restart punishes people who have been watching. Recap, then continue.",
        ],
        [
          "Stop talking until they type a question",
          false,
          "Wrong — lurkers need audio and rhythm even when they do not chat.",
        ],
      ],
    ),
    question(
      "q3",
      "Which run-of-show best matches this lesson’s beginner framework?",
      [
        [
          "Open → Segment 1 → Segment 2 → Segment 3 → Close, with transition hooks",
          true,
          "Correct — five jobs with clear purposes. Three middle segments are enough to practice without overload.",
        ],
        [
          "Whatever happens until you get bored, then leave",
          false,
          "Wrong — improvisation without a map is what this lesson eliminates.",
        ],
        [
          "Twenty micro-segments of thirty seconds each",
          false,
          "Wrong — too many cuts make the stream frantic and hard to hold.",
        ],
        [
          "Battles only for the entire session",
          false,
          "Wrong — battles come later. Lesson 2 is hosting structure.",
        ],
      ],
    ),
    question(
      "q4",
      "Chat dies mid-segment. Which move matches Dead Chat Recovery?",
      [
        [
          "Rephrase your segment question, offer an A/B choice, or give a short example — then continue the bullets",
          true,
          "Correct — restart the conversation loop without staring at viewer count.",
        ],
        [
          "Stare at the viewer count until someone saves you",
          false,
          "Wrong — viewer count watching increases silence and panic.",
        ],
        [
          "Apologize for being boring for two full minutes",
          false,
          "Wrong — long apologies train people to leave. Reset and host.",
        ],
        [
          "End the stream because quiet chat means failure",
          false,
          "Wrong — quiet rooms are practice rooms. Finish the map.",
        ],
      ],
    ),
    question(
      "q5",
      "Why does this lesson say intentional repetition helps retention?",
      [
        [
          "People join at random times and need fresh context about topic and current segment",
          true,
          "Correct — the audience keeps changing. Restating context is hosting, not “being boring.”",
        ],
        [
          "TikTok requires you to repeat the same sentence every sixty seconds",
          false,
          "Wrong — there is no such requirement; this is a hosting habit.",
        ],
        [
          "Repetition forces gifts to appear",
          false,
          "Wrong — Lesson 2 is not monetization. Structure supports clarity, not gift pressure.",
        ],
        [
          "You should never say the topic twice in one LIVE",
          false,
          "Wrong — late joiners need the topic again at segment starts.",
        ],
      ],
    ),
    question(
      "q6",
      "You finish Segment 3 eight minutes early. What should you avoid?",
      [
        [
          "Ending randomly with no close because you “ran out of content”",
          true,
          "Correct — use emergency prompts or deepen the theme, then run a deliberate close.",
        ],
        [
          "Using your emergency conversation list still tied to today’s theme",
          false,
          "Wrong — that is the right recovery tool.",
        ],
        [
          "Adding one more example inside Segment 3 before closing",
          false,
          "Wrong — deepening a named segment is fine.",
        ],
        [
          "Running recap → thanks → next-session tease, then ending",
          false,
          "Wrong — that is a proper close.",
        ],
      ],
    ),
    question(
      "q7",
      "A gift lands while you are mid-sentence. Best recovery?",
      [
        [
          "Acknowledge quickly, thank them, then loop back to the exact point you were on",
          true,
          "Correct — interruptions get a short reset, not a brand-new show (unless you planned a gift segment).",
        ],
        [
          "Abandon the segment and only talk about gifts for the rest of the LIVE",
          false,
          "Wrong — that teaches you to throw away the map every time something happens.",
        ],
        [
          "Ignore every gift forever so you never break flow",
          false,
          "Wrong — a brief thank-you is part of hosting; then return to the map.",
        ],
        [
          "End the LIVE so the gift moment stays “special”",
          false,
          "Wrong — ending randomly wastes the session you structured.",
        ],
      ],
    ),
    question(
      "q8",
      "What proves this lesson’s LIVE Mission?",
      [
        [
          "A 25+ minute LIVE that follows your written run sheet — open, three segments, transitions, and a deliberate close — regardless of views",
          true,
          "Correct — StreamerU grades execution of structure, not popularity.",
        ],
        [
          "Reading the lesson twice without going live",
          false,
          "Wrong — study alone does not complete the mission.",
        ],
        [
          "Getting one gift in the first minute",
          false,
          "Wrong — gifts are not the pass condition for Lesson 2.",
        ],
        [
          "A screenshot of someone else’s outline",
          false,
          "Wrong — you must execute your own structured LIVE.",
        ],
      ],
    ),
  ],
});
