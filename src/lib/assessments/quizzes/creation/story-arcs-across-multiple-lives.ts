import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "story-arcs-across-multiple-lives",
  programKey: "creation",
  title: "Quiz: Story Arcs Across Multiple LIVEs",
  questions: [
    question(
      "q1",
      "Viewers watch one strong LIVE but don't return for part two. What does CC-05 add beyond single-session entertainment?",
      [
        [
          "Multi-LIVE story arcs with checkpoints and a finale — appointment viewing across sessions",
          true,
          "Correct — arcs create reasons to return tomorrow, not just tonight.",
        ],
        [
          "Longer monologues each session so one LIVE feels like a movie",
          false,
          "Wrong — length without arc structure doesn't build serial return.",
        ],
        [
          "Fully scripted dialogue read line-for-line across the week",
          false,
          "Wrong — CC-05 avoids turning LIVE into scripted drama.",
        ],
        [
          "Cliffhangers that never pay off to keep mystery forever",
          false,
          "Wrong — arcs need checkpoints and finales, not endless bait.",
        ],
      ],
    ),
    question(
      "q2",
      "You're mapping a five-session 'Studio Build' arc. What belongs on the arc map?",
      [
        [
          "Session goals, open loops, checkpoint beats, and finale payoff — hostable without a script",
          true,
          "Correct — CC-05 deliverable is arc map + checkpoint checklist.",
        ],
        [
          "Every word you'll say for five hours total",
          false,
          "Wrong — over-scripting kills LIVE presence and flexibility.",
        ],
        [
          "Only the finale topic — earlier sessions can be improvised chaos",
          false,
          "Wrong — checkpoints carry viewers between sessions.",
        ],
        [
          "Competitor arc screenshots to copy beat-for-beat",
          false,
          "Wrong — arcs must fit your niche and stamina.",
        ],
      ],
    ),
    question(
      "q3",
      "Session three checkpoint: 'paint arrives — test on camera.' Session three paint is delayed. Best arc move?",
      [
        [
          "Adjust the checkpoint honestly on LIVE, tease the real beat, and update the map — keep the arc alive",
          true,
          "Correct — arcs flex with real life; transparency beats fake drama.",
        ],
        [
          "Pretend the paint arrived and fake the reaction",
          false,
          "Wrong — fabricated beats destroy authenticity and trust.",
        ],
        [
          "Abandon the entire arc silently and never mention it",
          false,
          "Wrong — ghosting an arc punishes return viewers.",
        ],
        [
          "End the path because one delay means arcs don't work for you",
          false,
          "Wrong — delay is calibration data, not disqualification.",
        ],
      ],
    ),
    question(
      "q4",
      "Which arc type fits CC-05 for a creator who hates personal oversharing?",
      [
        [
          "Series or challenge arc tied to the show's niche — progress viewers can track without private trauma",
          true,
          "Correct — personal, series, challenge, and mystery are options; pick what fits boundaries.",
        ],
        [
          "Forced personal drama arc because emotion always wins",
          false,
          "Wrong — arcs aren't permission to violate privacy or niche boundaries.",
        ],
        [
          "No arcs — CC-05 only applies to vlog-style creators",
          false,
          "Wrong — series and challenge arcs work for many formats.",
        ],
        [
          "Mystery arc where you never reveal the answer",
          false,
          "Wrong — mystery still needs a finale payoff.",
        ],
      ],
    ),
    question(
      "q5",
      "How should CC-05 use Presence storytelling (PR-04)?",
      [
        [
          "Micro-stories inside each session serve checkpoint beats — setup, turn, payoff within the arc slot",
          true,
          "Correct — PR-04 short-form craft feeds arc checkpoints, not hour-long essays.",
        ],
        [
          "Replace arc planning with pure spontaneous storytelling",
          false,
          "Wrong — spontaneity without checkpoints loses serial viewers.",
        ],
        [
          "Read PR-04 scripts verbatim across five sessions",
          false,
          "Wrong — not scripts; hostable beats.",
        ],
        [
          "Skip story entirely — arcs are only about themed overlays",
          false,
          "Wrong — narrative motion is the arc engine.",
        ],
      ],
    ),
    question(
      "q6",
      "A new viewer joins session four of five. What should your open include?",
      [
        [
          "Ten-second arc recap — where we are, what's at stake tonight, no shame for being new",
          true,
          "Correct — arcs must onboard late arrivals without humiliating them.",
        ],
        [
          "Tell them to watch replays for an hour before commenting",
          false,
          "Wrong — gatekeeping kills belonging.",
        ],
        [
          "Ignore the arc and restart from session one tonight",
          false,
          "Wrong — resets betray session-four regulars.",
        ],
        [
          "Assume they'll figure it out — insiders only",
          false,
          "Wrong — arcs should widen the room, not shrink it.",
        ],
      ],
    ),
    question(
      "q7",
      "Arc finale night: chat spikes mid-payoff. Professional host move?",
      [
        [
          "Brief acknowledgment, then land the planned finale beat — arcs need closure",
          true,
          "Correct — you lead the arc; spikes don't erase the payoff.",
        ],
        [
          "Drop the finale entirely to ride reactions for an hour",
          false,
          "Wrong — unpaid finales train viewers arcs don't matter.",
        ],
        [
          "End early because the spike already felt like payoff",
          false,
          "Wrong — intentional closure is the arc product.",
        ],
        [
          "Start a brand-new arc immediately with no debrief",
          false,
          "Wrong — finish, review, then design what's next.",
        ],
      ],
    ),
    question(
      "q8",
      "CC-05 mission success looks like…",
      [
        [
          "Arc map + checkpoint checklist used across 3–7 LIVEs with a documented finale",
          true,
          "Correct — scorecard + portfolio artifact exercised on air.",
        ],
        [
          "One viral moment without serial structure",
          false,
          "Wrong — virality isn't the arc deliverable.",
        ],
        [
          "Map written but sessions run unrelated to checkpoints",
          false,
          "Wrong — the map must shape real LIVEs.",
        ],
        [
          "Honors Lab story approval before session one",
          false,
          "Wrong — labs never gate; you ship and review.",
        ],
      ],
    ),
  ],
});
