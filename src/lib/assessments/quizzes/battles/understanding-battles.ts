import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "understanding-battles",
  programKey: "battles",
  title: "Quiz: Understanding battles",
  questions: [
  question("q1", "A TikTok LIVE battle is best understood as…", [
    ["A timed collaboration format with competitive energy", true, "Correct — battles mix performance, social proof, and partnership."],
    ["A guaranteed income machine", false, "Wrong — outcomes vary; skill and relationships matter."],
    ["A replacement for ever hosting solo", false, "Wrong — solo hosting skills still matter."],
    ["Only for creators with 1M followers", false, "Wrong — beginners can learn battles with preparation."],
  ]),
  question("q2", "Before battling, you should understand…", [
    ["Format, timing, and how chat energy works", true, "Correct — mechanics literacy prevents panic."],
    ["How to insult opponents for clout", false, "Wrong — toxicity burns partners and community."],
    ["How to fake gift screenshots", false, "Wrong — dishonest and against healthy culture."],
    ["How to avoid ever promoting the battle", false, "Wrong — promo helps your side show up."],
  ]),
  question("q3", "Battles amplify…", [
    ["Your existing hosting habits — good or bad", true, "Correct — chaos solo becomes chaos in battles."],
    ["Only your follower count magically", false, "Wrong — battles are not instant follower printers."],
    ["Factory Reputation automatically by 1000", false, "Wrong — reputation is separate community progress."],
    ["StreamerU XP without any quiz", false, "Wrong — XP here comes from assessments/missions systems as designed."],
  ]),
  question("q4", "A healthy battle mindset is…", [
    ["Compete hard, protect relationships", true, "Correct — long-term partners beat one-off ego wins."],
    ["Win at any cost including harassment", false, "Wrong — costs you the network."],
    ["Never speak to your opponent", false, "Wrong — interaction is part of the format."],
    ["Quit LIVE if you are losing at minute one", false, "Wrong — composure is a battle skill."],
  ]),
  question("q5", "Why learn battles after foundations?", [
    ["Solo structure and talk skills transfer into battles", true, "Correct — empty-room and hooks still apply."],
    ["Battles forbid any prior LIVE experience", false, "Wrong — opposite."],
    ["Foundations are optional forever", false, "Wrong — foundations reduce battle chaos."],
    ["Rules & Safety does not apply in battles", false, "Wrong — rules always apply."],
  ]),
  question("q6", "Chat’s role in battles is…", [
    ["Energy, support, and readable calls-to-action", true, "Correct — clear asks beat confused yelling."],
    ["Irrelevant; only gifts matter", false, "Wrong — culture and energy move gifts."],
    ["To attack the other side personally", false, "Wrong — toxic chat culture backfires."],
    ["To replace you as the host", false, "Wrong — you still lead."],
  ]),
  ],
});
