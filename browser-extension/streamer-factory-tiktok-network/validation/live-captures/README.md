# Live Backstage capture JSON

Save one file per page after **Refresh preview** → **Copy capture JSON** in the extension popup.

## Naming

| Page | Suggested filename |
|------|-------------------|
| Manage Relationship → Removed | `removed.json` |
| Manage Relationship → Invited | `invited.json` |
| Manage Relationship → Quit | `quit.json` |
| LIVE Now | `live-now.json` |
| Creator stats / performance | `creator-stats.json` |

## How to capture

1. Apply `supabase/apply-username-confidence-now.sql` in Supabase SQL Editor.
2. `chrome://extensions` → Reload **Streamer Factory — TikTok Network Sync**.
3. Rebuild extension if you changed code: `npm run build` in `browser-extension/streamer-factory-tiktok-network`.
4. Log into TikTok Backstage and Streamer Factory (staff).
5. Open each page, reload tab once, open popup → **Refresh preview** → **Copy capture JSON**.
6. Paste into the files above (or paste into chat for analysis).

## Analyze locally

From repo root:

```bash
node browser-extension/streamer-factory-tiktok-network/scripts/analyze-live-captures.mjs
```

Or from extension folder:

```bash
npm run analyze:captures
```

## Do not

- Replace `BACKSTAGE_STAT_SEEDS` yet
- Wire imports into public rankings yet

Goal: **95%+ username accuracy** on real DOM before leaderboard integration.
