-- Allow `admin` in profiles.role to match app auth (canScheduleBattles / Battle Hub access).

alter table public.profiles drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check check (role in ('owner', 'editor', 'member', 'admin'));
