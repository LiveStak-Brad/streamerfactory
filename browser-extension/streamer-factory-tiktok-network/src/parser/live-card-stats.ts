/** Visible text from DOM (innerText in browser, textContent in tests). */
export function elementVisibleText(el: Element): string {
  const html = el as HTMLElement;
  return (html.innerText ?? el.textContent ?? "").trim();
}

/** Whether a block looks like a Backstage LIVE stream preview + stats strip. */
export function textHasLiveCardStats(text: string): boolean {
  const t = text.trim();
  if (t.length < 12) return false;

  const hasLive =
    /live\s*(?:time|dur(?:ation)?)/i.test(t) ||
    /\blive\b[^\n]{0,24}\d+\s*[hms]\b/i.test(t);
  const hasEarnings = /diamonds?|gifts?|coins?\s*earned/i.test(t);
  const hasAudience = /viewers?|watching|current\s*viewers?|audience/i.test(t);

  return hasLive && hasEarnings && hasAudience;
}
