import { deepQueryAll } from "./dom-deep";
import { elementVisibleText } from "./live-card-stats";
import { handleFromRawText } from "./live-handle-text";
import {
  isTruncatedHandleVisible,
  truncatedHandlePrefix,
} from "./live-handle-patterns";
import { titleElementsWithHandles } from "./live-hint-elements";
import { usernameFromLiveHeaderHints } from "./live-header-hints";
import { isInsideBackstageChrome } from "./live-stream-card";
import { isInvalidLiveStreamHandle, isSuspiciousLiveHandle } from "./live-username";
import type { ParsedLiveRow } from "./types";
import { cleanTikTokUsername, normalizeTikTokUsername } from "./username";

const CREATOR_ID_LINE = /^(?:creator\s*)?id\s*[:#]?\s*(\d{4,})\s*$/i;
const CREATOR_ID_IN_LINE = /(?:creator\s*)?id\s*[:#]?\s*\d{4,}/i;

type BuildRow = (card: Element, username: string) => ParsedLiveRow | null;

function looksLikeTikTokHandle(handle: string): boolean {
  if (handle.length < 5) return false;
  if (/^(id|live|replay|creator|manage)$/i.test(handle)) return false;
  return /[_.\d]/.test(handle) || handle.length >= 6;
}

function usernameFromLinesBeforeId(scope: Element): string | undefined {
  const lines = elementVisibleText(scope)
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  for (let i = 0; i < lines.length; i += 1) {
    if (!CREATOR_ID_IN_LINE.test(lines[i])) continue;

    for (let j = i - 1; j >= Math.max(0, i - 6); j -= 1) {
      const line = lines[j];
      if (/^live$/i.test(line) || /^replay$/i.test(line)) continue;
      if (/^\d+[hm]?\s*$/i.test(line)) continue;

      const fromTitle = usernameFromLiveHeaderHints(scope);
      if (fromTitle) return fromTitle;

      const prefix = truncatedHandlePrefix(line);
      if (prefix) {
        const u = cleanTikTokUsername(prefix);
        if (u && looksLikeTikTokHandle(u) && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) {
          return u;
        }
      }

      if (isTruncatedHandleVisible(line)) continue;

      const plain = line.match(/^@?([a-z0-9][a-z0-9._]{2,24})$/i);
      if (plain) {
        const u = cleanTikTokUsername(plain[1]);
        if (u && looksLikeTikTokHandle(u) && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) {
          return u;
        }
      }
    }
  }

  for (const el of titleElementsWithHandles(scope)) {
    const u = handleFromRawText(el.getAttribute("title"));
    if (u) return u;
  }

  return undefined;
}

function countCreatorIds(text: string): number {
  return (text.match(/(?:creator\s*)?id\s*[:#]?\s*\d{4,}/gi) ?? []).length;
}

function climbToCreatorCardFromId(idEl: Element): Element | null {
  let scope: Element | null = idEl;
  let best: Element | null = null;
  let bestLen = Infinity;

  for (let depth = 0; depth < 16 && scope; depth += 1) {
    if (isInsideBackstageChrome(scope)) break;

    const text = elementVisibleText(scope);
    if (text.length < 12 || text.length > 6000) {
      scope = scope.parentElement;
      continue;
    }

    if (countCreatorIds(text) === 1 && CREATOR_ID_IN_LINE.test(text)) {
      if (text.length < bestLen) {
        best = scope;
        bestLen = text.length;
      }
    }

    scope = scope.parentElement;
  }

  return best;
}

function idAnchorElements(doc: Document): Element[] {
  const out: Element[] = [];
  const seen = new Set<Element>();

  for (const el of deepQueryAll(doc, "div, span, p, li, td, a, label, h3, h4")) {
    if (seen.has(el)) continue;
    const text = elementVisibleText(el);
    if (!text || text.length > 120) continue;
    if (!CREATOR_ID_IN_LINE.test(text)) continue;
    if (CREATOR_ID_LINE.test(text.trim()) || (text.length < 60 && CREATOR_ID_IN_LINE.test(text))) {
      seen.add(el);
      out.push(el);
    }
  }

  return out;
}

/** liveRoom tab: creator block is often just truncated name + Creator ID (no LIVE time labels in DOM). */
export function extractLiveNowFromCreatorIdAnchors(
  doc: Document,
  buildRow: BuildRow,
): ParsedLiveRow[] {
  const rows: ParsedLiveRow[] = [];
  const seen = new Set<string>();

  for (const idEl of idAnchorElements(doc)) {
    const card = climbToCreatorCardFromId(idEl);
    if (!card) continue;

    const username = usernameFromLinesBeforeId(card);
    if (!username) continue;

    const key = normalizeTikTokUsername(username) ?? username;
    if (seen.has(key)) continue;

    const parsed = buildRow(card, username);
    if (!parsed) continue;

    seen.add(key);
    rows.push(parsed);
  }

  return rows;
}

/** Scan visible page text for handle + Creator ID pairs (liveRoom grid). */
export function extractLiveNowFromBodyText(doc: Document): ParsedLiveRow[] {
  const body = elementVisibleText(doc.body ?? doc.documentElement);
  if (!body || body.length < 30) return [];

  const rows: ParsedLiveRow[] = [];
  const seen = new Set<string>();

  const patterns = [
    /(?:^|[\n\r])\s*@?([a-z0-9][a-z0-9._]{2,27})(?:…|\.{2,3})?\s*[\n\r]+\s*(?:Creator\s*)?ID\s*[:#]?\s*\d{4,}/gim,
    /(?:^|[\n\r])\s*@?([a-z0-9][a-z0-9._]{4,24})\s*[\n\r]+\s*(?:Creator\s*)?ID\s*[:#]?\s*\d{4,}/gim,
    /(?:^|[\n\r])\s*(?:Creator\s*)?ID\s*[:#]?\s*\d{4,}\s*[\n\r]+\s*@?([a-z0-9][a-z0-9._]{2,27})(?:…|\.{2,3})?/gim,
  ];

  for (const re of patterns) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(body)) !== null) {
      const raw = m[1];
      const u = cleanTikTokUsername(raw);
      if (!u || !looksLikeTikTokHandle(u) || isInvalidLiveStreamHandle(u) || isSuspiciousLiveHandle(u)) {
        continue;
      }
      const key = normalizeTikTokUsername(u) ?? u;
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push({
        tiktokUsername: u,
        usernameConfidence: isTruncatedHandleVisible(raw) ? "medium" : "high",
        usernameSource: "handle_pattern",
        liveBadgeDetected: /\blive\b/i.test(body.slice(Math.max(0, m.index - 80), m.index + 80)),
        rawTextPreview: m[0].trim().slice(0, 120),
      });
    }
  }

  return rows;
}
