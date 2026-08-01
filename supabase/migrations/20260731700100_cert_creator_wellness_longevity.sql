-- Creator Wellness & Longevity Mastery Certificate definition.
create table if not exists public.certificate_definitions (
  id uuid primary key default gen_random_uuid (), key text not null unique, name text not null,
  description text, program_key text not null, icon text, requirement jsonb not null default '{}'::jsonb,
  sort_order int not null default 0, active boolean not null default true,
  created_at timestamptz not null default now (), updated_at timestamptz not null default now ()
);
insert into public.certificate_definitions (key, name, description, program_key, icon, requirement, sort_order, active)
values (
  'cert_creator_wellness_longevity', 'Creator Wellness & Longevity Mastery Certificate',
  'Completed Creator Wellness & Longevity Mastery lessons, quizzes, LIVE missions, Personal Creator Longevity Plan Capstone, and Program Final. Advanced Creator required before certificate award. Recommended for everyone; Honors never gates.',
  'wellness', '/branding/badges/elite.svg',
  '{"type":"complete_module","params":{"module":"wellness"}}'::jsonb, 180, true
)
on conflict (key) do update set name = excluded.name, description = excluded.description,
  program_key = excluded.program_key, requirement = excluded.requirement,
  sort_order = excluded.sort_order, active = excluded.active;
