import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "setting-goals-during-lives",
  programKey: "monetization",
  title: "Quiz: Setting goals during lives",
  questions: [
  question("q1", "On-stream goals should be…", [
    ["Visible, paced, and celebrated in stages", true, "Correct — staged progress sustains momentum."],
    ["Impossible on purpose to ‘dream big’ only", false, "Wrong — unbelievable goals demotivate."],
    ["Changed every 30 seconds randomly", false, "Wrong — whiplash kills focus."],
    ["Never mentioned verbally", false, "Wrong — say it clearly."],
  ]),
  question("q2", "Breaking a big goal into mini-goals helps because…", [
    ["Small wins create repeated energy spikes", true, "Correct — micro-milestones keep chat engaged."],
    ["TikTok requires mini-goals", false, "Wrong — not a platform requirement."],
    ["It hides that you want support", false, "Wrong — be clear, not sneaky."],
    ["It replaces needing a topic", false, "Wrong — topic still matters."],
  ]),
  question("q3", "If a goal stalls, a good move is…", [
    ["Reset energy with a hook and a simpler next step", true, "Correct — recover the room; do not spiral."],
    ["Shame the audience", false, "Wrong — destroys trust."],
    ["End immediately every time", false, "Wrong — teaches fragility."],
    ["Lie that you already hit it", false, "Wrong — honesty matters."],
  ]),
  question("q4", "Goal language should match…", [
    ["Your community’s size and culture", true, "Correct — calibrated asks feel fair."],
    ["Top 1 creator numbers on day one", false, "Wrong — mismatched expectations."],
    ["Threat formats only", false, "Wrong — unhealthy."],
    ["No numbers ever, even when helpful", false, "Wrong — clear numbers often help."],
  ]),
  question("q5", "Celebrating progress matters because…", [
    ["It rewards participation and invites more", true, "Correct — joy is contagious in LIVE rooms."],
    ["It wastes time better spent silent", false, "Wrong — celebration is content."],
    ["Only failures should be highlighted", false, "Wrong — demoralizing."],
    ["Celebration is unprofessional", false, "Wrong — false for LIVE culture."],
  ]),
  question("q6", "Goals during lives still sit inside…", [
    ["Your overall segment structure", true, "Correct — monetization moments are part of the show plan."],
    ["A separate app with no hosting", false, "Wrong — they happen on your LIVE."],
    ["Manager College only", false, "Wrong — creators set goals before that path."],
    ["Quiz answers only", false, "Wrong — practice on LIVE."],
  ]),
  ],
});
