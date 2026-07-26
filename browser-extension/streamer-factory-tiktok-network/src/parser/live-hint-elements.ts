import { deepQueryAll, isNodeInside } from "./dom-deep";
import { elementClassText } from "./dom";
import { handleFromRawText } from "./live-handle-text";
import { isTruncatedHandleVisible } from "./live-handle-patterns";

export function isInsideIconControl(el: Element): boolean {
  return !!el.closest('button, [role="button"], [role="menuitem"], [role="option"], svg');
}

/** Skip icon buttons; accept spans/links whose title is a real handle. */
export function isLikelyUsernameHintElement(el: Element): boolean {
  if (isInsideIconControl(el)) return false;

  const tag = el.tagName.toLowerCase();
  if (tag === "svg" || tag === "path" || tag === "use" || tag === "button") return false;

  const title = el.getAttribute("title")?.trim() ?? "";
  if (title && handleFromRawText(title)) return true;

  const cls = elementClassText(el).toLowerCase();
  if (/semi-icon|chevron|icon-btn|player-btn|replay-btn/i.test(cls)) return false;

  if (el.matches('a[href*="@"]')) return true;
  if (isTruncatedHandleVisible((el.textContent ?? "").trim())) return true;

  const parentCls = elementClassText(el.parentElement ?? el).toLowerCase();
  if (/creator|username|user-?name|handle|anchor|nickname|display-?name/i.test(cls + parentCls)) {
    return true;
  }

  return false;
}

/** Any non-button element in scope with a valid handle in title (includes shadow DOM). */
export function titleElementsWithHandles(scope: Element | Document): Element[] {
  const out: Element[] = [];
  const doc =
    (scope as Document).nodeType === 9 ? (scope as Document) : scope.ownerDocument ?? document;
  const candidates = deepQueryAll(doc, "[title]").filter((el) => isNodeInside(el, scope));

  const seen = new Set<Element>();
  for (const el of candidates) {
    if (seen.has(el)) continue;
    seen.add(el);
    if (isInsideIconControl(el)) continue;
    const title = el.getAttribute("title")?.trim();
    if (title && handleFromRawText(title)) out.push(el);
  }
  return out;
}
