import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import { and, desc, eq, ne } from "drizzle-orm";
import { marked } from "marked";
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

// Mesma conversao do client/src/pages/BlogPost.tsx (tira o titulo repetido do
// topo do markdown e usa breaks + gfm), para o texto do servidor bater com o
// que o leitor ve depois que o React monta.
function renderMarkdown(content: string): string {
  try {
    const cleaned = content.replace(/^#{1,2}[^\n]*\n+/, "");
    const result = marked.parse(cleaned, { breaks: true, gfm: true });
    return typeof result === "string" ? result : escapeHtml(content);
  } catch {
    return escapeHtml(content);
  }
}

/**
 * Artigo completo em HTML, colocado dentro de <div id="root">. O Google le o
 * texto e os links na primeira varredura, sem depender de rodar JavaScript
 * nem de chamar /api/trpc. O React usa createRoot (nao hydrate), entao ao
 * montar ele substitui este bloco pela pagina normal. E o mesmo conteudo que
 * o leitor ve, sem nada escondido.
 */
function renderArticleHtml(
  post: { title: string; excerpt: string | null; content: string; publishedAt: Date | null },
  others: { title: string; slug: string }[]
): string {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "America/Sao_Paulo",
      })
    : "";
  const links = others
    .map(o => `<li><a href="/blog/${encodeURI(o.slug)}">${escapeHtml(o.title)}</a></li>`)
    .join("");

  return `<article style="max-width:760px;margin:0 auto;padding:32px 16px;font-family:Georgia,serif;line-height:1.7;color:#0D1B35">
<nav><a href="/">Dr. Bruno Mioto – Cardiologista</a> / <a href="/blog">Blog</a></nav>
<h1>${escapeHtml(post.title)}</h1>
<p>Dr. Bruno Mahler Mioto · Cardiologista CRM 112007-SP${date ? ` · ${date}` : ""}</p>
${post.excerpt ? `<p><em>${escapeHtml(post.excerpt)}</em></p>` : ""}
${renderMarkdown(post.content)}
${links ? `<h2>Outros artigos</h2><ul>${links}</ul>` : ""}
</article>`;
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

  // Espelho das rotas de client/src/App.tsx. Qualquer outro caminho e 404 de
  // verdade: sem isto o fallback da SPA responde 200 com a casca do site, que o
  // Google le como soft 404. Fica ANTES do bloco de blog e exclui blogMatch de
  // proposito: se o banco cair, o codigo abaixo deixa o artigo passar com 200 e
  // tags genericas, e um post valido nao pode virar 404 por causa disso.
  const KNOWN_ROUTES = new Set(["/", "/kairosmentoria", "/blog", "/avaliacao", "/links", "/admin", "/404"]);
  const normalizedPath = cleanPath.replace(/\/+$/, "") || "/";
  if (!blogMatch && !KNOWN_ROUTES.has(normalizedPath)) {
    return { html: result, status: 404 };
  }
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
            content: blogPosts.content,
            published: blogPosts.published,
            publishedAt: blogPosts.publishedAt,
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
          : `${SITE_BASE_URL}/foto-bruno-og.jpg`;

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
        // og:image:height, a estatica do index e quadrada (1200x1200, foto do
        // Bruno); capa de post e 1200x630. Sem isto a altura declarada mente
        // numa das duas, e quem monta o cartao confia na declaracao.
        result = result.replace(
          /<meta property="og:image:height" content="[^"]*"/,
          `<meta property="og:image:height" content="630"`
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

        // Corpo do artigo no HTML. So para post publicado: rascunho nunca
        // sai do banco por aqui, igual ao blog.getPost do tRPC.
        if (post.published) {
          const others = await db
            .select({ title: blogPosts.title, slug: blogPosts.slug })
            .from(blogPosts)
            .where(and(eq(blogPosts.published, true), ne(blogPosts.slug, slug)))
            .orderBy(desc(blogPosts.publishedAt));
          // Callback e nao string: texto com "R$" viraria padrao de substituicao
          const article = renderArticleHtml(post, others);
          result = result.replace(
            '<div id="root"></div>',
            () => `<div id="root">${article}</div>`
          );
        }
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
