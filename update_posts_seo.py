#!/usr/bin/env python3
import json
import os
import re
import urllib.parse

DB_URL = os.environ.get('DATABASE_URL', '')
# Parse mysql://user:pass@host:port/db
m = re.match(r'mysql://([^:]+):([^@]+)@([^:/]+):?(\d+)?/(.+)', DB_URL)
if not m:
    print(f"Could not parse DB_URL: {DB_URL[:50]}...")
    exit(1)

user, password, host, port, database = m.groups()
port = int(port) if port else 3306
# Remove query params from database name
database = database.split('?')[0]

print(f"Connecting to {host}:{port}/{database} as {user}")

import subprocess
result = subprocess.run(['pip3', 'install', 'pymysql', '-q'], capture_output=True)

import pymysql

conn = pymysql.connect(
    host=host,
    port=port,
    user=user,
    password=password,
    database=database,
    charset='utf8mb4',
    ssl={'ssl': True}
)

with open('/home/ubuntu/optimize_blog_posts_seo.json') as f:
    data = json.load(f)

cursor = conn.cursor()
updated = 0

for item in data['results']:
    output = item.get('output', {})
    post_id = output.get('post_id')
    content = output.get('optimized_content')
    
    if not post_id or not content:
        print(f"Skipping item with missing data")
        continue
    
    cursor.execute('UPDATE blog_posts SET content = %s WHERE id = %s', (content, int(post_id)))
    if cursor.rowcount > 0:
        updated += 1
        print(f"✓ Updated post ID {post_id}")
    else:
        print(f"✗ Post ID {post_id} not found")

conn.commit()
print(f"\nDone! Updated {updated} posts.")
cursor.close()
conn.close()
