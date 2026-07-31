-- Seed Advanced Creator AC-08 so /streameru/advanced-creator-capstone-30-day-pro-sprint resolves.

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_rules uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping AC-08 lesson seed: no auth.users row.';
    return;
  end if;
  select id into cat_rules from public.resource_categories where slug = 'platform-rules-safety';
  insert into public.resource_posts (
    title, slug, excerpt, content, cover_image_url, category_id, author_id,
    status, featured, published_at, training_track, difficulty
  ) values (
    'Advanced Creator Capstone: 30-Day Pro Sprint',
    'advanced-creator-capstone-30-day-pro-sprint',
    'Capstone: run a 30-day professional creator sprint integrating your OS, brand, scorecards, creative plan, one experiment, standards, and privacy — then review before/after with a real dossier.',
    $ac08$
## Introduction

This is the Advanced Creator Capstone. Complete the full StreamerU lesson body, assemble your Capstone dossier and 30-Day Sprint Planner, pass the quiz, and run the Capstone Kickoff LIVE Mission — then execute the thirty days.
$ac08$,
    null, cat_rules, seed_author, 'published', false, now(), 'rules', 'advanced'
  )
  on conflict (slug) do update set
    title = excluded.title, excerpt = excluded.excerpt, content = excluded.content,
    category_id = coalesce(excluded.category_id, public.resource_posts.category_id),
    status = 'published',
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at),
    training_track = excluded.training_track, difficulty = excluded.difficulty, updated_at = now();
end $$;
