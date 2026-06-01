-- Seed weekly stats from TikTok Creator Network → Contribution details (Diamonds column).
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
    ('sunshine42882', 168368, 21, 46, 'elite', 0),
    ('high.blondie', 104844, 15, 93.17, 'elite', 0),
    ('jasmine_wren', 77718, 19, 96.05, 'elite', 0),
    ('cj_allycat93', 62993, 22, 158.73, 'elite', 0),
    ('royaltystr8', 30656, 18, 64.3, 'elite', 0),
    ('ruthie8910', 25576, 14, 64.28, 'elite', 0),
    ('rosysmokes', 23762, 18, 58.18, 'elite', 0),
    ('daddyslittlemonster87', 10516, 20, 70.17, 'elite', 0),
    ('_sahm_251_2', 12891, 14, 32.3, 'high', 0),
    ('browneyedbrat6', 13748, 7, 20.22, 'low', 0),
    ('deeindabox', 9912, 8, 30.87, 'medium', 0),
    ('lilyunginn225', 8119, 2, 13.68, 'low', 0),
    ('rissa7683', 6358, 17, 58.93, 'high', 0),
    ('bettsmart633', 4238, 0, 0, 'medium', 0),
    ('choppaboiofficial45p', 3914, 6, 13.95, 'medium', 0),
    ('silvanita4444', 3206, 10, 26.17, 'medium', 0),
    ('jennyrn55', 1537, 1, 2.37, 'low', 0),
    ('ciraantequera131', 899, 5, 10.5, 'low', 0),
    ('ashley8178', 578, 6, 0.32, 'low', 0),
    ('tricioxv3', 535, 3, 10.22, 'low', 0),
    ('amylong86', 457, 0, 0, 'none', 0),
    ('gonx_missouri_mom', 426, 5, 11.85, 'low', 0),
    ('bugzyboy.j', 311, 0, 2.9, 'low', 0),
    ('bigmommagapo', 310, 7, 16.63, 'low', 0),
    ('blazinbaby420', 160, 2, 7.92, 'low', 0),
    ('judy_132', 119, 1, 3.73, 'none', 0),
    ('nyla.williams8', 10, 1, 1.88, 'low', 0),
    ('melissaholmig41998', 0, 1, 1.63, 'none', 0),
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
