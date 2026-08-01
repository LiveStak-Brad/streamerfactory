import {
  archivePlaceCount,
  completedYearMonthToArchive,
  isValidYearMonth,
} from "@/lib/hall-of-fame/months";
import { getLiveHallOfFameMonth, isMonthArchived } from "@/lib/hall-of-fame/queries";
import type { YearMonth } from "@/lib/hall-of-fame/types";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import type { SupabaseClient } from "@supabase/supabase-js";

export type ArchiveMonthResult =
  | { ok: true; yearMonth: YearMonth; placed: number; alreadyLocked?: boolean }
  | { ok: false; error: string };

async function hallOfFameWriteClient(): Promise<SupabaseClient> {
  return createServiceRoleClient() ?? (await createClient());
}

/**
 * Lock a month's live standings into permanent Hall of Fame history.
 * Idempotent: already-locked months return ok without overwriting.
 */
export async function archiveHallOfFameMonth(
  yearMonthInput: string,
): Promise<ArchiveMonthResult> {
  const yearMonth = yearMonthInput.trim() as YearMonth;
  if (!isValidYearMonth(yearMonth)) {
    return { ok: false, error: "Invalid month. Use YYYY-MM." };
  }

  if (await isMonthArchived(yearMonth)) {
    return { ok: true, yearMonth, placed: 0, alreadyLocked: true };
  }

  const live = await getLiveHallOfFameMonth(yearMonth);
  const placeCount = archivePlaceCount(yearMonth);
  const placements = live?.placements.slice(0, placeCount) ?? [];

  if (!placements.length) {
    return {
      ok: false,
      error: `No leaderboard standings available to archive for ${yearMonth}. Sync Creator Network stats for that month first.`,
    };
  }

  const supabase = await hallOfFameWriteClient();

  const { error: monthErr } = await supabase.from("hall_of_fame_months").insert({
    year_month: yearMonth,
    status: "locked",
    locked_at: new Date().toISOString(),
    source: "archive",
  });

  if (monthErr) {
    if (monthErr.code === "23505") {
      return { ok: true, yearMonth, placed: 0, alreadyLocked: true };
    }
    if (monthErr.code === "42P01" || monthErr.message?.includes("does not exist")) {
      return {
        ok: false,
        error: "Hall of Fame tables are missing. Apply the hall_of_fame migration first.",
      };
    }
    return { ok: false, error: monthErr.message };
  }

  const rows = placements.map((p) => ({
    year_month: yearMonth,
    place: p.place,
    display_name: p.displayName,
    tiktok_username: p.tiktokUsername,
    avatar_url: p.avatarUrl ?? null,
    badge: p.badge,
    network_level: p.networkLevel ?? null,
    profile_id:
      p.profileId && /^[0-9a-f-]{36}$/i.test(p.profileId) ? p.profileId : null,
  }));

  const { error: placeErr } = await supabase.from("hall_of_fame_placements").insert(rows);

  if (placeErr) {
    await supabase.from("hall_of_fame_months").delete().eq("year_month", yearMonth);
    return { ok: false, error: placeErr.message };
  }

  return { ok: true, yearMonth, placed: placements.length };
}

/**
 * After month-end, permanently save the previous UTC month's leaders.
 * Safe to call from cron or page load — never overwrites locked history.
 */
export async function ensurePreviousMonthArchived(
  now: Date = new Date(),
): Promise<ArchiveMonthResult> {
  const yearMonth = completedYearMonthToArchive(now);
  return archiveHallOfFameMonth(yearMonth);
}
