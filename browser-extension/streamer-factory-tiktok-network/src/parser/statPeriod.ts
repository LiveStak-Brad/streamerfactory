/** UTC period bounds aligned with site rankings (Monday week start). */
function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function startOfWeekMonday(d: Date): Date {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = x.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  x.setUTCDate(x.getUTCDate() + diff);
  return x;
}

import { elementLooksSelected } from "./dom";

export type StatPeriodKind = "weekly" | "monthly";

export function inferPeriodKindFromLabel(label: string | undefined): StatPeriodKind | undefined {
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
    if (/\bweek/.test(t)) return "weekly";
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
  kind: StatPeriodKind,
  anchor: Date = new Date(),
): { start: string; end: string } {
  if (kind === "monthly") {
    const start = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth(), 1));
    const end = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() + 1, 0));
    return { start: toDateString(start), end: toDateString(end) };
  }
  const start = startOfWeekMonday(anchor);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
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
  const tabKind = readActiveStatPeriodKind(doc);
  const labelKind = inferPeriodKindFromLabel(label);
  const kind = tabKind ?? labelKind;
  const parsed = readStatPeriodBounds(doc);
  const bounds = parsed ?? (kind ? defaultBoundsForKind(kind) : undefined);

  const statPeriodLabel =
    label ??
    (kind ? `Contribution details · ${kind === "weekly" ? "Weekly" : "Monthly"}` : undefined);

  return {
    statPeriodLabel,
    statPeriodKind: kind,
    statPeriodStart: bounds?.start,
    statPeriodEnd: bounds?.end,
  };
}
