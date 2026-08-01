import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "reading-business-health-beyond-gift-totals",
  programKey: "professional",
  title: "Quiz: Reading Business Health Beyond Gift Totals",
  questions: [
    question(
      "q1",
      "A creator's 30-day gift total looks strong, but one supporter accounts for roughly 40% of it. What does this reveal?",
      [
        [
          "Meaningful concentration risk — a large share of income depends on one source",
          true,
          "Correct — concentration risk measures how much would vanish if the top source disappeared.",
        ],
        [
          "Nothing concerning, since the total itself is strong",
          false,
          "Wrong — a strong total can hide fragility that only shows up when broken apart by source.",
        ],
        [
          "A sustainable rate problem specifically",
          false,
          "Wrong — this describes concentration risk, not the sustainable pace lens.",
        ],
        [
          "A session contribution problem specifically",
          false,
          "Wrong — this is about source concentration, not which sessions produced the income.",
        ],
      ],
    ),
    question(
      "q2",
      "A creator's 30-day total looks healthy, but one viral-clip night produced most of it while the other 27 sessions combined barely matched it. Which lens does this describe?",
      [
        [
          "Session contribution",
          true,
          "Correct — this lens reveals whether one outlier session is carrying an otherwise average month.",
        ],
        [
          "Concentration risk",
          false,
          "Wrong — concentration risk is about income sources (who), not which sessions (when).",
        ],
        [
          "Sustainable rate thinking",
          false,
          "Wrong — this scenario is about session-level distribution, not pace repeatability.",
        ],
        [
          "Buffer rules",
          false,
          "Wrong — buffer rules are from the previous lesson and concern spending order, not session analysis.",
        ],
      ],
    ),
    question(
      "q3",
      "A creator ran an intense five-session-per-week schedule to hit a strong monthly total but admits they couldn't sustain that pace for a year. What should the Business Health Snapshot reflect?",
      [
        [
          "An honest 'no' on the sustainable rate check, even though the total looked strong",
          true,
          "Correct — sustainability is about the typical repeatable pace, not whether a peak total was hit.",
        ],
        [
          "A 'yes' on sustainability, since the total proves it worked once",
          false,
          "Wrong — achieving a total once doesn't mean the pace behind it is repeatable.",
        ],
        [
          "Skip the sustainable rate section since the numbers already look good",
          false,
          "Wrong — the honest check should happen regardless of how strong the numbers look.",
        ],
        [
          "Recalculate concentration risk instead, since that's the more important lens",
          false,
          "Wrong — this scenario specifically tests the sustainable rate lens, not concentration risk.",
        ],
      ],
    ),
    question(
      "q4",
      "How many concentration risks and sustainability actions should the mission's Business Health Snapshot name?",
      [
        [
          "Exactly one of each — depth over a long list",
          true,
          "Correct — the mission specifically asks for one named risk and one named action.",
        ],
        [
          "As many of each as can be found in the data",
          false,
          "Wrong — a long list dilutes focus; the mission asks for exactly one of each.",
        ],
        [
          "Three risks and three actions to match the top-three source calculation",
          false,
          "Wrong — the top-three calculation is part of the scorecard, but the mission still asks for one named risk and one action.",
        ],
        [
          "Zero — this lesson is analysis only, with no required action",
          false,
          "Wrong — naming one action is a required part of the mission.",
        ],
      ],
    ),
    question(
      "q5",
      "How does this lesson differ from Growth Mastery's GR-03 analytics deep dive?",
      [
        [
          "This lesson reads income concentration and sustainability; GR-03 reads audience growth and retention",
          true,
          "Correct — same 30-day window, but a completely different lens.",
        ],
        [
          "This lesson replaces GR-03 entirely for creators who complete Professional Creator Mastery",
          false,
          "Wrong — the two lessons serve different purposes and neither replaces the other.",
        ],
        [
          "This lesson is a simplified rehash of GR-03 for creators who skipped Growth Mastery",
          false,
          "Wrong — this lesson explicitly avoids rehashing GR-03's growth analytics content.",
        ],
        [
          "There is no meaningful difference; both use the same metrics",
          false,
          "Wrong — the lessons use entirely different metrics (income vs. audience/reach).",
        ],
      ],
    ),
    question(
      "q6",
      "A creator discovers significant concentration risk and considers recruiting three other creators into a shared income-pooling team to diversify. What's the correct judgment?",
      [
        [
          "This is out of scope — the lesson addresses concentration risk through the creator's own offers, not by recruiting a team",
          true,
          "Correct — recruiting other creators into a team or agency structure is a hard boundary across this path.",
        ],
        [
          "This is a reasonable sustainability action to write on the snapshot",
          false,
          "Wrong — recruiting creators into a shared structure crosses into agency-style team building, which is out of scope.",
        ],
        [
          "It's fine as long as the income split is documented in the tracker",
          false,
          "Wrong — documentation doesn't resolve the scope boundary against recruiting/agency structures.",
        ],
        [
          "It's the only real fix for concentration risk",
          false,
          "Wrong — diversifying recognition and offers within the creator's own room is the intended fix, not team recruiting.",
        ],
      ],
    ),
    question(
      "q7",
      "Why does this lesson avoid stating a universal 'safe' concentration risk percentage?",
      [
        [
          "Because concentration risk is about awareness and individual judgment, not a pass/fail grade",
          true,
          "Correct — the lesson treats this as a fragility awareness tool, not a fixed threshold.",
        ],
        [
          "Because concentration risk doesn't matter for most creators",
          false,
          "Wrong — the lesson treats concentration risk as a meaningful, worth-tracking signal.",
        ],
        [
          "Because platform rules prohibit stating percentages",
          false,
          "Wrong — this isn't a platform-rule issue; it's a deliberate teaching choice about awareness over grading.",
        ],
        [
          "Because it would count as financial advice under securities law",
          false,
          "Wrong — this is an oversimplified and inaccurate legal claim not made by the lesson.",
        ],
      ],
    ),
    question(
      "q8",
      "What is the correct relationship between this lesson's snapshot and the tracker built in the previous lesson?",
      [
        [
          "The snapshot is a periodic read of the tracker's real data — the tracker itself should keep running",
          true,
          "Correct — the snapshot analyzes existing tracked data; it doesn't replace ongoing tracking.",
        ],
        [
          "The snapshot replaces the need to keep updating the tracker",
          false,
          "Wrong — the tracker should continue running so future snapshots have real data.",
        ],
        [
          "The tracker and snapshot are unrelated tools for different purposes",
          false,
          "Wrong — the snapshot depends entirely on data pulled from the tracker.",
        ],
        [
          "The snapshot should be built from memory if the tracker has gaps",
          false,
          "Wrong — the snapshot should reflect honest, tracked data, marking gaps rather than guessing from memory.",
        ],
      ],
    ),
  ],
});
