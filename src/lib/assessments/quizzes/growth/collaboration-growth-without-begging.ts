import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "collaboration-growth-without-begging",
  programKey: "growth",
  title: "Quiz: Collaboration Growth Without Begging",
  questions: [
    question("q1", "Professional collab outreach should…", [
      ["Lead with clear value exchange, respect, and a specific ask — not begging", true, "Correct — professional framing."],
      ["Guilt the other creator into saying yes", false, "Wrong — begging energy."],
      ["Recruit them into your competing network", false, "Wrong — out of StreamerU scope."],
      ["Spam identical DMs to fifty people", false, "Wrong — not professional."],
    ]),
    question("q2", "Value exchange means…", [
      ["Both audiences and creators get a clear reason the collab is worth it", true, "Correct — mutual value."],
      ["Only you extract their audience", false, "Wrong — extractive."],
      ["Paying for fake co-hosts", false, "Wrong — banned thinking."],
      ["Agency ownership of their account", false, "Wrong — never."],
    ]),
    question("q3", "Post-collab retention plans exist to…", [
      ["Turn borrowed attention into return habits on your own LIVE", true, "Correct — capture without being creepy."],
      ["Harass their chat forever", false, "Wrong — reputation damage."],
      ["Force follows", false, "Wrong — not durable."],
      ["Ignore new people after the collab", false, "Wrong — wasted discovery."],
    ]),
    question("q4", "This lesson does NOT teach…", [
      ["Agency recruiting or network ownership playbooks", true, "Correct — hard boundary."],
      ["Outreach templates", false, "Wrong — it does teach those."],
      ["Follow-up plans", false, "Wrong — it does."],
      ["Mutual promo hygiene", false, "Wrong — it does."],
    ]),
    question("q5", "If a collab invite requires you to abandon safety or brand off-limits…", [
      ["Decline — growth is not worth those costs", true, "Correct — standards stay."],
      ["Accept for the spike", false, "Wrong — fragile win."],
      ["Accept and apologize later", false, "Wrong — still wrong."],
      ["Let an agency decide", false, "Wrong — your standards."],
    ]),
    question("q6", "Capstone connection?", [
      ["Outreach template + retention plan can document a collab lever inside the 30-day experiment if chosen", true, "Correct — optional lever, real evidence."],
      ["Collabs are required for Capstone", false, "Wrong — only if that is your experiment."],
      ["Only Honors Lab allows collabs", false, "Wrong — Capstone can include them."],
      ["Begging DMs count as portfolio", false, "Wrong — professionalism required."],
    ]),
    question("q7", "A specific ask in outreach should be…", [
      ["Clear, time-bounded, and easy to answer yes/no to", true, "Correct — respect their time."],
      ["Vague forever partnership demands", false, "Wrong — heavy and unclear."],
      ["Follow-for-follow pressure", false, "Wrong — banned pattern."],
      ["Silent hope they notice you", false, "Wrong — not an ask."],
    ]),
    question("q8", "Collab LIVE Mission success is…", [
      ["A completed outreach template plus professional outreach or a retention-prep LIVE", true, "Correct — artifacts + behavior."],
      ["The other creator going viral with you", false, "Wrong — not the grade."],
      ["Fifty spam DMs", false, "Wrong — fail."],
      ["Skipping documentation", false, "Wrong — evidence required."],
    ]),
  ],
});
