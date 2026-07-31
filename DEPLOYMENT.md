# Deployment notes

## StreamerU Core 24 university release (required migrations)

**Milestone:** StreamerU Core 24 — 24 gold-standard lessons, assessments, certificates/diploma path, Resource Library, lesson media admin workflow, Hall of Fame graduates wiring, Advanced Creator “Coming Soon” (empty program shell).

### Exact migration files (apply in this order)

These files exist in `supabase/migrations/`:

```text
1. 20260731140000_engagement_expansion.sql
2. 20260731160000_streameru_assessments.sql
3. 20260731180000_hall_of_fame_streameru_graduates.sql
4. 20260731180000_rename_rules_cert_to_advanced_creator.sql
5. 20260731200000_streameru_lesson_media.sql
```

| Migration | Enables |
|-----------|---------|
| `20260731140000_engagement_expansion.sql` | Factory certificates / graduations / career status tables used by StreamerU credential surfaces and member progress |
| `20260731160000_streameru_assessments.sql` | StreamerU assessment / XP persistence tables (quizzes, finals, graduation progress) |
| `20260731180000_hall_of_fame_streameru_graduates.sql` | Hall of Fame StreamerU Graduates table |
| `20260731180000_rename_rules_cert_to_advanced_creator.sql` | Renames Rules-era certificate display naming toward Advanced Creator shell |
| `20260731200000_streameru_lesson_media.sql` | `streameru_lesson_assets` table, RLS, public Storage bucket `streameru-lesson-media`, Lesson 1 seed requests |

> Note: `20260731190000_approve_applicant_member_idempotent.sql` may exist in the working tree but is **not** part of the StreamerU Core 24 release. Apply it separately if needed for applications.

### Deploy order

1. Apply the five StreamerU-related migrations above (in timestamp order) to the target Supabase project.
2. Confirm Storage bucket `streameru-lesson-media` is **public** (created by the lesson-media migration).
3. Prefer `SUPABASE_SERVICE_ROLE_KEY` on the server for admin media uploads (falls back to user session + Storage RLS).
4. Deploy the Next.js app.
5. Smoke-check:
   - `/streameru` (hub)
   - `/streameru/start-strong-on-tiktok-live` (Lesson 1)
   - `/streameru/scaling-consistency` (Lesson 24)
   - `/streameru/library`
   - `/streameru/graduation`
   - `/admin/streameru/setup` (staff)
6. Optional: in `/admin/streameru/setup`, run **Sync production briefs to DB** so L2–L24 media requests persist beyond code catalogs.

### Pre-migration behavior (fails soft)

| Area | Before migration |
|------|------------------|
| Lesson pages | Expanded lesson bodies still render from code; quizzes/missions work locally |
| Assessment DB sync | Soft-fails; local progress still works |
| Lesson media table | Soft-fails to production-brief catalog; public pages hide unpublished placeholders |
| Hall of Fame graduates | Soft-fails empty if table missing |
| Certificates / graduations | Soft-fail reads as documented in Engagement section |

### Required environment variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (recommended for admin StreamerU media uploads)

### Manual Supabase steps

1. Apply the five migrations listed above.
2. Verify bucket `streameru-lesson-media` exists and is public.
3. Confirm staff roles (`owner` / `editor` / `admin`) can manage `streameru_lesson_assets` via RLS.
4. Optional: sync production briefs from `/admin/streameru/setup`.

### Naming (do not conflate)

| Surface | Term | Store |
|--------|------|--------|
| Member UI | **Factory XP** / Creator Rank | `reputation_ledger` (Factory Reputation) |
| Admin | Factory Reputation | Same ledger + `reputation_rules` / titles |
| StreamerU assessments | StreamerU XP (separate) | Must **not** write `reputation_ledger` |

Optional unpublished lesson media never blocks quiz, mission, certificate, or graduation progress.

---

## Engagement system (required migration)

**Milestone:** Factory engagement — Factory XP, Creator Rank, weekly challenges, semester certificates, career path, graduation.

**Before deploying app code that includes this milestone, apply:**

```text
supabase/migrations/20260731140000_engagement_expansion.sql
```

This migration creates:

- `certificate_definitions` / `member_certificates`
- `member_graduations`
- `member_career_status`
- Weekly mission templates, extra achievements, Factory XP reward rules
- Staff-only mentor/manager reputation title thresholds (never auto-unlocked)

### Deploy order

1. Apply `20260731140000_engagement_expansion.sql` to the target Supabase project (CLI, SQL editor, or your usual migration path).
2. Deploy the Next.js app.
3. Smoke-check `/member/dashboard` and `/member/progress` as a network member.

### Pre-migration behavior

If the app is deployed **before** the migration:

- Dashboard and `/member/progress` still load (certificate / graduation / career table reads fail soft).
- Existing daily missions, streaks, and reputation ledger continue to work.
- New weekly challenges, certificate issuance, and career status persistence stay inactive until the migration is applied.

### Career appointments

Mentor and Manager are **eligibility states** until staff appoint them by inserting `member_reputation_titles` (`mentor` / `manager`). The reputation engine never auto-unlocks those keys.
