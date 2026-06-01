-- Parser confidence metadata for manual QA before rankings integration.

alter table if exists public.creator_network_member_stats
  add column if not exists username_confidence text check (username_confidence in ('high', 'medium', 'low')),
  add column if not exists username_source text;

alter table if exists public.creator_network_live_snapshots
  add column if not exists username_confidence text check (username_confidence in ('high', 'medium', 'low')),
  add column if not exists username_source text,
  add column if not exists live_badge_detected boolean not null default false;

create index if not exists creator_network_member_stats_username_confidence_idx
  on public.creator_network_member_stats (username_confidence);

create index if not exists creator_network_live_snapshots_username_confidence_idx
  on public.creator_network_live_snapshots (username_confidence);
