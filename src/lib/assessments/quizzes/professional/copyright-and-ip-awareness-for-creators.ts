import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "copyright-and-ip-awareness-for-creators",
  programKey: "professional",
  title: "Quiz: Copyright and IP Awareness for Creators",
  questions: [
    question(
      "q1",
      "A creator has used a personal playlist of commercial songs as LIVE background music for over a year with no problems. What does this lesson say about that history?",
      [
        [
          "It does not prove the habit is safe — audit it anyway using the three risk labels",
          true,
          "Correct — absence of a problem so far is not the same as a cleared rights status.",
        ],
        [
          "A year without incident is sufficient proof of low risk",
          false,
          "Wrong — this is exactly the false safety signal the lesson warns against.",
        ],
        [
          "It only matters if the songs are currently in the charts",
          false,
          "Wrong — chart status has no bearing on the risk assessment described in this lesson.",
        ],
        [
          "It's fine as long as the creator doesn't mention the song titles on stream",
          false,
          "Wrong — not naming a track doesn't change its underlying rights status.",
        ],
      ],
    ),
    question(
      "q2",
      "Using the Clip/Music Decision Tree, what should a creator do when they are unsure where a funny clip originally came from?",
      [
        [
          "Treat it as uncertain and swap it for a cleared alternative",
          true,
          "Correct — the Decision Tree defaults to swapping whenever origin or rights are unclear.",
        ],
        [
          "Use it anyway since it's popular online",
          false,
          "Wrong — popularity is explicitly not a rights signal in this lesson.",
        ],
        [
          "Use it once and remove it if someone complains",
          false,
          "Wrong — the safer default is to swap before using it, not to wait for a complaint.",
        ],
        [
          "Add a short disclaimer on screen and proceed",
          false,
          "Wrong — a disclaimer doesn't resolve unclear rights status; the Decision Tree calls for swapping instead.",
        ],
      ],
    ),
    question(
      "q3",
      "A creator's signature opening line turns out to be very close to a well-known streamer's recognizable catchphrase. What is the recommended safer default?",
      [
        [
          "Retire the borrowed line and build a new, original one",
          true,
          "Correct — closely imitated brand elements should be retired even without a formal complaint.",
        ],
        [
          "Keep using it until someone formally objects",
          false,
          "Wrong — the lesson recommends proactively retiring closely imitated bits, not waiting for a complaint.",
        ],
        [
          "Add a credit line before saying it each time",
          false,
          "Wrong — crediting a closely imitated signature phrase doesn't fully resolve the concern; retiring it is the safer default.",
        ],
        [
          "Ask viewers to vote on whether to keep it",
          false,
          "Wrong — this is a creator judgment call about risk, not a popularity vote.",
        ],
      ],
    ),
    question(
      "q4",
      "A creator receives an actual takedown notice about content they used on a recent LIVE. What does this lesson instruct?",
      [
        [
          "Pause and get qualified legal help — this is beyond the lesson's decision-literacy scope",
          true,
          "Correct — actual notices or claims are the explicit line where legal help is required.",
        ],
        [
          "Use the IP Risk Audit Checklist to resolve the notice",
          false,
          "Wrong — the checklist is for everyday, lower-stakes decisions, not resolving actual legal notices.",
        ],
        [
          "Ignore it since it's likely automated and not a real concern",
          false,
          "Wrong — an actual notice should never be dismissed without qualified review.",
        ],
        [
          "Run it through the Clip/Music Decision Tree to decide next steps",
          false,
          "Wrong — the Decision Tree is for in-the-moment content choices, not responding to real legal notices.",
        ],
      ],
    ),
    question(
      "q5",
      "Which of the following best distinguishes lower-risk clip use from higher-risk clip use, according to this lesson?",
      [
        [
          "Short, clearly transformative reaction versus long, uninterrupted passive playback",
          true,
          "Correct — brief, commentary-driven reaction use is treated as lower risk than passive full playback.",
        ],
        [
          "Whether the clip is in color or black and white",
          false,
          "Wrong — visual format has no bearing on the risk assessment.",
        ],
        [
          "Whether the clip was found through a search engine or a direct link",
          false,
          "Wrong — the discovery method doesn't determine rights status or risk level.",
        ],
        [
          "Whether the creator personally finds the clip funny",
          false,
          "Wrong — personal enjoyment has no bearing on IP risk.",
        ],
      ],
    ),
    question(
      "q6",
      "Why does the lesson caution against treating widely-reposted memes or images as automatically safe to use?",
      [
        [
          "Because popularity or wide reposting is not proof of a cleared rights status",
          true,
          "Correct — common usage online doesn't establish that content is rights-cleared.",
        ],
        [
          "Because memes are always higher risk than music",
          false,
          "Wrong — the lesson doesn't rank categories against each other this way; each carries its own risk profile.",
        ],
        [
          "Because platforms automatically ban all meme usage",
          false,
          "Wrong — this is not a claim the lesson makes.",
        ],
        [
          "Because images require a different legal framework than clips",
          false,
          "Wrong — the lesson doesn't make this legal distinction; it stays at the decision-literacy level.",
        ],
      ],
    ),
    question(
      "q7",
      "A creator wants this lesson to tell them definitively whether a specific borrowed image constitutes copyright infringement. What is the correct expectation?",
      [
        [
          "This lesson provides decision literacy and safer defaults, not legal rulings on specific situations",
          true,
          "Correct — the lesson explicitly stops short of legal determinations, directing high-stakes or unclear cases to qualified help.",
        ],
        [
          "The IP Risk Audit Checklist provides a definitive legal ruling for any image",
          false,
          "Wrong — the checklist labels risk levels for decision-making; it is not a legal ruling.",
        ],
        [
          "Any image rated 'uncertain' on the checklist is legally confirmed to be infringing",
          false,
          "Wrong — 'uncertain' means the rights status isn't known, not that infringement is confirmed.",
        ],
        [
          "The Clip/Music Decision Tree applies to images as a legal determination tool",
          false,
          "Wrong — the Decision Tree is designed for clip and music decisions, and neither tool issues legal rulings.",
        ],
      ],
    ),
    question(
      "q8",
      "What is the correct mission expectation for changing safer defaults after completing the IP Risk Audit?",
      [
        [
          "Change one safer default, apply it on the next regular LIVE, and note exactly what changed",
          true,
          "Correct — the mission asks for one deliberate, documented change, not an overhaul of every category at once.",
        ],
        [
          "Change every category's default simultaneously before the next LIVE",
          false,
          "Wrong — the lesson recommends changing one default at a time to keep track of what changed.",
        ],
        [
          "Wait until an actual incident occurs before changing any default",
          false,
          "Wrong — the entire point of the audit is to change defaults proactively, before an incident forces it.",
        ],
        [
          "Only document risky items without making any actual changes",
          false,
          "Wrong — the mission requires applying a real change, not just documenting risk.",
        ],
      ],
    ),
  ],
});
