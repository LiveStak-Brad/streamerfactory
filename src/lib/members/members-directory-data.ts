import {
  getBackstageAvatarMapByHandle,
  getDirectoryMembersFromLatestCreatorNetworkImport,
  backstageAvatarUrl,
} from "@/lib/creator-network/leaderboard-from-import";
import { cleanCreatorNetworkDisplayName } from "@/lib/creator-network/clean-username";
import {
  NETWORK_MEMBERS,
  type NetworkMember,
} from "@/lib/members/network-members";
import { isExcludedNetworkHandle } from "@/lib/members/network-exclusions";
import { normalizeHandle } from "@/lib/rankings/backstage-seed-data";

const staticDisplayByHandle = new Map(
  NETWORK_MEMBERS.map((m) => [normalizeHandle(m.username), m.displayName]),
);

export type MembersDirectoryLoad = {
  members: NetworkMember[];
  importedAt: string | null;
  /** True when avatars/names came from the latest Creator Network extension import. */
  fromImport: boolean;
};

/**
 * Public /members directory — same Backstage import as /rankings (photos + handles).
 * Falls back to the static roster when no import is available.
 */
export async function getNetworkMembersForDirectory(): Promise<MembersDirectoryLoad> {
  const imported = await getDirectoryMembersFromLatestCreatorNetworkImport();

  if (!imported?.members.length) {
    return {
      members: NETWORK_MEMBERS.filter((m) => !isExcludedNetworkHandle(m.username)),
      importedAt: null,
      fromImport: false,
    };
  }

  const avatarMap = await getBackstageAvatarMapByHandle();
  const seen = new Set<string>();
  const members: NetworkMember[] = [];

  for (const row of imported.members) {
    const key = normalizeHandle(row.username);
    if (seen.has(key) || isExcludedNetworkHandle(key)) continue;
    seen.add(key);
    members.push({
      username: row.username,
      displayName:
        cleanCreatorNetworkDisplayName(
          row.displayName,
          staticDisplayByHandle.get(key) || row.username,
        ) || row.username,
      avatarUrl:
        backstageAvatarUrl(row.avatar_url) ?? avatarMap.get(key) ?? null,
    });
  }

  for (const fallback of NETWORK_MEMBERS) {
    const key = normalizeHandle(fallback.username);
    if (seen.has(key) || isExcludedNetworkHandle(key)) continue;
    seen.add(key);
    members.push({
      ...fallback,
      avatarUrl: avatarMap.get(key) ?? null,
    });
  }

  members.sort((a, b) =>
    a.displayName.localeCompare(b.displayName, undefined, { sensitivity: "base" }),
  );

  return {
    members,
    importedAt: imported.importedAt,
    fromImport: true,
  };
}
