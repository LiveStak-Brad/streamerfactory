import { parseDayCount, parseDurationToSeconds } from "./duration";
import { firstCompactNumber, parseCompactNumber } from "./numbers";
import { extractUsernameFromText, extractUsernameWithConfidence, normalizeTikTokUsername } from "./username";
function rowLikeElements(doc) {
    const fromTable = Array.from(doc.querySelectorAll("table tbody tr"));
    if (fromTable.length > 0)
        return fromTable;
    const gridRows = Array.from(doc.querySelectorAll('[role="row"]')).filter((el) => !el.querySelector('[role="columnheader"]'));
    if (gridRows.length > 0)
        return gridRows;
    const semiRows = Array.from(doc.querySelectorAll('[class*="table"] [class*="row"], [class*="Table"] [class*="Row"]'));
    if (semiRows.length > 1)
        return semiRows;
    return Array.from(doc.querySelectorAll("li, [class*='list-item'], [class*='ListItem']")).filter((el) => (el.textContent?.length ?? 0) > 10 && (el.textContent?.length ?? 0) < 500);
}
function cellTexts(row) {
    const cells = Array.from(row.querySelectorAll("td, [role='cell'], [class*='cell'], [class*='Cell']"));
    if (cells.length > 0) {
        return cells.map((c) => (c.textContent ?? "").trim()).filter(Boolean);
    }
    return (row.textContent ?? "")
        .split(/\n/)
        .map((s) => s.trim())
        .filter(Boolean);
}
function tableCells(row) {
    return Array.from(row.querySelectorAll("td, [role='cell'], [class*='cell'], [class*='Cell']"));
}
function headerTextsForTable(row) {
    const table = row.closest("table");
    if (!table)
        return [];
    const headers = Array.from(table.querySelectorAll("thead th, thead td, [role='columnheader']"));
    return headers.map((h) => (h.textContent ?? "").trim().toLowerCase()).filter(Boolean);
}
function avatarFromRow(row) {
    const img = row.querySelector("img[src]");
    const src = img?.getAttribute("src") ?? undefined;
    if (src && !src.startsWith("data:"))
        return src;
    return undefined;
}
function displayNameFromRow(row, username) {
    const imgs = Array.from(row.querySelectorAll("img[alt]"));
    for (const img of imgs) {
        const alt = img.getAttribute("alt")?.trim();
        if (alt && alt.length > 1 && alt.toLowerCase() !== username?.toLowerCase())
            return alt;
    }
    const cells = cellTexts(row);
    for (const cell of cells) {
        const u = extractUsernameFromText(cell);
        const withoutUser = u ? cell.replace(`@${u}`, "").replace(u, "").trim() : cell;
        if (withoutUser.length > 1 && withoutUser.length < 80)
            return withoutUser;
    }
    return undefined;
}
function parseActiveness(text) {
    const t = text.toLowerCase();
    if (/\belite\b/.test(t))
        return "elite";
    if (/\bhigh\b|\bactive\b/.test(t))
        return "high";
    if (/\bmedium\b|\bmed\b/.test(t))
        return "medium";
    if (/\blow\b/.test(t))
        return "low";
    if (/\bnone\b|\bunknown\b/.test(t))
        return "none";
    return undefined;
}
function parseRelationshipRow(row, tabStatus) {
    const cells = cellTexts(row);
    const cellEls = tableCells(row);
    if (cells.length === 0)
        return null;
    const joined = cells.join("\n");
    const creatorColumn = cellEls[0] ? (cellEls[0].textContent ?? "").trim() : cells[0] ?? joined;
    const usernameCandidate = extractUsernameWithConfidence(creatorColumn, {
        fromUsernameColumn: true,
        displayName: displayNameFromRow(row),
    });
    const username = usernameCandidate.username;
    if (!username)
        return null;
    const dateCell = cells.find((c) => /\d{1,2}\/\d{1,2}\/\d{4}/.test(c));
    const reasonCell = cells.length >= 3 ? cells[cells.length - 1] : undefined;
    return {
        tiktokUsername: username,
        usernameConfidence: usernameCandidate.confidence,
        usernameSource: usernameCandidate.source,
        displayName: displayNameFromRow(row, username),
        avatarUrl: avatarFromRow(row),
        creatorNetworkStatus: tabStatus,
        inviteStatus: tabStatus,
        relationshipRequestDate: dateCell,
        relationshipReason: reasonCell && reasonCell !== dateCell ? reasonCell : undefined,
        rawTextPreview: joined.replace(/\s+/g, " ").slice(0, 180),
    };
}
function inferColumnMap(headers) {
    const map = {};
    headers.forEach((h, idx) => {
        if (/(creator|username|handle)/i.test(h))
            map.creator = idx;
        if (/(gifts?|diamonds?|coins?)/i.test(h))
            map.coins = idx;
        if (/(engagements?|interactions?|activity)/i.test(h))
            map.engagements = idx;
        if (/(valid.*live.*days?|days? streamed|live days)/i.test(h))
            map.days = idx;
        if (/(stream duration|hours?|live duration)/i.test(h))
            map.hours = idx;
        if (/(activeness|activity level|active level)/i.test(h))
            map.activeness = idx;
    });
    return map;
}
function parseStatsRow(row) {
    const cells = cellTexts(row);
    const cellEls = tableCells(row);
    if (cells.length === 0)
        return null;
    const headers = headerTextsForTable(row);
    const columnMap = inferColumnMap(headers);
    const creatorText = columnMap.creator !== undefined
        ? (cellEls[columnMap.creator]?.textContent ?? cells[columnMap.creator] ?? "")
        : (cellEls[0]?.textContent ?? cells[0] ?? "");
    const usernameCandidate = extractUsernameWithConfidence(creatorText, {
        fromUsernameColumn: columnMap.creator !== undefined,
        displayName: displayNameFromRow(row),
    });
    const username = usernameCandidate.username;
    if (!username)
        return null;
    const joined = cells.join("\n");
    let coins;
    let diamonds;
    let days;
    let hours;
    let engagements;
    let activeness;
    let liveDurationText;
    let liveDurationSeconds;
    let riskFlag;
    if (columnMap.coins !== undefined && cells[columnMap.coins]) {
        const n = firstCompactNumber(cells[columnMap.coins]);
        if (n !== undefined) {
            coins = n;
            diamonds = n;
        }
    }
    if (columnMap.engagements !== undefined && cells[columnMap.engagements]) {
        engagements = parseCompactNumber(cells[columnMap.engagements]) ?? firstCompactNumber(cells[columnMap.engagements]);
    }
    if (columnMap.days !== undefined && cells[columnMap.days]) {
        days = parseDayCount(cells[columnMap.days]) ?? firstCompactNumber(cells[columnMap.days]);
    }
    if (columnMap.hours !== undefined && cells[columnMap.hours]) {
        const seconds = parseDurationToSeconds(cells[columnMap.hours]);
        if (seconds !== undefined) {
            hours = seconds / 3600;
            liveDurationText = cells[columnMap.hours];
            liveDurationSeconds = seconds;
        }
        else {
            hours = firstCompactNumber(cells[columnMap.hours]);
        }
    }
    if (columnMap.activeness !== undefined && cells[columnMap.activeness]) {
        activeness = parseActiveness(cells[columnMap.activeness]);
    }
    for (const cell of cells) {
        const lower = cell.toLowerCase();
        if (!diamonds && (lower.includes("gift") || lower.includes("diamond"))) {
            diamonds = firstCompactNumber(cell);
            coins = diamonds;
        }
        if (!coins && (lower.includes("coin") || /^\d/.test(cell))) {
            const n = firstCompactNumber(cell);
            if (n !== undefined && n > 0)
                coins = n;
        }
        if (!days && (lower.includes("live day") || lower.includes("go live") || /\d+\s*d\b/i.test(cell))) {
            days = parseDayCount(cell) ?? firstCompactNumber(cell);
        }
        if (!hours && (lower.includes("hour") || /\d+h\b/i.test(cell) || /\d+\s*h\s*\d*m/i.test(cell))) {
            hours = parseDurationToSeconds(cell);
            if (hours !== undefined)
                hours = hours / 3600;
            else {
                const h = firstCompactNumber(cell);
                if (h !== undefined)
                    hours = h;
            }
            liveDurationText = cell;
            liveDurationSeconds = parseDurationToSeconds(cell);
        }
        if (engagements === undefined &&
            (lower.includes("engagement") ||
                lower.includes("interaction") ||
                lower.includes("activity") ||
                lower.includes("comment") ||
                lower.includes("like"))) {
            engagements = firstCompactNumber(cell);
        }
        if (!activeness)
            activeness = parseActiveness(cell);
        if (!riskFlag && (lower.includes("risk") || lower.includes("violation") || lower.includes("warning"))) {
            riskFlag = cell.slice(0, 120);
        }
    }
    if (coins === undefined)
        coins = firstCompactNumber(joined);
    if (diamonds === undefined)
        diamonds = coins;
    return {
        tiktokUsername: username,
        usernameConfidence: usernameCandidate.confidence,
        usernameSource: usernameCandidate.source,
        displayName: displayNameFromRow(row, username),
        avatarUrl: avatarFromRow(row),
        coinsEarned: coins,
        diamondsEarned: diamonds,
        engagements,
        daysStreamed: days,
        hoursStreamed: hours,
        liveDurationText,
        liveDurationSeconds,
        activenessLevel: activeness,
        riskFlag,
        rawTextPreview: joined.replace(/\s+/g, " ").slice(0, 180),
    };
}
function dedupeRows(rows) {
    const seen = new Set();
    const out = [];
    for (const r of rows) {
        const key = normalizeTikTokUsername(r.tiktokUsername) ?? r.rawTextPreview ?? "";
        if (!key || seen.has(key))
            continue;
        seen.add(key);
        out.push(r);
    }
    return out;
}
/** Extract creator rows from visible tables/cards on backstage pages. */
export function extractCreatorRowsFromPage(doc, pageType, relationshipTab) {
    const rowEls = rowLikeElements(doc);
    const rows = [];
    for (const el of rowEls) {
        if (pageType === "manage_relationship") {
            const parsed = parseRelationshipRow(el, relationshipTab);
            if (parsed)
                rows.push(parsed);
        }
        else if (pageType === "creator_stats" || pageType === "unknown") {
            const parsed = parseStatsRow(el);
            if (parsed)
                rows.push(parsed);
        }
    }
    return dedupeRows(rows);
}
export { parseCompactNumber, parseDurationToSeconds, normalizeTikTokUsername };
