-- Seed all Production Mastery lessons (PD-01–PD-10).

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Production Mastery lesson seeds: no auth.users row.';
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
    'Production Decisions Before Gear Purchases',
    'production-decisions-before-gear-purchases',
    'Audit your setup and choose the highest-ROI next upgrade — or none — before spending on gear.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'production', 'intermediate'
  ),
  (
    'Lighting Systems That Make You Look Intentional',
    'lighting-systems-that-make-you-look-intentional',
    'Build a repeatable key/fill/background lighting setup for your primary LIVE location.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'production', 'intermediate'
  ),
  (
    'Camera Framing and Visual Hierarchy',
    'camera-framing-and-visual-hierarchy',
    'Lock consistent headroom, eye line, and clutter control so your frame looks intentional every session.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'production', 'intermediate'
  ),
  (
    'Audio First: Clean Sound Wins Trust',
    'audio-first-clean-sound-wins-trust',
    'Reach a clean-audio standard with mic placement, room-noise control, and a pre-LIVE pass/fail check.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'production', 'intermediate'
  ),
  (
    'Room Design and Background as Brand',
    'room-design-and-background-as-brand',
    'Redesign your LIVE background for brand clarity, low distraction, and policy-safe visibility.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'production', 'intermediate'
  ),
  (
    'OBS and Scene Discipline (Without Overbuilding)',
    'obs-and-scene-discipline-without-overbuilding',
    'Build a three-scene OBS (or equivalent) system with transitions and a stress-ready backup plan.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'production', 'advanced'
  ),
  (
    'Mobile-First Production Excellence',
    'mobile-first-production-excellence',
    'Run long mobile LIVEs with stands, power, heat, and connectivity habits that prevent tech failure.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'production', 'intermediate'
  ),
  (
    'Accessibility Basics for LIVE Viewers',
    'accessibility-basics-for-live-viewers',
    'Apply five accessibility upgrades — speech clarity, readable text, contrast, and inclusive hosting.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'production', 'intermediate'
  ),
  (
    'Troubleshooting Under Pressure',
    'troubleshooting-under-pressure',
    'Use a triage tree (audio, video, network, app, power) to recover failures fast without panic.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'production', 'advanced'
  ),
  (
    'Production Capstone: Your Signature Look',
    'production-capstone-your-signature-look',
    'Document and demo a signature production look you can recreate in 10 minutes — your production bible.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'production', 'advanced'
  )
  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
