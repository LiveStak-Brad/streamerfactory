import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "preventing-creator-burnout",
  programKey: "wellness",
  title: "Quiz: Preventing Creator Burnout",
  questions: [
    question("q1", "A creator streams twelve hours daily for weeks and feels numb. Best first move?", [
      ["Reduce load using a written recovery plan and early-warning thresholds.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Add more caffeine and keep the streak.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Ignore the numbness until a vacation.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Compare output with larger creators.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q2", "What is a useful burnout early warning?", [
      ["Rising dread before LIVE plus shrinking prep quality.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["One slow income day.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["One critical comment.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["A single late night.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q3", "Compassion fatigue often shows up as what?", [
      ["Numbness toward chat needs you used to handle with care.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Extra excitement for every collab.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Perfect sleep.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Unlimited empathy with no cost.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q4", "How should a recovery week work?", [
      ["Keep a smaller floor, drop optional load, and protect sleep and movement.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Stop all human contact forever.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Only sleep and never plan a return.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Secretly keep the same schedule.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q5", "Decision fatigue is reduced by what?", [
      ["Pre-decided templates, batching, and fewer open loops.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Making every choice live on stream.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Checking analytics hourly.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Taking every collab offer.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q6", "What should never be taught as burnout advice?", [
      ["Working through illness and skipping recovery to protect the streak.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Reducing session length.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Taking a recovery day.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Using a sick-day announcement script.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q7", "Financial instability worsens burnout because?", [
      ["Money panic keeps the nervous system in constant emergency mode.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Taxes are illegal.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Buffers make creators lazy.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Slow months prove failure.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q8", "Mission success here means what?", [
      ["Completed dashboard, recovery plan, and fatigue audit with actions.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["More hours than last week.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Higher gifts.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Zero emotions.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
  ],
});
