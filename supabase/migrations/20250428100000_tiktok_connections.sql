-- TikTok Login Kit: store OAuth tokens and synced profile stats per member profile.
-- Access only via service role from trusted server code (RLS enabled, no policies for anon/authenticated).

create table if not exists public.tiktok_connections (
  id uuid primary key default gen_random_uuid (),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  tiktok_open_id text not null,
  tiktok_username text,
  display_name text,
  avatar_url text,
  follower_count integer not null default 0,
  following_count integer not null default 0,
  likes_count integer not null default 0,
  video_count integer not null default 0,
  access_token text not null,
  refresh_token text not null,
  access_token_expires_at timestamptz not null,
  refresh_token_expires_at timestamptz not null,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now (),
  constraint tiktok_connections_profile_id_unique unique (profile_id),
  constraint tiktok_connections_open_id_unique unique (tiktok_open_id)
);

create index if not exists tiktok_connections_profile_id_idx on public.tiktok_connections (profile_id);

create or replace function public.set_tiktok_connections_updated_at ()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now ();
  return new;
end;
$$;

drop trigger if exists tiktok_connections_set_updated_at on public.tiktok_connections;

create trigger tiktok_connections_set_updated_at
before update on public.tiktok_connections
for each row
execute function public.set_tiktok_connections_updated_at ();

alter table public.tiktok_connections enable row level security;

-- No policies for anon/authenticated: rows are never read/written with the anon key or end-user JWT.
-- Server uses SUPABASE_SERVICE_ROLE_KEY after verifying the session user owns profile_id.

revoke all on public.tiktok_connections from public;

revoke all on public.tiktok_connections from anon;

revoke all on public.tiktok_connections from authenticated;

grant all on public.tiktok_connections to service_role;

comment on table public.tiktok_connections is 'TikTok Login Kit tokens and cached user stats; server/service-role only.';

comment on column public.tiktok_connections.access_token is 'OAuth access token; never expose to browser.';

comment on column public.tiktok_connections.refresh_token is 'OAuth refresh token; never expose to browser.';
