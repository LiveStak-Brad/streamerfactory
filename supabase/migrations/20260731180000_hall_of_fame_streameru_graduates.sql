-- Public Hall of Fame listing for StreamerU graduates (celebrated ceremonies).

create table if not exists public.hall_of_fame_streameru_graduates (
  member_id uuid primary key references public.profiles (id) on delete cascade,
  display_name text not null,
  tiktok_username text not null,
  diploma_label text not null default 'StreamerU Diploma',
  certified_label text not null default 'Certified LIVE Creator',
  career_path text,
  graduated_at timestamptz not null default now (),
  avatar_url text,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create index if not exists hall_of_fame_streameru_graduates_graduated_idx
  on public.hall_of_fame_streameru_graduates (graduated_at desc);

comment on table public.hall_of_fame_streameru_graduates is
  'Public StreamerU Graduates board — written on graduation ceremony celebrate.';

alter table public.hall_of_fame_streameru_graduates enable row level security;

drop policy if exists hall_of_fame_streameru_graduates_public_read
  on public.hall_of_fame_streameru_graduates;
create policy hall_of_fame_streameru_graduates_public_read
  on public.hall_of_fame_streameru_graduates for select
  to anon, authenticated
  using (true);

drop policy if exists hall_of_fame_streameru_graduates_staff_write
  on public.hall_of_fame_streameru_graduates;
create policy hall_of_fame_streameru_graduates_staff_write
  on public.hall_of_fame_streameru_graduates for all
  to authenticated
  using (public.is_staff ())
  with check (public.is_staff ());

-- Members may upsert their own row when celebrating (engine uses authenticated client).
drop policy if exists hall_of_fame_streameru_graduates_own_upsert
  on public.hall_of_fame_streameru_graduates;
create policy hall_of_fame_streameru_graduates_own_upsert
  on public.hall_of_fame_streameru_graduates for insert
  to authenticated
  with check (member_id = auth.uid () or public.is_staff ());

drop policy if exists hall_of_fame_streameru_graduates_own_update
  on public.hall_of_fame_streameru_graduates;
create policy hall_of_fame_streameru_graduates_own_update
  on public.hall_of_fame_streameru_graduates for update
  to authenticated
  using (member_id = auth.uid () or public.is_staff ())
  with check (member_id = auth.uid () or public.is_staff ());

grant select on public.hall_of_fame_streameru_graduates to anon, authenticated;
grant insert, update, delete on public.hall_of_fame_streameru_graduates to authenticated;
