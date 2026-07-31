-- Seed Advanced Creator AC-03 so /streameru/reading-your-live-numbers resolves.
-- Expanded body overrides content via applyExpandedLessonContent when registered in code.

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_rules uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;

  if seed_author is null then
    raise notice 'Skipping AC-03 lesson seed: no auth.users row.';
    return;
  end if;

  select id into cat_rules from public.resource_categories where slug = 'platform-rules-safety';

  insert into public.resource_posts (
    title,
    slug,
    excerpt,
    content,
    cover_image_url,
    category_id,
    author_id,
    status,
    featured,
    published_at,
    training_track,
    difficulty
  )
  values
    (
      'Reading Your LIVE Numbers Without Lying to Yourself',
      'reading-your-live-numbers',
      'Diagnose a LIVE week with a three-metric scorecard — avoid vanity traps, turn numbers into one decision, and stop lying to yourself with analytics screenshots.',
      $ac03$
## Introduction

Analytics can intimidate or flatter. Professionals use a small weekly scorecard to turn numbers into one decision.

Complete the full lesson body in StreamerU (version-controlled curriculum), fill the Weekly LIVE Analytics Scorecard, pass the quiz, and run the Scorecard Decision LIVE Mission.
$ac03$,
      null,
      cat_rules,
      seed_author,
      'published',
      false,
      now (),
      'rules',
      'intermediate'
    )
  on conflict (slug) do update
  set
    title = excluded.title,
    excerpt = excluded.excerpt,
    content = excluded.content,
    category_id = coalesce(excluded.category_id, public.resource_posts.category_id),
    status = 'published',
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at),
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    updated_at = now ();
end $$;
