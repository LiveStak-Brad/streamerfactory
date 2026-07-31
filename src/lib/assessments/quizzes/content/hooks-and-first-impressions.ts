import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "hooks-and-first-impressions",
  programKey: "content",
  title: "Quiz: Hooks and first impressions",
  questions: [
    question("q1", "A viewer joins your LIVE for the first time at minute 22. How does this lesson say they experience that moment?", [
      ["As their own first-impression zero, same as someone joining at 0:00", true, "Correct — every new arrival needs a reason to stay, regardless of when they joined."],
      ["As a less important moment than someone who joined at the start", false, "Wrong — this lesson treats every arrival as needing a fresh hook."],
      ["As proof the stream is already failing since it's not minute zero", false, "Wrong — mid-stream arrivals are normal and expected on LIVE."],
      ["As something only advanced creators need to worry about", false, "Wrong — this applies at every stage, including your very first hook-focused sessions."],
    ]),
    question("q2", "Which of these is closest to a strong opening hook, according to this lesson?", [
      ["\"I'm about to show you the mistake that cost me my first 100 viewers.\"", true, "Correct — specific, slightly provocative, and resolvable within the next few minutes."],
      ["\"Hey guys, welcome back to the stream.\"", false, "Wrong — this tells a stranger nothing about why to stay."],
      ["\"Thanks everyone for coming, as always.\"", false, "Wrong — generic gratitude isn't a hook; it doesn't state a topic or payoff."],
      ["\"Let's see what happens tonight, who knows.\"", false, "Wrong — vague uncertainty gives a scrolling viewer no reason to stop."],
    ]),
    question("q3", "Around what point in a session should you deliver the mid-stream reset?", [
      ["Roughly the 15-minute mark", true, "Correct — this is when attention naturally starts to decay and new viewers have often arrived."],
      ["Only in the final five minutes of the session", false, "Wrong — that's closer to the late re-hook window, not the mid-stream reset."],
      ["Immediately after the opening hook, within the first minute", false, "Wrong — the reset is meant to interrupt a session already in progress."],
      ["Whenever chat specifically requests a topic change", false, "Wrong — the reset runs on a schedule, not only on request."],
    ]),
    question("q4", "Nobody visibly new has joined by your scheduled 15:00 mid-stream reset. What should you do?", [
      ["Run the reset anyway — it re-engages existing viewers too", true, "Correct — the reset re-anchors long-time viewers whose attention is naturally drifting, not just newcomers."],
      ["Skip it since there's no one new to hook", false, "Wrong — this lesson explicitly says to run it regardless of visible new arrivals."],
      ["Delay it until someone new actually joins", false, "Wrong — delaying defeats the purpose of a scheduled attention reset."],
      ["Replace it with an apology for low viewer turnout", false, "Wrong — apologizing is unrelated to running a reset and reads poorly."],
    ]),
    question("q5", "What does 'verbal packaging' mean in this lesson?", [
      ["Compressing what you're about to say into one confident, specific sentence", true, "Correct — packaging turns a meandering thought into stakes, specificity, and a clear payoff in one breath."],
      ["Writing a long, detailed introduction before every topic", false, "Wrong — packaging is about compression, not elaboration."],
      ["Using industry jargon to sound more credible", false, "Wrong — clarity and specificity matter more than jargon."],
      ["Reading your hook off a script without eye contact", false, "Wrong — delivery with eye contact and energy is a separate, necessary skill."],
    ]),
    question("q6", "Why does this lesson say to script all three hooks word-for-word in advance?", [
      ["Ad-libbing a hook live usually produces a weaker, vaguer version of the idea", true, "Correct — advance scripting protects the specificity that makes a hook work."],
      ["TikTok requires pre-approved scripts for LIVE hosts", false, "Wrong — not a platform requirement."],
      ["It guarantees every hook will get a visible viewer spike", false, "Wrong — scripting improves quality but doesn't guarantee outcomes."],
      ["Improvised hooks are against StreamerU's mission rules", false, "Wrong — the reason given is quality, not a rules violation."],
    ]),
    question("q7", "What is this lesson's mission requirement?", [
      ["A 45+ minute LIVE using three different hooks at roughly 0:00, 15:00, and 30:00", true, "Correct — the mission proves deliberate hook deployment on schedule."],
      ["A 30-minute LIVE using only one strong opening hook", false, "Wrong — this lesson requires three distinct hooks, not just one."],
      ["Any duration, as long as viewer count increases", false, "Wrong — viewer count is not the pass condition for this mission."],
      ["A scripted session with zero live interaction", false, "Wrong — hooks are delivered live, with room to react naturally."],
    ]),
    question("q8", "How does this lesson distinguish hooks from the architecture taught in the next lesson?", [
      ["Hooks are sharp, short spike moments; architecture is what holds attention between them", true, "Correct — this lesson is explicit that loops and named segments are a separate, later skill."],
      ["Hooks and retention loops are the same technique with different names", false, "Wrong — the lesson explicitly separates the two skills."],
      ["Architecture replaces the need for hooks entirely", false, "Wrong — both are needed; hooks earn attention, architecture holds it."],
      ["Hooks are only used once you've mastered retention loops", false, "Wrong — hooks come first in this program's sequence, not after."],
    ]),
  ],
});
