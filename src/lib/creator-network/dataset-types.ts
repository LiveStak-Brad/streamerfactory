/**
 * Canonical dataset / page types for Creator Network sync (Phase 1A).
 * Legacy aliases (creator_stats, manage_relationship) are accepted and normalized.
 */

export const DATASET_TYPES = [
  "activity_incentive",
  "rank_up_incentive",
  "incremental_incentive",
  "creator_roster",
  "live_now",
  "workspace_metrics",
  "unknown",
] as const;

export type DatasetType = (typeof DATASET_TYPES)[number];

/** Legacy extension page types still accepted on the wire. */
export const LEGACY_PAGE_TYPE_ALIASES: Record<string, DatasetType> = {
  creator_stats: "activity_incentive",
  manage_relationship: "creator_roster",
};

export function normalizeDatasetType(raw: string | undefined | null): DatasetType {
  if (!raw) return "unknown";
  const t = raw.trim();
  if ((DATASET_TYPES as readonly string[]).includes(t)) return t as DatasetType;
  if (t in LEGACY_PAGE_TYPE_ALIASES) return LEGACY_PAGE_TYPE_ALIASES[t]!;
  return "unknown";
}

export function isDatasetType(raw: string): raw is DatasetType {
  return (DATASET_TYPES as readonly string[]).includes(raw);
}

/** Which datasets may write to which stores. */
export const DATASET_WRITE_TARGETS = {
  activity_incentive: ["member_stats", "performance_stats"] as const,
  rank_up_incentive: ["rank_up_stats"] as const,
  incremental_incentive: ["incremental_stats"] as const,
  creator_roster: ["roster_entries"] as const,
  live_now: ["live_snapshots"] as const,
  workspace_metrics: [] as const,
  unknown: [] as const,
} as const;

export const PARSER_VERSION = "1a.1";
