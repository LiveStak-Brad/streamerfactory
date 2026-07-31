# Phase 1A Deliverables

**Status:** Implementation complete (not committed)  
**Extension:** `0.2.0` · **Parser:** `1a.1`  
**Migration:** `supabase/migrations/20260731180000_creator_network_phase1a.sql`

---

## Confirmed bugs fixed

1. **`unmatchedUsernames` else-bug** — matched creators no longer appear unmatched (`match-accounting.ts` + used in `import.ts`). Regression tests cover matched / unmatched / isolated malformed rows.
2. **Missing → 0** — hours/days/diamonds no longer coerced to 0 when absent; DB columns nullable; UI shows “—” / “Not available” / “Waiting for Activeness data”.
3. **Wrong-page sync** — Rank-up / Workspace / low-confidence pages cannot sync into Activeness rankings.

---

## PageSpec registry

Single source of truth: `browser-extension/.../src/parser/pageSpecs/registry.ts`

| Dataset type | Display name | Sync | Store |
|--------------|--------------|------|-------|
| `activity_incentive` | Activeness Incentive | Yes | `member_stats` + `performance_stats` |
| `rank_up_incentive` | Rank-up Incentive | Yes | `rank_up_stats` only |
| `incremental_incentive` | Incremental Revenue Incentive | Yes | `incremental_stats` only |
| `creator_roster` | Manage Creators / Roster | Yes | `roster_entries` + diff preview |
| `live_now` | LIVE Now | Yes | `live_snapshots` |
| `workspace_metrics` | Workspace overview | Preview only | none |
| `unknown` | Unknown | Blocked | none |

Each spec: id, display name, path/title/body patterns, required/optional headings, parser, sync mode, metrics, min confidence, creator-count behavior.

Legacy wire aliases: `creator_stats` → `activity_incentive`, `manage_relationship` → `creator_roster`.

---

## Parser behavior by page

- **Activeness** — preserves working grid/table mapping; metric fields with `present`/`missing`; visible `0h`/`0d` stay present zeros.
- **Rank-up** — tier previous/current, rank-up status, maintain status, diamonds, days, hours, estimated contribution; never writes rankings tables.
- **Incremental** — diamonds + contribution; separate table.
- **Roster** — presence/status only; no incentive metrics.
- **LIVE Now** — existing cascade parsers.
- **Workspace** — empty rows; preview-only.

---

## Validation rules

Extension `validateCapture` (blocking vs warning):

**Blocking:** unknown page, preview-only, low confidence, required headers missing, activity/rank ambiguity, zero rows when expected, duplicate usernames, >25% missing hours on Activeness, impossible day/hour values.

**Warning:** creator count Δ >10%, optional columns missing, some malformed usernames.

Blocked syncs can be recorded server-side with `syncBlocked` without writing stats.

---

## Popup UX

Shows: detected page + confidence, row count, metrics available, last successful sync per page type, validation result, Safe to sync / Sync blocked pill. Sync button disabled unless validation passes.

---

## Server API changes

- Distinct `datasetType` on payload; validated in `validate.ts`
- Batch metadata: parser/extension version, confidence, signals, warnings/failures, fields updated/preserved, roster diff, captured_at
- Roster / rank-up / incremental tables
- Nullable metric columns
- Import route revalidates rankings only for `activity_incentive`

---

## Roster-diff behavior

Roster sync writes `creator_network_roster_entries` and returns preview:

- Present in Backstage  
- Missing from Backstage  
- Website-only static entries  
- New creator candidates  
- Possible username changes  
- Unmatched  

**No automatic archiving in Phase 1A.**

---

## Fixtures & tests

Fixtures: `fixtures/phase1a-*.html` (activeness, rank-up, incremental, manage creators, workspace, wrong page, empty, partial).

Tests:

- Extension: all prior parser tests + Phase 1A suite (53 total)
- Server: `match-accounting.test.ts`, `roster-diff.test.ts`, `metric-field.test.ts`

---

## Remaining limitations

- Public `/members` still unions `NETWORK_MEMBERS` (behavior preserved; admin docs label static-only)
- Archiving not activated
- No multi-page auto-navigation
- Apply SQL migration before production use of new tables/nullable columns

---

## Recommended Phase 1B

1. Activate archive after live roster validation  
2. Stop treating static-only as active on public surfaces  
3. Guided Update Network checklist (still no unattended scrape)  
4. Stronger creator-count baselines from last good roster batch  
