-- Seed all Music LIVE Mastery lessons (MU-01–MU-10).

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Music LIVE Mastery lesson seeds: no auth.users row.';
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
    'Music LIVE Formats That Work',
    'music-live-formats-that-work',
    'Choose concert, request, writing, karaoke, producer, and launch formats that match your voice and stamina — with a sample run-of-show.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'music', 'intermediate'
  ),
  (
    'Performance Audio for Musicians on LIVE',
    'performance-audio-for-musicians-on-live',
    'Map signal flow, gain stage cleanly, and route instruments through OBS or TikTok LIVE Studio without feedback, echo, or brand shopping panic.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'music', 'intermediate'
  ),
  (
    'Vocal Stamina and Performance Presence',
    'vocal-stamina-and-performance-presence',
    'Build warm-ups, set-length pacing, talk breaks, and recovery so a 60–90 minute Music LIVE protects your voice and presence.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'music', 'intermediate'
  ),
  (
    'Setlists, Segments, and Audience Energy',
    'setlists-segments-and-audience-energy',
    'Design two annotated setlists with intentional energy arcs, talk breaks, peaks, and request windows.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'music', 'intermediate'
  ),
  (
    'Requests, Tips, and Fan Interaction Systems',
    'requests-tips-and-fan-interaction-systems',
    'Install a fair request and tip system with an on-stream explanation script — fun without derailment or guilt.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'music', 'intermediate'
  ),
  (
    'Growing a Music Audience on LIVE',
    'growing-a-music-audience-on-live',
    'Design a four-week music growth plan using clip moments, series, collabs, and return-fan conversion — not discovery myths.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'music', 'advanced'
  ),
  (
    'Music Rights and Safer LIVE Choices',
    'music-rights-and-safer-live-choices',
    'Build repertoire risk tiers and safer defaults for originals, covers, and backing tracks — decision literacy, not legal advice.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'music', 'intermediate'
  ),
  (
    'Collab Performances and Guest Musicians',
    'collab-performances-and-guest-musicians',
    'Run a music collab LIVE with clear roles, guest audio logistics, promo, and a recovery plan when tech wobbles.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'music', 'advanced'
  ),
  (
    'Monetizing Music LIVE Ethically',
    'monetizing-music-live-ethically',
    'Design an ethical monetization layer — tips, goals, merch, and booking CTAs — without turning the concert into a hard sell.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'music', 'advanced'
  ),
  (
    'Music LIVE Capstone: Signature Show',
    'music-live-capstone-signature-show',
    'Deliver and review your signature Music LIVE show with a full technical and performance dossier.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'music', 'advanced'
  )
  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
