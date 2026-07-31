import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "what-gets-you-banned",
  programKey: "beginner",
  title: "Quiz: What gets you banned",
  questions: [
    question(
      "q1",
      "A viewer dares you to do something physically risky on stream for gifts, and chat is hyping it up. What does this lesson say to do?",
      [
        [
          "Run the one-second self-check, and decline because a context-free clip of it would not be comfortable to defend",
          true,
          "Correct — the self-check exists specifically for moments like this, regardless of how hyped chat is.",
        ],
        [
          "Do it because the room's excitement means it is probably fine",
          false,
          "Wrong — audience enthusiasm never overrides the self-check; this is a named mistake in the lesson.",
        ],
        [
          "Ask chat to vote on whether it is safe first",
          false,
          "Wrong — a vote does not change whether the act is a red-line behavior.",
        ],
        [
          "Do a smaller, quieter version of the same risky act instead",
          false,
          "Wrong — the category of harm does not shrink just because the act is scaled down.",
        ],
      ],
    ),
    question(
      "q2",
      "According to this lesson, what is the common thread that makes a behavior a red line?",
      [
        [
          "It involves a vulnerable person, real danger, or bad-faith manipulation of trust",
          true,
          "Correct — this is the shared pattern behind every behavior on the list.",
        ],
        [
          "It simply performs worse than your other content",
          false,
          "Wrong — this lesson explicitly separates weak content (fixable) from red-line content (account-ending).",
        ],
        [
          "It happens only during battles",
          false,
          "Wrong — red-line behaviors are not specific to any one format.",
        ],
        [
          "It was not planned in advance",
          false,
          "Wrong — planning has nothing to do with whether a behavior falls into a red-line category.",
        ],
      ],
    ),
    question(
      "q3",
      "Chat starts making a joke that edges toward a slur, framed as \"just a bit.\" What is the correct response from this lesson?",
      [
        [
          "Cut it immediately — \"Not doing that one, moving on\" — without debating the joke's intent",
          true,
          "Correct — intent does not excuse impact; a fast cut protects the room.",
        ],
        [
          "Let it continue since it was framed as a joke",
          false,
          "Wrong — \"it was a joke\" is named in this lesson as the least effective excuse.",
        ],
        [
          "Spend several minutes explaining exactly why the joke was wrong",
          false,
          "Wrong — over-explaining invites more pressure; a short, confident cut is the better move.",
        ],
        [
          "Wait to see if other viewers object before deciding",
          false,
          "Wrong — you do not need viewer consensus to redirect a hate-speech-adjacent joke.",
        ],
      ],
    ),
    question(
      "q4",
      "A viewer claims a fake emergency in chat and asks you to help solicit gifts on their behalf. What should you do?",
      [
        [
          "Decline to amplify or repeat the unverified claim, and redirect back to the stream",
          true,
          "Correct — financial deception combines platform risk with real-world exposure; do not repeat unverified claims.",
        ],
        [
          "Repeat the claim to chat since it might genuinely help someone",
          false,
          "Wrong — amplifying an unverified emergency claim is exactly the financial-deception risk this lesson warns about.",
        ],
        [
          "Quietly send them a gift yourself to end the conversation",
          false,
          "Wrong — this does not address the underlying risk of amplifying an unverified claim on stream.",
        ],
        [
          "Ban the viewer immediately without addressing it on stream",
          false,
          "Wrong — the lesson's example is a calm redirect, not an escalated reaction.",
        ],
      ],
    ),
    question(
      "q5",
      "Why does this lesson say ban evasion (new accounts to dodge a restriction, buying followers, coordinating fake viewership) is treated so seriously?",
      [
        [
          "It compounds the original issue and signals bad faith going forward",
          true,
          "Correct — evasion and manipulation erode the trust the platform's systems depend on.",
        ],
        [
          "It is only a minor issue if the original restriction was unfair",
          false,
          "Wrong — fairness of the original restriction does not change how evasion is treated.",
        ],
        [
          "It is treated the same as a first-time minor mistake",
          false,
          "Wrong — evasion and manipulation are explicitly named as compounding, not minor.",
        ],
        [
          "It only matters for creators with large followings",
          false,
          "Wrong — the risk applies at any account size.",
        ],
      ],
    ),
    question(
      "q6",
      "A trend is going viral involving a mildly dangerous physical stunt, and \"everyone is doing it.\" What does this lesson recommend?",
      [
        [
          "Run the self-check regardless of trend popularity, and skip or reframe it as a clearly-labeled \"don't try this\" commentary",
          true,
          "Correct — trend popularity has no bearing on whether a behavior is a red line.",
        ],
        [
          "Do the full stunt because everyone else is doing it safely",
          false,
          "Wrong — this is a named mistake: believing a popular trend is automatically safe.",
        ],
        [
          "Ignore the trend entirely and never mention it on stream",
          false,
          "Wrong — you can discuss a trend; the lesson's example is a labeled commentary version, not silence.",
        ],
        [
          "Ask a moderator to perform the stunt instead of you",
          false,
          "Wrong — shifting who performs a dangerous act does not remove the risk category.",
        ],
      ],
    ),
    question(
      "q7",
      "What is the fastest path to severe, permanent account action according to this lesson?",
      [
        [
          "Sexualized content involving minors, in any form, including roleplay or grooming-adjacent behavior",
          true,
          "Correct — this lesson names it explicitly as having zero gray area and the fastest severe outcome.",
        ],
        [
          "Talking about a topic you are not an expert in",
          false,
          "Wrong — this is not a red-line behavior; it is simply weak or underprepared content.",
        ],
        [
          "Running a LIVE with low viewer count",
          false,
          "Wrong — low viewer count is not a compliance issue at all.",
        ],
        [
          "Using a sticky-note run sheet during a session",
          false,
          "Wrong — a run sheet is a recommended structure tool, not a risk.",
        ],
      ],
    ),
    question(
      "q8",
      "What proves this lesson's LIVE Mission is complete?",
      [
        [
          "A 45+ minute LIVE where you avoided every red-line behavior and verbalized your self-check out loud at least once",
          true,
          "Correct — StreamerU grades demonstrated avoidance and the visible habit, not viewer count.",
        ],
        [
          "A 45-minute LIVE where you tested one red-line behavior carefully to see what happens",
          false,
          "Wrong — the mission requires avoiding every red-line behavior, not testing one.",
        ],
        [
          "Reading the red-line list without going live",
          false,
          "Wrong — study alone does not complete the mission.",
        ],
        [
          "Getting a large number of gifts during the session",
          false,
          "Wrong — gifts are not the pass condition for this lesson's mission.",
        ],
      ],
    ),
  ],
});
