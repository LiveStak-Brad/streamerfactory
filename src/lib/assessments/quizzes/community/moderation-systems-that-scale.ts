import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "moderation-systems-that-scale",
  programKey: "community",
  title: "Quiz: Moderation Systems That Scale",
  questions: [
    question("q1", "In this lesson, moderators are best understood as…", [
      ["Culture carriers with clear authority, boundaries, and an escalation ladder", true, "Correct — mods protect belonging, not just delete comments."],
      ["Unpaid friends who should absorb every chaotic night without training", false, "Wrong — dumping chaos on friends is explicitly rejected."],
      ["Entertainers whose job is public call-outs for clips", false, "Wrong — enforcement should not become the show."],
      ["Replacements for your house rules so you never state norms", false, "Wrong — room rules remain foundational."],
    ]),
    question("q2", "Clear written rules and authorities primarily protect…", [
      ["Mod wellbeing and consistent governance — not only the host's convenience", true, "Correct — clarity protects unpaid helpers and the room."],
      ["Only peak viewer count", false, "Wrong — not the success metric."],
      ["Your right to invent policy mid-argument", false, "Wrong — written governance prevents improvisation."],
      ["A reason to skip recruiting forever", false, "Wrong — solo ladders are temporary systems, not avoidance."],
    ]),
    question("q3", "Centralized clear governance means…", [
      ["You remain final authority; mods execute a published Act / Ping / Host path", true, "Correct — one ladder, not competing mod policies."],
      ["Every mod invents their own policy in public chat", false, "Wrong — that creates chaos."],
      ["Viewers vote on every timeout in real time", false, "Wrong — spectacle, not governance."],
      ["Platform support replaces your handbook", false, "Wrong — you still need room-level systems."],
    ]),
    question("q4", "Best time to recruit and train a mod?", [
      ["During calm sessions, with a short handbook and worked Act vs Escalate examples", true, "Correct — train before crisis."],
      ["Only in the middle of a harassment storm", false, "Wrong — panic recruiting fails helpers."],
      ["After publicly roasting them for a mistake", false, "Wrong — correct off-stream."],
      ["Never — friends should just know what to do", false, "Wrong — training is required."],
    ]),
    question("q5", "A mod timeouts a regular for an ambiguous joke. Best host response?", [
      ["Correct privately using the ladder; restore calmly on mic without humiliating the mod", true, "Correct — off-stream correction, on-stream fairness."],
      ["Roast the mod on mic so chat learns", false, "Wrong — public humiliation kills volunteering."],
      ["Promote the mod for being aggressive", false, "Wrong — power trips are never rewarded."],
      ["Ignore it and never update the handbook", false, "Wrong — edge cases update governance."],
    ]),
    question("q6", "Which action is an ethics failure in this lesson?", [
      ["Weaponizing mods for personal drama or encouraging power-trip entertainment", true, "Correct — badge is stewardship, never a weapon."],
      ["Writing a one-page Mod Handbook", false, "Wrong — that is required practice."],
      ["Running a solo Responder ladder while you recruit", false, "Wrong — solo systems count."],
      ["Thanking a clean timeout once and returning to the segment", false, "Wrong — that is good hosting."],
    ]),
    question("q7", "Off-stream coordination is for…", [
      ["Briefing, debriefs, and corrections so LIVE stays clean", true, "Correct — governance maintenance happens off mic."],
      ["Staging pile-ons against viewers", false, "Wrong — unethical."],
      ["Replacing the need for any house rules", false, "Wrong — rules still publish to the room."],
      ["Arguing with trolls in DMs for sport", false, "Wrong — not the purpose."],
    ]),
    question("q8", "LIVE Mission success for CM-03 is graded on…", [
      ["Launching/rehearsing the mod system with clear escalation cues for 45+ minutes", true, "Correct — behavior and governance proof, not drama volume."],
      ["How many people you banned for content", false, "Wrong — inventing chaos is forbidden."],
      ["Having a full paid mod staff", false, "Wrong — solo or one trained mod is enough to launch."],
      ["Skipping LIVE if the handbook looks neat", false, "Wrong — LIVE execution required."],
    ]),
  ],
});
