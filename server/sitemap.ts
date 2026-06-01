import { Express } from "express";
import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";

const BASE_URL = "https://brunomiotocardiologista.com";

export function registerSitemapRoutes(app: Express) {
  // ── sitemap.xml ──
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const db = await getDb();
      const posts = db
        ? await db
            .select({ slug: blogPosts.slug, publishedAt: blogPosts.publishedAt })
            .from(blogPosts)
            .where(eq(blogPosts.published, true))
            .orderBy(desc(blogPosts.publishedAt))
        : [];

      const today = new Date().toISOString().split("T")[0];

      const staticPages = [
        { url: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
      ];

      const blogEntries = posts.map((p) => ({
        url: `/blog/${p.slug}`,
        priority: "0.7",
        changefreq: "monthly",
        lastmod: p.publishedAt
          ? new Date(p.publishedAt).toISOString().split("T")[0]
          : today,
      }));

      const allEntries = [...staticPages, ...blogEntries];

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allEntries
  .map(
    (e) => `  <url>
    <loc>${BASE_URL}${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=3600");
      res.send(xml);
    } catch (err) {
      console.error("Sitemap error:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

  // ── robots.txt fallback via server (in case static file is not served) ──
  app.get("/robots.txt", (_req, res) => {
    res.set("Content-Type", "text/plain");
    res.send(
      `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${BASE_URL}/sitemap.xml\n`
    );
  });
}
