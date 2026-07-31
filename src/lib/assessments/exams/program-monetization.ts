import { programFinal, question } from "@/lib/assessments/build";

export const exam = programFinal({
  programKey: "monetization",
  programName: "Growth & Monetization",
  title: "Program Final: Growth & Monetization",
  questions: [
  question("gm1", "Gifts follow...", [
    ["Reasons, momentum, and relationship", true, "Correct - not pure entitlement."],
    ["Threats only", false, "Wrong - toxic and fragile."],
    ["Silence forever", false, "Wrong - unclear asks fail."],
    ["Fake screenshots", false, "Wrong - dishonest."],
  ]),
  question("gm2", "Visible goals help because...", [
    ["People join progress they can see", true, "Correct - momentum mechanic."],
    ["Lying about totals is required", false, "Wrong - destroys trust."],
    ["Goals must be infinite", false, "Wrong - no finish line hurts."],
    ["Goals replace hosting", false, "Wrong - hosting still carries the room."],
  ]),
  question("gm3", "Reasons to gift should be...", [
    ["Honest and brand-aligned", true, "Correct - authenticity compounds."],
    ["Fake emergencies", false, "Wrong - unethical."],
    ["Humiliation-based", false, "Wrong - toxic."],
    ["Hidden always", false, "Wrong - people need clarity."],
  ]),
  question("gm4", "Ask timing matters because...", [
    ["Context and energy change conversion", true, "Correct - same words land differently."],
    ["Only second 1 works", false, "Wrong - false."],
    ["Yelling removes timing skill needs", false, "Wrong - false."],
    ["Asks before hellos always", false, "Wrong - relationship first."],
  ]),
  question("gm5", "Over-asking without value causes...", [
    ["Fatigue and distrust", true, "Correct - extractive vibes shrink rooms."],
    ["Guaranteed wealth", false, "Wrong - often the opposite."],
    ["Rule immunity", false, "Wrong - false."],
    ["Diploma skips", false, "Wrong - false."],
  ]),
  question("gm6", "Mini-goals create...", [
    ["Repeated energy spikes", true, "Correct - staged progress sustains momentum."],
    ["More confusion always", false, "Wrong - clear mini-goals help."],
    ["Ban risk by themselves", false, "Wrong - goals are normal when honest."],
    ["Manager titles", false, "Wrong - unrelated."],
  ]),
  question("gm7", "Scaling monetization starts with...", [
    ["A schedule you can repeat", true, "Correct - consistency compounds income habits."],
    ["Random burnout marathons", false, "Wrong - boom-bust fails."],
    ["Ignoring health", false, "Wrong - burnout ends careers."],
    ["Dropping all prep", false, "Wrong - quality drops."],
  ]),
  question("gm8", "Income habits are...", [
    ["Repeatable behaviors that make support more likely", true, "Correct - habits beat one-off hustles."],
    ["Overnight wealth guarantees", false, "Wrong - unrealistic."],
    ["Only for Managers", false, "Wrong - creators build habits now."],
    ["A reason to skip safety", false, "Wrong - never."],
  ]),
  question("gm9", "Gratitude after gifts should be...", [
    ["Specific and warm, then back to the show", true, "Correct - thank, then keep momentum."],
    ["A 15-minute halt every time", false, "Wrong - stalls the room."],
    ["Ignored completely", false, "Wrong - people want to feel seen."],
    ["Used to dunk on others", false, "Wrong - toxic hierarchy."],
  ]),
  question("gm10", "Tracking should...", [
    ["Inform calm weekly experiments", true, "Correct - data serves iteration."],
    ["Become your only self-worth", false, "Wrong - dangerous."],
    ["Be falsified online", false, "Wrong - dishonest."],
    ["Replace going live", false, "Wrong - tracking is not streaming."],
  ]),
  question("gm11", "Boundaries protect income because...", [
    ["Burnout and violations destroy long-term earning", true, "Correct - sustainability is strategy."],
    ["Sleep is optional", false, "Wrong - myth."],
    ["Rules pause for top earners", false, "Wrong - false."],
    ["Calendars are banned", false, "Wrong - false."],
  ]),
  question("gm12", "Program certificate requires...", [
    ["Program path complete plus this final passed", true, "Correct - exam-gated certification."],
    ["One gift screenshot", false, "Wrong - insufficient."],
    ["Skipping reasons and only begging", false, "Wrong - wrong culture."],
    ["Buying followers", false, "Wrong - risky and hollow."],
  ]),
  ],
});
