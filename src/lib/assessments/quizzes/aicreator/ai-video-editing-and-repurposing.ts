import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "ai-video-editing-and-repurposing",
  programKey: "aicreator",
  title: "Quiz: AI Video, Editing, and Repurposing",
  questions: [
    question(
      "q1",
      "AI captions misstate a key tip. What do you do?",
      [
        ["Correct the caption before publishing using a quality checklist.", true, "Correct — caption QA is mandatory for meaning."],
        ["Ship it because speed matters more.", false, "Wrong — speed does not justify false teaching."],
        ["Blame the audience for misreading.", false, "Wrong — the publisher owns clarity."],
        ["Auto-post five more with the same error.", false, "Wrong — multiplying errors is worse."],
      ],
    ),
    question(
      "q2",
      "What makes a good short from a LIVE?",
      [
        ["A complete micro-promise with accurate context you approved.", true, "Correct — promise plus approval protects integrity."],
        ["The loudest random moment, even if misleading.", false, "Wrong — loudness without truth misleads."],
        ["A deepfake reaction face.", false, "Wrong — deepfake misuse is prohibited."],
        ["A fabricated comment overlay.", false, "Wrong — fabricated overlays are deceptive."],
      ],
    ),
    question(
      "q3",
      "Why avoid vendor lock-in thinking?",
      [
        ["Because features change; principles and gates should travel across tools.", true, "Correct — concepts outlast menus."],
        ["Because you should never use any tool.", false, "Wrong — tools are allowed; lock-in assumptions are not required."],
        ["Because captions never matter.", false, "Wrong — captions matter."],
        ["Because spam works better cross-platform.", false, "Wrong — spam is not the strategy."],
      ],
    ),
    question(
      "q4",
      "A guest asks you not to clip a vulnerable moment. Best response?",
      [
        ["Honor the request and choose another clip.", true, "Correct — consent overrides clip desire."],
        ["Post it anyway for authenticity points.", false, "Wrong — consent refusal must be honored."],
        ["Blur their face with AI and post.", false, "Wrong — blurring without addressing consent can still harm."],
        ["Ask chat to vote.", false, "Wrong — chat votes do not override consent."],
      ],
    ),
    question(
      "q5",
      "What is a human gate in repurposing?",
      [
        ["A required approval that meaning, captions, and packaging are honest before publish.", true, "Correct — human approval protects meaning."],
        ["An automatic poster with no review.", false, "Wrong — no-review auto-posting is rejected here."],
        ["A script that scrapes private DMs.", false, "Wrong — private DM scraping violates privacy."],
        ["A bot that fake-engages comments.", false, "Wrong — fake engagement is prohibited."],
      ],
    ),
    question(
      "q6",
      "Cleanup that reverses the meaning of advice is…",
      [
        ["Unacceptable deceptive editing.", true, "Correct — meaning-reversing edits fail integrity."],
        ["Smart growth hacking.", false, "Wrong — that is not ethical growth."],
        ["Required for Shorts.", false, "Wrong — formats do not require deception."],
        ["Fine if the AI suggested the cut.", false, "Wrong — AI suggestion is not moral permission."],
      ],
    ),
    question(
      "q7",
      "How should transcripts be handled before sharing into AI tools?",
      [
        ["Remove private asides and sensitive data; share only what is needed.", true, "Correct — minimize sensitive data in tools."],
        ["Upload the entire unredacted private afterparty audio.", false, "Wrong — unredacted private audio is unsafe."],
        ["Include unpublished contract read-alouds.", false, "Wrong — contracts are confidential."],
        ["Paste teammate medical details for ‘context.’", false, "Wrong — medical details are sensitive and out of scope."],
      ],
    ),
    question(
      "q8",
      "Best Capstone evidence for this lesson?",
      [
        ["Workflow map, caption QA proof, approved clip package, and refusal of spam posting.", true, "Correct — controlled pipeline evidence beats volume."],
        ["A count of auto-posted clips.", false, "Wrong — auto-post counts are not mastery."],
        ["A deepfake demo reel.", false, "Wrong — deepfake misuse is not evidence of craft."],
        ["Unreviewed caption exports.", false, "Wrong — unreviewed captions show a failed gate."],
      ],
    ),
  ],
});
