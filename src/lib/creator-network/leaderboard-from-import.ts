import {
  cleanCreatorNetworkDisplayName,
  cleanCreatorNetworkUsername,
} from "@/lib/creator-network/clean-username";
import {
  isExcludedNetworkHandle,
  isKnownNetworkRosterHandle,
} from "@/lib/members/network-exclusions";
import { BACKSTAGE_HANDLE_ALIASES } from "@/lib/rankings/backstage-seed-data";
import { getLeaderboardSupabase } from "@/lib/creator-network/leaderboard-db";
import {
  importBatchMatchesRankingPeriod,
  inferPeriodKindFromLabel,
  periodKindForRanking,
  sanitizeLiveDaysForPeriod,
  type DetectedStatPeriodLabel,
  type StatPeriodKind,
} from "@/lib/creator-network/stat-period";
import { isCredibleImportedStatRow } from "@/lib/creator-network/stat-sanity";
import { periodBounds } from "@/lib/rankings/periods";
import { normalizeHandle, resolveCanonicalHandle } from "@/lib/rankings/backstage-seed-data";
import { assignRanks, computeRankings } from "@/lib/rankings/scoring";
import type { ActivenessLevel, LeaderboardEntry, RankingPeriod } from "@/lib/rankings/types";

const STATS_PAGE_TYPES = ["creator_stats"] as const;

export type CreatorNetworkSyncMeta = {
  importedAt: string;
  acceptedRows: number;
  batchId: string;
};

/** When the public leaderboard last changed (for “last synced” UI). */
export async function getLatestCreatorNetworkSyncMeta(): Promise<CreatorNetworkSyncMeta | null> {
  const supabase = await getLeaderboardSupabase();

  const { data: batches, error } = await supabase
    .from("creator_network_import_batches")
    .select("id, created_at, accepted_rows_count")
    .eq("status", "completed")
    .in("detected_page_type", [...STATS_PAGE_TYPES])
    .gt("accepted_rows_count", 0)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !batches?.[0]) return null;
  const b = batches[0] as { id: string; created_at: string; accepted_rows_count: number };
  return {
    batchId: b.id,
    importedAt: b.created_at,
    acceptedRows: b.accepted_rows_count,
  };
}

type ImportStatRow = {
  profile_id: string | null;
  tiktok_username: string | null;
  tiktok_username_raw: string | null;
  tiktok_display_name: string | null;
  stat_period_label: string | null;
  stat_period_start: string | null;
  stat_period_end: string | null;
  avatar_url: string | null;
  coins_earned: number;
  diamonds_earned: number;
  days_streamed: number;
  hours_streamed: number;
  activeness_level: string;
};

const STAT_ROW_SELECT =
  "profile_id, tiktok_username, tiktok_username_raw, tiktok_display_name, stat_period_label, stat_period_start, stat_period_end, avatar_url, coins_earned, diamonds_earned, days_streamed, hours_streamed, activeness_level";

export function backstageAvatarUrl(imported: string | null | undefined): string | null {
  const url = imported?.trim();
  if (!url || url.startsWith("data:") || url.startsWith("blob:")) return null;
  return url;
}

function diamondsForRow(row: ImportStatRow): number {
  const diamonds = Math.max(0, row.diamonds_earned ?? 0);
  const pick = diamonds > 0 ? diamonds : Math.max(0, row.coins_earned ?? 0);
  return isCredibleImportedStatRow(pick, row.hours_streamed, row.days_streamed) ? pick : 0;
}

function displayHandle(row: ImportStatRow): string | null {
  const stored = row.tiktok_username?.trim();
  const raw = row.tiktok_username_raw?.trim();
  return cleanCreatorNetworkUsername(stored) ?? cleanCreatorNetworkUsername(raw) ?? null;
}

function pickPreferredImportRow(a: ImportStatRow, b: ImportStatRow): ImportStatRow {
  const aPhoto = backstageAvatarUrl(a.avatar_url);
  const bPhoto = backstageAvatarUrl(b.avatar_url);
  if (aPhoto && !bPhoto) return a;
  if (bPhoto && !aPhoto) return b;
  return diamondsForRow(a) >= diamondsForRow(b) ? a : b;
}

type LoadedImportBatch = {
  batch: { id: string; created_at: string; accepted_rows_count: number };
  rows: ImportStatRow[];
};

type LoadImportOptions =
  | { mode: "any" }
  | { mode: "period"; periodKind: StatPeriodKind; anchor?: Date };

async function fetchRecentImportBatches(limit = 12) {
  const supabase = await getLeaderboardSupabase();
  const { data: batches, error: batchErr } = await supabase
    .from("creator_network_import_batches")
    .select("id, created_at, accepted_rows_count")
    .eq("status", "completed")
    .in("detected_page_type", [...STATS_PAGE_TYPES])
    .gt("accepted_rows_count", 0)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (batchErr || !batches?.length) return null;
  return batches as { id: string; created_at: string; accepted_rows_count: number }[];
}

