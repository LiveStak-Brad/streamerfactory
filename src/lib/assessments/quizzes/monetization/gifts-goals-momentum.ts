import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "gifts-goals-momentum",
  programKey: "monetization",
  title: "Quiz: How gifting works",
  questions: [
  question("q1", "Gifts on TikTok LIVE are best framed as…", [
    ["Support triggered by reasons, momentum, and relationship", true, "Correct — gifts follow value and emotion, not demands alone."],
    ["Something you are owed for showing up", false, "Wrong — entitlement kills culture."],
    ["Only possible after Manager Certification", false, "Wrong — gifting is a LIVE feature; manager path is separate."],
    ["Illegal in every region", false, "Wrong — false as a blanket statement."],
  ]),
  question("q2", "Momentum in gifting often comes from…", [
    ["Visible progress toward a clear goal", true, "Correct — people join motion they can see."],
    ["Threatening to ban non-gifters", false, "Wrong — toxic and often against rules/norms."],
    ["Never stating any goal", false, "Wrong — clarity helps participation."],
    ["Lying about totals", false, "Wrong — destroys trust."],
  ]),
  question("q3", "Why understand gift mechanics before heavy asks?", [
    ["So your CTAs match how the feature actually works", true, "Correct — confused asks underperform."],
    ["Mechanics knowledge replaces needing content", false, "Wrong — content still carries the room."],
    ["So you can exploit loopholes safely forever", false, "Wrong — loophole hunting risks bans."],
    ["Because quizzes require memorizing coin prices only", false, "Wrong — conceptual understanding > trivia."],
  ]),
  question("q4", "Healthy gift culture includes…", [
    ["Gratitude and recognition without humiliation", true, "Correct — respect scales better than shame."],
    ["Public shaming of small gifters", false, "Wrong — drives people away."],
    ["Ignoring big supporters to seem cool", false, "Wrong — recognition matters."],
    ["Fake screenshots of gifts", false, "Wrong — dishonest."],
  ]),
  question("q5", "Goals work when they are…", [
    ["Specific, believable, and tied to the stream’s story", true, "Correct — vague or impossible goals fail."],
    ["Infinite and never explained", false, "Wrong — no finish line, no momentum."],
    ["Copied word-for-word from scams", false, "Wrong — harmful."],
    ["Hidden until after people gift", false, "Wrong — people need the reason up front."],
  ]),
  question("q6", "Monetization training still requires…", [
    ["Hosting skill from earlier programs", true, "Correct — empty rooms and retention underpin gift moments."],
    ["Abandoning all structure", false, "Wrong — structure helps timed asks."],
    ["Skipping Rules & Safety", false, "Wrong — compliance protects income long-term."],
    ["Never running missions again", false, "Wrong — missions keep skills sharp."],
  ]),
  ],
});
