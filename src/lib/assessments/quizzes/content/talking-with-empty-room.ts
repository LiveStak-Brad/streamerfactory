import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "talking-with-empty-room",
  programKey: "content",
  title: "Quiz: Talking when no one is watching",
  questions: [
    question("q1", "You go live and the viewer counter reads zero. What does this lesson say that number means?", [
      ["A starting condition — the algorithm hasn't tested your room yet", true, "Correct — zero is normal at the start, not a verdict on your content."],
      ["Proof that your content or niche isn't working", false, "Wrong — an empty counter early on says nothing about content quality."],
      ["A sign you should end the session and try again later", false, "Wrong — ending early trades away the exact practice this lesson is built on."],
      ["Evidence that you need to change your niche immediately", false, "Wrong — niche changes aren't the fix for an early empty room."],
    ]),
    question("q2", "Which of the three modes involves picking a topic you know and explaining it like a compact mini-lesson?", [
      ["Teach", true, "Correct — Teach mode is the highest-value mode because structured explanation reads as effort and expertise."],
      ["Narrate", false, "Wrong — Narrate is describing what's happening right now, moment to moment."],
      ["Plan", false, "Wrong — Plan is thinking out loud about near-term goals, not delivering a mini-lesson."],
      ["React", false, "Wrong — 'React' is not one of the three modes taught in this lesson."],
    ]),
    question("q3", "What does the 20-second silence rule tell you to do?", [
      ["Jump to your next prompt card the moment you catch more than 20 seconds of genuine silence", true, "Correct — the rule catches dead air before it compounds, rather than waiting for inspiration."],
      ["Wait 20 seconds after every sentence before continuing", false, "Wrong — the rule is a maximum silence threshold, not a required pause."],
      ["End the stream if silence hits 20 seconds", false, "Wrong — the fix is jumping to a prompt, not ending the session."],
      ["Apologize to viewers if you go silent for 20 seconds", false, "Wrong — apologizing signals people to leave rather than stay."],
    ]),
    question("q4", "When should you write your five self-prompt cards?", [
      ["Before you go live, never mid-session", true, "Correct — writing them live adds decision fatigue exactly when you can least afford it."],
      ["Only after you notice you've gone silent", false, "Wrong — by then it's too late to write them calmly."],
      ["Once, and then never update them again", false, "Wrong — refreshing prompts over time keeps them useful, but they must exist before you start."],
      ["During the stream, based on what chat requests", false, "Wrong — prompt cards are a pre-live preparation habit."],
    ]),
    question("q5", "A single silent viewer joins your empty room and never types in chat. What should you do?", [
      ["Keep going as planned and acknowledge them without demanding a response", true, "Correct — silent viewers often stay longer when they don't feel pressured to perform."],
      ["Stop everything and beg them to say something", false, "Wrong — pressuring a silent viewer to chat can drive them away."],
      ["Ignore them completely since they aren't chatting", false, "Wrong — a brief acknowledgment costs nothing and can make them feel welcome."],
      ["End the session since one viewer isn't enough to continue for", false, "Wrong — the mission is about holding the room regardless of chat activity."],
    ]),
    question("q6", "What is this lesson's mission duration and dead-air target?", [
      ["45+ minutes with fewer than 30 cumulative seconds of dead air", true, "Correct — this is the specific behavioral target for the empty-room mission."],
      ["5 minutes of silent posing to build tolerance", false, "Wrong — that's the opposite of the skill being trained."],
      ["Only until the first viewer joins, however long that takes", false, "Wrong — the mission is a fixed-duration session regardless of when viewers arrive."],
      ["Exactly one minute of talk per viewer in the room", false, "Wrong — viewer count doesn't set the clock for this mission."],
    ]),
    question("q7", "Why does this lesson say to talk as if a silent viewer might already be there?", [
      ["Many viewers watch without visibly showing up or chatting in their first seconds", true, "Correct — acknowledging a possible lurker costs nothing and makes real ones feel included."],
      ["TikTok requires hosts to address an assumed audience by policy", false, "Wrong — not a platform requirement, a retention habit."],
      ["It guarantees the algorithm will boost your room", false, "Wrong — no technique guarantees algorithmic outcomes."],
      ["It replaces the need to ever check your actual viewer count", false, "Wrong — it's a talking habit, unrelated to whether you check the count."],
    ]),
    question("q8", "Why is empty-room talk described as the foundation for every later skill in this program?", [
      ["Hooks and retention loops only matter if you can already sustain talk between them", true, "Correct — without sustained presence, you never stay live long enough to use later techniques."],
      ["Because empty rooms are the only place hooks can be practiced", false, "Wrong — hooks are practiced in any session, not only empty ones."],
      ["Because retention loops require zero viewers to function", false, "Wrong — retention loops apply regardless of viewer count."],
      ["Because algorithms only reward creators who never grow an audience", false, "Wrong — growth is the eventual goal, not something this lesson discourages."],
    ]),
  ],
});
