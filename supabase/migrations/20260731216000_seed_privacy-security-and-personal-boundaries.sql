-- Seed Advanced Creator AC-07 so /streameru/privacy-security-and-personal-boundaries resolves.

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_rules uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping AC-07 lesson seed: no auth.users row.';
    return;
  end if;
  select id into cat_rules from public.resource_categories where slug = 'platform-rules-safety';
  insert into public.resource_posts (
    title, slug, excerpt, content, cover_image_url, category_id, author_id,
    status, featured, published_at, training_track, difficulty
  ) values (
    'Privacy, Security, and Personal Boundaries',
    'privacy-security-and-personal-boundaries',
    'Protect the human behind the LIVE — privacy defaults, account security hygiene, location and family boundaries, and what never belongs on camera.',
    $ac07$
## Introduction

Privacy, security, and personal boundaries are career skills. Complete the full StreamerU lesson body, apply the Privacy & Security Checklist, pass the quiz, and run the Boundary-Safe LIVE Mission.
$ac07$,
    null, cat_rules, seed_author, 'published', false, now(), 'rules', 'intermediate'
  )
  on conflict (slug) do update set
    title = excluded.title, excerpt = excluded.excerpt, content = excluded.content,
    category_id = coalesce(excluded.category_id, public.resource_posts.category_id),
    status = 'published',
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at),
    training_track = excluded.training_track, difficulty = excluded.difficulty, updated_at = now();
end $$;
