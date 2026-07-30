import type { NetworkMember } from "@/lib/members/network-members";
import { normalizeHandle } from "@/lib/rankings/backstage-seed-data";
import type { LeaderboardEntry } from "@/lib/rankings/types";

/**
 * Order directory members by this month's leaderboard activity (rank score → hours → diamonds),
 * so homepage previews surface currently active creators ahead of low/no-activity handles.
 * Members missing from the board sink to the end; photos are a tie-breaker only.
 */
export function orderMembersByActivity(
  members: NetworkMember[],
  rankings: LeaderboardEntry[],
): NetworkMember[] {
  const byHandle = new Map<string, LeaderboardEntry>();
  for (const entry of rankings) {
    const handle = normalizeHandle(entry.tiktok_username ?? "");
    if (!handle || byHandle.has(handle)) continue;
    byHandle.set(handle, entry);
  }

  return [...members].sort((a, b) => {
    const ea = byHandle.get(normalizeHandle(a.username));
    const eb = byHandle.get(normalizeHandle(b.username));

    const scoreA = ea?.rank_score ?? -1;
    const scoreB = eb?.rank_score ?? -1;
    if (scoreB !== scoreA) return scoreB - scoreA;

    const hoursA = ea?.hours_streamed ?? -1;
    const hoursB = eb?.hours_streamed ?? -1;
    if (hoursB !== hoursA) return hoursB - hoursA;

    const diamondsA = ea?.coins_earned ?? -1;
    const diamondsB = eb?.coins_earned ?? -1;
    if (diamondsB !== diamondsA) return diamondsB - diamondsA;

    const photoA = a.avatarUrl ? 0 : 1;
    const photoB = b.avatarUrl ? 0 : 1;
    if (photoA !== photoB) return photoA - photoB;

    return a.displayName.localeCompare(b.displayName, undefined, { sensitivity: "base" });
  });
}
