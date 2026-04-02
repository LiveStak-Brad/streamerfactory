-- Run in Supabase SQL Editor (or via CLI) once per project.
-- Creates profiles + RLS, backfills existing users, promotes the designated owner.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'editor', 'member')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);

alter table public.profiles enable row level security;

-- True when the current user has role = owner (used in RLS).
create or replace function public.is_owner ()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.role = 'owner' from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

drop policy if exists "profiles_select_own_or_owner" on public.profiles;
create policy "profiles_select_own_or_owner"
  on public.profiles
  for select
  using (auth.uid () = id or public.is_owner ());

drop policy if exists "profiles_update_by_owner" on public.profiles;
create policy "profiles_update_by_owner"
  on public.profiles
  for update
  using (public.is_owner ())
  with check (public.is_owner ());

-- New signups get a member profile (runs with definer; bypasses RLS for insert).
create or replace function public.handle_new_user ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'member')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user ();

-- Existing auth users → profile rows; then promote the site owner.
insert into public.profiles (id, role)
select id, 'member'
from auth.users
on conflict (id) do nothing;

update public.profiles
set role = 'owner', updated_at = now()
where id = '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
