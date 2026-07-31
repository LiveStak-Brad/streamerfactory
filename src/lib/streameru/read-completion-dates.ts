/**
 * Read LIVE exam completion timestamps from device-local mission storage.
 */

import { STREAMERU_MISSION_DONE_KEY_PREFIX } from "@/lib/resources/recommended-lesson";

export function readMissionCompletionIsoDates(): string[] {
  if (typeof window === "undefined") return [];
  const dates: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(STREAMERU_MISSION_DONE_KEY_PREFIX)) continue;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as { at?: string; missionId?: string };
      if (parsed.missionId && typeof parsed.at === "string") dates.push(parsed.at);
    }
  } catch {
    /* ignore */
  }
  return dates;
}
