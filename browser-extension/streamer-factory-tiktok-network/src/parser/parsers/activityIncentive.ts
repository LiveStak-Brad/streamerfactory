/**
 * Activeness / Activity Incentive parser.
 * Preserves the working incentives-grid column mapping behavior.
 * Missing values stay missing — never coerce to 0.
 */
import { parseLiveDaysFromCell, parseStreamHoursFromCell } from "../duration";
import {
  diamondsFromRowGrid,
  pickLargestDiamondLikeValue,
  readStatCellText,
  splitCellLines,
  statTextFromRowColumn,
} from "../gridTable";
import { firstCompactNumber, isNonDiamondStatCell, parseCompactNumber, parseStatNumber } from "../numbers";
import { missingMetric, presentMetric } from "../metricField";
import type { ParsedCreatorRow } from "../types";
import type { PageParseContext, PageParseResult } from "../pageSpecs/types";
import {
  avatarFromRow,
  cellTexts,
  displayNameFromRow,
  headerTextsForRow,
  rowLikeElements,
  tableCells,
  usernameFromCreatorCell,
} from "./shared";
import { isBackstageUiHandle, normalizeTikTokUsername } from "../username";

function inferActivityColumnMap(headers: string[]): {
  coins?: number;
  engagements?: number;
  days?: number;
  hours?: number;
  activeness?: number;
  creator?: number;
} {
  const map: ReturnType<typeof inferActivityColumnMap> = {};
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

function parseActiveness(text: string): string | undefined {
  const t = text.toLowerCase();
  if (/\belite\b/.test(t)) return "elite";
  if (/\bhigh\b|\bactive\b/.test(t)) return "high";
  if (/\bmedium\b|\bmed\b/.test(t)) return "medium";
  if (/\blow\b/.test(t)) return "low";
  if (/\bnone\b|\bunknown\b/.test(t)) return "none";
  return undefined;
}

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

function parseActivityRow(row: Element): ParsedCreatorRow | null {
  const cells = cellTexts(row);
  const cellEls = tableCells(row);
  if (cells.length === 0) return null;

  const headers = headerTextsForRow(row);
  const columnMap = inferActivityColumnMap(headers);
  const creatorText =
    columnMap.creator !== undefined
      ? (cellEls[columnMap.creator]?.textContent ?? cells[columnMap.creator] ?? "")
      : (cellEls[0]?.textContent ?? cells[0] ?? "");

  const usernameRaw = creatorText.trim().slice(0, 200) || undefined;
  const usernameCandidate = usernameFromCreatorCell(creatorText, row);
  const username = usernameCandidate.username;
  if (!username) return null;

  const joined = cells.join("\n");
  let diamonds: number | undefined;
  let days: number | undefined;
  let hours: number | undefined;
  let engagements: number | undefined;
  let activeness: string | undefined;
  let liveDurationText: string | undefined;
  let liveDurationSeconds: number | undefined;

  diamonds = diamondsFromRowGrid(row);
  if (columnMap.engagements !== undefined) {
    const text = statTextFromRowColumn(row, columnMap.engagements, cellEls);
    if (text) engagements = parseStatNumber(text);
  }
  if (columnMap.days !== undefined) {
    const text = statTextFromRowColumn(row, columnMap.days, cellEls);
    if (text) days = parseLiveDaysFromCell(text);
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
    if (diamonds === undefined && /\bdiamonds?\b/i.test(cell)) {
      const n = parseStatNumber(cell);
      if (n !== undefined) diamonds = n;
    }
    if (
      days === undefined &&
      (lower.includes("live day") ||
        lower.includes("go live") ||
        /\d+\s*d\s*[\/／]/.test(cell) ||
        /^\d+\s*d(?:ays?)?\b/i.test(cell.trim()))
    ) {
      const parsed = parseLiveDaysFromCell(cell);
      if (parsed !== undefined) days = parsed;
    }
    if (
      hours === undefined &&
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
        lower.includes("comment") ||
        lower.includes("like")) &&
      !isNonDiamondStatCell(cell)
    ) {
      engagements = firstCompactNumber(cell);
    }
    if (!activeness) activeness = parseActiveness(cell);
  }

  if (diamonds === undefined) {
    diamonds = pickLargestDiamondLikeValue(cells, username);
  }
  if (diamonds === undefined) {
    const inner = (row as HTMLElement).innerText?.trim() ?? joined;
    diamonds = extractDiamondsFromRowText(inner, username);
  }

  if (!username || username.length < 2) return null;
  if (isBackstageUiHandle(username)) return null;

  // Header / chrome rows never carry real metrics — drop them
  if (diamonds === undefined && days === undefined && hours === undefined) return null;

  const hoursField = hours !== undefined ? presentMetric(hours) : missingMetric();
  const daysField = days !== undefined ? presentMetric(days) : missingMetric();
  const diamondsField = diamonds !== undefined ? presentMetric(diamonds) : missingMetric();
  const engagementsField =
    engagements !== undefined ? presentMetric(engagements) : missingMetric();

  return {
    tiktokUsername: username,
    tiktokUsernameRaw: usernameRaw,
    usernameConfidence: usernameCandidate.confidence,
    usernameSource: usernameCandidate.source,
    displayName: displayNameFromRow(row, username),
    avatarUrl: avatarFromRow(row),
    // Bare numbers only when present (legacy consumers); never invent 0.
    coinsEarned: diamonds,
    diamondsEarned: diamonds,
    engagements,
    daysStreamed: days,
    hoursStreamed: hours,
    hoursStreamedField: hoursField,
    daysStreamedField: daysField,
    diamondsEarnedField: diamondsField,
    coinsEarnedField: diamondsField,
    engagementsField,
    liveDurationText,
    liveDurationSeconds,
    activenessLevel: activeness,
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

export function parseActivityIncentivePage(ctx: PageParseContext): PageParseResult {
  const rowEls = rowLikeElements(ctx.doc);
  const rows: ParsedCreatorRow[] = [];
  for (const el of rowEls) {
    const parsed = parseActivityRow(el);
    if (parsed) rows.push(parsed);
  }
  const deduped = dedupeRows(rows);
  const metricsAvailable: string[] = [];
  if (deduped.some((r) => r.diamondsEarned !== undefined)) metricsAvailable.push("diamonds");
  if (deduped.some((r) => r.daysStreamed !== undefined)) metricsAvailable.push("valid_live_days");
  if (deduped.some((r) => r.hoursStreamed !== undefined)) metricsAvailable.push("live_duration");
  if (deduped.some((r) => r.activenessLevel)) metricsAvailable.push("activeness_level");

  return {
    rows: deduped,
    liveRows: [],
    headersFound: ctx.headersFound,
    metricsAvailable,
  };
}
