import mysql from '/home/ubuntu/cardio_clinic_website/node_modules/.pnpm/mysql2@3.15.1/node_modules/mysql2/promise.js';
import { readFileSync } from 'fs';

const DB_URL = process.env.DATABASE_URL;
const results = JSON.parse(readFileSync('/home/ubuntu/optimize_blog_posts_seo.json', 'utf8'));

const conn = await mysql.createConnection(DB_URL);

let updated = 0;
for (const item of results.results) {
  const { post_id, optimized_content } = item.output;
  if (!post_id || !optimized_content) {
    console.log('Skipping item with missing data:', item.input?.substring(0, 50));
    continue;
  }
  const [result] = await conn.execute(
    'UPDATE blog_posts SET content = ? WHERE id = ?',
    [optimized_content, parseInt(post_id)]
  );
  if (result.affectedRows > 0) {
    updated++;
    console.log(`✓ Updated post ID ${post_id}`);
  } else {
    console.log(`✗ Post ID ${post_id} not found`);
  }
}

console.log(`\nDone! Updated ${updated} posts.`);
await conn.end();
