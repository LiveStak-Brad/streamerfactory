import { createServiceRoleClient } from "@/lib/supabase/service-role";
import type { TikTokConnectionPublic, TikTokTokenBundle } from "@/lib/tiktok/types";

export function requireServiceRoleSupabase() {
  const supabase = createServiceRoleClient();
  if (!supabase) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set; TikTok connection storage is unavailable.");
  }
  return supabase;
}

const publicColumns =
  "id, profile_id, tiktok_open_id, tiktok_username, display_name, avatar_url, follower_count, following_count, likes_count, video_count, last_synced_at, created_at, updated_at";

export async function getTikTokConnectionPublic(
  profileId: string,
): Promise<TikTokConnectionPublic | null> {
  const supabase = requireServiceRoleSupabase();
  const { data, error } = await supabase
    .from("tiktok_connections")
    .select(publicColumns)
    .eq("profile_id", profileId)
    .maybeSingle();
  if (error) {
    console.error("[tiktok] getTikTokConnectionPublic", error);
    return null;
  }
  return data as TikTokConnectionPublic | null;
}

export async function getTikTokConnectionTokens(profileId: string): Promise<
  | (TikTokTokenBundle & {
      tiktok_username: string | null;
    })
  | null
> {
  const supabase = requireServiceRoleSupabase();
  const { data, error } = await supabase
    .from("tiktok_connections")
    .select(
      "access_token, refresh_token, access_token_expires_at, refresh_token_expires_at, tiktok_open_id, tiktok_username",
    )
    .eq("profile_id", profileId)
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("[tiktok] getTikTokConnectionTokens", error);
    return null;
  }
  return {
    access_token: data.access_token as string,
    refresh_token: data.refresh_token as string,
    access_token_expires_at: data.access_token_expires_at as string,
    refresh_token_expires_at: data.refresh_token_expires_at as string,
    open_id: data.tiktok_open_id as string,
    tiktok_username: (data.tiktok_username as string | null) ?? null,
  };
}

export async function findProfileIdByTikTokOpenId(openId: string): Promise<string | null> {
  const supabase = requireServiceRoleSupabase();
  const { data, error } = await supabase
    .from("tiktok_connections")
    .select("profile_id")
    .eq("tiktok_open_id", openId)
    .maybeSingle();
  if (error) {
    console.error("[tiktok] findProfileIdByTikTokOpenId", error);
    return null;
  }
  return (data?.profile_id as string | undefined) ?? null;
}

export async function upsertTikTokConnection(params: {
  profileId: string;
  openId: string;
  tokens: TikTokTokenBundle;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = requireServiceRoleSupabase();
  const row = {
    profile_id: params.profileId,
    tiktok_open_id: params.openId,
    access_token: params.tokens.access_token,
    refresh_token: params.tokens.refresh_token,
    access_token_expires_at: params.tokens.access_token_expires_at,
    refresh_token_expires_at: params.tokens.refresh_token_expires_at,
  };
  const { error } = await supabase.from("tiktok_connections").upsert(row, { onConflict: "profile_id" });
  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "This TikTok account is already linked to another Streamer Factory login." };
    }
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function updateTikTokConnectionProfile(
  profileId: string,
  fields: Partial<
    Pick<
      TikTokConnectionPublic,
      | "tiktok_username"
      | "display_name"
      | "avatar_url"
      | "follower_count"
      | "following_count"
      | "likes_count"
      | "video_count"
      | "last_synced_at"
    >
  > & { access_token?: string; refresh_token?: string; access_token_expires_at?: string; refresh_token_expires_at?: string }
): Promise<{ ok: boolean; error?: string }> {
  const supabase = requireServiceRoleSupabase();
  const { error } = await supabase.from("tiktok_connections").update(fields).eq("profile_id", profileId);
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
