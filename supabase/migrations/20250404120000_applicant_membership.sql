-- Network membership: new signups are applicants until an owner promotes them to member.
-- Adds optional email on profiles for admin review; backfills from auth.users.

alter table public.profiles add column if not exists email text;

alter table public.profiles drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check check (role in ('owner', 'editor', 'member', 'admin', 'applicant'));

alter table public.profiles alter column role set default 'applicant';

update public.profiles p
set email = u.email
from auth.users u
where u.id = p.id
  and (p.email is null or p.email is distinct from u.email);

create or replace function public.handle_new_user ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, email)
  values (new.id, 'applicant', new.email)
  on conflict (id) do update
  set
    email = coalesce (excluded.email, public.profiles.email),
    updated_at = now ();
  return new;
end;
$$;
