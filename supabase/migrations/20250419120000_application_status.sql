-- Application lifecycle status + own-row read + staff updates; sync approval RPC with applications row.

-- ---------------------------------------------------------------------------
-- Link applications to auth (safe if 20250417120000 already ran)
-- ---------------------------------------------------------------------------

alter table public.applications
add column if not exists user_id uuid references auth.users (id) on delete set null;

create unique index if not exists applications_one_per_user_id on public.applications (user_id)
where
  user_id is not null;

-- ---------------------------------------------------------------------------
-- Status column (single source of truth for pipeline; profile.role for access)
-- ---------------------------------------------------------------------------

alter table public.applications
add column if not exists status text not null default 'submitted';

alter table public.applications drop constraint if exists applications_status_check;

alter table public.applications
add constraint applications_status_check check (
  status in ('submitted', 'in_review', 'approved', 'rejected')
);

comment on column public.applications.status is
  'Pipeline: submitted → in_review (optional) → approved | rejected. Profile role still gates access.';

-- ---------------------------------------------------------------------------
-- Staff helper (RLS policies below; idempotent if 20250417120000 already ran)
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

-- ---------------------------------------------------------------------------
-- RLS: applicants can read their own submission; staff can update status
-- ---------------------------------------------------------------------------

drop policy if exists "applications_select_own" on public.applications;

create policy "applications_select_own" on public.applications for
select to authenticated using (auth.uid () = user_id);

drop policy if exists "applications_staff_update" on public.applications;

create policy "applications_staff_update" on public.applications for
update to authenticated using (public.is_staff ())
with
  check (public.is_staff ());

drop policy if exists "applications_update_own_resubmit" on public.applications;

-- Re-submit after rejection: applicant may update their row back to submitted with new answers.
create policy "applications_update_own_resubmit" on public.applications for
update to authenticated using (auth.uid () = user_id and status = 'rejected')
with
  check (
    auth.uid () = user_id
    and status = 'submitted'
  );

-- ---------------------------------------------------------------------------
-- Approve member: also mark application approved when present
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

  update public.applications
  set
    status = 'approved'
  where
    user_id = p_user_id;
end;
$$;
