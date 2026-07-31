import type { TrainingMission } from "@/lib/resources/training-missions";

/**
 * Extract the required continuous LIVE minutes from mission copy.
 * Prefers explicit "at least N minutes" / "N+ minute" patterns.
 */
export function extractLiveMinutesFromMission(
  mission: Pick<TrainingMission, "mission_steps" | "mission_goal" | "mission_description"> | null | undefined,
): number | null {
  if (!mission) return null;
  const blobs = [
    ...mission.mission_steps,
    mission.mission_goal,
    mission.mission_description,
  ].join("\n");

  const patterns = [
    /at least\s+(\d+)\s*\+?\s*minutes?/gi,
    /(\d+)\+\s*minutes?/gi,
    /minimum\s+(\d+)\s*minutes?/gi,
    /go live for\s+(\d+)\s*minutes?/gi,
    /(\d+)\s*minutes?\s*(?:continuous|minimum|each|total)/gi,
  ];

  let best: number | null = null;
  for (const re of patterns) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(blobs)) !== null) {
      const n = Number(m[1]);
      if (!Number.isFinite(n) || n <= 0) continue;
      if (best === null || n > best) best = n;
    }
  }
  return best;
}

export function formatMinutesLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const rem = minutes % 60;
  if (rem === 0) return h === 1 ? "1 hr" : `${h} hr`;
  return `${h} hr ${rem} min`;
}
