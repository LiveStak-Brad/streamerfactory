import { cleanTikTokUsername } from "./username";

const LIVE_HANDLE_BLOCKLIST = new Set([
  "creators",
  "creatorsmanage",
  "creatorsmanagement",
  "creator",
  "manage",
  "management",
  "live",
  "liveduration",
  "livedur",
  "duration",
  "diamonds",
  "diamond",
  "gifters",
  "gifter",
  "viewers",
  "viewer",
  "follower",
  "followers",
  "current",
  "promote",
  "showing",
  "estimated",
  "bonus",
  "ratio",
  "streaming",
  "stream",
  "inactive",
  "notable",
  "eligible",
  "assking",
  "king_reaper5150",
  "king_reaper",
]);

/** Glued chat usernames or multiple handles in one string. */
export function isSuspiciousLiveHandle(handle: string): boolean {
  if (handle.length > 24) return true;
  if (/assking|king_reaper/i.test(handle)) return true;
  if (/\d{5,}/.test(handle) && handle.length > 18) return true;

  const chunks = handle.match(/[a-z][a-z0-9_]{4,}/gi) ?? [];
  const unique = new Set(chunks.map((c) => c.toLowerCase()));
  if (unique.size >= 2 && handle.length >= 16) return true;

  for (const chunk of unique) {
    if (handle.split(chunk).length > 2) return true;
  }

  return false;
}

/** Reject Backstage column labels and glued UI text mistaken for handles. */
export function isInvalidLiveStreamHandle(raw: string | undefined | null): boolean {
  const handle = cleanTikTokUsername(raw);
  if (!handle) return true;
  if (LIVE_HANDLE_BLOCKLIST.has(handle)) return true;
  if (/manage|duration|viewers?|gifters?|diamonds?|follower|promote|showing|estimated|bonus|ratio/i.test(handle)) {
    return true;
  }
  if (handle.startsWith("live") && handle.length <= 14) return true;
  if (handle.startsWith("creator") && handle.length <= 16) return true;
  if (isSuspiciousLiveHandle(handle)) return true;
  return false;
}
