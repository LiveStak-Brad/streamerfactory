import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "time-management-and-sustainable-schedules",
  programKey: "wellness",
  title: "Quiz: Time Management & Sustainable Schedules",
  questions: [
    question("q1", "A creator packs seven LIVEs, five collabs, and nightly editing. Best redesign?", [
      ["Set a floor and ceiling, batch work, and protect one recovery day.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Sleep four hours to fit more.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Accept every request.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Delete recovery forever.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q2", "Deep work blocks are for?", [
      ["Prep and creative work that needs focus without chat interruptions.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Checking analytics every minute.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Scrolling competitors.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Answering every DM instantly.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q3", "A recovery day should be?", [
      ["Creator-work off by default with a written re-entry plan.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["A secret half-work day.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Punishment for low gifts.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Optional only after burnout.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q4", "Sleep routines help longevity because?", [
      ["Sleep debt quietly destroys voice, mood, judgment, and consistency.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Sleep is optional for serious creators.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Late-night metrics are more important.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Caffeine replaces sleep permanently.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q5", "Content batching helps by?", [
      ["Concentrating similar work so recovery windows get longer.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Filming twenty formats with no plan.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Never reviewing quality.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Eliminating all LIVE.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q6", "Capacity check means?", [
      ["Asking whether a new yes requires a no somewhere else.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Saying yes to everything.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Ignoring household needs.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Measuring only virality.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q7", "Mission grading should ignore?", [
      ["Hours streamed as a badge of honor.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["A completed weekly energy calendar.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["A real recovery day plan.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["A sleep window.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q8", "Best vacation planning habit?", [
      ["Pre-write audience expectations and protect real offline time.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Stream from the hotel bathroom daily.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Ghost with no plan.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Promise daily posting while traveling sick.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
  ],
});
