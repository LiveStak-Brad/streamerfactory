-- Battle Hub: scheduled battles/events, dynamic participants, shared calendar.
-- Future: Battle Finder can query battle_events + participants for matching.

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.can_schedule_battles ()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid () is not null
  and exists (
    select 1
    from public.profiles p
    where
      p.id = auth.uid ()
      and p.role in ('owner', 'editor', 'member')
  );
$$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.battle_events (
  id uuid primary key default gen_random_uuid (),
  created_by uuid not null references auth.users (id) on delete restrict,
  title text not null,
  event_type text not null default 'battle',
  participant_count integer not null,
  format_label text not null,
  scheduled_at timestamptz not null,
  timezone text not null default 'UTC',
  notes text,
  status text not null default 'scheduled' check (status in ('scheduled', 'cancelled', 'completed')),
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  constraint battle_events_participant_count_range check (
    participant_count >= 2
    and participant_count <= 8
  )
);

create index if not exists battle_events_scheduled_at_idx on public.battle_events (scheduled_at asc);

create index if not exists battle_events_status_scheduled_idx on public.battle_events (status, scheduled_at desc);

create index if not exists battle_events_created_by_idx on public.battle_events (created_by);

create table if not exists public.battle_event_participants (
  id uuid primary key default gen_random_uuid (),
  battle_event_id uuid not null references public.battle_events (id) on delete cascade,
  profile_id uuid references public.profiles (id) on delete set null,
  tiktok_username text not null,
  team_label text,
  slot_order integer not null default 0,
  created_at timestamptz not null default now ()
);

create index if not exists battle_event_participants_event_idx on public.battle_event_participants (battle_event_id);

create index if not exists battle_event_participants_slot_idx on public.battle_event_participants (battle_event_id, slot_order);

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

create or replace function public.set_battle_events_updated_at ()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now ();
  return new;
end;
$$;

drop trigger if exists battle_events_set_updated_at on public.battle_events;

create trigger battle_events_set_updated_at
before update on public.battle_events
for each row
execute function public.set_battle_events_updated_at ();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.battle_events enable row level security;

alter table public.battle_event_participants enable row level security;

-- Events: public can read non-cancelled; creators and owners see their own / all
drop policy if exists "battle_events_select" on public.battle_events;

create policy "battle_events_select" on public.battle_events for
select
  using (
    status <> 'cancelled'
    or created_by = auth.uid ()
    or public.is_owner ()
  );

drop policy if exists "battle_events_insert" on public.battle_events;

create policy "battle_events_insert" on public.battle_events for insert to authenticated
with
  check (
    created_by = auth.uid ()
    and public.can_schedule_battles ()
  );

drop policy if exists "battle_events_update" on public.battle_events;

create policy "battle_events_update" on public.battle_events for
update to authenticated using (
  created_by = auth.uid ()
  or public.is_owner ()
)
with
  check (
    public.is_owner ()
    or created_by = auth.uid ()
  );

drop policy if exists "battle_events_delete" on public.battle_events;

create policy "battle_events_delete" on public.battle_events for delete to authenticated using (
  created_by = auth.uid ()
  or public.is_owner ()
);

-- Participants: read if parent event is visible; write if user owns event
drop policy if exists "battle_participants_select" on public.battle_event_participants;

create policy "battle_participants_select" on public.battle_event_participants for
select
  using (
    exists (
      select 1
      from public.battle_events e
      where
        e.id = battle_event_id
        and (
          e.status <> 'cancelled'
          or e.created_by = auth.uid ()
          or public.is_owner ()
        )
    )
  );

drop policy if exists "battle_participants_insert" on public.battle_event_participants;

drop policy if exists "battle_participants_update" on public.battle_event_participants;

drop policy if exists "battle_participants_delete" on public.battle_event_participants;

create policy "battle_participants_insert" on public.battle_event_participants for insert to authenticated
with
  check (
    exists (
      select 1
      from public.battle_events e
      where
        e.id = battle_event_id
        and (
          e.created_by = auth.uid ()
          or public.is_owner ()
        )
    )
  );

create policy "battle_participants_update" on public.battle_event_participants for
update to authenticated using (
  exists (
    select 1
    from public.battle_events e
    where
      e.id = battle_event_id
      and (
        e.created_by = auth.uid ()
        or public.is_owner ()
      )
  )
)
with
  check (
    exists (
      select 1
      from public.battle_events e
      where
        e.id = battle_event_id
        and (
          e.created_by = auth.uid ()
          or public.is_owner ()
        )
    )
  );

create policy "battle_participants_delete" on public.battle_event_participants for delete to authenticated using (
  exists (
    select 1
    from public.battle_events e
    where
      e.id = battle_event_id
      and (
        e.created_by = auth.uid ()
        or public.is_owner ()
      )
  )
);
