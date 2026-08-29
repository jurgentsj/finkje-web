import type { MetadataRoute } from "next";
import { blogs } from "@/lib/blogs";

const baseUrl = "https://finkje.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/hoe-het-werkt",
    "/onze-visie",
    "/voor-werkgevers",
    "/plaats-je-vacature",
    "/mensen",
    "/blog",
    "/contact",
    "/privacybeleid",
    "/algemene-voorwaarden",
    "/aanmelden",
    "/inloggen",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: route === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/blog" || route === "/aanmelden" ? 0.9 : 0.7,
    })),
    ...blogs.map((blog) => ({
      url: `${baseUrl}/${blog.slug}`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
