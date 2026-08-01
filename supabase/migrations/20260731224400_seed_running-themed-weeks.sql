-- Seed Content Creation Mastery lesson so /streameru/running-themed-weeks resolves.

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_content uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Content Creation lesson seed (running-themed-weeks): no auth.users row.';
    return;
  end if;
  select id into cat_content from public.resource_categories where slug = 'live-streaming-tips';
  if cat_content is null then
    select id into cat_content from public.resource_categories order by created_at asc limit 1;
  end if;
  insert into public.resource_posts (
    title, slug, excerpt, content, cover_image_url, category_id, author_id,
    status, featured, published_at, training_track, difficulty
  ) values (
    'Running Themed Weeks',
    'running-themed-weeks',
    'Plan and run one themed week with daily angles and a finale so sessions build narrative gravity.',
    $cc244$
## Introduction

This is a Content Creation Mastery lesson. Complete the full StreamerU lesson body, downloads, quiz, and LIVE Mission on the site.
$cc244$,
    null, cat_content, seed_author, 'published', false, now(), 'creation', 'intermediate'
  )
  on conflict (slug) do update set
    title = excluded.title, excerpt = excluded.excerpt, content = excluded.content,
    category_id = coalesce(excluded.category_id, public.resource_posts.category_id),
    status = 'published',
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at),
    training_track = excluded.training_track, difficulty = excluded.difficulty, updated_at = now();
end $$;
