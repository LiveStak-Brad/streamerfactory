-- Paste this ENTIRE file in Supabase → SQL Editor → Run (one shot).
-- Creates extension import tables + username confidence columns + RLS.
-- Run this BEFORE apply-username-confidence-now.sql (or use this file only — it includes everything).
-- Safe to re-run: IF NOT EXISTS / CREATE OR REPLACE / DROP POLICY IF EXISTS.

-- ---------------------------------------------------------------------------
-- RLS helpers (required by policies below)
-- ---------------------------------------------------------------------------

create or replace function public.is_staff ()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.role in ('owner', 'editor', 'admin') from public.profiles p where p.id = auth.uid ()),
    false
  );
$$;

create or replace function public.can_schedule_battles ()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid () is not null
  and exists (
    select 1 from public.profiles p
    where p.id = auth.uid () and p.role in ('owner', 'editor', 'member', 'admin')
  );
$$;

-- ---------------------------------------------------------------------------
-- creator_network_import_batches
-- ---------------------------------------------------------------------------

create table if not exists public.creator_network_import_batches (
  id uuid primary key default gen_random_uuid (),
  imported_by_profile_id uuid references public.profiles (id) on delete set null,
  source text not null default 'chrome_extension',
  source_page_url text,
  detected_page_type text,
  relationship_tab text,
  raw_rows_count integer not null default 0,
  accepted_rows_count integer not null default 0,
  rejected_rows_count integer not null default 0,
  status text not null default 'pending' check (
    status in ('pending', 'processing', 'completed', 'failed')
  ),
  error_message text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists creator_network_import_batches_created_at_idx
  on public.creator_network_import_batches (created_at desc);

create index if not exists creator_network_import_batches_page_type_idx
  on public.creator_network_import_batches (detected_page_type);

-- ---------------------------------------------------------------------------
-- creator_network_member_stats
-- ---------------------------------------------------------------------------

create table if not exists public.creator_network_member_stats (
  id uuid primary key default gen_random_uuid (),
  batch_id uuid references public.creator_network_import_batches (id) on delete set null,
  profile_id uuid references public.profiles (id) on delete set null,
  tiktok_username text,
  tiktok_display_name text,
  username_confidence text check (username_confidence in ('high', 'medium', 'low')),
  username_source text,
  avatar_url text,
  creator_network_status text,
  coins_earned integer not null default 0,
  diamonds_earned integer not null default 0,
  engagements integer not null default 0,
  days_streamed integer not null default 0,
  hours_streamed numeric not null default 0,
  activeness_level text not null default 'none' check (
    activeness_level in ('none', 'low', 'medium', 'high', 'elite')
  ),
  live_duration_seconds integer not null default 0,
  invite_status text,
  violation_status text,
  risk_flag text,
  relationship_reason text,
  relationship_request_date text,
  stat_period_label text,
  stat_period_start date,
  stat_period_end date,
  source_page_url text,
  imported_by_profile_id uuid references public.profiles (id) on delete set null,
  imported_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint creator_network_member_stats_period_check check (
    stat_period_end is null
    or stat_period_start is null
    or stat_period_end >= stat_period_start
  ),
  constraint creator_network_member_stats_batch_username_period_unique unique (
    batch_id,
    tiktok_username,
    stat_period_start,
    stat_period_end
  )
);

create index if not exists creator_network_member_stats_tiktok_username_idx
  on public.creator_network_member_stats (tiktok_username);

create index if not exists creator_network_member_stats_profile_id_idx
  on public.creator_network_member_stats (profile_id);

create index if not exists creator_network_member_stats_imported_at_idx
  on public.creator_network_member_stats (imported_at desc);

create index if not exists creator_network_member_stats_period_idx
  on public.creator_network_member_stats (stat_period_start, stat_period_end);

create index if not exists creator_network_member_stats_activeness_idx
  on public.creator_network_member_stats (activeness_level);

create index if not exists creator_network_member_stats_coins_idx
  on public.creator_network_member_stats (coins_earned desc);

create index if not exists creator_network_member_stats_hours_idx
  on public.creator_network_member_stats (hours_streamed desc);

create index if not exists creator_network_member_stats_username_confidence_idx
  on public.creator_network_member_stats (username_confidence);

create or replace function public.set_creator_network_member_stats_updated_at ()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now ();
  return new;
end;
$$;

drop trigger if exists creator_network_member_stats_set_updated_at on public.creator_network_member_stats;

create trigger creator_network_member_stats_set_updated_at
before update on public.creator_network_member_stats
for each row
execute function public.set_creator_network_member_stats_updated_at ();

-- ---------------------------------------------------------------------------
-- creator_network_live_snapshots
-- ---------------------------------------------------------------------------

create table if not exists public.creator_network_live_snapshots (
  id uuid primary key default gen_random_uuid (),
  batch_id uuid references public.creator_network_import_batches (id) on delete cascade,
  profile_id uuid references public.profiles (id) on delete set null,
  tiktok_username text,
  tiktok_display_name text,
  username_confidence text check (username_confidence in ('high', 'medium', 'low')),
  username_source text,
  avatar_url text,
  stream_title text,
  viewer_count_text text,
  live_started_text text,
  live_badge_detected boolean not null default false,
  source_page_url text,
  imported_by_profile_id uuid references public.profiles (id) on delete set null,
  imported_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists creator_network_live_snapshots_batch_id_idx
  on public.creator_network_live_snapshots (batch_id);

create index if not exists creator_network_live_snapshots_username_idx
  on public.creator_network_live_snapshots (tiktok_username);

create index if not exists creator_network_live_snapshots_imported_at_idx
  on public.creator_network_live_snapshots (imported_at desc);

create index if not exists creator_network_live_snapshots_username_confidence_idx
  on public.creator_network_live_snapshots (username_confidence);

-- If tables already existed without confidence columns, add them:
alter table public.creator_network_member_stats
  add column if not exists username_confidence text check (username_confidence in ('high', 'medium', 'low')),
  add column if not exists username_source text;

alter table public.creator_network_live_snapshots
  add column if not exists username_confidence text check (username_confidence in ('high', 'medium', 'low')),
  add column if not exists username_source text,
  add column if not exists live_badge_detected boolean not null default false;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.creator_network_import_batches enable row level security;
alter table public.creator_network_member_stats enable row level security;
alter table public.creator_network_live_snapshots enable row level security;

drop policy if exists creator_network_import_batches_staff_all on public.creator_network_import_batches;
create policy creator_network_import_batches_staff_all
  on public.creator_network_import_batches
  for all
  to authenticated
  using (public.is_staff ())
  with check (public.is_staff ());

drop policy if exists creator_network_member_stats_staff_all on public.creator_network_member_stats;
create policy creator_network_member_stats_staff_all
  on public.creator_network_member_stats
  for all
  to authenticated
  using (public.is_staff ())
  with check (public.is_staff ());

drop policy if exists creator_network_member_stats_own_select on public.creator_network_member_stats;
create policy creator_network_member_stats_own_select
  on public.creator_network_member_stats
  for select
  to authenticated
  using (profile_id = auth.uid ());

drop policy if exists creator_network_live_snapshots_network_select on public.creator_network_live_snapshots;
create policy creator_network_live_snapshots_network_select
  on public.creator_network_live_snapshots
  for select
  to authenticated
  using (public.can_schedule_battles ());

drop policy if exists creator_network_live_snapshots_staff_all on public.creator_network_live_snapshots;
create policy creator_network_live_snapshots_staff_all
  on public.creator_network_live_snapshots
  for all
  to authenticated
  using (public.is_staff ())
  with check (public.is_staff ());

grant select on public.creator_network_import_batches to authenticated;
grant select, insert, update, delete on public.creator_network_import_batches to authenticated;

grant select on public.creator_network_member_stats to authenticated;
grant select, insert, update, delete on public.creator_network_member_stats to authenticated;

grant select on public.creator_network_live_snapshots to authenticated;
grant select, insert, update, delete on public.creator_network_live_snapshots to authenticated;

-- Public /rankings read for latest stats import (see apply-public-leaderboard-now.sql)
create or replace function public.latest_creator_network_stats_batch_id ()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.creator_network_import_batches
  where status = 'completed'
    and detected_page_type in ('creator_stats', 'manage_relationship')
    and accepted_rows_count > 0
  order by created_at desc
  limit 1;
$$;

grant execute on function public.latest_creator_network_stats_batch_id () to anon, authenticated;
grant select on public.creator_network_import_batches to anon;
grant select on public.creator_network_member_stats to anon;

drop policy if exists creator_network_import_batches_public_latest on public.creator_network_import_batches;
create policy creator_network_import_batches_public_latest
  on public.creator_network_import_batches
  for select
  to anon, authenticated
  using (id = public.latest_creator_network_stats_batch_id ());

drop policy if exists creator_network_member_stats_public_leaderboard on public.creator_network_member_stats;
create policy creator_network_member_stats_public_leaderboard
  on public.creator_network_member_stats
  for select
  to anon, authenticated
  using (batch_id = public.latest_creator_network_stats_batch_id ());
