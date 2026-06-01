import { avatarFromRow } from "./avatar";
import { elementClassText } from "./dom";
import { dataRowsInContainer, findCreatorContributionGrid } from "./gridTable";
import {
  creatorCellShowsLive,
  imgHasLiveIndicator,
  isChatCommentLine,
  isLikelyChatOverlay,
} from "./live-badge";
import { handleFromRawText, usernameFromLiveHeaderHints } from "./live-header-hints";
import { isInvalidLiveStreamHandle, isSuspiciousLiveHandle } from "./live-username";
import type { ParsedLiveRow } from "./types";
import { cleanTikTokUsername, normalizeTikTokUsername } from "./username";

const DOC_POS_FOLLOWING = 4;
const DOC_POS_PRECEDING = 2;

function isPageChromeText(text: string): boolean {
  const t = text.trim().toLowerCase();
  if (t.length < 8) return true;
  if (/^promote their live/i.test(t)) return true;
  if (/^showing\s+\d+-\d+\s+of\s+\d+/i.test(t)) return true;
  if (t === "live now" || t === "live") return true;
  return false;
}

const LIVE_STAT_LINE = /live\s*(?:time|dur(?:ation)?)|diamonds?|gifts?|gifters?|new\s*viewers?|viewers?/i;

/** Backstage LIVE cards: "LIVE time/dur" + diamonds (labels vary). */
function cardHasLiveStats(text: string): boolean {
  const hasDuration = /live\s*(?:time|dur(?:ation)?)/i.test(text);
  const hasEarnings = /diamonds?|gifts?/i.test(text);
  const hasAudience = /(?:new\s*)?viewers?|watching|current/i.test(text);
  return hasDuration && hasEarnings && hasAudience;
}

/** Looser check for climbing from title/stat nodes to a stream card. */
function isLiveStreamScope(text: string): boolean {
  const t = text.trim();
  if (t.length < 20 || t.length > 5000) return false;
  return /live\s*(?:time|dur(?:ation)?)/i.test(t) && /diamonds?|gifts?/i.test(t);
}

