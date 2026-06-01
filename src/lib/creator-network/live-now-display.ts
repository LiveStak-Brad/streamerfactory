import { cleanCreatorNetworkDisplayName, cleanCreatorNetworkUsername } from "@/lib/creator-network/clean-username";
import { backstageAvatarUrl } from "@/lib/creator-network/leaderboard-from-import";
import type { LiveSnapshotRow } from "@/lib/creator-network/types";
import { memberLiveStreamUrl } from "@/lib/members/network-members";
import type { NetworkMember } from "@/lib/members/network-members";
import { normalizeHandle } from "@/lib/rankings/backstage-seed-data";

const LIVE_HANDLE_BLOCKLIST = new Set([
  "creators",
  "creatorsmanage",
  "liveduration",
  "manage",
  "duration",
  "diamonds",
  "gifters",
  "viewers",
  "follower",
  "current",
  "promote",
  "showing",
]);

export function isInvalidLiveStreamHandle(raw: string | undefined | null): boolean {
  const handle = cleanCreatorNetworkUsername(raw);
  if (!handle) return true;
  if (LIVE_HANDLE_BLOCKLIST.has(handle)) return true;
  if (/manage|duration|viewers?|gifters?|diamonds?|follower|promote|showing/i.test(handle)) {
    return true;
  }
  return false;
}

function resolveMemberForLiveRow(
  handle: string,
  displayHint: string | null,
  members: NetworkMember[],
): NetworkMember | undefined {
  const key = normalizeHandle(handle);
  const exact = members.find((m) => normalizeHandle(m.username) === key);
  if (exact) return exact;

  if (key.length >= 4) {
    const prefixMatches = members.filter((m) =>
      normalizeHandle(m.username).startsWith(key),
    );
    if (prefixMatches.length === 1) return prefixMatches[0];
  }

  if (displayHint) {
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
    const username = member?.username ?? rawHandle;
    const displayName = cleanCreatorNetworkDisplayName(
      member?.displayName ?? row.tiktok_display_name,
      username,
    );

    const avatarUrl =
      backstageAvatarUrl(row.avatar_url) ??
      member?.avatarUrl ??
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
