import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// No lastModified: new Date() would only report the build time, and Google ignores unreliable dates.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
