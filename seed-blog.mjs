import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, ".env") });

const articles = JSON.parse(
  readFileSync(resolve("/home/ubuntu/blog_articles.json"), "utf-8")
);

async function seed() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);

  // Get category IDs
  const [categories] = await connection.execute("SELECT id, name FROM blog_categories");
  const catMap = {};
  for (const cat of categories) {
    catMap[cat.name] = cat.id;
  }
  console.log("Categories found:", catMap);

  // Check if we need to add missing categories
  const neededCategories = [...new Set(articles.map(a => a.category))];
  for (const catName of neededCategories) {
    if (!catMap[catName]) {
      const slug = catName.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      await connection.execute(
        "INSERT INTO blog_categories (name, slug) VALUES (?, ?)",
        [catName, slug]
      );
      const [rows] = await connection.execute("SELECT id FROM blog_categories WHERE name = ?", [catName]);
      catMap[catName] = rows[0].id;
      console.log(`Created category: ${catName} (id: ${catMap[catName]})`);
    }
  }

  // Insert articles
  for (const article of articles) {
    const categoryId = catMap[article.category];
    if (!categoryId) {
      console.warn(`Category not found for: ${article.category}`);
      continue;
    }

    // Check if slug already exists
    const [existing] = await connection.execute(
      "SELECT id FROM blog_posts WHERE slug = ?",
      [article.slug]
    );

    if (existing.length > 0) {
      console.log(`Article already exists: ${article.title}`);
      continue;
    }

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await connection.execute(
      `INSERT INTO blog_posts (title, slug, excerpt, content, categoryId, published, publishedAt)
       VALUES (?, ?, ?, ?, ?, 1, ?)`,
      [
        article.title,
        article.slug,
        article.excerpt,
        article.content,
        categoryId,
        now
      ]
    );
    console.log(`✅ Inserted: ${article.title}`);
  }

  await connection.end();
  console.log("\nDone! All articles inserted.");
}

seed().catch(console.error);
