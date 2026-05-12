/**
 * TikTok "URL properties" / site verification line for the redirect URI prefix.
 * TikTok probes GET https://<host>/api/tiktok/oauth/callback (no query) and expects this body.
 * @see https://developers.tiktok.com/doc/getting-started-create-an-app (Verify URL ownership)
 */
export const TIKTOK_SITE_VERIFICATION_LINE =
  process.env.TIKTOK_SITE_VERIFICATION?.trim() ||
  "tiktok-developers-site-verification=Mmonu4QUfZs7q39VI6q6NUQXbZRcblTM";
