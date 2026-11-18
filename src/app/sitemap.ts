import type { MetadataRoute } from "next";
import { services, servicePath } from "@/data/services";
import { absoluteUrl } from "@/lib/site";

/**
 * Date the homepage content last changed (YYYY-MM-DD). Update by hand when you edit the homepage.
 * Never use the build time: Google ignores lastmod values that change on every deploy.
 */
const HOME_CONTENT_UPDATED = "2026-11-19";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: HOME_CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/image/xiii-12-08-26.png")],
    },
    ...services.map((service) => ({
      url: absoluteUrl(servicePath(service.slug)),
      lastModified: service.contentUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      ...(service.photos.length > 0
        ? { images: service.photos.map((photo) => absoluteUrl(photo.src)) }
        : {}),
    })),
  ];
}
