/**
 * Manage Creators / Manage relationship roster parser.
 * Independent from incentive eligibility lists — presence + status only.
 * Supports modern Backstage columns: Relationship status, Joined time, Followers, Likes, Diamonds in L30D.
 */
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
import { statTextFromRowColumn } from "../gridTable";

function inferRosterColumnMap(headers: string[]): {
  creator?: number;
  status?: number;
  joined?: number;
} {
  const map: ReturnType<typeof inferRosterColumnMap> = {};
  headers.forEach((h, idx) => {
    if (/(creator|username|handle)/i.test(h)) map.creator = idx;
    if (/(relationship\s*status|invite\s*status|\bstatus\b)/i.test(h)) map.status = idx;
    if (/(joined|join\s*time|request\s*date|\bdate\b)/i.test(h)) map.joined = idx;
  });
  return map;
}

function parseRosterRow(row: Element, tabStatus?: string): ParsedCreatorRow | null {
  const cells = cellTexts(row);
  const cellEls = tableCells(row);
  if (cells.length === 0) return null;

  const headers = headerTextsForRow(row);
  const map = inferRosterColumnMap(headers);

  const creatorText =
    map.creator !== undefined
      ? (cellEls[map.creator]?.textContent ?? cells[map.creator] ?? "")
      : (cellEls[0]?.textContent ?? cells[0] ?? "");

  const joined = cells.join("\n");
  const usernameRaw = creatorText.trim().slice(0, 200) || undefined;
  const usernameCandidate = usernameFromCreatorCell(creatorText, row);
  const username = usernameCandidate.username;
  if (!username) return null;

  const statusFromCol =
    map.status !== undefined
      ? statTextFromRowColumn(row, map.status, cellEls) || undefined
      : undefined;
  const joinedFromCol =
    map.joined !== undefined
      ? statTextFromRowColumn(row, map.joined, cellEls) || undefined
      : undefined;

  let dateCell = joinedFromCol;
  let reasonCell: string | undefined;
  if (!dateCell) {
    for (const cell of cells) {
      if (/\d{1,2}\/\d{1,2}\/\d{2,4}/.test(cell) && !dateCell) dateCell = cell.trim();
      else if (
        cell.length > 3 &&
        cell !== dateCell &&
        !reasonCell &&
        cell !== creatorText &&
        !/^\d[\d,.]*$/.test(cell.replace(/\s/g, ""))
      ) {
        // Skip pure numeric follower/like/diamond cells as "reason"
        if (!/followers?|likes?|diamonds?/i.test(cell)) {
          reasonCell = cell.trim().slice(0, 200);
        }
      }
    }
  }

  const networkStatus = statusFromCol || tabStatus;

  return {
    tiktokUsername: username,
    tiktokUsernameRaw: usernameRaw,
    usernameConfidence: usernameCandidate.confidence,
    usernameSource: usernameCandidate.source,
    displayName: displayNameFromRow(row, username),
    avatarUrl: avatarFromRow(row),
    creatorNetworkStatus: networkStatus,
    inviteStatus: networkStatus,
    relationshipRequestDate: dateCell,
    relationshipReason: reasonCell && reasonCell !== dateCell ? reasonCell : undefined,
    rawTextPreview: joined.replace(/\s+/g, " ").slice(0, 180),
  };
}

export function parseCreatorRosterPage(ctx: PageParseContext): PageParseResult {
  const rows: ParsedCreatorRow[] = [];
  const seen = new Set<string>();
  for (const el of rowLikeElements(ctx.doc)) {
    const parsed = parseRosterRow(el, ctx.relationshipTab);
    if (!parsed?.tiktokUsername) continue;
    const key = normalizeTikTokUsername(parsed.tiktokUsername);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    rows.push(parsed);
  }

  return {
    rows,
    liveRows: [],
    headersFound: ctx.headersFound,
    metricsAvailable: ["roster_presence", "network_status"],
  };
}
