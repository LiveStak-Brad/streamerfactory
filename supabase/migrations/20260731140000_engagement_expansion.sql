-- Engagement expansion: certificates, graduation, career eligibility signals,
-- weekly challenges, richer achievements, and XP-facing reward rules.
-- Reputation ledger remains the canonical points store; product surfaces it as XP.

-- ---------------------------------------------------------------------------
-- Certificates (semester / program completion)
-- ---------------------------------------------------------------------------

create table if not exists public.certificate_definitions (
  id uuid primary key default gen_random_uuid (),
  key text not null unique,
  name text not null,
  description text,
  program_key text not null,
  icon text,
  requirement jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create table if not exists public.member_certificates (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  certificate_key text not null,
  program_key text not null,
  season_id uuid references public.seasons (id) on delete set null,
  issued_at timestamptz not null default now (),
  progress_event_id uuid references public.progress_events (id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now (),
  unique (member_id, certificate_key)
);

create index if not exists member_certificates_member_idx
  on public.member_certificates (member_id, issued_at desc);

comment on table public.member_certificates is
  'Issued StreamerU semester / program certificates. Projection from progress_events.';

-- ---------------------------------------------------------------------------
-- Graduation ceremony
-- ---------------------------------------------------------------------------

create table if not exists public.member_graduations (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  ceremony_key text not null default 'streameru_graduate',
  status text not null default 'eligible'
    check (status in ('eligible', 'celebrated', 'archived')),
  eligible_at timestamptz not null default now (),
  celebrated_at timestamptz,
  season_id uuid references public.seasons (id) on delete set null,
  progress_event_id uuid references public.progress_events (id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  unique (member_id, ceremony_key)
);

create index if not exists member_graduations_member_idx
  on public.member_graduations (member_id, status);

comment on table public.member_graduations is
  'StreamerU graduation ceremony eligibility and celebration state.';

-- ---------------------------------------------------------------------------
-- Career eligibility (mentor / manager gates)
-- ---------------------------------------------------------------------------

create table if not exists public.member_career_status (
  member_id uuid primary key references auth.users (id) on delete cascade,
  stage_key text not null default 'recruit',
  mentor_eligible boolean not null default false,
  mentor_eligible_at timestamptz,
  manager_eligible boolean not null default false,
  manager_eligible_at timestamptz,
  next_stage_key text,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now (),
  created_at timestamptz not null default now ()
);

comment on table public.member_career_status is
  'Derived career path stage + mentor/manager eligibility for the member.';

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.certificate_definitions enable row level security;
alter table public.member_certificates enable row level security;
alter table public.member_graduations enable row level security;
alter table public.member_career_status enable row level security;

drop policy if exists "certificate_definitions_select" on public.certificate_definitions;
create policy "certificate_definitions_select" on public.certificate_definitions
  for select to authenticated using (active = true or public.is_staff ());

drop policy if exists "certificate_definitions_staff" on public.certificate_definitions;
create policy "certificate_definitions_staff" on public.certificate_definitions
  for all to authenticated using (public.is_staff ()) with check (public.is_staff ());

drop policy if exists "member_certificates_own" on public.member_certificates;
create policy "member_certificates_own" on public.member_certificates
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "member_graduations_own" on public.member_graduations;
create policy "member_graduations_own" on public.member_graduations
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "member_career_status_own" on public.member_career_status;
create policy "member_career_status_own" on public.member_career_status
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

grant select on public.certificate_definitions to authenticated;
grant select, insert, update, delete on public.certificate_definitions to authenticated;
grant select, insert, update, delete on public.member_certificates to authenticated;
grant select, insert, update, delete on public.member_graduations to authenticated;
grant select, insert, update, delete on public.member_career_status to authenticated;

-- ---------------------------------------------------------------------------
-- Seed: certificate definitions (one per StreamerU program + graduate)
-- ---------------------------------------------------------------------------

insert into public.certificate_definitions (
  key, name, description, program_key, icon, requirement, sort_order, active
)
values
  (
    'cert_beginner_foundations',
    'Beginner Foundations Certificate',
    'Completed every lesson in Beginner Foundations.',
    'beginner',
    '/branding/badges/founding-member.svg',
    '{"type":"complete_module","params":{"module":"beginner"}}'::jsonb,
    10,
    true
  ),
  (
    'cert_live_mastery',
    'LIVE Streaming Mastery Certificate',
    'Completed every lesson in Live Streaming Mastery.',
    'content',
    '/branding/badges/elite.svg',
    '{"type":"complete_module","params":{"module":"content"}}'::jsonb,
    20,
    true
  ),
  (
    'cert_battles',
    'Battles & Collaboration Certificate',
    'Completed every lesson in Battles & Collaboration.',
    'battles',
    '/branding/badges/battle-master.svg',
    '{"type":"complete_module","params":{"module":"battles"}}'::jsonb,
    30,
    true
  ),
  (
    'cert_monetization',
    'Growth & Monetization Certificate',
    'Completed every lesson in Growth & Monetization.',
    'monetization',
    '/branding/badges/diamond.svg',
    '{"type":"complete_module","params":{"module":"monetization"}}'::jsonb,
    40,
    true
  ),
  (
    'cert_rules_safety',
    'Rules & Safety Certificate',
    'Completed every lesson in Rules & Safety.',
    'rules',
    '/branding/badges/premium.svg',
    '{"type":"complete_module","params":{"module":"rules"}}'::jsonb,
    50,
    true
  ),
  (
    'cert_streameru_graduate',
    'StreamerU Graduate Certificate',
    'Finished the full StreamerU academy — ready for the ceremony.',
    'graduate',
    '/branding/badges/factory-champion.svg',
    '{"type":"course_completion_threshold","params":{"threshold":100,"total":24}}'::jsonb,
    60,
    true
  )
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Weekly challenges (mission_templates cadence = weekly)
-- ---------------------------------------------------------------------------

insert into public.mission_templates (
  key, title, description, category, cadence, season_id, requirement, active, sort_order, reputation_points
)
select
  v.key, v.title, v.description, v.category, v.cadence,
  case when v.seasonal then s.id else null end,
  v.requirement::jsonb, true, v.sort_order, v.reputation_points
from public.seasons s
cross join (
  values
    (
      'weekly_train_hard',
      'Train 3 LIVE missions',
      'Complete three StreamerU LIVE missions this week.',
      'training',
      'weekly',
      false,
      '{"type":"complete_any_streameru_live_mission","params":{"count":3}}',
      100,
      25
    ),
    (
      'weekly_battle_week',
      'Battle week',
      'Join two network battles this week.',
      'battles',
      'weekly',
      true,
      '{"type":"join_battle","params":{"count":2}}',
      110,
      30
    ),
    (
      'weekly_show_up',
      'Show up 5 days',
      'Log in five separate days this week.',
      'platform',
      'weekly',
      false,
      '{"type":"daily_login","params":{"count":5}}',
      120,
      20
    ),
    (
      'weekly_community',
      'Community learner',
      'Read two Factory guides this week.',
      'community',
      'weekly',
      false,
      '{"type":"read_guide","params":{"any":true,"count":2}}',
      130,
      15
    )
) as v(key, title, description, category, cadence, seasonal, requirement, sort_order, reputation_points)
where s.key = 'season-1'
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Extra achievements (streaks, semester, career, graduation)
-- ---------------------------------------------------------------------------

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
    (
      'three_day_streak',
      'Three Day Streak',
      'Logged in three days in a row.',
      'milestones',
      '/branding/icons/awards.svg',
      false,
      '{"type":"maintain_streak","params":{"streak_key":"daily_login","days":3}}',
      45,
      12
    ),
    (
      'thirty_day_streak',
      'Thirty Day Streak',
      'A full month of daily check-ins.',
      'milestones',
      '/branding/icons/awards.svg',
      false,
      '{"type":"maintain_streak","params":{"streak_key":"daily_login","days":30}}',
      55,
      75
    ),
    (
      'learning_habit',
      'Learning Habit',
      'Kept a 4-week learning streak.',
      'learning',
      '/branding/icons/achievements.svg',
      false,
      '{"type":"maintain_streak","params":{"streak_key":"weekly_learning","days":4}}',
      52,
      40
    ),
    (
      'semester_complete',
      'First Semester',
      'Finished a full StreamerU program.',
      'learning',
      '/branding/badges/elite.svg',
      false,
      '{"type":"complete_module","params":{"any":true}}',
      65,
      40
    ),
    (
      'streameru_graduate',
      'StreamerU Graduate',
      'Completed the full StreamerU academy.',
      'milestones',
      '/branding/badges/factory-champion.svg',
      false,
      '{"type":"course_completion_threshold","params":{"threshold":100,"total":24}}',
      90,
      150
    ),
    (
      'weekly_challenger',
      'Weekly Challenger',
      'Completed a weekly Factory challenge.',
      'milestones',
      '/branding/badges/rising-star.svg',
      false,
      '{"type":"complete_mission","params":{"key":"weekly_train_hard"}}',
      75,
      25
    ),
    (
      'mentor_ready',
      'Mentor Ready',
      'Met the bar to mentor other creators.',
      'community',
      '/branding/badges/trainer.svg',
      false,
      '{"type":"complete_onboarding"}',
      85,
      50
    )
) as v(key, name, description, category, icon, seasonal, requirement, sort_order, reputation_points)
where s.key = 'season-1'
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Stronger daily / streak XP (reputation) rules
-- ---------------------------------------------------------------------------

insert into public.reputation_rules (key, name, event_type, points, max_per_day, season_scoped, active)
values
  ('streak_bonus_day', 'Streak kept', 'streak_incremented', 3, 3, false, true),
  ('module_completed_xp', 'Semester complete', 'module_completed', 40, 5, false, true),
  ('certificate_issued_xp', 'Certificate earned', 'certificate_issued', 25, 10, false, true),
  ('graduation_xp', 'Graduation', 'graduated', 200, 1, false, true),
  ('creator_rank_up_xp', 'Creator Rank up', 'creator_rank_up', 15, 5, false, true),
  ('weekly_mission_bonus', 'Weekly challenge complete', 'mission_completed', 5, 8, true, true)
on conflict (key) do nothing;

-- Bump daily login reward for a clearer daily reason to return
update public.reputation_rules
set points = 5, name = 'Daily check-in XP'
where key = 'daily_login';

-- ---------------------------------------------------------------------------
-- Career titles: mentor / manager are STAFF APPOINTMENTS only.
-- Auto-unlock is skipped in the reputation engine for these keys.
-- Eligibility is tracked on member_career_status (mentor_eligible / manager_eligible).
-- Staff grant appointments by inserting member_reputation_titles rows.
-- ---------------------------------------------------------------------------

update public.reputation_titles
set
  description = 'Staff-appointed mentor. Eligibility is computed separately; this title is never auto-unlocked.',
  requirement = '{"type":"complete_onboarding"}'::jsonb,
  min_reputation = 999999,
  active = true
where key = 'mentor';

insert into public.reputation_titles (
  key, name, description, icon, min_reputation, requirement, sort_order, active
)
values
  (
    'manager',
    'Manager',
    'Staff-appointed network manager. Eligibility is computed separately; this title is never auto-unlocked.',
    '/branding/badges/factory-champion.svg',
    999999,
    '{"type":"complete_onboarding"}'::jsonb,
    55,
    true
  )
on conflict (key) do update
set
  description = excluded.description,
  min_reputation = excluded.min_reputation,
  requirement = excluded.requirement;
