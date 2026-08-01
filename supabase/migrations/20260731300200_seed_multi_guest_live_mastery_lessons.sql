-- Seed all Multi-Guest LIVE Mastery lessons (MG-01–MG-10).

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Multi-Guest LIVE Mastery lesson seeds: no auth.users row.';
    return;
  end if;
  select id into cat_id from public.resource_categories where slug = 'platform-rules-safety';
  if cat_id is null then
    select id into cat_id from public.resource_categories order by created_at asc limit 1;
  end if;

  insert into public.resource_posts (
    title, slug, excerpt, content, cover_image_url, category_id, author_id,
    status, featured, published_at, training_track, difficulty
  ) values
  (
    'Why Multi-Guest LIVE Changes Everything',
    'why-multi-guest-live-changes-everything',
    'Choose a guest format because it creates a better audience promise, not because more boxes look busier.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'multiguest', 'intermediate'
  ),
  (
    'Designing Great Conversations for Multi-Guest LIVE',
    'designing-great-conversations-for-multi-guest-live',
    'Build conversations with a purpose, question ladder, segment timing, and room for genuine listening.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'multiguest', 'intermediate'
  ),
  (
    'Becoming a Better Multi-Guest Host',
    'becoming-a-better-multi-guest-host',
    'Lead shared rooms with openings, speaking order, transitions, and calm recovery.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'multiguest', 'intermediate'
  ),
  (
    'Managing 2-, 4-, and 9-Box LIVEs',
    'managing-2-4-and-9-box-lives',
    'Select and operate compact, panel, and larger-grid rooms with readable roles and safe rotation.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'multiguest', 'intermediate'
  ),
  (
    'Guest Selection and Preparation',
    'guest-selection-and-preparation',
    'Invite guests for contribution and consent, then prepare them with clear briefs and technical checks.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'multiguest', 'intermediate'
  ),
  (
    'Multi-Guest Moderation and Community Safety',
    'multi-guest-moderation-and-community-safety',
    'Coordinate moderators, protect boundaries, and remove guests or trolls respectfully when necessary.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'multiguest', 'intermediate'
  ),
  (
    'Running Box Battles and Competitive Rooms',
    'running-box-battles-and-competitive-rooms',
    'Host ethical competitive rooms with fair rules, rotation, recovery, and a clear boundary with Battle Mastery.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'multiguest', 'intermediate'
  ),
  (
    'Interviewing Creators Like a Professional',
    'interviewing-creators-like-a-professional',
    'Prepare, listen, follow up, and end creator interviews with the professional standard developed in Community Mastery CM-08.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'multiguest', 'intermediate'
  ),
  (
    'Hosting Events, Panels, and Talent Shows',
    'hosting-events-panels-and-talent-shows',
    'Produce structured community events, panels, and talent showcases with roles, run sheets, and fair participation.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'multiguest', 'intermediate'
  ),
  (
    'Multi-Guest LIVE Capstone: Signature Event',
    'multi-guest-live-capstone-signature-event',
    'Produce, document, replay-review, and improve a complete Signature Multi-Guest LIVE Event.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'multiguest', 'intermediate'
  )

  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
