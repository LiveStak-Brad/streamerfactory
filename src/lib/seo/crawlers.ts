/**
 * User-Agents that must receive real HTML (for favicons, meta, and indexing).
 * TikTok URL verification uses a separate plain-text short-circuit in middleware —
 * search engines must never hit that path.
 */
export function isHtmlCrawlerUserAgent(userAgent: string): boolean {
  return /googlebot|google-inspectiontool|storebot-google|apis-google|adsbot-google|mediapartners-google|bingbot|bingpreview|slurp|duckduckbot|baiduspider|yandex(bot|images)|applebot|facebookexternalhit|meta-externalagent|twitterbot|linkedinbot|embedly|quora link preview|redditbot|discordbot|telegrambot|whatsapp|skypeuripreview|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|bytespider/i.test(
    userAgent,
  );
}

export function isTikTokVerifierUserAgent(userAgent: string): boolean {
  return /tiktok/i.test(userAgent);
}
