import { elementClassText } from "./dom";
import { isChatCommentLine } from "./live-badge";
import { elementVisibleText, textHasLiveCardStats } from "./live-card-stats";
import { titleElementsWithHandles } from "./live-hint-elements";

/** Filter bar, nav, and Semi selects — not stream preview cards. */
export function isInsideBackstageChrome(el: Element): boolean {
  if (
    el.closest(
      'nav, header, aside, form, [role="combobox"], [role="listbox"], [role="menu"], select, [class*="semi-select"]',
    )
  ) {
    return true;
  }
  const cls = elementClassText(el).toLowerCase();
  if (/filter-bar|filterbar|page-filter|toolbar|sidebar|combobox|dropdown-menu|select-option/i.test(cls)) {
    return true;
  }
  return false;
}

export function isLiveStreamScope(text: string): boolean {
  const t = text.trim();
  if (t.length < 20 || t.length > 12_000) return false;
  return textHasLiveCardStats(t);
}

function countMatches(text: string, re: RegExp): number {
  return (text.match(re) ?? []).length;
}

function cardHeaderSlice(text: string): string {
  const idx = text.search(/live\s*(?:time|dur(?:ation)?)/i);
  return idx > 20 ? text.slice(0, idx) : text.slice(0, Math.min(text.length, 600));
}

/** One creator card = stats strip + creator header (not whole page or filter row). */
export function looksLikeSingleLiveStreamCard(card: Element): boolean {
  if (isInsideBackstageChrome(card)) return false;

  const text = elementVisibleText(card);
  if (!isLiveStreamScope(text)) return false;
  if (isPageFilterLabelBlob(text)) return false;
  if (isReplayControlCard(card, text)) return false;

  const header = cardHeaderSlice(text);
  const idCount = countMatches(header, /id\s*\d{4,}/gi);
  if (idCount > 2) return false;
  if (idCount === 0 && titleElementsWithHandles(card).length === 0) return false;

  const liveStatCount = countMatches(text, /live\s*(?:time|dur(?:ation)?)/gi);
  if (liveStatCount < 1 || liveStatCount > 4) return false;

  if (!/(?:diamonds?|gifts?)\b/i.test(text)) return false;
  if (!/(?:viewers?|watching|current\s*viewers?)/i.test(text)) return false;

  const imgs = [...card.querySelectorAll("img[src]")].filter((img) => {
    const src = img.getAttribute("src") ?? "";
    return src && !src.startsWith("data:");
  });
  if (imgs.length === 0 && titleElementsWithHandles(card).length === 0) return false;

  return true;
}

function isPageFilterLabelBlob(text: string): boolean {
  const lower = text.toLowerCase();
  if (/creator\s+username|creator\s+id|graduation\s+status|tier\s+status|manager/i.test(lower)) {
    return true;
  }
  if (/^promote their live/i.test(lower)) return true;
  if (/^showing\s+\d+-\d+\s+of\s+\d+/i.test(lower) && !/id\s*\d{4,}/i.test(lower)) return true;
  return false;
}

/** Replay carousel tiles have stats but no creator handle in header. */
function isReplayControlCard(card: Element, text: string): boolean {
  if (titleElementsWithHandles(card).length > 0) return false;
  if (card.querySelector('a[href*="@"]')) return false;

  const header = cardHeaderSlice(text).trim();
  const headerLines = header.split(/\n/).map((l) => l.trim()).filter(Boolean);
  const replayOnly =
    headerLines.length > 0 &&
    headerLines.every((l) => /^replay$/i.test(l) || /^id\s*\d+$/i.test(l));
  return replayOnly || /^replay$/im.test(header);
}

export function cardChatLineCount(card: Element): number {
  const text = card.textContent ?? "";
  return text.split(/\n/).filter((l) => isChatCommentLine(l.trim())).length;
}
