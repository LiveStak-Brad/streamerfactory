export type UsernameConfidence = "high" | "medium" | "low";
export type UsernameSource = "username_column" | "at_handle" | "handle_pattern" | "display_name_inferred";

const RESERVED_HANDLE_WORDS =
  /^(level|elite|high|medium|low|none|no|nolevel|view|live|creator|member|network|invited|removed|quit|following|ratio|diamonds?|bonus|gifts?|coins?|day|days|hour|hours|eligible|notable|inactive)$/i;

/** Remove badge/status labels while whitespace still separates tokens. */
export function stripBadgeText(text: string): string {
  return text
    .replace(/\bno\s*level\b/gi, "\n")
    .replace(/\blevel\s*\d+\b/gi, "\n")
    .replace(/\bnotable\b/gi, "\n")
    .replace(/\beligible\b/gi, "\n")
    .replace(/\b(eligible|notable|inactive|invited|removed|following|quit|new|view\s*details?)\b/gi, "\n")
    .replace(/\b(activeness|activity)\s*(incentive|level)?\b/gi, "\n");
}

/** Handles may start with _ or . (e.g. _sahm_251_2) — do not require leading [a-z]. */
const GLUED_SUFFIX_RES = [
  /^([a-z0-9._]{2,38})nolevel$/i,
  /^([a-z0-9._]{2,38})no$/i,
  /^([a-z0-9._]{2,38})level\d*$/i,
  /^([a-z0-9._]{2,38})tier\d+$/i,
  /^([a-z0-9._]{2,38})(eligible|notable|inactive|invited|removed|following|new|quit)$/i,
] as const;

/** Strip suffixes after spaces were removed (e.g. jasmine_wren + No level → jasmine_wrennolevel). */
export function stripGluedBadgeSuffix(compact: string): string {
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

function finalizeHandle(compact: string): string | undefined {
  let t = stripGluedBadgeSuffix(compact.toLowerCase());
  if (!/^[a-z0-9._]{2,40}$/.test(t)) return undefined;
  if (RESERVED_HANDLE_WORDS.test(t)) return undefined;
  if (/^\d+$/.test(t)) return undefined;
  if (!/[a-z]/.test(t)) return undefined;
  if (!/[_.]/.test(t) && !/\d/.test(t) && t.length < 6) return undefined;
  return t;
}

/** Strip badge/status text and return a valid lowercase TikTok handle, or undefined. */
export function cleanTikTokUsername(raw: string | undefined | null): string | undefined {
  if (!raw) return undefined;
  let t = raw.trim().replace(/^@+/, "");
  if (!t) return undefined;

  t = stripBadgeText(t);

  const lines = t
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const compact = lines[i].replace(/\s+/g, "");
    const fromCompact = finalizeHandle(compact);
    if (fromCompact) return fromCompact;
    const leading = lines[i].match(/(@?[_]?[a-z0-9][a-z0-9._]{0,37})/i);
    if (leading) {
      const fromLeading = finalizeHandle(leading[1].replace(/\s+/g, ""));
      if (fromLeading) return fromLeading;
    }
  }

  const wholeLeading = t.match(/(@?[_]?[a-z0-9][a-z0-9._]{0,37})/i);
  if (wholeLeading) {
    const fromLeading = finalizeHandle(wholeLeading[1].replace(/\s+/g, ""));
    if (fromLeading) return fromLeading;
  }

  return finalizeHandle(t.replace(/\s+/g, ""));
}

/** Normalize TikTok username — strip @ and spaces, lowercase, valid chars only. */
export function normalizeTikTokUsername(raw: string | undefined | null): string | undefined {
  return cleanTikTokUsername(raw);
}

const AT_RE = /@([a-z0-9._]{2,40})/gi;
const HANDLE_RE = /(?:^|[^a-z0-9._])(@?[_]?[a-z0-9][a-z0-9._]{0,37})(?=$|[^a-z0-9._])/gi;

function looksLikeTikTokHandle(line: string): boolean {
  const candidate = cleanTikTokUsername(line);
  return Boolean(candidate);
}

function preferHandle(a: string, b: string): string {
  const aScore = Number(/[_.\d]/.test(a)) + Number(a === a.toLowerCase());
  const bScore = Number(/[_.\d]/.test(b)) + Number(b === b.toLowerCase());
  return aScore >= bScore ? a : b;
}

export function inferUsernameFromDisplayName(displayName: string | undefined): string | undefined {
  return cleanTikTokUsername(displayName ?? undefined);
}

/** Pull handle from visible text with confidence/source metadata. */
export function extractUsernameWithConfidence(
  text: string,
  opts?: { fromUsernameColumn?: boolean; displayName?: string },
): { username?: string; confidence: UsernameConfidence; source: UsernameSource } {
  const stripped = stripBadgeText(text.trim().replace(/^@+/, ""));
  const normalizedLines = stripped
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  let bestAt: string | undefined;
  for (const line of normalizedLines) {
    AT_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = AT_RE.exec(line)) !== null) {
      const candidate = cleanTikTokUsername(m[1]);
      if (!candidate) continue;
      bestAt = bestAt ? preferHandle(bestAt, candidate) : candidate;
    }
  }
  if (bestAt) {
    return {
      username: bestAt,
      confidence: opts?.fromUsernameColumn ? "high" : "medium",
      source: opts?.fromUsernameColumn ? "username_column" : "at_handle",
    };
  }

  for (let i = normalizedLines.length - 1; i >= 0; i -= 1) {
    const line = normalizedLines[i];
    const direct = cleanTikTokUsername(line);
    if (direct && looksLikeTikTokHandle(line)) {
      return {
        username: direct,
        confidence: opts?.fromUsernameColumn ? "high" : "medium",
        source: opts?.fromUsernameColumn ? "username_column" : "handle_pattern",
      };
    }
    HANDLE_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = HANDLE_RE.exec(line)) !== null) {
      const candidate = cleanTikTokUsername(m[1]);
      if (!candidate || !looksLikeTikTokHandle(m[1])) continue;
      return {
        username: candidate,
        confidence: opts?.fromUsernameColumn ? "high" : "medium",
        source: opts?.fromUsernameColumn ? "username_column" : "handle_pattern",
      };
    }
  }

  const fallback = inferUsernameFromDisplayName(opts?.displayName);
  if (fallback) {
    return { username: fallback, confidence: "low", source: "display_name_inferred" };
  }

  return { username: undefined, confidence: "low", source: "display_name_inferred" };
}

/** Pull handle from visible text (legacy helper). */
export function extractUsernameFromText(text: string): string | undefined {
  return extractUsernameWithConfidence(text).username;
}

/** True when cleanup changed the handle (for admin review). */
export function usernameCleanupWasSuspicious(raw: string | undefined, cleaned: string | undefined): boolean {
  if (!raw?.trim() || !cleaned) return false;
  const compact = raw.trim().replace(/^@+/, "").replace(/\s+/g, "").toLowerCase();
  if (compact === cleaned) return false;
  return stripGluedBadgeSuffix(compact) === cleaned;
}
