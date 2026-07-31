import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "your-creator-operating-system",
  programKey: "rules",
  title: "Quiz: Your Creator Operating System",
  questions: [
    question("q1", "What is a Creator Operating System in this lesson?", [
      [
        "A one-page weekly agreement covering aim, LIVE calendar, one metric, capacity rules, and review",
        true,
        "Correct — the OS is a simple, usable page, not a complex productivity stack.",
      ],
      [
        "A full agency playbook for recruiting and managing other creators",
        false,
        "Wrong — Advanced Creator teaches how you operate as a creator, not agency ownership.",
      ],
      [
        "A dashboard that tracks every LIVE metric available on the platform",
        false,
        "Wrong — professionals pick one primary metric for the month, not every number.",
      ],
      [
        "A motivational routine you only use when you feel inspired to stream",
        false,
        "Wrong — the OS replaces vibes with intentional weekly operation.",
      ],
    ]),
    question("q2", "Why does Advanced Creator start with an operating system before brand or analytics?", [
      [
        "Because later skills need a weekly system to plug into, or they become random thrashing",
        true,
        "Correct — without an OS, brand, analytics, and experiments have nowhere durable to live.",
      ],
      [
        "Because Core never taught consistency or weekly habits",
        false,
        "Wrong — Core taught those habits; Advanced Creator turns them into a professional OS.",
      ],
      [
        "Because logos and color palettes must wait until after you hire a designer",
        false,
        "Wrong — brand comes next, and it is about promise and behavior, not hiring a designer first.",
      ],
      [
        "Because the Graduation Exam requires an OS certificate first",
        false,
        "Wrong — Core Diploma and Advanced Creator are related but the OS is not a Graduation Exam prerequisite.",
      ],
    ]),
    question("q3", "Which weekly aim is written in a checkable professional form?", [
      [
        "Complete four planned LIVEs with a spoken open promise and one value moment each",
        true,
        "Correct — a stranger could understand it, and Sunday night can verify it.",
      ],
      ["Grow my account this week", false, "Wrong — 'grow' is vague and cannot be checked cleanly."],
      [
        "Be more entertaining than last week somehow",
        false,
        "Wrong — 'somehow' is vibes, not an operating aim.",
      ],
      [
        "Get more viewers than the creator I compare myself to",
        false,
        "Wrong — comparison goals are not behavior you control through an OS.",
      ],
    ]),
    question("q4", "What should your primary OS metric for the month usually prioritize?", [
      [
        "A behavior-linked number you can decide from — like sessions completed vs planned",
        true,
        "Correct — the OS metric should drive a clear weekly decision, not feed vanity.",
      ],
      [
        "Peak concurrent viewers as the only scoreboard that matters",
        false,
        "Wrong — peak viewers can be a note; they are a weak primary OS metric early on.",
      ],
      [
        "Twelve analytics charts updated daily so nothing is missed",
        false,
        "Wrong — tracking everything usually produces anxiety, not decisions.",
      ],
      [
        "Someone else's gift totals so you know the real standard",
        false,
        "Wrong — other people's totals are not your operating metric.",
      ],
    ]),
    question("q5", "You wrote a seven-day LIVE calendar and already missed two days by Wednesday. What should you do?", [
      [
        "Rebuild the calendar closer to reality — often around 70% of the heroic version",
        true,
        "Correct — professionals adjust the system to real life instead of clinging to fantasy plans.",
      ],
      [
        "Keep the seven-day plan and shame yourself into catching up with doubles every remaining day",
        false,
        "Wrong — revenge stacking usually wrecks quality and recovery.",
      ],
      [
        "Throw away the OS entirely and go back to streaming only when you feel like it",
        false,
        "Wrong — missing days is calibration data, not a reason to return to vibes.",
      ],
      [
        "Change your primary metric to peak viewers so the week still feels successful",
        false,
        "Wrong — swapping to a vanity metric hides the planning problem.",
      ],
    ]),
    question("q6", "What belongs in the weekly review ritual?", [
      [
        "Plan vs actual vs one change — finished in about 15–20 minutes",
        true,
        "Correct — short, specific, and decision-oriented.",
      ],
      [
        "A two-hour deep dive rewriting your entire niche and brand from scratch",
        false,
        "Wrong — long reviews become chores people skip; brand work has its own lesson.",
      ],
      [
        "Only celebrating wins and skipping anything that went wrong",
        false,
        "Wrong — honest actuals matter, including misses.",
      ],
      [
        "Publicly posting every metric screenshot for accountability",
        false,
        "Wrong — the review is an operating habit, not a content obligation.",
      ],
    ]),
    question("q7", "How does today's OS connect to the Advanced Creator Capstone?", [
      [
        "It becomes page one of the 30-Day Pro Sprint dossier you will revise and review",
        true,
        "Correct — the Capstone integrates OS, brand, scorecards, and an experiment retrospective.",
      ],
      [
        "It replaces the Capstone so you can skip the rest of Advanced Creator",
        false,
        "Wrong — AC-01 unlocks the path; the Capstone comes after AC-01 through AC-07.",
      ],
      [
        "It is only required if you join an optional Honors Lab",
        false,
        "Wrong — the OS is required learning; Honors Labs are optional after the certificate.",
      ],
      [
        "It is a Manager College prerequisite for recruiting creators",
        false,
        "Wrong — that is outside StreamerU's creator-excellence lane.",
      ],
    ]),
    question("q8", "What does success look like on the OS Proof LIVE Mission?", [
      [
        "A written OS plus a 45+ minute LIVE that followed today's aim, with a short post-LIVE log",
        true,
        "Correct — success is behavior and proof the OS is real, not viewer count.",
      ],
      [
        "Hitting a new peak viewer record to validate the system",
        false,
        "Wrong — viewer count is not the grade for this mission.",
      ],
      [
        "Reading your entire worksheet aloud for thirty minutes",
        false,
        "Wrong — the OS should shape the show, not become the show.",
      ],
      [
        "Skipping the LIVE if the worksheet looks neat enough",
        false,
        "Wrong — an OS that never runs on LIVE is still a diary.",
      ],
    ]),
  ],
});
