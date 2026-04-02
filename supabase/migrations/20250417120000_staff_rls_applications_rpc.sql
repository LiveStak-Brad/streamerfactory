-- Staff helpers (owner, editor, admin), application linkage, RPC member approval,
-- RLS aligned with app (staff CMS + moderation), role escalation guard.

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.is_staff ()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select p.role in ('owner', 'editor', 'admin')
      from public.profiles p
      where
        p.id = auth.uid ()
    ),
    false
  );
$$;

-- Match app NETWORK_MEMBER_ROLES (includes admin for scheduling).
create or replace function public.can_schedule_battles ()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid () is not null
  and exists (
    select 1
    from public.profiles p
    where
      p.id = auth.uid ()
      and p.role in ('owner', 'editor', 'member', 'admin')
  );
$$;

-- ---------------------------------------------------------------------------
-- Profiles: staff can list applicants; only owner may assign elevated roles
-- ---------------------------------------------------------------------------

drop policy if exists "profiles_select_own_or_owner" on public.profiles;

create policy "profiles_select_own_or_staff" on public.profiles for
select
  using (auth.uid () = id or public.is_staff ());

drop trigger if exists on_profiles_role_guard on public.profiles;

create or replace function public.enforce_profile_role_assignment ()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    if new.role in ('owner', 'editor', 'admin') and not public.is_owner () then
      raise exception 'Only the site owner can assign elevated roles';
    end if;
  end if;
  return new;
end;
$$;

create trigger on_profiles_role_guard
before update on public.profiles for each row
execute function public.enforce_profile_role_assignment ();

-- ---------------------------------------------------------------------------
-- Applications: tie to auth user, staff read/delete, no anonymous insert
-- ---------------------------------------------------------------------------

alter table public.applications
add column if not exists user_id uuid references auth.users (id) on delete set null;

create unique index if not exists applications_one_per_user_id on public.applications (user_id)
where
  user_id is not null;

drop policy if exists "applications_public_insert" on public.applications;

drop policy if exists "applications_authenticated_insert" on public.applications;

create policy "applications_authenticated_insert" on public.applications for insert to authenticated
with
  check (contact_consent = true and user_id = auth.uid ());

drop policy if exists "applications_owner_select" on public.applications;

drop policy if exists "applications_staff_select" on public.applications;

create policy "applications_staff_select" on public.applications for
select
  using (public.is_staff ());

drop policy if exists "applications_owner_delete" on public.applications;

drop policy if exists "applications_staff_delete" on public.applications;

create policy "applications_staff_delete" on public.applications for delete using (public.is_staff ());

-- ---------------------------------------------------------------------------
-- Resources CMS: staff (owner, editor, admin) same as previous owner-only
-- ---------------------------------------------------------------------------

drop policy if exists "resource_categories_insert_owner" on public.resource_categories;

create policy "resource_categories_insert_staff" on public.resource_categories for insert to authenticated
with
  check (public.is_staff ());

drop policy if exists "resource_categories_update_owner" on public.resource_categories;

create policy "resource_categories_update_staff" on public.resource_categories for
update to authenticated using (public.is_staff ())
with
  check (public.is_staff ());

drop policy if exists "resource_categories_delete_owner" on public.resource_categories;

create policy "resource_categories_delete_staff" on public.resource_categories for delete to authenticated using (public.is_staff ());

drop policy if exists "resource_posts_select_owner" on public.resource_posts;

create policy "resource_posts_select_staff" on public.resource_posts for
select
  to authenticated using (public.is_staff ());

drop policy if exists "resource_posts_insert_owner" on public.resource_posts;

create policy "resource_posts_insert_staff" on public.resource_posts for insert to authenticated
with
  check (public.is_staff ());

drop policy if exists "resource_posts_update_owner" on public.resource_posts;

create policy "resource_posts_update_staff" on public.resource_posts for
update to authenticated using (public.is_staff ())
with
  check (public.is_staff ());

drop policy if exists "resource_posts_delete_owner" on public.resource_posts;

create policy "resource_posts_delete_staff" on public.resource_posts for delete to authenticated using (public.is_staff ());

-- ---------------------------------------------------------------------------
-- Battle Hub: staff moderation (same as owner before)
-- ---------------------------------------------------------------------------

drop policy if exists "battle_events_select" on public.battle_events;

create policy "battle_events_select" on public.battle_events for
select
  using (
    status <> 'cancelled'
    or created_by = auth.uid ()
    or public.is_staff ()
  );

drop policy if exists "battle_events_update" on public.battle_events;

create policy "battle_events_update" on public.battle_events for
update to authenticated using (
  created_by = auth.uid ()
  or public.is_staff ()
)
with
  check (
    public.is_staff ()
    or created_by = auth.uid ()
  );

drop policy if exists "battle_events_delete" on public.battle_events;

create policy "battle_events_delete" on public.battle_events for delete to authenticated using (
  created_by = auth.uid ()
  or public.is_staff ()
);

drop policy if exists "battle_participants_select" on public.battle_event_participants;

create policy "battle_participants_select" on public.battle_event_participants for
select
  using (
    exists (
      select 1
      from public.battle_events e
      where
        e.id = battle_event_id
        and (
          e.status <> 'cancelled'
          or e.created_by = auth.uid ()
          or public.is_staff ()
        )
    )
  );

drop policy if exists "battle_participants_insert" on public.battle_event_participants;

create policy "battle_participants_insert" on public.battle_event_participants for insert to authenticated
with
  check (
    exists (
      select 1
      from public.battle_events e
      where
        e.id = battle_event_id
        and (
          e.created_by = auth.uid ()
          or public.is_staff ()
        )
    )
  );

drop policy if exists "battle_participants_update" on public.battle_event_participants;

create policy "battle_participants_update" on public.battle_event_participants for
update to authenticated using (
  exists (
    select 1
    from public.battle_events e
    where
      e.id = battle_event_id
      and (
        e.created_by = auth.uid ()
        or public.is_staff ()
      )
  )
)
with
  check (
    exists (
      select 1
      from public.battle_events e
      where
        e.id = battle_event_id
        and (
          e.created_by = auth.uid ()
          or public.is_staff ()
        )
    )
  );

drop policy if exists "battle_participants_delete" on public.battle_event_participants;

create policy "battle_participants_delete" on public.battle_event_participants for delete to authenticated using (
  exists (
    select 1
    from public.battle_events e
    where
      e.id = battle_event_id
      and (
        e.created_by = auth.uid ()
        or public.is_staff ()
      )
  )
);

-- ---------------------------------------------------------------------------
-- RPC: editors/owners promote applicant → member (RLS-safe)
-- ---------------------------------------------------------------------------

create or replace function public.approve_applicant_member (p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  n int;
begin
  if auth.uid () is null then
    raise exception 'Not authenticated';
  end if;

  if not exists (
    select 1
    from public.profiles p
    where
      p.id = auth.uid ()
      and p.role in ('owner', 'editor', 'admin')
  ) then
    raise exception 'Forbidden';
  end if;

  update public.profiles
  set
    role = 'member',
    updated_at = now()
  where
    id = p_user_id
    and role = 'applicant';

  get diagnostics n = row_count;

  if n = 0 then
    raise exception 'Nothing to approve';
  end if;
end;
$$;

grant execute on function public.approve_applicant_member (uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Storage: only members (and staff roles) can upload flyer assets
-- ---------------------------------------------------------------------------

drop policy if exists "battleavatars_insert_authenticated_own_folder" on storage.objects;

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
    and public.can_schedule_battles ()
  );
