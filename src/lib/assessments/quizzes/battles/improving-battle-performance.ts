import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "improving-battle-performance",
  programKey: "battles",
  title: "Quiz: Improving battle performance",
  questions: [
  question("q1", "Performance improves fastest when you…", [
    ["Change one variable at a time and measure", true, "Correct — controlled iteration beats random overhauls."],
    ["Change everything after every loss", false, "Wrong — you cannot learn causality that way."],
    ["Ignore feedback forever", false, "Wrong — feedback is fuel."],
    ["Only copy toxic meta", false, "Wrong — short-term and brand-damaging."],
  ]),
  question("q2", "Energy management in battles means…", [
    ["Pacing peaks for key moments, not screaming nonstop", true, "Correct — controlled spikes outperform constant max volume."],
    ["Whispering the entire match", false, "Wrong — under-energy loses presence."],
    ["Leaving audio off to save yourself", false, "Wrong — non-participation."],
    ["Letting chat host while you AFK", false, "Wrong — against standards."],
  ]),
  question("q3", "Reading the scoreboard should…", [
    ["Inform tactics without panicking your tone", true, "Correct — data guides; panic repels."],
    ["Trigger immediate rage at chat", false, "Wrong — destructive."],
    ["Be ignored entirely always", false, "Wrong — some awareness helps timing."],
    ["Decide whether rules still apply", false, "Wrong — rules always apply."],
  ]),
  question("q4", "A high-leverage improvement is…", [
    ["Clearer mid-battle resets and CTAs", true, "Correct — attention and asks drive participation."],
    ["Longer apology monologues when behind", false, "Wrong — apologies dump energy."],
    ["Hiding your topic during battles", false, "Wrong — clarity still matters."],
    ["Never practicing solo again", false, "Wrong — solo reps still sharpen talk."],
  ]),
  question("q5", "Partner feedback is useful when…", [
    ["It is specific and kind enough to act on", true, "Correct — actionable notes beat vague shade."],
    ["It is only insults", false, "Wrong — not useful."],
    ["You never share yours back", false, "Wrong — mutual improvement builds teams."],
    ["It replaces your own review", false, "Wrong — both matter."],
  ]),
  question("q6", "Improvement culture rejects…", [
    ["Blame-only postmortems with no next experiment", true, "Correct — blame without a test stalls growth."],
    ["Tracking a few process metrics", false, "Wrong — healthy."],
    ["Celebrating composure wins", false, "Wrong — healthy."],
    ["Practicing hooks before match day", false, "Wrong — healthy."],
  ]),
  ],
});
