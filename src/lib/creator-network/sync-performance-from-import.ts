import type { SupabaseClient } from "@supabase/supabase-js";
import { normalizeActiveness } from "@/lib/creator-network/match-profiles";
import { sanitizeLiveDaysForPeriod } from "@/lib/creator-network/stat-period";
import type { ImportRowPayload } from "@/lib/creator-network/types";

export type MonthlyPerformanceUpsert = {
  profileId: string;
  periodStart: string;
  periodEnd: string;
  coinsEarned: number;
  daysStreamed: number;
  hoursStreamed: number;
  activenessLevel: string;
};

function sanitizeHours(hours: number | undefined): number {
  return Math.round(Math.max(0, Number(hours ?? 0)) * 10) / 10;
}

/**
 * Mirror the latest monthly Backstage sync into creator_performance_stats so
 * all-time DB aggregates stay aligned with imports (matched profiles only).
 */
export async function upsertMonthlyPerformanceStatsFromImport(
  supabase: SupabaseClient,
  rows: MonthlyPerformanceUpsert[],
): Promise<{ error: string | null }> {
  if (rows.length === 0) return { error: null };

  const payload = rows.map((r) => ({
    profile_id: r.profileId,
    period_start: r.periodStart,
    period_end: r.periodEnd,
    coins_earned: Math.max(0, Math.round(r.coinsEarned)),
    days_streamed: Math.max(0, Math.round(r.daysStreamed)),
    hours_streamed: sanitizeHours(r.hoursStreamed),
    activeness_level: normalizeActiveness(r.activenessLevel),
    follower_count: 0,
    follower_growth: 0,
    battles_played: 0,
    battles_won: 0,
  }));

  const { error } = await supabase.from("creator_performance_stats").upsert(payload, {
    onConflict: "profile_id,period_start,period_end",
  });

  return { error: error?.message ?? null };
}

export function monthlyPerformanceUpsertFromImportRow(
  profileId: string,
  row: ImportRowPayload,
  periodStart: string,
  periodEnd: string,
): MonthlyPerformanceUpsert {
  const diamonds = Math.max(0, Math.round(row.diamondsEarned ?? row.coinsEarned ?? 0));
  return {
    profileId,
    periodStart,
    periodEnd,
    coinsEarned: diamonds,
    daysStreamed: sanitizeLiveDaysForPeriod(row.daysStreamed),
    hoursStreamed: sanitizeHours(row.hoursStreamed),
    activenessLevel: row.activenessLevel ?? "none",
  };
}
