-- Lightweight first-party analytics events (privacy-conscious; staff-only reads).

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid (),
  event_name text not null,
  user_id uuid references auth.users (id) on delete set null,
  profile_role text,
  route text,
  resource_slug text,
  battle_request_id uuid,
  battle_event_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now ()
);

create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);

create index if not exists analytics_events_event_name_created_idx on public.analytics_events (event_name, created_at desc);

create index if not exists analytics_events_user_id_idx on public.analytics_events (user_id)
where
  user_id is not null;

comment on table public.analytics_events is
  'First-party product analytics. No PII beyond optional user_id link; metadata should stay minimal.';

alter table public.analytics_events enable row level security;

drop policy if exists "analytics_events_insert_authenticated" on public.analytics_events;

create policy "analytics_events_insert_authenticated" on public.analytics_events for insert to authenticated
with
  check (
    user_id is null
    or user_id = auth.uid ()
    or public.is_staff ()
  );

drop policy if exists "analytics_events_insert_anon" on public.analytics_events;

create policy "analytics_events_insert_anon" on public.analytics_events for insert to anon
with
  check (user_id is null);

drop policy if exists "analytics_events_select_staff" on public.analytics_events;

create policy "analytics_events_select_staff" on public.analytics_events for
select to authenticated using (public.is_staff ());

grant insert on table public.analytics_events to anon;

grant insert, select on table public.analytics_events to authenticated;
