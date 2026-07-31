import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "how-to-avoid-violations",
  programKey: "rules",
  title: "Quiz: How to avoid violations",
  questions: [
  question("q1", "A practical avoidance habit is…", [
    ["Pre-checking risky content (music, claims, conduct)", true, "Correct — prevention before go-live."],
    ["Hoping moderators will fix felonies on stream", false, "Wrong — you own the broadcast."],
    ["Disabling your brain once live", false, "Wrong — stay alert."],
    ["Copying banned creators’ exact bits", false, "Wrong — inherits risk."],
  ]),
  question("q2", "Mods help most when…", [
    ["You brief them on boundaries and they reinforce calmly", true, "Correct — clear standards scale safety."],
    ["They invent new rules that contradict policy", false, "Wrong — policy wins."],
    ["They harass viewers for fun", false, "Wrong — creates new problems."],
    ["You never speak to them", false, "Wrong — alignment needed."],
  ]),
  question("q3", "If chat pushes you toward a violation…", [
    ["Decline and redirect to safe energy", true, "Correct — you steer the room."],
    ["Comply to keep diamonds", false, "Wrong — short-term cash, long-term risk."],
    ["Argue for 40 minutes about legality", false, "Wrong — better to reset and move on."],
    ["Hand the phone to a random viewer", false, "Wrong — loses control."],
  ]),
  question("q4", "Documentation habits (notes, sources) help you…", [
    ["Verify claims and stay inside safer lanes", true, "Correct — especially for advice/monetization talk."],
    ["Look boring on purpose", false, "Wrong — accuracy can still be entertaining."],
    ["Bypass age rules", false, "Wrong — no."],
    ["Skip the graduation exam", false, "Wrong — unrelated."],
  ]),
  question("q5", "Avoidance is easier when your show design…", [
    ["Does not depend on risky gimmicks for retention", true, "Correct — build retention with skill, not violations."],
    ["Requires constant shock rule-breaking", false, "Wrong — fragile strategy."],
    ["Ignores music licensing concerns always", false, "Wrong — music is a common issue area."],
    ["Uses fake giveaways", false, "Wrong — deceptive and risky."],
  ]),
  question("q6", "The best time to fix a risky segment is…", [
    ["In planning, before you go live", true, "Correct — pre-live edits beat mid-ban damage control."],
    ["After you are already restricted", false, "Wrong — late."],
    ["Never; edits are weakness", false, "Wrong — false."],
    ["Only if a Manager tells you", false, "Wrong — you own it now."],
  ]),
  ],
});
