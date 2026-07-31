import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "start-strong-on-tiktok-live",
  programKey: "beginner",
  title: "Quiz: Understanding TikTok LIVE + Setup",
  questions: [
    question("q1", "You are about to practice your first StreamerU LIVE and the room shows zero viewers. What is the best move?", [
      ["Start anyway with your promise and talking points — success is finishing a prepared session", true, "Correct — Lesson 1 measures preparation and duration, not crowd size. Empty rooms are normal at the start."],
      ["Wait until at least 50 people are online before pressing Go LIVE", false, "Wrong — waiting for a crowd delays the only practice that builds confidence."],
      ["End after two quiet minutes so you do not 'look bad'", false, "Wrong — ending early trains quitting; use your five talking points instead."],
      ["Skip LIVE and only post edited videos until you are famous", false, "Wrong — LIVE skill is built by hosting LIVE, not by postponing it forever."],
    ]),
    question("q2", "Which setup priority order matches this lesson?", [
      ["Audio, then light, then framing", true, "Correct — viewers forgive average video longer than unclear audio; face light next; eye-level framing after."],
      ["Buy a ring light first, then worry about audio later", false, "Wrong — gear without clear audio still fails; audio is first."],
      ["Framing first, then niche, then audio", false, "Wrong — niche matters for readiness, but AV priority is audio → light → framing."],
      ["Viewer count display, then gifts tray, then microphone", false, "Wrong — viewer count is not a setup priority and should not drive your performance."],
    ]),
    question("q3", "What belongs in a strong first-minute promise?", [
      ["Topic + what is happening + why someone should stay", true, "Correct — new joiners need context in seconds: what this is and the payoff for staying."],
      ["An apology for low viewers and a promise you will get better someday", false, "Wrong — apology opens train people to leave; lead with clarity instead."],
      ["A guarantee that gifts will make everyone rich tonight", false, "Wrong — Lesson 1 is not monetization, and fake promises damage trust."],
      ["Reading your entire life story before naming today's topic", false, "Wrong — keep the open short and specific so late joiners can catch up."],
    ]),
    question("q4", "Before going live, which account readiness items matter most in this lesson?", [
      ["Readable username, clear profile photo, and a one-sentence niche", true, "Correct — visitors judge these in about two seconds before they decide to stay."],
      ["A manager contract and a professional studio lease", false, "Wrong — you can start with a phone and a clear plan."],
      ["Buying followers so the room never looks empty", false, "Wrong — fake growth harms trust and can violate platform rules."],
      ["Changing niches every hour until something goes viral", false, "Wrong — one clear sentence beats constant pivots at the beginning."],
    ]),
    question("q5", "Why write five talking-point bullets you can see while live?", [
      ["So you keep talking with direction when chat is quiet", true, "Correct — visible prompts prevent silent staring and aimless rambling."],
      ["So you never have to look at chat again", false, "Wrong — talking points support the room; they do not replace interaction."],
      ["So TikTok automatically ranks you higher", false, "Wrong — prep improves delivery; it is not an algorithm cheat code."],
      ["So you can read a word-for-word script for three hours", false, "Wrong — bullets guide you; rigid scripts often sound unnatural."],
    ]),
    question("q6", "Your only light is behind you and the frame looks dark on your face. What should you do?", [
      ["Turn so you face the light, or move a lamp in front of you", true, "Correct — face the light source; backlight is one of the most common beginner mistakes."],
      ["Keep the backlight because it looks 'cinematic'", false, "Wrong — viewers need to see your face clearly more than they need a silhouette."],
      ["Cancel the LIVE until you buy studio lights", false, "Wrong — a window or lamp facing you is enough for Lesson 1."],
      ["Lower the camera to the floor to fix exposure", false, "Wrong — camera height is framing; it does not fix backlight on your face."],
    ]),
    question("q7", "What is the right learning loop for this StreamerU lesson?", [
      ["Study the system, pass the quiz, then complete the real LIVE Mission", true, "Correct — StreamerU pairs understanding with execution; quiz soft-gates the LIVE exam."],
      ["Skip reading and only watch other streamers forever", false, "Wrong — observation helps, but this lesson requires your own prepared LIVE."],
      ["Complete the Program Final before Lesson 1", false, "Wrong — finals come after the program's lessons and missions."],
      ["Wait until you feel 100% ready before any LIVE practice", false, "Wrong — readiness grows from practice, not endless delay."],
    ]),
    question("q8", "Which statement best matches this lesson's Reality Check?", [
      ["Few or zero viewers at the start is normal — measure preparation and consistency, not popularity", true, "Correct — early LIVEs train systems; growth lessons come later in the path."],
      ["If nobody shows up in the first minute, the account is broken", false, "Wrong — empty starts are common and expected for new creators."],
      ["Viewer count is the only honest grade for Lesson 1", false, "Wrong — Lesson 1 grades behavior: plan, promise, duration, and presence."],
      ["You should only go live after you already have a large audience", false, "Wrong — waiting for an audience delays the practice that builds one."],
    ]),
  ],
});
