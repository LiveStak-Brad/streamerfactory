import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "structuring-longer-lives",
  programKey: "content",
  title: "Quiz: Structuring longer lives",
  questions: [
    question(
      "q1",
      "You're planning a 90-minute session and trying to decide what goes where. Which block should hold your highest-energy loops and opening hook?",
      [
        ["Block one, roughly minutes 0–20 — the opener and warm-up", true, "Correct — new viewers are most likely to arrive early, so front-load your most engaging material there."],
        ["Block three, roughly minutes 45–70 — the recovery block", false, "Wrong — block three is intentionally your lowest-intensity stretch, not your highest."],
        ["Whichever block you feel most awake for that day", false, "Wrong — the lesson teaches a planned arc, not an improvised one based on mood."],
        ["Spread evenly with no distinct high-energy block", false, "Wrong — an undifferentiated session is exactly what this lesson replaces."],
      ],
    ),
    question(
      "q2",
      "You reach the end of block two with fifteen minutes left on the clock and nothing prepared. What does this lesson say to do?",
      [
        ["Deploy one of your three pre-written stretch goals", true, "Correct — stretch goals exist for exactly this scenario, so you never improvise filler."],
        ["Pad the time with unrelated small talk", false, "Wrong — undirected padding is the drift this lesson warns against."],
        ["End the session early since you ran out of material", false, "Wrong — ending early trains quitting instead of using the tool built for this moment."],
        ["Apologize to viewers for not having enough content", false, "Wrong — an apology doesn't solve the gap; a prepared stretch goal does."],
      ],
    ),
    question(
      "q3",
      "Your voice starts to feel strained around minute 60. What is the correct response according to this lesson?",
      [
        ["Lean into the recovery block — lower energy on purpose and let the dip be honest", true, "Correct — an honest dip during block three is more watchable than forcing a fake peak."],
        ["Push through at full volume so viewers don't notice", false, "Wrong — forced peak energy for the full 90 minutes reads as fake and risks burnout."],
        ["End the stream immediately to protect your voice", false, "Wrong — the recovery block exists precisely so you don't have to end early."],
        ["Switch to text-only chat replies for the rest of the session", false, "Wrong — that abandons hosting; lower energy, still narrated, is the fix."],
      ],
    ),
    question(
      "q4",
      "You need to grab water mid-session. What does this lesson say to do?",
      [
        ["Narrate it out loud as you do it, inside block three", true, "Correct — a narrated break is content about the honest experience of a long stream, not dead air."],
        ["Mute yourself and step away silently for a minute", false, "Wrong — a silent pause reads as dead air with a different excuse."],
        ["Wait until the very end of the session to ever drink water", false, "Wrong — ignoring physical needs until they become a problem is a named mistake in this lesson."],
        ["End the stream early rather than take any break", false, "Wrong — a short narrated break doesn't require ending the session."],
      ],
    ),
    question(
      "q5",
      "You sit down before a session and genuinely can't picture what would fill a deep block or a recovery block tonight. What should you do?",
      [
        ["Scale down to a well-structured 60-minute, three-block session instead", true, "Correct — the four-block shape doubles as an honesty check before you go live, not just a plan to force through."],
        ["Go live for 90 minutes anyway and hope material appears", false, "Wrong — this is exactly the setup for stalling out mid-session."],
        ["Cancel your LIVE for the day entirely", false, "Wrong — a shorter honest session is the better fix, not skipping the day."],
        ["Only run block one and end immediately after", false, "Wrong — a scaled three-block session is the intended fallback, not an abrupt single-block stream."],
      ],
    ),
    question(
      "q6",
      "How many stretch goals does this lesson recommend preparing, and how should they be scoped?",
      [
        ["Three total for the whole session, not per block", true, "Correct — three total avoids over-preparing content you'll never use."],
        ["One per block, for a total of four", false, "Wrong — the lesson specifically says total, not per block."],
        ["As many as possible so you're always covered", false, "Wrong — over-preparing wastes prep time on unused material."],
        ["None — stretch goals should always be improvised live", false, "Wrong — stretch goals are pre-written on purpose, to avoid improvising under pressure."],
      ],
    ),
    question(
      "q7",
      "A wave of new viewers arrives right at the start of block four, your closer. What's the right move?",
      [
        ["Deliver your planned re-hook as scripted", true, "Correct — the re-hook works as a first impression for new arrivals just as well as a payoff for long-time viewers."],
        ["Restart the entire 90-minute session from block one", false, "Wrong — restarting punishes viewers who've been there the whole time."],
        ["Ignore the new arrivals since the session is almost over", false, "Wrong — a re-hook is designed to welcome exactly this kind of late arrival."],
        ["Extend the session by another 90 minutes to accommodate them", false, "Wrong — the lesson doesn't ask you to extend length reactively."],
      ],
    ),
    question(
      "q8",
      "What is this lesson's mission scorecard for a 90-minute LIVE?",
      [
        ["Visible four-block structure from start to finish, not just surviving to the end", true, "Correct — success is architecture executed throughout, not merely reaching the 90-minute mark."],
        ["Reaching the highest peak concurrent viewer count of the session", false, "Wrong — peak viewers is not the scoreboard for this mission."],
        ["Avoiding any breaks of any kind for the full 90 minutes", false, "Wrong — a narrated break inside block three is expected and correct."],
        ["Reading the entire session from a written script word-for-word", false, "Wrong — the four blocks are a container to fill live, not a script to read verbatim."],
      ],
    ),
  ],
});