/** Prefer the tightest card wrapper (parent of stats strip, not whole page). */
function dedupeToSmallestLiveCards(elements: Element[]): Element[] {
  const sorted = [...elements].sort(
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

function liveCardRoot(el: Element): Element {
  const text = (el.textContent ?? "").trim();
  const headerText = cardHeaderText(text);
  if (cardHasCreatorHeader(el, headerText)) return el;
  const parent = el.parentElement;
  if (parent) {
    const pt = (parent.textContent ?? "").trim();
    if (cardHasLiveStats(pt) && cardHasCreatorHeader(parent, cardHeaderText(pt))) {
      return parent;
    }
  }
  return el;
}

function cardHasCreatorHeader(el: Element, headerText: string): boolean {
  if (/id\s*\d{4,}/i.test(headerText)) return true;
  if (usernameFromLinks(el)) return true;
  for (const img of el.querySelectorAll("img[src]")) {
    if (!isStreamPreviewImage(img, el)) return true;
  }
  return /^@?[a-z0-9._]{2,}/i.test(headerText.split(/\n/)[0] ?? "");
}

function compareDocumentOrder(a: Element, b: Element): number {
  const pos = a.compareDocumentPosition(b);
  if (pos & DOC_POS_FOLLOWING) return -1;
  if (pos & DOC_POS_PRECEDING) return 1;
  return 0;
}

function dedupeNested(elements: Element[]): Element[] {
  const sorted = [...elements].sort(compareDocumentOrder);
  const kept: Element[] = [];
  for (const el of sorted) {
    if (kept.some((k) => k.contains(el) && k !== el)) continue;
    if (kept.some((k) => el.contains(k) && k !== el)) {
      const idx = kept.findIndex((k) => el.contains(k));
      if (idx >= 0) kept[idx] = el;
      continue;
    }
    kept.push(el);
  }
  return kept;
}

function imagePixelArea(img: Element): number {
  const w = parseInt(img.getAttribute("width") ?? "", 10);
  const h = parseInt(img.getAttribute("height") ?? "", 10);
  if (!Number.isNaN(w) && !Number.isNaN(h) && w > 0 && h > 0) return w * h;
  return 0;
}

function isStreamPreviewImage(img: Element, cardRoot?: Element | null): boolean {
  const cls = `${elementClassText(img)} ${elementClassText(img.parentElement ?? img)}`.toLowerCase();
  if (/preview|cover|video|player|stream|thumb|room/i.test(cls)) return true;

  const w = parseInt(img.getAttribute("width") ?? "", 10);
  const h = parseInt(img.getAttribute("height") ?? "", 10);
  if (!Number.isNaN(w) && w > 100) return true;
  if (!Number.isNaN(h) && h > 100) return true;

  const root = cardRoot ?? img.closest("li, article, section, div");
  if (root) {
    const imgs = [...root.querySelectorAll("img[src]")].filter((i) => {
      const src = i.getAttribute("src") ?? "";
      return src && !src.startsWith("data:");
    });
    if (imgs.length >= 2) {
      const areas = imgs.map(imagePixelArea);
      const max = Math.max(...areas);
      const mine = imagePixelArea(img);
      if (max > 0 && mine === max && max >= 12_000) return true;
    }
  }

  return false;
}

function liveBadgeImagesIn(root: Document | Element): Element[] {
  const imgs: Element[] = [];
  for (const img of root.querySelectorAll("img[src]")) {
    const src = img.getAttribute("src") ?? "";
    if (!src || src.startsWith("data:") || src.includes("emoji")) continue;
    if (isStreamPreviewImage(img)) continue;
    if (imgHasLiveIndicator(img)) imgs.push(img);
  }
  return imgs;
}

function climbToLiveCard(img: Element): Element | null {
  let el: Element | null = img.parentElement;
  for (let depth = 0; depth < 12 && el; depth += 1) {
    if (isLikelyChatOverlay(el)) {
      el = el.parentElement;
      continue;
    }
    const text = (el.textContent ?? "").trim();
    if (
      text.length >= 30 &&
      text.length <= 2800 &&
      cardHasLiveStats(text) &&
      !isPageChromeText(text)
    ) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

function findLiveCardsByStatsPanel(doc: Document): Element[] {
  const roots: Element[] = [];

  for (const el of doc.querySelectorAll("div, section, article, li, span")) {
    const text = (el.textContent ?? "").trim();
    if (text.length < 15 || text.length > 900) continue;
    if (!/live\s*(?:time|dur(?:ation)?)/i.test(text)) continue;
    if (!/diamonds?|gifts?/i.test(text)) continue;

    let scope: Element | null = el;
    for (let depth = 0; depth < 12 && scope; depth += 1) {
      const block = (scope.textContent ?? "").trim();
      if (isLiveStreamScope(block) && scope.querySelector("img[src]")) {
        roots.push(scope);
        break;
      }
      scope = scope.parentElement;
    }
  }

  return roots;
}

/**
 * Primary LIVE now strategy: title="cj_allycat93" on truncated name, stats in ancestor.
 */
function extractLiveNowFromTitleAnchors(doc: Document): ParsedLiveRow[] {
  const rows: ParsedLiveRow[] = [];

  for (const el of doc.querySelectorAll("[title], [aria-label]")) {
    const username =
      handleFromRawText(el.getAttribute("title")) ??
      handleFromRawText(el.getAttribute("aria-label"));
    if (!username) continue;

    let scope: Element | null = el;
    let card: Element | null = null;
    for (let depth = 0; depth < 18 && scope; depth += 1) {
      const block = (scope.textContent ?? "").trim();
      if (isLiveStreamScope(block)) {
        card = scope;
        break;
      }
      scope = scope.parentElement;
    }
    if (!card) continue;

    const parsed = buildLiveRowFromScope(card, username);
    if (parsed) rows.push(parsed);
  }

  return rows;
}

function countChatLines(text: string): number {
  return text.split(/\n/).filter((l) => isChatCommentLine(l.trim())).length;
}

/** Cards anchored on LIVE-ring avatars, stats panels, or @handle/live links (not chat). */
function findLiveCreatorCards(doc: Document): Element[] {
  const roots: Element[] = [];

  for (const img of liveBadgeImagesIn(doc)) {
    const card = climbToLiveCard(img);
    if (card) roots.push(card);
  }

  roots.push(...findLiveCardsByStatsPanel(doc));

  for (const a of doc.querySelectorAll('a[href*="/live"], a[href*="LiveRoom"], a[href*="live_room"]')) {
    const href = a.getAttribute("href") ?? "";
    if (!/@[a-z0-9._]+/i.test(href) && !/live/i.test(href)) continue;
    let el: Element | null = a;
    for (let depth = 0; depth < 12 && el; depth += 1) {
      const text = (el.textContent ?? "").trim();
      if (
        text.length >= 30 &&
        cardHasLiveStats(text) &&
        !isPageChromeText(text) &&
        !isLikelyChatOverlay(el)
      ) {
        roots.push(el);
        break;
      }
      el = el.parentElement;
    }
  }

  return dedupeToSmallestLiveCards(roots);
}

/** Text above the stats grid — excludes in-stream chat. */
function cardHeaderText(fullText: string): string {
  const idx = fullText.search(/live\s*(?:time|dur(?:ation)?)/i);
  if (idx > 20) return fullText.slice(0, idx).trim();
  const idx2 = fullText.search(/\b(?:diamonds?|gifts?)\b/i);
  if (idx2 > 20) return fullText.slice(0, idx2).trim();
  const lines = fullText.split(/\n/).map((l) => l.trim()).filter(Boolean);
  const headerLines: string[] = [];
  for (const line of lines) {
    if (isChatCommentLine(line)) break;
    if (LIVE_STAT_LINE.test(line) && /live\s*(?:time|dur)/i.test(line)) break;
    if (LIVE_STAT_LINE.test(line) && headerLines.length > 2) break;
    headerLines.push(line);
    if (headerLines.length >= 8) break;
  }
  if (headerLines.length) return headerLines.join("\n");
  return fullText.slice(0, Math.min(fullText.length, 400)).trim();
}

function streamCardHeaderElement(card: Element): Element | null {
  for (const img of card.querySelectorAll("img[src]")) {
    if (isStreamPreviewImage(img, card)) continue;
    const header =
      img.closest(
        '[class*="header"], [class*="Header"], [class*="info"], [class*="creator"], [class*="anchor"]',
      ) ?? img.parentElement?.parentElement;
    if (header && !isLikelyChatOverlay(header)) return header;
  }
  return null;
}

/** Username from card header only — never from chat overlay text. */
function usernameFromStreamCard(card: Element, headerText: string): string | undefined {
  const headerEl = streamCardHeaderElement(card);
  const scope = headerEl ?? card;
  const scopeText = (headerEl?.textContent ?? headerText).slice(0, 350);

  const fromHints = usernameFromLiveHeaderHints(scope);
  if (fromHints && !isSuspiciousLiveHandle(fromHints)) return fromHints;

  const fromLink = usernameFromLinks(scope);
  if (fromLink && !isSuspiciousLiveHandle(fromLink)) return fromLink;

  for (const img of scope.querySelectorAll("img[alt]")) {
    if (isStreamPreviewImage(img, card)) continue;
    const alt = cleanTikTokUsername(img.getAttribute("alt"));
    if (alt && !isInvalidLiveStreamHandle(alt) && !isSuspiciousLiveHandle(alt)) return alt;
  }

  for (const line of scopeText.split(/\n/).map((l) => l.trim()).filter(Boolean)) {
    if (isChatCommentLine(line)) continue;
    if (/^id\s*\d/i.test(line)) continue;
    if (LIVE_STAT_LINE.test(line)) continue;

    const truncated = line.match(/^([a-z0-9._]{2,28})\.{2,3}$/i);
    if (truncated) {
      const expanded = usernameFromLiveHeaderHints(scope);
      if (expanded && expanded.startsWith(truncated[1].toLowerCase().replace(/\.$/, ""))) {
        return expanded;
      }
      const u = cleanTikTokUsername(truncated[1]);
      if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
    }

    const at = line.match(/^@([a-z0-9._]{2,28})/i);
    if (at) {
      const u = cleanTikTokUsername(at[1]);
      if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
    }

    if (/^[a-z0-9._]{2,28}$/i.test(line)) {
      const u = cleanTikTokUsername(line);
      if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
    }
  }

  return undefined;
}

function avatarFrom(el: Element): string | undefined {
  for (const img of el.querySelectorAll("img[src]")) {
    if (isStreamPreviewImage(img, el)) continue;
    if (imgHasLiveIndicator(img)) {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("data:")) return src;
    }
  }
  return avatarFromRow(el);
}

function displayNameFrom(el: Element, headerText: string): string | undefined {
  for (const img of el.querySelectorAll("img[alt]")) {
    if (isStreamPreviewImage(img, el)) continue;
    const alt = img.getAttribute("alt")?.trim();
    if (alt && alt.length > 1 && alt.length < 80 && !/^level\s*\d/i.test(alt)) {
      const asHandle = cleanTikTokUsername(alt);
      if (!asHandle || asHandle !== alt.replace(/\s+/g, "").toLowerCase()) return alt;
    }
  }
  for (const line of headerText.split(/\n/).map((l) => l.trim()).filter(Boolean)) {
    if (isChatCommentLine(line)) continue;
    if (/^id\s*\d/i.test(line)) continue;
    if (line.startsWith("@")) continue;
    if (line.length > 3 && line.length < 64 && !/live|diamond|viewer|gifter/i.test(line)) {
      return line;
    }
  }
  return undefined;
}

function usernameFromLinks(el: Element, scope?: Element): string | undefined {
  const root = scope ?? el;
  for (const a of root.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href") ?? "";
    const m = href.match(/tiktok\.com\/@([a-z0-9._]+)/i);
    if (m) {
      const u = cleanTikTokUsername(m[1]);
      if (u && !isInvalidLiveStreamHandle(u)) return u;
    }
  }
  return undefined;
}

function usernameFromHeader(el: Element, headerText: string, displayName?: string): string | undefined {
  const fromCard = usernameFromStreamCard(el, headerText);
  if (fromCard) return fromCard;

  const inferred = cleanTikTokUsername(displayName);
  if (inferred && !isInvalidLiveStreamHandle(inferred) && !isSuspiciousLiveHandle(inferred)) {
    return inferred;
  }

  return undefined;
}

function parseStatValue(text: string, label: RegExp): string | undefined {
  const m = text.match(
    new RegExp(
      `${label.source}\\s*[:.\\s]*([\\d,.]+\\s*[kmb]?|\\d+\\s*[hm](?:\\s*\\d+\\s*m)?)`,
      "i",
    ),
  );
  if (m?.[1]) return m[1].trim();
  return undefined;
}

function buildLiveRowFromScope(card: Element, username: string): ParsedLiveRow | null {
  if (!username || isSuspiciousLiveHandle(username)) return null;

  const text = (card.textContent ?? "").trim();
  if (!text || !isLiveStreamScope(text)) return null;

  const headerText = cardHeaderText(text);
  const displayName = displayNameFrom(card, headerText);

  const liveDuration =
    parseStatValue(text, /live\s*(?:time|dur(?:ation)?)\.?\.?/) ??
    text.match(/live\s*(?:time|dur(?:ation)?)\.?\s*(\d+\s*[hm](?:\s*\d+\s*m)?)/i)?.[1]?.trim();
  const diamonds =
    parseStatValue(text, /diamonds?/) ?? parseStatValue(text, /gifts?/);
  const viewers = parseStatValue(text, /viewers?(?!\s*count)/);
  const watching =
    parseStatValue(text, /current\.?\.?/) ??
    text.match(/(\d+)\s*(?:watching|viewers?\s*now)/i)?.[1];

  let viewerCountText: string | undefined;
  const parts: string[] = [];
  if (watching) parts.push(`${watching} watching now`);
  if (viewers) parts.push(`${viewers} viewers`);
  if (diamonds) parts.push(`${diamonds} diamonds`);
  if (parts.length) viewerCountText = parts.join(" · ");

  const badgeSeen = liveBadgeImagesIn(card).length > 0 || !!usernameFromLinks(card);

  return {
    tiktokUsername: username,
    usernameConfidence: "high",
    usernameSource: "username_column",
    displayName: displayName ?? undefined,
    avatarUrl: avatarFrom(card),
    viewerCountText,
    liveStartedText: liveDuration ?? undefined,
    liveBadgeDetected: badgeSeen,
    rawTextPreview: headerText.slice(0, 200),
  };
}

function parseLiveCard(el: Element): ParsedLiveRow | null {
  if (isLikelyChatOverlay(el)) return null;

  const text = (el.textContent ?? "").trim();
  if (!text || isPageChromeText(text) || !cardHasLiveStats(text)) return null;
  if (!el.querySelector("img[src]")) return null;

  const headerText = cardHeaderText(text);
  const displayName = displayNameFrom(el, headerText);
  const username = usernameFromStreamCard(el, headerText) ?? usernameFromHeader(el, headerText, displayName);
  if (!username) return null;

  return buildLiveRowFromScope(el, username);
}

function dedupeLive(rows: ParsedLiveRow[]): ParsedLiveRow[] {
  const seen = new Set<string>();
  const out: ParsedLiveRow[] = [];
  for (const r of rows) {
    const key = normalizeTikTokUsername(r.tiktokUsername) ?? "";
    if (!key || seen.has(key) || isInvalidLiveStreamHandle(key) || isSuspiciousLiveHandle(key)) {
      continue;
    }
    seen.add(key);
    out.push(r);
  }
  return out;
}

/** Extract visible LIVE now creators from backstage LIVE page DOM. */
export function extractLiveNowRowsFromPage(doc: Document = document): ParsedLiveRow[] {
  const rows: ParsedLiveRow[] = [];

  rows.push(...extractLiveNowFromTitleAnchors(doc));

  const cards = findLiveCreatorCards(doc);
  for (const el of cards) {
    const parsed = parseLiveCard(liveCardRoot(el));
    if (parsed) rows.push(parsed);
  }

  if (rows.length === 0) {
    rows.push(...extractLiveNowFromInnerText(doc));
  }

  return dedupeLive(rows);
}

/** Last resort: page innerText blocks (header line + ID + LIVE dur stats). */
function extractLiveNowFromInnerText(doc: Document): ParsedLiveRow[] {
  const text = doc.body?.innerText ?? "";
  if (!/live\s*dur/i.test(text) && !/live\s*time/i.test(text)) return [];

  const rows: ParsedLiveRow[] = [];
  const chunks = text.split(/(?=\n\s*LIVE\s*(?:time|dur))/i);

  for (const chunk of chunks) {
    if (!/live\s*(?:time|dur)/i.test(chunk)) continue;

    const headerPart = chunk.split(/LIVE\s*(?:time|dur)/i)[0] ?? "";
    let username: string | undefined;

    for (const line of headerPart.split(/\n/).map((l) => l.trim()).filter(Boolean)) {
      if (isChatCommentLine(line) || /^id\s*\d/i.test(line)) continue;
      const fromDom = doc.querySelector(`[title="${line}"], [title^="${line.replace(/\.\.\.$/, "")}"]`);
      if (fromDom) {
        username = handleFromRawText(fromDom.getAttribute("title"));
        if (username) break;
      }
      const trunc = line.match(/^([a-z0-9._]{2,28})\.{2,3}$/i);
      if (trunc) {
        username = handleFromRawText(
          doc.querySelector(`[title^="${trunc[1]}"]`)?.getAttribute("title"),
        );
        if (username) break;
      }
    }

    if (!username) {
      const at = headerPart.match(/@([a-z0-9._]{2,24})/i);
      if (at) username = cleanTikTokUsername(at[1]);
    }
    if (!username || isSuspiciousLiveHandle(username)) continue;

    const liveDuration =
      chunk.match(/live\s*(?:time|dur)\.?\s*(\d+\s*[hm])/i)?.[1]?.trim();
    const diamonds = chunk.match(/diamonds?\s*(\d+)/i)?.[1];
    const viewers = chunk.match(/viewers?\s*(\d+)/i)?.[1];
    const parts: string[] = [];
    if (viewers) parts.push(`${viewers} viewers`);
    if (diamonds) parts.push(`${diamonds} diamonds`);

    rows.push({
      tiktokUsername: username,
      usernameConfidence: "high",
      usernameSource: "username_column",
      viewerCountText: parts.length ? parts.join(" · ") : undefined,
      liveStartedText: liveDuration,
      liveBadgeDetected: false,
      rawTextPreview: headerPart.slice(0, 120),
    });
  }

  return rows;
}

function creatorTableRows(doc: Document): Element[] {
  const grid = findCreatorContributionGrid(doc);
  if (grid) {
    const rows = dataRowsInContainer(grid);
    if (rows.length > 0) return rows;
  }

  const gridRows = Array.from(doc.querySelectorAll('[role="row"]')).filter(
    (el) =>
      !el.querySelector('[role="columnheader"]') &&
      (el.querySelector('[role="cell"]') || el.querySelector("td")) &&
      (el.textContent?.length ?? 0) > 15,
  );
  const fromTable = Array.from(doc.querySelectorAll("table tbody tr")).filter(
    (tr) => (tr.textContent?.length ?? 0) > 15,
  );
  if (gridRows.length >= Math.max(fromTable.length, 1)) return gridRows;
  return fromTable;
}

/**
 * Creators with LIVE ring on avatar in stats / manage-relationship tables —
 * sync live status from the same page as monthly stats.
 */
export function extractLiveRowsFromCreatorTable(doc: Document = document): ParsedLiveRow[] {
  const rows: ParsedLiveRow[] = [];

  for (const row of creatorTableRows(doc)) {
    const creatorCell = row.querySelector('[role="cell"], td') ?? row;
    const avatarImg = Array.from(creatorCell.querySelectorAll("img[src]")).find(
      (img) => !isStreamPreviewImage(img),
    );
    if (!avatarImg || !creatorCellShowsLive(creatorCell)) continue;

    const cellText = (creatorCell.textContent ?? "").trim();
    const displayName = displayNameFrom(creatorCell, cellText);
    const username = usernameFromHeader(creatorCell, cellText, displayName);
    if (!username) continue;

    rows.push({
      tiktokUsername: username,
      usernameConfidence: "high",
      usernameSource: "username_column",
      displayName: displayName ?? undefined,
      avatarUrl: avatarFromRow(creatorCell) ?? avatarFrom(creatorCell),
      liveBadgeDetected: true,
      rawTextPreview: cellText.slice(0, 200),
    });
  }

  return dedupeLive(rows);
}
