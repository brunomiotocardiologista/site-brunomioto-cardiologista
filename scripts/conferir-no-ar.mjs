// --------------------------------------------------------------------
// Confere, no site publicado, cada post do array POSTS de server/seed.ts.
// Roda sozinho no fim do enviar-para-github.command, depois do push, e
// espera o Railway publicar (perto de dez minutos) antes de desistir.
//
// Para cada post: responde 200, <title> e canonical certos, texto do
// artigo no HTML (o Google lê daqui, ver seção 4a do guia de
// infraestrutura), capa abrindo como imagem e slug presente no sitemap.
// Para o site: robots.txt ainda libera /api/trpc/.
//
// Só lê o site pela internet. NUNCA conecta no banco.
//
// Uso: node scripts/conferir-no-ar.mjs            (espera até 15 min)
//      node scripts/conferir-no-ar.mjs --uma-vez  (confere uma vez só)
// Sai com código 1 se algo continuar errado no fim da espera.
// --------------------------------------------------------------------
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SITE = "https://brunomiotocardiologista.com";
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEED = path.join(RAIZ, "server/seed.ts");
const ESPERA_MAX_MIN = 15;
const INTERVALO_S = 30;
const UMA_VEZ = process.argv.includes("--uma-vez");

// Mesma leitura do validar-seed.mjs: só o array POSTS, sem tocar no banco
const fonte = fs.readFileSync(SEED, "utf8");
const ini = fonte.indexOf("const POSTS = [");
const fim = fonte.indexOf("\n];", ini);
const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "conferir-no-ar-")), "posts.mjs");
fs.writeFileSync(tmp, fonte.slice(ini, fim + 3) + "\nexport default POSTS;\n");
const POSTS = (await import(pathToFileURL(tmp).href)).default;
fs.rmSync(path.dirname(tmp), { recursive: true, force: true });

// Igual ao escapeHtml de server/_core/vite.ts
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function buscar(url) {
  // ?v= fura cache intermediário; o servidor ignora a query
  const r = await fetch(`${url}${url.includes("?") ? "&" : "?"}v=${Date.now()}`, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; conferir-no-ar)" },
    redirect: "manual",
  });
  return { status: r.status, tipo: r.headers.get("content-type") || "", texto: await r.text() };
}

async function conferirTudo() {
  const problemas = [];

  const robots = await buscar(`${SITE}/robots.txt`);
  if (!robots.texto.includes("Allow: /api/trpc/"))
    problemas.push("robots.txt: não libera mais /api/trpc/ (o Google deixa de ler o texto dos posts)");

  const sitemap = await buscar(`${SITE}/sitemap.xml`);
  if (sitemap.status !== 200) problemas.push(`sitemap.xml: respondeu ${sitemap.status}`);

  for (const p of POSTS) {
    const url = `${SITE}/blog/${p.slug}`;
    const nome = `post ${p.id} (${p.slug})`;
    const pg = await buscar(url);
    if (pg.status !== 200) {
      problemas.push(`${nome}: respondeu ${pg.status}`);
      continue;
    }
    const h = pg.texto;
    if (!h.includes(`<title>${esc(p.title)} |`)) problemas.push(`${nome}: <title> não traz o título do post`);
    if (!h.includes(`<link rel="canonical" href="${url}" />`)) problemas.push(`${nome}: canonical errado`);
    if (!h.includes(`<h1>${esc(p.title)}</h1>`) || !h.includes("Outros artigos"))
      problemas.push(`${nome}: o texto do artigo não está no HTML`);
    if (p.excerpt && !h.includes(`<meta name="description" content="${esc(p.excerpt)}"`))
      problemas.push(`${nome}: description diferente do excerpt do seed.ts (deploy ainda não terminou?)`);
    if (sitemap.status === 200 && !sitemap.texto.includes(`<loc>${url}</loc>`))
      problemas.push(`${nome}: não está no sitemap`);
    const capa = await buscar(`${SITE}${p.coverImage}`);
    if (capa.status !== 200 || !capa.tipo.startsWith("image/"))
      problemas.push(`${nome}: capa ${p.coverImage} respondeu ${capa.status} ${capa.tipo}`);
  }
  return problemas;
}

const limite = Date.now() + ESPERA_MAX_MIN * 60_000;
let problemas = [];
for (let rodada = 1; ; rodada++) {
  try {
    problemas = await conferirTudo();
  } catch (e) {
    problemas = [`não consegui acessar o site: ${e.message}`];
  }
  if (!problemas.length || UMA_VEZ || Date.now() > limite) break;
  console.log(`Ainda não está tudo no ar (${problemas.length} pendência(s)). Nova tentativa em ${INTERVALO_S}s...`);
  await new Promise((r) => setTimeout(r, INTERVALO_S * 1000));
}

if (problemas.length) {
  console.error(`\nSite com ${problemas.length} problema(s):`);
  for (const pr of problemas) console.error("  - " + pr);
  process.exit(1);
}
console.log(`No ar e completo: ${POSTS.length} posts com texto no HTML, capa, canonical e sitemap conferidos.`);
