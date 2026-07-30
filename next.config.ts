import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Canonical routes live under `/streameru`.
   * Permanent redirects consolidate legacy `/resources` URLs for SEO (no duplicate indexable paths).
   */
  async redirects() {
    return [
      { source: "/resources", destination: "/streameru", permanent: true },
      { source: "/resources/:path*", destination: "/streameru/:path*", permanent: true },
      { source: "/welcome", destination: "/streameru", permanent: true },
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
