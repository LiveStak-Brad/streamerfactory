import type { Metadata } from "next";
import { site } from "./site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — TikTok LIVE Creator Agency`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} — TikTok LIVE Creator Agency`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — TikTok LIVE Creator Agency`,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};
