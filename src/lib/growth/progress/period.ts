/**
 * Member-local day / ISO-week period keys for missions and streaks.
 * Pure helpers — safe to import from engines and evaluators (no DB).
 */

export function periodKeyForDate(date: Date, timezone?: string | null): string {
  try {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone || "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return fmt.format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

/**
 * ISO week key derived from the member's local calendar date.
 * Assign + evaluate weekly challenges with the same timezone to avoid
 * UTC boundary drift around Sunday/Monday.
 */
export function weekPeriodKey(date: Date, timezone?: string | null): string {
  const day = periodKeyForDate(date, timezone);
  const d = new Date(`${day}T12:00:00Z`);
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
