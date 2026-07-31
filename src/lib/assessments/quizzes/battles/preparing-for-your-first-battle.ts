import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "preparing-for-your-first-battle",
  programKey: "battles",
  title: "Quiz: Preparing for your first battle",
  questions: [
  question("q1", "Prep for a first battle should include…", [
    ["Partner agreement, timing, and a simple talk plan", true, "Correct — alignment prevents awkward chaos."],
    ["No plan so it feels raw", false, "Wrong — raw without prep usually collapses."],
    ["Hiring a studio audience", false, "Wrong — unnecessary for first practice."],
    ["Promising viewers you will win every match", false, "Wrong — overpromises damage trust."],
  ]),
  question("q2", "Why brief your community before a battle?", [
    ["So supporters know when to show up and how to help", true, "Correct — coordinated energy beats surprise silence."],
    ["Because battles are illegal otherwise", false, "Wrong — not illegal; briefing is strategy."],
    ["To discourage anyone from watching", false, "Wrong — opposite intent."],
    ["So you can skip hosting entirely", false, "Wrong — you still host."],
  ]),
  question("q3", "A first-battle talk plan should be…", [
    ["Simple cues for open, mid, and close energy", true, "Correct — light structure fits the format."],
    ["A 10-page legal contract read on stream", false, "Wrong — overkill and dull."],
    ["Only insults prepared in advance", false, "Wrong — harmful culture."],
    ["Silent mode to save voice", false, "Wrong — battles need presence."],
  ]),
  question("q4", "Technical prep includes…", [
    ["Stable connection, charged device, notifications managed", true, "Correct — dropouts kill battle momentum."],
    ["Streaming from a moving car without mounts", false, "Wrong — unsafe and unstable."],
    ["Disabling the mic for mystery", false, "Wrong — audio is essential."],
    ["Ignoring lighting completely forever", false, "Wrong — basic visibility helps first impressions."],
  ]),
  question("q5", "Choosing a first battle partner — prefer…", [
    ["Someone communicative who wants a fair practice match", true, "Correct — learning partners beat ego traps."],
    ["The biggest creator who will ignore you", false, "Wrong — poor learning environment."],
    ["Anyone toxic ‘for content’", false, "Wrong — costs reputation and safety."],
    ["A bot account", false, "Wrong — not a real practice partner."],
  ]),
  question("q6", "Mental prep means…", [
    ["Expect swings; stay composed if behind", true, "Correct — emotional control is part of performance."],
    ["Rage quit scripts ready", false, "Wrong — quitting scripts train the wrong habit."],
    ["Assuming you will never lose", false, "Wrong — unrealistic."],
    ["Blaming chat in advance", false, "Wrong — ownership mindset wins long-term."],
  ]),
  ],
});
