import { cleanCreatorNetworkDisplayName, cleanCreatorNetworkUsername } from "@/lib/creator-network/clean-username";
import {
  isInvalidLiveStreamHandle,
  isSuspiciousLiveHandle,
} from "@/lib/creator-network/live-handle-validation";
import { backstageAvatarUrl } from "@/lib/creator-network/leaderboard-from-import";
import type { LiveSnapshotRow } from "@/lib/creator-network/types";
import { memberLiveStreamUrl } from "@/lib/members/network-members";
import type { NetworkMember } from "@/lib/members/network-members";
import { normalizeHandle } from "@/lib/rankings/backstage-seed-data";

export { isInvalidLiveStreamHandle, isSuspiciousLiveHandle };

function resolveMemberForLiveRow(
  handle: string,
  displayHint: string | null,
  members: NetworkMember[],
): NetworkMember | undefined {
  const key = normalizeHandle(handle);
  const exact = members.find((m) => normalizeHandle(m.username) === key);
  if (exact) return exact;

  if (key.length >= 6) {
    const prefixMatches = members.filter((m) => {
      const u = normalizeHandle(m.username);
      return u.startsWith(key) || key.startsWith(u);
    });
    if (prefixMatches.length === 1) return prefixMatches[0];
  }

  if (displayHint && displayHint.length >= 3) {
    const hint = displayHint.toLowerCase();
    const byName = members.filter(
      (m) =>
        m.displayName.toLowerCase().includes(hint) ||
        hint.includes(m.displayName.toLowerCase().slice(0, 6)),
    );
    if (byName.length === 1) return byName[0];
  }

  return undefined;
}

export type LiveNowDisplayEntry = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  liveDuration: string | null;
  statLine: string | null;
  href: string;
};

/** Public /members LIVE section — network members only, no comment/chat junk. */
export function enrichLiveNowForDisplay(
  entries: LiveSnapshotRow[],
  members: NetworkMember[],
): LiveNowDisplayEntry[] {
  const out: LiveNowDisplayEntry[] = [];

  for (const row of entries) {
    const rawHandle = cleanCreatorNetworkUsername(row.tiktok_username);
    if (!rawHandle || isInvalidLiveStreamHandle(rawHandle)) continue;

    const member = resolveMemberForLiveRow(
      rawHandle,
      row.tiktok_display_name,
      members,
    );
    if (!member) continue;

    const username = member.username;
    const displayName = cleanCreatorNetworkDisplayName(
      member.displayName ?? row.tiktok_display_name,
      username,
    );

    const avatarUrl =
      backstageAvatarUrl(row.avatar_url) ??
      member.avatarUrl ??
      null;

    const liveDuration = row.live_started_text?.trim() || null;
    const statLine = row.viewer_count_text?.trim() || null;

    out.push({
      id: row.id,
      username,
      displayName: displayName || username,
      avatarUrl,
      liveDuration,
      statLine,
      href: memberLiveStreamUrl(username),
    });
  }

  return out;
}
