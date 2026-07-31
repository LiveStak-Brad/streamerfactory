-- Make approve_applicant_member safe when the profile is already a network member:
-- sync applications.status to approved instead of raising "Nothing to approve".

create or replace function public.approve_applicant_member (p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  n int;
  current_role text;
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

  select p.role into current_role
  from public.profiles p
  where
    p.id = p_user_id;

  if current_role is null then
    raise exception 'Nothing to approve';
  end if;

  if current_role = 'applicant' then
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
  elsif current_role not in ('member', 'admin', 'editor', 'owner') then
    raise exception 'Nothing to approve';
  end if;

  update public.applications
  set
    status = 'approved'
  where
    user_id = p_user_id
    and status is distinct from 'approved';
end;
$$;
