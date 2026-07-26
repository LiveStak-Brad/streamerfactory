/**
 * Guards against chart/UI misreads and bogus auto-imports (e.g. 1.3B "diamonds").
 * Top real monthly backstage totals in this network are ~200k diamonds.
 */
export const MAX_PLAUSIBLE_MONTHLY_DIAMONDS = 1_000_000;

/** Round numbers often scraped from charts — not real per-creator monthly diamonds. */
const CHART_MISREAD_ROUND_DIAMONDS = new Set([10_000, 100_000, 1_000_000]);

export function isPlausibleImportedDiamonds(value: number | undefined | null): boolean {
  const n = Math.round(Number(value ?? 0));
  return Number.isFinite(n) && n >= 0 && n <= MAX_PLAUSIBLE_MONTHLY_DIAMONDS;
}

export function isChartMisreadDiamonds(
  diamonds: number,
  hoursStreamed?: number | null,
  daysStreamed?: number | null,
): boolean {
  const d = Math.round(diamonds);
  if (!CHART_MISREAD_ROUND_DIAMONDS.has(d)) return false;
  const hours = Number(hoursStreamed ?? 0);
  const days = Math.max(0, Math.round(daysStreamed ?? 0));
  return hours < 0.5 && days === 0;
}

/** Per-row check for storing or summing a monthly sync. */
export function isCredibleImportedStatRow(
  diamonds: number,
  hoursStreamed?: number | null,
  daysStreamed?: number | null,
): boolean {
  if (!isPlausibleImportedDiamonds(diamonds)) return false;
  if (isChartMisreadDiamonds(diamonds, hoursStreamed, daysStreamed)) return false;
  return true;
}

/** Returns rounded diamonds, or null when the value should not be stored or summed. */
export function parsePlausibleImportedDiamonds(
  diamonds: number | undefined | null,
  coinsFallback?: number | undefined | null,
  hoursStreamed?: number | null,
  daysStreamed?: number | null,
): number | null {
  const d = Math.max(0, Math.round(Number(diamonds ?? 0)));
  if (d > 0) {
    return isCredibleImportedStatRow(d, hoursStreamed, daysStreamed) ? d : null;
  }
  const c = Math.max(0, Math.round(Number(coinsFallback ?? 0)));
  if (c <= 0) return 0;
  return isCredibleImportedStatRow(c, hoursStreamed, daysStreamed) ? c : null;
}
