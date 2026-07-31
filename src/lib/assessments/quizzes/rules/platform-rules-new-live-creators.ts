import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "platform-rules-new-live-creators",
  programKey: "beginner",
  title: "Quiz: TikTok rules explained",
  questions: [
    question(
      "q1",
      "You are trying to decide whether a topic is too risky for LIVE. What is the better approach this lesson teaches?",
      [
        [
          "Ask which durable risk category it might fall into (safety, minors, harassment, deception, regulated content, IP, sexual content)",
          true,
          "Correct — categories are durable and travel across policy updates, unlike a memorized list of specific rules.",
        ],
        [
          "Try to remember the exact current strike count for that behavior",
          false,
          "Wrong — this lesson deliberately avoids specific strike numbers because they change and vary.",
        ],
        [
          "Ask chat to vote on whether it is allowed",
          false,
          "Wrong — chat cannot make policy decisions for your account.",
        ],
        [
          "Assume it is fine unless someone has already been punished for it",
          false,
          "Wrong — waiting for evidence of enforcement is a reactive, expensive way to learn rules.",
        ],
      ],
    ),
    question(
      "q2",
      "According to this lesson, how does enforcement generally treat a single, quickly self-corrected slip versus a repeated bit?",
      [
        [
          "It generally treats them differently — patterns and repetition matter more than one isolated, corrected moment",
          true,
          "Correct — platforms build systems that punish patterns more than isolated accidents.",
        ],
        [
          "Exactly the same, because any mistake ends an account immediately",
          false,
          "Wrong — this overstates severity and ignores the role of context and repetition.",
        ],
        [
          "It does not matter at all what you do after a mistake",
          false,
          "Wrong — correcting quickly is part of what makes an issue read as avoidable versus a pattern.",
        ],
        [
          "Enforcement only ever happens after exactly three identical incidents",
          false,
          "Wrong — this lesson avoids specific strike counts because they are not a reliable, durable number to rely on.",
        ],
      ],
    ),
    question(
      "q3",
      "A viewer's account looks like it may belong to someone under the platform's age requirements and is behaving oddly in your chat. What does this lesson's professional baseline recommend?",
      [
        [
          "Address it calmly and directly rather than ignoring it, and move on",
          true,
          "Correct — minors are the one category with zero acceptable ambiguity; address it plainly.",
        ],
        [
          "Ignore it because addressing it on stream feels awkward",
          false,
          "Wrong — awkward beats risky; ignoring ambiguous minor-safety moments is a named mistake in this lesson.",
        ],
        [
          "Engage more to figure out for certain how old they are",
          false,
          "Wrong — prolonged engagement is the opposite of keeping minors furthest from ambiguity.",
        ],
        [
          "Only mention it privately to a friend after the stream ends",
          false,
          "Wrong — the moment needs to be addressed in the room, not after the fact.",
        ],
      ],
    ),
    question(
      "q4",
      "Why does this lesson recommend defaulting to platform or licensed sound every session, rather than deciding case by case?",
      [
        [
          "Because unlicensed commercial music is one of the most common, avoidable issues, and a standing default removes the decision entirely",
          true,
          "Correct — a default habit beats a fresh judgment call made under pressure mid-stream.",
        ],
        [
          "Because platform sound libraries guarantee more viewers",
          false,
          "Wrong — this lesson is about account safety, not a growth or reach claim.",
        ],
        [
          "Because commercial music is completely banned from being mentioned at all",
          false,
          "Wrong — you can talk about a song or artist; the lesson is about not playing the track live.",
        ],
        [
          "Because it only matters for creators with very large audiences",
          false,
          "Wrong — the habit applies at every account size from session one.",
        ],
      ],
    ),
    question(
      "q5",
      "Chat starts pushing a joke that edges toward hate speech, framed as \"just banter.\" What does this lesson say to do?",
      [
        [
          "Redirect immediately and calmly, without a long lecture, and return to the current topic",
          true,
          "Correct — a fast, calm redirect protects the room and models the standard without dwelling on it.",
        ],
        [
          "Let it continue as long as chat seems to be enjoying it",
          false,
          "Wrong — audience enthusiasm does not change the category the content falls into.",
        ],
        [
          "Debate the joke's intent with chat for several minutes",
          false,
          "Wrong — over-explaining or arguing gives the moment more attention, not less.",
        ],
        [
          "End the LIVE immediately without addressing it",
          false,
          "Wrong — a calm redirect and continuing is the professional response; ending abruptly is not necessary.",
        ],
      ],
    ),
    question(
      "q6",
      "What is the best description of how this lesson says platform review generally works?",
      [
        [
          "With context — the same words or moment can read differently depending on intent, pattern, and surrounding content",
          true,
          "Correct — context and pattern matter more than any single moment taken in isolation.",
        ],
        [
          "Every word or clip is judged completely on its own, with no context ever considered",
          false,
          "Wrong — this lesson explicitly says context, intent, and pattern matter.",
        ],
        [
          "Only human moderators ever review anything, never automated systems",
          false,
          "Wrong — detection generally involves both automated systems and human reports.",
        ],
        [
          "Review never considers whether something was corrected quickly",
          false,
          "Wrong — how avoidable or quickly corrected an issue was affects how it reads.",
        ],
      ],
    ),
    question(
      "q7",
      "Which statement matches this lesson's Reality Check?",
      [
        [
          "This mental model will feel abstract until you actually encounter edge cases on real sessions — that is normal, not a sign you are behind",
          true,
          "Correct — categories become concrete with real streaming reps, not by reading alone.",
        ],
        [
          "You should already have instant instincts for every edge case after one reading",
          false,
          "Wrong — this lesson explicitly says you are not expected to have that yet.",
        ],
        [
          "Once you memorize today's specific rules, you never need to revisit this topic",
          false,
          "Wrong — specifics change; the category habit is what keeps working over time.",
        ],
        [
          "Feeling unsure about a rule means you should quit streaming",
          false,
          "Wrong — uncertainty is normal and addressed by the framework, not a reason to stop.",
        ],
      ],
    ),
    question(
      "q8",
      "What proves this lesson's LIVE Mission is complete?",
      [
        [
          "A 45+ minute LIVE with platform or licensed sound the whole time, active moderation, and at least one principle from this lesson applied out loud",
          true,
          "Correct — StreamerU grades applied behavior, not viewer count or luck.",
        ],
        [
          "Reading the lesson twice without going live",
          false,
          "Wrong — study alone does not complete the mission.",
        ],
        [
          "Getting through a session with zero viewers watching at all",
          false,
          "Wrong — viewer count is not the pass condition; behavior is.",
        ],
        [
          "Playing a favorite commercial song once because the session went well",
          false,
          "Wrong — this directly contradicts the sound-sourcing habit this lesson teaches.",
        ],
      ],
    ),
  ],
});
