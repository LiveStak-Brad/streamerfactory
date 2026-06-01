import { isInvalidLiveStreamHandle, isSuspiciousLiveHandle } from "./live-username";
import { cleanTikTokUsername } from "./username";

const HANDLE_IN_TEXT = /@?([a-z0-9._]{2,24})/i;
const TRUNCATED_HANDLE = /^([a-z0-9._]{4,28})\.{2,3}$/i;
const PLAIN_HANDLE = /^@?([a-z0-9._]{2,24})$/i;

export function handleFromRawText(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 80) return undefined;

  const plain = trimmed.match(PLAIN_HANDLE);
  if (plain) {
    const u = cleanTikTokUsername(plain[1]);
    if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
  }

  const embedded = trimmed.match(HANDLE_IN_TEXT);
  if (embedded && trimmed.length <= 40) {
    const u = cleanTikTokUsername(embedded[1]);
    if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
  }

  return undefined;
}

function expandTruncatedPrefix(scope: Element, prefix: string): string | undefined {
  const key = prefix.toLowerCase().replace(/\.$/, "");
  if (key.length < 4) return undefined;

  const candidates: string[] = [];
  const push = (raw: string | null | undefined) => {
    const u = handleFromRawText(raw);
    if (u && u.startsWith(key) && u.length > key.length) candidates.push(u);
  };

  for (const el of scope.querySelectorAll("[title], [aria-label], [data-username], [data-user-name]")) {
    push(el.getAttribute("title"));
    push(el.getAttribute("aria-label"));
    push(el.getAttribute("data-username"));
    push(el.getAttribute("data-user-name"));
  }

  for (const el of scope.querySelectorAll(
    "[role='tooltip'], [class*='tooltip'], [class*='Tooltip'], [class*='popover'], [class*='Popover']",
  )) {
    push(el.textContent);
  }

  if (candidates.length === 0) return undefined;
  candidates.sort((a, b) => b.length - a.length);
  return candidates[0];
}

/**
 * Full @handle from Backstage LIVE card header — title tooltips, aria-label, data attrs.
 * (Truncated visible text is often "cj_allyca..." while title/tooltip has "cj_allycat93".)
 */
export function usernameFromLiveHeaderHints(scope: Element): string | undefined {
  const attrEls = scope.querySelectorAll(
    "[title], [aria-label], [data-username], [data-user-name], [data-nickname]",
  );
  for (const el of attrEls) {
    for (const attr of ["title", "aria-label", "data-username", "data-user-name", "data-nickname"] as const) {
      const u = handleFromRawText(el.getAttribute(attr));
      if (u) return u;
    }
  }

  for (const el of scope.querySelectorAll(
    "[role='tooltip'], [class*='tooltip'], [class*='Tooltip'], [class*='popover'], [class*='Popover']",
  )) {
    const u = handleFromRawText(el.textContent);
    if (u) return u;
  }

  for (const el of scope.querySelectorAll("[aria-describedby]")) {
    const id = el.getAttribute("aria-describedby");
    if (!id) continue;
    const doc = el.ownerDocument;
    const safeId = id.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1");
    const tip = doc?.getElementById(id) ?? scope.querySelector(`#${safeId}`);
    const u = handleFromRawText(tip?.textContent ?? tip?.getAttribute("title"));
    if (u) return u;
  }

  for (const line of (scope.textContent ?? "").split(/\n/).map((l) => l.trim())) {
    const trunc = line.match(TRUNCATED_HANDLE);
    if (!trunc) continue;
    const expanded = expandTruncatedPrefix(scope, trunc[1]);
    if (expanded) return expanded;
    const fromTitle = scope.querySelector(`[title="${trunc[1]}"], [title^="${trunc[1]}"]`);
    if (fromTitle) {
      const u = handleFromRawText(fromTitle.getAttribute("title"));
      if (u) return u;
    }
  }

  return undefined;
}
