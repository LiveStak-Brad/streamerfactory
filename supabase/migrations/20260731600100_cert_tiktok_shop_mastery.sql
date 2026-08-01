-- TikTok Shop Mastery Certificate definition.
create table if not exists public.certificate_definitions (
  id uuid primary key default gen_random_uuid (), key text not null unique, name text not null,
  description text, program_key text not null, icon text, requirement jsonb not null default '{}'::jsonb,
  sort_order int not null default 0, active boolean not null default true,
  created_at timestamptz not null default now (), updated_at timestamptz not null default now ()
);
insert into public.certificate_definitions (key, name, description, program_key, icon, requirement, sort_order, active)
values (
  'cert_tiktok_shop_mastery', 'TikTok Shop Mastery Certificate',
  'Completed TikTok Shop Mastery lessons, quizzes, LIVE missions, Signature Shop Campaign Capstone, and Program Final. Advanced Creator required before certificate award. Optional specialty; Honors never gates.',
  'tts', '/branding/badges/elite.svg',
  '{"type":"complete_module","params":{"module":"tts"}}'::jsonb, 170, true
)
on conflict (key) do update set name = excluded.name, description = excluded.description,
  program_key = excluded.program_key, requirement = excluded.requirement,
  sort_order = excluded.sort_order, active = excluded.active;
