# Deployment notes

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

### Naming (do not conflate)

| Surface | Term | Store |
|--------|------|--------|
| Member UI | **Factory XP** / Creator Rank | `reputation_ledger` (Factory Reputation) |
| Admin | Factory Reputation | Same ledger + `reputation_rules` / titles |
| StreamerU assessments | StreamerU XP (separate) | Must **not** write `reputation_ledger` |

### Career appointments

Mentor and Manager are **eligibility states** until staff appoint them by inserting `member_reputation_titles` (`mentor` / `manager`). The reputation engine never auto-unlocks those keys.
