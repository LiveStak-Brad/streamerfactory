-- Link matched Battle Finder requests to promoted battle_events; atomic promotion RPC.

-- ---------------------------------------------------------------------------
-- Columns
-- ---------------------------------------------------------------------------

alter table public.battle_requests
add column if not exists promoted_battle_event_id uuid references public.battle_events (id) on delete set null;

alter table public.battle_requests
add column if not exists promoted_at timestamptz;

create index if not exists battle_requests_promoted_event_idx on public.battle_requests (promoted_battle_event_id)
where
  promoted_battle_event_id is not null;

comment on column public.battle_requests.promoted_battle_event_id is
  'Set when this matched request is promoted into battle_events; null if not yet.';

comment on column public.battle_requests.promoted_at is
  'When promotion ran.';

-- ---------------------------------------------------------------------------
-- Promote matched request → battle_events + battle_event_participants (atomic)
-- ---------------------------------------------------------------------------

create or replace function public.promote_battle_finder_request (p_request_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid ();
  req record;
  ev_id uuid;
  sched timestamptz;
  v_title text;
  v_notes text;
  v_event_type text;
  filled_count int;
  r record;
  h text;
  team_l text;
  is_2v2 boolean;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not public.can_schedule_battles () then
    raise exception 'Forbidden';
  end if;

  select * into req from public.battle_requests where id = p_request_id for update;

  if not found then
    raise exception 'Request not found';
  end if;

  if req.status <> 'matched' then
    raise exception 'Request is not matched';
  end if;

  if req.promoted_battle_event_id is not null then
    raise exception 'Already promoted';
  end if;

  -- Staff, creator, or anyone on the request roster can promote.
  if
    not public.is_staff ()
    and req.created_by <> uid
    and not exists (
      select 1
      from public.battle_request_slots s
      where
        s.battle_request_id = p_request_id
        and s.joined_by = uid
    )
  then
    raise exception 'Forbidden';
  end if;

  select count(*)::int into filled_count
  from public.battle_request_slots
  where
    battle_request_id = p_request_id
    and joined_by is not null;

  if filled_count < req.participant_count then
    raise exception 'Slots not fully filled';
  end if;

  if req.preferred_at is not null then
    sched := req.preferred_at;
  else
    sched := timezone ('utc', now ()) + interval '3 days';
    sched := date_trunc ('day', sched) + interval '20 hours';
  end if;

  v_title := coalesce(nullif(trim(req.title), ''), 'Battle from Finder');

  v_event_type :=
    case req.request_type
      when 'themed_battle' then 'themed'
      else 'battle'
    end;

  v_notes := coalesce(req.notes, '');
  if length(v_notes) > 0 then
    v_notes := v_notes || E'\n\n';
  end if;
  v_notes := v_notes || 'Promoted from Battle Finder.';

  is_2v2 := req.participant_count = 4
  and req.preferred_format in ('2v2', 'team-battle');

  insert into public.battle_events (
    created_by,
    title,
    event_type,
    participant_count,
    format_label,
    scheduled_at,
    timezone,
    notes,
    status
  )
  values (
    req.created_by,
    v_title,
    v_event_type,
    req.participant_count,
    req.preferred_format,
    sched,
    req.timezone,
    v_notes,
    'scheduled'
  )
  returning
    id into ev_id;

  for r in (
    select *
    from public.battle_request_slots
    where
      battle_request_id = p_request_id
    order by
      slot_order
  )
  loop
    h := trim(coalesce(r.tiktok_username, ''));
    if length(h) = 0 then
      raise exception 'Missing participant handle in slot %', r.slot_order;
    end if;

    team_l := null;
    if is_2v2 then
      if r.slot_order < 2 then
        team_l := 'A';
      else
        team_l := 'B';
      end if;
    end if;

    insert into public.battle_event_participants (
      battle_event_id,
      profile_id,
      tiktok_username,
      team_label,
      slot_order
    )
    values (
      ev_id,
      r.joined_by,
      h,
      team_l,
      r.slot_order
    );
  end loop;

  update public.battle_requests
  set
    promoted_battle_event_id = ev_id,
    promoted_at = now (),
    updated_at = now ()
  where
    id = p_request_id;

  return ev_id;
end;
$$;

grant execute on function public.promote_battle_finder_request (uuid) to authenticated;
