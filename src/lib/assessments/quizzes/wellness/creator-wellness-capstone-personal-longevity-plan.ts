import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "creator-wellness-capstone-personal-longevity-plan",
  programKey: "wellness",
  title: "Quiz: Creator Wellness Capstone: Personal Longevity Plan",
  questions: [
    question("q1", "What is the Capstone graded on?", [
      ["Dated, reviewable longevity systems and a ninety-day improvement plan.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Hours streamed during Capstone week.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Gift totals.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Viewer rank.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q2", "Which evidence belongs in the dossier?", [
      ["Workspace audit, schedule, recovery, boundaries, buffer, habits, reflection, 90-day plan.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Only a motivational quote.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Only a gear receipt.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Only a viral clip.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q3", "Honors Lab relationship to certificate?", [
      ["Optional after certificate; never a gate.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Required to graduate.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Replaces Capstone.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Replaces quizzes.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q4", "A stress test should include?", [
      ["Sick week, slow month, pile-on, and gear failure responses.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Only best-case weeks.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Only gift goals.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Only trend chasing.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q5", "Ninety-day plan quality means?", [
      ["Three or fewer improvements with review dates.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Forty infinite goals.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["No dates.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Only vibes.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q6", "If a Capstone section is missing a dated artifact?", [
      ["Complete the missing lesson artifact before claiming Capstone done.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Write 'TBD forever.'", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Replace it with viewers.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Skip and hope.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q7", "Clinical boundary in Capstone?", [
      ["Name licensed handoffs; do not self-diagnose in the plan.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Diagnose yourself for content.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Ask chat for prescriptions.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Ignore red-flag symptoms.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q8", "Career longevity success looks like?", [
      ["Systems that still run on ordinary weeks ninety days later.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["One heroic grind week.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Sleep deprivation badges.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["No boundaries.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
  ],
});
