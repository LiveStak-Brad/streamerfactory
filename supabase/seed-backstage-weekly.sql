-- Seed weekly stats from TikTok Creator Network backstage (screenshots).
-- Matches profiles by tiktok_username (and applications.tiktok_username).
-- Run in Supabase SQL Editor after apply-rankings-now.sql + apply-leaderboard-rpc.sql.

-- Sync handles from applications where profile is missing @handle
update public.profiles p
set
  tiktok_username = trim(a.tiktok_username),
  updated_at = now()
from public.applications a
where
  a.user_id = p.id
  and a.tiktok_username is not null
  and trim(a.tiktok_username) <> ''
  and (
    p.tiktok_username is null
    or trim(p.tiktok_username) = ''
  );

-- Current week (Monday–Sunday UTC) — adjust dates if your backstage period differs
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
    ('bugzyboy.j', 5000, 0, 1.72, 'low', 18),
    ('ruthie8910', 814, 14, 57.02, 'elite', 23),
    ('cj_allycat93', 0, 0, 0, 'elite', 0),
    ('daddyslittlemonster87', 0, 0, 0, 'elite', 0),
    ('sunshine42882', 0, 0, 0, 'medium', 0),
    ('jasmine_wren', 0, 0, 0, 'high', 0),
    ('rissa7683', 0, 0, 0, 'high', 0),
    ('rosysmokes', 0, 0, 0, 'medium', 0),
    ('high.blondie', 0, 0, 0, 'medium', 0),
    ('royaltystr8', 0, 0, 0, 'medium', 0),
    ('robertljterryjr', 0, 0, 0, 'medium', 0),
    ('silvanita4444', 0, 0, 0, 'low', 0),
    ('bigmommagapo', 0, 0, 0, 'low', 0),
    ('kimberly.clarke396', 0, 0, 0, 'medium', 0),
    ('_sahm_251_2', 0, 0, 0, 'low', 0),
    ('ciraantequera131', 0, 0, 0, 'none', 0),
    ('gonx_missouri_mom', 0, 0, 0, 'none', 0),
    ('deeindabox', 64, 5, 22.32, 'low', 19),
    ('kaleidoscope_views', 36, 0, 0, 'low', 0),
    ('tricioxv3', 0, 0, 0, 'none', 0),
    ('choppaboiofficial45p', 0, 0, 0, 'none', 0),
    ('nyla.williams8', 0, 0, 0, 'none', 0),
    ('jennyrn55', 0, 0, 0, 'none', 0),
    ('brittanykavanagh09', 0, 0, 0, 'none', 0),
    ('lilyunginn225', 0, 0, 0, 'none', 0),
    ('blazinbaby420', 0, 0, 0, 'none', 0),
    ('ashley8178', 0, 0, 0, 'none', 0),
    ('browneyedbrat6', 0, 0, 0, 'none', 0);

  insert into public.creator_performance_stats (
    profile_id,
    period_start,
    period_end,
    coins_earned,
    days_streamed,
    hours_streamed,
    activeness_level,
    follower_count,
    follower_growth,
    battles_played,
    battles_won
  )
  select
    p.id,
    v_start,
    v_end,
    s.coins_earned,
    s.days_streamed,
    s.hours_streamed,
    s.activeness_level,
    0,
    s.follower_growth,
    0,
    0
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

  raise notice 'Period % to % — seeded stats for handles with matching profiles.', v_start, v_end;
end;
$$;

-- Recalculate weekly rankings (run seed-backstage-stats.ts for full scoring, or use Admin → Recalculate)
