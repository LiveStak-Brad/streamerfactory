import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import pg from "pg";

import { requireAdmin } from "@/lib/auth/server";

export const runtime = "nodejs";

/**
 * One-time (re-runnable) apply of creator rankings DDL.
 * Requires SUPABASE_DB_URL in server env (Database URI from Supabase dashboard).
 */
export async function POST() {
  await requireAdmin();

  const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  if (!dbUrl) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "SUPABASE_DB_URL is not set on the server. Add your Database connection URI from Supabase → Settings → Database.",
      },
      { status: 503 },
    );
  }

  const sqlPath = path.join(process.cwd(), "supabase", "apply-rankings-now.sql");
  if (!fs.existsSync(sqlPath)) {
    return NextResponse.json({ ok: false, error: "apply-rankings-now.sql not found." }, { status: 500 });
  }

  const sql = fs.readFileSync(sqlPath, "utf8");
  const client = new pg.Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(sql);
    await client.end();
    return NextResponse.json({ ok: true, message: "Rankings tables and RLS applied." });
  } catch (err) {
    await client.end().catch(() => {});
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
