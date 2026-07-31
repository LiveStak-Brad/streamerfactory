-- Phase 1A: nullable metrics, dataset metadata, roster / rank-up / incremental stores.
-- Missing Backstage values must stay NULL (never silent zeros).

-- ---------------------------------------------------------------------------
-- Batch diagnostics metadata
-- ---------------------------------------------------------------------------

alter table public.creator_network_import_batches
  add column if not exists dataset_type text,
  add column if not exists parser_version text,
  add column if not exists extension_version text,
  add column if not exists confidence numeric,
  add column if not exists validation_warnings jsonb default '[]'::jsonb,
  add column if not exists validation_failures jsonb default '[]'::jsonb,
  add column if not exists matched_signals jsonb default '[]'::jsonb,
  add column if not exists captured_at timestamptz,
  add column if not exists fields_updated jsonb default '[]'::jsonb,
  add column if not exists fields_preserved jsonb default '[]'::jsonb,
  add column if not exists roster_diff_preview jsonb;

-- ---------------------------------------------------------------------------
-- Nullable metrics on member_stats (unknown ≠ null, visible zero = 0)
-- ---------------------------------------------------------------------------

alter table public.creator_network_member_stats
  alter column coins_earned drop not null,
  alter column diamonds_earned drop not null,
  alter column engagements drop not null,
  alter column days_streamed drop not null,
  alter column hours_streamed drop not null,
  alter column live_duration_seconds drop not null;

alter table public.creator_network_member_stats
  alter column coins_earned drop default,
  alter column diamonds_earned drop default,
  alter column engagements drop default,
  alter column days_streamed drop default,
  alter column hours_streamed drop default,
  alter column live_duration_seconds drop default;

alter table public.creator_network_member_stats
  add column if not exists dataset_type text;

-- ---------------------------------------------------------------------------
-- Nullable metrics on performance mirror
-- ---------------------------------------------------------------------------

alter table public.creator_performance_stats
  alter column coins_earned drop not null,
  alter column days_streamed drop not null,
  alter column hours_streamed drop not null;

alter table public.creator_performance_stats
  alter column coins_earned drop default,
  alter column days_streamed drop default,
  alter column hours_streamed drop default;

-- ---------------------------------------------------------------------------
-- Roster entries (Manage Creators) — presence only, never overwrites stats
-- ---------------------------------------------------------------------------

create table if not exists public.creator_network_roster_entries (
  id uuid primary key default gen_random_uuid (),
  batch_id uuid references public.creator_network_import_batches (id) on delete set null,
  profile_id uuid references public.profiles (id) on delete set null,
  tiktok_username text not null,
  tiktok_username_raw text,
  tiktok_display_name text,
  tiktok_creator_id text,
  avatar_url text,
  username_confidence text,
  username_source text,
  invite_status text,
  creator_network_status text,
  source_page_url text,
  imported_by_profile_id uuid references public.profiles (id) on delete set null,
  imported_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists creator_network_roster_entries_batch_idx
  on public.creator_network_roster_entries (batch_id);

create index if not exists creator_network_roster_entries_username_idx
  on public.creator_network_roster_entries (tiktok_username);

create index if not exists creator_network_roster_entries_imported_at_idx
  on public.creator_network_roster_entries (imported_at desc);

alter table public.creator_network_roster_entries enable row level security;

drop policy if exists creator_network_roster_entries_staff_all on public.creator_network_roster_entries;
create policy creator_network_roster_entries_staff_all
  on public.creator_network_roster_entries
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('owner', 'editor', 'admin')
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('owner', 'editor', 'admin')
    )
  );

-- ---------------------------------------------------------------------------
-- Rank-up incentive (separate from activity / rankings)
-- ---------------------------------------------------------------------------

create table if not exists public.creator_network_rank_up_stats (
  id uuid primary key default gen_random_uuid (),
  batch_id uuid references public.creator_network_import_batches (id) on delete set null,
  profile_id uuid references public.profiles (id) on delete set null,
  tiktok_username text not null,
  tiktok_username_raw text,
  tiktok_display_name text,
  avatar_url text,
  tier_current text,
  tier_previous text,
  rank_up_status text,
  maintain_tier_status text,
  diamonds_earned integer,
  days_streamed integer,
  hours_streamed numeric,
  estimated_contribution text,
  username_confidence text,
  source_page_url text,
  imported_by_profile_id uuid references public.profiles (id) on delete set null,
  stat_period_start date,
  stat_period_end date,
  imported_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists creator_network_rank_up_stats_batch_idx
  on public.creator_network_rank_up_stats (batch_id);

create index if not exists creator_network_rank_up_stats_username_idx
  on public.creator_network_rank_up_stats (tiktok_username);

alter table public.creator_network_rank_up_stats enable row level security;

drop policy if exists creator_network_rank_up_stats_staff_all on public.creator_network_rank_up_stats;
create policy creator_network_rank_up_stats_staff_all
  on public.creator_network_rank_up_stats
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('owner', 'editor', 'admin')
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('owner', 'editor', 'admin')
    )
  );

-- ---------------------------------------------------------------------------
-- Incremental revenue incentive (separate store)
-- ---------------------------------------------------------------------------

create table if not exists public.creator_network_incremental_stats (
  id uuid primary key default gen_random_uuid (),
  batch_id uuid references public.creator_network_import_batches (id) on delete set null,
  profile_id uuid references public.profiles (id) on delete set null,
  tiktok_username text not null,
  tiktok_display_name text,
  avatar_url text,
  diamonds_earned integer,
  estimated_contribution text,
  username_confidence text,
  source_page_url text,
  imported_by_profile_id uuid references public.profiles (id) on delete set null,
  stat_period_start date,
  stat_period_end date,
  imported_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists creator_network_incremental_stats_batch_idx
  on public.creator_network_incremental_stats (batch_id);

alter table public.creator_network_incremental_stats enable row level security;

drop policy if exists creator_network_incremental_stats_staff_all on public.creator_network_incremental_stats;
create policy creator_network_incremental_stats_staff_all
  on public.creator_network_incremental_stats
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('owner', 'editor', 'admin')
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('owner', 'editor', 'admin')
    )
  );
