# Streamer Factory — TikTok Network Chrome Extension

Staff/admin tool that reads **visible** TikTok Creator Network Backstage page data and syncs it to Streamer Factory on manual click.

## Disclaimer

This extension is for Streamer Factory staff/admin use only. It reads visible creator statistics from pages the authorized user can already access and sends selected stats to Streamer Factory for member management, rankings, and dashboards. It does not collect TikTok credentials, cookies, hidden tokens, or automate actions.

It may read **Streamer Factory session cookies** (on `thestreamerfactory.com` / `localhost:3000` only) so the sync API knows you are logged in as staff. It does **not** read TikTok auth cookies.

## Supported pages

| Page | Detection |
|------|-----------|
| Manage relationship | URL `/portal/anchor/relation`, title "Manage relationship" |
| Creator stats / performance | Contribution, performance, analytics paths |
| LIVE now | `/live` paths, "Live now" in title or body |

## Setup

```bash
cd browser-extension/streamer-factory-tiktok-network
npm install
npm run build
```

Load unpacked folder: `browser-extension/streamer-factory-tiktok-network` (not the parent `browser-extension` folder).

After code changes, run `npm run build` again, then **Reload** on `chrome://extensions`.

## Load unpacked in Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. **Load unpacked** → select `browser-extension/streamer-factory-tiktok-network`
4. Pin the extension icon

## Configure API URL

1. Extension **Options**
2. Enable **Use local dev API** for `http://localhost:3000`, or leave production `https://thestreamerfactory.com`
3. Save

## Usage

1. Log into **Streamer Factory** as staff (`owner`, `editor`, or `admin`)
2. Log into **TikTok Backstage** normally
3. Open a supported page (Manage relationship, stats, or LIVE now)
4. Click the extension → **Refresh preview**
5. Review detected rows → **Sync to Streamer Factory**

## Database

Apply migration before first sync:

`supabase/migrations/20250601120000_creator_network_import.sql`

Review imports at `/admin/creator-network`. Live Now appears on admin page and member dashboard when synced within the last 6 hours.

## Development

```bash
npm run watch   # recompile on change
npm test        # parser unit tests
```

After changing TypeScript, reload the extension on `chrome://extensions`.
