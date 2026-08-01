import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "algorithm-durable-growth",
  programKey: "growth",
  title: "Quiz: Algorithm-Durable Growth",
  questions: [
    question("q1", "Algorithm-durable growth means…", [
      ["Betting on principles that survive platform changes, not weekly myths", true, "Correct — durable habits over myth chasing."],
      ["Memorizing secret algorithm loopholes", false, "Wrong — loopholes expire and often violate policy."],
      ["Buying followers before every LIVE", false, "Wrong — banned."],
      ["Changing personality every time the feed shifts", false, "Wrong — thrash."],
    ]),
    question("q2", "Which tactics should you remove in a myth audit?", [
      ["Fake engagement, follow-for-follow, spam, engagement bait, and 'hack' promises", true, "Correct — strip unsafe and fragile tactics."],
      ["Consistent scheduling", false, "Wrong — durable."],
      ["Clear return offers", false, "Wrong — durable."],
      ["Honest experiment logs", false, "Wrong — durable."],
    ]),
    question("q3", "A durable discovery habit looks like…", [
      ["Consistency, clarity, ethical promotion, and return reasons viewers can trust", true, "Correct — principles that compound."],
      ["Comment bait in every stranger's LIVE", false, "Wrong — spam."],
      ["Paying for fake viewers", false, "Wrong — banned."],
      ["Promising virality dates", false, "Wrong — never promise virality."],
    ]),
    question("q4", "You should never bet your career on…", [
      ["Unverifiable hacks that require policy risk or personality transplants", true, "Correct — fragile bets."],
      ["A written weekly cadence", false, "Wrong — solid bet."],
      ["One clean experiment window", false, "Wrong — solid practice."],
      ["Retention redesign with notes", false, "Wrong — solid practice."],
    ]),
    question("q5", "If a tip requires you to abandon safety to 'beat the algorithm,' you…", [
      ["Kill it before you start", true, "Correct — ethics veto myths."],
      ["Try it once for science", false, "Wrong — safety is not an experiment variable."],
      ["Do it only on weekends", false, "Wrong — still unsafe."],
      ["Outsource it to an agency", false, "Wrong — still wrong."],
    ]),
    question("q6", "Capstone connection?", [
      ["Myth audit + durable tactics list show your experiment is principle-based, not hack-based", true, "Correct — dossier quality."],
      ["Myths are required for Capstone credit", false, "Wrong — opposite."],
      ["Only Honors Lab bans myths", false, "Wrong — Capstone bans them too."],
      ["Durable lists are optional vibes", false, "Wrong — complete the audit."],
    ]),
    question("q7", "Platform changes hurt creators who…", [
      ["Built their whole system on a single temporary trick", true, "Correct — fragile systems break."],
      ["Built consistency and return systems", false, "Wrong — those adapt."],
      ["Logged experiments", false, "Wrong — those adapt."],
      ["Diagnosed bottlenecks", false, "Wrong — those adapt."],
    ]),
    question("q8", "Algorithm-Durable LIVE Mission success is…", [
      ["A completed myth audit plus a LIVE that uses only durable tactics from your list", true, "Correct — audit + clean execution."],
      ["A hack that spikes once", false, "Wrong — not the grade."],
      ["Spam that 'worked'", false, "Wrong — banned."],
      ["Skipping LIVE after the audit", false, "Wrong — LIVE required."],
    ]),
  ],
});
