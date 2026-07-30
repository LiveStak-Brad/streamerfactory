-- Growth foundation: seasons, immutable progress_events, missions, achievements,
-- streaks, reputation, onboarding checklist, notifications, referrals, activity feed.
-- Projections derive from progress_events; do not fabricate activity.

-- ---------------------------------------------------------------------------
-- Seasons
-- ---------------------------------------------------------------------------

create table if not exists public.seasons (
  id uuid primary key default gen_random_uuid (),
  key text not null unique,
  name text not null,
  start_at timestamptz not null,
  end_at timestamptz,
  status text not null default 'draft'
    check (status in ('draft', 'active', 'ended', 'archived')),
  theme jsonb not null default '{}'::jsonb,
  banner_image text,
  sort_order int not null default 0,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create index if not exists seasons_status_idx on public.seasons (status);
create index if not exists seasons_start_at_idx on public.seasons (start_at desc);

comment on table public.seasons is 'Factory Seasons - timeboxes for seasonal missions, achievements, reputation, and contests.';

-- ---------------------------------------------------------------------------
-- Immutable event stream (canonical source of truth)
-- ---------------------------------------------------------------------------

create table if not exists public.progress_events (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  event_type text not null,
  subject_key text,
  season_id uuid references public.seasons (id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  idempotency_key text not null,
  source_event_id uuid references public.progress_events (id) on delete set null,
  created_at timestamptz not null default now (),
  unique (member_id, idempotency_key)
);

create index if not exists progress_events_member_created_idx
  on public.progress_events (member_id, created_at desc);

create index if not exists progress_events_type_created_idx
  on public.progress_events (event_type, created_at desc);

create index if not exists progress_events_season_idx on public.progress_events (season_id) where season_id is not null;

create index if not exists progress_events_member_type_idx
  on public.progress_events (member_id, event_type);

comment on table public.progress_events is
  'Append-only growth event stream. Missions, streaks, achievements, reputation, activity, and AI snapshots are projections.';

-- ---------------------------------------------------------------------------
-- Onboarding checklist
-- ---------------------------------------------------------------------------

create table if not exists public.onboarding_tasks (
  id uuid primary key default gen_random_uuid (),
  key text not null unique,
  title text not null,
  description text,
  href text,
  sort_order int not null default 0,
  requirement jsonb not null default '{}'::jsonb,
  required boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create table if not exists public.member_onboarding_tasks (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  task_id uuid not null references public.onboarding_tasks (id) on delete cascade,
  completed_at timestamptz,
  progress jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  unique (member_id, task_id)
);

create index if not exists member_onboarding_tasks_member_idx
  on public.member_onboarding_tasks (member_id);

-- ---------------------------------------------------------------------------
-- Mission templates + member missions
-- ---------------------------------------------------------------------------

create table if not exists public.mission_templates (
  id uuid primary key default gen_random_uuid (),
  key text not null unique,
  title text not null,
  description text,
  category text not null default 'platform'
    check (category in ('training', 'community', 'battles', 'profile', 'creator_growth', 'platform')),
  cadence text not null default 'daily'
    check (cadence in ('daily', 'weekly', 'once', 'seasonal')),
  season_id uuid references public.seasons (id) on delete set null,
  requirement jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  sort_order int not null default 0,
  reputation_points int not null default 0,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create index if not exists mission_templates_active_idx
  on public.mission_templates (active, cadence);

create index if not exists mission_templates_season_idx on public.mission_templates (season_id) where season_id is not null;

create table if not exists public.member_missions (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  template_id uuid not null references public.mission_templates (id) on delete cascade,
  season_id uuid references public.seasons (id) on delete set null,
  period_key text not null,
  status text not null default 'active'
    check (status in ('active', 'completed', 'failed', 'expired')),
  progress jsonb not null default '{}'::jsonb,
  completed_at timestamptz,
  failed_at timestamptz,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  unique (member_id, template_id, period_key)
);

create index if not exists member_missions_member_period_idx
  on public.member_missions (member_id, period_key);

create index if not exists member_missions_member_status_idx
  on public.member_missions (member_id, status);

-- ---------------------------------------------------------------------------
-- Achievements
-- ---------------------------------------------------------------------------

create table if not exists public.achievement_definitions (
  id uuid primary key default gen_random_uuid (),
  key text not null unique,
  name text not null,
  description text,
  category text not null default 'milestones'
    check (category in (
      'learning', 'community', 'creator', 'rankings', 'battles',
      'referrals', 'recruiting', 'milestones'
    )),
  icon text,
  season_id uuid references public.seasons (id) on delete set null,
  requirement jsonb not null default '{}'::jsonb,
  visibility text not null default 'members'
    check (visibility in ('public', 'members', 'private')),
  share_image_path text,
  active boolean not null default true,
  sort_order int not null default 0,
  reputation_points int not null default 0,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create index if not exists achievement_definitions_active_idx
  on public.achievement_definitions (active);

create index if not exists achievement_definitions_season_idx on public.achievement_definitions (season_id) where season_id is not null;

create table if not exists public.member_achievements (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  achievement_id uuid not null references public.achievement_definitions (id) on delete cascade,
  achievement_key text not null,
  season_id uuid references public.seasons (id) on delete set null,
  progress jsonb not null default '{}'::jsonb,
  unlocked_at timestamptz,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  unique (member_id, achievement_key, season_id)
);

-- Partial unique for lifetime (season_id null) — Postgres treats nulls as distinct in unique,
-- so add a dedicated unique index for lifetime unlocks.
create unique index if not exists member_achievements_lifetime_unique on public.member_achievements (member_id, achievement_key) where season_id is null;

create index if not exists member_achievements_member_idx
  on public.member_achievements (member_id, unlocked_at desc nulls last);

-- ---------------------------------------------------------------------------
-- Streaks
-- ---------------------------------------------------------------------------

create table if not exists public.streak_definitions (
  id uuid primary key default gen_random_uuid (),
  key text not null unique,
  name text not null,
  description text,
  grace_days int not null default 0 check (grace_days >= 0),
  freeze_enabled boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create table if not exists public.member_streaks (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  streak_key text not null references public.streak_definitions (key) on delete cascade,
  current_count int not null default 0,
  longest_count int not null default 0,
  last_completed_on date,
  grace_used_at timestamptz,
  freezes_available int not null default 0,
  updated_at timestamptz not null default now (),
  unique (member_id, streak_key)
);

create table if not exists public.streak_events (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  streak_key text not null,
  event_kind text not null
    check (event_kind in ('increment', 'break', 'grace', 'freeze')),
  count_after int,
  progress_event_id uuid references public.progress_events (id) on delete set null,
  created_at timestamptz not null default now ()
);

create index if not exists streak_events_member_idx
  on public.streak_events (member_id, created_at desc);

-- ---------------------------------------------------------------------------
-- StreamerU completion projection (stable IDs for future SoT migration)
-- ---------------------------------------------------------------------------

create table if not exists public.streameru_mission_completions (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  lesson_slug text not null,
  mission_id text not null,
  progress_event_id uuid references public.progress_events (id) on delete set null,
  completed_at timestamptz not null default now (),
  unique (member_id, lesson_slug, mission_id)
);

create index if not exists streameru_mission_completions_member_idx
  on public.streameru_mission_completions (member_id, completed_at desc);

-- ---------------------------------------------------------------------------
-- Factory Reputation (not ranking, not XP)
-- ---------------------------------------------------------------------------

create table if not exists public.reputation_rules (
  id uuid primary key default gen_random_uuid (),
  key text not null unique,
  name text not null,
  event_type text not null,
  points int not null check (points <> 0),
  max_per_day int,
  season_scoped boolean not null default false,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create table if not exists public.reputation_ledger (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  points int not null,
  reason text not null,
  rule_key text,
  season_id uuid references public.seasons (id) on delete set null,
  progress_event_id uuid not null references public.progress_events (id) on delete cascade,
  created_at timestamptz not null default now (),
  unique (progress_event_id, rule_key)
);

create index if not exists reputation_ledger_member_idx
  on public.reputation_ledger (member_id, created_at desc);

create index if not exists reputation_ledger_season_idx on public.reputation_ledger (season_id) where season_id is not null;

create table if not exists public.reputation_titles (
  id uuid primary key default gen_random_uuid (),
  key text not null unique,
  name text not null,
  description text,
  icon text,
  min_reputation int not null default 0,
  requirement jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create table if not exists public.member_reputation_titles (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  title_key text not null references public.reputation_titles (key) on delete cascade,
  unlocked_at timestamptz not null default now (),
  progress_event_id uuid references public.progress_events (id) on delete set null,
  unique (member_id, title_key)
);

-- ---------------------------------------------------------------------------
-- Notifications
-- ---------------------------------------------------------------------------

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  href text,
  metadata jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  progress_event_id uuid references public.progress_events (id) on delete set null,
  created_at timestamptz not null default now ()
);

create index if not exists notifications_member_unread_idx on public.notifications (member_id, created_at desc) where read_at is null;

create index if not exists notifications_member_created_idx
  on public.notifications (member_id, created_at desc);

create table if not exists public.notification_preferences (
  member_id uuid primary key references auth.users (id) on delete cascade,
  in_app_enabled boolean not null default true,
  email_enabled boolean not null default false,
  mission_updates boolean not null default true,
  achievement_updates boolean not null default true,
  battle_reminders boolean not null default true,
  ranking_updates boolean not null default true,
  updated_at timestamptz not null default now ()
);

-- ---------------------------------------------------------------------------
-- Referrals
-- ---------------------------------------------------------------------------

create table if not exists public.referral_codes (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null unique references auth.users (id) on delete cascade,
  code text not null unique,
  created_at timestamptz not null default now ()
);

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid (),
  inviter_id uuid not null references auth.users (id) on delete cascade,
  invitee_id uuid references auth.users (id) on delete set null,
  invitee_email text,
  code text not null,
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'eligible', 'rewarded', 'invalid')),
  accepted_at timestamptz,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create index if not exists referrals_inviter_idx on public.referrals (inviter_id);
create index if not exists referrals_code_idx on public.referrals (code);

-- ---------------------------------------------------------------------------
-- Activity feed
-- ---------------------------------------------------------------------------

create table if not exists public.activity_feed (
  id uuid primary key default gen_random_uuid (),
  actor_id uuid not null references auth.users (id) on delete cascade,
  event_type text not null,
  subject_key text,
  season_id uuid references public.seasons (id) on delete set null,
  visibility text not null default 'members'
    check (visibility in ('public', 'members', 'private')),
  summary text not null,
  metadata jsonb not null default '{}'::jsonb,
  progress_event_id uuid references public.progress_events (id) on delete set null,
  created_at timestamptz not null default now ()
);

create index if not exists activity_feed_created_idx
  on public.activity_feed (created_at desc);

create index if not exists activity_feed_actor_idx
  on public.activity_feed (actor_id, created_at desc);

create index if not exists activity_feed_season_idx on public.activity_feed (season_id) where season_id is not null;

-- ---------------------------------------------------------------------------
-- Helper: active season
-- ---------------------------------------------------------------------------

create or replace function public.get_active_season_id ()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select s.id
  from public.seasons s
  where s.status = 'active'
    and s.start_at <= now ()
    and (s.end_at is null or s.end_at >= now ())
  order by s.sort_order asc, s.start_at desc
  limit 1;
$$;

-- ---------------------------------------------------------------------------
-- Append progress event (idempotent) — members insert own events via RPC
-- ---------------------------------------------------------------------------

create or replace function public.append_progress_event (
  p_event_type text,
  p_subject_key text default null,
  p_metadata jsonb default '{}'::jsonb,
  p_idempotency_key text default null,
  p_source_event_id uuid default null,
  p_stamp_season boolean default true
)
returns public.progress_events
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid ();
  v_key text;
  v_season uuid;
  v_row public.progress_events;
begin
  if v_uid is null then
    raise exception 'Not authenticated';
  end if;

  if not exists (
    select 1
    from public.profiles p
    where p.id = v_uid
      and p.role in ('owner', 'editor', 'member', 'admin')
  ) then
    raise exception 'Forbidden';
  end if;

  if p_event_type is null or length(trim(p_event_type)) = 0 then
    raise exception 'event_type required';
  end if;

  v_key := coalesce(
    nullif(trim(p_idempotency_key), ''),
    p_event_type || ':' || coalesce(p_subject_key, '') || ':' || gen_random_uuid ()::text
  );

  if p_stamp_season then
    v_season := public.get_active_season_id ();
  else
    v_season := null;
  end if;

  insert into public.progress_events (
    member_id,
    event_type,
    subject_key,
    season_id,
    metadata,
    idempotency_key,
    source_event_id
  )
  values (
    v_uid,
    trim(p_event_type),
    nullif(trim(p_subject_key), ''),
    v_season,
    coalesce(p_metadata, '{}'::jsonb),
    v_key,
    p_source_event_id
  )
  on conflict (member_id, idempotency_key) do nothing
  returning * into v_row;

  if v_row.id is null then
    select * into v_row
    from public.progress_events
    where member_id = v_uid
      and idempotency_key = v_key;
  end if;

  return v_row;
end;
$$;

grant execute on function public.append_progress_event (text, text, jsonb, text, uuid, boolean) to authenticated;
grant execute on function public.get_active_season_id () to authenticated;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.seasons enable row level security;
alter table public.progress_events enable row level security;
alter table public.onboarding_tasks enable row level security;
alter table public.member_onboarding_tasks enable row level security;
alter table public.mission_templates enable row level security;
alter table public.member_missions enable row level security;
alter table public.achievement_definitions enable row level security;
alter table public.member_achievements enable row level security;
alter table public.streak_definitions enable row level security;
alter table public.member_streaks enable row level security;
alter table public.streak_events enable row level security;
alter table public.streameru_mission_completions enable row level security;
alter table public.reputation_rules enable row level security;
alter table public.reputation_ledger enable row level security;
alter table public.reputation_titles enable row level security;
alter table public.member_reputation_titles enable row level security;
alter table public.notifications enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.referral_codes enable row level security;
alter table public.referrals enable row level security;
alter table public.activity_feed enable row level security;

-- Seasons: members read active/ended; staff manage
drop policy if exists "seasons_select_authenticated" on public.seasons;
create policy "seasons_select_authenticated" on public.seasons
  for select to authenticated
  using (status in ('active', 'ended') or public.is_staff ());

drop policy if exists "seasons_staff_all" on public.seasons;
create policy "seasons_staff_all" on public.seasons
  for all to authenticated
  using (public.is_staff ())
  with check (public.is_staff ());

-- Progress events: own read; insert via RPC only (no direct insert policy for members)
drop policy if exists "progress_events_select_own_or_staff" on public.progress_events;
create policy "progress_events_select_own_or_staff" on public.progress_events
  for select to authenticated
  using (member_id = auth.uid () or public.is_staff ());

-- Definition tables: active readable; staff CRUD
drop policy if exists "onboarding_tasks_select" on public.onboarding_tasks;
create policy "onboarding_tasks_select" on public.onboarding_tasks
  for select to authenticated using (active = true or public.is_staff ());

drop policy if exists "onboarding_tasks_staff" on public.onboarding_tasks;
create policy "onboarding_tasks_staff" on public.onboarding_tasks
  for all to authenticated using (public.is_staff ()) with check (public.is_staff ());

drop policy if exists "mission_templates_select" on public.mission_templates;
create policy "mission_templates_select" on public.mission_templates
  for select to authenticated using (active = true or public.is_staff ());

drop policy if exists "mission_templates_staff" on public.mission_templates;
create policy "mission_templates_staff" on public.mission_templates
  for all to authenticated using (public.is_staff ()) with check (public.is_staff ());

drop policy if exists "achievement_definitions_select" on public.achievement_definitions;
create policy "achievement_definitions_select" on public.achievement_definitions
  for select to authenticated using (active = true or public.is_staff ());

drop policy if exists "achievement_definitions_staff" on public.achievement_definitions;
create policy "achievement_definitions_staff" on public.achievement_definitions
  for all to authenticated using (public.is_staff ()) with check (public.is_staff ());

drop policy if exists "streak_definitions_select" on public.streak_definitions;
create policy "streak_definitions_select" on public.streak_definitions
  for select to authenticated using (active = true or public.is_staff ());

drop policy if exists "streak_definitions_staff" on public.streak_definitions;
create policy "streak_definitions_staff" on public.streak_definitions
  for all to authenticated using (public.is_staff ()) with check (public.is_staff ());

drop policy if exists "reputation_rules_select" on public.reputation_rules;
create policy "reputation_rules_select" on public.reputation_rules
  for select to authenticated using (active = true or public.is_staff ());

drop policy if exists "reputation_rules_staff" on public.reputation_rules;
create policy "reputation_rules_staff" on public.reputation_rules
  for all to authenticated using (public.is_staff ()) with check (public.is_staff ());

drop policy if exists "reputation_titles_select" on public.reputation_titles;
create policy "reputation_titles_select" on public.reputation_titles
  for select to authenticated using (active = true or public.is_staff ());

drop policy if exists "reputation_titles_staff" on public.reputation_titles;
create policy "reputation_titles_staff" on public.reputation_titles
  for all to authenticated using (public.is_staff ()) with check (public.is_staff ());

-- Member projection rows: own + staff
drop policy if exists "member_onboarding_tasks_own" on public.member_onboarding_tasks;
create policy "member_onboarding_tasks_own" on public.member_onboarding_tasks
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "member_missions_own" on public.member_missions;
create policy "member_missions_own" on public.member_missions
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "member_achievements_own" on public.member_achievements;
create policy "member_achievements_own" on public.member_achievements
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "member_streaks_own" on public.member_streaks;
create policy "member_streaks_own" on public.member_streaks
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "streak_events_own" on public.streak_events;
create policy "streak_events_own" on public.streak_events
  for select to authenticated
  using (member_id = auth.uid () or public.is_staff ());

drop policy if exists "streak_events_insert_own" on public.streak_events;
create policy "streak_events_insert_own" on public.streak_events
  for insert to authenticated
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "streameru_completions_own" on public.streameru_mission_completions;
create policy "streameru_completions_own" on public.streameru_mission_completions
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "reputation_ledger_own" on public.reputation_ledger;
create policy "reputation_ledger_own" on public.reputation_ledger
  for select to authenticated
  using (member_id = auth.uid () or public.is_staff ());

drop policy if exists "reputation_ledger_insert_own" on public.reputation_ledger;
create policy "reputation_ledger_insert_own" on public.reputation_ledger
  for insert to authenticated
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "member_reputation_titles_own" on public.member_reputation_titles;
create policy "member_reputation_titles_own" on public.member_reputation_titles
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "notifications_own" on public.notifications;
create policy "notifications_own" on public.notifications
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "notification_prefs_own" on public.notification_preferences;
create policy "notification_prefs_own" on public.notification_preferences
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "referral_codes_own" on public.referral_codes;
create policy "referral_codes_own" on public.referral_codes
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "referral_codes_select_by_code" on public.referral_codes;
create policy "referral_codes_select_by_code" on public.referral_codes
  for select to authenticated
  using (true);

drop policy if exists "referrals_own" on public.referrals;
create policy "referrals_own" on public.referrals
  for all to authenticated
  using (inviter_id = auth.uid () or invitee_id = auth.uid () or public.is_staff ())
  with check (inviter_id = auth.uid () or invitee_id = auth.uid () or public.is_staff ());

drop policy if exists "activity_feed_select" on public.activity_feed;
create policy "activity_feed_select" on public.activity_feed
  for select to authenticated
  using (
    visibility = 'public'
    or (visibility = 'members' and public.can_schedule_battles ())
    or actor_id = auth.uid ()
    or public.is_staff ()
  );

drop policy if exists "activity_feed_insert" on public.activity_feed;
create policy "activity_feed_insert" on public.activity_feed
  for insert to authenticated
  with check (actor_id = auth.uid () or public.is_staff ());

-- Grants
grant select on public.seasons to authenticated;
grant select, insert, update, delete on public.seasons to authenticated;

grant select on public.progress_events to authenticated;

grant select on public.onboarding_tasks to authenticated;
grant select, insert, update, delete on public.onboarding_tasks to authenticated;

grant select, insert, update, delete on public.member_onboarding_tasks to authenticated;

grant select on public.mission_templates to authenticated;
grant select, insert, update, delete on public.mission_templates to authenticated;

grant select, insert, update, delete on public.member_missions to authenticated;

grant select on public.achievement_definitions to authenticated;
grant select, insert, update, delete on public.achievement_definitions to authenticated;

grant select, insert, update, delete on public.member_achievements to authenticated;

grant select on public.streak_definitions to authenticated;
grant select, insert, update, delete on public.streak_definitions to authenticated;

grant select, insert, update, delete on public.member_streaks to authenticated;
grant select, insert on public.streak_events to authenticated;

grant select, insert, update, delete on public.streameru_mission_completions to authenticated;

grant select on public.reputation_rules to authenticated;
grant select, insert, update, delete on public.reputation_rules to authenticated;

grant select, insert on public.reputation_ledger to authenticated;

grant select on public.reputation_titles to authenticated;
grant select, insert, update, delete on public.reputation_titles to authenticated;

grant select, insert, update, delete on public.member_reputation_titles to authenticated;

grant select, insert, update, delete on public.notifications to authenticated;
grant select, insert, update, delete on public.notification_preferences to authenticated;

grant select, insert, update, delete on public.referral_codes to authenticated;
grant select, insert, update, delete on public.referrals to authenticated;

grant select, insert on public.activity_feed to authenticated;

-- ---------------------------------------------------------------------------
-- Seed: Season 1 + launch definitions
-- ---------------------------------------------------------------------------

insert into public.seasons (key, name, start_at, end_at, status, theme, sort_order)
values (
  'season-1',
  'Season 1',
  '2026-07-01T00:00:00Z'::timestamptz,
  '2026-12-31T23:59:59Z'::timestamptz,
  'active',
  '{"accent":"factory"}'::jsonb,
  1
)
on conflict (key) do nothing;

insert into public.streak_definitions (key, name, description, grace_days, freeze_enabled, active)
values
  ('daily_login', 'Daily Login', 'Show up every day.', 1, false, true),
  ('weekly_learning', 'Weekly Learning', 'Train at least once per week.', 0, false, true),
  ('weekly_live', 'Weekly LIVE Activity', 'Stay consistent with LIVE practice.', 0, true, true),
  ('battle_participation', 'Battle Participation', 'Keep joining network battles.', 0, false, true)
on conflict (key) do nothing;

insert into public.onboarding_tasks (key, title, description, href, sort_order, requirement, required, active)
values
  ('complete_profile', 'Complete profile', 'Add your TikTok handle and timezone.', '/member/onboarding', 10,
    '{"type":"update_profile"}'::jsonb, true, true),
  ('connect_tiktok', 'Connect TikTok', 'Link TikTok so rankings and stats sync.', '/api/tiktok/oauth/start', 20,
    '{"type":"connect_tiktok"}'::jsonb, true, true),
  ('finish_first_lesson', 'Finish first StreamerU lesson', 'Complete your first academy lesson mission.', '/streameru', 30,
    '{"type":"complete_any_streameru_live_mission"}'::jsonb, true, true),
  ('read_guidelines', 'Read community guidelines', 'Know how the Factory works together.', '/guides', 40,
    '{"type":"read_guide","params":{"any":true}}'::jsonb, true, true),
  ('join_first_battle', 'Join first Battle', 'Get on the calendar for a network battle.', '/battle-hub', 50,
    '{"type":"join_battle"}'::jsonb, true, true),
  ('upload_creator_photo', 'Upload creator photo', 'Use a clear creator avatar via TikTok or profile.', '/member/dashboard', 60,
    '{"type":"upload_creator_photo"}'::jsonb, false, true),
  ('visit_rankings', 'Visit Rankings', 'See where you stand on the leaderboard.', '/member/leaderboard', 70,
    '{"type":"view_rankings"}'::jsonb, true, true),
  ('academy_intro', 'Finish academy introduction', 'Open Start Here and begin training.', '/streameru/start-here', 80,
    '{"type":"continue_training"}'::jsonb, true, true),
  ('welcome_badge', 'Receive welcome badge', 'Unlock the Factory Member achievement.', '/member/dashboard', 90,
    '{"type":"complete_onboarding"}'::jsonb, false, true)
on conflict (key) do nothing;

insert into public.mission_templates (key, title, description, category, cadence, season_id, requirement, active, sort_order, reputation_points)
select
  v.key, v.title, v.description, v.category, v.cadence,
  case when v.seasonal then s.id else null end,
  v.requirement::jsonb, true, v.sort_order, v.reputation_points
from public.seasons s
cross join (
  values
    ('daily_lesson', 'Complete one StreamerU lesson', 'Finish a lesson or LIVE mission today.', 'training', 'daily', false,
     '{"type":"complete_any_streameru_live_mission"}', 10, 5),
    ('daily_rankings', 'View today''s rankings', 'Check the leaderboard once today.', 'platform', 'daily', false,
     '{"type":"view_rankings"}', 20, 2),
    ('daily_profile', 'Finish your profile', 'Keep your creator profile current.', 'profile', 'daily', false,
     '{"type":"update_profile"}', 30, 2),
    ('daily_battle', 'Join one battle', 'Join or schedule a battle activity.', 'battles', 'daily', true,
     '{"type":"join_battle"}', 40, 8),
    ('daily_guide', 'Read one guide', 'Learn something from Factory guides.', 'community', 'daily', false,
     '{"type":"read_guide","params":{"any":true}}', 50, 3),
    ('daily_onboarding', 'Complete onboarding step', 'Knock out one onboarding checklist item.', 'platform', 'daily', false,
     '{"type":"complete_onboarding_task"}', 60, 4)
) as v(key, title, description, category, cadence, seasonal, requirement, sort_order, reputation_points)
where s.key = 'season-1'
on conflict (key) do nothing;

insert into public.achievement_definitions (
  key, name, description, category, icon, season_id, requirement, visibility, active, sort_order, reputation_points
)
select
  v.key, v.name, v.description, v.category, v.icon,
  case when v.seasonal then s.id else null end,
  v.requirement::jsonb, 'members', true, v.sort_order, v.reputation_points
from public.seasons s
cross join (
  values
    ('first_lesson', 'First Lesson', 'Completed your first StreamerU LIVE mission.', 'learning',
     '/branding/icons/achievements.svg', false,
     '{"type":"complete_any_streameru_live_mission"}', 10, 15),
    ('battle_beginner', 'Battle Beginner', 'Joined your first network battle.', 'battles',
     '/branding/badges/battle-master.svg', false,
     '{"type":"join_battle"}', 20, 15),
    ('profile_complete', 'Profile Complete', 'Finished your creator profile basics.', 'creator',
     '/branding/icons/profile.svg', false,
     '{"type":"update_profile"}', 30, 10),
    ('factory_member', 'Factory Member', 'Completed member onboarding.', 'milestones',
     '/branding/badges/founding-member.svg', false,
     '{"type":"complete_onboarding"}', 40, 25),
    ('seven_day_streak', 'Seven Day Streak', 'Maintained a 7-day login streak.', 'milestones',
     '/branding/icons/awards.svg', false,
     '{"type":"maintain_streak","params":{"streak_key":"daily_login","days":7}}', 50, 30),
    ('season1_starter', 'Season 1 Starter', 'Completed a Season 1 daily mission.', 'milestones',
     '/branding/badges/factory-champion.svg', true,
     '{"type":"complete_mission","params":{"any":true},"seasonScoped":true}', 60, 20),
    ('community_helper', 'Community Helper', 'Read a Factory guide to help others grow.', 'community',
     '/branding/icons/support.svg', false,
     '{"type":"read_guide","params":{"any":true}}', 70, 10),
    ('top_ten', 'Top 10', 'Reached a Top 10 ranking position.', 'rankings',
     '/branding/medals/top-10.svg', false,
     '{"type":"reach_rank","params":{"max_rank":10}}', 80, 50)
) as v(key, name, description, category, icon, seasonal, requirement, sort_order, reputation_points)
where s.key = 'season-1'
on conflict (key) do nothing;

insert into public.reputation_rules (key, name, event_type, points, max_per_day, season_scoped, active)
values
  ('onboarding_complete', 'Complete onboarding', 'onboarding_completed', 50, 1, false, true),
  ('onboarding_task', 'Complete onboarding task', 'onboarding_task_completed', 5, 10, false, true),
  ('lesson_live_mission', 'StreamerU LIVE mission', 'streameru_live_mission_completed', 15, 5, false, true),
  ('lesson_completed', 'Lesson completed', 'lesson_completed', 10, 5, false, true),
  ('battle_joined', 'Battle joined', 'battle_joined', 20, 3, true, true),
  ('daily_login', 'Daily login', 'daily_login', 2, 1, false, true),
  ('mission_completed', 'Daily mission completed', 'mission_completed', 8, 10, true, true),
  ('achievement_unlocked', 'Achievement unlocked', 'achievement_unlocked', 12, 20, false, true),
  ('guide_read', 'Guide read', 'guide_read', 3, 5, false, true),
  ('referral_accepted', 'Referral accepted', 'referral_accepted', 40, 5, false, true)
on conflict (key) do nothing;

insert into public.reputation_titles (key, name, description, icon, min_reputation, requirement, sort_order, active)
values
  ('verified_creator', 'Verified Creator', 'Established Factory creator.', '/branding/badges/verified-creator.svg', 100, '{}'::jsonb, 10, true),
  ('mentor', 'Mentor', 'Helps others grow.', '/branding/badges/trainer.svg', 250, '{}'::jsonb, 20, true),
  ('coach', 'Coach', 'Consistent high contributor.', '/branding/badges/elite.svg', 500, '{}'::jsonb, 30, true),
  ('recruiter', 'Recruiter', 'Brings creators into the Factory.', '/branding/badges/top-recruiter.svg', 300, '{"type":"referral_accepted"}'::jsonb, 40, true),
  ('moderator', 'Moderator', 'Trusted community steward.', '/branding/badges/premium.svg', 750, '{}'::jsonb, 50, true),
  ('elite_creator', 'Elite Creator', 'Top-tier Factory reputation.', '/branding/badges/diamond.svg', 1000, '{}'::jsonb, 60, true),
  ('founding_member', 'Founding Member', 'Early Factory member.', '/branding/badges/founding-member.svg', 50, '{}'::jsonb, 5, true),
  ('community_leader', 'Community Leader', 'Leads by example.', '/branding/badges/factory-champion.svg', 1500, '{}'::jsonb, 70, true)
on conflict (key) do nothing;
