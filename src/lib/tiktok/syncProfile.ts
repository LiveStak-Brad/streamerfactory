import { getTikTokConnectionTokens, updateTikTokConnectionProfile } from "@/lib/tiktok/db";
import { ensureValidAccessToken, fetchTikTokUserInfo } from "@/lib/tiktok/oauth";
import type { TikTokTokenBundle } from "@/lib/tiktok/types";

/**
 * Fetches TikTok user info and persists public stats (+ optional token rotation after refresh).
 * Server-only; call after verifying `profileId` belongs to the current session user.
 */
export async function syncTikTokProfileForProfileId(profileId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const ensured = await ensureValidAccessToken({
    getRow: async () => {
      const row = await getTikTokConnectionTokens(profileId);
      if (!row) return null;
      return {
        access_token: row.access_token,
        refresh_token: row.refresh_token,
        access_token_expires_at: row.access_token_expires_at,
      };
    },
    persistTokens: async (tokens: TikTokTokenBundle) => {
      await updateTikTokConnectionProfile(profileId, {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        access_token_expires_at: tokens.access_token_expires_at,
        refresh_token_expires_at: tokens.refresh_token_expires_at,
      });
    },
  });

  if (!ensured.ok) {
    return ensured;
  }

  const info = await fetchTikTokUserInfo(ensured.accessToken);
  if (!info.ok) {
    return info;
  }

  const u = info.user;
  const now = new Date().toISOString();
  const updated = await updateTikTokConnectionProfile(profileId, {
    tiktok_username: u.username,
    display_name: u.display_name,
    avatar_url: u.avatar_url,
    follower_count: u.follower_count,
    following_count: u.following_count,
    likes_count: u.likes_count,
    video_count: u.video_count,
    last_synced_at: now,
  });

  if (!updated.ok) {
    return { ok: false, error: updated.error ?? "Failed to save TikTok profile." };
  }

  return { ok: true };
}
