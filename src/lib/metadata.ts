import type { Metadata } from "next";
import { site } from "./site";

const defaultTitle = `${site.name} — TikTok LIVE Creator Agency`;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "TikTok LIVE agency",
    "TikTok Creator Network",
    "TikTok creator agency",
    "TikTok LIVE",
    "creator agency",
    "livestream agency",
    "TikTok streaming agency",
    "creator coaching",
    "TikTok monetization",
    "Streamer Factory",
    "StreamerU",
  ],
  authors: [{ name: site.name, url: site.url }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: defaultTitle,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.tagline,
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "black-translucent",
  },
  robots: {
    index: true,
    follow: true,
  },
};
