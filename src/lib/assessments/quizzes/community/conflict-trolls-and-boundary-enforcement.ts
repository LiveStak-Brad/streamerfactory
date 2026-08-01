import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "conflict-trolls-and-boundary-enforcement",
  programKey: "community",
  title: "Quiz: Conflict, Trolls, and Boundary Enforcement",
  questions: [
    question("q1", "A bait comment is fishing for a clapback. Best first move?", [
      ["Ignore or silently remove — do not amplify the troll into the main character", true, "Correct — attention is the troll's paycheck."],
      ["Start a five-minute roast battle for the clip", false, "Wrong — harassment theater."],
      ["Guilt the whole chat for letting it happen", false, "Wrong — guilt enforcement is banned."],
      ["Share the troll's personal info to scare them", false, "Wrong — doxxing is never allowed."],
    ]),
    question("q2", "The conflict decision tree's core branches are best summarized as…", [
      ["Ignore, warn, timeout, remove — with safety and regular-friction special cases", true, "Correct — that is the tree."],
      ["Always ban first, ask questions never", false, "Wrong — severity and fairness still matter."],
      ["Let chat vote on punishments", false, "Wrong — pile-on culture."],
      ["Only Presence recovery scripts with no enforcement tools", false, "Wrong — PR-08 is a composure callback, not the full tree."],
    ]),
    question("q3", "Two regulars are sniping at each other. Professional move?", [
      ["Slow down, restate the rule, fair reset — do not run a public trial", true, "Correct — belonging friction ≠ troll bait."],
      ["Crown a winner on mic for entertainment", false, "Wrong — spectacle damages trust."],
      ["Encourage chat to pick a side", false, "Wrong — pile-on."],
      ["Break your own rules to punish the one you like less", false, "Wrong — consistency is the boundary."],
    ]),
    question("q4", "Timed responses in this lesson mean…", [
      ["Starve bait of instant emotional labor; act fast on safety; breathe before matching tone", true, "Correct — timing serves the tree."],
      ["Always wait ten minutes before any timeout", false, "Wrong — red-line cases need immediate tools."],
      ["Respond to every comment within one second", false, "Wrong — that rewards bait."],
      ["Never speak after a remove", false, "Wrong — a one-line stabilize can help the room."],
    ]),
    question("q5", "Calm enforcement language should…", [
      ["Name the rule, take the action, return to the segment — host energy, not villain energy", true, "Correct — boring enforcement is professional."],
      ["Force on-mic apologies and shame speeches", false, "Wrong — guilt/shame theater is banned."],
      ["Match cruelty so trolls 'learn'", false, "Wrong — damages culture."],
      ["Debate the troll until they admit defeat", false, "Wrong — amplifies conflict."],
    ]),
    question("q6", "Which is explicitly never allowed?", [
      ["Harassment theater, doxxing, guilt enforcement, or breaking your own rules to 'win'", true, "Correct — ethics lines in this lesson."],
      ["A one-line warning for a first mild spam", false, "Wrong — that is on-tree."],
      ["Logging an incident privately after LIVE", false, "Wrong — required habit."],
      ["Using Presence's acknowledge → stabilize → return beat when adrenaline spikes", false, "Wrong — allowed callback."],
    ]),
    question("q7", "An incident log is for…", [
      ["Short private notes that reveal patterns and handbook updates — not on-stream content", true, "Correct — patterns over grudges."],
      ["Public call-out threads", false, "Wrong — never broadcast the log."],
      ["Proving you banned the most people", false, "Wrong — volume is not the grade."],
      ["Replacing the decision tree", false, "Wrong — log supports the tree; it does not replace it."],
    ]),
    question("q8", "LIVE Mission success for CM-04 is graded on…", [
      ["Keeping the tree visible and practicing calm enforcement on one mild friction moment during 45+ LIVE", true, "Correct — execution graded, not drama volume."],
      ["How viral the conflict clip becomes", false, "Wrong — opposite of the lesson."],
      ["Skipping practice if the room stayed peaceful", false, "Wrong — simulated mild practice counts."],
      ["Doxxing a troll to protect the community", false, "Wrong — never allowed."],
    ]),
  ],
});
