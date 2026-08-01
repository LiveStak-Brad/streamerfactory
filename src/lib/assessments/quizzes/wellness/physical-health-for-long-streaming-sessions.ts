import { lessonQuiz, question } from "@/lib/assessments/build";

export const quiz = lessonQuiz({
  lessonSlug: "physical-health-for-long-streaming-sessions",
  programKey: "wellness",
  title: "Quiz: Physical Health for Long Streaming Sessions",
  questions: [
    question("q1", "Wrist pain appears after long mouse use. Best response?", [
      ["Adjust for neutral wrists, reduce repetition, add breaks, and seek clinical care if pain persists.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Ignore it and stream longer.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Tape the wrist and increase intensity.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Buy the most expensive chair without adjusting posture.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q2", "Where should the top of the monitor roughly sit?", [
      ["At or slightly below eye level, about an arm's length away.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Far above the head to look cinematic.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["In your lap.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Behind you.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q3", "Best voice care habit before a long LIVE?", [
      ["Warm up gently, hydrate, and plan mid-session vocal breaks.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Scream cold to 'open up.'", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Skip water to avoid bathroom breaks.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Whisper the whole show.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q4", "What helps eye strain during long sessions?", [
      ["Regular distance focus breaks and readable screen positioning.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Bright unshaded glare all day.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["No blinks.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Sitting six inches from the screen.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q5", "Hydration for voice work should prioritize?", [
      ["Steady room-temperature water across the day.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Only iced drinks right before going LIVE.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Only energy drinks.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["No fluids until the stream ends.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q6", "A standing desk is most useful when?", [
      ["Used in planned intervals with still-neutral posture.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Used as punishment for low gifts.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Used twelve hours without movement variety.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Used instead of any chair forever.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q7", "This lesson's medical boundary is what?", [
      ["General education only; persistent pain or injury needs a licensed clinician.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["Diagnosing carpal tunnel on stream.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["Prescribing medication.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["Claiming stretches cure all injuries.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
    question("q8", "Mission evidence should include?", [
      ["Workstation adjustments, voice checklist, and stretch/hydration routine with dates.", true, "Correct — that choice protects a sustainable creator career with reviewable habits."],
      ["A viewer count screenshot.", false, "Wrong — that choice favors grind, denial, or unreviewable outcomes over longevity."],
      ["A gift total.", false, "Wrong — wellness mastery is graded on implementation evidence, not vanity metrics."],
      ["A claim that you feel fine.", false, "Wrong — protect recovery, boundaries, and ordinary-week capacity."],
    ]),
  ],
});
