# Streamer Factory — Creator Intelligence Platform

## Architecture Audit & Design Specification

**Status:** Phase 1 audit complete — no production behavior changed  
**Date:** 2026-07-31  
**Scope:** Chrome extension, sync pipeline, archival, Creator Intelligence Platform, verification, coaching  

---

## 0. Executive verdict

The current TikTok Network Sync extension **works for its intended happy path**: staff opens the monthly Activeness / Creator performance incentives table, refreshes preview, and syncs diamonds / days / hours into Streamer Factory rankings.

It fails as a **reliable operating system** because:

1. **Page identity is too coarse.** Activity Incentive, Rank Incentive, Workspace, Manage Creators, and other Backstage surfaces collapse into ~3 types (`creator_stats` | `manage_relationship` | `live_now`). Wrong columns → wrong or zeroed metrics.
2. **Sync is human-driven and page-bound.** Brad must open the right page, refresh, sync, repeat. Automation exists only as optional auto-sync for `creator_stats`.
3. **Roster reconciliation does not exist.** `/members` unions the latest import **plus** the static `NETWORK_MEMBERS` roster, so departed creators stay visible.
4. **Manage relationship is parsed but never written.** Server rejects non-`creator_stats` rows.
5. **Validation is shallow.** Shape checks exist; semantic gates (expected creator count, required columns, confidence thresholds) do not abort bad overwrites.
6. **OAuth and Backstage are separate pipelines.** Login Kit can fail with non-JSON / sandbox / redirect_uri issues; it never feeds rankings.

**Principle going forward:** Prefer a slower, validated sync over a fast sync that corrupts creator data. Preserve working incentives → rankings path while hardening page detection, validation, and roster lifecycle.

---

## 1. Full extension audit

### 1.1 Location & packaging

| Item | Path |
|------|------|
| Extension root | `browser-extension/streamer-factory-tiktok-network/` |
| Manifest | MV3 — `manifest.json` |
| Build | `scripts/build.mjs` → `dist/*.js` |
| Tests | `tests/parser.test.ts` + HTML fixtures |

### 1.2 Architecture (current)

```
┌─────────────────┐   BUILD_SYNC_PAYLOAD    ┌──────────────────┐
│  popup.html/ts  │ ───────────────────────►│ contentScript.ts │
│  Refresh/Sync   │◄────────────────────────│ detect + extract │
└────────┬────────┘                         └──────────────────┘
         │ SYNC_IMPORT
         ▼
┌─────────────────┐   cookie / MAIN-world   ┌──────────────────┐
│ background.ts   │ ───────────────────────►│ SF API (staff)   │
│ + autoSync*     │◄────────────────────────│ /api/extension/* │
└─────────────────┘                         └────────┬─────────┘
                                                     ▼
                                            Supabase import tables
                                            → performance_stats
                                            → rankings / members
```

### 1.3 Manifest surface

- **Permissions:** `storage`, `activeTab`, `scripting`, `cookies`
- **Hosts:** TikTok Backstage + seller hosts; `thestreamerfactory.com` + localhost
- **Content scripts:** Backstage → `contentScript.js`; SF site → `sf-bridge.js`
- **Auth model:** Does **not** read TikTok cookies. Uses SF session (open staff tab + cookies / bridge) for API calls.

### 1.4 Popup workflow (manual)

1. Open popup → `FETCH_ME` (`/api/extension/me`) — must be staff
2. `Refresh preview` → inject/message content script → `BUILD_SYNC_PAYLOAD`
3. Review rows / confidence / page type
4. `Sync` → only if `detectedPageType` is `creator_stats` or `live_now`
5. Optional: Clear LIVE snapshots; copy capture JSON; open rankings/members

### 1.5 Page detection (critical gap)

**File:** `src/parser/detectPage.ts`  
**Types today:** `manage_relationship | creator_stats | live_now | unknown`

Detection priority:

1. LIVE now (path/title/body)
2. **Any** revenue/incentive/performance/contribution/analytics cue → `creator_stats`
3. Relation/relationship → `manage_relationship`
4. Fallback `/creator` or “coins/diamonds” body → `creator_stats`
5. `unknown`