async function loadImportStatRows(options: LoadImportOptions): Promise<LoadedImportBatch | null> {
  const batches = await fetchRecentImportBatches();
  if (!batches) return null;

  const supabase = await getLeaderboardSupabase();
  const periodKind = options.mode === "period" ? options.periodKind : null;
  const anchor = options.mode === "period" ? (options.anchor ?? new Date()) : null;
  const { periodStart, periodEnd } =
    periodKind && anchor ? periodBounds(periodKind, anchor) : { periodStart: "", periodEnd: "" };

  for (const batch of batches) {
    const { data: rows, error: rowsErr } = await supabase
      .from("creator_network_member_stats")
      .select(STAT_ROW_SELECT)
      .eq("batch_id", batch.id);

    if (rowsErr || !rows?.length) continue;

    const typed = rows as ImportStatRow[];
    if (options.mode === "any") {
      return { batch, rows: typed };
    }

    if (
      importBatchMatchesRankingPeriod(typed, periodKind!, periodStart, periodEnd, batch.created_at)
    ) {
      return { batch, rows: typed };
    }
  }

  return null;
}

/** Latest import batch (any period) — used for member directory avatars. */
async function loadLatestImportStatRows(): Promise<LoadedImportBatch | null> {
  return loadImportStatRows({ mode: "any" });
}

export type WrongPeriodImportHint = {
  requestedKind: StatPeriodKind;
  importLabel: string | null;
  importKind: DetectedStatPeriodLabel | null;
  importedAt: string;
};

/** True when the newest sync exists but is for the other period (e.g. Monthly data on Weekly tab). */
export async function getWrongPeriodImportHint(
  kind: StatPeriodKind,
): Promise<WrongPeriodImportHint | null> {
  const loaded = await loadLatestImportStatRows();
  if (!loaded?.rows.length) return null;

  const anchor = new Date();
  const { periodStart, periodEnd } = periodBounds(kind, anchor);
  if (
    importBatchMatchesRankingPeriod(
      loaded.rows,
      kind,
      periodStart,
      periodEnd,
      loaded.batch.created_at,
    )
  ) {
    return null;
  }

  const label = loaded.rows.find((r) => r.stat_period_label)?.stat_period_label ?? null;
  const importKind = inferPeriodKindFromLabel(label);

  return {
    requestedKind: kind,
    importLabel: label,
    importKind,
    importedAt: loaded.batch.created_at,
  };
}

/** Map handle → Backstage avatar URL from the newest import (any period). */
export async function getBackstageAvatarMapByHandle(): Promise<Map<string, string | null>> {
  const loaded = await loadLatestImportStatRows();
  const map = new Map<string, string | null>();
  if (!loaded) return map;

  for (const row of loaded.rows) {
    const url = backstageAvatarUrl(row.avatar_url);
    if (!url) continue;

    const candidates = new Set<string>();
    for (const raw of [row.tiktok_username, row.tiktok_username_raw, displayHandle(row)]) {
      if (!raw?.trim()) continue;
      const canonical = normalizeHandle(resolveCanonicalHandle(raw));
      if (isExcludedNetworkHandle(canonical)) continue;
      candidates.add(canonical);
      candidates.add(normalizeHandle(raw));
    }

    for (const key of candidates) {
      if (!map.has(key)) map.set(key, url);
    }
  }

  for (const [alias, canonical] of Object.entries(BACKSTAGE_HANDLE_ALIASES)) {
    const c = normalizeHandle(canonical);
    const url = map.get(c);
    if (url) {
      map.set(normalizeHandle(alias), url);
      map.set(c, url);
    }
  }

  return map;
}

function dedupeImportRowsByHandle(rows: ImportStatRow[]): Map<string, ImportStatRow> {
  const byHandle = new Map<string, ImportStatRow>();
  for (const raw of rows) {
    const handle = displayHandle(raw);
    if (!handle) continue;
    const key = normalizeHandle(resolveCanonicalHandle(handle));
    if (isExcludedNetworkHandle(key)) continue;
    const existing = byHandle.get(key);
    byHandle.set(key, existing ? pickPreferredImportRow(existing, raw) : raw);
  }
  return byHandle;
}

export type CreatorNetworkDirectoryMember = {
  username: string;
  displayName: string;
  avatar_url: string | null;
};

/** Member directory rows from the latest Creator Network import (all creators, not only ranked). */
export async function getDirectoryMembersFromLatestCreatorNetworkImport(): Promise<{
  members: CreatorNetworkDirectoryMember[];
  importedAt: string;
  batchId: string;
} | null> {
  const loaded = await loadLatestImportStatRows();
  if (!loaded) return null;

  const byHandle = dedupeImportRowsByHandle(loaded.rows);
  if (byHandle.size === 0) return null;

  const avatarMap = await getBackstageAvatarMapByHandle();

  const members: CreatorNetworkDirectoryMember[] = [];
  for (const [, row] of byHandle) {
    const handle = normalizeHandle(
      resolveCanonicalHandle(displayHandle(row) ?? row.tiktok_username ?? ""),
    );
    if (!handle || isExcludedNetworkHandle(handle)) continue;
    const display = cleanCreatorNetworkDisplayName(row.tiktok_display_name, handle);
    const avatar =
      backstageAvatarUrl(row.avatar_url) ?? avatarMap.get(handle) ?? null;
    members.push({
      username: handle,
      displayName: display || handle,
      avatar_url: avatar,
    });
  }

  members.sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: "base" }));

  return {
    members,
    importedAt: loaded.batch.created_at,
    batchId: loaded.batch.id,
  };
}

