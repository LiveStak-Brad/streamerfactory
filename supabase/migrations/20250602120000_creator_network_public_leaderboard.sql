-- Allow anonymous /rankings visitors to read the latest stats import (leaderboard only).
-- Staff writes still require is_staff(); this mirrors public seed snapshot behavior.

create or replace function public.latest_creator_network_stats_batch_id ()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.creator_network_import_batches
  where status = 'completed'
    and detected_page_type in ('creator_stats', 'manage_relationship')
    and accepted_rows_count > 0
  order by created_at desc
  limit 1;
$$;

grant execute on function public.latest_creator_network_stats_batch_id () to anon, authenticated;

grant select on public.creator_network_import_batches to anon;
grant select on public.creator_network_member_stats to anon;

drop policy if exists creator_network_import_batches_public_latest on public.creator_network_import_batches;
create policy creator_network_import_batches_public_latest
  on public.creator_network_import_batches
  for select
  to anon, authenticated
  using (id = public.latest_creator_network_stats_batch_id ());

drop policy if exists creator_network_member_stats_public_leaderboard on public.creator_network_member_stats;
create policy creator_network_member_stats_public_leaderboard
  on public.creator_network_member_stats
  for select
  to anon, authenticated
  using (batch_id = public.latest_creator_network_stats_batch_id ());