**Missing page identities (product requirement vs code):**

| Backstage surface | Today | Needed |
|-------------------|-------|--------|
| Workspace | unknown / mis-tagged | `workspace` |
| Manage Creators / Manage relationship | `manage_relationship` | keep + tab status |
| Activity / Activeness Incentive | `creator_stats` | `activity_incentive` |
| Rank Incentive | `creator_stats` (wrong columns) | `rank_incentive` |
| Incremental Incentive | `creator_stats` | `incremental_incentive` |
| Creator Details | unknown / partial | `creator_details` |
| Violations | partial (risk text heuristics) | `violations` |
| Revenue | `creator_stats` | `revenue` |
| Campaigns / Bootcamp | unknown | future types |
| LIVE now | `live_now` | keep |

Root cause of “Activity works, Rank pulls incorrect fields”: both pages match `/incentive` / “incentive” title / “activeness incentive” body heuristics and share **one** `parseStatsRow` + `inferColumnMap`. Rank Incentive columns (rank, tier, bonus thresholds) are not the Activity schema, so hours/days/diamonds map to wrong cells or default to 0.

### 1.6 Capture / parsers

| Page type | Parser | Fields |
|-----------|--------|--------|
| `manage_relationship` | `parseRelationshipRow` | username, display, avatar, tab status, request date, reason |
| `creator_stats` / `unknown` | `parseStatsRow` | diamonds, engagements, days, hours, activeness |
| `live_now` | multi-strategy LIVE card cascade | handle, avatar, viewers, LIVE duration |

Hours/days parsing intentionally takes the **actual** side of `2h 32m / 20h` and `0d / 30d`. Pure targets (`30d`, `0h / 20h` with no actual) become 0. Missing hour column → `hoursStreamed` undefined → server stores **0**.

### 1.7 Auto-sync (optional)

- Off by default (Options warning: prefer manual Sync)
- Only meaningful for `creator_stats` with diamonds
- 5-minute throttle + fingerprint
- Not a multi-page network update

---

## 2. Existing sync architecture

### 2.1 API endpoints

| Method | Route | Role |
|--------|-------|------|
| GET | `/api/extension/me` | Staff probe |
| POST | `/api/extension/tiktok-network/import` | Accept payload |
| POST | `/api/extension/tiktok-network/clear-live` | Clear LIVE window |

### 2.2 Server write path (`import.ts`)

1. Insert `creator_network_import_batches` (`processing`)
2. Build profile match maps (profiles + applications usernames)
3. Branch:
   - `live_now` → `creator_network_live_snapshots` (**matched profiles only**)
   - not `creator_stats` → **reject all rows** (includes manage_relationship)
   - `creator_stats` → `creator_network_member_stats` + upsert `creator_performance_stats` for matches
4. Complete batch; revalidate rankings / members / live pages

### 2.3 Matching

- Username/handle based (`normalizeHandle` + alias map + unique prefix ≥ 6)
- Not TikTok `open_id` (OAuth-only)
- Exclusions via `network-exclusions.ts`
- Unmatched stats rows stored with `profile_id` null; unmatched LIVE rows dropped

### 2.4 Statistics mapping

| Extension | `member_stats` | `creator_performance_stats` |
|-----------|----------------|-------------------------------|
| diamonds | `diamonds_earned` + `coins_earned` (same value) | `coins_earned` |
| days | sanitized (30 → 0; >31 → 0) | same |
| hours | 0 if missing | same |
| activeness | enum normalize | same |
| period | forced monthly bounds | period_start/end |

### 2.5 Public consumers

- `/rankings` ← latest completed `creator_stats` batch (`leaderboard-from-import.ts`)
- `/members` ← import members **union** static `NETWORK_MEMBERS` (stale creators persist)
- Live Now ← recent snapshots (freshness ~6h)

---

## 3. Identified bugs & root causes

