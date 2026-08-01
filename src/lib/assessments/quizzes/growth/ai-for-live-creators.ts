import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "ai-for-live-creators",
  programKey: "growth",
  title: "Quiz: AI for LIVE Creators",
  questions: [
    question("q1", "In Growth Mastery, AI should…", [
      ["Assist research, brainstorming, recap notes, and prep — not replace you on camera", true, "Correct — assist, don't replace."],
      ["Read a full script robotically on LIVE", false, "Wrong — authenticity dies."],
      ["Generate fake engagement", false, "Wrong — banned."],
      ["Run an agency for you", false, "Wrong — out of scope."],
    ]),
    question("q2", "Authenticity rules exist to…", [
      ["Keep your voice, stories, and judgment yours even when AI drafts prep", true, "Correct — you remain the product."],
      ["Ban all tools", false, "Wrong — assist is allowed."],
      ["Hide that you prepare", false, "Wrong — prep is professional."],
      ["Promise AI will make you viral", false, "Wrong — never."],
    ]),
    question("q3", "A safe AI prep workflow includes…", [
      ["Draft → rewrite in your voice → cut anything off-brand or unsafe → go LIVE as yourself", true, "Correct — human filter required."],
      ["Paste AI text straight to camera", false, "Wrong — replace trap."],
      ["Use AI to invent fake testimonials", false, "Wrong — deceptive."],
      ["Ask AI how to bypass platform rules", false, "Wrong — never."],
    ]),
    question("q4", "If AI output sounds unlike you, you should…", [
      ["Rewrite until it sounds like you or discard it", true, "Correct — authenticity veto."],
      ["Force it on LIVE anyway", false, "Wrong — brand leak."],
      ["Double the AI volume", false, "Wrong — worsens the problem."],
      ["Blame viewers for not liking robots", false, "Wrong — your show, your voice."],
    ]),
    question("q5", "AI dependency becomes a problem when…", [
      ["You cannot open or host without a generated script", true, "Correct — assist flipped into replacement."],
      ["You use AI to brainstorm three segment angles", false, "Wrong — healthy assist."],
      ["You use AI to summarize your own recap notes", false, "Wrong — healthy assist."],
      ["You keep authenticity rules", false, "Wrong — healthy."],
    ]),
    question("q6", "Capstone connection?", [
      ["AI workflow + authenticity rules can appear in prep notes; the experiment still needs human execution evidence", true, "Correct — tools support, dossier proves you."],
      ["AI can write a fake Capstone dossier", false, "Wrong — objectively reviewable real evidence required."],
      ["Honors Lab requires AI", false, "Wrong — optional tools."],
      ["AI replaces diagnosis", false, "Wrong — no."],
    ]),
    question("q7", "Platform-safe AI use excludes…", [
      ["Deceptive synthetic identity, policy-violating prompts, and fake social proof", true, "Correct — hard no."],
      ["Brainstorming ethical CTAs", false, "Wrong — fine."],
      ["Drafting a recap checklist", false, "Wrong — fine."],
      ["Listing experiment variables to consider", false, "Wrong — fine."],
    ]),
    question("q8", "AI LIVE Mission success is…", [
      ["AI-assisted prep used, then a LIVE that still sounds like you, with a what-helped / what-rewrote log", true, "Correct — assist + authentic delivery."],
      ["Reading AI verbatim for an hour", false, "Wrong — replace fail."],
      ["Skipping LIVE because ChatGPT planned it", false, "Wrong — LIVE required."],
      ["Generating fake viewer comments", false, "Wrong — banned."],
    ]),
  ],
});
