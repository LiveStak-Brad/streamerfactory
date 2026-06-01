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
]);

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
  return false;
}
