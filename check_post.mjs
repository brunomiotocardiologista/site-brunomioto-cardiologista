import mysql from "mysql2/promise";

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await conn.execute(
  "SELECT id, slug, published FROM blog_posts ORDER BY id DESC LIMIT 3"
);
rows.forEach(r => console.log(r.id, r.slug, r.published));
await conn.end();
