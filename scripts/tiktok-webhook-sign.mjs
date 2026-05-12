#!/usr/bin/env node
/**
 * Build a valid TikTok-Signature for POST /api/tiktok/webhook (same algorithm as
 * src/lib/tiktok/verify-webhook-signature.ts) and print a curl you can run against
 * production. If that returns 200 but the Developer Portal test still returns 403,
 * the portal is using a different client_secret than the one you passed here / in Vercel.
 *
 * Usage:
 *   node --env-file=.env.local scripts/tiktok-webhook-sign.mjs
 *   node scripts/tiktok-webhook-sign.mjs "<TIKTOK_CLIENT_SECRET>" '{"event":"ping"}' "https://www.thestreamerfactory.com/api/tiktok/webhook"
 */
import { createHmac } from "node:crypto";
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const secret = process.argv[2] || process.env.TIKTOK_CLIENT_SECRET;
const body = process.argv[3] ?? '{"event":"local_probe"}';
const url =
  process.argv[4] ||
  process.env.TIKTOK_WEBHOOK_TEST_URL ||
  "https://www.thestreamerfactory.com/api/tiktok/webhook";

if (!secret) {
  console.error(
    "Missing TIKTOK_CLIENT_SECRET. Try:\n  node --env-file=.env.local scripts/tiktok-webhook-sign.mjs\n  node scripts/tiktok-webhook-sign.mjs <secret> [jsonBody] [webhookUrl]",
  );
  process.exit(1);
}

const t = String(Math.floor(Date.now() / 1000));
const signedPayload = `${t}.${body}`;
const s = createHmac("sha256", secret).update(signedPayload, "utf8").digest("hex");
const header = `t=${t},s=${s}`;

const tmp = join(tmpdir(), `tiktok-webhook-body-${process.pid}.json`);
writeFileSync(tmp, body, "utf8");

console.log("Webhook URL:", url);
console.log("Body file (delete after testing):", tmp);
console.log("Tiktok-Signature:", header);
console.log("\nRun (Windows):\n");
console.log(
  `curl.exe -sS -i -X POST "${url}" -H "Content-Type: application/json" -H "Tiktok-Signature: ${header}" -d @${tmp}`,
);
console.log(
  '\nExpect HTTP/1.1 200 and {"ok":true}. If you get 403, the secret you passed is not the same bytes as TIKTOK_CLIENT_SECRET on the server you hit.\n',
);
