/**
 * Battle format labels stored on the event. Only three concepts:
 * - 1v1 (2 creators)
 * - Free-for-all (3–4 creators, every creator for themselves)
 * - 2v2 (4 creators, two teams of two)
 *
 * Themed nights use event type + title on the flyer, not a separate format.
 * Legacy DB values (head-to-head, themed-battle, etc.) normalize for display/layout.
 */
export const FORMAT_OPTIONS_BY_COUNT: Record<number, { value: string; label: string }[]> = {
  2: [{ value: "1v1", label: "1v1" }],
  3: [{ value: "free-for-all", label: "Free-for-all" }],
  4: [
    { value: "free-for-all", label: "Free-for-all" },
    { value: "2v2", label: "2v2" },
  ],
};

export const PARTICIPANT_COUNTS = [2, 3, 4] as const;

/** Map old stored labels to current canonical values. */
export function normalizeFormatToCanonical(formatLabel: string): string {
  const map: Record<string, string> = {
    "head-to-head": "1v1",
    "themed-battle": "1v1",
    "1v2": "free-for-all",
    rotation: "free-for-all",
    "team-battle": "2v2",
  };
  return map[formatLabel] ?? formatLabel;
}

export function isValidFormatForCount(count: number, formatLabel: string): boolean {
  const opts = FORMAT_OPTIONS_BY_COUNT[count];
  if (!opts) return false;
  const canonical = normalizeFormatToCanonical(formatLabel);
  return opts.some((o) => o.value === canonical);
}

/** Human label for badges and calendar (handles legacy rows). */
export function formatLabelToDisplay(formatLabel: string, participantCount: number): string {
  const canonical = normalizeFormatToCanonical(formatLabel);
  const opts = FORMAT_OPTIONS_BY_COUNT[participantCount];
  const found = opts?.find((o) => o.value === canonical);
  return found?.label ?? canonical.replace(/-/g, " ");
}

export const COMMON_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Asia/Tokyo",
  "Australia/Sydney",
] as const;
