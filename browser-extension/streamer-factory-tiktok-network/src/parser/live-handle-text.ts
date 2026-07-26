import { isInvalidLiveStreamHandle, isSuspiciousLiveHandle } from "./live-username";
import { cleanTikTokUsername } from "./username";

const HANDLE_IN_TEXT = /@?([a-z0-9._]{2,24})/i;
const PLAIN_HANDLE = /^@?([a-z0-9._]{2,24})$/i;

export function handleFromRawText(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 80) return undefined;

  const plain = trimmed.match(PLAIN_HANDLE);
  if (plain) {
    const u = cleanTikTokUsername(plain[1]);
    if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
  }

  const embedded = trimmed.match(HANDLE_IN_TEXT);
  if (embedded && trimmed.length <= 40) {
    const u = cleanTikTokUsername(embedded[1]);
    if (u && !isInvalidLiveStreamHandle(u) && !isSuspiciousLiveHandle(u)) return u;
  }

  return undefined;
}
