import { getDirectoryMembersFromLatestCreatorNetworkImport } from "@/lib/creator-network/leaderboard-from-import";
import {
  NETWORK_MEMBERS,
  type NetworkMember,
} from "@/lib/members/network-members";
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
      members: [...NETWORK_MEMBERS],
      importedAt: null,
      fromImport: false,
    };
  }

  const seen = new Set<string>();
  const members: NetworkMember[] = [];

  for (const row of imported.members) {
    const key = normalizeHandle(row.username);
    if (seen.has(key)) continue;
    seen.add(key);
    members.push({
      username: row.username,
      displayName: row.displayName || staticDisplayByHandle.get(key) || row.username,
      avatarUrl: row.avatar_url,
    });
  }

  for (const fallback of NETWORK_MEMBERS) {
    const key = normalizeHandle(fallback.username);
    if (seen.has(key)) continue;
    seen.add(key);
    members.push({ ...fallback, avatarUrl: null });
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
