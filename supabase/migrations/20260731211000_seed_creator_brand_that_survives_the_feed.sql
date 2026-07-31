-- Seed Advanced Creator AC-02 so /streameru/creator-brand-that-survives-the-feed resolves.
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
    raise notice 'Skipping AC-02 lesson seed: no auth.users row.';
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
      'Creator Brand That Survives the Feed',
      'creator-brand-that-survives-the-feed',
      'Write a brand promise viewers feel in three seconds, plus three on-stream behaviors that make you recognizable — brand that survives the scroll, not a logo project.',
      $ac02$
## Introduction

Brand that survives the feed is not a logo project. It is a clear promise plus repeatable behaviors that make you recognizable in three seconds.

Complete the full lesson body in StreamerU (version-controlled curriculum), fill the Brand One-Pager, pass the quiz, and run the Brand Proof LIVE Mission.
$ac02$,
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
