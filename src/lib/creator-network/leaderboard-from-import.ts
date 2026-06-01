import { getLeaderboardSupabase } from "@/lib/creator-network/leaderboard-db";
import { normalizeHandle, resolveCanonicalHandle } from "@/lib/rankings/backstage-seed-data";
import { assignRanks, computeRankings } from "@/lib/rankings/scoring";
import type { ActivenessLevel, LeaderboardEntry } from "@/lib/rankings/types";

const STATS_PAGE_TYPES = ["creator_stats", "manage_relationship"] as const;

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
  coins_earned: number;
  diamonds_earned: number;
  days_streamed: number;
  hours_streamed: number;
  activeness_level: string;
};

function diamondsForRow(row: ImportStatRow): number {
  return Math.max(0, row.diamonds_earned ?? 0, row.coins_earned ?? 0);
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
  /** Import saved but every row had 0 diamonds (parser issue). */
  emptyDiamonds?: boolean;
};

export async function getLeaderboardFromLatestCreatorNetworkImport(): Promise<LeaderboardImportLoad | null> {
  const supabase = await getLeaderboardSupabase();

  const { data: batches, error: batchErr } = await supabase
    .from("creator_network_import_batches")
    .select("id, created_at, accepted_rows_count")
    .eq("status", "completed")
    .in("detected_page_type", [...STATS_PAGE_TYPES])
    .gt("accepted_rows_count", 0)
    .order("created_at", { ascending: false })
    .limit(1);

  if (batchErr || !batches?.[0]) return null;

  const batch = batches[0] as { id: string; created_at: string; accepted_rows_count: number };

  const { data: rows, error: rowsErr } = await supabase
    .from("creator_network_member_stats")
    .select(
      "profile_id, tiktok_username, coins_earned, diamonds_earned, days_streamed, hours_streamed, activeness_level",
    )
    .eq("batch_id", batch.id);

  if (rowsErr || !rows?.length) return null;

  const byHandle = new Map<string, ImportStatRow>();
  for (const raw of rows as ImportStatRow[]) {
    const handle = raw.tiktok_username?.trim();
    if (!handle) continue;
    const key = normalizeHandle(resolveCanonicalHandle(handle));
    const existing = byHandle.get(key);
    if (!existing || diamondsForRow(raw) > diamondsForRow(existing)) {
      byHandle.set(key, raw);
    }
  }

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
  const statsForScoring = [...byHandle.entries()].map(([handle, row]) => {
    const scoringId = row.profile_id ?? handle;
    rowByScoringId.set(scoringId, row);
    return {
      profile_id: scoringId,
      coins_earned: diamondsForRow(row),
      days_streamed: row.days_streamed ?? 0,
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
    entries.push({
      profile_id: r.profile_id,
      email: null,
      tiktok_username: row.tiktok_username ?? r.profile_id,
      rank_position: r.rank_position,
      rank_score: r.rank_score,
      coins_rank: r.coins_rank,
      hours_rank: r.hours_rank,
      activity_rank: r.activity_rank,
      battle_rank: r.battle_rank,
      coins_earned: diamondsForRow(row),
      days_streamed: row.days_streamed ?? 0,
      hours_streamed: Number(row.hours_streamed ?? 0),
      activeness_level: (row.activeness_level ?? "none") as ActivenessLevel,
      follower_growth: 0,
      battles_played: 0,
      battles_won: 0,
    });
  }

  const sorted = entries
    .sort((a, b) => b.coins_earned - a.coins_earned)
    .map((e, index) => ({
      ...e,
      rank_position: index + 1,
      coins_rank: index + 1,
    }));

  return {
    entries: sorted,
    importedAt: batch.created_at,
    batchId: batch.id,
    acceptedRowsCount: batch.accepted_rows_count ?? sorted.length,
  };
}