| ID | Symptom | Root cause | Severity |
|----|---------|------------|----------|
| P1 | Rank Incentive / wrong page → bad fields | Coarse `creator_stats` + single column mapper | **Critical** |
| P2 | 0 LIVE hours / wrong days | Missing columns → defaults; target cells → 0; column misalignment | **Critical** |
| P3 | Old creators remain on site | No roster diff; directory merges static roster | **Critical** |
| P4 | Manage Creators sync useless | Server rejects non-`creator_stats` | High |
| P5 | Popup “unmatched” for matched creators | `else` binds wrong `if` in `import.ts` (~151) | Medium |
| P6 | Weekly UI stamped as calendar month | `statPeriodKind` coerced to monthly | Medium |
| P7 | LIVE creators missing on site | Snapshots require SF profile match | Medium |
| P8 | TikTok connect “invalid response” | Token exchange non-JSON / sandbox / redirect_uri; or callback without `code` returns plaintext verification | High |
| P9 | Chart round diamonds rejected | `isChartMisreadDiamonds` false positives | Low–Med |
| P10 | Cross-origin iframe LIVE empty | `all_frames: false` + same-origin enumerate | Medium |

### 3.1 Incorrect statistics — decision tree

```
Wrong zeros / wrong incentive values?
├─ Was detectedPageType the intended surface?
│  ├─ No → page confusion (P1). Abort; do not upload.
│  └─ Yes → continue
├─ Did header map find hours/days columns?
│  ├─ No → parser miss (P2). Abort if required fields missing.
│  └─ Yes → continue
├─ Cells look like targets only (30d, 0h/20h)?
│  └─ Actual = 0 by design — confirm against Backstage UI
├─ Lazy-loaded rows not in DOM?
│  └─ Scroll/pagination incomplete capture
└─ Stale cache on SF?
   └─ Revalidate after import; check batch timestamps
```

---

## 4. Recommended redesign (extension)

### 4.1 Page registry

Each Backstage surface becomes a **PageSpec**:

```ts
type PageSpec = {
  id: BackstagePageId;           // activity_incentive | rank_incentive | …
  match: { path?: RegExp[]; title?: RegExp[]; body?: RegExp[]; nav?: RegExp[] };
  parser: (doc, ctx) => ParseResult;
  requiredFields: string[];
  supportedFields: string[];
  syncMode: "stats" | "roster" | "live" | "preview_only";
  minConfidence: number;         // 0–1
  expectedRowRange?: [number, number];
};
```

**Rules:**

- Detection must prefer **unique page title / H1 / URL segment** over shared nav chrome.
- Confidence score from: URL match, title match, required headers present, row count band, sample field plausibility.
- If confidence < threshold **or** page id ∉ allowed sync set → **friendly warning, Sync disabled**.

### 4.2 Preserve what works

- Keep Activeness / monthly performance → rankings path as the default trusted sync.
- Keep LIVE now as a separate sync mode.
- Do not delete historical `member_stats` / Hall of Fame / academy data when archiving.

---

## 5. Automatic synchronization architecture

### Target UX

```
Update Network
    ↓
Orchestrator opens / focuses each required Backstage URL (staff session)
    ↓
Per-page: wait for DOM ready → parse → validate → stage
    ↓
Cross-page validation (roster ∩ stats)
    ↓
Atomic upload (or all-or-nothing by package)
    ↓
Revalidate SF caches
    ↓
Complete report
```

### Constraints (non-negotiable)

- Still staff-authorized, visible-DOM only (no TikTok credential theft).
- Chrome MV3: prefer **guided tab navigation** + content-script capture over silent background scraping that TikTok may break.
- Correctness > speed: abort package if any required page fails validation.

### Phased automation

| Phase | Behavior |
|-------|----------|
| A (now) | Manual, but page-aware warnings + validation gates |
| B | “Update Network” checklist: extension lists required pages; Brad visits each; extension auto-captures when confident |
| C | Extension drives tab navigation through known Backstage URLs (with user consent), captures, validates, uploads |
| D | Optional scheduled reminder; never unattended corruption |

**Do not ship C until A validation is solid.**

---

## 6. Data validation pipeline

### Pre-upload gates (extension + server)

