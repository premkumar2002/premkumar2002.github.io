import type { MetadataRoute } from "next";
import { siteUrl, basePath } from "@/data/portfolio";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}${basePath}/sitemap.xml` };
}
