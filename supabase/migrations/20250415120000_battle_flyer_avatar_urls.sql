-- Optional flyer avatar per participant (public URLs, e.g. Supabase Storage battleavatars bucket).

alter table public.battle_event_participants
add column if not exists flyer_avatar_url text;

comment on column public.battle_event_participants.flyer_avatar_url is
  'Public URL for flyer/calendar avatar override (e.g. uploaded to battleavatars bucket).';

-- ---------------------------------------------------------------------------
-- Storage: battleavatars bucket (create in Dashboard if missing) — policies
-- ---------------------------------------------------------------------------

-- Public read for a public bucket
drop policy if exists "battleavatars_select_public" on storage.objects;

create policy "battleavatars_select_public" on storage.objects for
select to public using (bucket_id = 'battleavatars');

-- Authenticated uploads only under their user id folder: {uid}/...
drop policy if exists "battleavatars_insert_authenticated_own_folder" on storage.objects;

create policy "battleavatars_insert_authenticated_own_folder" on storage.objects for insert to authenticated
with
  check (
    bucket_id = 'battleavatars'
    and split_part(name, '/', 1) = auth.uid ()::text
  );

drop policy if exists "battleavatars_delete_authenticated_own_folder" on storage.objects;

create policy "battleavatars_delete_authenticated_own_folder" on storage.objects for delete to authenticated using (
  bucket_id = 'battleavatars'
  and split_part(name, '/', 1) = auth.uid ()::text
);

drop policy if exists "battleavatars_update_authenticated_own_folder" on storage.objects;

create policy "battleavatars_update_authenticated_own_folder" on storage.objects for
update to authenticated using (
  bucket_id = 'battleavatars'
  and split_part(name, '/', 1) = auth.uid ()::text
)
with
  check (
    bucket_id = 'battleavatars'
    and split_part(name, '/', 1) = auth.uid ()::text
  );
