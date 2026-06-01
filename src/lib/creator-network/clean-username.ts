/**
 * Server-side username cleanup (mirrors extension parser rules).
 */

const RESERVED =
  /^(level|elite|high|medium|low|none|no|nolevel|view|live|creator|member|network|invited|removed|quit|following|ratio|diamonds?|bonus|gifts?|coins?|day|days|hour|hours|eligible|notable|inactive)$/i;

const GLUED_SUFFIX_RES = [
  /^([a-z0-9._]{2,38})nolevel$/i,
  /^([a-z0-9._]{2,38})no$/i,
  /^([a-z0-9._]{2,38})level\d*$/i,
  /^([a-z0-9._]{2,38})(eligible|notable|inactive|invited|removed|following|new|quit)$/i,
] as const;

export function stripBadgeText(text: string): string {
  return text
    .replace(/\bno\s*level\b/gi, "\n")
    .replace(/\blevel\s*\d+\b/gi, "\n")
    .replace(/\bnotable\b/gi, "\n")
    .replace(/\beligible\b/gi, "\n")
    .replace(/\b(eligible|notable|inactive|invited|removed|following|quit|new|view\s*details?)\b/gi, "\n");
}

function stripGluedBadgeSuffix(compact: string): string {
  let t = compact;
  for (const re of GLUED_SUFFIX_RES) {
    const m = t.match(re);
    if (m) {
      t = m[1];
      break;
    }
  }
  return t;
}

export function cleanCreatorNetworkUsername(raw: string | undefined | null): string | undefined {
  if (!raw) return undefined;
  let t = stripBadgeText(raw.trim().replace(/^@+/, ""));
  const leading = t.match(/(@?[_]?[a-z0-9][a-z0-9._]{0,37})/i);
  t = (leading?.[1] ?? t).replace(/\s+/g, "").toLowerCase();
  t = stripGluedBadgeSuffix(t);

  if (!/^[a-z0-9._]{2,40}$/.test(t)) return undefined;
  if (RESERVED.test(t)) return undefined;
  if (/^\d+$/.test(t)) return undefined;
  if (!/[a-z]/.test(t)) return undefined;
  if (!/[_.]/.test(t) && !/\d/.test(t) && t.length < 6) return undefined;
  return t;
}

const BAD_DISPLAY =
  /^(no\s*level|level\s*\d+|eligible|notable|inactive|none|unknown|creator|member)$/i;

/** Strip badge text from Backstage display names (e.g. "Name No level" → use fallback). */
export function cleanCreatorNetworkDisplayName(
  raw: string | undefined | null,
  fallback?: string,
): string {
  if (!raw?.trim()) return fallback?.trim() || "";
  const lines = stripBadgeText(raw.trim())
    .split(/\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !BAD_DISPLAY.test(l));
  const first = lines[0];
  if (!first || BAD_DISPLAY.test(first)) return fallback?.trim() || "";
  return first;
}

export function usernameCleanupWasSuspicious(raw: string | undefined, cleaned: string | undefined): boolean {
  if (!raw?.trim() || !cleaned) return false;
  const compact = raw.trim().replace(/^@+/, "").replace(/\s+/g, "").toLowerCase();
  if (compact === cleaned) return false;
  return stripGluedBadgeSuffix(compact) === cleaned;
}
