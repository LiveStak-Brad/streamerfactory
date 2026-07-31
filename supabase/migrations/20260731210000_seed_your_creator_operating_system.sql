-- Seed Advanced Creator AC-01 so /streameru/your-creator-operating-system resolves.
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
    raise notice 'Skipping AC-01 lesson seed: no auth.users row.';
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
      'Your Creator Operating System',
      'your-creator-operating-system',
      'Design a one-page creator operating system — weekly plan, review ritual, and one metric that matters — so you run LIVE like a professional, not on vibes.',
      $ac01$
## Introduction

You finished Core. You can structure a LIVE, stay safe, hold a room, run battles with integrity, and earn gifts without sounding desperate. Most creators still run on vibes after that. Professionals run a simple weekly operating system.

This lesson is the Advanced Creator black-belt opener. Complete the full lesson body in StreamerU (version-controlled curriculum), fill the Creator Weekly Operating System worksheet, pass the quiz, and run the OS Proof LIVE Mission.
$ac01$,
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
