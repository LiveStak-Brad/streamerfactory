"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/server";
import {
  archivePlaceCount,
  isValidYearMonth,
  yearMonthFromDate,
} from "@/lib/hall-of-fame/months";
import { getLiveHallOfFameMonth, isMonthArchived } from "@/lib/hall-of-fame/queries";
import type { YearMonth } from "@/lib/hall-of-fame/types";
import { createClient } from "@/lib/supabase/server";

export type ArchiveMonthResult =
  | { ok: true; yearMonth: YearMonth; placed: number }
  | { ok: false; error: string };

function revalidateHallOfFamePaths() {
  revalidatePath("/hall-of-fame");
  revalidatePath("/admin/hall-of-fame");
  revalidatePath("/rankings");
}

/**
 * One admin action at month-end:
 * lock the given month's standings into permanent Hall of Fame history.
 * Never overwrites an already-locked month.
 */
export async function archiveHallOfFameMonthAction(
  yearMonthInput?: string,
): Promise<ArchiveMonthResult> {
  await requireAdmin();

  const yearMonth = (yearMonthInput?.trim() || yearMonthFromDate()) as YearMonth;
  if (!isValidYearMonth(yearMonth)) {
    return { ok: false, error: "Invalid month. Use YYYY-MM." };
  }

  if (await isMonthArchived(yearMonth)) {
    return { ok: false, error: `${yearMonth} is already locked in Hall of Fame history.` };
  }

  const live = await getLiveHallOfFameMonth(yearMonth);
  const placeCount = archivePlaceCount(yearMonth);
  const placements = live?.placements.slice(0, placeCount) ?? [];

  if (!placements.length) {
    return {
      ok: false,
      error: `No leaderboard standings available to archive for ${yearMonth}. Sync Creator Network stats first.`,
    };
  }

  const supabase = await createClient();

  const { error: monthErr } = await supabase.from("hall_of_fame_months").insert({
    year_month: yearMonth,
    status: "locked",
    locked_at: new Date().toISOString(),
    source: "archive",
  });

  if (monthErr) {
    if (monthErr.code === "23505") {
      return { ok: false, error: `${yearMonth} is already locked in Hall of Fame history.` };
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
    // Roll back the month shell so admins can retry cleanly.
    await supabase.from("hall_of_fame_months").delete().eq("year_month", yearMonth);
    return { ok: false, error: placeErr.message };
  }

  revalidateHallOfFamePaths();
  return { ok: true, yearMonth, placed: placements.length };
}
