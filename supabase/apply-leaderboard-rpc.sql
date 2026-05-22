-- Run in Supabase SQL Editor (after apply-rankings-now.sql).
-- Enables public /rankings page for visitors without signing in.

create or replace function public.get_leaderboard_entries (
  p_ranking_period text,
  p_period_start date
)
returns json
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  result json;
  v_period_end date;
begin
  if p_ranking_period not in ('weekly', 'monthly', 'all-time') then
    raise exception 'Invalid ranking period';
  end if;

  select max(r.period_end) into v_period_end
  from public.creator_rankings r
  where r.ranking_period = p_ranking_period
    and r.period_start = p_period_start;

  if v_period_end is null then
    return '[]'::json;
  end if;

  select coalesce(
    json_agg(row_to_json(row) order by row.rank_position nulls last),
    '[]'::json
  )
  into result
  from (
    select
      r.profile_id,
      p.email,
      p.tiktok_username,
      r.rank_position,
      r.rank_score::float8 as rank_score,
      r.coins_rank,
      r.hours_rank,
      r.activity_rank,
      r.battle_rank,
      coalesce(s.coins_earned, 0) as coins_earned,
      coalesce(s.days_streamed, 0) as days_streamed,
      coalesce(s.hours_streamed, 0)::float8 as hours_streamed,
      coalesce(s.activeness_level, 'none') as activeness_level,
      coalesce(s.follower_growth, 0) as follower_growth,
      coalesce(s.battles_played, 0) as battles_played,
      coalesce(s.battles_won, 0) as battles_won
    from public.creator_rankings r
    join public.profiles p on p.id = r.profile_id
    left join public.creator_performance_stats s
      on s.profile_id = r.profile_id
      and s.period_start = p_period_start
      and s.period_end = v_period_end
    where r.ranking_period = p_ranking_period
      and r.period_start = p_period_start
    order by r.rank_position nulls last
  ) row;

  return coalesce(result, '[]'::json);
end;
$$;

grant execute on function public.get_leaderboard_entries (text, date) to anon;

grant execute on function public.get_leaderboard_entries (text, date) to authenticated;
