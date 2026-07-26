import { deepQueryAll } from "./dom-deep";
import { elementClassText } from "./dom";
import { elementVisibleText } from "./live-card-stats";
import { isChatCommentLine, isLikelyChatOverlay } from "./live-badge";
import { isInsideBackstageChrome } from "./live-stream-card";

const DOC_POS_FOLLOWING = 4;

const AT_TRUNCATED_LINE =
  /^@([_]?[a-z0-9][a-z0-9._]{1,26})(?:…|\.{2,3}|\u2026)\s*$/i;

/** In-stream chat, danmaku, or video preview — not the card header username. */
export function isInsideStreamChatOrVideo(el: Element): boolean {
  if (isLikelyChatOverlay(el)) return true;
  if (
    el.closest(
      '[class*="chat"], [class*="Chat"], [class*="comment"], [class*="Comment"], [class*="message"], [class*="Message"], [class*="danmaku"], [class*="im-"], [class*="player"], [class*="Player"], [class*="video"], [class*="Video"], [class*="preview"], [class*="Preview"], video, canvas',
    )
  ) {
    return true;
  }
  const cls = elementClassText(el).toLowerCase();
  return /chat|comment|message|danmaku|bullet|player|preview|stream-room/i.test(cls);
}

function isLargePreviewMedia(el: Element): boolean {
  const tag = el.tagName.toLowerCase();
  if (tag !== "img" && tag !== "video" && tag !== "canvas") return false;
  const w = parseInt(el.getAttribute("width") ?? "", 10);
  const h = parseInt(el.getAttribute("height") ?? "", 10);
  if (!Number.isNaN(w) && w >= 100) return true;
  if (!Number.isNaN(h) && h >= 100) return true;
  const cls = elementClassText(el).toLowerCase();
  return /preview|cover|player|stream/i.test(cls);
}

function previewCountIn(el: Element): number {
  return [...el.querySelectorAll("img[src], video, canvas")].filter(isLargePreviewMedia).length;
}

/** Tile wrapper has Creator ID or a header @handle outside the chat/video subtree. */
function scopeQualifiesAsStreamTile(scope: Element): boolean {
  const text = elementVisibleText(scope);
  if (/(?:creator\s*)?id\s*[:#]?\s*\d{4,}/i.test(text)) return true;

  for (const el of scope.querySelectorAll("span, a, p")) {
    const line = (el.textContent ?? "").trim();
    if (!AT_TRUNCATED_LINE.test(line)) continue;
    if (isInsideStreamChatOrVideo(el)) continue;
    return true;
  }

  return false;
}

function climbToStreamTile(from: Element): Element | null {
  let scope: Element | null = from;
  let best: Element | null = null;
  let bestLen = Infinity;

  for (let depth = 0; depth < 16 && scope; depth += 1) {
    if (isInsideBackstageChrome(scope)) break;

    const text = elementVisibleText(scope);
    if (text.length < 20 || text.length > 6000) {
      scope = scope.parentElement;
      continue;
    }

    const previews = previewCountIn(scope);
    if (previews === 1 && scopeQualifiesAsStreamTile(scope)) {
      if (text.length < bestLen) {
        best = scope;
        bestLen = text.length;
      }
    }
    if (previews >= 2) break;

    scope = scope.parentElement;
  }

  return best;
}

function compareDocumentOrder(a: Element, b: Element): number {
  const pos = a.compareDocumentPosition(b);
  if (pos & DOC_POS_FOLLOWING) return -1;
  return 1;
}

/** One card per LIVE stream preview on the grid. */
export function findLiveStreamTiles(doc: Document): Element[] {
  const roots: Element[] = [];

  for (const media of deepQueryAll(doc, "img[src], video, canvas")) {
    if (!isLargePreviewMedia(media)) continue;
    const tile = climbToStreamTile(media);
    if (tile) roots.push(tile);
  }

  const sorted = [...roots].sort(
    (a, b) => (a.textContent?.length ?? 0) - (b.textContent?.length ?? 0),
  );
  const kept: Element[] = [];
  for (const el of sorted) {
    const contained = kept.findIndex((k) => el.contains(k) && k !== el);
    if (contained >= 0) {
      kept[contained] = el;
      continue;
    }
    if (kept.some((k) => k.contains(el) && k !== el)) continue;
    kept.push(el);
  }

  return kept.sort(compareDocumentOrder);
}

/** Header @handle must sit above/outside the video preview, not in chat lines. */
export function isStreamCardHeaderHandle(handleEl: Element, tile: Element): boolean {
  if (isInsideStreamChatOrVideo(handleEl)) return false;
  if (tile.contains(handleEl) === false) return false;

  const preview = [...tile.querySelectorAll("img[src], video, canvas")].find(isLargePreviewMedia);
  if (!preview) return !isLikelyChatOverlay(handleEl);

  if (preview.contains(handleEl)) return false;

  const pos = handleEl.compareDocumentPosition(preview);
  if (pos & DOC_POS_FOLLOWING) return true;

  const headerSlice = elementVisibleText(tile).split(/\n/).slice(0, 6).join("\n");
  const handleText = (handleEl.textContent ?? "").trim();
  if (headerSlice.includes(handleText) && !isChatCommentLine(handleText)) return true;

  return false;
}
