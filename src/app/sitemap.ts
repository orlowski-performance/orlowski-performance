import type { MetadataRoute } from "next";
import { site, servicePages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "",
    "/bewerbung",
    "/kontakt",
    ...servicePages.map((p) => `/${p.slug}`),
    "/impressum",
    "/datenschutz",
  ];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    priority: path === "" ? 1 : 0.7,
  }));
}
