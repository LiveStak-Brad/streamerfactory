/** Parse durations like 1h 5m 48s, 90h, 2d 3h into seconds. */
export function parseDurationToSeconds(raw: string | undefined | null): number | undefined {
  if (!raw) return undefined;
  const t = raw.trim().toLowerCase();
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

/** Parse "21d" or "17d" live day counts from backstage. */
export function parseDayCount(raw: string | undefined | null): number | undefined {
  if (!raw) return undefined;
  const m = raw.trim().match(/(\d+)\s*d(?:ays?)?/i);
  if (m) return Number(m[1]);
  return parseCompactNumber(raw);
}
