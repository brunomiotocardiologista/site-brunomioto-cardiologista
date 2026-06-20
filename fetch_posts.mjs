import mysql from '/home/ubuntu/cardio_clinic_website/node_modules/.pnpm/mysql2@3.15.1/node_modules/mysql2/promise.js';
import { writeFileSync } from 'fs';

const DB_URL = process.env.DATABASE_URL;
const conn = await mysql.createConnection(DB_URL);
const [rows] = await conn.execute('SELECT id, slug, title, content FROM blog_posts ORDER BY id');
writeFileSync('/tmp/blog_posts.json', JSON.stringify(rows, null, 2));
console.log('Saved', rows.length, 'posts to /tmp/blog_posts.json');
await conn.end();
