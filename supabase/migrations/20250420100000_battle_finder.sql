-- Battle Finder v1: open requests + slots; feeds Battle Scheduler later.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.battle_requests (
  id uuid primary key default gen_random_uuid (),
  created_by uuid not null references auth.users (id) on delete cascade,
  title text,
  creator_display_handle text not null,
  request_type text not null,
  participant_count integer not null,
  preferred_format text not null,
  preferred_at timestamptz,
  timezone text not null default 'UTC',
  notes text,
  status text not null default 'open' check (status in ('open', 'matched', 'closed', 'cancelled')),
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  constraint battle_requests_participant_count_range check (
    participant_count >= 2
    and participant_count <= 4
  )
);

create index if not exists battle_requests_status_created_idx on public.battle_requests (status, created_at desc);

create index if not exists battle_requests_created_by_idx on public.battle_requests (created_by);

comment on table public.battle_requests is
  'Member battle partner requests; optional conversion to battle_events via scheduler.';

comment on column public.battle_requests.preferred_at is
  'When the creator prefers to run the battle; null = flexible / TBD.';

create table if not exists public.battle_request_slots (
  id uuid primary key default gen_random_uuid (),
  battle_request_id uuid not null references public.battle_requests (id) on delete cascade,
  slot_order integer not null,
  slot_type text not null,
  joined_by uuid references auth.users (id) on delete set null,
  tiktok_username text,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  constraint battle_request_slots_order_unique unique (battle_request_id, slot_order)
);

create index if not exists battle_request_slots_request_idx on public.battle_request_slots (battle_request_id);

create unique index if not exists battle_request_slots_one_join_per_user on public.battle_request_slots (battle_request_id, joined_by)
where
  joined_by is not null;

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

create or replace function public.set_battle_requests_updated_at ()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now ();
  return new;
end;
$$;

drop trigger if exists battle_requests_set_updated_at on public.battle_requests;

create trigger battle_requests_set_updated_at
before update on public.battle_requests for each row
execute function public.set_battle_requests_updated_at ();

create or replace function public.set_battle_request_slots_updated_at ()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now ();
  return new;
end;
$$;

drop trigger if exists battle_request_slots_set_updated_at on public.battle_request_slots;

create trigger battle_request_slots_set_updated_at
before update on public.battle_request_slots for each row
execute function public.set_battle_request_slots_updated_at ();

-- ---------------------------------------------------------------------------
-- Match detection (internal)
-- ---------------------------------------------------------------------------

create or replace function public.refresh_battle_request_match_status (p_request_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  need int;
  filled int;
begin
  select participant_count into need from public.battle_requests where id = p_request_id;
  if need is null then
    return;
  end if;

  select count(*)::int into filled
  from public.battle_request_slots
  where
    battle_request_id = p_request_id
    and joined_by is not null;

  if filled >= need then
    update public.battle_requests
    set
      status = 'matched',
      updated_at = now ()
    where
      id = p_request_id
      and status = 'open';
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- Join / leave (members)
-- ---------------------------------------------------------------------------

create or replace function public.join_battle_request_slot (p_slot_id uuid, p_tiktok_username text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid ();
  slot record;
  req record;
  uname text := nullif(trim(p_tiktok_username), '');
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not public.can_schedule_battles () then
    raise exception 'Forbidden';
  end if;

  if uname is null then
    raise exception 'TikTok username is required';
  end if;

  select * into slot from public.battle_request_slots where id = p_slot_id for update;
  if not found then
    raise exception 'Slot not found';
  end if;

  select * into req from public.battle_requests where id = slot.battle_request_id;
  if not found then
    raise exception 'Request not found';
  end if;

  if req.status <> 'open' then
    raise exception 'This request is not open';
  end if;

  if slot.joined_by is not null then
    raise exception 'This slot is already filled';
  end if;

  if slot.slot_order = 0 then
    raise exception 'Invalid slot';
  end if;

  if exists (
    select 1
    from public.battle_request_slots s
    where
      s.battle_request_id = req.id
      and s.joined_by = uid
  ) then
    raise exception 'You are already on this request';
  end if;

  update public.battle_request_slots
  set
    joined_by = uid,
    tiktok_username = uname,
    updated_at = now ()
  where
    id = p_slot_id;

  perform public.refresh_battle_request_match_status (req.id);
end;
$$;

create or replace function public.leave_battle_request_slot (p_slot_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid ();
  slot record;
  req record;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not public.can_schedule_battles () then
    raise exception 'Forbidden';
  end if;

  select * into slot from public.battle_request_slots where id = p_slot_id for update;
  if not found then
    raise exception 'Slot not found';
  end if;

  if slot.slot_order = 0 then
    raise exception 'Creator cannot leave via this action — close or cancel the request instead';
  end if;

  if slot.joined_by is distinct from uid then
    raise exception 'Not your slot';
  end if;

  select * into req from public.battle_requests where id = slot.battle_request_id;

  update public.battle_request_slots
  set
    joined_by = null,
    tiktok_username = null,
    updated_at = now ()
  where
    id = p_slot_id;

  if req.status = 'matched' then
    update public.battle_requests
    set
      status = 'open',
      updated_at = now ()
    where
      id = req.id;
  end if;
end;
$$;

grant execute on function public.join_battle_request_slot (uuid, text) to authenticated;

grant execute on function public.leave_battle_request_slot (uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.battle_requests enable row level security;

alter table public.battle_request_slots enable row level security;

drop policy if exists "battle_requests_select_members" on public.battle_requests;

create policy "battle_requests_select_members" on public.battle_requests for
select to authenticated using (public.can_schedule_battles ());

drop policy if exists "battle_requests_insert_members" on public.battle_requests;

create policy "battle_requests_insert_members" on public.battle_requests for insert to authenticated
with
  check (created_by = auth.uid () and public.can_schedule_battles ());

drop policy if exists "battle_requests_update_own_or_staff" on public.battle_requests;

create policy "battle_requests_update_own_or_staff" on public.battle_requests for
update to authenticated using (
  created_by = auth.uid ()
  or public.is_staff ()
)
with
  check (
    created_by = auth.uid ()
    or public.is_staff ()
  );

drop policy if exists "battle_requests_delete_own_or_staff" on public.battle_requests;

create policy "battle_requests_delete_own_or_staff" on public.battle_requests for delete to authenticated using (
  created_by = auth.uid ()
  or public.is_staff ()
);

drop policy if exists "battle_request_slots_select_members" on public.battle_request_slots;

create policy "battle_request_slots_select_members" on public.battle_request_slots for
select to authenticated using (public.can_schedule_battles ());

drop policy if exists "battle_request_slots_insert_creator" on public.battle_request_slots;

create policy "battle_request_slots_insert_creator" on public.battle_request_slots for insert to authenticated
with
  check (
    exists (
      select 1
      from public.battle_requests r
      where
        r.id = battle_request_id
        and r.created_by = auth.uid ()
    )
  );

-- Slot row updates (join/leave) go through join_battle_request_slot / leave_battle_request_slot (SECURITY DEFINER).
drop policy if exists "battle_request_slots_no_direct_update" on public.battle_request_slots;

create policy "battle_request_slots_no_direct_update" on public.battle_request_slots for
update to authenticated using (false)
with
  check (false);
