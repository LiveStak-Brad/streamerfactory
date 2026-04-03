/**
 * Shared mission step blocks — every class session requires a real LIVE + pre-live ritual.
 */

export const PRE_LIVE_STANDARD = [
  "Post a short video announcing your LIVE (time + topic).",
  "Use relevant hashtags on that post and in your LIVE title or description.",
  "Share the announcement to your story.",
] as const;

export function liveSessionStep(minMinutes: number): string {
  return `Go live for at least ${minMinutes} minutes in one continuous session (required).`;
}

export const BEHAVIOR_STANDARD = [
  "Talk continuously — silence loses the room; engage viewers when chat appears.",
  "Apply one technique from this lesson deliberately and note what changed.",
] as const;

export function habitDailyByStage(stage: "early" | "mid" | "late"): string {
  switch (stage) {
    case "early":
      return "By this stage, aim for at least one LIVE per day when possible — build the habit before you optimize.";
    case "mid":
      return "By this stage, you should be going live daily; aim for 60–120 minutes total per day across one or two sessions.";
    case "late":
      return "At this stage, treat LIVE like a job block: prioritize 1–2+ hours total daily as your capacity allows.";
    default:
      return "";
  }
}
