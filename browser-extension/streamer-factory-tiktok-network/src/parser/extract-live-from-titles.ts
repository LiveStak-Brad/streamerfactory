import { deepQueryAll } from "./dom-deep";
import { elementVisibleText } from "./live-card-stats";
import { textHasLiveCardStats } from "./live-card-stats";
import { isInsideIconControl, titleElementsWithHandles } from "./live-hint-elements";
import { handleFromRawText } from "./live-handle-text";
import { isInsideBackstageChrome } from "./live-stream-card";
import { isInvalidLiveStreamHandle, isSuspiciousLiveHandle } from "./live-username";
import type { ParsedLiveRow } from "./types";
import { normalizeTikTokUsername } from "./username";

type BuildRow = (card: Element, username: string) => ParsedLiveRow | null;

function cardHeaderSlice(text: string): string {
  const idx = text.search(/live\s*(?:time|dur(?:ation)?)/i);
  return idx > 20 ? text.slice(0, idx) : text.slice(0, Math.min(text.length, 600));
}

function isReplayOnlyScope(card: Element, text: string): boolean {
  if (titleElementsWithHandles(card).length > 0) return false;
  if (card.querySelector('a[href*="@"]')) return false;
  const header = cardHeaderSlice(text).trim();
  const lines = header.split(/\n/).map((l) => l.trim()).filter(Boolean);
  return lines.length > 0 && lines.every((l) => /^replay$/i.test(l) || /^id\s*\d+$/i.test(l));
}

function climbToLiveScopeFromHandle(handleEl: Element): Element | null {
  let scope: Element | null = handleEl;
  let best: Element | null = null;

  for (let depth = 0; depth < 22 && scope; depth += 1) {
    if (isInsideBackstageChrome(scope)) break;

    const text = elementVisibleText(scope);
    if (text.length < 25 || text.length > 12_000) {
      scope = scope.parentElement;
      continue;
    }

    const hasId = /id\s*[:#]?\s*\d{4,}/i.test(text);
    const hasStats = textHasLiveCardStats(text);
    const hasLiveWord = /\blive\b/i.test(text);

    if (hasId && (hasStats || (hasLiveWord && /viewers?|gifts?|diamonds?/i.test(text)))) {
      if (!isReplayOnlyScope(scope, text)) best = scope;
    }

    scope = scope.parentElement;
  }

  return best;
}

/**
 * Find LIVE creators by climbing from span[title=@handle] (Backstage puts the full handle here).
 * Each row uses only the anchor title as username — not other titles in the card (icons).
 */
export function extractLiveNowFromHandleTitles(
  doc: Document,
  buildRow: BuildRow,
): ParsedLiveRow[] {
  const rows: ParsedLiveRow[] = [];
  const seen = new Set<string>();

  for (const el of deepQueryAll(doc, "[title]")) {
    if (isInsideIconControl(el)) continue;
    if (isInsideBackstageChrome(el)) continue;

    const handle = handleFromRawText(el.getAttribute("title"));
    if (!handle || isInvalidLiveStreamHandle(handle) || isSuspiciousLiveHandle(handle)) continue;

    const key = normalizeTikTokUsername(handle) ?? handle;
    if (seen.has(key)) continue;

    let card = climbToLiveScopeFromHandle(el);
    if (!card) {
      let scope: Element | null = el.parentElement;
      for (let d = 0; d < 10 && scope; d += 1) {
        if (/id\s*[:#]?\s*\d{4,}/i.test(elementVisibleText(scope))) {
          card = scope;
          break;
        }
        scope = scope.parentElement;
      }
    }
    if (!card) continue;

    const parsed = buildRow(card, handle);
    if (!parsed) continue;

    seen.add(key);
    rows.push(parsed);
  }

  return rows;
}
