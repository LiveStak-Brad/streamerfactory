"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/server";
import {
  archiveHallOfFameMonth,
  ensurePreviousMonthArchived,
  type ArchiveMonthResult,
} from "@/lib/hall-of-fame/archive";
import { completedYearMonthToArchive, yearMonthFromDate } from "@/lib/hall-of-fame/months";

export type { ArchiveMonthResult };

function revalidateHallOfFamePaths() {
  revalidatePath("/hall-of-fame");
  revalidatePath("/admin/hall-of-fame");
  revalidatePath("/rankings");
}

/**
 * Admin action: lock a completed month into permanent Hall of Fame history.
 * Defaults to the previous UTC month (the month that just ended).
 */
export async function archiveHallOfFameMonthAction(
  yearMonthInput?: string,
): Promise<ArchiveMonthResult> {
  await requireAdmin();

  const yearMonth = yearMonthInput?.trim() || completedYearMonthToArchive();
  const result = await archiveHallOfFameMonth(yearMonth);
  if (result.ok && !result.alreadyLocked && result.placed > 0) {
    revalidateHallOfFamePaths();
  }
  return result;
}

/**
 * Catch-up: archive the previous month if standings still exist and it is not locked.
 * Used on Hall of Fame / rankings loads and by cron after month rollover.
 */
export async function ensureHallOfFameMonthRolloverAction(): Promise<ArchiveMonthResult> {
  const result = await ensurePreviousMonthArchived();
  if (result.ok && !result.alreadyLocked && result.placed > 0) {
    revalidateHallOfFamePaths();
  }
  return result;
}

/** Current live month key (UTC) — for UI labels only. */
export async function getCurrentRankingYearMonthAction(): Promise<string> {
  return yearMonthFromDate();
}
