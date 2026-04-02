-- Aggregated counts for admin analytics (RLS applies via security invoker; staff-only select on analytics_events).

create or replace function public.admin_analytics_event_counts (p_since timestamptz default null)
returns table (
  event_name text,
  cnt bigint
)
language sql
stable
security invoker
set search_path = public
as $$
  select
    ae.event_name,
    count(*)::bigint as cnt
  from
    public.analytics_events ae
  where
    ae.created_at >= coalesce(p_since, '-infinity'::timestamptz)
  group by
    ae.event_name;
$$;

comment on function public.admin_analytics_event_counts (timestamptz) is
  'Per-event row counts since p_since (or all time if null). For staff dashboards; respects RLS.';

grant execute on function public.admin_analytics_event_counts (timestamptz) to authenticated;
