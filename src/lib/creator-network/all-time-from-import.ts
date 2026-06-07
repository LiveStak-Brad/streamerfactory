import {
  cleanCreatorNetworkUsername,
} from "@/lib/creator-network/clean-username";
import { getLeaderboardSupabase } from "@/lib/creator-network/leaderboard-db";
import { sanitizeLiveDaysForPeriod } from "@/lib/creator-network/stat-period";
import {
  isCredibleAllTimeImportTotal,
  isCredibleImportedStatRow,
} from "@/lib/creator-network/stat-sanity";
import { isExcludedNetworkHandle } from "@/lib/members/network-exclusions";
import {
  BACKSTAGE_STAT_SEEDS,
  normalizeHandle,
  resolveCanonicalHandle,
} from "@/lib/rankings/backstage-seed-data";
import { periodBounds, toDateString } from "@/lib/rankings/periods";
import { assignRanks, computeRankings } from "@/lib/rankings/scoring";
import type { ActivenessLevel, LeaderboardEntry } from "@/lib/rankings/types";
import type { LeaderboardImportLoad } from "@/lib/creator-network/leaderboard-from-import";

function backstageAvatarUrl(imported: string | null | undefined): string | null {
  const url = imported?.trim();
  if (!url || url.startsWith("data:") || url.startsWith("blob:")) return null;
  return url;
}

/** Only the Creator performance / Incentives stats table — not relationship or other tabs. */
const STATS_PAGE_TYPES = ["creator_stats"] as const;

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

export type AllTimeHandleTotals = {
  row: ImportStatRow | null;
  handle: string;
  scoringId: string;
  coins_earned: number;
  days_streamed: number;
  hours_streamed: number;
  activeness_level: ActivenessLevel;
};

const STAT_ROW_SELECT =
  "batch_id, profile_id, tiktok_username, tiktok_username_raw, tiktok_display_name, stat_period_label, stat_period_start, stat_period_end, avatar_url, coins_earned, diamonds_earned, days_streamed, hours_streamed, activeness_level";

const IMPORT_BATCH_LIMIT = 60;

const ELITE_ORDER: ActivenessLevel[] = ["none", "low", "medium", "high", "elite"];

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

