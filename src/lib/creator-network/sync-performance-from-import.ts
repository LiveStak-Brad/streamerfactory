import type { SupabaseClient } from "@supabase/supabase-js";
import { normalizeActiveness } from "@/lib/creator-network/match-profiles";
import { sanitizeLiveDaysForPeriodNullable } from "@/lib/creator-network/stat-period";
import { parsePlausibleImportedDiamonds } from "@/lib/creator-network/stat-sanity";
import type { ImportRowPayload } from "@/lib/creator-network/types";

export type MonthlyPerformanceUpsert = {
  profileId: string;
  periodStart: string;
  periodEnd: string;
  coinsEarned: number | null;
  daysStreamed: number | null;
  hoursStreamed: number | null;
  activenessLevel: string;
};

function sanitizeHoursNullable(hours: number | undefined | null): number | null {
  if (hours === undefined || hours === null || !Number.isFinite(hours)) return null;
  return Math.round(Math.max(0, hours) * 10) / 10;
}

/**
 * Mirror the latest monthly Backstage activity sync into creator_performance_stats
 * (matched profiles only). Null metrics stay null — never invent zeros.
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
    coins_earned: r.coinsEarned === null ? null : Math.max(0, Math.round(r.coinsEarned)),
    days_streamed: r.daysStreamed === null ? null : Math.max(0, Math.round(r.daysStreamed)),
    hours_streamed: sanitizeHoursNullable(r.hoursStreamed),
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
  const diamonds = parsePlausibleImportedDiamonds(
    row.diamondsEarned,
    row.coinsEarned,
    row.hoursStreamed,
    row.daysStreamed,
  );
  return {
    profileId,
    periodStart,
    periodEnd,
    coinsEarned: diamonds,
    daysStreamed: sanitizeLiveDaysForPeriodNullable(row.daysStreamed),
    hoursStreamed: sanitizeHoursNullable(row.hoursStreamed),
    activenessLevel: row.activenessLevel ?? "none",
  };
}
