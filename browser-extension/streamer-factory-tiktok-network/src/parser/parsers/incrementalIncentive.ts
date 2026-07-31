/**
 * Incremental Revenue Incentive parser — separate store from Activeness rankings.
 */
import { parseStatNumber } from "../numbers";
import { missingMetric, presentMetric } from "../metricField";
import { statTextFromRowColumn } from "../gridTable";
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

function inferIncrementalMap(headers: string[]): {
  creator?: number;
  diamonds?: number;
  contribution?: number;
} {
  const map: ReturnType<typeof inferIncrementalMap> = {};
  headers.forEach((h, idx) => {
    if (/(creator|username|handle)/i.test(h)) map.creator = idx;
    if (/\bdiamonds?\b|\brevenue\b|\bincremental\b/i.test(h)) map.diamonds = idx;
    if (/(estimated|contribution|bonus)/i.test(h)) map.contribution = idx;
  });
  return map;
}

export function parseIncrementalIncentivePage(ctx: PageParseContext): PageParseResult {
  const rows: ParsedCreatorRow[] = [];
  const seen = new Set<string>();

  for (const el of rowLikeElements(ctx.doc)) {
    const cells = cellTexts(el);
    const cellEls = tableCells(el);
    if (cells.length === 0) continue;
    const headers = headerTextsForRow(el);
    const map = inferIncrementalMap(headers);
    const creatorText =
      map.creator !== undefined
        ? (cellEls[map.creator]?.textContent ?? cells[map.creator] ?? "")
        : (cellEls[0]?.textContent ?? cells[0] ?? "");
    const usernameCandidate = usernameFromCreatorCell(creatorText, el);
    const username = usernameCandidate.username;
    if (!username) continue;
    const key = normalizeTikTokUsername(username);
    if (!key || seen.has(key)) continue;
    seen.add(key);

    let diamonds: number | undefined;
    if (map.diamonds !== undefined) {
      const t = statTextFromRowColumn(el, map.diamonds, cellEls);
      if (t) diamonds = parseStatNumber(t);
    }
    const contribution =
      map.contribution !== undefined
        ? statTextFromRowColumn(el, map.contribution, cellEls) || undefined
        : undefined;

    rows.push({
      tiktokUsername: username,
      tiktokUsernameRaw: creatorText.trim().slice(0, 200) || undefined,
      usernameConfidence: usernameCandidate.confidence,
      usernameSource: usernameCandidate.source,
      displayName: displayNameFromRow(el, username),
      avatarUrl: avatarFromRow(el),
      diamondsEarned: diamonds,
      diamondsEarnedField: diamonds !== undefined ? presentMetric(diamonds) : missingMetric(),
      estimatedContribution: contribution,
      rawTextPreview: cells.join(" ").replace(/\s+/g, " ").slice(0, 180),
    });
  }

  const metricsAvailable: string[] = [];
  if (rows.some((r) => r.diamondsEarned !== undefined)) metricsAvailable.push("diamonds");
  if (rows.some((r) => r.estimatedContribution)) metricsAvailable.push("estimated_contribution");

  return { rows, liveRows: [], headersFound: ctx.headersFound, metricsAvailable };
}
