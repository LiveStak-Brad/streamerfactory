/** UTC period bounds aligned with site rankings (calendar month). */
function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

import { elementLooksSelected } from "./dom";

/** Site rankings use monthly only — extension always syncs as monthly. */
export type StatPeriodKind = "monthly";

/** Label detection (weekly labels are ignored for sync bounds). */
export function inferPeriodKindFromLabel(label: string | undefined): "weekly" | "monthly" | undefined {
  if (!label?.trim()) return undefined;
  const t = label.toLowerCase();
  if (/\bmonth(ly)?\b/.test(t)) return "monthly";
  if (/\bweek(ly)?\b/.test(t)) return "weekly";
  return undefined;
}

export function readActiveStatPeriodKind(doc: Document): StatPeriodKind | undefined {
  if (typeof doc.querySelectorAll !== "function") return undefined;
  const tabs = Array.from(doc.querySelectorAll('[role="tab"], [class*="tab"]'));
  for (const tab of tabs) {
    if (!elementLooksSelected(tab)) continue;
    const t = (tab.textContent ?? "").toLowerCase();
    if (/\bmonth/.test(t)) return "monthly";
  }
  return undefined;
}

/** Parse visible Backstage date range (e.g. 2025-05-25 – 2025-05-31). */
export function readStatPeriodBounds(doc: Document): { start: string; end: string } | undefined {
  const text = (doc.body?.innerText ?? doc.body?.textContent ?? "").slice(0, 12_000);
  const iso = text.match(/(\d{4}-\d{2}-\d{2})\s*[–—\-]\s*(\d{4}-\d{2}-\d{2})/);
  if (iso) return { start: iso[1], end: iso[2] };

  const us = text.match(
    /(\d{1,2})\/(\d{1,2})\/(\d{4})\s*[–—\-]\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/,
  );
  if (us) {
    const start = `${us[3]}-${us[1].padStart(2, "0")}-${us[2].padStart(2, "0")}`;
    const end = `${us[6]}-${us[4].padStart(2, "0")}-${us[5].padStart(2, "0")}`;
    return { start, end };
  }

  return undefined;
}

export function defaultBoundsForKind(
  kind: StatPeriodKind = "monthly",
  anchor: Date = new Date(),
): { start: string; end: string } {
  const start = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth(), 1));
  const end = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() + 1, 0));
  return { start: toDateString(start), end: toDateString(end) };
}

export function resolveStatPeriodForSync(
  doc: Document,
  label: string | undefined,
): {
  statPeriodLabel?: string;
  statPeriodKind?: StatPeriodKind;
  statPeriodStart?: string;
  statPeriodEnd?: string;
} {
  const parsed = readStatPeriodBounds(doc);
  const monthBounds = defaultBoundsForKind("monthly");
  const bounds =
    parsed &&
    parsed.start.slice(0, 7) === monthBounds.start.slice(0, 7) &&
    parsed.end.slice(0, 7) === monthBounds.end.slice(0, 7)
      ? parsed
      : monthBounds;

  const statPeriodLabel =
    label && /\bmonth/i.test(label)
      ? label
      : "Contribution details · Monthly";

  return {
    statPeriodLabel,
    statPeriodKind: "monthly",
    statPeriodStart: bounds.start,
    statPeriodEnd: bounds.end,
  };
}