1. **Page identity** — known PageSpec, confidence ≥ threshold  
2. **Schema** — required columns present for that page  
3. **Cardinality** — creator count within expected band (e.g. network size ± N of last good roster)  
4. **Uniqueness** — no duplicate handles  
5. **Metric ranges** — days 0–31; hours 0–744; diamonds ≤ plausibility cap  
6. **Null rate** — abort if hours missing for >X% of rows on Activity page  
7. **Diff sanity** — vs last completed batch: not all zeros; not >Y% diamond collapse  
8. **Roster mode** — Manage Creators must return ≥ min network size  

On failure: **abort sync**, show human-readable reasons, **do not write** (or write batch status `failed` with zero accepted rows).

Server `validate.ts` today only checks payload shape — extend with semantic validators shared conceptually with the extension.

---

## 7. Archived creator workflow

### Problem

Website shows creators no longer on Backstage because directory merges import + static roster and never marks removals.

### Model

Add first-class lifecycle (conceptual schema):

| Field | Meaning |
|-------|---------|
| `network_status` | `active` \| `removed` \| `invited` \| `pending` \| `archived` |
| `archived_at` | When removed from Backstage roster |
| `archived_reason` | `missing_from_roster_sync` \| `manual` \| `excluded` |
| `reactivated_at` | If they return |

### Sync behavior (Manage Creators / roster page)

1. Capture Backstage active roster set `B`
2. Load SF active network set `S`
3. `B − S` → unmatched import / invite candidates (existing matching report)
4. `S − B` → mark `network_status = removed`, `archived_at = now`
5. Never delete: stats history, graduation, academy, achievements, Hall of Fame

### Visibility rules when `removed`

Hide from: leaderboards, rankings, monthly incentives, active network counts, Live Now promotion lists.  
Preserve: admin history, member profile (optional “Former network” badge), StreamerU, achievements.

### Reactivation

Next roster sync finds handle in `B` again → `active`, clear archive flags, resume leaderboard eligibility. Instant.

---

## 8. Creator Intelligence Platform architecture

### Product framing

Do **not** mirror Backstage tables. Translate sync + StreamerU + growth into **daily coaching**.

```
Backstage sync ──► Performance facts
StreamerU     ──► Learning facts
Growth XP     ──► Engagement facts
Achievements  ──► Milestones
        │
        ▼
  Intelligence Engine
        │
        ├── Creator Score (0–100) + explanations
        ├── Today's Mission
        ├── Today's Coaching
        ├── Goals / progress bars
        ├── Recommended lesson
        └── Upcoming milestones
```

### Member home (first viewport jobs)

One composition focused on:

1. Brand / identity  
2. **Today’s Mission** (one CTA)  
3. Short coaching sentence  
4. Creator Score + why it moved  
5. Progress toward monthly goals (hours / days / diamonds)

Secondary sections (scroll): Consistency, Achievements, Academy recommendation, Network Rank, TikTok connection, milestones.

### Existing building blocks to reuse

| Need | Existing |
|------|----------|
| Rankings composite | `rank_score` in `src/lib/rankings/scoring.ts` |
| Engagement progression | Factory XP / Creator Rank (`growth/xp/creator-rank.ts`) |
| Achievements | `achievement_definitions` + `member_achievements` |
| Progress stream | `progress_events` pipeline |
| Academy | StreamerU curriculum + completion adapter |

**Creator Score is new** — distinct from Factory XP Creator Rank and from rankings `rank_score`. Document the difference in UI.

---

## 9. Public profile & EPK architecture

### Routes (proposed)

- `/c/[handle]` — public creator profile  
- `/c/[handle]/kit` — optional Electronic Press Kit (toggle)

### Sections

Bio · Creator Story · TikTok · Platforms · Categories · Certifications · Achievements · StreamerU Progress · Hall of Fame · Brand Assets · Media Kit · Contact · Availability · Social Links · Verification badge · Creator Score (optional public)

### Data ownership

- Profile content: member-editable + owner moderation  
- Performance snapshots: from last validated sync (public-safe aggregates only)  
- Verification: shared model with OAuth + manual owner approval (see §14)

### Privacy

Default: public profile opt-in. EPK opt-in separately. Never expose raw Backstage export dumps.

---

## 10. Creator Score specification (0–100)

### Pillars (weights — v1 proposal)

