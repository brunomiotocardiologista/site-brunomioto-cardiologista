import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import { eq } from "drizzle-orm";
import viteConfig from "../../vite.config";
import { getDb } from "../db";
import { blogPosts } from "../../drizzle/schema";

const SITE_BASE_URL = "https://brunomiotocardiologista.com";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * For blog post routes, queries the DB and injects correct meta tags
 * (title, description, canonical, OG, Twitter) server-side so Googlebot
 * sees the right data before JavaScript runs.
 */
async function injectMetaTags(
  html: string,
  reqUrl: string
): Promise<{ html: string; status: number }> {
  const cleanPath = reqUrl.split("?")[0].split("#")[0] || "/";
  const canonicalUrl =
    cleanPath === "/" ? SITE_BASE_URL + "/" : SITE_BASE_URL + cleanPath;

  // Always fix the canonical tag
  let result = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // For blog post pages: inject all post-specific meta tags from DB.
  // Return 404 when the slug is not found so ghost URLs are de-indexed by Google.
  const blogMatch = cleanPath.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    try {
      const db = await getDb();
      if (db) {
        const rows = await db
          .select({
            title: blogPosts.title,
            excerpt: blogPosts.excerpt,
            coverImage: blogPosts.coverImage,
          })
          .from(blogPosts)
          .where(eq(blogPosts.slug, slug))
          .limit(1);

        const post = rows[0];

        // Slug not in DB → tell the client (and crawlers) it doesn't exist
        if (!post) {
          return { html: result, status: 404 };
        }

        const postTitle = `${post.title} | Dr. Bruno Mioto – Cardiologista`;
        const description =
          post.excerpt ||
          `Artigo sobre ${post.title} escrito pelo Dr. Bruno Mahler Mioto, cardiologista em São Paulo.`;
        const ogImage = post.coverImage
          ? post.coverImage.startsWith("http")
            ? post.coverImage
            : `${SITE_BASE_URL}${post.coverImage}`
          : `${SITE_BASE_URL}/foto-bruno.jpeg`;

        const safeTitle = escapeHtml(postTitle);
        const safeDesc = escapeHtml(description);

        // <title>
        result = result.replace(
          /<title>[^<]*<\/title>/,
          `<title>${safeTitle}</title>`
        );
        // meta description
        result = result.replace(
          /<meta name="description" content="[^"]*"/,
          `<meta name="description" content="${safeDesc}"`
        );
        // og:type
        result = result.replace(
          /<meta property="og:type" content="[^"]*"/,
          `<meta property="og:type" content="article"`
        );
        // og:url
        result = result.replace(
          /<meta property="og:url" content="[^"]*"/,
          `<meta property="og:url" content="${canonicalUrl}"`
        );
        // og:title
        result = result.replace(
          /<meta property="og:title" content="[^"]*"/,
          `<meta property="og:title" content="${safeTitle}"`
        );
        // og:description
        result = result.replace(
          /<meta property="og:description" content="[^"]*"/,
          `<meta property="og:description" content="${safeDesc}"`
        );
        // og:image
        result = result.replace(
          /<meta property="og:image" content="[^"]*"/,
          `<meta property="og:image" content="${ogImage}"`
        );
        // twitter:title
        result = result.replace(
          /<meta name="twitter:title" content="[^"]*"/,
          `<meta name="twitter:title" content="${safeTitle}"`
        );
        // twitter:description
        result = result.replace(
          /<meta name="twitter:description" content="[^"]*"/,
          `<meta name="twitter:description" content="${safeDesc}"`
        );
        // twitter:image
        result = result.replace(
          /<meta name="twitter:image" content="[^"]*"/,
          `<meta name="twitter:image" content="${ogImage}"`
        );
      }
    } catch (err) {
      console.error("Error injecting meta tags for blog post:", err);
    }
  }

  return { html: result, status: 200 };
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const rawPage = await vite.transformIndexHtml(url, template);
      const { html: page, status } = await injectMetaTags(rawPage, url);
      res.status(status).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // Inject correct meta tags per-route so Google sees the right data on first crawl
  app.use("*", async (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    const rawHtml = fs.readFileSync(indexPath, "utf-8");
    const { html: page, status } = await injectMetaTags(rawHtml, req.originalUrl);
    res.status(status).set("Content-Type", "text/html").send(page);
  });
}
