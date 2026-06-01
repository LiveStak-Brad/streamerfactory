import {
  cleanCreatorNetworkDisplayName,
  cleanCreatorNetworkUsername,
} from "@/lib/creator-network/clean-username";
import { getLeaderboardSupabase } from "@/lib/creator-network/leaderboard-db";
import { sanitizeLiveDaysForPeriod } from "@/lib/creator-network/stat-period";
import { isExcludedNetworkHandle } from "@/lib/members/network-exclusions";
import { periodBounds, toDateString } from "@/lib/rankings/periods";
import { normalizeHandle, resolveCanonicalHandle } from "@/lib/rankings/backstage-seed-data";
import { assignRanks, computeRankings } from "@/lib/rankings/scoring";
import type { ActivenessLevel, LeaderboardEntry } from "@/lib/rankings/types";
import type { LeaderboardImportLoad } from "@/lib/creator-network/leaderboard-from-import";

function backstageAvatarUrl(imported: string | null | undefined): string | null {
  const url = imported?.trim();
  if (!url || url.startsWith("data:") || url.startsWith("blob:")) return null;
  return url;
}

const STATS_PAGE_TYPES = ["creator_stats", "manage_relationship"] as const;

type ImportStatRow = {
  batch_id: string;
  batch_created_at: string;
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
  "batch_id, profile_id, tiktok_username, tiktok_username_raw, tiktok_display_name, stat_period_label, stat_period_start, stat_period_end, avatar_url, coins_earned, diamonds_earned, days_streamed, hours_streamed, activeness_level";

const IMPORT_BATCH_LIMIT = 60;

const ELITE_ORDER: ActivenessLevel[] = ["none", "low", "medium", "high", "elite"];

function diamondsForRow(row: ImportStatRow): number {
  return Math.max(0, row.diamonds_earned ?? 0, row.coins_earned ?? 0);
}

function displayHandle(row: ImportStatRow): string | null {
  const stored = row.tiktok_username?.trim();
  const raw = row.tiktok_username_raw?.trim();
  return (
    cleanCreatorNetworkUsername(stored) ??
    cleanCreatorNetworkUsername(raw) ??
    (stored || null)
  );
}

/** Skip old weekly-tab syncs so they are not double-counted as extra months. */
export function isMonthlyStatPeriodRow(row: ImportStatRow): boolean {
  if (row.stat_period_label && /\bweek(ly)?\b/i.test(row.stat_period_label)) return false;
  if (!row.stat_period_start || !row.stat_period_end) return true;
  const start = new Date(`${row.stat_period_start}T12:00:00Z`);
  const end = new Date(`${row.stat_period_end}T12:00:00Z`);
  const days = (end.getTime() - start.getTime()) / 86_400_000;
  return days >= 20;
}

function periodKeyForRow(row: ImportStatRow): string {
  if (row.stat_period_start && row.stat_period_end) {
    return `${row.stat_period_start}|${row.stat_period_end}`;
  }
  const d = new Date(row.batch_created_at);
  const { periodStart, periodEnd } = periodBounds("monthly", d);
  return `${periodStart}|${periodEnd}`;
}

function rowIsNewerThan(a: ImportStatRow, b: ImportStatRow): boolean {
  const tA = new Date(a.batch_created_at).getTime();
  const tB = new Date(b.batch_created_at).getTime();
  if (tA !== tB) return tA > tB;
  return diamondsForRow(a) >= diamondsForRow(b);
}

function maxActiveness(a: ActivenessLevel, b: ActivenessLevel): ActivenessLevel {
  return ELITE_ORDER.indexOf(a) >= ELITE_ORDER.indexOf(b) ? a : b;
}

async function loadImportStatRowsForAllTime(): Promise<ImportStatRow[]> {
  const supabase = await getLeaderboardSupabase();
  const { data: batches, error: batchErr } = await supabase
    .from("creator_network_import_batches")
    .select("id, created_at")
    .eq("status", "completed")
    .in("detected_page_type", [...STATS_PAGE_TYPES])
    .gt("accepted_rows_count", 0)
    .order("created_at", { ascending: false })
    .limit(IMPORT_BATCH_LIMIT);

  if (batchErr || !batches?.length) return [];

  const batchMeta = new Map(
    (batches as { id: string; created_at: string }[]).map((b) => [b.id, b.created_at]),
  );
  const batchIds = [...batchMeta.keys()];

  const { data: rows, error: rowsErr } = await supabase
    .from("creator_network_member_stats")
    .select(STAT_ROW_SELECT)
    .in("batch_id", batchIds);

  if (rowsErr || !rows?.length) return [];

  return (rows as Omit<ImportStatRow, "batch_created_at">[])
    .map((r) => ({
      ...r,
      batch_created_at: batchMeta.get(r.batch_id as string) ?? "",
    }))
    .filter((r) => r.batch_created_at);
}

export type AllTimeScoringRow = {
  profile_id: string;
  coins_earned: number;
  days_streamed: number;
  hours_streamed: number;
  activeness_level: ActivenessLevel;
  follower_count: number;
  follower_growth: number;
  battles_played: number;
  battles_won: number;
};

/**
 * Running all-time totals: for each creator and calendar month, use the latest sync,
 * then sum diamonds/days/hours across months (current month updates in place).
 */
export function aggregateAllTimeStatsFromImportRows(rows: ImportStatRow[]): Map<
  string,
  {
    row: ImportStatRow;
    handle: string;
    scoringId: string;
    coins_earned: number;
    days_streamed: number;
    hours_streamed: number;
    activeness_level: ActivenessLevel;
  }
> {
  const bestPerHandleMonth = new Map<string, Map<string, ImportStatRow>>();

  for (const raw of rows) {
    if (!isMonthlyStatPeriodRow(raw)) continue;
    const handle = displayHandle(raw);
    if (!handle) continue;
    const key = normalizeHandle(resolveCanonicalHandle(handle));
    if (isExcludedNetworkHandle(key)) continue;

    const monthKey = periodKeyForRow(raw);
    const byMonth = bestPerHandleMonth.get(key) ?? new Map<string, ImportStatRow>();
    const existing = byMonth.get(monthKey);
    byMonth.set(monthKey, existing && !rowIsNewerThan(raw, existing) ? existing : raw);
    bestPerHandleMonth.set(key, byMonth);
  }

  const totals = new Map<
    string,
    {
      row: ImportStatRow;
      handle: string;
      scoringId: string;
      coins_earned: number;
      days_streamed: number;
      hours_streamed: number;
      activeness_level: ActivenessLevel;
    }
  >();

  for (const [handle, byMonth] of bestPerHandleMonth) {
    let coins = 0;
    let days = 0;
    let hours = 0;
    let activeness: ActivenessLevel = "none";
    let latestRow: ImportStatRow | null = null;

    for (const row of byMonth.values()) {
      coins += diamondsForRow(row);
      days += sanitizeLiveDaysForPeriod(row.days_streamed);
      hours += Number(row.hours_streamed ?? 0);
      activeness = maxActiveness(activeness, (row.activeness_level ?? "none") as ActivenessLevel);
      if (!latestRow || rowIsNewerThan(row, latestRow)) latestRow = row;
    }

    if (!latestRow || coins < 1) continue;

    const scoringId = latestRow.profile_id ?? handle;
    totals.set(handle, {
      row: latestRow,
      handle,
      scoringId,
      coins_earned: coins,
      days_streamed: days,
      hours_streamed: Math.round(hours * 10) / 10,
      activeness_level: activeness,
    });
  }

  return totals;
}

/** Stats rows for admin recalculate / DB paths (profile UUIDs only). */
export async function getAllTimeScoringRowsFromImports(): Promise<AllTimeScoringRow[]> {
  const rows = await loadImportStatRowsForAllTime();
  const totals = aggregateAllTimeStatsFromImportRows(rows);
  const out: AllTimeScoringRow[] = [];

  for (const t of totals.values()) {
    if (!t.row.profile_id) continue;
    out.push({
      profile_id: t.row.profile_id,
      coins_earned: t.coins_earned,
      days_streamed: t.days_streamed,
      hours_streamed: t.hours_streamed,
      activeness_level: t.activeness_level,
      follower_count: 0,
      follower_growth: 0,
      battles_played: 0,
      battles_won: 0,
    });
  }

  return out;
}

export async function getLeaderboardFromAllTimeCreatorNetworkImports(): Promise<LeaderboardImportLoad | null> {
  const rows = await loadImportStatRowsForAllTime();
  if (!rows.length) return null;

  const totals = aggregateAllTimeStatsFromImportRows(rows);
  if (totals.size === 0) return null;

  const statsForScoring = [...totals.values()].map((t) => ({
    profile_id: t.scoringId,
    coins_earned: t.coins_earned,
    days_streamed: t.days_streamed,
    hours_streamed: t.hours_streamed,
    activeness_level: t.activeness_level,
    battles_played: 0,
    battles_won: 0,
  }));

  const ranked = assignRanks(computeRankings(statsForScoring));
  const totalsByScoringId = new Map([...totals.values()].map((t) => [t.scoringId, t]));

  const entries: LeaderboardEntry[] = [];
  for (const r of ranked) {
    const t = totalsByScoringId.get(r.profile_id);
    if (!t) continue;
    entries.push({
      profile_id: r.profile_id,
      email: null,
      tiktok_username: t.handle,
      avatar_url: backstageAvatarUrl(t.row.avatar_url),
      rank_position: r.rank_position,
      rank_score: r.rank_score,
      coins_rank: r.coins_rank,
      hours_rank: r.hours_rank,
      activity_rank: r.activity_rank,
      battle_rank: r.battle_rank,
      coins_earned: t.coins_earned,
      days_streamed: t.days_streamed,
      hours_streamed: t.hours_streamed,
      activeness_level: t.activeness_level,
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

  const latestBatchAt = rows.reduce((best, r) => {
    const t = new Date(r.batch_created_at).getTime();
    return t > best ? t : best;
  }, 0);

  return {
    entries: sorted,
    importedAt: latestBatchAt ? new Date(latestBatchAt).toISOString() : null,
    batchId: null,
    acceptedRowsCount: sorted.length,
    periodStart: "2000-01-01",
    periodEnd: toDateString(new Date()),
    statPeriodLabel: "All time (sum of monthly Backstage syncs)",
  };
}
