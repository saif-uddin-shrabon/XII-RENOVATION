import type { MetadataRoute } from "next";
import { services, servicePath } from "@/data/services";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/image/xiii-12-08-26.png")],
    },
    ...services.map((service) => ({
      url: absoluteUrl(servicePath(service.slug)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      ...(service.photos.length > 0
        ? { images: service.photos.map((photo) => absoluteUrl(photo.src)) }
        : {}),
    })),
  ];
}
