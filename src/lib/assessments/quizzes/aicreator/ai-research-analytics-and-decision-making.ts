import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "ai-research-analytics-and-decision-making",
  programKey: "aicreator",
  title: "Quiz: AI Research, Analytics, and Decision Making",
  questions: [
    question(
      "q1",
      "AI provides a precise statistic with a confident citation. Best next step?",
      [
        ["Verify the primary source yourself before teaching the number.", true, "Correct — confident citations still require human verification."],
        ["Teach it immediately because it sounds academic.", false, "Wrong — tone is not evidence."],
        ["Round it up for impact.", false, "Wrong — altering numbers worsens falsehood."],
        ["Invent a matching chart.", false, "Wrong — fabricated charts are deceptive."],
      ],
    ),
    question(
      "q2",
      "How should raw analytics enter an AI tool?",
      [
        ["They generally should not; use redacted pattern summaries instead.", true, "Correct — redaction protects privacy while enabling questions."],
        ["Paste full dashboards for maximum accuracy.", false, "Wrong — full dashboards are sensitive."],
        ["Upload subscriber emails with metrics.", false, "Wrong — emails plus metrics compound risk."],
        ["Share revenue CSVs into public chats.", false, "Wrong — public revenue dumps are unsafe."],
      ],
    ),
    question(
      "q3",
      "Your app lacks a feature AI described. What do you do?",
      [
        ["Trust your verified build and correct or cut the claim.", true, "Correct — in-app verification beats model claims."],
        ["Teach the AI version to seem advanced.", false, "Wrong — teaching false features harms trust."],
        ["Promise viewers it will appear soon without evidence.", false, "Wrong — unsupported promises are dishonest."],
        ["Deepfake a menu screenshot.", false, "Wrong — fake screenshots are deceptive."],
      ],
    ),
    question(
      "q4",
      "What belongs on a decision framework card?",
      [
        ["Options, evidence, risks, privacy impact, human owner, and revisit date.", true, "Correct — that structure keeps decisions reviewable."],
        ["Only the AI’s recommended option.", false, "Wrong — AI must not auto-own the call."],
        ["Gift and rank targets.", false, "Wrong — vanity metrics are not the framework."],
        ["A plagiarism plan.", false, "Wrong — plagiarism is prohibited."],
      ],
    ),
    question(
      "q5",
      "Perplexity-style citation tools are best used to…",
      [
        ["Find starting points you still open and evaluate.", true, "Correct — citation leads are starting points."],
        ["Replace all primary source reading forever.", false, "Wrong — primary evaluation remains required."],
        ["Generate fake papers.", false, "Wrong — fake papers are dishonest."],
        ["Bypass privacy rules.", false, "Wrong — privacy rules still apply."],
      ],
    ),
    question(
      "q6",
      "Why label claims as confirmed, disputed, or unknown?",
      [
        ["So teaching language matches evidence strength.", true, "Correct — labels prevent overclaiming."],
        ["So you can hide weak claims in certainty.", false, "Wrong — labels should reveal weakness, not hide it."],
        ["So automation can auto-post them.", false, "Wrong — auto-posting unverified claims is unsafe."],
        ["So quizzes become optional.", false, "Wrong — labels do not change quiz requirements."],
      ],
    ),
    question(
      "q7",
      "A teammate wants AI to ‘decide the content strategy’ alone. Response?",
      [
        ["Use AI to inform a human-owned decision card instead.", true, "Correct — humans own strategy decisions."],
        ["Let the model auto-run the calendar.", false, "Wrong — unattended strategy fails accountability."],
        ["Paste private competitor emails for fuel.", false, "Wrong — private emails are off-limits."],
        ["Pick the option that sounds most viral.", false, "Wrong — virality vibes are not a framework."],
      ],
    ),
    question(
      "q8",
      "Strong Capstone evidence for this lesson includes…",
      [
        ["A verified memo with checklist, redacted analytics prompts, and a dated decision card.", true, "Correct — verified, privacy-safe, owned decisions are the evidence."],
        ["A chat log of unchecked claims.", false, "Wrong — unchecked chats are incomplete."],
        ["Unredacted dashboard pastes.", false, "Wrong — unredacted pastes fail privacy."],
        ["A promise that AI research is always right.", false, "Wrong — AI research is not always right."],
      ],
    ),
  ],
});
