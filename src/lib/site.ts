/** Official TikTok Creator Network application for Streamer Factory (join the network on TikTok first). */
export const tiktokCreatorNetworkApplyUrl =
  "https://www.tiktok.com/t/ZTkvnxHmY/" as const;

/** Public social profiles — same handle on both platforms. */
export const socialHandle = "streamerfactoryllc" as const;

export const socialLinks = {
  tiktok: {
    label: "TikTok",
    handle: `@${socialHandle}`,
    href: `https://www.tiktok.com/@${socialHandle}`,
  },
  instagram: {
    label: "Instagram",
    handle: `@${socialHandle}`,
    href: `https://www.instagram.com/${socialHandle}/`,
  },
} as const;

export const site = {
  name: "Streamer Factory",
  domain: "thestreamerfactory.com",
  /** Primary public inbox for creators and partners */
  contactEmail: "team@thestreamerfactory.com",
  tagline:
    "A TikTok LIVE creator agency helping streamers grow audiences and build sustainable income.",
  url: "https://thestreamerfactory.com",
} as const;

/** Top-level public links shown in the header (compact). */
export const mainNav = [
  { label: "Creators", href: "/members" },
  { label: "Rankings", href: "/rankings" },
  { label: "HOF", href: "/hall-of-fame" },
  { label: "StreamerU", href: "/streameru" },
  { label: "About", href: "/about" },
  { label: "Join", href: "/apply" },
] as const;

/** Platform tools grouped under a header dropdown. */
export const platformNav = [
  {
    label: "Battle Hub",
    href: "/battle-hub",
    description: "Schedule battles, flyers, and network calendar",
  },
  {
    label: "Guides",
    href: "/guides",
    description: "How to join and grow with the agency",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Talk with the Streamer Factory team",
  },
] as const;

export const footerNav = [
  { label: "About", href: "/about" },
  { label: "Creators", href: "/members" },
  { label: "Rankings", href: "/rankings" },
  { label: "Hall of Fame", href: "/hall-of-fame" },
  { label: "StreamerU", href: "/streameru" },
  { label: "Battle Hub", href: "/battle-hub" },
  { label: "Guides", href: "/guides" },
  { label: "TikTok LIVE Agency", href: "/guides/tiktok-live-agency" },
  { label: "Creator Network", href: "/guides/tiktok-creator-network" },
  { label: "Comparisons", href: "/guides/category/comparisons" },
  { label: "Creator stories", href: "/creator-stories" },
  { label: "Editorial standards", href: "/guides/editorial-standards" },
  { label: "Join", href: "/apply" },
  { label: "Contact", href: "/contact" },
  { label: "Sign in", href: "/login" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;
