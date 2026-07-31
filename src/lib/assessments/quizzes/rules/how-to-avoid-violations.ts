import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "how-to-avoid-violations",
  programKey: "beginner",
  title: "Quiz: How to avoid violations",
  questions: [
    question(
      "q1",
      "When is the best time to recruit and brief a moderator, according to this lesson?",
      [
        [
          "During a calm, well-performing session, before your chat has an actual problem",
          true,
          "Correct — trust and clarity built in advance are what let a moderator act fast and confidently later.",
        ],
        [
          "The moment chat starts getting heated",
          false,
          "Wrong — waiting until you desperately need one is a named mistake in this lesson.",
        ],
        [
          "Only after you have already been restricted once",
          false,
          "Wrong — that is reactive, exactly the pattern this lesson is designed to prevent.",
        ],
        [
          "Never — moderators should only be added by the platform automatically",
          false,
          "Wrong — this lesson explicitly teaches you to recruit and brief moderators yourself.",
        ],
      ],
    ),
    question(
      "q2",
      "What makes chat norms actually work, according to this lesson?",
      [
        [
          "Keeping them to three or four simple rules that regulars can repeat to newcomers themselves",
          true,
          "Correct — norms scale when your community enforces them without your direct involvement.",
        ],
        [
          "Writing a long, detailed rulebook covering every possible scenario",
          false,
          "Wrong — long lists get ignored; this lesson recommends capping norms at three or four.",
        ],
        [
          "Never mentioning the rules unless someone breaks one",
          false,
          "Wrong — pinning and briefly restating norms helps regulars reinforce them.",
        ],
        [
          "Changing the rules every session to keep chat alert",
          false,
          "Wrong — consistency is what lets regulars internalize and enforce norms.",
        ],
      ],
    ),
    question(
      "q3",
      "A viewer pushes you toward a fenced topic mid-stream. What does this lesson say to do?",
      [
        [
          "Execute the decision you already made before going live — decline calmly and bridge back to your current segment",
          true,
          "Correct — a fence removes the decision from the pressured moment; you just execute it.",
        ],
        [
          "Decide in the moment whether the topic feels okay this time",
          false,
          "Wrong — this lesson explicitly warns against deciding topic boundaries mid-conversation.",
        ],
        [
          "Engage fully since the viewer seems genuinely curious",
          false,
          "Wrong — a topic fence applies regardless of how the request is framed.",
        ],
        [
          "End the LIVE immediately to avoid the topic entirely",
          false,
          "Wrong — a calm decline-and-bridge is the correct response, not ending the session.",
        ],
      ],
    ),
    question(
      "q4",
      "A regular viewer repeatedly requests a specific commercial song. What is the correct response from this lesson?",
      [
        [
          "Keep the sound-source habit consistent without exception, and offer to talk about the song instead of playing it",
          true,
          "Correct — making music exceptions for enthusiastic requests is a named mistake to avoid.",
        ],
        [
          "Make an exception since they are a loyal supporter",
          false,
          "Wrong — this lesson specifically warns against exceptions for enthusiastic requests.",
        ],
        [
          "Play a short clip only, since a little bit should be fine",
          false,
          "Wrong — the sound-sourcing habit does not have a partial-exception version.",
        ],
        [
          "Ignore the request completely without any response",
          false,
          "Wrong — the lesson's example offers a warm alternative rather than silence.",
        ],
      ],
    ),
    question(
      "q5",
      "What does this lesson recommend when a clear violation happens in your chat?",
      [
        [
          "Use the platform's report tool, remove or restrict the account calmly, and briefly document it privately",
          true,
          "Correct — clean reporting hygiene protects you without dragging the session off its plan.",
        ],
        [
          "Publicly call out the offending account at length so everyone sees them held accountable",
          false,
          "Wrong — public callouts reward bad actors with attention and rarely improve the situation.",
        ],
        [
          "Ignore it completely so it does not become a bigger moment",
          false,
          "Wrong — ignoring a clear violation is different from a calm, quiet removal; the lesson recommends acting, just not loudly.",
        ],
        [
          "Argue with the account until they apologize on stream",
          false,
          "Wrong — this drags the session off its plan and rarely resolves anything.",
        ],
      ],
    ),
    question(
      "q6",
      "According to this lesson's escalation approach, what is the difference between a warning and a timeout?",
      [
        [
          "Warnings fit first-time minor issues; timeouts fit repeat or clearer issues, applied consistently",
          true,
          "Correct — consistency in when you use each teaches your chat what to expect.",
        ],
        [
          "There is no difference — they should always be used together",
          false,
          "Wrong — the lesson distinguishes them by severity and repetition.",
        ],
        [
          "Timeouts are for first offenses and warnings are for repeat offenders",
          false,
          "Wrong — this reverses the lesson's recommended order.",
        ],
        [
          "Warnings and timeouts are decided by chat vote each time",
          false,
          "Wrong — you, as host or moderator, apply them consistently, not by audience vote.",
        ],
      ],
    ),
    question(
      "q7",
      "Why does this lesson describe compliance as a 'systems problem, not a willpower problem'?",
      [
        [
          "Because pre-built systems (moderators, norms, fences, sound habits) protect you even on tired or distracted nights when willpower alone would not",
          true,
          "Correct — systems built while calm are what hold up under fatigue or pressure.",
        ],
        [
          "Because willpower is the most reliable tool for staying compliant every single night",
          false,
          "Wrong — this lesson explicitly argues the opposite.",
        ],
        [
          "Because systems remove all need to ever think about compliance again",
          false,
          "Wrong — systems reduce the burden, but you still apply judgment; they don't eliminate it entirely.",
        ],
        [
          "Because only large creators with staff need systems at all",
          false,
          "Wrong — the systems in this lesson apply at any account size, including solo streamers.",
        ],
      ],
    ),
    question(
      "q8",
      "What proves this lesson's LIVE Mission is complete?",
      [
        [
          "A 45–60 minute LIVE with active moderation, at least one chat norm reinforced, and topic fences held the entire time",
          true,
          "Correct — StreamerU grades visible, applied systems, not viewer count.",
        ],
        [
          "A session where you disabled moderation to see what happens naturally",
          false,
          "Wrong — this directly contradicts the moderation-forward mission requirement.",
        ],
        [
          "Reading the lesson and writing fences without going live",
          false,
          "Wrong — study alone does not complete the mission.",
        ],
        [
          "A session where a moderator handled everything with no host involvement",
          false,
          "Wrong — the mission requires you to actively apply the systems yourself, whether solo or with a moderator.",
        ],
      ],
    ),
  ],
});
