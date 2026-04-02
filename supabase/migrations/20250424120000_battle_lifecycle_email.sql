-- Battle lifecycle transactional email bookkeeping (idempotency) + claim helpers for RLS-safe updates.

alter table public.battle_requests
add column if not exists matched_email_sent_at timestamptz;

comment on column public.battle_requests.matched_email_sent_at is
  'When the "battle matched" notification was sent; prevents duplicate sends.';

alter table public.battle_events
add column if not exists promoted_email_sent_at timestamptz;

comment on column public.battle_events.promoted_email_sent_at is
  'When the "battle promoted to calendar" notification was sent.';

alter table public.battle_events
add column if not exists reminder_sent_at timestamptz;

comment on column public.battle_events.reminder_sent_at is
  'When the upcoming-battle reminder was sent (cron / scheduled job).';

create index if not exists battle_events_reminder_window_idx on public.battle_events (scheduled_at asc)
where
  status = 'scheduled'
  and reminder_sent_at is null;

-- Idempotent flag after matched-email send (joiner may not be creator; bypasses RLS safely).
create or replace function public.mark_battle_request_matched_email_sent (p_request_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid ();
begin
  if uid is null then
    return false;
  end if;

  update public.battle_requests r
  set
    matched_email_sent_at = now ()
  where
    r.id = p_request_id
    and r.status = 'matched'
    and r.matched_email_sent_at is null
    and (
      public.is_staff ()
      or r.created_by = uid
      or exists (
        select
          1
        from
          public.battle_request_slots s
        where
          s.battle_request_id = r.id
          and s.joined_by = uid
      )
    );

  return found;
end;
$$;

-- Idempotent flag after promoted-email send.
create or replace function public.mark_battle_event_promoted_email_sent (p_event_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid ();
begin
  if uid is null then
    return false;
  end if;

  update public.battle_events e
  set
    promoted_email_sent_at = now ()
  where
    e.id = p_event_id
    and e.promoted_email_sent_at is null
    and (
      public.is_staff ()
      or e.created_by = uid
      or exists (
        select
          1
        from
          public.battle_event_participants p
        where
          p.battle_event_id = e.id
          and p.profile_id = uid
      )
    );

  return found;
end;
$$;

grant execute on function public.mark_battle_request_matched_email_sent (uuid) to authenticated;

grant execute on function public.mark_battle_event_promoted_email_sent (uuid) to authenticated;