/**
 * Public leaderboard from the latest completed Creator Network stats import.
 * Uses service role so anonymous /rankings visitors see synced data (same as seed snapshot).
 */
export type LeaderboardImportLoad = {
  entries: LeaderboardEntry[];
  importedAt: string | null;
  batchId: string | null;
  acceptedRowsCount: number;
  periodStart?: string | null;
  periodEnd?: string | null;
  statPeriodLabel?: string | null;
  /** Import saved but every row had 0 diamonds (parser issue). */
  emptyDiamonds?: boolean;
};

export async function getLeaderboardFromLatestCreatorNetworkImport(
  kind: RankingPeriod = "monthly",
  anchorDate?: string,
): Promise<LeaderboardImportLoad | null> {
  const periodKind = periodKindForRanking(kind);
  const anchor = anchorDate ? new Date(`${anchorDate}T12:00:00Z`) : new Date();
  const loaded = periodKind
    ? await loadImportStatRows({ mode: "period", periodKind, anchor })
    : await loadLatestImportStatRows();
  if (!loaded) return null;

  const { batch, rows } = loaded;

  const byHandle = dedupeImportRowsByHandle(rows);

  if (byHandle.size === 0) return null;

  const maxDiamonds = Math.max(0, ...[...byHandle.values()].map(diamondsForRow));
  if (maxDiamonds < 1) {
    return {
      entries: [],
      importedAt: batch.created_at,
      batchId: batch.id,
      acceptedRowsCount: batch.accepted_rows_count ?? 0,
      emptyDiamonds: true,
    };
  }

  const rowByScoringId = new Map<string, ImportStatRow>();
  const statsForScoring = [...byHandle.entries()].map(([, row]) => {
    const handle = normalizeHandle(
      resolveCanonicalHandle(displayHandle(row) ?? row.tiktok_username ?? ""),
    );
    const scoringId = row.profile_id ?? handle;
    rowByScoringId.set(scoringId, row);
    return {
      profile_id: scoringId,
      coins_earned: diamondsForRow(row),
      days_streamed: sanitizeLiveDaysForPeriod(row.days_streamed),
      hours_streamed: Number(row.hours_streamed ?? 0),
      activeness_level: (row.activeness_level ?? "none") as ActivenessLevel,
      battles_played: 0,
      battles_won: 0,
    };
  });

  const ranked = assignRanks(computeRankings(statsForScoring));

  const entries: LeaderboardEntry[] = [];
  for (const r of ranked) {
    const row = rowByScoringId.get(r.profile_id);
    if (!row) continue;
    const cleanedHandle = normalizeHandle(
      resolveCanonicalHandle(displayHandle(row) ?? row.tiktok_username ?? r.profile_id),
    );
    entries.push({
      profile_id: r.profile_id,
      email: null,
      tiktok_username: cleanedHandle,
      avatar_url: backstageAvatarUrl(row.avatar_url),
      rank_position: r.rank_position,
      rank_score: r.rank_score,
      coins_rank: r.coins_rank,
      hours_rank: r.hours_rank,
      activity_rank: r.activity_rank,
      battle_rank: r.battle_rank,
      coins_earned: diamondsForRow(row),
      days_streamed: sanitizeLiveDaysForPeriod(row.days_streamed),
      hours_streamed: Number(row.hours_streamed ?? 0),
      activeness_level: (row.activeness_level ?? "none") as ActivenessLevel,
      follower_growth: 0,
      battles_played: 0,
      battles_won: 0,
    });
  }

  const sorted = entries
    .filter((e) => {
      const h = e.tiktok_username ?? "";
      return isKnownNetworkRosterHandle(h) && !isExcludedNetworkHandle(h);
    })
    .sort((a, b) => b.coins_earned - a.coins_earned)
    .map((e, index) => ({
      ...e,
      rank_position: index + 1,
      coins_rank: index + 1,
    }));

  const periodLabel = [...byHandle.values()].find((r) => r.stat_period_label)?.stat_period_label ?? null;
  const periodStart =
    [...byHandle.values()].find((r) => r.stat_period_start)?.stat_period_start ?? null;
  const periodEnd = [...byHandle.values()].find((r) => r.stat_period_end)?.stat_period_end ?? null;

  return {
    entries: sorted,
    importedAt: batch.created_at,
    batchId: batch.id,
    acceptedRowsCount: batch.accepted_rows_count ?? sorted.length,
    periodStart,
    periodEnd,
    statPeriodLabel: periodLabel,
  };
}
