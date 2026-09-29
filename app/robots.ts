import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// /api/* stays crawlable: Googlebot needs it to render the page. It's noindexed via a header in next.config.ts.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
