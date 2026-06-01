/** Normalize TikTok username — strip @ and spaces, keep valid TikTok chars. */
export function normalizeTikTokUsername(raw) {
    if (!raw)
        return undefined;
    const t = raw.trim().replace(/^@+/, "").replace(/\s+/g, "");
    if (!/^[a-zA-Z0-9._]{2,40}$/.test(t))
        return undefined;
    if (!t)
        return undefined;
    return t;
}
const AT_RE = /@([a-zA-Z0-9._]{2,40})/g;
const HANDLE_RE = /\b([a-zA-Z0-9._]{2,40})\b/g;
function looksLikeTikTokHandle(line) {
    if (!/^[a-zA-Z0-9._]{2,40}$/.test(line))
        return false;
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(line))
        return false;
    if (/^(invited|removed|quit|following|creator|member|network|live|viewers?)$/i.test(line))
        return false;
    return line === line.toLowerCase() || /[_.\d]/.test(line);
}
function preferHandle(a, b) {
    const aScore = Number(/[_.\d]/.test(a)) + Number(a === a.toLowerCase());
    const bScore = Number(/[_.\d]/.test(b)) + Number(b === b.toLowerCase());
    return aScore >= bScore ? a : b;
}
export function inferUsernameFromDisplayName(displayName) {
    const normalized = normalizeTikTokUsername(displayName ?? undefined);
    if (!normalized)
        return undefined;
    return normalized;
}
/** Pull handle from visible text with confidence/source metadata. */
export function extractUsernameWithConfidence(text, opts) {
    const normalizedLines = text
        .split(/\n/)
        .map((l) => l.trim())
        .filter(Boolean);
    let bestAt;
    for (const line of normalizedLines) {
        AT_RE.lastIndex = 0;
        let m;
        while ((m = AT_RE.exec(line)) !== null) {
            const candidate = normalizeTikTokUsername(m[1]);
            if (!candidate)
                continue;
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
    let bestPattern;
    for (let i = normalizedLines.length - 1; i >= 0; i -= 1) {
        const line = normalizedLines[i];
        if (looksLikeTikTokHandle(line)) {
            const candidate = normalizeTikTokUsername(line);
            if (candidate) {
                bestPattern = bestPattern ? preferHandle(bestPattern, candidate) : candidate;
            }
            continue;
        }
        HANDLE_RE.lastIndex = 0;
        let m;
        while ((m = HANDLE_RE.exec(line)) !== null) {
            const candidate = normalizeTikTokUsername(m[1]);
            if (!candidate || !looksLikeTikTokHandle(candidate))
                continue;
            bestPattern = bestPattern ? preferHandle(bestPattern, candidate) : candidate;
        }
    }
    if (bestPattern) {
        return {
            username: bestPattern,
            confidence: opts?.fromUsernameColumn ? "high" : "medium",
            source: opts?.fromUsernameColumn ? "username_column" : "handle_pattern",
        };
    }
    const fallback = inferUsernameFromDisplayName(opts?.displayName);
    if (fallback) {
        return { username: fallback, confidence: "low", source: "display_name_inferred" };
    }
    return { username: undefined, confidence: "low", source: "display_name_inferred" };
}
/** Pull handle from visible text (legacy helper). */
export function extractUsernameFromText(text) {
    return extractUsernameWithConfidence(text).username;
}
