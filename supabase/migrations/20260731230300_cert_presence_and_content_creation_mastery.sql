-- Presence Mastery + Content Creation Mastery certificate definitions.
-- Mirrors cert_growth_mastery seed pattern for Programs 6–7.

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

insert into public.certificate_definitions (
  key, name, description, program_key, icon, requirement, sort_order, active
)
values
  (
    'cert_presence_mastery',
    'Presence Mastery Certificate',
    'Completed Presence Mastery lessons, quizzes, LIVE missions, Capstone, and Program Final — camera, voice, pacing, and recovery craft for TikTok LIVE.',
    'presence',
    '/branding/badges/elite.svg',
    '{"type":"complete_module","params":{"module":"presence"}}'::jsonb,
    55,
    true
  ),
  (
    'cert_content_creation_mastery',
    'Content Creation Mastery Certificate',
    'Completed Content Creation Mastery lessons, quizzes, LIVE missions, Capstone, and Program Final — niche, segments, themes, and showcraft for TikTok LIVE.',
    'creation',
    '/branding/badges/elite.svg',
    '{"type":"complete_module","params":{"module":"creation"}}'::jsonb,
    65,
    true
  )
on conflict (key) do update set
  name = excluded.name,
  description = excluded.description,
  program_key = excluded.program_key,
  requirement = excluded.requirement,
  sort_order = excluded.sort_order,
  active = excluded.active;
