/**
 * Phase 1A: separate static NETWORK_MEMBERS from authoritative active roster.
 * Public /members behavior is preserved until roster validation is approved.
 * Admin diagnostics use these helpers to label static-only users.
 */

import { NETWORK_MEMBERS } from "@/lib/members/network-members";
import { isExcludedNetworkHandle } from "@/lib/members/network-exclusions";
import { normalizeHandle, resolveCanonicalHandle } from "@/lib/rankings/backstage-seed-data";

export type RosterSourceLabel = "backstage_import" | "static_only" | "both";

export function staticNetworkHandles(): string[] {
  return NETWORK_MEMBERS.map((m) => resolveCanonicalHandle(normalizeHandle(m.username))).filter(
    (h) => h && !isExcludedNetworkHandle(h),
  );
}

/**
 * Authoritative active roster count excludes website-only static entries
 * that are not present in the latest Backstage roster/import set.
 */
export function authoritativeActiveRosterCount(args: {
  backstageHandles: string[];
}): { activeCount: number; staticOnlyCount: number; staticOnlyHandles: string[] } {
  const backstage = new Set(
    args.backstageHandles.map((h) => resolveCanonicalHandle(normalizeHandle(h))).filter(Boolean),
  );
  const staticOnlyHandles = staticNetworkHandles().filter((h) => !backstage.has(h));
  return {
    activeCount: backstage.size,
    staticOnlyCount: staticOnlyHandles.length,
    staticOnlyHandles,
  };
}

export function labelRosterSource(
  handle: string,
  backstageHandles: Set<string>,
): RosterSourceLabel {
  const key = resolveCanonicalHandle(normalizeHandle(handle));
  const inBackstage = backstageHandles.has(key);
  const inStatic = staticNetworkHandles().includes(key);
  if (inBackstage && inStatic) return "both";
  if (inBackstage) return "backstage_import";
  return "static_only";
}

/**
 * EVENTUAL MIGRATION (Phase 1B+):
 * - Stop unioning NETWORK_MEMBERS into public /members as "active".
 * - Drive active membership from latest validated creator_roster sync.
 * - Archive missing creators after live validation of roster completeness.
 */
export const STATIC_ROSTER_MIGRATION_NOTE =
  "NETWORK_MEMBERS is a legacy seed/fallback. It must not define authoritative active network status once roster sync is validated.";
