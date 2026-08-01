import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "obs-for-gaming-and-stream-key-reality",
  programKey: "gaming",
  title: "Quiz: OBS for Gaming and Stream-Key Reality",
  questions: [
    question(
      "q1",
      "Setting up a new game in OBS, which capture source should you try first?",
      [
        ["Game Capture, before falling back to Window or Display Capture", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Display Capture, since it always shows everything reliably", false, "Wrong — Display Capture is a real privacy risk and not the first choice."],
        ["Video Capture Device, even for a PC game with no external hardware", false, "Wrong — that source is for webcams and capture cards, not native PC games."],
        ["Whatever source a random online guide used for a different game", false, "Wrong — Gaming LIVE Mastery grades testing your own setup, not copying blindly."],
      ],
    ),
    question(
      "q2",
      "Your stream is dropping frames. What should you check first?",
      [
        ["OBS's stats panel, to distinguish dropped frames (network) from rendering/encoding lag (local load)", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Immediately buy a new gaming PC", false, "Wrong — that is an overcorrection before diagnosing the actual bottleneck."],
        ["Assume it is always your internet and nothing else", false, "Wrong — rendering and encoding lag are different problems with different fixes."],
        ["Ignore it if the game still feels smooth to you", false, "Wrong — Gaming LIVE Mastery grades stream quality, not just personal play feel."],
      ],
    ),
    question(
      "q3",
      "What is the honest, accurate statement about stream-key access?",
      [
        ["It is account-dependent, tied to changing eligibility criteria, and never guaranteed", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Every creator automatically gets a stream key after enough followers", false, "Wrong — that is not an accurate description of eligibility."],
        ["Sharing or obtaining someone else's stream key is an acceptable workaround", false, "Wrong — this course never teaches or supports stream-key circumvention."],
        ["Stream keys never expire or need protection", false, "Wrong — keys should be protected and regenerated if compromised."],
      ],
    ),
    question(
      "q4",
      "You do not currently have OBS stream-key access. What is the correct move?",
      [
        ["Use TikTok LIVE Studio directly, or build the OBS Virtual Camera into LIVE Studio workflow — never seek a workaround", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Ask another creator to share their stream key with you", false, "Wrong — this course never supports using another account's key."],
        ["Look for a third-party tool that bypasses the eligibility check", false, "Wrong — circumventing stream-key eligibility is never taught or supported here."],
        ["Give up on gaming LIVE entirely until access changes", false, "Wrong — LIVE Studio and Virtual Camera routing are legitimate paths available now."],
      ],
    ),
    question(
      "q5",
      "Choosing a bitrate for your gaming stream should be based on…",
      [
        ["Testing your own resolution, framerate, content motion, and upload bandwidth — there is no single universal number", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Copying the exact number from a guide written for a different game and connection", false, "Wrong — that ignores your actual hardware and bandwidth."],
        ["Always maxing bitrate regardless of upload speed", false, "Wrong — that causes dropped frames on a limited connection."],
        ["Picking the lowest possible number to be safe", false, "Wrong — that can produce visible blockiness in fast motion."],
      ],
    ),
    question(
      "q6",
      "A demanding game is causing your OBS setup to lag. A reasonable single-PC fix is…",
      [
        ["Cap your in-game FPS slightly below your monitor max and check your encoder choice before assuming you need a second PC", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Immediately buy a dedicated second PC for encoding", false, "Wrong — most gaming creators do not need dual-PC; try single-PC fixes first."],
        ["Add more browser-source alerts to make the stream look busier", false, "Wrong — that adds load and worsens the problem."],
        ["Ignore the lag since viewers probably will not notice", false, "Wrong — Gaming LIVE Mastery grades technical reliability."],
      ],
    ),
    question(
      "q7",
      "What should you always keep ready in your OBS gaming scene collection?",
      [
        ["A backup/offline scene for capture failures or crashes, so dead air is never your only option", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Only one scene, to keep things simple", false, "Wrong — a single scene leaves no fallback during downtime or failures."],
        ["As many scene collections as possible, regardless of whether games differ", false, "Wrong — scene collections should reflect real layout differences, not clutter."],
        ["No Replay Buffer, since it is unnecessary for gaming", false, "Wrong — Replay Buffer is a useful safety net for capturing key moments after the fact."],
      ],
    ),
    question(
      "q8",
      "Mission success for GM-06 is graded on…",
      [
        ["Working, tested OBS scenes plus honest documentation of your current stream-key status", true, "Correct — matches Gaming LIVE Mastery standards for this lesson."],
        ["Whether you currently have stream-key access", false, "Wrong — access status itself is never the grading criterion."],
        ["Viewer count or gifts received during setup", false, "Wrong — Gaming LIVE Mastery grades execution, not viewers or gifts."],
        ["How expensive your capture and encoding hardware is", false, "Wrong — not the professional decision for this scenario."],
      ],
    ),
  ],
});
