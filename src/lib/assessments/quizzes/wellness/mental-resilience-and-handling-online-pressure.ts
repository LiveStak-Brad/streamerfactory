import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "mental-resilience-and-handling-online-pressure",
  programKey: "wellness",
  title: "Quiz: Mental Resilience & Handling Online Pressure",
  questions: [
    question("q1", "A pile-on starts in chat. Best first move?", [
      ["Stabilize with moderation tools, avoid impulsive replies, then triage later with a framework.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Argue every comment for three hours.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Read every reply before sleeping.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Promise personal friendship to critics.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q2", "Comparison becomes harmful when?", [
      ["It becomes identity scoring instead of brief skill study.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["You watch one educational clip.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["You celebrate a peer.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["You learn one technique.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q3", "What belongs in aftercare before analytics?", [
      ["A short come-down routine that restores body and mind first.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Immediate rank checking.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Reply-all to hate comments.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Starting another four-hour stream.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q4", "A viewer treats you like their therapist. Best boundary?", [
      ["Redirect to professional resources and keep the creator role clear.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Provide clinical advice LIVE.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Share your private number.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Ignore safety and dive deeper alone.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q5", "Criticism triage should ask?", [
      ["Is this actionable, opinion, or an attack—and what rule applies?", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Who has more followers?", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Did gifts drop?", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Can I win the argument?", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q6", "Online negativity is best handled by?", [
      ["Prepared rules for reply, log, mute, or report—not improvisation under adrenaline.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Never moderating.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Reading hate before bed daily.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Deleting your craft entirely on day one.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q7", "This lesson must not become?", [
      ["Therapy or clinical mental health treatment.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["A criticism framework.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["An aftercare card.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Comparison rules.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q8", "Mission success means?", [
      ["Written aftercare, comparison rules, and criticism framework used after a real session.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Zero feelings.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["More arguing.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Higher viewers.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
  ],
});
