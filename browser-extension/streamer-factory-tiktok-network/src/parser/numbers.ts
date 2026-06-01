/** Normalize thousands separators (comma, narrow space, regular space between digits). */
export function normalizeNumericText(raw: string): string {
  return raw
    .trim()
    .replace(/[\u00a0\u202f]/g, " ")
    .replace(/,/g, "")
    .replace(/(\d)\s+(?=\d)/g, "$1");
}

/** Parse compact numbers: 3,665 · 8 729 · 14.1M · 109.8K */
export function parseCompactNumber(raw: string | undefined | null): number | undefined {
  if (!raw) return undefined;
  const t = normalizeNumericText(raw);
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

/** Cell looks like a lone formatted number (not label + number). */
function isPlainFormattedNumber(text: string): boolean {
  return /^[\s$€£+-]*[\d,.\s]+[kmb]?$/i.test(text.trim());
}

/**
 * Extract the best number from mixed text (e.g. "8,729", "$3,665", "Gifts 413.2K").
 * Strips thousands separators before matching so "8,729" → 8729, not 8.
 */
export function firstCompactNumber(text: string): number | undefined {
  const trimmed = text.trim();
  if (!trimmed) return undefined;

  if (isPlainFormattedNumber(trimmed)) {
    const direct = parseCompactNumber(trimmed);
    if (direct !== undefined) return direct;
  }

  const noCommas = trimmed.replace(/,/g, "");
  const m = noCommas.match(/(\d+(?:\.\d+)?)\s*([kmb])?\b/i);
  if (!m) return undefined;
  return parseCompactNumber(`${m[1]}${m[2] ?? ""}`);
}

/** Day/duration/level cells must not be treated as diamond counts (e.g. "1d / 8d", "Level 1"). */
export function isNonDiamondStatCell(cell: string): boolean {
  const t = cell.trim();
  if (!t) return true;
  if (/^\d+\s*%$/.test(t) || /^\$?0\.00$/.test(t)) return true;
  if (/^\$[\d,.]+$/.test(t)) return true;
  if (/^\blevel\s*\d/i.test(t)) return true;
  if (/^\d+\s*h(?:\s*\d*m)?/i.test(t) || /^\d+h\s*\/\s*\d+h/i.test(t)) return true;
  if (/^\d+\s*d(?:ays?)?/i.test(t) && !/\d,\d{3}/.test(t)) return true;
  return false;
}

/** Cell is only a stat number (8720, 8,729, 413.2K) — common for Diamonds column in DOM. */
export function isNumericStatCell(cell: string): boolean {
  const t = cell.trim();
  if (!t || isNonDiamondStatCell(t)) return false;
  return /^[\d,.\s]+[kmb]?$/i.test(t) && /\d/.test(t);
}

/** Parse a numeric stat from a table cell; skips day/duration/level patterns. */
export function parseStatNumber(cell: string): number | undefined {
  if (isNonDiamondStatCell(cell)) return undefined;
  return parseCompactNumber(cell) ?? firstCompactNumber(cell);
}
