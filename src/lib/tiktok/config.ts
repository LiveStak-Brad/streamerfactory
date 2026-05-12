/**
 * TikTok Login Kit (server-only). Never import from client components.
 */
export type TikTokOAuthEnv = {
  clientKey: string;
  clientSecret: string;
  redirectUri: string;
};

export function getTikTokOAuthEnv(): TikTokOAuthEnv {
  const clientKey = process.env.TIKTOK_CLIENT_KEY?.trim();
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET?.trim();
  const redirectUri = process.env.TIKTOK_REDIRECT_URI?.trim();
  if (!clientKey || !clientSecret || !redirectUri) {
    throw new Error(
      "Missing TikTok OAuth env: set TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, and TIKTOK_REDIRECT_URI.",
    );
  }
  return { clientKey, clientSecret, redirectUri };
}

/** Scopes required for profile + stats sync (comma-separated per TikTok docs). */
export const TIKTOK_OAUTH_SCOPES = "user.info.basic,user.info.profile,user.info.stats" as const;

export const TIKTOK_AUTH_AUTHORIZE_URL = "https://www.tiktok.com/v2/auth/authorize/" as const;
export const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/" as const;
export const TIKTOK_USER_INFO_URL = "https://open.tiktokapis.com/v2/user/info/" as const;
