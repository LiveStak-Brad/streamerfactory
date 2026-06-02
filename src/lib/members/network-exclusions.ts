import { normalizeHandle, resolveCanonicalHandle } from "@/lib/rankings/backstage-seed-data";

/** Banned or removed — never show on /members, /rankings, or imports. */
const EXCLUDED_HANDLES = new Set(
  ["tricioxv3", "triciaxv3", "trikloxy3"].map((h) => normalizeHandle(h)),
);

/**
 * TikTok Backstage summary rows (network totals, filters) — not individual creators.
 * e.g. "No group" → @nogroup with combined diamonds for everyone.
 */
const AGGREGATE_BACKSTAGE_HANDLES = new Set(
  [
    "nogroup",
    "no_group",
    "no-group",
    "effective",
    "all",
    "total",
    "summary",
    "aggregate",
    "ungrouped",
    "network_total",
  ].map((h) => normalizeHandle(h)),
);

export function isAggregateBackstageHandle(handle: string | null | undefined): boolean {
  if (!handle?.trim()) return false;
  const canonical = normalizeHandle(resolveCanonicalHandle(handle));
  if (AGGREGATE_BACKSTAGE_HANDLES.has(canonical)) return true;
  if (/^no_?group$/i.test(canonical)) return true;
  return false;
}

export function isExcludedNetworkHandle(handle: string | null | undefined): boolean {
  if (!handle?.trim()) return false;
  const canonical = normalizeHandle(resolveCanonicalHandle(handle));
  if (isAggregateBackstageHandle(canonical)) return true;
  return EXCLUDED_HANDLES.has(canonical);
}
