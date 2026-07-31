import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "start-strong-on-tiktok-live",
  programKey: "beginner",
  title: "Quiz: Understanding TikTok LIVE + Setup",
  questions: [
  question("q1", "What is the main goal of your first structured LIVE practice?", [
    ["Finish a real LIVE with a clear topic and visible plan", true, "Correct — early practice is about intentional structure, not viral reach."],
    ["Hit a specific diamond target on day one", false, "Wrong — monetization goals come later; foundations focus on structure."],
    ["Invite as many battle partners as possible", false, "Wrong — battles are a later program; first focus on solo structure."],
    ["Only go live if at least 50 people are waiting", false, "Wrong — waiting for a crowd delays practice; empty rooms are normal early on."],
  ]),
  question("q2", "Before going live, which prep items matter most?", [
    ["Username, profile photo, and a one-sentence niche", true, "Correct — viewers need to know who you are and what the stream is about."],
    ["A professional studio lease", false, "Wrong — you can start with a phone and a clear plan."],
    ["A manager contract", false, "Wrong — Manager pathways come after graduation, not before setup."],
    ["Buying followers before you stream", false, "Wrong — fake growth harms trust and can violate platform rules."],
  ]),
  question("q3", "Why write talking-point bullets you can see while live?", [
    ["So you keep talking with direction when chat is quiet", true, "Correct — visible prompts prevent silent staring and rambling."],
    ["So you can read a script word-for-word the whole time", false, "Wrong — bullets guide you; rigid scripts often sound unnatural."],
    ["So TikTok’s algorithm ranks you higher automatically", false, "Wrong — prep helps delivery; it is not an algorithm cheat code."],
    ["So you never need to interact with chat", false, "Wrong — talking points support interaction; they do not replace it."],
  ]),
  question("q4", "What counts as a failure pattern in early LIVE practice?", [
    ["Long silent staring stretches with no narration", true, "Correct — dead air trains viewers (and you) that nothing is happening."],
    ["Streaming for more than 20 minutes", false, "Wrong — longer intentional sessions are a goal, not a failure."],
    ["Having fewer than 1,000 followers", false, "Wrong — follower count is not the beginner success metric."],
    ["Using a sticky note for your outline", false, "Wrong — low-tech outlines are encouraged."],
  ]),
  question("q5", "How should a beginner think about niche?", [
    ["One clear sentence viewers can understand immediately", true, "Correct — clarity beats a vague ‘I do everything’ pitch."],
    ["Change niches every stream to find what goes viral", false, "Wrong — constant pivots confuse return viewers."],
    ["Hide your niche until people gift", false, "Wrong — people need a reason to stay before they gift."],
    ["Copy another creator’s entire persona", false, "Wrong — learn patterns, but build your own clear identity."],
  ]),
  question("q6", "What is the right order for this lesson’s learning loop?", [
    ["Study the concepts, then execute a real LIVE mission", true, "Correct — StreamerU pairs study with execution, not theory alone."],
    ["Skip reading and only watch other streamers", false, "Wrong — observation helps, but this lesson requires your own LIVE."],
    ["Complete the Program Final before the first lesson quiz", false, "Wrong — finals come after the program’s lessons and missions."],
    ["Wait until you feel 100% ready before any LIVE", false, "Wrong — readiness grows from practice, not endless delay."],
  ]),
  ],
});
