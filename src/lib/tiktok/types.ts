/** Public fields safe to render in the UI (no tokens). */
export type TikTokConnectionPublic = {
  id: string;
  profile_id: string;
  tiktok_open_id: string;
  tiktok_username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  follower_count: number;
  following_count: number;
  likes_count: number;
  video_count: number;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
};

export type TikTokTokenBundle = {
  access_token: string;
  refresh_token: string;
  access_token_expires_at: string;
  refresh_token_expires_at: string;
  open_id: string;
};
