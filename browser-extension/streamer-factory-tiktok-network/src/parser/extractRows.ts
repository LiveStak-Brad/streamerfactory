import { parseDurationToSeconds, parseLiveDaysFromCell, parseStreamHoursFromCell } from "./duration";
import {
  dataRowsInContainer,
  diamondsFromRowGrid,
  findCreatorContributionGrid,
  pickLargestDiamondLikeValue,
  readCellText,
  readStatCellText,
  splitCellLines,
  statTextFromRowColumn,
} from "./gridTable";
import { firstCompactNumber, isNonDiamondStatCell, parseCompactNumber, parseStatNumber } from "./numbers";
import type { DetectedPageType, ParsedCreatorRow } from "./types";
import { avatarFromRow } from "./avatar";
import { extractUsernameFromText, extractUsernameWithConfidence, normalizeTikTokUsername } from "./username";

function rowLikeElements(doc: Document): Element[] {
  const contributionGrid = findCreatorContributionGrid(doc);
  if (contributionGrid) {
    const rows = dataRowsInContainer(contributionGrid);
    if (rows.length > 0) return rows;
  }

  const gridRows = Array.from(doc.querySelectorAll('[role="row"]')).filter(
    (el) =>
      !el.querySelector('[role="columnheader"]') &&
      (el.querySelector('[role="cell"]') || el.querySelector("td")) &&
      (el.textContent?.length ?? 0) > 15,
  );
  const fromTable = Array.from(doc.querySelectorAll("table tbody tr")).filter(
    (tr) => (tr.textContent?.length ?? 0) > 15,
  );

  if (gridRows.length >= Math.max(fromTable.length, 1)) return gridRows;
  if (fromTable.length > 0) return fromTable;

  const semiRows = Array.from(
    doc.querySelectorAll('[class*="table"] [class*="row"], [class*="Table"] [class*="Row"]'),
  );
  if (semiRows.length > 1) return semiRows;

  return Array.from(doc.querySelectorAll("li, [class*='list-item'], [class*='ListItem']")).filter(
    (el) => (el.textContent?.length ?? 0) > 10 && (el.textContent?.length ?? 0) < 500,
  );
}

function cellTexts(row: Element): string[] {
  const cells = Array.from(row.querySelectorAll("td, [role='cell'], [class*='cell'], [class*='Cell']"));
  if (cells.length > 0) {
    const lines: string[] = [];
    for (const cell of cells) {
      lines.push(...splitCellLines(readCellText(cell)));
    }
    return lines;
  }
  return splitCellLines((row.textContent ?? "").trim());
}

function tableCells(row: Element): Element[] {
  return Array.from(row.querySelectorAll("td, [role='cell'], [class*='cell'], [class*='Cell']"));
}

function headerTextsForTable(row: Element): string[] {
  const table = row.closest("table");
  if (!table) return [];
  const headers = Array.from(table.querySelectorAll("thead th, thead td, [role='columnheader']"));
  return headers.map((h) => (h.textContent ?? "").trim().toLowerCase()).filter(Boolean);
}

/** Headers from the same grid/table as this row only (never whole document). */
function headerTextsForRow(row: Element): string[] {
  const fromTable = headerTextsForTable(row);
  if (fromTable.length >= 3) return fromTable;

  const grid = row.closest('[role="grid"], table');
  if (grid) {
    const headers = [...grid.querySelectorAll('[role="columnheader"], thead th')]
      .map((h) => (h.textContent ?? "").trim().toLowerCase())
      .filter(Boolean);
    if (headers.length >= 3) return headers;
  }

  return fromTable;
}

