import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "clips-discovery-and-live",
  programKey: "growth",
  title: "Quiz: Clips, Discovery, and LIVE",
  questions: [
    question("q1", "A healthy clip-to-LIVE loop…", [
      ["Uses short clips to invite people back to the LIVE show without destroying focus", true, "Correct — clips serve LIVE."],
      ["Replaces LIVE with endless editing", false, "Wrong — split focus trap."],
      ["Requires fake engagement pods", false, "Wrong — banned."],
      ["Hides that you go LIVE at all", false, "Wrong — CTA should point to LIVE."],
    ]),
    question("q2", "Focus guardrails exist to…", [
      ["Stop clip production from stealing prep and recovery from the show", true, "Correct — protect LIVE quality."],
      ["Ban all clips forever", false, "Wrong — loops are allowed with guardrails."],
      ["Force daily cinematic edits", false, "Wrong — overbuilding."],
      ["Prioritize agencies over creators", false, "Wrong — out of scope."],
    ]),
    question("q3", "A weekly clip workflow should include…", [
      ["Capture, simple edit or select, post with LIVE CTA, and a stop time", true, "Correct — simple loop."],
      ["Twelve-hour edits after every session", false, "Wrong — focus kill."],
      ["Buying views on every clip", false, "Wrong — banned."],
      ["No CTA so people never find LIVE", false, "Wrong — CTA matters."],
    ]),
    question("q4", "Clip CTAs should…", [
      ["Name when/why to join LIVE in plain language", true, "Correct — discovery with a destination."],
      ["Use guilt and bait", false, "Wrong — not durable."],
      ["Promise overnight fame", false, "Wrong — never promise virality."],
      ["Direct people to competing networks you recruit for", false, "Wrong — out of scope."],
    ]),
    question("q5", "If clips are growing but LIVE quality collapses, you should…", [
      ["Tighten guardrails and restore LIVE capacity first", true, "Correct — show first."],
      ["Double clip volume", false, "Wrong — worsens the split."],
      ["Quit LIVE permanently", false, "Wrong — this path is LIVE growth."],
      ["Fake LIVE screenshots", false, "Wrong — deceptive."],
    ]),
    question("q6", "Capstone connection?", [
      ["Workflow + posted clips with CTAs prove a discovery loop during the experiment window", true, "Correct — dossier evidence."],
      ["Clips replace the 30-day experiment", false, "Wrong — support only."],
      ["Only Honors Lab needs clips", false, "Wrong — Capstone can include them."],
      ["Views on clips grade the Capstone", false, "Wrong — execution grades."],
    ]),
    question("q7", "Three posted clips with LIVE CTAs prove…", [
      ["You ran the workflow — not that the algorithm owed you a spike", true, "Correct — behavior proof."],
      ["You are guaranteed viral", false, "Wrong — never."],
      ["You can skip LIVE this month", false, "Wrong — LIVE remains central."],
      ["You need engagement pods", false, "Wrong — banned."],
    ]),
    question("q8", "Clips LIVE Mission success is…", [
      ["A written weekly workflow plus capture/post execution with LIVE CTAs", true, "Correct — workflow + posts."],
      ["A million views", false, "Wrong — not the grade."],
      ["Editing for eight hours", false, "Wrong — focus fail."],
      ["No CTA because 'the content should speak'", false, "Wrong — destination matters."],
    ]),
  ],
});
