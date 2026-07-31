import { programFinal, question } from "@/lib/assessments/build";

export const exam = programFinal({
  programKey: "content",
  programName: "Live Streaming Mastery",
  title: "Program Final: Live Streaming Mastery",
  questions: [
  question("lm1", "Empty-room mastery is…", [
    ["Sustained narration when few people watch", true, "Correct — retention skill under low CCV."],
    ["Leaving until famous", false, "Wrong — delays skill."],
    ["Mute streaming", false, "Wrong — fails presence."],
    ["Only gift farming AFK", false, "Wrong — non-compliant/poor practice."],
  ]),
  question("lm2", "Hooks exist to…", [
    ["Reset attention and clarify the now", true, "Correct — first impressions + mid-stream joins."],
    ["Apologize for existing", false, "Wrong — weak open."],
    ["Replace all segments", false, "Wrong — hooks open segments."],
    ["Demand gifts first always", false, "Wrong — value first."],
  ]),
  question("lm3", "Content loops create…", [
    ["Familiar repeatable segments", true, "Correct — audiences return to known formats."],
    ["Technical stream glitches", false, "Wrong — wrong meaning."],
    ["Rule exemptions", false, "Wrong — false."],
    ["Automatic diplomas", false, "Wrong — false."],
  ]),
  question("lm4", "Retention rises when viewers…", [
    ["Know what is next", true, "Correct — transitions reduce drop-off."],
    ["Hear only silence", false, "Wrong — exits rise."],
    ["Never get a re-intro", false, "Wrong — joiners need context."],
    ["Are insulted for leaving", false, "Wrong — toxic."],
  ]),
  question("lm5", "Longer LIVEs need…", [
    ["Energy arcs and checkpoints", true, "Correct — stamina + structure."],
    ["No water and max yelling only", false, "Wrong — unsustainable."],
    ["Abandoning niches hourly", false, "Wrong — confusing."],
    ["Skipping closings", false, "Wrong — still need ends."],
  ]),
  question("lm6", "Repeat viewers come from…", [
    ["Schedule reliability + recognizable show", true, "Correct — habit formation."],
    ["Random ghosting", false, "Wrong — breaks habit."],
    ["Buying comments", false, "Wrong — hollow/risky."],
    ["Hiding return times", false, "Wrong — opacity hurts."],
  ]),
  question("lm7", "Mid-stream hook rotation helps…", [
    ["New joiners and attention resets", true, "Correct — rooms turn over."],
    ["Only the first second ever", false, "Wrong — incomplete."],
    ["Avoiding all CTAs forever", false, "Wrong — unrelated extreme."],
    ["Skipping missions", false, "Wrong — false."],
  ]),
  question("lm8", "Peak CCV chasing vs process…", [
    ["Process retention skill beats vanity peaks in training", true, "Correct — this program scores durable hosting."],
    ["Peaks are the only curriculum metric", false, "Wrong — false."],
    ["Never look at any metric", false, "Wrong — extremes."],
    ["Delete analytics accounts", false, "Wrong — unnecessary."],
  ]),
  question("lm9", "Weekly growth systems include…", [
    ["Planned sessions, promo, review", true, "Correct — systems compound."],
    ["Vibes only", false, "Wrong — fragile."],
    ["Daily niche reboot", false, "Wrong — churn."],
    ["Ignoring regulars", false, "Wrong — wastes asset."],
  ]),
  question("lm10", "Calling out returners…", [
    ["Builds belonging and stickiness", true, "Correct — recognition retains."],
    ["Violates all policies always", false, "Wrong — false."],
    ["Replaces content", false, "Wrong — complements content."],
    ["Is Manager-only", false, "Wrong — false."],
  ]),
  question("lm11", "Dead air mainly…", [
    ["Signals nothing is happening", true, "Correct — retention leak."],
    ["Boosts ranking secretly", false, "Wrong — myth."],
    ["Completes quizzes", false, "Wrong — false."],
    ["Issues certificates", false, "Wrong — false."],
  ]),
  question("lm12", "Mastery program certificate requires…", [
    ["Program work complete + this final passed", true, "Correct — exam-gated certification."],
    ["Feelings of readiness alone", false, "Wrong — insufficient."],
    ["A viral clip only", false, "Wrong — insufficient."],
    ["Skipping empty-room practice", false, "Wrong — core skill."],
  ]),
  ],
});
