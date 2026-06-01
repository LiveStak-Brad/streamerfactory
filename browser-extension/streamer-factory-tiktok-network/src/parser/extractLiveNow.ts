import { avatarFromRow } from "./avatar";
import { elementClassText } from "./dom";
import { dataRowsInContainer, findCreatorContributionGrid } from "./gridTable";
import { imgHasLiveIndicator, isChatCommentLine, isLikelyChatOverlay } from "./live-badge";
import { isInvalidLiveStreamHandle } from "./live-username";
import type { ParsedLiveRow } from "./types";
import { cleanTikTokUsername, extractUsernameWithConfidence, normalizeTikTokUsername } from "./username";

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

/** Backstage LIVE cards use "LIVE duration" + "Gifts" (not always "Diamonds") + viewers. */
function cardHasLiveStats(text: string): boolean {
  const hasDuration = /live\s*(?:dur(?:ation)?)?/i.test(text);
  const hasEarnings = /diamonds?|gifts?/i.test(text);
  const hasAudience = /viewers?|watching|current\s*viewers?/i.test(text);
  return hasDuration && hasEarnings && hasAudience;
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
  const candidates = doc.querySelectorAll("div, li, article, section");

  for (const el of candidates) {
    const text = (el.textContent ?? "").trim();
    if (text.length < 40 || text.length > 2800) continue;
    if (!cardHasLiveStats(text) || isPageChromeText(text) || isLikelyChatOverlay(el)) continue;
    if (!el.querySelector("img[src]")) continue;

    const headerText = cardHeaderText(text);
    if (!cardHasCreatorHeader(el, headerText)) continue;

    roots.push(el);
  }

  return roots;
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

  return dedupeNested(roots);
}

/** Text above the stats grid — excludes in-stream chat. */
function cardHeaderText(fullText: string): string {
  const idx = fullText.search(/live\s*(?:dur(?:ation)?)?\.?/i);
  if (idx > 20) return fullText.slice(0, idx).trim();
  const idx2 = fullText.search(/\b(?:diamonds?|gifts?)\b/i);
  if (idx2 > 20) return fullText.slice(0, idx2).trim();
  return fullText.slice(0, Math.min(fullText.length, 500)).trim();
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
  const headerRoot =
    el.querySelector('[class*="header"], [class*="Header"], [class*="creator-info"]') ?? el;

  const fromLink = usernameFromLinks(el, headerRoot);
  if (fromLink) return fromLink;

  for (const img of headerRoot.querySelectorAll("img[alt]")) {
    if (isStreamPreviewImage(img, el)) continue;
    const alt = cleanTikTokUsername(img.getAttribute("alt"));
    if (alt && !isInvalidLiveStreamHandle(alt)) return alt;
  }

  const lines = headerText
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const usable = lines.filter((line) => {
    if (isChatCommentLine(line)) return false;
    if (/^id\s*\d/i.test(line)) return false;
    if (/live\s*dur|diamonds?|gifters?|viewers?|current|new\s*foll|promote|showing/i.test(line)) {
      return false;
    }
    return line.length <= 48;
  });

  for (const line of usable) {
    const at = line.match(/^@([a-z0-9._]{2,40})/i);
    if (at) {
      const u = cleanTikTokUsername(at[1]);
      if (u && !isInvalidLiveStreamHandle(u)) return u;
    }
  }

  for (const line of usable) {
    const candidate = extractUsernameWithConfidence(line, {
      fromUsernameColumn: true,
      displayName,
    });
    if (candidate.username && !isInvalidLiveStreamHandle(candidate.username)) {
      return candidate.username;
    }
  }

  const inferred = cleanTikTokUsername(displayName);
  if (inferred && !isInvalidLiveStreamHandle(inferred)) return inferred;

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

function parseLiveCard(el: Element): ParsedLiveRow | null {
  if (isLikelyChatOverlay(el)) return null;

  const text = (el.textContent ?? "").trim();
  if (!text || isPageChromeText(text) || !cardHasLiveStats(text)) return null;
  if (!el.querySelector("img[src]")) return null;

  const headerText = cardHeaderText(text);
  const displayName = displayNameFrom(el, headerText);
  const username = usernameFromHeader(el, headerText, displayName);
  if (!username) return null;

  const liveDuration =
    parseStatValue(text, /live\s*(?:dur(?:ation)?)?\.?\.?/) ??
    text.match(/live\s*(?:dur(?:ation)?)?\.?\.?\s*(\d+\s*[hm](?:\s*\d+\s*m)?)/i)?.[1]?.trim();
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

  const badgeSeen = liveBadgeImagesIn(el).length > 0 || !!usernameFromLinks(el);

  return {
    tiktokUsername: username,
    usernameConfidence: "high",
    usernameSource: "username_column",
    displayName: displayName ?? undefined,
    avatarUrl: avatarFrom(el),
    viewerCountText,
    liveStartedText: liveDuration ?? undefined,
    liveBadgeDetected: badgeSeen,
    rawTextPreview: headerText.slice(0, 200),
  };
}

function dedupeLive(rows: ParsedLiveRow[]): ParsedLiveRow[] {
  const seen = new Set<string>();
  const out: ParsedLiveRow[] = [];
  for (const r of rows) {
    const key = normalizeTikTokUsername(r.tiktokUsername) ?? "";
    if (!key || seen.has(key) || isInvalidLiveStreamHandle(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}

/** Extract visible LIVE now creators from backstage LIVE page DOM. */
export function extractLiveNowRowsFromPage(doc: Document = document): ParsedLiveRow[] {
  const cards = findLiveCreatorCards(doc);
  const rows: ParsedLiveRow[] = [];
  for (const el of cards) {
    const parsed = parseLiveCard(el);
    if (parsed) rows.push(parsed);
  }
  return dedupeLive(rows);
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
    if (!avatarImg || !imgHasLiveIndicator(avatarImg)) continue;

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
