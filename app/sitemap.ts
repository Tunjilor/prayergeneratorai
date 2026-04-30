
import type { MetadataRoute } from "next";

const baseUrl = "https://prayergeneratorai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/prayer-for-anxiety",
    "/prayer-for-healing",
    "/prayer-for-family",
    "/prayer-for-strength",
    "/prayer-for-protection",
    "/prayer-for-guidance",
    "/morning-prayer",
    "/prayer-before-sleep",
    "/prayer-for-peace",
    "/prayer-for-gratitude",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
