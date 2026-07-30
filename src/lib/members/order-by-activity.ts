import type { NetworkMember } from "@/lib/members/network-members";
import { normalizeHandle } from "@/lib/rankings/backstage-seed-data";
import { displayLabelForHandle } from "@/lib/rankings/leaderboard-from-seed";
import type { LeaderboardEntry } from "@/lib/rankings/types";

/**
 * Homepage hero / network-strip order: monthly leaderboard activity first, with photos
 * taken from the same leaderboard `avatar_url` that /rankings uses (not directory-only URLs).
 * Directory-only handles (not on the board) append afterward.
 */
export function orderMembersByActivity(
  members: NetworkMember[],
  rankings: LeaderboardEntry[],
): NetworkMember[] {
  const directoryByHandle = new Map<string, NetworkMember>();
  for (const member of members) {
    const handle = normalizeHandle(member.username);
    if (!handle || directoryByHandle.has(handle)) continue;
    directoryByHandle.set(handle, member);
  }

  const seen = new Set<string>();
  const ordered: NetworkMember[] = [];

  // Leaderboard is already most-active-first — reuse those rows + their photos.
  for (const entry of rankings) {
    const handle = normalizeHandle(entry.tiktok_username ?? "");
    if (!handle || seen.has(handle)) continue;
    seen.add(handle);

    const fromDirectory = directoryByHandle.get(handle);
    const avatarUrl = entry.avatar_url ?? fromDirectory?.avatarUrl ?? null;
    ordered.push({
      username: fromDirectory?.username ?? handle,
      displayName:
        fromDirectory?.displayName ??
        displayLabelForHandle(handle).replace(/^@/, "") ??
        handle,
      avatarUrl,
    });
  }

  // Remaining directory members (not on this month's board) — keep A–Z, photos when present.
  const remainder = members
    .filter((m) => !seen.has(normalizeHandle(m.username)))
    .sort((a, b) => {
      const photoA = a.avatarUrl ? 0 : 1;
      const photoB = b.avatarUrl ? 0 : 1;
      if (photoA !== photoB) return photoA - photoB;
      return a.displayName.localeCompare(b.displayName, undefined, { sensitivity: "base" });
    });

  for (const member of remainder) {
    const handle = normalizeHandle(member.username);
    if (!handle || seen.has(handle)) continue;
    seen.add(handle);
    ordered.push(member);
  }

  return ordered;
}
