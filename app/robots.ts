import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/auth/", "/dashboard/", "/werkzoekende/dashboard", "/werkgever/dashboard", "/account/"] }],
    sitemap: "https://www.finkje.nl/sitemap.xml",
    host: "https://www.finkje.nl",
  };
}
