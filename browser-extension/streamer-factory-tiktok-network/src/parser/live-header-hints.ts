import { isLikelyUsernameHintElement, titleElementsWithHandles } from "./live-hint-elements";
import {
  isTruncatedHandleVisible,
  truncatedHandlePrefix,
} from "./live-handle-patterns";
import { handleFromRawText } from "./live-handle-text";

export { handleFromRawText } from "./live-handle-text";

function hintElementsInOrder(scope: Element): Element[] {
  const priority: Element[] = [];
  const rest: Element[] = [];

  for (const el of scope.querySelectorAll(
    "[title], [data-username], [data-user-name], [data-nickname]",
  )) {
    if (!isLikelyUsernameHintElement(el)) continue;
    const bucket =
      el.matches('a[href*="@"]') || isTruncatedHandleVisible((el.textContent ?? "").trim())
        ? priority
        : rest;
    bucket.push(el);
  }

  for (const el of titleElementsWithHandles(scope)) {
    if (!priority.includes(el) && !rest.includes(el)) priority.push(el);
  }

  return [...priority, ...rest];
}

function expandTruncatedPrefix(scope: Element, prefix: string): string | undefined {
  const key = prefix.toLowerCase().replace(/\.$/, "");
  if (key.length < 4) return undefined;

  const candidates: string[] = [];
  const push = (raw: string | null | undefined) => {
    const u = handleFromRawText(raw);
    if (u && u.startsWith(key) && u.length > key.length) candidates.push(u);
  };

  for (const el of hintElementsInOrder(scope)) {
    push(el.getAttribute("title"));
    push(el.getAttribute("data-username"));
    push(el.getAttribute("data-user-name"));
    push(el.getAttribute("data-nickname"));
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
 * Full @handle from Backstage LIVE card — title on truncated name, data attrs, tooltips.
 * Skips icon button titles (chevron_down, previous, …).
 */
export function usernameFromLiveHeaderHints(scope: Element): string | undefined {
  for (const el of hintElementsInOrder(scope)) {
    for (const attr of ["title", "data-username", "data-user-name", "data-nickname"] as const) {
      const u = handleFromRawText(el.getAttribute(attr));
      if (u) return u;
    }
  }

  for (const el of titleElementsWithHandles(scope)) {
    const u = handleFromRawText(el.getAttribute("title"));
    if (u) return u;
  }

  for (const el of scope.querySelectorAll(
    "[role='tooltip'], [class*='tooltip'], [class*='Tooltip'], [class*='popover'], [class*='Popover']",
  )) {
    const u = handleFromRawText(el.textContent);
    if (u) return u;
  }

  for (const el of scope.querySelectorAll("[aria-describedby]")) {
    if (!isLikelyUsernameHintElement(el)) continue;
    const id = el.getAttribute("aria-describedby");
    if (!id) continue;
    const doc = el.ownerDocument;
    const safeId = id.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1");
    const tip = doc?.getElementById(id) ?? scope.querySelector(`#${safeId}`);
    const u = handleFromRawText(tip?.textContent ?? tip?.getAttribute("title"));
    if (u) return u;
  }

  for (const line of (scope.textContent ?? "").split(/\n/).map((l) => l.trim())) {
    const prefix = truncatedHandlePrefix(line);
    if (!prefix) continue;
    const expanded = expandTruncatedPrefix(scope, prefix);
    if (expanded) return expanded;
    for (const el of titleElementsWithHandles(scope)) {
      const title = el.getAttribute("title");
      if (!title?.toLowerCase().startsWith(prefix.replace(/\.$/, ""))) continue;
      const u = handleFromRawText(title);
      if (u) return u;
    }
  }

  return undefined;
}
