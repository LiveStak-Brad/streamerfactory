-- Factory Hall of Fame: permanent monthly archives + leadership + lifetime legends.
-- Locked months are immutable history. Admins archive once at month-end.

-- ---------------------------------------------------------------------------
-- Monthly archives
-- ---------------------------------------------------------------------------

create table if not exists public.hall_of_fame_months (
  year_month text primary key
    check (year_month ~ '^\d{4}-(0[1-9]|1[0-2])$'),
  status text not null default 'locked'
    check (status = 'locked'),
  locked_at timestamptz not null default now (),
  source text not null default 'archive'
    check (source in ('seed', 'archive')),
  created_at timestamptz not null default now ()
);

comment on table public.hall_of_fame_months is
  'Locked Hall of Fame months. Never update placements after lock — append new months only.';

create table if not exists public.hall_of_fame_placements (
  id uuid primary key default gen_random_uuid (),
  year_month text not null references public.hall_of_fame_months (year_month) on delete cascade,
  place smallint not null check (place between 1 and 5),
  display_name text not null,
  tiktok_username text not null,
  avatar_url text,
  badge text not null,
  network_level int,
  profile_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now (),
  unique (year_month, place)
);

create index if not exists hall_of_fame_placements_month_idx
  on public.hall_of_fame_placements (year_month, place);

comment on table public.hall_of_fame_placements is
  'Permanent placement rows for a locked Hall of Fame month (champion + optional runner-ups).';

-- ---------------------------------------------------------------------------
-- Network leadership (expandable)
-- ---------------------------------------------------------------------------

create table if not exists public.hall_of_fame_managers (
  id text primary key,
  display_name text not null,
  title text not null,
  contact_handle text not null,
  avatar_url text,
  sort_order int not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

-- ---------------------------------------------------------------------------
-- Factory Legends
-- ---------------------------------------------------------------------------

create table if not exists public.hall_of_fame_legend_categories (
  key text primary key,
  title text not null,
  description text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now ()
);

create table if not exists public.hall_of_fame_legend_holders (
  category_key text primary key
    references public.hall_of_fame_legend_categories (key) on delete cascade,
  display_name text not null,
  tiktok_username text not null,
  avatar_url text,
  value_label text,
  achieved_at date,
  updated_at timestamptz not null default now ()
);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.hall_of_fame_months enable row level security;
alter table public.hall_of_fame_placements enable row level security;
alter table public.hall_of_fame_managers enable row level security;
alter table public.hall_of_fame_legend_categories enable row level security;
alter table public.hall_of_fame_legend_holders enable row level security;

drop policy if exists hall_of_fame_months_public_read on public.hall_of_fame_months;
create policy hall_of_fame_months_public_read
  on public.hall_of_fame_months for select
  to anon, authenticated
  using (true);

drop policy if exists hall_of_fame_placements_public_read on public.hall_of_fame_placements;
create policy hall_of_fame_placements_public_read
  on public.hall_of_fame_placements for select
  to anon, authenticated
  using (true);

drop policy if exists hall_of_fame_managers_public_read on public.hall_of_fame_managers;
create policy hall_of_fame_managers_public_read
  on public.hall_of_fame_managers for select
  to anon, authenticated
  using (true);

drop policy if exists hall_of_fame_legend_categories_public_read on public.hall_of_fame_legend_categories;
create policy hall_of_fame_legend_categories_public_read
  on public.hall_of_fame_legend_categories for select
  to anon, authenticated
  using (active = true);

drop policy if exists hall_of_fame_legend_holders_public_read on public.hall_of_fame_legend_holders;
create policy hall_of_fame_legend_holders_public_read
  on public.hall_of_fame_legend_holders for select
  to anon, authenticated
  using (true);

drop policy if exists hall_of_fame_months_staff_write on public.hall_of_fame_months;
create policy hall_of_fame_months_staff_write
  on public.hall_of_fame_months for all
  to authenticated
  using (public.is_staff ())
  with check (public.is_staff ());

drop policy if exists hall_of_fame_placements_staff_write on public.hall_of_fame_placements;
create policy hall_of_fame_placements_staff_write
  on public.hall_of_fame_placements for all
  to authenticated
  using (public.is_staff ())
  with check (public.is_staff ());

drop policy if exists hall_of_fame_managers_staff_write on public.hall_of_fame_managers;
create policy hall_of_fame_managers_staff_write
  on public.hall_of_fame_managers for all
  to authenticated
  using (public.is_staff ())
  with check (public.is_staff ());

drop policy if exists hall_of_fame_legend_categories_staff_write on public.hall_of_fame_legend_categories;
create policy hall_of_fame_legend_categories_staff_write
  on public.hall_of_fame_legend_categories for all
  to authenticated
  using (public.is_staff ())
  with check (public.is_staff ());

drop policy if exists hall_of_fame_legend_holders_staff_write on public.hall_of_fame_legend_holders;
create policy hall_of_fame_legend_holders_staff_write
  on public.hall_of_fame_legend_holders for all
  to authenticated
  using (public.is_staff ())
  with check (public.is_staff ());

grant select on public.hall_of_fame_months to anon, authenticated;
grant select on public.hall_of_fame_placements to anon, authenticated;
grant select on public.hall_of_fame_managers to anon, authenticated;
grant select on public.hall_of_fame_legend_categories to anon, authenticated;
grant select on public.hall_of_fame_legend_holders to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Seed historical champions + leadership + legend categories
-- ---------------------------------------------------------------------------

insert into public.hall_of_fame_months (year_month, status, locked_at, source)
values
  ('2026-05', 'locked', '2026-05-31T23:59:59Z', 'seed'),
  ('2026-06', 'locked', '2026-06-30T23:59:59Z', 'seed')
on conflict (year_month) do nothing;

insert into public.hall_of_fame_placements (
  year_month, place, display_name, tiktok_username, badge, network_level
)
values
  ('2026-05', 1, 'SunShine[SF]', 'sunshine42882', 'Active Member', 12),
  ('2026-06', 1, 'Allyson', 'cj_allycat93', 'Rising Star', 4)
on conflict (year_month, place) do nothing;

insert into public.hall_of_fame_managers (
  id, display_name, title, contact_handle, sort_order, is_primary
)
values
  ('brad-morris', 'Brad Morris', 'Founder of Streamer Factory', 'warrentonjunk', 0, true)
on conflict (id) do nothing;

insert into public.hall_of_fame_legend_categories (key, title, description, sort_order)
values
  ('first-level-50', 'First Level 50 Creator', 'The first Streamer Factory creator to reach Creator Network Level 50.', 10),
  ('highest-level', 'Highest Level', 'Highest TikTok Creator Network level achieved in the Factory.', 20),
  ('most-xp', 'Most XP Earned', 'Lifetime leader for Creator Network XP earned.', 30),
  ('most-referrals', 'Most Referrals', 'Brought the most creators into Streamer Factory.', 40),
  ('longest-streak', 'Longest Active Streak', 'Longest consecutive active streaming streak.', 50),
  ('largest-following', 'Largest TikTok Following', 'Largest TikTok following among network creators.', 60),
  ('highest-monthly-growth', 'Highest Monthly Growth', 'Biggest single-month follower growth in Factory history.', 70),
  ('most-battles-won', 'Most Battles Won', 'Career leader for network battles won.', 80),
  ('most-community', 'Most Community Contributions', 'Recognized for outstanding community leadership and support.', 90)
on conflict (key) do nothing;