| Pillar | Weight | Signals |
|--------|--------|---------|
| Consistency | 20 | Days streamed / month, streak |
| Streaming | 15 | Hours vs activity goal |
| Growth | 15 | Diamonds MoM, rank delta |
| Content | 10 | Engagements / content proxies |
| Professionalism | 10 | Violations inverse, profile completeness |
| Learning | 15 | StreamerU completion velocity |
| Community | 10 | Battles, referrals, network participation |
| Improvement | 5 | Score delta positive weeks |

### Rules

- Always store **component breakdown** + **human reason strings** when score changes  
- Cap single-day swings  
- Missing Backstage data → hold prior score components; do not zero blindly  
- Show: “+2 because you hit 6/7 live days” not just “82 → 84”

### Relation to other scores

| System | Purpose |
|--------|---------|
| Creator Score | Coaching / OS health (0–100) |
| Factory XP Creator Rank | Habit & missions progression |
| Rankings `rank_score` | Competitive monthly leaderboard |

---

## 11. Daily coaching engine

### Trigger

After each **validated** sync (and optionally daily cron from last facts):

1. Diff vs prior period / goals  
2. Select top insight (what changed)  
3. Select one action (what to do today)  
4. Attach estimated impact (score / tier / bonus proximity)  
5. Attach StreamerU lesson if weakness detected  

### Example output

```json
{
  "headline": "You streamed 6 days this month.",
  "body": "Great consistency. You are 1 hour from your activity goal.",
  "action": "Go LIVE for 75 minutes tonight.",
  "impact": ["+1 Creator Score", "Closer to Tier 3", "Closer to Activity Bonus"],
  "lessonKey": "streameru.consistency.habit-stack",
  "missionKey": "daily.go_live_75"
}
```

### Weakness → Academy mapping

| Signal | Lesson track |
|--------|----------------|
| Low days / streak breaks | Consistency |
| Low battle participation | Battles curriculum |
| Incomplete profile / branding | Presence Mastery |
| Low engagements / retention proxies | Content Creation |

---

## 12. Achievement framework

Extend existing `achievement_definitions` / engine rather than a parallel system.

### Suggested definitions (Backstage-aware + journey)

| Key | Trigger |
|-----|---------|
| `first_live` | First LIVE snapshot or days ≥ 1 |
| `streak_7` | 7-day live streak |
| `lives_100` | Cumulative lives |
| `diamonds_100k` / `diamonds_1m` | Cumulative / monthly thresholds |
| `graduated_core` | StreamerU Core complete |
| `advanced_creator` | Advanced track |
| `hall_of_fame` | HoF induction |
| `perfect_month` | Hit days + hours goals |
| `community_builder` | Referrals / battles |
| `professional_creator` | Profile + EPK + zero violations window |

Emit via `progress_events` so projections stay consistent.

---

## 13. Academy integration plan

1. Intelligence engine tags weaknesses from sync + learning velocity  
2. Map tags → StreamerU module IDs (content registry)  
3. Member dashboard shows **one** Recommended Lesson + **one** Recommended Mission  
4. Completing lesson emits progress event → may lift Learning pillar of Creator Score  
5. Do not auto-force curriculum; recommend and deep-link  

Keep StreamerU assessment XP separate from Factory XP / Creator Score Learning pillar (existing rule in `creator-rank.ts`).

---

## 14. TikTok verification architecture

### Current state

- Login Kit OAuth: start → callback → token exchange → `tiktok_connections` → profile sync  
- Scopes: `user.info.basic`, `user.info.profile`, `user.info.stats`  
- Callback without `code` returns **plaintext site verification** (TikTok portal probe) — easy to misread as “broken OAuth”  
- Exchange errors explicitly mention non-JSON / sandbox / redirect_uri mismatch  
- Independent from Backstage import (no open_id in rankings match)

### Likely “invalid response” causes

1. Sandbox vs Production key mismatch  
2. `redirect_uri` not exact match (www vs apex, trailing slash)  
3. TikTok returns HTML/error page → `readTikTokJsonBody` fails  
4. State cookie lost (`invalid_state`)  
5. Portal GET without code → verification plaintext (expected for TikTok, confusing for humans)

