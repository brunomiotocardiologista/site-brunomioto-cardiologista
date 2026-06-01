import mysql from "mysql2/promise";

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const [result] = await conn.execute(
  `UPDATE blog_posts SET coverImage = ?, updatedAt = NOW()
   WHERE slug = ?`,
  [
    "/manus-storage/plano-acompanhamento-cover_aa10bc2e.png",
    "plano-de-acompanhamento-medico-o-que-e-e-por-que-pode-mudar-seus-resultados-de-saude",
  ]
);

console.log("Atualizado:", result.affectedRows, "linha(s)");
await conn.end();
