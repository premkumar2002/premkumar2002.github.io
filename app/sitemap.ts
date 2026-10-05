import type { MetadataRoute } from "next";
import { siteUrl, basePath } from "@/data/portfolio";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}${basePath}/`, changeFrequency: "monthly", priority: 1 }];
}
