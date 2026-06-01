# Parser Detection Report

Generated: 2026-06-01T02:08:57.296Z

> **Scope:** Automated validation against HTML fixtures that mirror known Backstage layouts.
> Live TikTok Backstage DOM was **not** accessed in this run (requires your logged-in browser).
> Use `validation/live-page-console-snippet.js` on real pages for live validation.

## Extension load status

- Built: `npm run build` in `browser-extension/streamer-factory-tiktok-network`
- Load unpacked in Chrome → select extension folder
- Popup previews saved under `validation/popup-previews/`

---

## Manage Relationship — Removed

- **Fixture:** `manage-relationship.html`
- **Simulated URL:** `https://live-backstage.tiktok.com/portal/anchor/relation?tab=removed`
- **Detected page type:** `manage_relationship`
- **Relationship tab:** `Removed`
- **Row count:** 2
- **Popup preview file:** `validation/popup-previews/manage-relationship-popup-preview.html`

### Popup preview (text)
```
@Peppatice45 · Peppatice45
@kaleidoscope · kaleidoscope views
```

### Field detection (first row)

| Field | Detected | Value | Confidence | Notes |
|-------|----------|-------|------------|-------|
| username | Yes | Peppatice45 | High |  |
| display name | Yes | Peppatice45 | High |  |
| avatar | Yes | https://example.com/a1.jpg | High |  |
| request date | Yes | 05/23/2024 | High |  |
| reason | Yes | problem | High |  |
| relationship status | Yes | Removed | High | From active tab label in fixture |

**Fields missed (first row):** none

### Raw JSON payload
```json
{
  "sourcePageUrl": "https://live-backstage.tiktok.com/portal/anchor/relation?tab=removed",
  "detectedPageType": "manage_relationship",
  "relationshipTab": "Removed",
  "rows": [
    {
      "tiktokUsername": "Peppatice45",
      "displayName": "Peppatice45",
      "avatarUrl": "https://example.com/a1.jpg",
      "creatorNetworkStatus": "Removed",
      "inviteStatus": "Removed",
      "relationshipRequestDate": "05/23/2024",
      "relationshipReason": "problem"
    },
    {
      "tiktokUsername": "kaleidoscope",
      "displayName": "kaleidoscope views",
      "avatarUrl": "https://example.com/a2.jpg",
      "creatorNetworkStatus": "Removed",
      "inviteStatus": "Removed",
      "relationshipRequestDate": "05/23/2024",
      "relationshipReason": "trying to poach within the network"
    }
  ]
}
```

---

## Manage Relationship — Invited

- **Fixture:** `manage-relationship-invited.html`
- **Simulated URL:** `https://live-backstage.tiktok.com/portal/anchor/relation?tab=invited`
- **Detected page type:** `manage_relationship`
- **Relationship tab:** `Invited`
- **Row count:** 2
- **Popup preview file:** `validation/popup-previews/manage-relationship-invited-popup-preview.html`

### Popup preview (text)
```
@SunShine · SunShine
@Jenny · Jenny RN
```

### Field detection (first row)

| Field | Detected | Value | Confidence | Notes |
|-------|----------|-------|------------|-------|
| username | Yes | SunShine | High |  |
| display name | Yes | SunShine | High |  |
| avatar | Yes | https://p16-sign.tiktokcdn.com/avatar1.jpeg | High |  |
| request date | Yes | 05/28/2026 | High |  |
| reason | Yes | Pending scan | High |  |
| relationship status | Yes | Invited | High | From active tab label in fixture |

**Fields missed (first row):** none

### Raw JSON payload
```json
{
  "sourcePageUrl": "https://live-backstage.tiktok.com/portal/anchor/relation?tab=invited",
  "detectedPageType": "manage_relationship",
  "relationshipTab": "Invited",
  "rows": [
    {
      "tiktokUsername": "SunShine",
      "displayName": "SunShine",
      "avatarUrl": "https://p16-sign.tiktokcdn.com/avatar1.jpeg",
      "creatorNetworkStatus": "Invited",
      "inviteStatus": "Invited",
      "relationshipRequestDate": "05/28/2026",
      "relationshipReason": "Pending scan"
    },
    {
      "tiktokUsername": "Jenny",
      "displayName": "Jenny RN",
      "avatarUrl": "https://p16-sign.tiktokcdn.com/avatar2.jpeg",
      "creatorNetworkStatus": "Invited",
      "inviteStatus": "Invited",
      "relationshipRequestDate": "05/15/2026",
      "relationshipReason": "Invited"
    }
  ]
}
```

---

## Manage Relationship — Quit

- **Fixture:** `manage-relationship-quit.html`
- **Simulated URL:** `https://live-backstage.tiktok.com/portal/anchor/relation?tab=quit`
- **Detected page type:** `manage_relationship`
- **Relationship tab:** `Quit`
- **Row count:** 1
- **Popup preview file:** `validation/popup-previews/manage-relationship-quit-popup-preview.html`

### Popup preview (text)
```
@Former · Former Creator
```

### Field detection (first row)

| Field | Detected | Value | Confidence | Notes |
|-------|----------|-------|------------|-------|
| username | Yes | Former | High |  |
| display name | Yes | Former Creator | High |  |
| avatar | Yes | https://example.com/q1.jpg | High |  |
| request date | Yes | 03/10/2025 | High |  |
| reason | Yes | left network voluntarily | High |  |
| relationship status | Yes | Quit | High | From active tab label in fixture |

**Fields missed (first row):** none

