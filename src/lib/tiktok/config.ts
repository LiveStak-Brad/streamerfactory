/**
 * TikTok Login Kit (server-only). Never import from client components.
 */

/** Strip BOM / wrapping quotes from values pasted from the TikTok or Vercel UI. */
function normalizeCredential(value: string): string {
  let v = value.trim().replace(/^\uFEFF/, "");
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

export type TikTokOAuthEnv = {
  clientKey: string;
  clientSecret: string;
  redirectUri: string;
};

export function getTikTokOAuthEnv(): TikTokOAuthEnv {
  const clientKey = normalizeCredential(process.env.TIKTOK_CLIENT_KEY ?? "");
  const clientSecret = normalizeCredential(process.env.TIKTOK_CLIENT_SECRET ?? "");
  const redirectUri = normalizeCredential(process.env.TIKTOK_REDIRECT_URI ?? "");
  if (!clientKey || !clientSecret || !redirectUri) {
    throw new Error(
      "Missing TikTok OAuth env: set TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, and TIKTOK_REDIRECT_URI.",
    );
  }
  return { clientKey, clientSecret, redirectUri };
}

/** Webhook signature verification only needs the client secret (not redirect URI). */
export function getTikTokClientSecret(): string {
  const clientSecret = normalizeCredential(process.env.TIKTOK_CLIENT_SECRET ?? "");
  if (!clientSecret) {
    throw new Error("Missing TIKTOK_CLIENT_SECRET (required for webhook signature verification).");
  }
  return clientSecret;
}

/** Scopes required for profile + stats sync (comma-separated per TikTok docs). */
export const TIKTOK_OAUTH_SCOPES = "user.info.basic,user.info.profile,user.info.stats" as const;

export const TIKTOK_AUTH_AUTHORIZE_URL = "https://www.tiktok.com/v2/auth/authorize/" as const;
export const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/" as const;
export const TIKTOK_USER_INFO_URL = "https://open.tiktokapis.com/v2/user/info/" as const;
