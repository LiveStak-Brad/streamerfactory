import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "handling-pressure-moments-live",
  programKey: "presence",
  title: "Quiz: Handling Pressure Moments Live",
  questions: [
    question("q1", "When a troll, tech fail, gift interrupt, or sudden crowd hits, you should…", [
      ["Use a short recovery script, stabilize, and return to the planned beat", true, "Correct — acknowledge → stabilize → return."],
      ["Argue with the troll until they leave", false, "Wrong — feeds the interruption."],
      ["Abandon the segment and never mention what happened", false, "Wrong — room needs a clean reset."],
      ["Rage-quit to punish the room", false, "Wrong — destroys trust."],
    ]),
    question("q2", "Skipping the Return beat usually means…", [
      ["The pressure event becomes the whole show", true, "Correct — always return to plan."],
      ["You look more authentic forever", false, "Wrong — chaos trains chaos."],
      ["Capstone forbids returning", false, "Wrong — Capstone needs recovery plan."],
      ["Chat will fix the arc for you", false, "Wrong — you lead."],
    ]),
    question("q3", "Large gift hits during a teaching climax. Best move?", [
      ["Short specific thank, protect the payoff, return to the teach quickly", true, "Correct — gratitude without derailment."],
      ["Five-minute speech and restart the lesson from zero", false, "Wrong — kills pacing."],
      ["Ignore the gift entirely to seem cool", false, "Wrong — under-thanking feels cold."],
      ["Guilt the room into matching immediately", false, "Wrong — off-limits."],
    ]),
    question("q4", "Troll bait arrives. Professional recovery is…", [
      ["Boundary line, mute/block if needed, optional light lever, return to segment", true, "Correct — no debate show."],
      ["Three-minute public execution for clout", false, "Wrong — escalation addiction."],
      ["Matching cruelty to prove edge", false, "Wrong — damages the room."],
      ["Ending forever because one comment hurt", false, "Wrong — extreme."],
    ]),
    question("q5", "Tech glitch recovery shape?", [
      ["Name the issue, one action, contingency — viewers forgive tech more than panic loops", true, "Correct — short and adult."],
      ["Apologize on loop for ten minutes", false, "Wrong — spiral."],
      ["Silent freeze with no plan", false, "Wrong — not recovery."],
      ["Blame chat for your Wi-Fi", false, "Wrong — not helpful."],
    ]),
    question("q6", "Viewer count spikes suddenly. Best script shape?", [
      ["Welcome spike → one-sentence promise/context → continue the beat → sprinkle recognition", true, "Correct — do not become a welcome robot."],
      ["Restart your whole niche pitch every five seconds", false, "Wrong — abandons the arc."],
      ["Ignore all newcomers forever", false, "Wrong — belonging matters."],
      ["Drop the segment and only read usernames", false, "Wrong — no value."],
    ]),
    question("q7", "If no pressure event occurs on mission LIVE, you should…", [
      ["Still drill recovery language out loud as a composure practice segment", true, "Correct — behavior over luck."],
      ["Fail the lesson automatically", false, "Wrong — planted drills count."],
      ["Skip recovery work until Capstone week", false, "Wrong — practice now."],
      ["Invent a fight with chat to create pressure", false, "Wrong — harmful."],
    ]),
    question("q8", "Capstone connection?", [
      ["Pressure Recovery Card becomes required Capstone recovery-plan evidence", true, "Correct — do not invent under adrenaline later."],
      ["Recovery is optional if you felt confident", false, "Wrong — Capstone requires the plan."],
      ["Honors Lab must approve scripts before LIVE", false, "Wrong — labs never gate."],
      ["Only gift shock needs a script", false, "Wrong — four scenarios."],
    ]),
  ],
});
