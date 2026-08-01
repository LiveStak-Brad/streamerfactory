import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "maintaining-creativity-for-years",
  programKey: "wellness",
  title: "Quiz: Maintaining Creativity for Years",
  questions: [
    question("q1", "Creative fatigue often needs what?", [
      ["Lower-pressure inputs and recovery before forcing a new series.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["More all-nighters.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Only competitor watching.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Deleting every unfinished idea in shame.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q2", "An inspiration input diet should include?", [
      ["Scheduled inputs outside your niche plus limits on comparison scrolling.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Unlimited hate-watching.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Zero inputs forever.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Only analytics.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q3", "A creativity capacity scorecard helps by?", [
      ["Making invisible drain measurable before you quit the craft.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Proving you are talentless.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Replacing all rest.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Tracking only gifts.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q4", "Format rotation is useful when?", [
      ["It prevents stale obligation shows while protecting a stable core.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["You change identity daily with no core.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["You never repeat a segment.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["You copy every trend.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q5", "Exploration slots should be?", [
      ["Protected from early harsh metrics.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Graded by gifts in the first ten minutes.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Public punishments.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Skipped when busy.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q6", "Comparison kills creativity when?", [
      ["It becomes constant identity scoring instead of brief study.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["You learn one technique.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["You credit a peer.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["You take a class.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q7", "Mission evidence includes?", [
      ["Recovery menu, input diet, and capacity scorecard with dates.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["A viral draft only.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Viewer rank.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["A promise to be inspired.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q8", "Best response to a blank week?", [
      ["Run the recovery menu and reduce output pressure before forcing novelty.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Stream twelve hours angry.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Quit permanently same day.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Shame yourself on LIVE.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
  ],
});
