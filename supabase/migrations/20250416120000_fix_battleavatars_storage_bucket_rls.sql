-- Fix battleavatars storage RLS: bucket_id on storage.objects matches storage.buckets.id (UUID),
-- not the string 'battleavatars'. Policies must join storage.buckets by name.

drop policy if exists "battleavatars_select_public" on storage.objects;

drop policy if exists "battleavatars_insert_authenticated_own_folder" on storage.objects;

drop policy if exists "battleavatars_delete_authenticated_own_folder" on storage.objects;

drop policy if exists "battleavatars_update_authenticated_own_folder" on storage.objects;

-- Public read (bucket should be public in Dashboard for direct image URLs)
create policy "battleavatars_select_public" on storage.objects for
select to public using (
  exists (
    select 1
    from storage.buckets b
    where
      b.id = bucket_id
      and b.name = 'battleavatars'
  )
);

-- Authenticated users may upload only to {their auth.uid()}/...
create policy "battleavatars_insert_authenticated_own_folder" on storage.objects for insert to authenticated
with
  check (
    exists (
      select 1
      from storage.buckets b
      where
        b.id = bucket_id
        and b.name = 'battleavatars'
    )
    and split_part(name, '/', 1) = auth.uid ()::text
  );

create policy "battleavatars_delete_authenticated_own_folder" on storage.objects for delete to authenticated using (
  exists (
    select 1
    from storage.buckets b
    where
      b.id = bucket_id
      and b.name = 'battleavatars'
  )
  and split_part(name, '/', 1) = auth.uid ()::text
);

create policy "battleavatars_update_authenticated_own_folder" on storage.objects for
update to authenticated using (
  exists (
    select 1
    from storage.buckets b
    where
      b.id = bucket_id
      and b.name = 'battleavatars'
  )
  and split_part(name, '/', 1) = auth.uid ()::text
)
with
  check (
    exists (
      select 1
      from storage.buckets b
      where
        b.id = bucket_id
        and b.name = 'battleavatars'
    )
    and split_part(name, '/', 1) = auth.uid ()::text
  );
