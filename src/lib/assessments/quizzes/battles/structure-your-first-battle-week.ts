import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "structure-your-first-battle-week",
  programKey: "battles",
  title: "Quiz: Running your first battle",
  questions: [
    question(
      "q1",
      "You are about to run your first real battle week. What mindset matches this lesson?",
      [
        [
          "Treat it as structured reps with reflection after each match — not one heroic win-or-quit night",
          true,
          "Correct — skill compounds across multiple runs with debriefs.",
        ],
        [
          "Win one battle then never battle again so you stay undefeated",
          false,
          "Wrong — one data point is weak learning; the week is for reps.",
        ],
        [
          "Skip all solo LIVE skills because battles replace hosting",
          false,
          "Wrong — solo hosting still supports battle presence.",
        ],
        [
          "Buy gifts for yourself to inflate the scoreboard",
          false,
          "Wrong — unhealthy and often against rules/norms.",
        ],
      ],
    ),
    question(
      "q2",
      "Mid-battle, chat looks confused about what to do. Best move?",
      [
        [
          "Give a short, clear CTA tied to the moment — people need a simple next action under time pressure",
          true,
          "Correct — confusion wastes battle seconds; clarity helps participation.",
        ],
        [
          "Stay silent so you do not 'sound salesy'",
          false,
          "Wrong — silence under time pressure loses the room’s focus.",
        ],
        [
          "Yell at non-gifters until someone acts",
          false,
          "Wrong — toxic and damages culture.",
        ],
        [
          "Let the opponent host your side of the room",
          false,
          "Wrong — you must host your own side.",
        ],
      ],
    ),
    question(
      "q3",
      "You lose a match. What does sportsmanship look like?",
      [
        [
          "Thank both sides, keep the door open for a rematch, and note one thing to improve",
          true,
          "Correct — relationships and learning outlast a single scoreboard.",
        ],
        [
          "Insult the winner’s fans on the way out",
          false,
          "Wrong — burns partners and reputation.",
        ],
        [
          "Accuse cheating with no evidence",
          false,
          "Wrong — escalates toxicity and rarely helps.",
        ],
        [
          "End without goodbye and disappear",
          false,
          "Wrong — a weak close teaches unreliability.",
        ],
      ],
    ),
    question(
      "q4",
      "How should you schedule battles across a first practice week?",
      [
        [
          "Pick realistic times, communicate them, and leave recovery between hard sessions",
          true,
          "Correct — supporters cannot show up to mystery times, and stacking too many burns quality.",
        ],
        [
          "Never tell anyone when you will battle",
          false,
          "Wrong — secrecy hurts turnout.",
        ],
        [
          "Stack twenty battles with no rest",
          false,
          "Wrong — burnout and quality drop.",
        ],
        [
          "Cancel every time you feel slightly nervous",
          false,
          "Wrong — nerves are normal; reps reduce them.",
        ],
      ],
    ),
    question(
      "q5",
      "Right after a battle ends, what should you do before you forget the match?",
      [
        [
          "Run a short debrief: what worked, what flopped, one tweak for next time",
          true,
          "Correct — debriefs turn reps into improvement.",
        ],
        [
          "Delete all memory of losses so you stay confident",
          false,
          "Wrong — losses are data.",
        ],
        [
          "Publicly shame gifters who 'failed you'",
          false,
          "Wrong — destroys community trust.",
        ],
        [
          "Immediately change niches because one loss means the niche is dead",
          false,
          "Wrong — overreaction; iterate process, not identity.",
        ],
      ],
    ),
    question(
      "q6",
      "Your partner is late and chat is restless before start. Best recovery?",
      [
        [
          "Host your side calmly, restate the plan, and keep energy steady until the match can begin cleanly",
          true,
          "Correct — you still host the room; panic dumps trust before the battle even starts.",
        ],
        [
          "Blame the partner on stream for five minutes",
          false,
          "Wrong — damages the partnership and the room.",
        ],
        [
          "End the LIVE immediately without closing",
          false,
          "Wrong — end only if you must; otherwise hold structure.",
        ],
        [
          "Start inventing rule-breaking dares to fill time",
          false,
          "Wrong — boredom is not a reason to cross safety lines.",
        ],
      ],
    ),
    question(
      "q7",
      "What proves this lesson’s mission?",
      [
        [
          "Completing real battle session(s) with structure, clear CTAs, sportsmanship, and a written review",
          true,
          "Correct — execution plus reflection is the loop.",
        ],
        [
          "Only watching battle VODs without participating",
          false,
          "Wrong — observation is not completion.",
        ],
        [
          "Passing Manager College first",
          false,
          "Wrong — out of order for this curriculum path.",
        ],
        [
          "Buying a win",
          false,
          "Wrong — invalid and harmful.",
        ],
      ],
    ),
    question(
      "q8",
      "Why does this lesson emphasize a week of battles rather than a single match?",
      [
        [
          "Multiple reps reveal patterns — nerves, CTAs, and recovery improve with practice",
          true,
          "Correct — one match is a snapshot; a week builds skill.",
        ],
        [
          "TikTok requires seven battles to unlock gifts",
          false,
          "Wrong — not a platform rule taught here.",
        ],
        [
          "You must battle every hour forever",
          false,
          "Wrong — quality and recovery matter.",
        ],
        [
          "Solo LIVEs become illegal after one battle",
          false,
          "Wrong — false.",
        ],
      ],
    ),
  ],
});
