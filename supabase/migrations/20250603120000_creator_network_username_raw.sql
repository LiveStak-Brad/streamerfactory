-- Store raw Backstage username text before badge cleanup (admin review).

alter table public.creator_network_member_stats
  add column if not exists tiktok_username_raw text;

comment on column public.creator_network_member_stats.tiktok_username_raw is
  'Username text as parsed from Backstage before badge/level cleanup.';
