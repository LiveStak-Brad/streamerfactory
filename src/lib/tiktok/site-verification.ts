/**
 * TikTok "URL properties" / site verification line for the redirect URI prefix.
 * TikTok probes GET the redirect URI (often without an auth `code`) and expects this body.
 * Prefer the same canonical host as in the portal (e.g. `www.…`) so probes are not 307-redirected before 200.
 * @see https://developers.tiktok.com/doc/getting-started-create-an-app (Verify URL ownership)
 */
export const TIKTOK_SITE_VERIFICATION_LINE =
  process.env.TIKTOK_SITE_VERIFICATION?.trim() ||
  "tiktok-developers-site-verification=Mmonu4QUfZs7q39VI6q6NUQXbZRcblTM";

/** Separate token when TikTok URL-prefix verify targets /privacy/ (optional override). */
export const TIKTOK_PRIVACY_SITE_VERIFICATION_LINE =
  process.env.TIKTOK_PRIVACY_SITE_VERIFICATION?.trim() ||
  "tiktok-developers-site-verification=ZnIKgbi7luZp47xoy5zUdbrUQhQkbBOF";
