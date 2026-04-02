-- Network calendar: upcoming battle IDs using database now() (avoids JS/server clock skew vs timestamptz).
-- Also used with separate participant fetch to avoid nested-select edge cases with RLS.

create or replace function public.list_upcoming_battle_event_ids (p_limit int default 50)
returns table (id uuid)
language sql
stable
security invoker
set search_path = public
as $$
  select e.id
  from public.battle_events e
  where
    lower(btrim(e.status)) = 'scheduled'
    and e.scheduled_at >= now()
  order by
    e.scheduled_at asc
  limit greatest(1, least(coalesce(nullif(p_limit, 0), 50), 200));
$$;

create or replace function public.list_my_upcoming_battle_event_ids (p_user_id uuid, p_limit int default 5)
returns table (id uuid)
language sql
stable
security invoker
set search_path = public
as $$
  select e.id
  from public.battle_events e
  where
    lower(btrim(e.status)) = 'scheduled'
    and e.scheduled_at >= now()
    and e.created_by = p_user_id
  order by
    e.scheduled_at asc
  limit greatest(1, least(coalesce(nullif(p_limit, 0), 5), 50));
$$;

grant execute on function public.list_upcoming_battle_event_ids (int) to authenticated;

grant execute on function public.list_my_upcoming_battle_event_ids (uuid, int) to authenticated;
