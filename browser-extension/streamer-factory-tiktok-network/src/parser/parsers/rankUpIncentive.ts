/**
 * Rank-up Incentive parser — separate from Activeness.
 * Extracts tier / rank-up / maintain status; does not feed rankings hours.
 */
import { parseLiveDaysFromCell, parseStreamHoursFromCell } from "../duration";
import { readStatCellText, statTextFromRowColumn } from "../gridTable";
import { parseStatNumber } from "../numbers";
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
import { normalizeTikTokUsername } from "../username";

function inferRankUpColumnMap(headers: string[]): {
  creator?: number;
  tierCurrent?: number;
  tierPrevious?: number;
  rankUp?: number;
  maintain?: number;
  diamonds?: number;
  days?: number;
  hours?: number;
  contribution?: number;
} {
  const map: ReturnType<typeof inferRankUpColumnMap> = {};
  headers.forEach((h, idx) => {
    if (/(creator|username|handle)/i.test(h)) map.creator = idx;
    if (/(maintain|keep\s*tier)/i.test(h)) {
      map.maintain = idx;
      return;
    }
    if (/(tier\s*last\s*month|previous\s*tier|last\s*tier)/i.test(h)) map.tierPrevious = idx;
    else if (/(current\s*tier|tier\s*this\s*month|tier\s*status)/i.test(h)) map.tierCurrent = idx;
    if (/(rank[\s-]?up|upgrade\s*status)/i.test(h)) map.rankUp = idx;
    if (/\bdiamonds?\b|\bgifts?\b/i.test(h)) map.diamonds = idx;
    if (/(valid\s*go\s*live|valid.*live.*days?|live\s*days?)/i.test(h)) map.days = idx;
    if (/(live duration|stream duration|\bhours?\b)/i.test(h)) map.hours = idx;
    if (/(estimated|contribution|bonus)/i.test(h)) map.contribution = idx;
  });
  return map;
}

function parseRankUpRow(row: Element): ParsedCreatorRow | null {
  const cells = cellTexts(row);
  const cellEls = tableCells(row);
  if (cells.length === 0) return null;

  const headers = headerTextsForRow(row);
  const map = inferRankUpColumnMap(headers);
  const creatorText =
    map.creator !== undefined
      ? (cellEls[map.creator]?.textContent ?? cells[map.creator] ?? "")
      : (cellEls[0]?.textContent ?? cells[0] ?? "");

  const usernameCandidate = usernameFromCreatorCell(creatorText, row);
  const username = usernameCandidate.username;
  if (!username) return null;

  const textAt = (idx: number | undefined) =>
    idx === undefined ? undefined : statTextFromRowColumn(row, idx, cellEls) || undefined;

  let diamonds: number | undefined;
  let days: number | undefined;
  let hours: number | undefined;

  if (map.diamonds !== undefined) {
    const t = textAt(map.diamonds);
    if (t) diamonds = parseStatNumber(t);
  }
  if (map.days !== undefined) {
    const t = textAt(map.days);
    if (t) days = parseLiveDaysFromCell(t);
  }
  if (map.hours !== undefined) {
    const t = textAt(map.hours);
    if (t) hours = parseStreamHoursFromCell(t);
  }

  // Fallback scan only for rank-up-specific labels — avoid Activity column confusion.
  for (const cellEl of cellEls) {
    const cell = readStatCellText(cellEl);
    const lower = cell.toLowerCase();
    if (diamonds === undefined && /\bdiamonds?\b/i.test(lower)) {
      diamonds = parseStatNumber(cell);
    }
  }

  const tierCurrent = textAt(map.tierCurrent);
  const tierPrevious = textAt(map.tierPrevious);
  const rankUpStatus = textAt(map.rankUp);
  const maintainTierStatus = textAt(map.maintain);
  const estimatedContribution = textAt(map.contribution);

  return {
    tiktokUsername: username,
    tiktokUsernameRaw: creatorText.trim().slice(0, 200) || undefined,
    usernameConfidence: usernameCandidate.confidence,
    usernameSource: usernameCandidate.source,
    displayName: displayNameFromRow(row, username),
    avatarUrl: avatarFromRow(row),
    diamondsEarned: diamonds,
    daysStreamed: days,
    hoursStreamed: hours,
    diamondsEarnedField: diamonds !== undefined ? presentMetric(diamonds) : missingMetric(),
    daysStreamedField: days !== undefined ? presentMetric(days) : missingMetric(),
    hoursStreamedField: hours !== undefined ? presentMetric(hours) : missingMetric(),
    tierCurrent,
    tierPrevious,
    rankUpStatus,
    maintainTierStatus,
    estimatedContribution,
    rawTextPreview: cells.join(" ").replace(/\s+/g, " ").slice(0, 180),
  };
}

export function parseRankUpIncentivePage(ctx: PageParseContext): PageParseResult {
  const rows: ParsedCreatorRow[] = [];
  const seen = new Set<string>();
  for (const el of rowLikeElements(ctx.doc)) {
    const parsed = parseRankUpRow(el);
    if (!parsed?.tiktokUsername) continue;
    const key = normalizeTikTokUsername(parsed.tiktokUsername);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    rows.push(parsed);
  }

  const metricsAvailable: string[] = [];
  if (rows.some((r) => r.tierCurrent || r.tierPrevious)) metricsAvailable.push("tier");
  if (rows.some((r) => r.rankUpStatus)) metricsAvailable.push("rank_up_status");
  if (rows.some((r) => r.maintainTierStatus)) metricsAvailable.push("maintain_tier_status");
  if (rows.some((r) => r.diamondsEarned !== undefined)) metricsAvailable.push("diamonds");
  if (rows.some((r) => r.daysStreamed !== undefined)) metricsAvailable.push("valid_live_days");
  if (rows.some((r) => r.hoursStreamed !== undefined)) metricsAvailable.push("live_duration");
  if (rows.some((r) => r.estimatedContribution)) metricsAvailable.push("estimated_contribution");

  return { rows, liveRows: [], headersFound: ctx.headersFound, metricsAvailable };
}
