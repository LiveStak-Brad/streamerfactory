-- Seed weekly stats from TikTok Creator Network → Creator performance (Diamonds column).
-- Matches profiles by tiktok_username (and applications.tiktok_username).
-- Run in Supabase SQL Editor after apply-rankings-now.sql + apply-leaderboard-rpc.sql.

update public.profiles p
set
  tiktok_username = trim(a.tiktok_username),
  updated_at = now()
from public.applications a
where
  a.user_id = p.id
  and a.tiktok_username is not null
  and trim(a.tiktok_username) <> ''
  and (p.tiktok_username is null or trim(p.tiktok_username) = '');

do $$
declare
  v_start date := date_trunc('week', current_date)::date + case when extract(dow from current_date) = 0 then -6 else 1 - extract(dow from current_date)::int end;
  v_end date := v_start + 6;
begin
  create temp table if not exists _backstage_seed (
    handle text primary key,
    coins_earned int not null,
    days_streamed int not null,
    hours_streamed numeric not null,
    activeness_level text not null,
    follower_growth int not null default 0
  ) on commit drop;

  truncate _backstage_seed;

  insert into _backstage_seed (handle, coins_earned, days_streamed, hours_streamed, activeness_level, follower_growth) values
    ('sunshine42882', 154935, 10, 42.43, 'high', 0),
    ('high.blondie', 92014, 12, 84.13, 'high', 0),
    ('cj_allycat93', 51834, 18, 77.43, 'elite', 0),
    ('jasmine_wren', 38799, 17, 81.4, 'high', 0),
    ('ruthie8910', 25975, 15, 63.83, 'elite', 0),
    ('rosysmokes', 18257, 11, 33.33, 'medium', 0),
    ('robertljterryjr', 17047, 9, 73.35, 'high', 0),
    ('royaltystr8', 20431, 14, 46.08, 'high', 0),
    ('browneyedbrat6', 13699, 7, 20.2, 'low', 0),
    ('lilyunginn225', 8119, 2, 13.8, 'low', 0),
    ('deeindabox', 9302, 8, 30.87, 'medium', 0),
    ('daddyslittlemonster87', 8902, 17, 52.43, 'elite', 0),
    ('rissa7683', 6345, 17, 58.93, 'high', 0),
    ('kimberly.clarke396', 3402, 10, 57.52, 'high', 0),
    ('_sahm_251_2', 6145, 9, 23.77, 'high', 0),
    ('silvanita4444', 3067, 10, 26.17, 'medium', 0),
    ('choppaboiofficial45p', 3856, 6, 13.95, 'low', 0),
    ('tricioxv3', 535, 3, 10.47, 'low', 0),
    ('gonx_missouri_mom', 426, 5, 10.95, 'none', 0),
    ('ciraantequera131', 899, 6, 10.5, 'none', 0),
    ('bugzyboy.j', 311, 0, 23.97, 'low', 0),
    ('bigmommagapo', 310, 7, 14.13, 'low', 0),
    ('blazinbaby420', 160, 2, 7.58, 'low', 0),
    ('jennyrn55', 1557, 1, 22.03, 'low', 0),
    ('nyla.williams8', 10, 1, 15.87, 'low', 0),
    ('ashley8178', 578, 0, 10.02, 'low', 0),
    ('brittanykavanagh09', 0, 0, 0, 'none', 0);

  insert into public.creator_performance_stats (
    profile_id, period_start, period_end, coins_earned, days_streamed, hours_streamed,
    activeness_level, follower_count, follower_growth, battles_played, battles_won
  )
  select
    p.id, v_start, v_end, s.coins_earned, s.days_streamed, s.hours_streamed,
    s.activeness_level, 0, s.follower_growth, 0, 0
  from _backstage_seed s
  join public.profiles p on lower(trim(replace(coalesce(p.tiktok_username, ''), '@', ''))) = lower(s.handle)
  where p.role in ('member', 'editor', 'admin', 'owner')
  on conflict (profile_id, period_start, period_end) do update set
    coins_earned = excluded.coins_earned,
    days_streamed = excluded.days_streamed,
    hours_streamed = excluded.hours_streamed,
    activeness_level = excluded.activeness_level,
    follower_growth = excluded.follower_growth,
    updated_at = now();

  raise notice 'Period % to % — seeded Creator performance stats.', v_start, v_end;
end;
$$;
