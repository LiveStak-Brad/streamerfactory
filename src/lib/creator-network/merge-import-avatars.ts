import {
  backstageAvatarUrl,
  getBackstageAvatarMapByHandle,
} from "@/lib/creator-network/leaderboard-from-import";
import { normalizeHandle, resolveCanonicalHandle } from "@/lib/rankings/backstage-seed-data";
import type { LeaderboardEntry } from "@/lib/rankings/types";

/** Attach latest Backstage import photos to leaderboard rows (e.g. all-time / seed fallback). */
export async function mergeImportAvatarsIntoEntries(
  entries: LeaderboardEntry[],
): Promise<LeaderboardEntry[]> {
  const avatarMap = await getBackstageAvatarMapByHandle();
  if (avatarMap.size === 0) return entries;

  return entries.map((e) => {
    const handle = e.tiktok_username
      ? normalizeHandle(resolveCanonicalHandle(e.tiktok_username))
      : normalizeHandle(e.profile_id);
    const imported = avatarMap.get(handle);
    if (!imported) return e;
    return { ...e, avatar_url: backstageAvatarUrl(imported) ?? e.avatar_url ?? null };
  });
}
