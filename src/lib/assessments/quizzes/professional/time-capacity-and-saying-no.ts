import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "time-capacity-and-saying-no",
  programKey: "professional",
  title: "Quiz: Time, Capacity, and Saying No",
  questions: [
    question(
      "q1",
      "Which of the following counts as a real capacity policy, according to this lesson?",
      [
        ["Maximum two collabs per week, minimum 48 hours notice, none on designated recovery days", true, "Correct — real numbers you can check a request against."],
        ["I try not to overdo collabs too much", false, "Wrong — the lesson explicitly says vague intentions are not a policy."],
        ["I will do whatever fits whenever it comes up", false, "Wrong — this has no actual limit to check requests against."],
        ["I will decide case by case depending on how I feel", false, "Wrong — case-by-case negotiation is exactly what a policy is meant to replace."],
      ],
    ),
    question(
      "q2",
      "What is the earliest-warning sign this lesson names for approaching overcommitment?",
      [
        ["Prep time shrinking below what you know you need", true, "Correct — this is listed as the first internal signal worth watching."],
        ["A visible, dramatic on-camera collapse", false, "Wrong — the lesson says burnout is a quiet failure, not a loud one."],
        ["Losing all your viewers overnight", false, "Wrong — that's an extreme outcome, not the early signal described."],
        ["Getting a formal complaint from a brand partner", false, "Wrong — that would be a late consequence, not an early internal signal."],
      ],
    ),
    question(
      "q3",
      "What does a 'clean no' look like according to this lesson?",
      [
        ["Clear, brief, with no over-explaining or repeated apologies", true, "Correct — over-explaining reads as an invitation to negotiate."],
        ["A long explanation of your entire schedule to justify the decision", false, "Wrong — over-explaining defeats the purpose of having a limit."],
        ["Multiple apologies followed by a promise to try to squeeze it in anyway", false, "Wrong — this undermines the boundary entirely."],
        ["Silence, with no response at all to the request", false, "Wrong — the lesson recommends a brief clear response, not ghosting."],
      ],
    ),
    question(
      "q4",
      "A request lands on a protected recovery block. What is the recommended response?",
      [
        ["Automatic no or reschedule, not a case-by-case negotiation", true, "Correct — protected blocks are treated with the same seriousness as a paid commitment."],
        ["Always say yes since recovery blocks are flexible by design", false, "Wrong — the lesson says to treat recovery blocks as non-negotiable."],
        ["Cancel the recovery block permanently to make room", false, "Wrong — this defeats the purpose of protecting the block at all."],
        ["Ask chat to vote on whether you should take the request", false, "Wrong — capacity decisions are the creator's own, not a chat poll."],
      ],
    ),
    question(
      "q5",
      "Someone pushes back on a professional no and asks the creator to reconsider. What does the lesson recommend?",
      [
        ["Repeat the same brief answer once, calmly, without further justification", true, "Correct — you don't owe a second round of justification."],
        ["Immediately reverse the decision to avoid conflict", false, "Wrong — reversing under pushback undermines the whole policy."],
        ["Provide a longer, more detailed explanation than the first time", false, "Wrong — over-explaining is exactly what the lesson advises against."],
        ["Block the person and never respond again", false, "Wrong — this is an overreaction not supported by the lesson's guidance."],
      ],
    ),
    question(
      "q6",
      "How does this lesson relate to Mindset Mastery's coverage of burnout?",
      [
        ["This lesson focuses narrowly on capacity mechanics; burnout psychology belongs to Mindset Mastery", true, "Correct — the lesson explicitly avoids re-teaching burnout psychology in depth."],
        ["This lesson fully replaces Mindset Mastery's burnout content", false, "Wrong — it explicitly does not re-teach that material."],
        ["The two topics are entirely unrelated and never connect", false, "Wrong — MS-05 is named as a brief, recommended callback."],
        ["This lesson requires completing all of Mindset Mastery first", false, "Wrong — MS-05 is recommended, not a strict required prerequisite."],
      ],
    ),
    question(
      "q7",
      "A creator notices their capacity policy numbers were unrealistic almost immediately after writing them. What should they do?",
      [
        ["Adjust the numbers to match reality — that's the policy doing its job", true, "Correct — the lesson frames this discovery as success, not failure."],
        ["Abandon the whole idea of a written policy since the first draft was wrong", false, "Wrong — adjusting the numbers is the expected next step, not abandoning the practice."],
        ["Keep the unrealistic numbers to avoid looking inconsistent", false, "Wrong — a policy that doesn't match reality doesn't protect anything."],
        ["Wait a full year before making any changes to the policy", false, "Wrong — the lesson doesn't suggest a rigid waiting period for adjustments."],
      ],
    ),
    question(
      "q8",
      "What does the LIVE Mission require regarding declining or rescheduling an overcommit?",
      [
        ["Decline or reschedule a real overcommit, or write the exact no script for a hypothetical if nothing real is pending", true, "Correct — the mission allows either a real application or a drafted hypothetical script."],
        ["Only complete the mission if a real overcommit happens to exist that week", false, "Wrong — a hypothetical no script is explicitly an acceptable alternative."],
        ["Decline every single request received that week regardless of fit", false, "Wrong — the mission asks for one applied or drafted example, not blanket refusal."],
        ["Skip this part of the mission entirely since it's optional", false, "Wrong — this step is part of the required mission, not optional."],
      ],
    ),
  ],
});