### Target unified verification model

```ts
type CreatorVerification = {
  status: "unverified" | "pending_manual" | "verified_oauth" | "verified_manual" | "revoked";
  method: "tiktok_oauth" | "owner_manual" | null;
  tiktokOpenId?: string;
  handle?: string;
  verifiedAt?: string;
  verifiedByProfileId?: string; // manual
  evidence?: string; // note / screenshot ref for manual
};
```

- OAuth success → `verified_oauth`  
- Until OAuth reliable: owner-approved manual verification → `verified_manual`  
- Same badge UI; method stored for audit  
- Webhook `authorization.removed` → revoke OAuth method; do not erase manual history without policy  

---

## 15. Recommended implementation roadmap

### Phase 1A — Correctness (highest priority)

1. Expand `DetectedPageType` / PageSpec registry (Activity vs Rank vs Roster vs LIVE)  
2. Unique parsers + required headers per page  
3. Popup: confidence + warning; block Sync on wrong/low-confidence page  
4. Fix `unmatchedUsernames` else-bug in `import.ts`  
5. Server semantic validation gates (creator count, null hours rate, diff sanity)  
6. Wire Manage Creators → roster sync **only** (status fields), not rankings overwrite  

### Phase 1B — Roster lifecycle

7. `network_status` + archive fields  
8. Diff Backstage roster vs SF active set → auto-archive removed  
9. Hide archived from public leaderboards / active counts  
10. Reactivation on return  
11. Stop blindly unioning departed static roster members as “active”

### Phase 1C — Guided Update Network

12. Checklist UX in extension (required pages, capture status)  
13. Package upload after all pages validated  
14. Admin sync report (accepted / rejected / archived / unmatched)

### Phase 2 — Creator Intelligence OS

15. Creator Score v1 + explanations  
16. Daily coaching generation post-sync  
17. Dashboard “Today’s Mission / Coaching”  
18. Achievement expansions tied to sync + StreamerU  
19. Academy recommendation links  
20. Public profiles + optional EPK  
21. Unified verification (OAuth harden + manual path)

### Phase 3 — Automation maturity

22. Consent-based tab orchestration for Update Network  
23. Stronger monitoring / batch health alerts  
24. Only then consider semi-scheduled sync reminders

---

## 16. Compatibility & safety rules

- Do not replace working Activity Incentive → rankings sync until new parsers prove equal or better on fixtures + live capture  
- Keep import batch audit trail  
- Prefer abort over overwrite  
- Backwards compatible payload: new page types additive; unknown types never write stats  
- Staff-only extension remains staff-only  

---

## 17. Key file index

| Area | Paths |
|------|--------|
| Extension | `browser-extension/streamer-factory-tiktok-network/` |
| Detect | `…/src/parser/detectPage.ts` |
| Parse | `…/src/parser/extractRows.ts`, `extractLiveNow.ts` |
| Popup | `…/src/popup.ts` |
| Import | `src/lib/creator-network/import.ts` |
| Validate | `src/lib/creator-network/validate.ts` |
| Match | `src/lib/creator-network/match-profiles.ts` |
| Members dir | `src/lib/members/members-directory-data.ts` |
| OAuth | `src/app/api/tiktok/oauth/*`, `src/lib/tiktok/oauth.ts` |
| Growth | `src/lib/growth/**` |
| Rankings | `src/lib/rankings/scoring.ts` |

---

## Phase 1A implementation status

Implemented in-repo (see changelog of extension `0.2.0` / parser `1a.1`):

- PageSpec registry with distinct dataset types
- Unique parsers; missing metrics stay missing (nullable DB migration)
- Popup confidence / validation gates
- Roster ingest + roster-diff preview (no auto-archive)
- Admin batch diagnostics
- Match-accounting bug fixed

### Remaining limitations (Phase 1B)

- Auto-archive of missing creators (preview only in 1A)
- Public `/members` still unions static `NETWORK_MEMBERS` (labeled in admin diagnostics)
- Guided multi-page Update Network orchestration
- Creator Score / coaching / EPKs (Phase 2)
