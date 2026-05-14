/** Official TikTok Creator Network application for Streamer Factory (join the network on TikTok first). */
export const tiktokCreatorNetworkApplyUrl =
  "https://www.tiktok.com/t/ZTkvnxHmY/" as const;

export const site = {
  name: "Streamer Factory",
  domain: "thestreamerfactory.com",
  /** Primary public inbox for creators and partners */
  contactEmail: "team@thestreamerfactory.com",
  tagline:
    "A TikTok LIVE creator agency helping streamers grow audiences and build sustainable income.",
  url: "https://thestreamerfactory.com",
} as const;

export const mainNav = [
  { label: "About", href: "/about" },
  { label: "Members", href: "/members" },
  { label: "StreamerU", href: "/streameru" },
  { label: "Battle Hub", href: "/battle-hub" },
  { label: "Join", href: "/apply" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  { label: "About", href: "/about" },
  { label: "Members", href: "/members" },
  { label: "StreamerU", href: "/streameru" },
  { label: "Battle Hub", href: "/battle-hub" },
  { label: "Join", href: "/apply" },
  { label: "Contact", href: "/contact" },
  { label: "Sign in", href: "/login" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;
