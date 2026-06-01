/** Parse compact numbers: 3,665 · 14.1M · 109.8K */
export function parseCompactNumber(raw: string | undefined | null): number | undefined {
  if (!raw) return undefined;
  const t = raw.trim().replace(/,/g, "");
  if (!t) return undefined;

  const m = t.match(/^([+-]?\d+(?:\.\d+)?)\s*([kmb])?$/i);
  if (!m) {
    const digits = t.replace(/[^\d.-]/g, "");
    if (!digits) return undefined;
    const n = Number(digits);
    return Number.isFinite(n) ? Math.round(n) : undefined;
  }

  const base = Number(m[1]);
  if (!Number.isFinite(base)) return undefined;
  const suffix = (m[2] ?? "").toLowerCase();
  let mult = 1;
  if (suffix === "k") mult = 1_000;
  if (suffix === "m") mult = 1_000_000;
  if (suffix === "b") mult = 1_000_000_000;
  return Math.round(base * mult);
}

/** Extract first compact number from mixed text. */
export function firstCompactNumber(text: string): number | undefined {
  const cleaned = text.replace(/,/g, " ");
  const m = cleaned.match(/(\d+(?:\.\d+)?)\s*([kmb])?\b/i);
  if (!m) return undefined;
  return parseCompactNumber(`${m[1]}${m[2] ?? ""}`);
}
