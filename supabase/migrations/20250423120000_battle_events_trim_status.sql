-- Normalize accidental whitespace in battle_events.status so strict filters match.
update public.battle_events
set
  status = btrim(status)
where
  status is not null
  and status <> btrim(status);
