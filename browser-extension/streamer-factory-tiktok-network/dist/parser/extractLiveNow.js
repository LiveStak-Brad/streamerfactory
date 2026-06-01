import { firstCompactNumber } from "./numbers";
import { extractUsernameWithConfidence, normalizeTikTokUsername } from "./username";
function liveCardElements(doc) {
    const selectors = [
        "table tbody tr",
        '[role="row"]',
        '[class*="live"][class*="card"]',
        '[class*="Live"][class*="Card"]',
        '[class*="live"][class*="item"]',
        '[class*="Live"][class*="Item"]',
        "li",
    ];
    const found = new Set();
    for (const sel of selectors) {
        for (const el of Array.from(doc.querySelectorAll(sel))) {
            const text = (el.textContent ?? "").toLowerCase();
            if (text.includes("live") ||
                text.includes("@") ||
                el.querySelector("img[src]") ||
                /\d+\s*viewer/i.test(text)) {
                if ((el.textContent?.length ?? 0) > 8 && (el.textContent?.length ?? 0) < 600) {
                    found.add(el);
                }
            }
        }
    }
    return [...found];
}
function avatarFrom(el) {
    const img = el.querySelector("img[src]");
    const src = img?.getAttribute("src");
    if (src && !src.startsWith("data:"))
        return src;
    return undefined;
}
function parseLiveCard(el) {
    const text = (el.textContent ?? "").trim();
    if (!text)
        return null;
    const usernameCandidate = extractUsernameWithConfidence(text, {
        fromUsernameColumn: true,
        displayName: undefined,
    });
    const username = usernameCandidate.username;
    if (!username)
        return null;
    const lines = text
        .split(/\n/)
        .map((l) => l.trim())
        .filter(Boolean);
    let streamTitle;
    let viewerCountText;
    let liveStartedText;
    let displayName;
    for (const line of lines) {
        const lower = line.toLowerCase();
        if (!viewerCountText && (lower.includes("viewer") || lower.includes("watching"))) {
            viewerCountText = line;
        }
        else if (!liveStartedText &&
            (lower.includes("started") ||
                lower.includes("duration") ||
                /^live\s+\d+/i.test(line) ||
                /started\s+\d+\s*h/i.test(line) ||
                /started\s+\d+\s*m/i.test(line) ||
                /\blive\s+\d+\s*h/i.test(line) ||
                /\blive\s+\d+\s*m/i.test(line))) {
            liveStartedText = line;
        }
        else if (!streamTitle &&
            line !== username &&
            !line.includes("@") &&
            line.length > 3 &&
            line.length < 100 &&
            !/^\d+$/.test(line)) {
            if (!displayName && !lower.includes("live"))
                displayName = line;
            else if (!streamTitle)
                streamTitle = line;
        }
    }
    if (!displayName) {
        displayName = lines.find((l) => l !== username && !l.startsWith("@") && l.length < 60);
    }
    const viewerNum = firstCompactNumber(viewerCountText ?? text);
    if (viewerNum !== undefined && !viewerCountText) {
        viewerCountText = `${viewerNum} viewers`;
    }
    const liveBadgeDetected = /\blive\b/i.test(text) || Boolean(el.querySelector('[class*="live"], [class*="Live"], [aria-label*="live" i]'));
    return {
        tiktokUsername: username,
        usernameConfidence: usernameCandidate.confidence,
        usernameSource: usernameCandidate.source,
        displayName,
        avatarUrl: avatarFrom(el),
        streamTitle,
        viewerCountText,
        liveStartedText,
        liveBadgeDetected,
        rawTextPreview: text.slice(0, 180),
    };
}
function dedupeLive(rows) {
    const seen = new Set();
    const out = [];
    for (const r of rows) {
        const key = normalizeTikTokUsername(r.tiktokUsername) ?? "";
        if (!key || seen.has(key))
            continue;
        seen.add(key);
        out.push(r);
    }
    return out;
}
/** Extract visible LIVE now creators from backstage page DOM. */
export function extractLiveNowRowsFromPage(doc = document) {
    const cards = liveCardElements(doc);
    const rows = [];
    for (const el of cards) {
        const parsed = parseLiveCard(el);
        if (parsed)
            rows.push(parsed);
    }
    return dedupeLive(rows);
}
