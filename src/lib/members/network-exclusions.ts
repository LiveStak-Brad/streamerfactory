import { normalizeHandle, resolveCanonicalHandle } from "@/lib/rankings/backstage-seed-data";

/** Banned or removed — never show on /members, /rankings, or imports. */
const EXCLUDED_HANDLES = new Set(
  ["tricioxv3", "triciaxv3", "trikloxy3"].map((h) => normalizeHandle(h)),
);

export function isExcludedNetworkHandle(handle: string | null | undefined): boolean {
  if (!handle?.trim()) return false;
  const canonical = normalizeHandle(resolveCanonicalHandle(handle));
  return EXCLUDED_HANDLES.has(canonical);
}
