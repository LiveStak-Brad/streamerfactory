-- Creator performance stats + leaderboard rankings (manual TikTok Creator Network entry).
-- Includes RLS helpers if an older migration batch was not applied to this project.

-- ---------------------------------------------------------------------------
-- RLS helpers (idempotent; required by policies below)
-- ---------------------------------------------------------------------------

create or replace function public.is_staff ()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select p.role in ('owner', 'editor', 'admin')
      from public.profiles p
      where p.id = auth.uid ()
    ),
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
    select 1
    from public.profiles p
    where p.id = auth.uid ()
      and p.role in ('owner', 'editor', 'member', 'admin')
  );
$$;

-- ---------------------------------------------------------------------------
-- creator_performance_stats
-- ---------------------------------------------------------------------------

create table if not exists public.creator_performance_stats (
  id uuid primary key default gen_random_uuid (),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  period_start date not null,
  period_end date not null,
  coins_earned integer not null default 0,
  days_streamed integer not null default 0,
  hours_streamed numeric not null default 0,
  activeness_level text not null default 'none' check (
    activeness_level in ('none', 'low', 'medium', 'high', 'elite')
  ),
  follower_count integer not null default 0,
  follower_growth integer not null default 0,
  battles_played integer not null default 0,
  battles_won integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint creator_performance_stats_period_check check (period_end >= period_start),
  constraint creator_performance_stats_profile_period_unique unique (profile_id, period_start, period_end)
);

create index if not exists creator_performance_stats_profile_id_idx
  on public.creator_performance_stats (profile_id);

create index if not exists creator_performance_stats_period_idx
  on public.creator_performance_stats (period_start, period_end);

create or replace function public.set_creator_performance_stats_updated_at ()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now ();
  return new;
end;
$$;

drop trigger if exists creator_performance_stats_set_updated_at on public.creator_performance_stats;

create trigger creator_performance_stats_set_updated_at
before update on public.creator_performance_stats
for each row
execute function public.set_creator_performance_stats_updated_at ();

-- ---------------------------------------------------------------------------
-- creator_rankings
-- ---------------------------------------------------------------------------

create table if not exists public.creator_rankings (
  id uuid primary key default gen_random_uuid (),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  ranking_period text not null default 'weekly',
  period_start date,
  period_end date,
  rank_score numeric not null default 0,
  rank_position integer,
  coins_rank integer,
  hours_rank integer,
  activity_rank integer,
  battle_rank integer,
  calculated_at timestamptz not null default now(),
  constraint creator_rankings_period_kind_check check (
    ranking_period in ('weekly', 'monthly', 'all-time')
  ),
  constraint creator_rankings_profile_period_unique unique (profile_id, ranking_period, period_start)
);

create index if not exists creator_rankings_period_idx
  on public.creator_rankings (ranking_period, period_start);

create index if not exists creator_rankings_position_idx
  on public.creator_rankings (ranking_period, period_start, rank_position);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.creator_performance_stats enable row level security;

alter table public.creator_rankings enable row level security;

-- Network members (member/editor/admin/owner) can read stats for leaderboard views.
drop policy if exists "creator_performance_stats_select_network" on public.creator_performance_stats;

create policy "creator_performance_stats_select_network" on public.creator_performance_stats for
select to authenticated using (public.can_schedule_battles ());

-- Staff insert/update/delete
drop policy if exists "creator_performance_stats_staff_write" on public.creator_performance_stats;

create policy "creator_performance_stats_staff_write" on public.creator_performance_stats for all to authenticated using (public.is_staff ())
with check (public.is_staff ());

-- Rankings: network members read; staff write
drop policy if exists "creator_rankings_select_network" on public.creator_rankings;

create policy "creator_rankings_select_network" on public.creator_rankings for
select to authenticated using (public.can_schedule_battles ());

drop policy if exists "creator_rankings_staff_write" on public.creator_rankings;

create policy "creator_rankings_staff_write" on public.creator_rankings for all to authenticated using (public.is_staff ())
with check (public.is_staff ());

grant select on public.creator_performance_stats to authenticated;

grant select on public.creator_rankings to authenticated;

grant insert, update, delete on public.creator_performance_stats to authenticated;

grant insert, update, delete on public.creator_rankings to authenticated;

comment on table public.creator_performance_stats is
  'Weekly/monthly TikTok Creator Network performance entered by staff (coins, hours, battles, etc.).';

comment on table public.creator_rankings is
  'Computed leaderboard rows per profile and period; recalculated after stat entry.';
