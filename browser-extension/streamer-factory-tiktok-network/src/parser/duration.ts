/** Backstage incentive cells use actual / target (e.g. 0d / 30d, 2h 32m / 20h). */
export function progressActualSegment(raw: string): string {
  const t = raw.trim();
  const slash = t.search(/\s*[\/／]\s*/);
  if (slash === -1) return t.replace(/\(level\s*\d+\)/gi, "").trim();
  return t
    .slice(0, slash)
    .replace(/\(level\s*\d+\)/gi, "")
    .trim();
}

/** Valid go LIVE days — actual count before the slash, not the monthly/weekly target. */
export function parseLiveDaysFromCell(raw: string | undefined | null): number | undefined {
  if (!raw) return undefined;

  const progress = raw.match(/(\d+)\s*d(?:ays?)?\s*[\/／]\s*(\d+)\s*d(?:ays?)?/i);
  if (progress) return Number(progress[1]);

  const segment = progressActualSegment(raw);
  const dayMatch = segment.match(/(\d+)\s*d(?:ays?)?/i);
  if (dayMatch) {
    const n = Number(dayMatch[1]);
    if (n >= 30) return 0;
    return n;
  }
  if (/^\d+$/.test(segment)) {
    const n = Number(segment);
    return n >= 30 ? 0 : n;
  }
  if (!raw.includes("/") && !raw.includes("／")) {
    const m = raw.trim().match(/(\d+)\s*d(?:ays?)?/i);
    if (m) {
      const n = Number(m[1]);
      return n >= 30 ? 0 : n;
    }
    const compact = parseCompactNumber(raw);
    if (compact !== undefined && compact <= 7) return compact;
    if (compact !== undefined && compact > 7) return 0;
    return undefined;
  }
  return undefined;
}

/** Stream duration in hours — actual time before the slash, not the 20h target. */
export function parseStreamHoursFromCell(raw: string | undefined | null): number | undefined {
  if (!raw) return undefined;
  const segment = progressActualSegment(raw);
  if (!segment) {
    if (/^0\s*h/i.test(raw.trim())) return 0;
    return undefined;
  }
  const seconds = parseDurationToSeconds(segment);
  if (seconds !== undefined) return Math.round((seconds / 3600) * 10) / 10;
  if (/^0\s*h/i.test(segment)) return 0;
  if (/^\d+(?:\.\d+)?\s*h/i.test(segment)) {
    const h = Number(segment.match(/^(\d+(?:\.\d+)?)/)?.[1]);
    if (Number.isFinite(h)) return h;
  }
  return undefined;
}

/** Parse durations like 1h 5m 48s, 90h, 2d 3h into seconds. */
export function parseDurationToSeconds(raw: string | undefined | null): number | undefined {
  if (!raw) return undefined;
  const t = progressActualSegment(raw).toLowerCase();
  if (!t) return undefined;

  let total = 0;
  let matched = false;

  const dayMatch = t.match(/(\d+(?:\.\d+)?)\s*d(?:ays?)?/);
  if (dayMatch) {
    total += Number(dayMatch[1]) * 86400;
    matched = true;
  }

  const hourMatch = t.match(/(\d+(?:\.\d+)?)\s*h(?:ours?|rs?)?/);
  if (hourMatch) {
    total += Number(hourMatch[1]) * 3600;
    matched = true;
  } else if (/^\d+(?:\.\d+)?\s*h?$/.test(t) && t.includes("h")) {
    const n = Number(t.replace(/h/g, ""));
    if (Number.isFinite(n)) {
      total += n * 3600;
      matched = true;
    }
  }

  const minMatch = t.match(/(\d+(?:\.\d+)?)\s*m(?:in(?:ute)?s?)?/);
  if (minMatch) {
    total += Number(minMatch[1]) * 60;
    matched = true;
  }

  const secMatch = t.match(/(\d+(?:\.\d+)?)\s*s(?:ec(?:ond)?s?)?/);
  if (secMatch) {
    total += Number(secMatch[1]);
    matched = true;
  }

  if (!matched) {
    const plainHours = t.match(/^(\d+(?:\.\d+)?)$/);
    if (plainHours && t.length <= 6) {
      return Math.round(Number(plainHours[1]) * 3600);
    }
    return undefined;
  }

  return Math.round(total);
}

import { parseCompactNumber } from "./numbers";

/** Parse "21d" or "17d" live day counts from backstage (simple cells only). */
export function parseDayCount(raw: string | undefined | null): number | undefined {
  if (!raw) return undefined;
  if (raw.includes("/") || raw.includes("／")) return parseLiveDaysFromCell(raw);
  const m = raw.trim().match(/(\d+)\s*d(?:ays?)?/i);
  if (m) return Number(m[1]);
  const compact = parseCompactNumber(raw);
  if (compact !== undefined && compact >= 30) return 0;
  if (compact !== undefined && compact <= 31) return compact;
  return undefined;
}
