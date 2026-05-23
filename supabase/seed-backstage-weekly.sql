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
    ('sunshine42882', 113466, 13, 21.77, 'high', 0),
    ('high.blondie', 59883, 9, 67.12, 'medium', 0),
    ('cj_allycat93', 32830, 13, 74.78, 'elite', 0),
    ('jasmine_wren', 29340, 12, 60.43, 'high', 0),
    ('ruthie8910', 23403, 14, 58.2, 'elite', 0),
    ('rosysmokes', 17606, 10, 28.55, 'medium', 0),
    ('robertljterryjr', 15814, 8, 71.27, 'medium', 0),
    ('royaltystr8', 13643, 9, 26.45, 'medium', 0),
    ('browneyedbrat6', 10682, 4, 10.62, 'none', 0),
    ('lilyunginn225', 7907, 3, 10.53, 'none', 0),
    ('deeindabox', 6494, 5, 22.32, 'low', 0),
    ('daddyslittlemonster87', 6838, 13, 45.15, 'elite', 0),
    ('rissa7683', 3862, 11, 28.85, 'high', 0),
    ('kimberly.clarke396', 3144, 7, 21.2, 'medium', 0),
    ('_sahm_251_2', 4288, 6, 17.05, 'low', 0),
    ('silvanita4444', 2939, 7, 19, 'low', 0),
    ('choppaboiofficial45p', 1527, 3, 8.42, 'none', 0),
    ('tricioxv3', 533, 3, 9.47, 'none', 0),
    ('gonx_missouri_mom', 426, 5, 10.95, 'none', 0),
    ('ciraantequera131', 899, 6, 10.5, 'none', 0),
    ('bugzyboy.j', 212, 1, 1.22, 'low', 0),
    ('bigmommagapo', 233, 7, 14.98, 'low', 0),
    ('blazinbaby420', 146, 2, 6.18, 'none', 0),
    ('jennyrn55', 137, 0, 1.2, 'none', 0),
    ('nyla.williams8', 10, 1, 1.88, 'none', 0),
    ('ashley8178', 10, 0, 0.32, 'none', 0),
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
