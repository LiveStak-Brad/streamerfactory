import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "growth-diagnosis-framework",
  programKey: "growth",
  title: "Quiz: The Growth Diagnosis Framework",
  questions: [
    question("q1", "A plateau is best treated first as…", [
      ["A symptom that needs diagnosis before new tactics", true, "Correct — diagnose the leak before changing everything."],
      ["Proof the algorithm hates you", false, "Wrong — myths are not diagnosis."],
      ["A reason to buy followers", false, "Wrong — artificial growth is banned."],
      ["Permission to abandon your schedule forever", false, "Wrong — consistency may be the leak, not the enemy."],
    ]),
    question("q2", "The four bottleneck lanes in this lesson are…", [
      ["Discovery, retention, conversion, and consistency", true, "Correct — those four frame the diagnosis."],
      ["Lighting, logos, merch, and agencies", false, "Wrong — outside Growth Mastery scope."],
      ["Only peak viewers and gift totals", false, "Wrong — vanity notes are not the framework."],
      ["Follow-for-follow, spam, bait, and raids", false, "Wrong — those are policy risks, not lanes."],
    ]),
    question("q3", "You should change tactics when…", [
      ["Evidence points to one primary leak", true, "Correct — one leak, then one decision."],
      ["A tip account posts a new hack", false, "Wrong — tips are not evidence."],
      ["You feel impatient for one quiet day", false, "Wrong — mood is not diagnosis."],
      ["You can test five leaks in one LIVE", false, "Wrong — stacked changes erase learning."],
    ]),
    question("q4", "If people find you but leave mid-session, the primary leak is likely…", [
      ["Retention", true, "Correct — discovery worked; staying did not."],
      ["Discovery only", false, "Wrong — they already found you."],
      ["Buying more ads immediately", false, "Wrong — not the diagnostic move."],
      ["Agency recruiting", false, "Wrong — out of scope."],
    ]),
    question("q5", "If your show is solid when you show up but you miss half your planned LIVEs, prioritize…", [
      ["Consistency systems before new discovery tactics", true, "Correct — missed sessions starve every other lane."],
      ["Algorithm myths", false, "Wrong — myths do not fix calendar integrity."],
      ["Engagement bait in every comment", false, "Wrong — banned approach."],
      ["Rebranding weekly", false, "Wrong — thrash, not diagnosis."],
    ]),
    question("q6", "A written growth diagnosis should produce…", [
      ["One primary bottleneck and one next decision", true, "Correct — evidence → one leak → one move."],
      ["A 40-metric dashboard with no decision", false, "Wrong — theater analytics."],
      ["A promise of virality this month", false, "Wrong — never promise virality."],
      ["A plan to spam other creators' LIVEs", false, "Wrong — not durable or ethical."],
    ]),
    question("q7", "Capstone connection for diagnosis?", [
      ["The written diagnosis becomes the starting page of the 30-day growth experiment dossier", true, "Correct — Capstone needs a real before state."],
      ["Diagnosis replaces the Capstone", false, "Wrong — it feeds the Capstone."],
      ["Only Honors Lab needs a diagnosis", false, "Wrong — Capstone requires it; labs are optional."],
      ["Diagnosis is optional vibes", false, "Wrong — evidence required."],
    ]),
    question("q8", "Diagnosis LIVE Mission success is graded on…", [
      ["A completed diagnosis plus a LIVE that tests one diagnostic observation", true, "Correct — execution and evidence, not viewer luck."],
      ["Hitting a new peak viewer count", false, "Wrong — peaks are not the grade."],
      ["Receiving a large gift", false, "Wrong — gifts are not the mission metric."],
      ["Skipping LIVE because the worksheet looks complete", false, "Wrong — LIVE execution required."],
    ]),
  ],
});
