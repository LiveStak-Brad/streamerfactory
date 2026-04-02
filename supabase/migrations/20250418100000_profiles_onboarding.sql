-- Member onboarding: TikTok handle, timezone, step acknowledgements, completion timestamp.

alter table public.profiles
add column if not exists tiktok_username text;

alter table public.profiles
add column if not exists timezone text;

alter table public.profiles
add column if not exists onboarding_resources_ack_at timestamptz;

alter table public.profiles
add column if not exists onboarding_calendar_ack_at timestamptz;

alter table public.profiles
add column if not exists onboarding_completed_at timestamptz;

comment on column public.profiles.tiktok_username is 'TikTok @handle for network coordination (optional, self-service).';

comment on column public.profiles.timezone is 'IANA timezone for scheduling (e.g. America/New_York).';

comment on column public.profiles.onboarding_resources_ack_at is 'Member acknowledged Start Here / resources step.';

comment on column public.profiles.onboarding_calendar_ack_at is 'Member acknowledged calendar review step.';

comment on column public.profiles.onboarding_completed_at is 'Member finished first-run onboarding (dismiss or complete).';

-- Self-service updates for onboarding fields only (bypasses RLS via definer; validates network role).
create or replace function public.update_my_onboarding (
  p_tiktok_username text default null,
  p_timezone text default null,
  p_ack_resources boolean default false,
  p_ack_calendar boolean default false,
  p_mark_complete boolean default false
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid () is null then
    raise exception 'Not authenticated';
  end if;

  if not exists (
    select 1
    from public.profiles p
    where
      p.id = auth.uid ()
      and p.role in ('owner', 'editor', 'member', 'admin')
  ) then
    raise exception 'Forbidden';
  end if;

  update public.profiles
  set
    tiktok_username = case
      when p_tiktok_username is not null then nullif(trim(p_tiktok_username), '')
      else tiktok_username
    end,
    timezone = case
      when p_timezone is not null then nullif(trim(p_timezone), '')
      else timezone
    end,
    onboarding_resources_ack_at = case
      when p_ack_resources then coalesce(onboarding_resources_ack_at, now())
      else onboarding_resources_ack_at
    end,
    onboarding_calendar_ack_at = case
      when p_ack_calendar then coalesce(onboarding_calendar_ack_at, now())
      else onboarding_calendar_ack_at
    end,
    onboarding_completed_at = case
      when p_mark_complete then coalesce(onboarding_completed_at, now())
      else onboarding_completed_at
    end,
    updated_at = now()
  where
    id = auth.uid ();
end;
$$;

grant execute on function public.update_my_onboarding (text, text, boolean, boolean, boolean) to authenticated;
