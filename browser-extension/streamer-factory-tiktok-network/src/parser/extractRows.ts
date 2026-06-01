import { parseDayCount, parseDurationToSeconds } from "./duration";
import {
  firstCompactNumber,
  isNonDiamondStatCell,
  isNumericStatCell,
  parseCompactNumber,
  parseStatNumber,
} from "./numbers";
import type { DetectedPageType, ParsedCreatorRow } from "./types";
import { extractUsernameFromText, extractUsernameWithConfidence, normalizeTikTokUsername } from "./username";

function rowLikeElements(doc: Document): Element[] {
  const gridRows = Array.from(doc.querySelectorAll('[role="row"]')).filter(
    (el) =>
      !el.querySelector('[role="columnheader"]') &&
      (el.querySelector('[role="cell"]') || el.querySelector("td")) &&
      (el.textContent?.length ?? 0) > 15,
  );
  const fromTable = Array.from(doc.querySelectorAll("table tbody tr")).filter(
    (tr) => (tr.textContent?.length ?? 0) > 15,
  );

  /* TikTok Incentives uses role=grid; a legacy <table> often has wrong/empty rows. */
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

function readCellText(cell: Element): string {
  const bits: string[] = [];
  const aria = cell.getAttribute("aria-label")?.trim();
  const text = (cell.textContent ?? "").trim();
  if (text) bits.push(text);
  if (aria && aria !== text) bits.push(aria);
  return bits.join(" ").trim();
}

/** Split row/cell text into lines (TikTok often packs a row into one cell). */
function splitCellLines(text: string): string[] {
  return text
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean);
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

/** TikTok often uses role=grid with columnheader row separate from tbody table. */
function headerTextsForRow(row: Element, doc: Document): string[] {
  const fromTable = headerTextsForTable(row);
  if (fromTable.length >= 3) return fromTable;

  const containers = [
    row.closest('[role="grid"]'),
    row.closest('[role="table"]'),
    row.closest("table"),
  ].filter(Boolean) as Element[];

  for (const container of containers) {
    const headerCells = Array.from(container.querySelectorAll('[role="columnheader"]'));
    if (headerCells.length >= 3) {
      return headerCells.map((h) => (h.textContent ?? "").trim().toLowerCase()).filter(Boolean);
    }
  }

  const docHeaders = Array.from(doc.querySelectorAll('[role="columnheader"], thead th'));
  const texts = docHeaders.map((h) => (h.textContent ?? "").trim().toLowerCase()).filter(Boolean);
  if (texts.some((h) => /\bdiamonds?\b|\bgifts?\b/i.test(h))) return texts;

  return fromTable;
}

function diamondsColIndexFromAria(doc: Document): number | undefined {
  for (const h of doc.querySelectorAll('[role="columnheader"]')) {
    if (!/\bdiamonds?\b|\bgifts?\b/i.test(h.textContent ?? "")) continue;
    const idx = parseInt(h.getAttribute("aria-colindex") ?? "", 10);
    if (!Number.isNaN(idx)) return idx;
  }
  return undefined;
}

function cellTextAtColIndex(row: Element, colIndex: number): string | undefined {
  const direct = row.querySelector(`[role="cell"][aria-colindex="${colIndex}"]`);
  if (direct) return readCellText(direct);
  for (const cell of row.querySelectorAll('[role="cell"], td')) {
    const idx = parseInt(cell.getAttribute("aria-colindex") ?? "", 10);
    if (idx === colIndex) return readCellText(cell);
  }
  return undefined;
}

/** Diamond counts from row text (DOM may omit commas: "8720" vs displayed "8,720"). */
function extractDiamondsFromRowText(rowText: string, username?: string): number | undefined {
  let text = rowText;
  if (username) {
    text = text.replace(
      new RegExp(username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
      " ",
    );
  }

  const commaMatches = [...text.matchAll(/\b(\d{1,3}(?:,\d{3})+)\b/g)]
    .map((m) => parseCompactNumber(m[1]))
    .filter((n): n is number => n !== undefined && n >= 10);
  if (commaMatches.length > 0) return Math.max(...commaMatches);

  const plain: number[] = [];
  for (const line of splitCellLines(text)) {
    if (isNumericStatCell(line)) {
      const n = parseStatNumber(line);
      if (n !== undefined && n >= 10) plain.push(n);
    }
  }
  for (const m of text.matchAll(/\b(\d{3,7})\b/g)) {
    const n = Number(m[1]);
    if (n >= 100 && n <= 50_000_000) plain.push(n);
  }
  if (plain.length === 0) return undefined;
  return Math.max(...plain);
}

function resolveDiamondsColumnIndex(
  row: Element,
  doc: Document,
  headers: string[],
  columnMap: ReturnType<typeof inferColumnMap>,
): number | undefined {
  if (columnMap.coins !== undefined) return columnMap.coins;

  const headerIdx = headers.findIndex((h) => /\bdiamonds?\b|\bgifts?\b/i.test(h));
  if (headerIdx >= 0) return headerIdx;

  const scopes = [row.closest('[role="grid"]'), row.closest('[role="table"]'), doc.body].filter(
    Boolean,
  ) as Element[];
  for (const scope of scopes) {
    const headerCells = Array.from(scope.querySelectorAll('[role="columnheader"], thead th'));
    const idx = headerCells.findIndex((h) => /\bdiamonds?\b|\bgifts?\b/i.test(h.textContent ?? ""));
    if (idx >= 0) return idx;
  }

  /* Incentives “by creator”: Creator · bonus · ratio · Diamonds · live days · duration … */
  if (
    headers.some((h) => /bonus|contribution/i.test(h)) &&
    (headers.some((h) => /\bratio\b/i.test(h)) || headers.some((h) => /live.*day/i.test(h)))
  ) {
    const explicit = headers.findIndex((h) => /\bdiamonds?\b/i.test(h));
    return explicit >= 0 ? explicit : 3;
  }

  return undefined;
}

function avatarFromRow(row: Element): string | undefined {
  const img = row.querySelector("img[src]");
  const src = img?.getAttribute("src") ?? undefined;
  if (src && !src.startsWith("data:")) return src;
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

/** Best-effort diamonds when header map fails — never "1d / 8d" or "$0.00". */
function pickDiamondsFromCells(cells: string[], coinsColumnIndex?: number): number | undefined {
  if (coinsColumnIndex !== undefined && cells[coinsColumnIndex]) {
    const mapped = parseStatNumber(cells[coinsColumnIndex]);
    if (mapped !== undefined) return mapped;
  }

  let best: number | undefined;
  for (const cell of cells) {
    const parts = splitCellLines(cell);
    for (const part of parts.length > 0 ? parts : [cell]) {
      if (isNonDiamondStatCell(part)) continue;
      if (extractUsernameFromText(part)) continue;
      if (isNumericStatCell(part)) {
        const n = parseStatNumber(part);
        if (n !== undefined && n >= 10) {
          if (best === undefined || n > best) best = n;
        }
        continue;
      }
      const n = parseStatNumber(part);
      if (n === undefined || n < 10) continue;
      if (n <= 100 && /%/.test(part)) continue;
      if (best === undefined || n > best) best = n;
    }
  }
  return best;
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
    if (/(valid.*live.*days?|days? streamed|live days)/i.test(h)) map.days = idx;
    if (/(stream duration|live duration)/i.test(h) || /\bhours?\b/.test(h)) map.hours = idx;
    if (/(activeness|activity level|active level)/i.test(h)) map.activeness = idx;
  });
  return map;
}

function parseStatsRow(row: Element, doc: Document = document): ParsedCreatorRow | null {
  const cells = cellTexts(row);
  const cellEls = tableCells(row);
  if (cells.length === 0) return null;

  const headers = headerTextsForRow(row, doc);
  const columnMap = inferColumnMap(headers);
  const diamondsCol = resolveDiamondsColumnIndex(row, doc, headers, columnMap);
  if (diamondsCol !== undefined) columnMap.coins = diamondsCol;
  const ariaDiamondsCol = diamondsColIndexFromAria(doc);
  const creatorText =
    columnMap.creator !== undefined
      ? (cellEls[columnMap.creator]?.textContent ?? cells[columnMap.creator] ?? "")
      : (cellEls[0]?.textContent ?? cells[0] ?? "");

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

  if (ariaDiamondsCol !== undefined) {
    const ariaCell = cellTextAtColIndex(row, ariaDiamondsCol);
    if (ariaCell) {
      const n = parseStatNumber(ariaCell);
      if (n !== undefined) {
        coins = n;
        diamonds = n;
      }
    }
  }

  if (diamonds === undefined && columnMap.coins !== undefined && cells[columnMap.coins]) {
    const n = parseStatNumber(cells[columnMap.coins]);
    if (n !== undefined) {
      coins = n;
      diamonds = n;
    }
  }
  if (columnMap.engagements !== undefined && cells[columnMap.engagements]) {
    engagements = parseStatNumber(cells[columnMap.engagements]);
  }
  if (columnMap.days !== undefined && cells[columnMap.days]) {
    days = parseDayCount(cells[columnMap.days]);
  }
  if (columnMap.hours !== undefined && cells[columnMap.hours]) {
    const seconds = parseDurationToSeconds(cells[columnMap.hours]);
    if (seconds !== undefined) {
      hours = seconds / 3600;
      liveDurationText = cells[columnMap.hours];
      liveDurationSeconds = seconds;
    } else {
      hours = firstCompactNumber(cells[columnMap.hours]);
    }
  }
  if (columnMap.activeness !== undefined && cells[columnMap.activeness]) {
    activeness = parseActiveness(cells[columnMap.activeness]);
  }

  for (const cell of cells) {
    const lower = cell.toLowerCase();
    if (!diamonds && /\bdiamonds?\b/i.test(cell)) {
      const n = parseStatNumber(cell);
      if (n !== undefined) {
        diamonds = n;
        coins = n;
      }
    }
    if (!days && (lower.includes("live day") || lower.includes("go live") || /\d+\s*d\b/i.test(cell))) {
      days = parseDayCount(cell);
    }
    if (!hours && (lower.includes("hour") || /\d+h\b/i.test(cell) || /\d+\s*h\s*\d*m/i.test(cell))) {
      hours = parseDurationToSeconds(cell);
      if (hours !== undefined) hours = hours / 3600;
      else {
        const h = firstCompactNumber(cell);
        if (h !== undefined) hours = h;
      }
      liveDurationText = cell;
      liveDurationSeconds = parseDurationToSeconds(cell);
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
    diamonds = pickDiamondsFromCells(cells, diamondsCol ?? columnMap.coins);
    if (diamonds !== undefined) coins = diamonds;
  }
  if (diamonds === undefined) {
    diamonds = extractDiamondsFromRowText(joined, username);
    if (diamonds !== undefined) coins = diamonds;
  }
  if (coins === undefined && diamonds !== undefined) coins = diamonds;

  if (!username || username.length < 2) return null;

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
