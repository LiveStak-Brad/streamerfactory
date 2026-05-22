/**
 * Apply creator rankings migrations to remote Supabase.
 *
 * Requires in .env.local (or env):
 *   SUPABASE_DB_URL=postgresql://postgres.[project-ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
 *
 * Get URI from Supabase Dashboard → Project Settings → Database → Connection string (URI).
 *
 * Usage: node scripts/apply-rankings-migration.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvLocal() {
  const p = path.join(root, ".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
if (!dbUrl) {
  console.error(
    "Missing SUPABASE_DB_URL in .env.local.\n" +
      "Supabase Dashboard → Settings → Database → Connection string (URI, pooler).\n" +
      "Add: SUPABASE_DB_URL=postgresql://...",
  );
  process.exit(1);
}

const files = ["supabase/apply-rankings-now.sql"];

const client = new pg.Client({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  await client.connect();
  console.log("Connected. Applying rankings migrations…\n");
  for (const rel of files) {
    const full = path.join(root, rel);
    const sql = fs.readFileSync(full, "utf8");
    console.log(`→ ${rel}`);
    try {
      await client.query(sql);
      console.log("  OK\n");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("already exists") || msg.includes("duplicate")) {
        console.log("  (skipped duplicate — continuing)\n");
        continue;
      }
      throw err;
    }
  }
  await client.end();
  console.log("Done. Rankings tables and RLS are ready.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