/** Calendar month for bucketing (YYYY-MM). */
function calendarMonthKey(row: ImportStatRow): string {
  const dateStr =
    row.stat_period_start?.slice(0, 10) ??
    row.batch_created_at.slice(0, 10);
  return dateStr.slice(0, 7);
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

function getSeedBaselinesByHandle(): Map<
  string,
  {
    diamondsEarned: number;
    validLiveDays: number;
    hoursStreamed: number;
    activeness: ActivenessLevel;
  }
> {
  const map = new Map<
    string,
    {
      diamondsEarned: number;
      validLiveDays: number;
      hoursStreamed: number;
      activeness: ActivenessLevel;
    }
  >();
  for (const seed of BACKSTAGE_STAT_SEEDS) {
    const handle = normalizeHandle(resolveCanonicalHandle(seed.handle));
    if (isExcludedNetworkHandle(handle)) continue;
    map.set(handle, {
      diamondsEarned: seed.diamondsEarned,
      validLiveDays: seed.validLiveDays,
      hoursStreamed: seed.hoursStreamed,
      activeness: seed.activeness,
    });
  }
  return map;
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

/**
 * Sum of latest sync per calendar month (weekly + monthly syncs bucket into YYYY-MM).
 */
export function aggregateImportMonthsByHandle(
  rows: ImportStatRow[],
): Map<string, Omit<AllTimeHandleTotals, "scoringId"> & { scoringId?: string }> {
  const bestPerHandleMonth = new Map<string, Map<string, ImportStatRow>>();

  for (const raw of rows) {
    if (diamondsForRow(raw) < 1) continue;
    const handle = displayHandle(raw);
    if (!handle) continue;
    const key = normalizeHandle(resolveCanonicalHandle(handle));
    if (isExcludedNetworkHandle(key)) continue;

    const monthKey = calendarMonthKey(raw);
    const byMonth = bestPerHandleMonth.get(key) ?? new Map<string, ImportStatRow>();
    const existing = byMonth.get(monthKey);
    byMonth.set(monthKey, existing && !rowIsNewerThan(raw, existing) ? existing : raw);
    bestPerHandleMonth.set(key, byMonth);
  }

  const totals = new Map<string, Omit<AllTimeHandleTotals, "scoringId">>();

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

    if (!latestRow) continue;

    totals.set(handle, {
      row: latestRow,
      handle,
      coins_earned: coins,
      days_streamed: days,
      hours_streamed: Math.round(hours * 10) / 10,
      activeness_level: activeness,
    });
  }

  return totals;
}

/**
 * All-time: credible sum of monthly imports, or opening roster snapshot when imports are junk/missing.
 * Uses max(seed, imports) when imports are credible (extra months), never seed + import double-count.
 */
export function mergeAllTimeWithSeedBaselines(
  fromImports: Map<string, Omit<AllTimeHandleTotals, "scoringId"> & { scoringId?: string }>,
): Map<string, AllTimeHandleTotals> {
  const seeds = getSeedBaselinesByHandle();
  const handles = new Set([...fromImports.keys(), ...seeds.keys()]);
  const merged = new Map<string, AllTimeHandleTotals>();

  for (const handle of handles) {
    const imp = fromImports.get(handle);
    const seed = seeds.get(handle);
    const scoringId = imp?.row?.profile_id ?? handle;
    const importCoins = imp?.coins_earned ?? 0;
    const seedCoins = seed?.diamondsEarned ?? 0;
    const credibleImport = isCredibleAllTimeImportTotal(
      importCoins,
      seedCoins,
      imp?.hours_streamed,
      imp?.days_streamed,
    );

    const coins_earned = credibleImport
      ? Math.max(seedCoins, importCoins)
      : seedCoins > 0
        ? seedCoins
        : importCoins;

    const useImportActivity = credibleImport && importCoins >= seedCoins;

    merged.set(handle, {
      row: imp?.row ?? null,
      handle,
      scoringId,
      coins_earned,
      days_streamed: useImportActivity
        ? (imp?.days_streamed ?? 0)
        : Math.max(imp?.days_streamed ?? 0, seed?.validLiveDays ?? 0),
      hours_streamed: useImportActivity
        ? (imp?.hours_streamed ?? 0)
        : Math.max(imp?.hours_streamed ?? 0, seed?.hoursStreamed ?? 0),
      activeness_level: maxActiveness(
        imp?.activeness_level ?? "none",
        seed?.activeness ?? "none",
      ),
    });
  }

  return merged;
}

/** @deprecated Use aggregateImportMonthsByHandle + mergeAllTimeWithSeedBaselines */
export function aggregateAllTimeStatsFromImportRows(rows: ImportStatRow[]): Map<
  string,
  AllTimeHandleTotals
> {
  return mergeAllTimeWithSeedBaselines(aggregateImportMonthsByHandle(rows));
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

export async function buildAllTimeTotalsByHandle(): Promise<Map<string, AllTimeHandleTotals>> {
  const rows = await loadImportStatRowsForAllTime();
  const fromImports = aggregateImportMonthsByHandle(rows);
  return mergeAllTimeWithSeedBaselines(fromImports);
}

/** Stats rows for admin recalculate (profile UUIDs only). */
export async function getAllTimeScoringRowsFromImports(): Promise<AllTimeScoringRow[]> {
  const totals = await buildAllTimeTotalsByHandle();
  const out: AllTimeScoringRow[] = [];

  for (const t of totals.values()) {
    if (!t.row?.profile_id) continue;
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
  const totals = mergeAllTimeWithSeedBaselines(aggregateImportMonthsByHandle(rows));

  const withDiamonds = [...totals.values()].filter((t) => t.coins_earned >= 1);
  if (withDiamonds.length === 0) return null;

  const statsForScoring = withDiamonds.map((t) => ({
    profile_id: t.scoringId,
    coins_earned: t.coins_earned,
    days_streamed: t.days_streamed,
    hours_streamed: t.hours_streamed,
    activeness_level: t.activeness_level,
    battles_played: 0,
    battles_won: 0,
  }));

  const ranked = assignRanks(computeRankings(statsForScoring));
  const totalsByScoringId = new Map(withDiamonds.map((t) => [t.scoringId, t]));

  const entries: LeaderboardEntry[] = [];
  for (const r of ranked) {
    const t = totalsByScoringId.get(r.profile_id);
    if (!t) continue;
    entries.push({
      profile_id: r.profile_id,
      email: null,
      tiktok_username: t.handle,
      avatar_url: backstageAvatarUrl(t.row?.avatar_url),
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
    .filter((e) => !isExcludedNetworkHandle(e.tiktok_username))
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
    statPeriodLabel: "All time (roster baseline + credible monthly syncs)",
  };
}
