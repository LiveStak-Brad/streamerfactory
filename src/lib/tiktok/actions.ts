"use server";

import { revalidatePath } from "next/cache";
import { canScheduleBattles } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { syncTikTokProfileForProfileId } from "@/lib/tiktok/syncProfile";

export type TikTokRefreshState = { ok: boolean; error?: string; refreshed?: boolean };

export async function refreshTikTokStatsAction(
  _prev: TikTokRefreshState,
  formData: FormData,
): Promise<TikTokRefreshState> {
  void _prev;
  void formData;
  const session = await getSessionProfile();
  if (!session?.user || !session.profile || !canScheduleBattles(session.profile.role)) {
    return { ok: false, error: "You need to be signed in as a network member to refresh TikTok stats." };
  }

  try {
    const result = await syncTikTokProfileForProfileId(session.user.id);
    if (!result.ok) {
      return { ok: false, error: result.error, refreshed: false };
    }
    revalidatePath("/member/dashboard");
    return { ok: true, refreshed: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not refresh TikTok stats.";
    return { ok: false, error: msg, refreshed: false };
  }
}
