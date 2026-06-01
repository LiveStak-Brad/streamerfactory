import { cleanCreatorNetworkUsername } from "@/lib/creator-network/clean-username";

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
  "assking",
  "king_reaper5150",
  "king_reaper",
]);

/** Backstage UI labels and junk — not real TikTok handles. */
export function isInvalidLiveStreamHandle(raw: string | undefined | null): boolean {
  const handle = cleanCreatorNetworkUsername(raw);
  if (!handle) return true;
  if (LIVE_HANDLE_BLOCKLIST.has(handle)) return true;
  if (/manage|duration|viewers?|gifters?|diamonds?|follower|promote|showing/i.test(handle)) {
    return true;
  }
  if (isSuspiciousLiveHandle(handle)) return true;
  return false;
}

/** Glued chat handles, concatenated commenters, or implausible length. */
export function isSuspiciousLiveHandle(handle: string): boolean {
  if (handle.length > 24) return true;
  if (/assking/i.test(handle)) return true;
  if (/\d{5,}/.test(handle) && handle.length > 18) return true;

  const chunks = handle.match(/[a-z][a-z0-9_]{4,}/gi) ?? [];
  const unique = new Set(chunks.map((c) => c.toLowerCase()));
  if (unique.size >= 2 && handle.length >= 16) return true;

  for (const chunk of unique) {
    if (handle.split(chunk).length > 2) return true;
  }

  return false;
}
