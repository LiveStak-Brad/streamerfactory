import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "building-battle-partners",
  programKey: "battles",
  title: "Quiz: Building battle partners",
  questions: [
  question("q1", "Strong battle partners are built through…", [
    ["Reliability, respect, and repeated fair matches", true, "Correct — trust compounds into a partner network."],
    ["One viral clash then ghosting", false, "Wrong — burns the bridge."],
    ["Public callouts after every loss", false, "Wrong — toxic."],
    ["Paying people to pretend they like you", false, "Wrong — hollow and risky."],
  ]),
  question("q2", "After a good match you should…", [
    ["Thank them and propose a clear next time", true, "Correct — continuity turns one-offs into partners."],
    ["Block them so they cannot copy you", false, "Wrong — fear-based and anti-network."],
    ["Steal their regulars aggressively on stream", false, "Wrong — damages reputation."],
    ["Never speak off-stream", false, "Wrong — light coordination helps."],
  ]),
  question("q3", "A partner network helps because…", [
    ["You get scheduled reps and shared audiences", true, "Correct — ecosystems beat isolated grinding."],
    ["You can ignore StreamerU lessons", false, "Wrong — skills still matter."],
    ["Rules no longer apply", false, "Wrong — false."],
    ["Quizzes become optional forever", false, "Wrong — false."],
  ]),
  question("q4", "Red flags in a potential partner include…", [
    ["Consistent disrespect toward chat or creators", true, "Correct — culture risk spreads to your brand."],
    ["Clear communication of schedule", false, "Wrong — that is a green flag."],
    ["Willingness to practice", false, "Wrong — green flag."],
    ["Sportsmanship after losses", false, "Wrong — green flag."],
  ]),
  question("q5", "Sharing expectations means…", [
    ["Aligning on vibe, timing, and boundaries before match", true, "Correct — prevents mid-battle conflict."],
    ["Demanding they gift your side secretly", false, "Wrong — unethical."],
    ["Forcing them into your niche permanently", false, "Wrong — partners remain themselves."],
    ["Never discussing anything in advance", false, "Wrong — ambiguity causes friction."],
  ]),
  question("q6", "Long-term partner strategy values…", [
    ["Mutual growth over single-scoreboard obsession", true, "Correct — networks compound beyond one night."],
    ["Destroying every partner’s confidence", false, "Wrong — short-sighted."],
    ["Never battling the same person twice", false, "Wrong — repeats build chemistry."],
    ["Hiding your schedule from partners", false, "Wrong — coordination needs clarity."],
  ]),
  ],
});
