import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Canonical routes live under `/streameru`.
   * Permanent redirects consolidate legacy / duplicate SEO URLs.
   */
  async redirects() {
    return [
      { source: "/resources", destination: "/streameru", permanent: true },
      { source: "/resources/:path*", destination: "/streameru/:path*", permanent: true },
      { source: "/welcome", destination: "/streameru", permanent: true },
      // Keyword cannibalization consolidations
      {
        source: "/guides/tiktok-agency",
        destination: "/guides/tiktok-live-agency",
        permanent: true,
      },
      {
        source: "/guides/tiktok-streaming-agency",
        destination: "/guides/livestream-agency",
        permanent: true,
      },
      {
        source: "/guides/content-creator-agency",
        destination: "/guides/creator-agency",
        permanent: true,
      },
      {
        source: "/guides/creator-monetization",
        destination: "/guides/tiktok-monetization-guide",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.tiktokcdn.com" },
      { protocol: "https", hostname: "**.tiktokcdn-us.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
};

export default nextConfig;
