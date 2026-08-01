import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "building-a-career-that-lasts",
  programKey: "wellness",
  title: "Quiz: Building a Career That Lasts",
  questions: [
    question("q1", "A creator wants to stream twelve hours daily for months to 'catch up.' What protects longevity?", [
      ["Set a weekly floor and ceiling sized for ordinary weeks, then improve one dial.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Protect the streak no matter the cost.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Skip recovery until goals are hit.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Grade success only by hours streamed.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q2", "What best defines a durable creator career?", [
      ["Systems you can still run in a hard month without destroying health or relationships.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Maximum intensity every day.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Never missing a trend.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Comparing yourself to larger creators daily.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q3", "How should ambition and capacity relate?", [
      ["Keep ambition large while sizing capacity honestly for an average week.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Let ambition erase recovery.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Shrink ambition to zero.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Ignore capacity until burnout.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q4", "What should a longevity map include?", [
      ["Sustainable hours, protected relationships, body signals, and craft you want to keep enjoying.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Only follower targets.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Only gift targets.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Only gear purchases.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q5", "A creator says rest is lazy. What is the better frame?", [
      ["Recovery is professional infrastructure that protects future performance.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Rest is only for injured creators.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Sleep can be replaced by caffeine.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Vacations prove you are not serious.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q6", "Which metric should NOT grade this lesson's mission?", [
      ["Hours streamed, gifts, or viewer counts.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["A completed longevity map.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["A written weekly floor.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["A dated consistency rule.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q7", "What do long-career performers usually protect?", [
      ["Recovery, sleep, body or voice care, and pacing.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Only branding.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Only virality.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Only all-nighters.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q8", "What belongs in Capstone evidence from this lesson?", [
      ["Dated longevity map, decade worksheet, and consistency-over-intensity card.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["A screenshot of peak concurrent viewers.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["A promise to grind harder.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["An undated intention note.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
  ],
});
