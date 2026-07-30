import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/member/",
          "/login",
          "/application-status",
          "/auth/",
          "/welcome",
        ],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.domain,
  };
}
