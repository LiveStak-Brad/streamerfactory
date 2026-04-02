import { site } from "@/lib/site";

/**
 * Canonical site origin for links in emails, redirects, and webhooks.
 * Set NEXT_PUBLIC_SITE_URL on Vercel (e.g. https://thestreamerfactory.com).
 */
export function getPublicSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  return raw && raw.length > 0 ? raw : site.url;
}

export function absoluteUrl(path: string): string {
  const base = getPublicSiteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
