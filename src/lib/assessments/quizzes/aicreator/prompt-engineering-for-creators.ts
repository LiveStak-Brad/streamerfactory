import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "prompt-engineering-for-creators",
  programKey: "aicreator",
  title: "Quiz: Prompt Engineering for Creators",
  questions: [
    question(
      "q1",
      "What is the strongest opening for a creator prompt?",
      [
        ["Audience, format, goal, voice notes, and constraints before requesting output.", true, "Correct — context-first briefs produce reviewable drafts."],
        ["Only ‘make it viral.’", false, "Wrong — virality is not a specification and invites generic hype."],
        ["A demand to invent statistics.", false, "Wrong — inventing statistics is dishonest and unverifiable."],
        ["A request to impersonate a competitor.", false, "Wrong — impersonation is prohibited."],
      ],
    ),
    question(
      "q2",
      "Why ask the model to label assumptions and open questions?",
      [
        ["It surfaces uncertainty so you can verify before publishing.", true, "Correct — uncertainty labels are a verification accelerator."],
        ["It makes the draft longer for SEO tricks.", false, "Wrong — length games are not the goal."],
        ["It replaces the need for sources.", false, "Wrong — labels do not replace source checks."],
        ["It lets you auto-post without reading.", false, "Wrong — human review remains required."],
      ],
    ),
    question(
      "q3",
      "A ‘magic prompt’ promises guaranteed growth. Best use?",
      [
        ["Extract any useful structure into your pattern library; ignore unverifiable promises.", true, "Correct — principles and reusable structure beat magical claims."],
        ["Run it unchanged on every post forever.", false, "Wrong — static magic prompts rot as tools and audiences change."],
        ["Paste private DMs into it for personalization.", false, "Wrong — private DMs must not be pasted into tools."],
        ["Use it to generate fake engagement comments.", false, "Wrong — fake engagement is never taught."],
      ],
    ),
    question(
      "q4",
      "What makes a role instruction useful?",
      [
        ["It names a function and success criteria the output must meet.", true, "Correct — function plus criteria turns role-play into production."],
        ["It only uses dramatic titles with no evaluation.", false, "Wrong — drama without criteria does not improve quality."],
        ["It tells the model to ignore your voice.", false, "Wrong — voice preservation is part of creator craft."],
        ["It asks for copyrighted scripts to copy wholesale.", false, "Wrong — plagiarism and copyright abuse are prohibited."],
      ],
    ),
    question(
      "q5",
      "Best next step after a first draft that misses tone?",
      [
        ["Revise with specific tone notes and examples rather than starting from a vaguer prompt.", true, "Correct — targeted iteration against the brief is professional practice."],
        ["Publish anyway to stay consistent.", false, "Wrong — publishing known tone failures trains the wrong habit."],
        ["Add fake testimonials to force emotion.", false, "Wrong — fake testimonials are dishonest."],
        ["Switch to deepfake audio of another creator.", false, "Wrong — impersonation/deepfake misuse is prohibited."],
      ],
    ),
    question(
      "q6",
      "How should formatting help verification?",
      [
        ["Separate facts, assumptions, and open questions into labeled blocks you can check.", true, "Correct — labeled structure makes review practical."],
        ["Hide weak claims inside long paragraphs.", false, "Wrong — hiding claims increases error risk."],
        ["Force a confident tone on uncertain points.", false, "Wrong — false confidence creates hallucinations you will defend by accident."],
        ["Remove all hedging so it sounds expert.", false, "Wrong — removing honest uncertainty is not expertise."],
      ],
    ),
    question(
      "q7",
      "What should a reusable prompt pattern include?",
      [
        ["Job name, required inputs, expected output shape, privacy note, and human gate.", true, "Correct — operable patterns include inputs, outputs, privacy, and gates."],
        ["Only the raw prompt text with no instructions.", false, "Wrong — raw text without operating notes does not transfer well."],
        ["A guarantee of ranking results.", false, "Wrong — ranking guarantees are not honest."],
        ["Instructions to scrape private emails.", false, "Wrong — private email scraping violates privacy standards."],
      ],
    ),
    question(
      "q8",
      "The model returns a polished citation you have not opened. What now?",
      [
        ["Treat it as unverified until you check the source yourself.", true, "Correct — citations from models require human source checks."],
        ["Trust it because the formatting looks academic.", false, "Wrong — academic formatting is not proof."],
        ["Ask for five more citations and publish all of them unchecked.", false, "Wrong — more unchecked citations multiply risk."],
        ["Delete your brief and rely on vibes.", false, "Wrong — abandoning the brief removes process discipline."],
      ],
    ),
  ],
});