/** Diamond counts from row text when column mapping fails. */
function extractDiamondsFromRowText(rowText: string, username?: string): number | undefined {
  let text = rowText;
  if (username) {
    text = text.replace(
      new RegExp(username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
      " ",
    );
  }

  const fromLines = pickLargestDiamondLikeValue(splitCellLines(text), username);
  if (fromLines !== undefined) return fromLines;

  const commaMatches = [...text.matchAll(/\b(\d{1,3}(?:,\d{3})+)\b/g)]
    .map((m) => parseCompactNumber(m[1]))
    .filter((n): n is number => n !== undefined && n >= 100);
  if (commaMatches.length > 0) return Math.max(...commaMatches);

  return undefined;
}

function displayNameFromRow(row: Element, username?: string): string | undefined {
  const imgs = Array.from(row.querySelectorAll("img[alt]"));
  for (const img of imgs) {
    const alt = img.getAttribute("alt")?.trim();
    if (alt && alt.length > 1 && alt.toLowerCase() !== username?.toLowerCase()) return alt;
  }

  const cells = cellTexts(row);
  for (const cell of cells) {
    if (isNonDiamondStatCell(cell) || (/%|bonus/i.test(cell) && /^\$?\d/.test(cell))) continue;
    if (/^\d[\d,.]*$/.test(cell.replace(/\s/g, ""))) continue;
    const u = extractUsernameFromText(cell);
    const withoutUser = u ? cell.replace(`@${u}`, "").replace(u, "").trim() : cell;
    if (withoutUser.length > 1 && withoutUser.length < 80 && !/\blevel\s*\d/i.test(withoutUser)) {
      return withoutUser;
    }
  }
  return undefined;
}

function parseActiveness(text: string): string | undefined {
  const t = text.toLowerCase();
  if (/\belite\b/.test(t)) return "elite";
  if (/\bhigh\b|\bactive\b/.test(t)) return "high";
  if (/\bmedium\b|\bmed\b/.test(t)) return "medium";
  if (/\blow\b/.test(t)) return "low";
  if (/\bnone\b|\bunknown\b/.test(t)) return "none";
  return undefined;
}

function parseRelationshipRow(row: Element, tabStatus?: string): ParsedCreatorRow | null {
  const cells = cellTexts(row);
  const cellEls = tableCells(row);
  if (cells.length === 0) return null;

  const joined = cells.join("\n");
  const creatorColumn = cellEls[0] ? (cellEls[0].textContent ?? "").trim() : cells[0] ?? joined;
  const usernameRaw = creatorColumn.trim().slice(0, 200) || undefined;
  const usernameCandidate = extractUsernameWithConfidence(creatorColumn, {
    fromUsernameColumn: true,
    displayName: displayNameFromRow(row),
  });
  const username = usernameCandidate.username;
  if (!username) return null;

  const dateCell = cells.find((c) => /\d{1,2}\/\d{1,2}\/\d{4}/.test(c));
  const reasonCell = cells.length >= 3 ? cells[cells.length - 1] : undefined;

  return {
    tiktokUsername: username,
    tiktokUsernameRaw: usernameRaw,
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

function inferColumnMap(headers: string[]): {
  coins?: number;
  engagements?: number;
  days?: number;
  hours?: number;
  activeness?: number;
  creator?: number;
} {
  const map: ReturnType<typeof inferColumnMap> = {};
  headers.forEach((h, idx) => {
    if (/(creator|username|handle)/i.test(h)) map.creator = idx;
    if (/\bdiamonds?\b|\bgifts?\b/i.test(h)) map.coins = idx;
    else if (/\bcoins?\b/i.test(h) && !/incentive|contribution|bonus/i.test(h)) map.coins = idx;
    if (/(engagements?|interactions?)/i.test(h) && !/incentive/i.test(h)) map.engagements = idx;
    if (
      !/eligible\s*incentive/i.test(h) &&
      /(valid\s*go\s*live|valid.*live.*days?|days?\s*streamed|live\s*days?)/i.test(h)
    ) {
      map.days = idx;
    }
    if (/(stream duration|live duration)/i.test(h) || /\bhours?\b/.test(h)) map.hours = idx;
    if (/(activeness|activity level|active level)/i.test(h)) map.activeness = idx;
  });
  return map;
}

function parseStatsRow(row: Element, _doc: Document = document): ParsedCreatorRow | null {
  const cells = cellTexts(row);
  const cellEls = tableCells(row);
  if (cells.length === 0) return null;

  const headers = headerTextsForRow(row);
  const columnMap = inferColumnMap(headers);
  const creatorText =
    columnMap.creator !== undefined
      ? (cellEls[columnMap.creator]?.textContent ?? cells[columnMap.creator] ?? "")
      : (cellEls[0]?.textContent ?? cells[0] ?? "");

  const usernameRaw = creatorText.trim().slice(0, 200) || undefined;
  const usernameCandidate = extractUsernameWithConfidence(creatorText, {
    fromUsernameColumn: columnMap.creator !== undefined,
    displayName: displayNameFromRow(row),
  });
  const username = usernameCandidate.username;
  if (!username) return null;

  const joined = cells.join("\n");
  let coins: number | undefined;
  let diamonds: number | undefined;
  let days: number | undefined;
  let hours: number | undefined;
  let engagements: number | undefined;
  let activeness: string | undefined;
  let liveDurationText: string | undefined;
  let liveDurationSeconds: number | undefined;
  let riskFlag: string | undefined;

  diamonds = diamondsFromRowGrid(row);
  if (diamonds !== undefined) coins = diamonds;
  if (columnMap.engagements !== undefined) {
    const text = statTextFromRowColumn(row, columnMap.engagements, cellEls);
    if (text) engagements = parseStatNumber(text);
  }
  if (columnMap.days !== undefined) {
    const text = statTextFromRowColumn(row, columnMap.days, cellEls);
    if (text) {
      days = parseLiveDaysFromCell(text);
    }
  }
  if (columnMap.hours !== undefined) {
    const text = statTextFromRowColumn(row, columnMap.hours, cellEls);
    if (text) {
      hours = parseStreamHoursFromCell(text);
      if (hours !== undefined) {
        liveDurationText = text;
        liveDurationSeconds = Math.round(hours * 3600);
      }
    }
  }
  if (columnMap.activeness !== undefined) {
    const text = statTextFromRowColumn(row, columnMap.activeness, cellEls);
    if (text) activeness = parseActiveness(text);
  }

  for (const cellEl of cellEls) {
    const cell = readStatCellText(cellEl);
    const lower = cell.toLowerCase();
    if (!diamonds && /\bdiamonds?\b/i.test(cell)) {
      const n = parseStatNumber(cell);
      if (n !== undefined) {
        diamonds = n;
        coins = n;
      }
    }
    if (
      !days &&
      (lower.includes("live day") ||
        lower.includes("go live") ||
        /\d+\s*d\s*[\/／]/.test(cell) ||
        /^\d+\s*d(?:ays?)?\b/i.test(cell.trim()))
    ) {
      const parsed = parseLiveDaysFromCell(cell);
      if (parsed !== undefined) days = parsed;
    }
    if (
      !hours &&
      (/\d+\s*h\s*[\/／]/.test(cell) ||
        /\d+\s*h(?:\s*\d+\s*m)?\b/i.test(cell) ||
        (lower.includes("duration") && /\d/.test(cell)))
    ) {
      const parsed = parseStreamHoursFromCell(cell);
      if (parsed !== undefined) {
        hours = parsed;
        liveDurationText = cell;
        liveDurationSeconds = Math.round(parsed * 3600);
      }
    }
    if (
      engagements === undefined &&
      (lower.includes("engagement") ||
        lower.includes("interaction") ||
        lower.includes("activity") ||
        lower.includes("comment") ||
        lower.includes("like"))
    ) {
      engagements = firstCompactNumber(cell);
    }
    if (!activeness) activeness = parseActiveness(cell);
    if (!riskFlag && (lower.includes("risk") || lower.includes("violation") || lower.includes("warning"))) {
      riskFlag = cell.slice(0, 120);
    }
  }

  if (diamonds === undefined) {
    diamonds = pickLargestDiamondLikeValue(cells, username);
    if (diamonds !== undefined) coins = diamonds;
  }
  if (diamonds === undefined) {
    const inner = (row as HTMLElement).innerText?.trim() ?? joined;
    diamonds = extractDiamondsFromRowText(inner, username);
    if (diamonds !== undefined) coins = diamonds;
  }
  if (coins === undefined && diamonds !== undefined) coins = diamonds;

  if (!username || username.length < 2) return null;

  return {
    tiktokUsername: username,
    tiktokUsernameRaw: usernameRaw,
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

function dedupeRows(rows: ParsedCreatorRow[]): ParsedCreatorRow[] {
  const seen = new Set<string>();
  const out: ParsedCreatorRow[] = [];
  for (const r of rows) {
    const key = normalizeTikTokUsername(r.tiktokUsername) ?? r.rawTextPreview ?? "";
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}

/** Extract creator rows from visible tables/cards on backstage pages. */
export function extractCreatorRowsFromPage(
  doc: Document,
  pageType: DetectedPageType,
  relationshipTab?: string,
): ParsedCreatorRow[] {
  const rowEls = rowLikeElements(doc);
  const rows: ParsedCreatorRow[] = [];

  for (const el of rowEls) {
    if (pageType === "manage_relationship") {
      const parsed = parseRelationshipRow(el, relationshipTab);
      if (parsed) rows.push(parsed);
    } else if (pageType === "creator_stats" || pageType === "unknown") {
      const parsed = parseStatsRow(el, doc);
      if (parsed) rows.push(parsed);
    }
  }

  return dedupeRows(rows);
}

export { parseCompactNumber, parseDurationToSeconds, normalizeTikTokUsername };
