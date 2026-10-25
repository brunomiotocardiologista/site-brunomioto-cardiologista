// --------------------------------------------------------------------
// Valida o array POSTS de server/seed.ts antes de todo deploy. Um
// template literal mal fechado derruba o boot e tira o site inteiro
// do ar, não só o post novo.
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
const CAMPOS = ["id", "title", "slug", "excerpt", "categoryId", "coverImage", "content"];
const CATEGORIAS = [1, 2, 3, 4, 5, 6];

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
}

if (erros.length) {
  console.error(`seed.ts com ${erros.length} problema(s):`);
  for (const e of erros) console.error("  - " + e);
  process.exit(1);
}
console.log(`seed.ts ok: ${POSTS.length} posts, ids e slugs únicos, links internos e capas conferidos.`);
