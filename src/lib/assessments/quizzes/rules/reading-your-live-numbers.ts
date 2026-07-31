import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "reading-your-live-numbers",
  programKey: "rules",
  title: "Quiz: Reading Your LIVE Numbers",
  questions: [
    question("q1", "What is the main job of the weekly LIVE analytics scorecard?", [
      [
        "Turn one week of numbers into one clear decision that updates your OS",
        true,
        "Correct — professionals diagnose, decide once, then run the next week on purpose.",
      ],
      [
        "Collect as many screenshots as possible for motivation",
        false,
        "Wrong — screenshots without a decision are not a reading system.",
      ],
      [
        "Prove you should rebrand whenever a day is quiet",
        false,
        "Wrong — quiet days are not automatic brand verdicts.",
      ],
      [
        "Replace your Creator Operating System entirely with dashboards",
        false,
        "Wrong — numbers update the OS; they do not replace it.",
      ],
    ]),
    question("q2", "Which set matches the lesson's three scorecard metric types?", [
      [
        "Integrity, Experience, and Relationship",
        true,
        "Correct — plan honesty, show quality, and return reasons.",
      ],
      [
        "Peak viewers, gift spikes, and competitor totals",
        false,
        "Wrong — those are classic vanity traps when crowned as primaries.",
      ],
      [
        "Followers, likes, and logo impressions",
        false,
        "Wrong — not the Advanced Creator weekly LIVE scorecard.",
      ],
      [
        "Revenue only, measured hourly",
        false,
        "Wrong — income matters, but this lesson teaches broader weekly literacy first.",
      ],
    ]),
    question("q3", "You hit a personal-best peak on Wednesday but skipped Thursday and Friday. What should Integrity say?", [
      [
        "The week is not a success story yet — restore the calendar before celebrating the peak",
        true,
        "Correct — Integrity vetoes growth fantasies when the plan was broken.",
      ],
      [
        "The peak proves the system works and missed days do not matter",
        false,
        "Wrong — missed days are the Integrity failure.",
      ],
      [
        "You should immediately rebrand because consistency is impossible",
        false,
        "Wrong — that is panic, not diagnosis.",
      ],
      [
        "Delete the scorecard so the week still feels good",
        false,
        "Wrong — lying by omission is still lying with numbers.",
      ],
    ]),
    question("q4", "Where do peak viewers and single gift spikes belong on the scorecard?", [
      [
        "In a vanity notes margin — interesting, not automatically the decision driver",
        true,
        "Correct — vanity notes stay off the throne.",
      ],
      [
        "As the only two metrics that matter every week",
        false,
        "Wrong — they make weak primary weekly scoreboards.",
      ],
      [
        "Nowhere — professionals never look at them",
        false,
        "Wrong — they can be notes; they just should not run the week alone.",
      ],
      [
        "As proof you must stream eight hours the next day",
        false,
        "Wrong — spikes do not justify revenge volume.",
      ],
    ]),
    question("q5", "Which is a good 'one change' after reading the week?", [
      [
        "Shorten Friday because Experience collapsed after 50 minutes twice",
        true,
        "Correct — specific, behavioral, tied to the scorecard.",
      ],
      [
        "Change brand, schedule, niche, and battle strategy all at once",
        false,
        "Wrong — stacked changes make nothing measurable.",
      ],
      [
        "Try harder and manifest better numbers",
        false,
        "Wrong — not an actionable OS edit.",
      ],
      [
        "Quit because one Tuesday was quiet",
        false,
        "Wrong — single-session verdicts are not weekly reading.",
      ],
    ]),
    question("q6", "You lack clear platform dashboards. What should you do?", [
      [
        "Use observable proxies — planned vs completed, held length, named returners",
        true,
        "Correct — proxies are professional tools when dashboards are incomplete.",
      ],
      [
        "Skip analytics lessons until the app UI is perfect",
        false,
        "Wrong — literacy still matters with observable data.",
      ],
      [
        "Invent impressive numbers so the scorecard looks complete",
        false,
        "Wrong — honesty is the whole point.",
      ],
      [
        "Only compare yourself to larger creators' public totals",
        false,
        "Wrong — comparison highlights are not your operating metrics.",
      ],
    ]),
    question("q7", "How do weekly scorecards connect to the Advanced Creator Capstone?", [
      [
        "They become evidence in the 30-Day Pro Sprint dossier — before/after reading, not vibes",
        true,
        "Correct — Capstone expects reviewable scorecards beside OS and brand.",
      ],
      [
        "They replace the Capstone if you have enough screenshots",
        false,
        "Wrong — Capstone still requires the full sprint dossier.",
      ],
      [
        "They are only required inside an optional Honors Lab",
        false,
        "Wrong — scorecards are required learning; Labs are optional after certification.",
      ],
      [
        "They unlock agency recruiting analytics",
        false,
        "Wrong — outside StreamerU's creator-excellence lane.",
      ],
    ]),
    question("q8", "What does success look like on the Scorecard Decision LIVE Mission?", [
      [
        "A completed scorecard with one change, plus a 45+ minute LIVE that names and protects that focus",
        true,
        "Correct — honest diagnosis + on-stream follow-through, not a bigger peak.",
      ],
      [
        "A longer stats lecture than the actual show",
        false,
        "Wrong — name the focus plainly; do not turn LIVE into a dashboard class.",
      ],
      [
        "Hitting a new peak to validate the scorecard",
        false,
        "Wrong — peak is not the grade for this mission.",
      ],
      [
        "Skipping the LIVE because the spreadsheet is neat",
        false,
        "Wrong — the decision must meet a real session.",
      ],
    ]),
  ],
});
