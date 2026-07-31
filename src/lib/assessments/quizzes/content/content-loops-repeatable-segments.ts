import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "content-loops-repeatable-segments",
  programKey: "content",
  title: "Quiz: Viewer retention techniques",
  questions: [
  question("q1", "A content loop is…", [
    ["A repeatable segment pattern viewers can anticipate", true, "Correct — loops create familiarity and return reasons."],
    ["A glitch that restarts your LIVE", false, "Wrong — not a technical bug."],
    ["Only viral dances on loop", false, "Wrong — loops are formats, not one content type."],
    ["A battle timer exclusively", false, "Wrong — battles can use loops, but loops are broader."],
  ]),
  question("q2", "Retention improves when viewers…", [
    ["Always know what is coming next", true, "Correct — clear transitions reduce drop-off."],
    ["Never hear the plan", false, "Wrong — mystery without promise often loses people."],
    ["Only see gift goals", false, "Wrong — goals help, but segments carry retention."],
    ["Are told to stay ‘or else’", false, "Wrong — pressure is not retention skill."],
  ]),
  question("q3", "This mission focuses on…", [
    ["Longer session with frequent segment transitions", true, "Correct — practice holding attention with structure."],
    ["Ending whenever CCV dips", false, "Wrong — dipping CCV is when retention skill matters."],
    ["Silent screenshares only", false, "Wrong — presence still matters."],
    ["Skipping the LIVE if you already understand retention", false, "Wrong — execution is required."],
  ]),
  question("q4", "Why are repeatable segments valuable weekly?", [
    ["Return viewers learn your show’s rhythm", true, "Correct — familiarity compounds loyalty."],
    ["TikTok pays more for identical minutes", false, "Wrong — no such payout rule."],
    ["You never need new ideas again", false, "Wrong — loops evolve; they are not stagnation."],
    ["They replace community interaction", false, "Wrong — loops should include interaction."],
  ]),
  question("q5", "A weak retention habit is…", [
    ["Endless ramble with no next-beat promise", true, "Correct — no forward motion invites exits."],
    ["Teasing the next segment before a break", false, "Wrong — that is a retention technique."],
    ["Naming the loop (‘Q&A round’, ‘story round’)", false, "Wrong — labels help orientation."],
    ["Checking energy and resetting with a hook", false, "Wrong — healthy recovery."],
  ]),
  question("q6", "Peak CCV vs retention lesson priority?", [
    ["Retention process over peak screenshot chasing", true, "Correct — this lesson scores holding attention, not vanity peaks."],
    ["Only peaks matter; ignore process", false, "Wrong — process builds sustainable peaks."],
    ["Disable analytics forever", false, "Wrong — you can watch metrics without idolizing peaks."],
    ["Retention means never changing segments", false, "Wrong — transitions are part of retention."],
  ]),
  ],
});
