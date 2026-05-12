import {
  getTikTokOAuthEnv,
  TIKTOK_TOKEN_URL,
  TIKTOK_USER_INFO_URL,
} from "@/lib/tiktok/config";
import type { TikTokTokenBundle } from "@/lib/tiktok/types";

function addSecondsIso(seconds: number): string {
  return new Date(Date.now() + seconds * 1000).toISOString();
}

async function readTikTokJsonBody(res: Response): Promise<
  { ok: true; json: Record<string, unknown> } | { ok: false; error: string }
> {
  const text = await res.text();
  const trimmed = text.trim();
  if (!trimmed) {
    return { ok: false, error: `TikTok returned an empty body (HTTP ${res.status}).` };
  }
  try {
    const json = JSON.parse(trimmed) as Record<string, unknown>;
    return { ok: true, json };
  } catch {
    const preview = trimmed.slice(0, 160).replace(/\s+/g, " ");
    return {
      ok: false,
      error: `TikTok API returned non-JSON (HTTP ${res.status}). Often invalid credentials, redirect_uri mismatch, or wrong Sandbox vs Production keys. Body starts: ${preview}`,
    };
  }
}

export async function exchangeAuthorizationCode(code: string): Promise<
  | { ok: true; open_id: string; tokens: TikTokTokenBundle }
  | { ok: false; error: string }
> {
  let env: ReturnType<typeof getTikTokOAuthEnv>;
  try {
    env = getTikTokOAuthEnv();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "TikTok OAuth is not configured." };
  }

  const body = new URLSearchParams({
    client_key: env.clientKey,
    client_secret: env.clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: env.redirectUri,
  });

  const res = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: body.toString(),
  });

  const parsed = await readTikTokJsonBody(res);
  if (!parsed.ok) {
    return { ok: false, error: parsed.error };
  }
  const json = parsed.json;
  if (!res.ok) {
    const desc = typeof json.error_description === "string" ? json.error_description : res.statusText;
    return { ok: false, error: desc || "Token exchange failed." };
  }

  const access_token = json.access_token as string | undefined;
  const refresh_token = json.refresh_token as string | undefined;
  const open_id = json.open_id as string | undefined;
  const expires_in = Number(json.expires_in);
  const refresh_expires_in = Number(json.refresh_expires_in);

  if (!access_token || !refresh_token || !open_id || !Number.isFinite(expires_in) || !Number.isFinite(refresh_expires_in)) {
    return { ok: false, error: "Unexpected token response from TikTok." };
  }

  const tokens: TikTokTokenBundle = {
    access_token,
    refresh_token,
    open_id,
    access_token_expires_at: addSecondsIso(expires_in),
    refresh_token_expires_at: addSecondsIso(refresh_expires_in),
  };

  return { ok: true, open_id, tokens };
}

export async function refreshAccessToken(refreshToken: string): Promise<
  | { ok: true; tokens: TikTokTokenBundle; open_id: string }
  | { ok: false; error: string }
> {
  let env: ReturnType<typeof getTikTokOAuthEnv>;
  try {
    env = getTikTokOAuthEnv();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "TikTok OAuth is not configured." };
  }
  const body = new URLSearchParams({
    client_key: env.clientKey,
    client_secret: env.clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const res = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: body.toString(),
  });

  const parsed = await readTikTokJsonBody(res);
  if (!parsed.ok) {
    return { ok: false, error: parsed.error };
  }
  const json = parsed.json;
  if (!res.ok) {
    const desc = typeof json.error_description === "string" ? json.error_description : res.statusText;
    return { ok: false, error: desc || "Token refresh failed." };
  }

  const access_token = json.access_token as string | undefined;
  const refresh_token = (json.refresh_token as string | undefined) ?? refreshToken;
  const open_id = json.open_id as string | undefined;
  const expires_in = Number(json.expires_in);
  const refresh_expires_in = Number(json.refresh_expires_in);

  if (!access_token || !open_id || !Number.isFinite(expires_in) || !Number.isFinite(refresh_expires_in)) {
    return { ok: false, error: "Unexpected refresh response from TikTok." };
  }

  const tokens: TikTokTokenBundle = {
    access_token,
    refresh_token,
    open_id,
    access_token_expires_at: addSecondsIso(expires_in),
    refresh_token_expires_at: addSecondsIso(refresh_expires_in),
  };

  return { ok: true, tokens, open_id };
}

const USER_INFO_FIELDS =
  "open_id,union_id,avatar_url,display_name,username,follower_count,following_count,likes_count,video_count";

export type TikTokUserInfo = {
  open_id: string;
  union_id?: string;
  avatar_url: string | null;
  display_name: string | null;
  username: string | null;
  follower_count: number;
  following_count: number;
  likes_count: number;
  video_count: number;
};

export async function fetchTikTokUserInfo(accessToken: string): Promise<
  | { ok: true; user: TikTokUserInfo }
  | { ok: false; error: string }
> {
  const url = `${TIKTOK_USER_INFO_URL}?fields=${encodeURIComponent(USER_INFO_FIELDS)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const parsed = await readTikTokJsonBody(res);
  if (!parsed.ok) {
    return { ok: false, error: parsed.error };
  }
  const json = parsed.json as {
    data?: { user?: Record<string, unknown> };
    error?: { code?: string; message?: string };
  };

  if (!res.ok) {
    const errMsg = json.error?.message;
    return { ok: false, error: errMsg || `TikTok user info request failed (HTTP ${res.status}).` };
  }

  const apiError = json.error;
  if (apiError && apiError.code && apiError.code !== "ok") {
    return { ok: false, error: apiError.message || "TikTok user info error." };
  }

  const u = json.data?.user;
  if (!u || typeof u.open_id !== "string") {
    return { ok: false, error: "Missing user payload from TikTok." };
  }

  const num = (v: unknown) => {
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
  };

  const user: TikTokUserInfo = {
    open_id: u.open_id,
    union_id: typeof u.union_id === "string" ? u.union_id : undefined,
    avatar_url: typeof u.avatar_url === "string" ? u.avatar_url : null,
    display_name: typeof u.display_name === "string" ? u.display_name : null,
    username: typeof u.username === "string" ? u.username : null,
    follower_count: num(u.follower_count),
    following_count: num(u.following_count),
    likes_count: num(u.likes_count),
    video_count: num(u.video_count),
  };

  return { ok: true, user };
}

/** Ensures a valid access token, refreshing if expired or near expiry (60s skew). */
export async function ensureValidAccessToken(params: {
  getRow: () => Promise<{
    access_token: string;
    refresh_token: string;
    access_token_expires_at: string;
  } | null>;
  persistTokens: (tokens: TikTokTokenBundle) => Promise<void>;
}): Promise<{ ok: true; accessToken: string } | { ok: false; error: string }> {
  const row = await params.getRow();
  if (!row) {
    return { ok: false, error: "No TikTok connection found." };
  }

  const expiresAt = new Date(row.access_token_expires_at).getTime();
  const skewMs = 60_000;
  if (Date.now() + skewMs < expiresAt) {
    return { ok: true, accessToken: row.access_token };
  }

  const refreshed = await refreshAccessToken(row.refresh_token);
  if (!refreshed.ok) {
    return { ok: false, error: refreshed.error };
  }

  await params.persistTokens(refreshed.tokens);
  return { ok: true, accessToken: refreshed.tokens.access_token };
}
