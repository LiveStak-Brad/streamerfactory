import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "improving-battle-performance",
  programKey: "battles",
  title: "Quiz: Improving battle performance",
  questions: [
    question(
      "q1",
      "You lost two battles this week and want to improve fast. What approach matches this lesson?",
      [
        [
          "Change one variable at a time, measure, then decide the next experiment",
          true,
          "Correct — controlled iteration beats random overhauls.",
        ],
        [
          "Change everything after every loss so nothing feels the same",
          false,
          "Wrong — you cannot learn causality that way.",
        ],
        [
          "Ignore all feedback and hope talent appears",
          false,
          "Wrong — feedback and review are the fuel.",
        ],
        [
          "Copy only the most toxic meta you saw go viral",
          false,
          "Wrong — short-term and brand-damaging.",
        ],
      ],
    ),
    question(
      "q2",
      "You have been screaming nonstop for three minutes and your voice is dying. Best energy move?",
      [
        [
          "Pace peaks for key moments — controlled spikes beat constant max volume",
          true,
          "Correct — energy management is a performance skill.",
        ],
        [
          "Whisper the entire rest of the match so you save yourself",
          false,
          "Wrong — under-energy loses presence; modulate, do not disappear.",
        ],
        [
          "Mute yourself and let chat host",
          false,
          "Wrong — you are still the host.",
        ],
        [
          "Leave the camera to rest while the battle continues",
          false,
          "Wrong — AFK breaks the match standard.",
        ],
      ],
    ),
    question(
      "q3",
      "The scoreboard swings against you. How should you use that information?",
      [
        [
          "Let it inform tactics and CTAs without panicking your tone",
          true,
          "Correct — data guides; panic repels supporters.",
        ],
        [
          "Rage at chat for not 'showing up'",
          false,
          "Wrong — destructive and usually backfires.",
        ],
        [
          "Ignore the scoreboard entirely forever",
          false,
          "Wrong — some awareness helps timing; obsession is the problem.",
        ],
        [
          "Decide rules no longer apply because you are behind",
          false,
          "Wrong — rules always apply.",
        ],
      ],
    ),
    question(
      "q4",
      "Which improvement usually has high leverage in early battles?",
      [
        [
          "Clearer mid-battle resets and CTAs so attention and asks stay sharp",
          true,
          "Correct — attention and asks drive participation more than random volume.",
        ],
        [
          "Longer apology monologues when behind",
          false,
          "Wrong — apologies dump energy.",
        ],
        [
          "Hiding your topic so opponents cannot prepare",
          false,
          "Wrong — clarity still helps your own room.",
        ],
        [
          "Never practicing solo again",
          false,
          "Wrong — solo reps still sharpen talk.",
        ],
      ],
    ),
    question(
      "q5",
      "A partner offers feedback after the match. When is it useful?",
      [
        [
          "When it is specific and kind enough to act on — and you share notes back",
          true,
          "Correct — actionable mutual notes beat vague shade.",
        ],
        [
          "Only when it is insults that 'toughen you up'",
          false,
          "Wrong — insults are not a performance system.",
        ],
        [
          "Never — partner feedback replaces nothing useful",
          false,
          "Wrong — external eyes catch blind spots.",
        ],
        [
          "Only if they promise you will win next time",
          false,
          "Wrong — feedback is about process, not guarantees.",
        ],
      ],
    ),
    question(
      "q6",
      "Your postmortem is only 'chat failed me.' What is missing?",
      [
        [
          "A next experiment — blame without a test stalls growth",
          true,
          "Correct — improvement culture needs a concrete next try.",
        ],
        [
          "More public shaming of your room",
          false,
          "Wrong — that destroys culture.",
        ],
        [
          "Deleting the VOD so you never review",
          false,
          "Wrong — review is how you improve.",
        ],
        [
          "Switching niches before the next battle",
          false,
          "Wrong — process first, identity later.",
        ],
      ],
    ),
    question(
      "q7",
      "You notice you always fade in the last third of matches. Best experiment?",
      [
        [
          "Plan one intentional energy peak and one reset CTA for late-match minutes, then review if it helped",
          true,
          "Correct — target the weak phase with one change and measure.",
        ],
        [
          "Start every match at maximum scream and never stop",
          false,
          "Wrong — that usually worsens fade and voice strain.",
        ],
        [
          "Quit battles until you feel 100% ready",
          false,
          "Wrong — readiness grows from tested reps.",
        ],
        [
          "Blame hydration only and change nothing about hosting",
          false,
          "Wrong — hydration helps, but hosting patterns still need experiments.",
        ],
      ],
    ),
    question(
      "q8",
      "What proves this lesson’s mission?",
      [
        [
          "A real battle LIVE where you apply one planned improvement and write what you learned afterward",
          true,
          "Correct — StreamerU grades executed experiments, not vibes.",
        ],
        [
          "Reading tips without battling",
          false,
          "Wrong — study alone is not the mission.",
        ],
        [
          "Winning is the only pass condition",
          false,
          "Wrong — process and review matter more than a single scoreboard.",
        ],
        [
          "Getting one gift before the match starts",
          false,
          "Wrong — not the improvement pass condition.",
        ],
      ],
    ),
  ],
});
