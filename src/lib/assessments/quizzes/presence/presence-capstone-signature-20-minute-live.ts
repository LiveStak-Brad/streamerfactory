import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "presence-capstone-signature-20-minute-live",
  programKey: "presence",
  title: "Quiz: Presence Capstone — Signature 20-Minute LIVE",
  questions: [
    question("q1", "The Presence Capstone requires…", [
      ["A signature 20-minute LIVE with run of show, opening/close, pacing, story, chat plan, recovery, replay review, and before/after evidence", true, "Correct — reviewable portfolio package."],
      ["A viewer-count screenshot proving virality", false, "Wrong — not graded by virality."],
      ["Skipping replay review if you felt good", false, "Wrong — evidence must be reviewable."],
      ["Waiting for Honors Lab approval before claiming the certificate", false, "Wrong — labs never gate."],
    ]),
    question("q2", "What makes Capstone objectively reviewable?", [
      ["A complete evidence package someone else can inspect without relying on vibes", true, "Correct — dossier standard."],
      ["A feeling that you were confident", false, "Wrong — vibes are not Capstone."],
      ["One lucky busy chat night with no notes", false, "Wrong — incomplete."],
      ["Honors Lab attendance alone", false, "Wrong — optional polish, not the package."],
    ]),
    question("q3", "The room is silent for the whole signature block. Capstone…", [
      ["Still counts if protocol, story/teach, pacing, and close executed — document what you did", true, "Correct — silent Capstones can pass."],
      ["Automatically fails", false, "Wrong — silence is not disqualification."],
      ["Requires you to beg until comments appear", false, "Wrong — needy energy."],
      ["Only counts with a famous guest", false, "Wrong — solo is valid."],
    ]),
    question("q4", "Honors Lab review…", [
      ["Is optional after the certificate and never gates certification", true, "Correct — honors, not gates."],
      ["Must be finished before Capstone counts", false, "Wrong — non-gating."],
      ["Replaces the Program Final", false, "Wrong — final still required."],
      ["Is required for the Core diploma", false, "Wrong — separate path."],
    ]),
    question("q5", "Before-and-after comparison needs…", [
      ["Contrast against early Presence drill / path notes — not memory alone", true, "Correct — before snapshot required."],
      ["Competitor screenshots only", false, "Wrong — review your craft."],
      ["Nothing written if the LIVE felt better", false, "Wrong — write it."],
      ["A promise to never review replay", false, "Wrong — replay is required."],
    ]),
    question("q6", "Chat explodes and you want to abandon the run of show. Best move?", [
      ["Thank, take one interview-energy beat, return to the planned peak on time", true, "Correct — signature means you lead."],
      ["Scrap the plan for pure reaction content", false, "Wrong — Capstone needs the planned beats."],
      ["End at minute eight because it is going well", false, "Wrong — finish the twenty."],
      ["Skip the close to keep chatting", false, "Wrong — signature close required."],
    ]),
    question("q7", "After Presence Mastery, most creators should…", [
      ["Continue into Content Creation Mastery (recommended) via the StreamerU hub while keeping presence habits alive", true, "Correct — next craft path."],
      ["Treat presence as finished and stop reviewing replays", false, "Wrong — craft decays."],
      ["Drop Advanced Creator OS habits", false, "Wrong — systems still matter."],
      ["Wait for Honors Lab before opening /streameru", false, "Wrong — labs never gate next steps."],
    ]),
    question("q8", "Mission success is…", [
      ["Continuous signature 20 executed + full evidence package filed the same day", true, "Correct — behavior + paperwork."],
      ["Virality during the twenty minutes", false, "Wrong — irrelevant to grade."],
      ["Planning docs without running the LIVE", false, "Wrong — proof required."],
      ["Waiting for Brad to invent your opening", false, "Wrong — you build signature."],
    ]),
  ],
});
