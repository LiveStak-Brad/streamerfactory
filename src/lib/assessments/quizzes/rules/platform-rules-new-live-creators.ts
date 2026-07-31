import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "platform-rules-new-live-creators",
  programKey: "rules",
  title: "Quiz: TikTok rules explained",
  questions: [
  question("q1", "Why learn platform rules early?", [
    ["Violations can restrict or end monetization and reach", true, "Correct — safety protects the career you are building."],
    ["Rules are optional for small creators", false, "Wrong — rules apply at every size."],
    ["Only Managers need rules knowledge", false, "Wrong — every creator is accountable."],
    ["Quizzes invent rules TikTok does not have", false, "Wrong — training reflects real compliance habits."],
  ]),
  question("q2", "A responsible creator treats rules as…", [
    ["Non-negotiable operating constraints", true, "Correct — compliance is part of professionalism."],
    ["Funny challenges to break on stream", false, "Wrong — reckless."],
    ["Only for other countries", false, "Wrong — know your applicable policies."],
    ["Replaced by vibes if chat agrees", false, "Wrong — chat cannot override policy."],
  ]),
  question("q3", "When unsure about a gray area you should…", [
    ["Choose the safer interpretation and verify via official guidance", true, "Correct — caution beats gambling your account."],
    ["Do it for content and apologize later", false, "Wrong — apologies may not restore access."],
    ["Ask chat to vote on legality", false, "Wrong — not a compliance process."],
    ["Assume bans never happen to you", false, "Wrong — denial is risky."],
  ]),
  question("q4", "LIVE-specific risks often include…", [
    ["Music, behavior, and on-stream conduct issues", true, "Correct — live contexts create unique violation surfaces."],
    ["Only thumbnail colors", false, "Wrong — incomplete."],
    ["Having a niche", false, "Wrong — niches are fine."],
    ["Using an outline", false, "Wrong — outlines are fine."],
  ]),
  question("q5", "Reading policies matters more than…", [
    ["Rumors from random commenters", true, "Correct — primary sources beat myths."],
    ["Official Help Center updates", false, "Wrong — those are good sources."],
    ["Your own cautious standards", false, "Wrong — good complement."],
    ["Mentor guidance that cites policy", false, "Wrong — useful when accurate."],
  ]),
  question("q6", "Rules knowledge supports growth because…", [
    ["Stable accounts can compound skills and income", true, "Correct — bans reset progress."],
    ["Fear should stop you from ever going live", false, "Wrong — learn and practice safely."],
    ["You can ignore retention skills", false, "Wrong — both matter."],
    ["Certificates require breaking a rule once", false, "Wrong — absurd/false."],
  ]),
  ],
});
