import type { MetadataRoute } from "next";

const SITE_URL = "https://thrivelongevitycenter.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Gated / non-public areas
      disallow: ["/api/", "/portal/", "/coming-soon"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
