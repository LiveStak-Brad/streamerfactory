import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "healthy-relationships-and-personal-boundaries",
  programKey: "wellness",
  title: "Quiz: Healthy Relationships & Personal Boundaries",
  questions: [
    question("q1", "Streaming around children requires what first?", [
      ["Clear privacy and consent rules that protect the child over content needs.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["More cute moments for virality.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["No rules until something goes wrong.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Open location sharing.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q2", "A partner feels ignored after late streams. Best move?", [
      ["Schedule a check-in and rewrite shared expectations and protected time.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Say the algorithm requires it forever.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Argue that fans come first.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Hide the schedule.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q3", "Parasocial pressure is reduced by?", [
      ["Clear public boundaries and consistent redirects.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Giving every viewer private access.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Sharing your address for authenticity.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Becoming on-call therapy.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q4", "Privacy expectations should cover?", [
      ["Background, audio bleed, household members, and account separation.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Only fonts.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Only overlays.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Only gift goals.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q5", "A boundary is usable when?", [
      ["You can repeat it calmly on air without improvising under stress.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["It exists only in your head.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["It changes every comment.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["It requires anger to enforce.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q6", "Friends off-platform matter because?", [
      ["Offline relationships protect identity beyond the account.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Friends reduce watch time.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Isolation improves creativity forever.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Only chat friendships count.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q7", "Mission success means?", [
      ["Written boundaries, household card, and privacy guide with a scheduled check-in.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["More secret streaming.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["No conversations at home.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Public oversharing.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q8", "If a viewer demands constant access, you should?", [
      ["Restate the boundary and use moderation tools as needed.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Share private numbers.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Apologize for having a life.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Stream twenty hours to compensate.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
  ],
});
