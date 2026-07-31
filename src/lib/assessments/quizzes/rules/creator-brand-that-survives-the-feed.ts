import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "creator-brand-that-survives-the-feed",
  programKey: "rules",
  title: "Quiz: Creator Brand That Survives the Feed",
  questions: [
    question("q1", "In this lesson, what is creator brand primarily?", [
      [
        "A three-second promise plus repeatable on-stream behaviors that make you recognizable",
        true,
        "Correct — brand survives the feed as clarity and behavior, not as a logo kit.",
      ],
      [
        "A finished logo, color palette, and merch line before you go live again",
        false,
        "Wrong — visuals can follow; promise and behaviors come first.",
      ],
      [
        "A plan for recruiting creators into your own network",
        false,
        "Wrong — StreamerU teaches creator excellence, not agency ownership.",
      ],
      [
        "Whatever niche is trending this week on the For You page",
        false,
        "Wrong — chasing weekly trends without a promise creates brand leaks.",
      ],
    ]),
    question("q2", "Why does Advanced Creator teach brand after the Creator Operating System?", [
      [
        "Because a promise without a real weekly calendar becomes a costume you cannot sustain",
        true,
        "Correct — OS capacity makes brand believable; brand makes the OS recognizable.",
      ],
      [
        "Because analytics must come before any brand language",
        false,
        "Wrong — numbers come next; brand sits between OS and analytics in this path.",
      ],
      [
        "Because Core never taught profile setup at all",
        false,
        "Wrong — Core covered setup; Advanced Creator deepens professional recognition.",
      ],
      [
        "Because the Capstone only cares about logos",
        false,
        "Wrong — the Capstone dossier includes OS + brand + scorecards + experiment review.",
      ],
    ]),
    question("q3", "Which positioning promise is written in a usable brand form?", [
      [
        "I help new TikTok LIVE creators with honest check-ins and one practical fix per session",
        true,
        "Correct — who it's for + what they get, specific enough to recognize.",
      ],
      ["I do lifestyle content and vibes", false, "Wrong — too vague to survive three seconds."],
      [
        "I am building a media empire across every niche",
        false,
        "Wrong — unfocused promises are hard to prove on LIVE.",
      ],
      [
        "Whatever chat wants tonight determines who I am",
        false,
        "Wrong — that is vibes, not a brand promise.",
      ],
    ]),
    question("q4", "How many proof behaviors should your Brand One-Pager lock in?", [
      [
        "Exactly three observable on-stream behaviors regulars could describe",
        true,
        "Correct — three is the discipline; ten pillars become wallpaper.",
      ],
      ["Ten brand pillars so nothing is missing", false, "Wrong — too many pillars dilute recognition."],
      ["None — brand is only the bio text", false, "Wrong — brand must show up as LIVE behavior."],
      [
        "One new catchphrase copied from a bigger creator each week",
        false,
        "Wrong — rented catchphrases create a rented identity.",
      ],
    ]),
    question("q5", "Your bio says 'Nightly at 8' but your OS only has three LIVE days. What should you do?", [
      [
        "Rewrite the bio to match your real OS capacity",
        true,
        "Correct — brand is honesty at scale; schedule claims must be sustainable.",
      ],
      [
        "Keep the bio and secretly skip most nights so it still sounds ambitious",
        false,
        "Wrong — broken schedule promises train people not to trust you.",
      ],
      [
        "Delete the OS and stream only when the bio feels true",
        false,
        "Wrong — the OS stays; the overpromise is what changes.",
      ],
      [
        "Add 'maybe' to the bio and hope viewers understand",
        false,
        "Wrong — maybe-language is still vibes on a profile.",
      ],
    ]),
    question("q6", "Which situation is a brand leak?", [
      [
        "Bio promises helpful creator tips, but several LIVEs are only algorithm venting with no tip",
        true,
        "Correct — promise and behavior contradict each other.",
      ],
      [
        "You open with today's promise and close with next LIVE time",
        false,
        "Wrong — that is brand alignment, not a leak.",
      ],
      [
        "You keep the same three proof behaviors for 30 days",
        false,
        "Wrong — consistency is the point of the one-pager.",
      ],
      [
        "You update the bio the same day you honestly change the promise",
        false,
        "Wrong — coordinated updates prevent leaks.",
      ],
    ]),
    question("q7", "How does this lesson connect to the Advanced Creator Capstone?", [
      [
        "The Brand One-Pager becomes a core page of the 30-Day Pro Sprint dossier beside your OS",
        true,
        "Correct — Capstone integrates OS, brand, scorecards, and experiment retrospective.",
      ],
      [
        "Brand work replaces the Capstone if your logo looks professional",
        false,
        "Wrong — Capstone still requires the full sprint dossier.",
      ],
      [
        "Brand pages are only for optional Honors Lab and can be skipped for the certificate",
        false,
        "Wrong — brand is required Advanced Creator learning; Labs are optional after certification.",
      ],
      [
        "This lesson unlocks Manager College recruiting tools",
        false,
        "Wrong — outside the creator-excellence lane.",
      ],
    ]),
    question("q8", "What does success look like on the Brand Proof LIVE Mission?", [
      [
        "A completed one-pager plus a 45+ minute LIVE that opens with the promise and shows all three behaviors",
        true,
        "Correct — success is clarity and follow-through, not a follower spike.",
      ],
      [
        "A new logo reveal even if the LIVE has no clear promise",
        false,
        "Wrong — logo without promise misses the lesson.",
      ],
      [
        "Rebranding twice during the same LIVE to find what chat likes",
        false,
        "Wrong — that is the opposite of a stable one-pager.",
      ],
      [
        "Skipping the LIVE because the Brand One-Pager looks neat",
        false,
        "Wrong — brand that never runs on LIVE is still a draft.",
      ],
    ]),
  ],
});
