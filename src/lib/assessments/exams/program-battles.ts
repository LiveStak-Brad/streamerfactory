import { programFinal, question } from "@/lib/assessments/build";

export const exam = programFinal({
  programKey: "battles",
  programName: "Battles & Collaboration",
  title: "Program Final: Battles & Collaboration",
  questions: [
  question("bc1", "Battles are…", [
    ["Timed collaborative competition formats", true, "Correct — energy + partnership."],
    ["Guaranteed salaries", false, "Wrong — false."],
    ["Rule-free zones", false, "Wrong — rules apply."],
    ["Solo AFK modes", false, "Wrong — presence required."],
  ]),
  question("bc2", "Prep should include…", [
    ["Partner alignment, timing, talk cues", true, "Correct — reduces chaos."],
    ["Zero communication", false, "Wrong — causes friction."],
    ["Insult scripts only", false, "Wrong — toxic."],
    ["Password sharing", false, "Wrong — unsafe."],
  ]),
  question("bc3", "Community briefing helps…", [
    ["Supporters know when/how to help", true, "Correct — coordinated energy."],
    ["Hide the match", false, "Wrong — opposite."],
    ["Ban your own chat", false, "Wrong — absurd."],
    ["Skip hosting", false, "Wrong — you still host."],
  ]),
  question("bc4", "Sportsmanship means…", [
    ["Compete hard; protect relationships", true, "Correct — network > one score."],
    ["Harass losers", false, "Wrong — toxic."],
    ["Rage quit always", false, "Wrong — weak habit."],
    ["Never thank anyone", false, "Wrong — cold."],
  ]),
  question("bc5", "Improvement works best by…", [
    ["Changing one variable and reviewing", true, "Correct — learn causality."],
    ["Changing everything nightly", false, "Wrong — noise."],
    ["Ignoring partner feedback", false, "Wrong — waste."],
    ["Buying wins", false, "Wrong — invalid."],
  ]),
  question("bc6", "Partner networks form through…", [
    ["Reliability and repeated fair matches", true, "Correct — trust compounds."],
    ["Ghosting after wins", false, "Wrong — burns bridges."],
    ["Public shaming", false, "Wrong — toxic."],
    ["Bots", false, "Wrong — fake."],
  ]),
  question("bc7", "Clear CTAs in battles…", [
    ["Give people simple actions under time pressure", true, "Correct — clarity converts energy."],
    ["Are banned", false, "Wrong — false."],
    ["Must be insults", false, "Wrong — false."],
    ["Replace audio", false, "Wrong — false."],
  ]),
  question("bc8", "After battles, debrief…", [
    ["What worked, what failed, next experiment", true, "Correct — reflection loop."],
    ["Only celebrate wins; deny losses", false, "Wrong — incomplete learning."],
    ["Blame chat exclusively", false, "Wrong — weak ownership."],
    ["Delete notes", false, "Wrong — lose data."],
  ]),
  question("bc9", "Red flags in partners include…", [
    ["Consistent disrespect", true, "Correct — culture risk."],
    ["Clear schedules", false, "Wrong — green flag."],
    ["Fair play", false, "Wrong — green flag."],
    ["Practice mindset", false, "Wrong — green flag."],
  ]),
  question("bc10", "Solo skills still matter because…", [
    ["Talk/hooks/structure transfer into battles", true, "Correct — foundations carry."],
    ["Battles delete solo needs", false, "Wrong — false."],
    ["Rules pause in matches", false, "Wrong — false."],
    ["Quizzes end", false, "Wrong — false."],
  ]),
  question("bc11", "Energy management prefers…", [
    ["Timed peaks over nonstop screaming", true, "Correct — controlled intensity."],
    ["AFK farming", false, "Wrong — fails standards."],
    ["Mute protests", false, "Wrong — non-participation."],
    ["Panic only", false, "Wrong — repels."],
  ]),
  question("bc12", "Certificate for this program needs…", [
    ["Completed program path + final exam pass", true, "Correct — exam-gated."],
    ["One insult battle", false, "Wrong — wrong culture."],
    ["Manager title purchase", false, "Wrong — false."],
    ["Skipping partners entirely", false, "Wrong — collaboration is core."],
  ]),
  ],
});
