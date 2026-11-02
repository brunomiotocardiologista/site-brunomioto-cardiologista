// --------------------------------------------------------------------
// Valida o array POSTS de server/seed.ts antes de todo deploy. Um
// template literal mal fechado derruba o boot e tira o site inteiro
// do ar, não só o post novo.
//
// Desde 30/10/2026 também barra slug fora do padrão, capa fora do padrão
// (WebP 1200x630 até 150 KB) e backup .md ausente ou diferente do seed.
//
// Só lê arquivos. NUNCA conecta no banco.
//
// Uso: node scripts/validar-seed.mjs   (sai com código 1 se houver erro)
// --------------------------------------------------------------------
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEED = path.join(RAIZ, "server/seed.ts");
const PUBLIC = path.join(RAIZ, "client/public");
// Backups ficam fora da pasta do site de proposito (ela vai para o GitHub publico)
const BACKUPS = path.join(RAIZ, "..", "Documentos", "Blog");
const SLUG_OK = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const CAPA_LARGURA = 1200;
const CAPA_ALTURA = 630;
const CAPA_MAX_KB = 150;
const CAMPOS = ["id", "title", "slug", "excerpt", "categoryId", "coverImage", "content"];
const CATEGORIAS = [1, 2, 3, 4, 5, 6];

// Largura e altura de um WebP lendo so o cabecalho (VP8, VP8L ou VP8X)
function dimensoesWebp(buf) {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return null;
  const tipo = buf.toString("ascii", 12, 16);
  if (tipo === "VP8X") return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
  if (tipo === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
  if (tipo === "VP8L")
    return [
      1 + (((buf[22] & 0x3f) << 8) | buf[21]),
      1 + (((buf[24] & 0x0f) << 10) | (buf[23] << 2) | ((buf[22] & 0xc0) >> 6)),
    ];
  return null;
}

// Corpo do backup .md sem o frontmatter e sem o rodape [[Blog — Indice]]
function corpoDoBackup(texto) {
  return texto
    .replace(/^---[\s\S]*?\n---\n/, "")
    .replace(/\n---\n\[\[Blog[\s\S]*$/, "")
    .trim();
}

const erros = [];
const fonte = fs.readFileSync(SEED, "utf8");

const ini = fonte.indexOf("const POSTS = [");
const fim = fonte.indexOf("\n];", ini);
if (ini < 0 || fim < 0) {
  console.error("Não achei o array POSTS em server/seed.ts.");
  process.exit(1);
}
const bloco = fonte.slice(ini, fim + 3);

// ${ dentro do content vira interpolação e quebra o texto ou o boot
bloco.split("\n").forEach((linha, i) => {
  if (linha.includes("${")) erros.push(`linha ~${fonte.slice(0, ini).split("\n").length + i}: contém \${`);
});

const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "validar-seed-")), "posts.mjs");
fs.writeFileSync(tmp, bloco + "\nexport default POSTS;\n");
let POSTS;
try {
  POSTS = (await import(pathToFileURL(tmp).href)).default;
} catch (e) {
  console.error("O array POSTS não compila (template literal mal fechado?):\n  " + e.message);
  process.exit(1);
} finally {
  fs.rmSync(path.dirname(tmp), { recursive: true, force: true });
}

const ids = new Set();
const slugs = new Set(POSTS.map((p) => p.slug));
if (slugs.size !== POSTS.length) erros.push("existem slugs repetidos");

for (const p of POSTS) {
  const nome = `post ${p.id} (${p.slug})`;
  const chaves = Object.keys(p);
  if (chaves.length !== CAMPOS.length || !CAMPOS.every((c) => chaves.includes(c)))
    erros.push(`${nome}: campos ${chaves.join(", ")}, esperado ${CAMPOS.join(", ")}`);
  if (ids.has(p.id)) erros.push(`${nome}: id repetido`);
  ids.add(p.id);
  for (const c of ["title", "slug", "excerpt", "content", "coverImage"])
    if (typeof p[c] !== "string" || !p[c].trim()) erros.push(`${nome}: ${c} vazio`);
  if (!CATEGORIAS.includes(p.categoryId)) erros.push(`${nome}: categoryId ${p.categoryId} inexistente`);
  if (p.coverImage && !fs.existsSync(path.join(PUBLIC, p.coverImage.replace(/^\//, ""))))
    erros.push(`${nome}: coverImage ${p.coverImage} não existe em client/public`);
  for (const m of (p.content || "").matchAll(/\/blog\/([a-z0-9-]+)/g))
    if (!slugs.has(m[1])) erros.push(`${nome}: link interno para /blog/${m[1]}, slug inexistente`);

  // Slug: minusculas, sem acento, palavras separadas por um hifen so
  if (typeof p.slug === "string" && !SLUG_OK.test(p.slug))
    erros.push(`${nome}: slug fora do padrão (só minúsculas sem acento, números e hífen simples)`);

  // Capa no padrao do blog: WebP 1200x630, ate 150 KB
  const capa = p.coverImage ? path.join(PUBLIC, p.coverImage.replace(/^\//, "")) : "";
  if (capa && fs.existsSync(capa)) {
    if (!capa.endsWith(".webp")) erros.push(`${nome}: capa ${p.coverImage} não é .webp`);
    else {
      const buf = fs.readFileSync(capa);
      const dim = dimensoesWebp(buf);
      if (!dim) erros.push(`${nome}: capa ${p.coverImage} não é um WebP válido`);
      else if (dim[0] !== CAPA_LARGURA || dim[1] !== CAPA_ALTURA)
        erros.push(`${nome}: capa ${p.coverImage} tem ${dim[0]}x${dim[1]}, esperado ${CAPA_LARGURA}x${CAPA_ALTURA}`);
      const kb = Math.round(buf.length / 1024);
      if (kb > CAPA_MAX_KB) erros.push(`${nome}: capa ${p.coverImage} tem ${kb} KB, máximo ${CAPA_MAX_KB} KB`);
    }
  }

  // Backup .md completo e identico ao texto que vai para o ar. O historico do
  // git so existe desde 24/10/2026; antes disso o backup e a unica copia.
  const backup = path.join(BACKUPS, `${String(p.id).padStart(2, "0")}-${p.slug}.md`);
  if (!fs.existsSync(backup))
    erros.push(`${nome}: falta o backup Documentos/Blog/${path.basename(backup)}`);
  else if (corpoDoBackup(fs.readFileSync(backup, "utf8")) !== (p.content || "").trim())
    erros.push(`${nome}: o backup Documentos/Blog/${path.basename(backup)} não bate com o content do seed.ts (regerar a partir do seed)`);
}

if (erros.length) {
  console.error(`seed.ts com ${erros.length} problema(s):`);
  for (const e of erros) console.error("  - " + e);
  process.exit(1);
}
console.log(`seed.ts ok: ${POSTS.length} posts, ids e slugs únicos, links internos, capas e backups conferidos.`);
