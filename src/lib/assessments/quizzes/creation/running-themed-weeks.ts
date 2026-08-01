import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "running-themed-weeks",
  programKey: "creation",
  title: "Quiz: Running Themed Weeks",
  questions: [
    question(
      "q1",
      "You want viewers to treat this week as an event, not seven random LIVEs. What does CC-04 require first?",
      [
        [
          "One clear week theme with daily angles mapped and a planned finale payoff",
          true,
          "Correct — themes create narrative gravity across sessions.",
        ],
        [
          "Seven unrelated trending topics so the algorithm sees variety",
          false,
          "Wrong — trend-chasing without theme scatters appointment viewing.",
        ],
        [
          "A new niche statement every day to keep things fresh",
          false,
          "Wrong — CC-01 niche stays; themes express it across days.",
        ],
        [
          "Waiting until Growth Mastery to plan any multi-day content",
          false,
          "Wrong — CC-04 is the themed-week skill in this path.",
        ],
      ],
    ),
    question(
      "q2",
      "Day three of 'Reset Week' feels flat — same energy as a normal Tuesday. Likely miss?",
      [
        [
          "The daily angle didn't visibly connect to the theme — viewers couldn't feel the thread",
          true,
          "Correct — daily angles are how the theme shows up in each session.",
        ],
        [
          "Themes only work if viewer count rises every day",
          false,
          "Wrong — theme success is craft and payoff design, not daily peaks.",
        ],
        [
          "You should abandon the theme and go fully improvised",
          false,
          "Wrong — mid-week theme drops waste the finale setup.",
        ],
        [
          "Flat days mean the theme was wrong — restart with a new theme tomorrow",
          false,
          "Wrong — adjust the angle execution before throwing away the plan.",
        ],
      ],
    ),
    question(
      "q3",
      "How should recurring segments (CC-03) behave during a themed week?",
      [
        [
          "Keep segment names and rules — vary content inside them to match the theme",
          true,
          "Correct — familiarity plus thematic variation stacks retention.",
        ],
        [
          "Pause all segments so the theme has full attention",
          false,
          "Wrong — segments are return hooks; themes layer on top.",
        ],
        [
          "Rename segments daily so nothing repeats",
          false,
          "Wrong — renaming destroys expectation CC-03 built.",
        ],
        [
          "Only run segments on the finale day",
          false,
          "Wrong — segments should appear across the week with themed angles.",
        ],
      ],
    ),
    question(
      "q4",
      "You're planning the finale for 'Skill Swap Week.' What makes a strong themed-week close?",
      [
        [
          "A payoff that closes loops opened Mon–Thu and gives viewers a reason to remember the week",
          true,
          "Correct — CC-04 maps theme → daily angles → finale payoff.",
        ],
        [
          "A surprise unrelated guest with no tie to the theme",
          false,
          "Wrong — random finales don't land thematic gravity.",
        ],
        [
          "Ending early because you're tired — they'll understand",
          false,
          "Wrong — finale is the appointment payoff; plan capacity accordingly.",
        ],
        [
          "Reading the planner aloud instead of performing the payoff",
          false,
          "Wrong — the planner shapes the show; it isn't the show.",
        ],
      ],
    ),
    question(
      "q5",
      "Life hits mid-week and you must skip a planned LIVE. Best themed-week adjustment?",
      [
        [
          "Rebuild the remaining days so the finale still pays off — compress angles, don't pretend the skip didn't happen",
          true,
          "Correct — professionals adjust the system to real life, like Advanced Creator OS calibration.",
        ],
        [
          "Cancel the entire theme because perfection is required",
          false,
          "Wrong — partial weeks can still deliver if you replan honestly.",
        ],
        [
          "Run a normal unrelated LIVE and call it themed anyway",
          false,
          "Wrong — fake theme days erode trust in your calendar.",
        ],
        [
          "Double length on the next day to 'make up' without changing the planner",
          false,
          "Wrong — revenge stacking usually wrecks quality and recovery.",
        ],
      ],
    ),
    question(
      "q6",
      "Promo for themed week: what should viewers hear before Go Live?",
      [
        [
          "Theme name, what changes this week, which day is finale, and why to show up",
          true,
          "Correct — themes need promo as much as segments need names.",
        ],
        [
          "Only 'going LIVE tonight' with no theme mention",
          false,
          "Wrong — generic promo doesn't build week-level appointment.",
        ],
        [
          "Full day-by-day script spoilers for every segment",
          false,
          "Wrong — promo sells gravity, not the entire run of show.",
        ],
        [
          "Wait until day seven to explain what the week was about",
          false,
          "Wrong — anticipation starts before session one.",
        ],
      ],
    ),
    question(
      "q7",
      "Themed weeks connect to story arcs (CC-05) how?",
      [
        [
          "A week theme can be one chapter inside a longer multi-LIVE arc",
          true,
          "Correct — CC-04 is weekly gravity; CC-05 stretches across sessions.",
        ],
        [
          "Arcs replace themed weeks entirely after CC-04",
          false,
          "Wrong — both tools coexist at different time scales.",
        ],
        [
          "Arcs are only for scripted drama creators",
          false,
          "Wrong — CC-05 explicitly avoids turning LIVE into scripted drama.",
        ],
        [
          "You must finish CC-05 before attempting any themed week",
          false,
          "Wrong — CC-04 prerequisite is CC-03, not CC-05.",
        ],
      ],
    ),
    question(
      "q8",
      "CC-04 mission success is…",
      [
        [
          "Themed-week planner completed for one real week, executed with daily angles and a finale payoff",
          true,
          "Correct — template + completed action on real LIVEs.",
        ],
        [
          "A planner filled out but never run on LIVE",
          false,
          "Wrong — planning without execution doesn't pass.",
        ],
        [
          "Highest viewer count of your career during the week",
          false,
          "Wrong — not graded by peaks alone.",
        ],
        [
          "Honors Lab approval of your theme title",
          false,
          "Wrong — labs are optional and never gate.",
        ],
      ],
    ),
  ],
});
