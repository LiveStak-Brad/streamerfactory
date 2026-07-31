import { programFinal, question } from "@/lib/assessments/build";

/**
 * Program Final for Advanced Creator.
 * programKey remains `rules` so local/server assessment IDs stay stable after
 * the Rules & Safety → Advanced Creator reorganization.
 */
export const exam = programFinal({
  programKey: "rules",
  programName: "Advanced Creator",
  title: "Program Final: Advanced Creator",
  questions: [
    question("ac1", "Advanced Creator training focuses on…", [
      ["Long-term brand, analytics, business, and growth strategy", true, "Correct — professional durability beyond first LIVE habits."],
      ["Skipping platform rules forever", false, "Wrong — safety was covered in Beginner Foundations."],
      ["Only buying followers", false, "Wrong — unhealthy and risky."],
      ["Ending the academy early", false, "Wrong — this is the capstone program path."],
    ]),
    question("ac2", "Brand systems help because…", [
      ["Consistent identity compounds recognition across sessions", true, "Correct — branding is a retention asset."],
      ["You never need a niche", false, "Wrong — clarity still matters."],
      ["Rules no longer apply", false, "Wrong — compliance always applies."],
      ["Analytics become optional", false, "Wrong — measurement still matters."],
    ]),
    question("ac3", "LIVE analytics are most useful when…", [
      ["They inform one clear change for the next session", true, "Correct — data should drive iteration."],
      ["They replace talking to chat", false, "Wrong — craft still comes first."],
      ["You ignore retention entirely", false, "Wrong — retention is core."],
      ["You only check once a year", false, "Wrong — too slow to improve."],
    ]),
    question("ac4", "Creator business foundations include…", [
      ["Treating income, expenses, and offers as a real operation", true, "Correct — professionalism protects longevity."],
      ["Never tracking anything", false, "Wrong — blindness creates risk."],
      ["Only chasing viral one-offs", false, "Wrong — systems beat spikes."],
      ["Avoiding goals on stream", false, "Wrong — goals can still be healthy."],
    ]),
    question("ac5", "Advanced growth strategy should…", [
      ["Stack proven loops without abandoning safety or consistency", true, "Correct — scale on a stable base."],
      ["Trade compliance for reach", false, "Wrong — short-term reach, long-term loss."],
      ["Reset your schedule every day randomly", false, "Wrong — rhythm trains audiences."],
      ["Ignore battles and collabs forever", false, "Wrong — they remain tools when used well."],
    ]),
    question("ac6", "Scaling works best when…", [
      ["Volume increases only as quality and recovery stay sustainable", true, "Correct — burnout kills compounding."],
      ["You double hours with no review", false, "Wrong — fatigue shows on stream."],
      ["You skip debriefs", false, "Wrong — review fuels improvement."],
      ["You abandon beginner structure", false, "Wrong — foundations still apply."],
    ]),
    question("ac7", "Professional creators protect the account by…", [
      ["Keeping Beginner Foundations safety habits as they scale", true, "Correct — safety is not a temporary module."],
      ["Assuming size grants immunity", false, "Wrong — enforcement still applies."],
      ["Copying banned creators for growth", false, "Wrong — inherits risk."],
      ["Disabling moderation to look 'raw'", false, "Wrong — raises risk."],
    ]),
    question("ac8", "A strong creator brand is…", [
      ["A repeatable promise viewers can recognize", true, "Correct — clarity builds loyalty."],
      ["A new persona every stream", false, "Wrong — confusion hurts retention."],
      ["Only a logo file", false, "Wrong — incomplete."],
      ["Optional after graduation", false, "Wrong — it compounds forever."],
    ]),
    question("ac9", "When metrics dip you should…", [
      ["Diagnose one bottleneck and run a controlled fix", true, "Correct — calm iteration beats panic."],
      ["Break policy for a spike", false, "Wrong — never."],
      ["Quit the schedule permanently", false, "Wrong — review first."],
      ["Delete the account", false, "Wrong — extreme and unnecessary."],
    ]),
    question("ac10", "Creator business tracking exists to…", [
      ["Make income decisions with evidence, not vibes alone", true, "Correct — operations need numbers."],
      ["Replace LIVE skill", false, "Wrong — both required."],
      ["Hide losses forever", false, "Wrong — honesty matters."],
      ["Skip taxes and records", false, "Wrong — professionalism includes records."],
    ]),
    question("ac11", "This program certificate requires…", [
      ["Published Advanced Creator lessons complete plus this final passed", true, "Correct — exam-gated when lessons ship."],
      ["Ignoring brand and analytics", false, "Wrong — they are the focus."],
      ["Failing Beginner Foundations on purpose", false, "Wrong — foundations stay required."],
      ["Manager payment", false, "Wrong — false."],
    ]),
    question("ac12", "After Advanced Creator you are preparing to…", [
      ["Operate like a durable professional and pursue graduation", true, "Correct — diploma path continues."],
      ["Treat rules as optional", false, "Wrong — never."],
      ["Stop learning", false, "Wrong — StreamerU keeps growing."],
      ["Skip the Graduation Exam", false, "Wrong — diploma still needs it."],
    ]),
  ],
});
