/**
 * Guards against chart/UI misreads and bogus auto-imports (e.g. 1.3B "diamonds").
 * Top real monthly backstage totals in this network are ~200k diamonds.
 */
export const MAX_PLAUSIBLE_MONTHLY_DIAMONDS = 1_000_000;

export function isPlausibleImportedDiamonds(value: number | undefined | null): boolean {
  const n = Math.round(Number(value ?? 0));
  return Number.isFinite(n) && n >= 0 && n <= MAX_PLAUSIBLE_MONTHLY_DIAMONDS;
}

/** Returns rounded diamonds, or null when the value should not be stored or summed. */
export function parsePlausibleImportedDiamonds(
  diamonds: number | undefined | null,
  coinsFallback?: number | undefined | null,
): number | null {
  const d = Math.max(0, Math.round(Number(diamonds ?? 0)));
  if (d > 0) return isPlausibleImportedDiamonds(d) ? d : null;
  const c = Math.max(0, Math.round(Number(coinsFallback ?? 0)));
  if (c <= 0) return 0;
  return isPlausibleImportedDiamonds(c) ? c : null;
}
