import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "protecting-community-health-and-yourself",
  programKey: "community",
  title: "Quiz: Protecting Community Health (and Yourself)",
  questions: [
    question("q1", "A healthy parasocial bond on LIVE means…", [
      [
        "Viewers can feel familiar with the show while you stay clearly in the host role with boundaries",
        true,
        "Correct — familiarity plus host clarity, not 24/7 friendship.",
      ],
      [
        "You owe every regular unlimited DM access because they watch often",
        false,
        "Wrong — warmth is not unlimited access.",
      ],
      [
        "You should deepen emotional dependence so people never leave",
        false,
        "Wrong — dependence and exploitation are never taught here.",
      ],
      [
        "You must share private family details to prove you care",
        false,
        "Wrong — privacy defaults still apply.",
      ],
    ]),
    question("q2", "Manufactured intimacy for retention looks like…", [
      [
        "Escalating private disclosure to buy loyalty instead of using rituals and recognition",
        true,
        "Correct — selective sharing beats intimacy auctions.",
      ],
      [
        "Running a named weekly ritual your community expects",
        false,
        "Wrong — rituals are healthy belonging design.",
      ],
      [
        "Stating a calm boundary and continuing the show",
        false,
        "Wrong — that is healthy enforcement.",
      ],
      [
        "Keeping DMs for logistics and approvals",
        false,
        "Wrong — that is a healthy response norm.",
      ],
    ]),
    question("q3", "When stating a healthy boundary on LIVE, best practice is…", [
      [
        "One calm line without apology theater, then continue the beat",
        true,
        "Correct — standards, not guilt speeches.",
      ],
      [
        "A long apology explaining why you feel bad for having needs",
        false,
        "Wrong — apology theater undermines the boundary.",
      ],
      [
        "Guilt-tripping the chat for making you set a rule",
        false,
        "Wrong — guilt is never the tool.",
      ],
      [
        "Debating friendship rankings until everyone agrees how close you are",
        false,
        "Wrong — restate the host frame; do not rank intimacy.",
      ],
    ]),
    question("q4", "A regular says 'I thought we were friends' after you enforce a rule. You should…", [
      [
        "Restate the host frame once, avoid debating closeness, and continue the show",
        true,
        "Correct — role clarity over intimacy argument.",
      ],
      [
        "Offer private friendship to keep them from leaving",
        false,
        "Wrong — that trains entitlement.",
      ],
      [
        "Shame them on air for needing boundaries",
        false,
        "Wrong — firm and calm, not humiliation.",
      ],
      [
        "Abandon the rule so the room stays 'family'",
        false,
        "Wrong — rules protect community health.",
      ],
    ]),
    question("q5", "Chat starts crisis-dumping mid-LIVE. Best host move?", [
      [
        "Thank them, redirect off crisis content, point toward real support if needed, return to the segment",
        true,
        "Correct — host the room; do not become the therapist of record.",
      ],
      [
        "Stop the show and process their emergency for the next hour",
        false,
        "Wrong — that collapses the host role.",
      ],
      [
        "Ask everyone to share their trauma for engagement",
        false,
        "Wrong — manufactured intensity harms the room.",
      ],
      [
        "Ignore platform harassment tools if someone turns hostile afterward",
        false,
        "Wrong — escalate with CM-04 tools when needed.",
      ],
    ]),
    question("q6", "How does AC-07 (privacy) connect to this lesson?", [
      [
        "Privacy defaults still govern what never goes on camera or into community culture as closeness currency",
        true,
        "Correct — community health extends privacy into relationship expectations.",
      ],
      [
        "Privacy only matters for passwords; community can share anything",
        false,
        "Wrong — crumbs and oversharing are still risks.",
      ],
      [
        "AC-07 replaces the need for a Community Health Policy",
        false,
        "Wrong — privacy and relationship norms are related but not identical.",
      ],
      [
        "You should share more private details after AC-07 to seem authentic",
        false,
        "Wrong — authenticity does not require unsafe disclosure.",
      ],
    ]),
    question("q7", "Which approach is never taught in this lesson?", [
      [
        "Using emotional dependence, guilt, or parasocial exploitation to keep viewers",
        true,
        "Correct — those patterns are explicitly out of bounds.",
      ],
      [
        "Writing DM response norms before you need them",
        false,
        "Wrong — that is core teaching.",
      ],
      [
        "Selective sharing aligned with privacy defaults",
        false,
        "Wrong — that is core teaching.",
      ],
      [
        "Publishing a Community Health Policy to yourself first",
        false,
        "Wrong — that is the lesson outcome.",
      ],
    ]),
    question("q8", "LIVE Mission success for this lesson is graded on…", [
      [
        "A completed Community Health Policy plus a 45+ LIVE where you state 1–2 healthy boundaries without apology theater",
        true,
        "Correct — policy applied and boundaries spoken; not viewer luck.",
      ],
      [
        "How many gifts you receive after a vulnerability dump",
        false,
        "Wrong — gifts are not the grade.",
      ],
      [
        "Proving every regular feels like a private friend",
        false,
        "Wrong — that collapses the host role.",
      ],
      [
        "Skipping LIVE because the policy document looks complete",
        false,
        "Wrong — LIVE execution is required.",
      ],
    ]),
  ],
});
