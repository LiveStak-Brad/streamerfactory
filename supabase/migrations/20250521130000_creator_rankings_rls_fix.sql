-- Run this if creator_rankings migration failed on can_schedule_battles() / is_staff().
-- Safe to re-run: creates helpers and (re)applies RLS policies.

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

alter table public.creator_performance_stats enable row level security;

alter table public.creator_rankings enable row level security;

drop policy if exists "creator_performance_stats_select_network" on public.creator_performance_stats;

create policy "creator_performance_stats_select_network" on public.creator_performance_stats for
select to authenticated using (public.can_schedule_battles ());

drop policy if exists "creator_performance_stats_staff_write" on public.creator_performance_stats;

create policy "creator_performance_stats_staff_write" on public.creator_performance_stats for all to authenticated using (public.is_staff ())
with check (public.is_staff ());

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
