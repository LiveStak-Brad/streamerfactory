import type { SupabaseClient } from "@supabase/supabase-js";
import { isExcludedNetworkHandle } from "@/lib/members/network-exclusions";
import { NETWORK_MEMBERS } from "@/lib/members/network-members";
import { normalizeHandle, resolveCanonicalHandle } from "@/lib/rankings/backstage-seed-data";
import type { ProfileMatchMaps } from "@/lib/creator-network/match-profiles";
import { matchProfileId } from "@/lib/creator-network/match-profiles";

export type RosterRowInput = {
  tiktokUsername: string;
  tiktokUsernameRaw?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  tiktokCreatorId?: string | null;
  usernameConfidence?: string | null;
  usernameSource?: string | null;
  inviteStatus?: string | null;
  creatorNetworkStatus?: string | null;
};

export type RosterDiffPreview = {
  presentInBackstage: string[];
  missingFromBackstage: string[];
  websiteOnlyStaticEntries: string[];
  newCreatorCandidates: string[];
  possibleUsernameChanges: string[];
  unmatched: string[];
  retained: string[];
  added: string[];
};

/**
 * Safe Phase 1A roster-diff preview. Does NOT archive creators.
 * Compares Backstage roster handles vs SF matched profiles + static NETWORK_MEMBERS.
 */
export function buildRosterDiffPreview(args: {
  backstageHandles: string[];
  matchedSiteHandles: string[];
  unmatchedBackstageHandles: string[];
}): RosterDiffPreview {
  const backstage = new Set(
    args.backstageHandles.map((h) => resolveCanonicalHandle(normalizeHandle(h))).filter(Boolean),
  );
  const matchedSite = new Set(
    args.matchedSiteHandles.map((h) => resolveCanonicalHandle(normalizeHandle(h))).filter(Boolean),
  );
  const staticHandles = new Set(
    NETWORK_MEMBERS.map((m) => resolveCanonicalHandle(normalizeHandle(m.username))).filter(
      (h) => h && !isExcludedNetworkHandle(h),
    ),
  );

  const presentInBackstage = [...backstage].sort();
  const retained = [...backstage].filter((h) => matchedSite.has(h)).sort();
  const added = [...backstage].filter((h) => !matchedSite.has(h)).sort();
  const missingFromBackstage = [...matchedSite].filter((h) => !backstage.has(h)).sort();
  const websiteOnlyStaticEntries = [...staticHandles]
    .filter((h) => !backstage.has(h) && !matchedSite.has(h))
    .sort();
  const newCreatorCandidates = added.filter((h) => !staticHandles.has(h)).sort();

  // Heuristic: static entry missing from Backstage whose prefix overlaps a new Backstage handle.
  const possibleUsernameChanges: string[] = [];
  for (const missing of missingFromBackstage) {
    for (const candidate of newCreatorCandidates) {
      if (
        missing.length >= 6 &&
        candidate.length >= 6 &&
        (candidate.startsWith(missing.slice(0, 6)) || missing.startsWith(candidate.slice(0, 6)))
      ) {
        possibleUsernameChanges.push(`${missing} → ${candidate}?`);
      }
    }
  }

  return {
    presentInBackstage,
    missingFromBackstage,
    websiteOnlyStaticEntries,
    newCreatorCandidates,
    possibleUsernameChanges: [...new Set(possibleUsernameChanges)].sort(),
    unmatched: [...args.unmatchedBackstageHandles].sort(),
    retained,
    added,
  };
}

export async function insertRosterEntries(args: {
  supabase: SupabaseClient;
  batchId: string;
  rows: RosterRowInput[];
  maps: ProfileMatchMaps;
  importedByProfileId: string;
  sourcePageUrl: string;
}): Promise<{
  accepted: number;
  rejected: number;
  matchedProfiles: number;
  lowConfidenceMatches: number;
  unmatchedUsernames: string[];
  diff: RosterDiffPreview;
}> {
  const { supabase, batchId, rows, maps, importedByProfileId, sourcePageUrl } = args;
  let accepted = 0;
  let rejected = 0;
  let matchedProfiles = 0;
  let lowConfidenceMatches = 0;
  const unmatchedUsernames: string[] = [];
  const backstageHandles: string[] = [];
  const matchedSiteHandles: string[] = [];

  // Authoritative site handles = profiles that have tiktok usernames in match maps.
  for (const handle of maps.handleToProfileId.keys()) {
    matchedSiteHandles.push(handle);
  }

  for (const row of rows) {
    const cleaned = normalizeHandle(row.tiktokUsername);
    if (!cleaned || isExcludedNetworkHandle(cleaned)) {
      rejected += 1;
      continue;
    }
    const canonical = resolveCanonicalHandle(cleaned);
    backstageHandles.push(canonical);
    const profileId = matchProfileId(maps, cleaned);
    if (profileId) {
      matchedProfiles += 1;
      if (row.usernameConfidence === "low") lowConfidenceMatches += 1;
    } else {
      unmatchedUsernames.push(canonical);
    }

    const { error } = await supabase.from("creator_network_roster_entries").insert({
      batch_id: batchId,
      profile_id: profileId,
      tiktok_username: canonical,
      tiktok_username_raw: row.tiktokUsernameRaw ?? null,
      tiktok_display_name: row.displayName ?? null,
      tiktok_creator_id: row.tiktokCreatorId ?? null,
      avatar_url: row.avatarUrl ?? null,
      username_confidence: row.usernameConfidence ?? null,
      username_source: row.usernameSource ?? null,
      invite_status: row.inviteStatus ?? null,
      creator_network_status: row.creatorNetworkStatus ?? null,
      source_page_url: sourcePageUrl,
      imported_by_profile_id: importedByProfileId,
    });

    if (error) rejected += 1;
    else accepted += 1;
  }

  const diff = buildRosterDiffPreview({
    backstageHandles,
    matchedSiteHandles,
    unmatchedBackstageHandles: unmatchedUsernames,
  });

  return {
    accepted,
    rejected,
    matchedProfiles,
    lowConfidenceMatches,
    unmatchedUsernames,
    diff,
  };
}
