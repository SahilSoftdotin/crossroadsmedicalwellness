import type { MetadataRoute } from "next";
import { services } from "@/lib/data/services";
import { programs } from "@/lib/data/programs";
import { articles } from "@/lib/data/articles";

const SITE_URL = "https://thrivelongevitycenter.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/pricing", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/programs", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/reviews", priority: 0.7 },
    { path: "/research", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/assessment", priority: 0.8 },
    { path: "/get-started", priority: 0.7 },
    { path: "/addiction-medicine", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
    { path: "/accessibility", priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const programEntries: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${SITE_URL}/programs/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/research/${a.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...serviceEntries, ...programEntries, ...articleEntries];
}
