-- Resilient Storage RLS for `battleavatars`: match bucket by name OR legacy text id, and path prefix = auth.uid().
-- Server-side uploads with the service role bypass these policies; this helps if you upload with the user JWT only.

drop policy if exists "battleavatars_select_public" on storage.objects;

drop policy if exists "battleavatars_insert_authenticated_own_folder" on storage.objects;

drop policy if exists "battleavatars_delete_authenticated_own_folder" on storage.objects;

drop policy if exists "battleavatars_update_authenticated_own_folder" on storage.objects;

create policy "battleavatars_select_public" on storage.objects for
select to public using (
  bucket_id = 'battleavatars'
  or exists (
    select 1
    from storage.buckets b
    where
      b.id = bucket_id
      and b.name = 'battleavatars'
  )
);

create policy "battleavatars_insert_authenticated_own_folder" on storage.objects for insert to authenticated
with
  check (
    (
      bucket_id = 'battleavatars'
      or exists (
        select 1
        from storage.buckets b
        where
          b.id = bucket_id
          and b.name = 'battleavatars'
      )
    )
    and split_part(name, '/', 1) = auth.uid ()::text
  );

create policy "battleavatars_delete_authenticated_own_folder" on storage.objects for delete to authenticated using (
  (
    bucket_id = 'battleavatars'
    or exists (
      select 1
      from storage.buckets b
      where
        b.id = bucket_id
        and b.name = 'battleavatars'
    )
  )
  and split_part(name, '/', 1) = auth.uid ()::text
);

create policy "battleavatars_update_authenticated_own_folder" on storage.objects for
update to authenticated using (
  (
    bucket_id = 'battleavatars'
    or exists (
      select 1
      from storage.buckets b
      where
        b.id = bucket_id
        and b.name = 'battleavatars'
    )
  )
  and split_part(name, '/', 1) = auth.uid ()::text
)
with
  check (
    (
      bucket_id = 'battleavatars'
      or exists (
        select 1
        from storage.buckets b
        where
          b.id = bucket_id
          and b.name = 'battleavatars'
      )
    )
    and split_part(name, '/', 1) = auth.uid ()::text
  );
