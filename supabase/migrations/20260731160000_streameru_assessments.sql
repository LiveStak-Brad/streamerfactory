-- StreamerU assessments: quiz attempts, academy XP ledger, mastery projections.
-- StreamerU XP is separate from Factory Reputation (reputation_ledger).

-- ---------------------------------------------------------------------------
-- Quiz / exam attempts
-- ---------------------------------------------------------------------------

create table if not exists public.streameru_quiz_attempts (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  assessment_key text not null,
  kind text not null
    check (kind in ('lesson_quiz', 'program_final', 'graduation')),
  lesson_slug text,
  program_key text,
  score_percent int not null check (score_percent between 0 and 100),
  correct_count int not null default 0,
  total_count int not null default 0,
  passed boolean not null default false,
  perfect boolean not null default false,
  answers jsonb not null default '{}'::jsonb,
  xp_awarded int not null default 0,
  progress_event_id uuid references public.progress_events (id) on delete set null,
  created_at timestamptz not null default now ()
);

create index if not exists streameru_quiz_attempts_member_idx
  on public.streameru_quiz_attempts (member_id, created_at desc);

create index if not exists streameru_quiz_attempts_key_idx
  on public.streameru_quiz_attempts (member_id, assessment_key, created_at desc);

create index if not exists streameru_quiz_attempts_passed_idx
  on public.streameru_quiz_attempts (member_id, kind, passed)
  where passed = true;

comment on table public.streameru_quiz_attempts is
  'StreamerU lesson quiz / program final / graduation exam attempts.';

-- ---------------------------------------------------------------------------
-- StreamerU XP ledger (academy-only; NOT reputation)
-- ---------------------------------------------------------------------------

create table if not exists public.streameru_xp_ledger (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  amount int not null check (amount > 0),
  reason text not null,
  assessment_key text,
  progress_event_id uuid references public.progress_events (id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now (),
  idempotency_key text not null,
  unique (member_id, idempotency_key)
);

create index if not exists streameru_xp_ledger_member_idx
  on public.streameru_xp_ledger (member_id, created_at desc);

comment on table public.streameru_xp_ledger is
  'Append-only StreamerU academy XP. Separate from Factory Reputation.';

-- ---------------------------------------------------------------------------
-- Mastery projection
-- ---------------------------------------------------------------------------

create table if not exists public.streameru_mastery (
  id uuid primary key default gen_random_uuid (),
  member_id uuid not null references auth.users (id) on delete cascade,
  scope text not null check (scope in ('lesson', 'program', 'academy')),
  scope_key text not null,
  best_percent int not null default 0 check (best_percent between 0 and 100),
  updated_at timestamptz not null default now (),
  unique (member_id, scope, scope_key)
);

create index if not exists streameru_mastery_member_idx
  on public.streameru_mastery (member_id, scope);

comment on table public.streameru_mastery is
  'Projected StreamerU mastery percentages from best quiz/exam scores.';

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.streameru_quiz_attempts enable row level security;
alter table public.streameru_xp_ledger enable row level security;
alter table public.streameru_mastery enable row level security;

drop policy if exists "streameru_quiz_attempts_own" on public.streameru_quiz_attempts;
create policy "streameru_quiz_attempts_own" on public.streameru_quiz_attempts
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "streameru_xp_ledger_own" on public.streameru_xp_ledger;
create policy "streameru_xp_ledger_own" on public.streameru_xp_ledger
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists "streameru_mastery_own" on public.streameru_mastery;
create policy "streameru_mastery_own" on public.streameru_mastery
  for all to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

grant select, insert, update, delete on public.streameru_quiz_attempts to authenticated;
grant select, insert, update, delete on public.streameru_xp_ledger to authenticated;
grant select, insert, update, delete on public.streameru_mastery to authenticated;

-- ---------------------------------------------------------------------------
-- Assessment achievements (reputation_points = 0; StreamerU XP is separate)
-- ---------------------------------------------------------------------------

insert into public.achievement_definitions (
  key, name, description, category, icon, season_id, requirement, visibility, active, sort_order, reputation_points
)
values
  (
    'first_quiz_passed',
    'First Quiz Passed',
    'Passed your first StreamerU lesson quiz.',
    'learning',
    '/branding/icons/achievements.svg',
    null,
    '{"type":"pass_lesson_quiz","params":{"any":true}}'::jsonb,
    'members',
    true,
    61,
    0
  ),
  (
    'perfect_quiz',
    'Perfect Quiz',
    'Scored 100% on a StreamerU lesson quiz.',
    'learning',
    '/branding/icons/achievements.svg',
    null,
    '{"type":"pass_lesson_quiz","params":{"perfect":true}}'::jsonb,
    'members',
    true,
    62,
    0
  ),
  (
    'first_program_final',
    'First Program Final',
    'Passed your first StreamerU Program Final Exam.',
    'learning',
    '/branding/badges/elite.svg',
    null,
    '{"type":"pass_program_final","params":{"any":true}}'::jsonb,
    'members',
    true,
    66,
    0
  ),
  (
    'all_program_certificates',
    'All Program Certificates',
    'Passed all five StreamerU Program Final Exams.',
    'learning',
    '/branding/badges/factory-champion.svg',
    null,
    '{"type":"pass_program_final","params":{"count":5}}'::jsonb,
    'members',
    true,
    70,
    0
  ),
  (
    'graduation_exam_passed',
    'Graduation Exam Passed',
    'Passed the StreamerU Graduation Exam.',
    'milestones',
    '/branding/badges/factory-champion.svg',
    null,
    '{"type":"pass_graduation_exam"}'::jsonb,
    'members',
    true,
    88,
    0
  )
on conflict (key) do nothing;

-- Tighten graduate achievement to require graduation exam
update public.achievement_definitions
set
  requirement = '{"type":"pass_graduation_exam"}'::jsonb,
  description = 'Passed the Graduation Exam and completed StreamerU.'
where key = 'streameru_graduate';

-- Certificate copy: finals required
update public.certificate_definitions
set description = 'Completed program missions and passed the Program Final Exam.'
where program_key in ('beginner', 'content', 'battles', 'monetization', 'rules');

update public.certificate_definitions
set description = 'Passed the Graduation Exam after finishing all five StreamerU programs.'
where key = 'cert_streameru_graduate';
