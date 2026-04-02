-- Public apply form submissions. Owner-only read; public insert with explicit contact consent.

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid (),
  full_name text not null,
  email text not null,
  tiktok_username text not null,
  country text not null,
  follower_range text not null,
  goes_live text not null check (goes_live in ('yes', 'no')),
  why_join text not null,
  contact_consent boolean not null
    constraint applications_contact_consent_must_be_true check (contact_consent = true),
  created_at timestamptz not null default now ()
);

create index if not exists applications_created_at_idx on public.applications (created_at desc);

create index if not exists applications_email_idx on public.applications (email);

alter table public.applications enable row level security;

-- Anyone (including anonymous) can submit if they explicitly consent to contact.
drop policy if exists "applications_public_insert" on public.applications;

create policy "applications_public_insert" on public.applications for insert
with
  check (contact_consent = true);

-- Only site owner can read applications (via profiles.is_owner()).
drop policy if exists "applications_owner_select" on public.applications;

create policy "applications_owner_select" on public.applications for
select
  using (public.is_owner ());

-- Owner can delete rows (e.g. GDPR / cleanup).
drop policy if exists "applications_owner_delete" on public.applications;

create policy "applications_owner_delete" on public.applications for delete using (public.is_owner ());
