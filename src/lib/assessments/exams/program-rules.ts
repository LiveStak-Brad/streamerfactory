import { programFinal, question } from "@/lib/assessments/build";

export const exam = programFinal({
  programKey: "rules",
  programName: "Rules & Safety",
  title: "Program Final: Rules & Safety",
  questions: [
  question("rs1", "Platform rules matter because...", [
    ["Violations can restrict reach and monetization", true, "Correct - safety protects the career."],
    ["Small creators are exempt", false, "Wrong - rules apply widely."],
    ["Only Managers need them", false, "Wrong - every creator is accountable."],
    ["Chat votes override policy", false, "Wrong - false."],
  ]),
  question("rs2", "When unsure about a gray area...", [
    ["Choose the safer path and verify official guidance", true, "Correct - caution beats gambling the account."],
    ["Do it for content and apologize later", false, "Wrong - late apologies may not restore access."],
    ["Ask chat to decide legality", false, "Wrong - not a compliance process."],
    ["Assume bans never happen", false, "Wrong - denial is risky."],
  ]),
  question("rs3", "Ban-level risk often involves...", [
    ["Severe or repeated policy violations", true, "Correct - seriousness and repetition escalate."],
    ["Saying hello", false, "Wrong - normal."],
    ["Having a niche", false, "Wrong - fine."],
    ["Using an outline", false, "Wrong - fine."],
  ]),
  question("rs4", "Ignorance of rules is...", [
    ["A weak defense because policies are published", true, "Correct - creators are expected to follow them."],
    ["A full legal shield", false, "Wrong - false."],
    ["Only for large creators", false, "Wrong - false."],
    ["Solved by laughing it off", false, "Wrong - false."],
  ]),
  question("rs5", "Avoid violations by...", [
    ["Pre-checking risky music, claims, and conduct", true, "Correct - prevention before go-live."],
    ["Copying banned creators' bits", false, "Wrong - inherits risk."],
    ["Hoping mods erase accountability", false, "Wrong - you own the broadcast."],
    ["Shock gimmicks that depend on rule-breaking", false, "Wrong - fragile strategy."],
  ]),
  question("rs6", "If chat pushes a violation...", [
    ["Decline and redirect to safe energy", true, "Correct - you steer the room."],
    ["Comply for diamonds", false, "Wrong - short-term cash, long-term risk."],
    ["Hand the phone to a stranger", false, "Wrong - loses control."],
    ["Argue legality for an hour", false, "Wrong - better to reset."],
  ]),
  question("rs7", "Mods help most when...", [
    ["Briefed on boundaries and reinforcing calmly", true, "Correct - clear standards scale safety."],
    ["Harassing viewers for fun", false, "Wrong - new problems."],
    ["Inventing anti-policy rules", false, "Wrong - policy wins."],
    ["Never aligned with you", false, "Wrong - alignment needed."],
  ]),
  question("rs8", "Long-term account safety is...", [
    ["A career asset that protects compounding growth", true, "Correct - clean history enables opportunity."],
    ["Only a beginner concern", false, "Wrong - stakes rise over time."],
    ["A reason never to create", false, "Wrong - innovate inside bounds."],
    ["A substitute for hosting skill", false, "Wrong - both required."],
  ]),
  question("rs9", "Account security includes...", [
    ["Strong auth and careful collaborator access", true, "Correct - takeovers are real risks."],
    ["Sharing passwords in Discord", false, "Wrong - major risk."],
    ["Lending the account for battles", false, "Wrong - dangerous."],
    ["Disabling 2FA for convenience", false, "Wrong - weakens security."],
  ]),
  question("rs10", "Seeing others 'get away' with violations means...", [
    ["Do not copy them; lag is not permission", true, "Correct - others' risk is not your strategy."],
    ["Copy immediately", false, "Wrong - dangerous."],
    ["Rules are repealed forever", false, "Wrong - false."],
    ["Safety no longer matters", false, "Wrong - false."],
  ]),
  question("rs11", "Policy refreshers matter because...", [
    ["Guidance and enforcement evolve", true, "Correct - keep learning from primary sources."],
    ["Rules never change", false, "Wrong - they do."],
    ["Graduation ends compliance", false, "Wrong - never."],
    ["Quizzes replace official updates forever", false, "Wrong - keep checking sources."],
  ]),
  question("rs12", "This program certificate requires...", [
    ["Program path complete plus this final passed", true, "Correct - exam-gated."],
    ["One intentional violation for 'experience'", false, "Wrong - never required."],
    ["Skipping safety notes", false, "Wrong - keep them."],
    ["Manager payment", false, "Wrong - false."],
  ]),
  ],
});
