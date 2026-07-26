import { handleFromRawText } from "./live-handle-text";
import { isInsideIconControl } from "./live-hint-elements";
import {
  findLiveStreamTiles,
  isInsideStreamChatOrVideo,
  isStreamCardHeaderHandle,
} from "./live-stream-tile";
import { isInvalidLiveStreamHandle, isSuspiciousLiveHandle } from "./live-username";
import type { ParsedLiveRow } from "./types";
import { cleanTikTokUsername, normalizeTikTokUsername } from "./username";

/** @barbara… at top of stream card (liveRoom tab). */
const AT_TRUNCATED_LINE =
  /^@([_]?[a-z0-9][a-z0-9._]{1,26})(?:…|\.{2,3}|\u2026)\s*$/i;

type BuildRow = (card: Element, username: string) => ParsedLiveRow | null;

function usernameFromAtTruncated(raw: string): string | undefined {
  const line = raw.trim();
  const m = line.match(AT_TRUNCATED_LINE);
  if (!m) return undefined;
  const u = cleanTikTokUsername(m[1]);
  if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
  return undefined;
}

function headerHandleElements(tile: Element): Element[] {
  const out: Element[] = [];
  for (const el of tile.querySelectorAll("span, a, p, div")) {
    if (isInsideIconControl(el)) continue;
    if (isInsideStreamChatOrVideo(el)) continue;
    const text = (el.textContent ?? "").trim();
    if (!AT_TRUNCATED_LINE.test(text)) continue;
    if (!isStreamCardHeaderHandle(el, tile)) continue;
    out.push(el);
  }
  return out.sort((a, b) => {
    const pos = a.compareDocumentPosition(b);
    if (pos & 4) return -1;
    if (pos & 2) return 1;
    return 0;
  });
}

/**
 * One streamer per LIVE preview card — reads @handle… in the card header only,
 * never @mentions inside the in-stream chat overlay.
 */
export function extractLiveNowFromVisibleAtHandles(
  doc: Document,
  buildRow: BuildRow,
): ParsedLiveRow[] {
  const rows: ParsedLiveRow[] = [];
  const seen = new Set<string>();

  for (const tile of findLiveStreamTiles(doc)) {
    const candidates = headerHandleElements(tile);
    if (candidates.length === 0) continue;

    const headerEl = candidates[0];
    const username = usernameFromAtTruncated(headerEl.textContent ?? "");
    if (!username) continue;

    const key = normalizeTikTokUsername(username) ?? username;
    if (seen.has(key)) continue;

    const parsed = buildRow(tile, username);
    const row =
      parsed ??
      ({
        tiktokUsername: username,
        usernameConfidence: "medium",
        usernameSource: "username_column",
        liveBadgeDetected: true,
        rawTextPreview: (headerEl.textContent ?? "").trim().slice(0, 80),
      } satisfies ParsedLiveRow);

    if (!row) continue;
    seen.add(key);
    rows.push(row);
  }

  return rows;
}
