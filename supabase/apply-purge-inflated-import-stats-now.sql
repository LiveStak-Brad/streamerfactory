-- One-time cleanup: remove bogus diamond rows from auto-sync on wrong Backstage pages.
-- Run in Supabase SQL editor, then hard-refresh /rankings.

-- Inflated member_stats rows (e.g. 1.3B from chart/UI misreads)
delete from public.creator_network_member_stats
where coalesce(diamonds_earned, 0) > 1000000
   or coalesce(coins_earned, 0) > 1000000;

-- Matching performance_stats upserts from bad imports
delete from public.creator_performance_stats
where coalesce(coins_earned, 0) > 1000000;

-- Backstage summary rows (e.g. "No group" network total → @nogroup)
delete from public.creator_network_member_stats
where lower(regexp_replace(coalesce(tiktok_username, ''), '^@', '')) in (
  'nogroup', 'no_group', 'no-group', 'effective', 'total', 'summary', 'aggregate', 'ungrouped', 'all'
)
or lower(regexp_replace(coalesce(tiktok_username, ''), '^@', '')) ~ '^no_?group$';

-- Chart misread: 100k diamonds with no stream time (same value pasted on everyone)
delete from public.creator_network_member_stats
where coalesce(diamonds_earned, coins_earned, 0) = 100000
  and coalesce(hours_streamed, 0) < 0.5
  and coalesce(days_streamed, 0) = 0;

delete from public.creator_performance_stats
where coins_earned = 100000;

-- Optional: empty batches that no longer have any stats rows
delete from public.creator_network_import_batches b
where not exists (
  select 1 from public.creator_network_member_stats s where s.batch_id = b.id
)
and not exists (
  select 1 from public.creator_network_live_snapshots l where l.batch_id = b.id
);
