import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Canonical app routes live under `/streameru`. `/resources/*` rewrites there so old links keep working. */
  async rewrites() {
    return [
      { source: "/resources", destination: "/streameru" },
      { source: "/resources/:path*", destination: "/streameru/:path*" },
    ];
  },
};

export default nextConfig;
