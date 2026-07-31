import { programFinal, question } from "@/lib/assessments/build";

export const exam = programFinal({
  programKey: "beginner",
  programName: "Beginner Foundations",
  title: "Program Final: Beginner Foundations",
  questions: [
  question("bf1", "What is the StreamerU beginner loop?", [
    ["Study, quiz, then execute a real LIVE mission", true, "Correct — learning sticks through assessment + execution."],
    ["Watch only; never go live", false, "Wrong — missions require LIVE."],
    ["Battles first, rules never", false, "Wrong — order matters."],
    ["Buy followers, then stream", false, "Wrong — unhealthy and risky."],
  ]),
  question("bf2", "Structure means…", [
    ["Open, segments, close with intention", true, "Correct — run-of-show is foundational."],
    ["No plan ever", false, "Wrong — chaos is not the standard."],
    ["Only gift goals", false, "Wrong — incomplete."],
    ["AFK screens", false, "Wrong — fails presence."],
  ]),
  question("bf3", "Consistency beats…", [
    ["One-off intensity without a schedule", true, "Correct — rhythm trains audiences and creators."],
    ["Showing up repeatedly", false, "Wrong — that is the goal."],
    ["Defendable time windows", false, "Wrong — good practice."],
    ["Short debriefs", false, "Wrong — good practice."],
  ]),
  question("bf4", "Talking points exist to…", [
    ["Prevent silent freeze when chat is quiet", true, "Correct — prompts sustain talk."],
    ["Replace human interaction forever", false, "Wrong — they support it."],
    ["Guarantee virality", false, "Wrong — myth."],
    ["Skip missions", false, "Wrong — false."],
  ]),
  question("bf5", "A 30-minute minimum trains…", [
    ["Pacing and stamina beyond a test dip", true, "Correct — duration builds real skill."],
    ["Exact algorithm rank locks", false, "Wrong — myth."],
    ["Manager hiring", false, "Wrong — unrelated."],
    ["Ban evasion", false, "Wrong — unrelated."],
  ]),
  question("bf6", "When chat is quiet you should…", [
    ["Narrate and continue the plan", true, "Correct — empty-room foundations start here."],
    ["End immediately", false, "Wrong — trains quitting."],
    ["Threaten viewers", false, "Wrong — toxic."],
    ["Sit silent for ten minutes", false, "Wrong — dead air."],
  ]),
  question("bf7", "Light promo helps…", [
    ["People learn when to show up", true, "Correct — attendance cues matter."],
    ["Replace the LIVE itself", false, "Wrong — promo without delivery breaks trust."],
    ["Bypass niche clarity", false, "Wrong — still need clarity."],
    ["Unlock graduation", false, "Wrong — not sufficient alone."],
  ]),
  question("bf8", "Mistake-proofing means…", [
    ["Naming a pitfall and practicing the fix on LIVE", true, "Correct — deliberate practice."],
    ["Ignoring feedback", false, "Wrong — weak."],
    ["Copying violations", false, "Wrong — dangerous."],
    ["Skipping quizzes", false, "Wrong — quizzes check understanding."],
  ]),
  question("bf9", "Beginner success is measured mainly by…", [
    ["Completed structured sessions and habits", true, "Correct — process metrics first."],
    ["Overnight millionaire status", false, "Wrong — unrealistic."],
    ["Hate raids won", false, "Wrong — toxic."],
    ["Password sharing", false, "Wrong — unsafe."],
  ]),
  question("bf10", "Before Program Certificate you must…", [
    ["Finish program lessons/missions and pass this final", true, "Correct — certificate gates on mastery proof."],
    ["Only read titles", false, "Wrong — insufficient."],
    ["Skip the final if you feel ready", false, "Wrong — finals are required."],
    ["Pay a fee instead", false, "Wrong — not how StreamerU works."],
  ]),
  question("bf11", "A sticky-note outline is…", [
    ["A valid tool for segment control", true, "Correct — low-tech plans work."],
    ["Cheating", false, "Wrong — false."],
    ["Banned by TikTok", false, "Wrong — false."],
    ["Only for Managers", false, "Wrong — false."],
  ]),
  question("bf12", "The close of a LIVE should…", [
    ["Recap and tease next time", true, "Correct — continuity builds repeats."],
    ["Hard-cut with no goodbye", false, "Wrong — weak ending."],
    ["Delete the account", false, "Wrong — absurd."],
    ["Start a new niche nightly", false, "Wrong — churn."],
  ]),
  ],
});
