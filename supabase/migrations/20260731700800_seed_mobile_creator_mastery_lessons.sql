-- Seed all Mobile Creator Mastery lessons (MOB-01–MOB-10).
do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Mobile Creator lesson seeds: no auth.users row.';
    return;
  end if;
  select id into cat_id from public.resource_categories where slug = 'growth-monetization';
  if cat_id is null then
    select id into cat_id from public.resource_categories order by created_at asc limit 1;
  end if;
  insert into public.resource_posts (
    title, slug, excerpt, content, cover_image_url, category_id, author_id,
    status, featured, published_at, training_track, difficulty
  ) values
  (
    'Building a Mobile Creator Mindset', 'building-a-mobile-creator-mindset',
    'Build a mobile creator mindset grounded in reliability, simplicity, and prepared systems—not vibes.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'mobile', 'intermediate'
  ),
  (
    'Choosing the Right Mobile Equipment', 'choosing-the-right-mobile-equipment',
    'Choose mobile gear by reliability principles—storage, battery, heat, ports—not yearly phone hype.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'mobile', 'intermediate'
  ),
  (
    'Mobile Audio & Lighting', 'mobile-audio-and-lighting',
    'Design portable audio and lighting that stays intelligible and controllable on the move.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'mobile', 'intermediate'
  ),
  (
    'Streaming Anywhere Professionally', 'streaming-anywhere-professionally',
    'Stream anywhere with heat, power, bandwidth, and setup discipline—not improvisation alone.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'mobile', 'intermediate'
  ),
  (
    'Creating High-Quality Videos on Your Phone', 'creating-high-quality-videos-on-your-phone',
    'Build repeatable phone editing, caption, and thumbnail workflows without desktop dependency.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'mobile', 'intermediate'
  ),
  (
    'Traveling as a Creator', 'traveling-as-a-creator',
    'Pack, transit, and hotel stream with weight limits, redundancy, and general travel awareness—not legal advice.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'mobile', 'advanced'
  ),
  (
    'Mobile Productivity & Cloud Workflows', 'mobile-productivity-and-cloud-workflows',
    'Organize cloud assets, plan battery use, and keep offline fallbacks for dead zones.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'mobile', 'advanced'
  ),
  (
    'IRL Streaming Safely & Responsibly', 'irl-streaming-safely-and-responsibly',
    'IRL stream with safety, privacy, consent, and exit plans—never chaos for clips.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'mobile', 'advanced'
  ),
  (
    'Building a Complete Mobile Creator Kit', 'building-a-complete-mobile-creator-kit',
    'Assemble a complete mobile kit with redundancy layers—not the most expensive backpack.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'mobile', 'advanced'
  ),
  (
    'Mobile Creator Capstone: Complete Mobile Creator System', 'mobile-creator-capstone-complete-system',
    'Assemble a Complete Mobile Creator System with dated evidence from MOB-01 through MOB-09.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'mobile', 'advanced'
  )
  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
