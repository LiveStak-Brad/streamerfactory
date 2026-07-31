import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "structure-your-first-battle-week",
  programKey: "battles",
  title: "Quiz: Running your first battle",
  questions: [
  question("q1", "A first battle week should emphasize…", [
    ["Reps with reflection, not one heroic match", true, "Correct — skill compounds across multiple runs."],
    ["Only one battle ever", false, "Wrong — one data point is weak learning."],
    ["Skipping solo LIVEs forever", false, "Wrong — solo skills still support battles."],
    ["Buying gifts for yourself", false, "Wrong — against healthy / often against rules."],
  ]),
  question("q2", "During the match, clear CTAs help because…", [
    ["People need simple next actions under time pressure", true, "Correct — confusion wastes battle seconds."],
    ["CTAs are banned in battles", false, "Wrong — clear asks are normal."],
    ["Viewers prefer chaos with no asks", false, "Wrong — chaos without direction underperforms."],
    ["Only opponents should speak", false, "Wrong — you must host your side."],
  ]),
  question("q3", "After a battle, you should…", [
    ["Note what worked, what flopped, next tweak", true, "Correct — debriefs turn reps into improvement."],
    ["Delete all memory of losses", false, "Wrong — losses are data."],
    ["Publicly shame gifters who ‘failed you’", false, "Wrong — destroys community."],
    ["Immediately change niches", false, "Wrong — overreaction."],
  ]),
  question("q4", "Scheduling battles in a week works best when…", [
    ["Times are realistic and communicated", true, "Correct — supporters cannot show up to mystery times."],
    ["You never tell anyone the plan", false, "Wrong — secrecy hurts turnout."],
    ["You stack 20 battles with no recovery", false, "Wrong — burnout and quality drop."],
    ["You cancel whenever you feel slightly nervous", false, "Wrong — nerves are normal; reps reduce them."],
  ]),
  question("q5", "Sportsmanship in a loss looks like…", [
    ["Thanking both sides and keeping the door open", true, "Correct — relationships outlast a scoreboard."],
    ["Insulting the winner’s fans", false, "Wrong — damages future collabs."],
    ["Accusing cheating without evidence", false, "Wrong — escalates toxicity."],
    ["Ending without goodbye", false, "Wrong — weak close."],
  ]),
  question("q6", "The mission proof for running battles is…", [
    ["Completing real battle sessions with structure and review", true, "Correct — execution + reflection is the loop."],
    ["Watching battle VODs only", false, "Wrong — observation ≠ completion."],
    ["Passing Manager College first", false, "Wrong — out of order."],
    ["Buying a win", false, "Wrong — invalid and harmful."],
  ]),
  ],
});
