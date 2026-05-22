/** Format Diamonds column from Creator performance (e.g. 113466 → "113,466"). */
export function formatDiamondsEarned(count: number): string {
  return new Intl.NumberFormat("en-US").format(Math.max(0, Math.floor(count)));
}

/** Parse backstage Gifts strings like "413.2K", "107.1K", "15.1K". */
export function parseDiamondsLabel(raw: string): number {
  const s = raw.trim().replace(/,/g, "").toUpperCase();
  const m = s.match(/^([\d.]+)\s*([KMB])?$/);
  if (!m) return 0;
  const base = parseFloat(m[1]);
  if (!Number.isFinite(base)) return 0;
  const unit = m[2];
  if (unit === "K") return Math.round(base * 1000);
  if (unit === "M") return Math.round(base * 1_000_000);
  if (unit === "B") return Math.round(base * 1_000_000_000);
  return Math.round(base);
}
