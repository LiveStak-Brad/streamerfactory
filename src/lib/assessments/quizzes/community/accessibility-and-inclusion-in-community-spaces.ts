import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "accessibility-and-inclusion-in-community-spaces",
  programKey: "community",
  title: "Quiz: Accessibility and Inclusion in Community Spaces",
  questions: [
    question("q1", "Inclusive hosting on LIVE is best described as…", [
      [
        "Hospitality systems: fast welcome, readable norms, and joke boundaries newcomers can enter",
        true,
        "Correct — inclusion is practiced hospitality, not vibes alone.",
      ],
      [
        "Letting every rule slide so nobody feels limited",
        false,
        "Wrong — soft open + firm norms still apply.",
      ],
      [
        "Keeping the room insider-only so culture stays pure",
        false,
        "Wrong — freeze-out kills loyalty.",
      ],
      [
        "Buying better lights before you welcome anyone",
        false,
        "Wrong — this lesson is not a gear deep-dive.",
      ],
    ]),
    question("q2", "Time-to-first-welcome means…", [
      [
        "How quickly a new arrival gets a human welcome after you notice them",
        true,
        "Correct — shrink the gap between arrive and invite.",
      ],
      [
        "How long you wait before mentioning gifts",
        false,
        "Wrong — not about monetization timing.",
      ],
      [
        "How long regulars wait before roasting a new username",
        false,
        "Wrong — roasting newcomers is a joke-boundary fail.",
      ],
      [
        "How long until you change your niche for them",
        false,
        "Wrong — out of scope.",
      ],
    ]),
    question("q3", "Readable norms help because…", [
      [
        "Newcomers understand what the room is and how to join without a lore glossary",
        true,
        "Correct — plain language removes invisible fences.",
      ],
      [
        "Only regulars should ever hear the rules",
        false,
        "Wrong — that creates freeze-out.",
      ],
      [
        "Jargon-only pins prove culture strength",
        false,
        "Wrong — translate community phrases.",
      ],
      [
        "Norms replace the need to welcome people",
        false,
        "Wrong — you still welcome fast.",
      ],
    ]),
    question("q4", "A regular starts roasting a new username for sport. Best move?", [
      [
        "Redirect: welcoming energy only, greet the newcomer, continue the show",
        true,
        "Correct — joke boundaries protect inclusion.",
      ],
      [
        "Join the roast so the bit stays funny",
        false,
        "Wrong — punches down and freezes people out.",
      ],
      [
        "Ignore it because regulars earned joke rights",
        false,
        "Wrong — host the culture.",
      ],
      [
        "Demand the newcomer explain themselves first",
        false,
        "Wrong — interrogation is not hospitality.",
      ],
    ]),
    question("q5", "In this lesson, community accessibility primarily means…", [
      [
        "Language clarity and usable hospitality — not a Production Mastery gear shopping trip",
        true,
        "Correct — clarity first; gear lives elsewhere.",
      ],
      [
        "You must buy a new lighting kit before the mission counts",
        false,
        "Wrong — explicitly out of scope.",
      ],
      [
        "Only people who already know the slang may participate",
        false,
        "Wrong — translate insider language.",
      ],
      [
        "Turning the entire LIVE into orientation with no show",
        false,
        "Wrong — sprinkle welcomes; keep the show moving.",
      ],
    ]),
    question("q6", "Why run inclusion across the full LIVE, not only the open?", [
      [
        "Late arrivals need the same door — mid-session pulses prevent a warm open and a cold middle",
        true,
        "Correct — hospitality is continuous.",
      ],
      [
        "Opens do not matter if the middle is strong",
        false,
        "Wrong — both matter; checklist covers both.",
      ],
      [
        "Only the first ninety seconds affect loyalty",
        false,
        "Wrong — late joiners convert too.",
      ],
      [
        "Mods alone handle inclusion after minute five",
        false,
        "Wrong — the host still runs the system.",
      ],
    ]),
    question("q7", "How does PD-08 connect here?", [
      [
        "Recommended callback for calm recovery if a welcome or joke lands wrong — not a reteach of pressure mastery",
        true,
        "Correct — brief recovery skill; inclusion design is the core.",
      ],
      [
        "PD-08 replaces the Inclusion Checklist",
        false,
        "Wrong — checklist is still the outcome.",
      ],
      [
        "You must finish all of Presence Mastery before welcoming anyone",
        false,
        "Wrong — PD-08 is recommended, not a hard gate for hospitality practice.",
      ],
      [
        "Pressure recovery means you should never state norms",
        false,
        "Wrong — readable norms are required.",
      ],
    ]),
    question("q8", "LIVE Mission success for this lesson is…", [
      [
        "Applying the Inclusion Checklist across a full 45+ LIVE with fast welcomes, clear norms, and no insider freeze-out",
        true,
        "Correct — full-session hospitality practice.",
      ],
      [
        "Buying accessibility hardware before going live",
        false,
        "Wrong — gear deep-dive is out of scope.",
      ],
      [
        "Only welcoming high gifters",
        false,
        "Wrong — welcome gifters and non-gifters alike.",
      ],
      [
        "Keeping the room insider-only so regulars stay happy",
        false,
        "Wrong — that fails the mission.",
      ],
    ]),
  ],
});
