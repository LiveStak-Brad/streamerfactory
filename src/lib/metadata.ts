import type { Metadata } from "next";
import { brandAssets, brandColors } from "./brand/assets";
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
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: brandAssets.favicon.png16, sizes: "16x16", type: "image/png" },
      { url: brandAssets.favicon.png32, sizes: "32x32", type: "image/png" },
      { url: "/branding/favicon/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/branding/favicon/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: brandAssets.favicon.ico, sizes: "any" },
    ],
    apple: [{ url: brandAssets.favicon.apple, sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: brandAssets.favicon.mask,
        color: brandColors.purple,
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: defaultTitle,
    description: site.tagline,
    images: [
      {
        url: brandAssets.og.homepage,
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.tagline,
    images: [brandAssets.og.homepage],
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "black-translucent",
  },
  other: {
    "msapplication-TileColor": brandColors.navy,
    "msapplication-config": brandAssets.favicon.browserconfig,
  },
  robots: {
    index: true,
    follow: true,
  },
};