### Raw JSON payload
```json
{
  "sourcePageUrl": "https://live-backstage.tiktok.com/portal/anchor/relation?tab=quit",
  "detectedPageType": "manage_relationship",
  "relationshipTab": "Quit",
  "rows": [
    {
      "tiktokUsername": "Former",
      "displayName": "Former Creator",
      "avatarUrl": "https://example.com/q1.jpg",
      "creatorNetworkStatus": "Quit",
      "inviteStatus": "Quit",
      "relationshipRequestDate": "03/10/2025",
      "relationshipReason": "left network voluntarily"
    }
  ]
}
```

---

## LIVE Now

- **Fixture:** `live-now.html`
- **Simulated URL:** `https://live-backstage.tiktok.com/portal/anchor/live`
- **Detected page type:** `live_now`
- **Row count:** 2
- **Popup preview file:** `validation/popup-previews/live-now-popup-preview.html`

### Popup preview (text)
```
@sunshine_live · SunShine · 128 viewers
@creator_two · Creator Two · 45 viewers
```

### Field detection (first row)

| Field | Detected | Value | Confidence | Notes |
|-------|----------|-------|------------|-------|
| username | Yes | sunshine_live | High |  |
| display name | Yes | SunShine | High |  |
| avatar | Yes | https://example.com/live1.jpg | High |  |
| stream title | Yes | Morning chat & battles | High | Heuristic — may pick display line on real DOM |
| live duration | **No** | — | Low | Parsed from started/duration text, not seconds on live rows |
| viewer count | Yes | 128 viewers | High |  |

**Fields missed (first row):** live duration

### Raw JSON payload
```json
{
  "sourcePageUrl": "https://live-backstage.tiktok.com/portal/anchor/live",
  "detectedPageType": "live_now",
  "rows": [],
  "liveRows": [
    {
      "tiktokUsername": "sunshine_live",
      "displayName": "SunShine",
      "avatarUrl": "https://example.com/live1.jpg",
      "streamTitle": "Morning chat & battles",
      "viewerCountText": "128 viewers"
    },
    {
      "tiktokUsername": "creator_two",
      "displayName": "Creator Two",
      "avatarUrl": "https://example.com/live2.jpg",
      "viewerCountText": "45 viewers",
      "liveStartedText": "Started 1h 20m ago"
    }
  ]
}
```

---

## Creator Stats / Performance

- **Fixture:** `creator-stats.html`
- **Simulated URL:** `https://live-backstage.tiktok.com/portal/data/performance`
- **Detected page type:** `creator_stats`
- **Stat period label:** `Contribution details · Weekly`
- **Row count:** 2
- **Popup preview file:** `validation/popup-previews/creator-stats-popup-preview.html`

### Popup preview (text)
```
@sunshine_live_09 · SunShine
@Jenny · Jenny RN
```

### Field detection (first row)

| Field | Detected | Value | Confidence | Notes |
|-------|----------|-------|------------|-------|
| coins | Yes | 413200 | High | Mapped from Gifts/diamonds column |
| hours | Yes | 90.2 | High |  |
| days | Yes | 21 | High |  |
| activeness | Yes | high | High |  |
| engagements | **No** | — | Low |  |

**Fields missed (first row):** engagements

### Raw JSON payload
```json
{
  "sourcePageUrl": "https://live-backstage.tiktok.com/portal/data/performance",
  "detectedPageType": "creator_stats",
  "statPeriodLabel": "Contribution details · Weekly",
  "rows": [
    {
      "tiktokUsername": "sunshine_live_09",
      "displayName": "SunShine",
      "avatarUrl": "https://example.com/s1.jpg",
      "coinsEarned": 413200,
      "diamondsEarned": 413200,
      "daysStreamed": 21,
      "hoursStreamed": 90.2,
      "liveDurationText": "90h 12m",
      "liveDurationSeconds": 324720,
      "activenessLevel": "high"
    },
    {
      "tiktokUsername": "Jenny",
      "displayName": "Jenny RN",
      "avatarUrl": "https://example.com/s2.jpg",
      "coinsEarned": 107100,
      "diamondsEarned": 107100,
      "daysStreamed": 17,
      "hoursStreamed": 1.0966666666666667,
      "liveDurationText": "1h 5m 48s",
      "liveDurationSeconds": 3948,
      "activenessLevel": "medium"
    }
  ]
}
```

---

## Summary confidence matrix

| Page type | Field | Fixture confidence | Live TikTok confidence (estimated) |
|-----------|-------|-------------------|----------------------------------|
| manage_relationship | username | High | Medium |
| manage_relationship | display name | High | Medium |
| manage_relationship | avatar | High | High |
| manage_relationship | request date | High | High |
| manage_relationship | reason | High | High |
| manage_relationship | relationship status | High | Medium |
| manage_relationship | username | High | Medium |
| manage_relationship | display name | High | Medium |
| manage_relationship | avatar | High | High |
| manage_relationship | request date | High | High |
| manage_relationship | reason | High | High |
| manage_relationship | relationship status | High | Medium |
| manage_relationship | username | High | Medium |
| manage_relationship | display name | High | Medium |
| manage_relationship | avatar | High | High |
| manage_relationship | request date | High | High |
| manage_relationship | reason | High | High |
| manage_relationship | relationship status | High | Medium |
| live_now | username | High | Medium |
| live_now | display name | High | Medium |
| live_now | avatar | High | High |
| live_now | stream title | High | Low |
| live_now | live duration | Low | Low |
| live_now | viewer count | High | Medium |
| creator_stats | coins | High | Medium |
| creator_stats | hours | High | Medium |
| creator_stats | days | High | Medium |
| creator_stats | activeness | High | Medium |
| creator_stats | engagements | Low | Low |

## Next step: validate on live Backstage

1. Load extension unpacked in Chrome
2. Log into TikTok Backstage
3. Open DevTools console on each page
4. Paste contents of `validation/live-page-console-snippet.js`
5. Copy JSON output into `validation/live-captures/` for comparison