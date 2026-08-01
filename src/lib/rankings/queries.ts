import {
  getLatestCreatorNetworkSyncMeta,
  getLeaderboardFromLatestCreatorNetworkImport,
  getWrongPeriodImportHint,
} from "@/lib/creator-network/leaderboard-from-import";
import { mergeImportAvatarsIntoEntries } from "@/lib/creator-network/merge-import-avatars";
import { periodKindForRanking } from "@/lib/creator-network/stat-period";
import { createClient } from "@/lib/supabase/server";
import { getLeaderboardFromBackstageSeed } from "@/lib/rankings/leaderboard-from-seed";
import { periodBounds } from "@/lib/rankings/periods";
import type {
  LeaderboardEntry,
  PerformanceStatsRow,
  RankingPeriod,
} from "@/lib/rankings/types";

export async function getPerformanceStatsForPeriod(
  periodStart: string,
  periodEnd: string,
): Promise<PerformanceStatsRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("creator_performance_stats")
    .select("*")
    .eq("period_start", periodStart)
    .eq("period_end", periodEnd)
    .order("coins_earned", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as PerformanceStatsRow[];
}

export async function getPerformanceStatForProfile(
  profileId: string,
  periodStart: string,
  periodEnd: string,
): Promise<PerformanceStatsRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("creator_performance_stats")
    .select("*")
    .eq("profile_id", profileId)
    .eq("period_start", periodStart)
    .eq("period_end", periodEnd)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as PerformanceStatsRow | null) ?? null;
}

/**
 * Monthly leaderboard: latest Chrome extension import when available;
 * else backstage seed snapshot.
 */
export type LeaderboardLoadIssue =
  | "no_import"
  | "import_not_readable"
  | "empty_diamonds"
  | "load_error"
  | "wrong_period";

export type LeaderboardLoadResult = {
  entries: LeaderboardEntry[];
  /** Set when the monthly board is built from the latest extension import. */
  syncMeta: {
    importedAt: string;
    acceptedRows: number;
    batchId: string;
    periodStart?: string | null;
    periodEnd?: string | null;
    statPeriodLabel?: string | null;
  } | null;
  loadIssue?: LeaderboardLoadIssue;
  /** Shown when the latest sync is not for the current monthly period (e.g. old Weekly tab sync). */
  wrongPeriodHint?: string | null;
};

async function seedBoardWithImportAvatars(): Promise<LeaderboardEntry[]> {
  return mergeImportAvatarsIntoEntries(getLeaderboardFromBackstageSeed());
}

export async function getLeaderboardWithMeta(
  kind: RankingPeriod = "monthly",
  anchorDate?: string,
): Promise<LeaderboardLoadResult> {
  const statKind = periodKindForRanking(kind);
  try {
    const fromImport = await getLeaderboardFromLatestCreatorNetworkImport(kind, anchorDate);
    // Prefer any readable diamond sync over the static first-month seed snapshot.
    if (fromImport && fromImport.entries.length > 0 && !fromImport.emptyDiamonds) {
      return {
        entries: fromImport.entries,
        syncMeta: {
          importedAt: fromImport.importedAt ?? new Date().toISOString(),
          acceptedRows: fromImport.acceptedRowsCount,
          batchId: fromImport.batchId ?? "",
          periodStart: fromImport.periodStart,
          periodEnd: fromImport.periodEnd,
          statPeriodLabel: fromImport.statPeriodLabel,
        },
      };
    }

    if (fromImport?.emptyDiamonds) {
      return {
        entries: await seedBoardWithImportAvatars(),
        syncMeta: null,
        loadIssue: "empty_diamonds",
      };
    }

    const wrong = await getWrongPeriodImportHint(statKind);
    if (wrong) {
      const other =
        wrong.importKind === "weekly"
          ? "Weekly"
          : wrong.importKind === "monthly"
            ? "Monthly"
            : "a different period";
      return {
        entries: await seedBoardWithImportAvatars(),
        syncMeta: null,
        loadIssue: "wrong_period",
        wrongPeriodHint: `Latest sync looks like ${other} data. In TikTok Backstage, open Creator stats, select the Monthly tab for this period, then sync again.`,
      };
    }

    const batchMeta = await getLatestCreatorNetworkSyncMeta();
    if (batchMeta) {
      return {
        entries: await seedBoardWithImportAvatars(),
        syncMeta: null,
        loadIssue: "import_not_readable",
      };
    }
  } catch {
    return {
      entries: await seedBoardWithImportAvatars(),
      syncMeta: null,
      loadIssue: "load_error",
    };
  }
  return {
    entries: await seedBoardWithImportAvatars(),
    syncMeta: null,
    loadIssue: "no_import",
  };
}

export async function getLeaderboard(
  kind: RankingPeriod = "monthly",
  anchorDate?: string,
): Promise<LeaderboardEntry[]> {
  const { entries } = await getLeaderboardWithMeta(kind, anchorDate);
  return entries;
}

export async function getMyLeaderboardSummary(
  profileId: string,
  kind: RankingPeriod = "monthly",
): Promise<{
  entry: LeaderboardEntry | null;
  periodStart: string;
  periodEnd: string;
  leaderboardSize: number;
}> {
  const board = await getLeaderboard(kind);
  const { periodStart, periodEnd } = periodBounds(kind);

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("tiktok_username")
    .eq("id", profileId)
    .maybeSingle();

  const myHandle = profile?.tiktok_username
    ? profile.tiktok_username.replace(/^@+/, "").trim().toLowerCase()
    : null;

  const entry =
    board.find((e) => e.profile_id === profileId) ??
    (myHandle
      ? board.find(
          (e) => (e.tiktok_username ?? "").replace(/^@+/, "").trim().toLowerCase() === myHandle,
        ) ?? null
      : null);

  return { entry, periodStart, periodEnd, leaderboardSize: board.length };
}
