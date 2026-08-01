-- Seed all Creator Wellness & Longevity Mastery lessons (CWL-01–CWL-10).
do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Creator Wellness lesson seeds: no auth.users row.';
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
    'Building a Career That Lasts', 'building-a-career-that-lasts',
    'Define a decade-minded creator career built on consistency, recovery, and sustainable ambition.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'wellness', 'intermediate'
  ),
  (
    'Preventing Creator Burnout', 'preventing-creator-burnout',
    'Detect burnout early, reduce load on purpose, and run a recovery week before quitting feels inevitable.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'wellness', 'intermediate'
  ),
  (
    'Physical Health for Long Streaming Sessions', 'physical-health-for-long-streaming-sessions',
    'Build an ergonomic setup, voice care routine, movement breaks, and hydration habits for long LIVE days.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'wellness', 'intermediate'
  ),
  (
    'Mental Resilience & Handling Online Pressure', 'mental-resilience-and-handling-online-pressure',
    'Install criticism triage, comparison rules, and post-LIVE emotional hygiene without turning into a therapist.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'wellness', 'intermediate'
  ),
  (
    'Time Management & Sustainable Schedules', 'time-management-and-sustainable-schedules',
    'Build an energy-based week with batching, recovery days, deep work, and protected sleep.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'wellness', 'intermediate'
  ),
  (
    'Financial Wellness for Variable Income', 'financial-wellness-for-variable-income',
    'Stabilize personal finances around variable creator income without turning this into business accounting class.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'wellness', 'advanced'
  ),
  (
    'Healthy Relationships & Personal Boundaries', 'healthy-relationships-and-personal-boundaries',
    'Write household agreements, parasocial boundaries, privacy rules, and expectations that protect real relationships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'wellness', 'advanced'
  ),
  (
    'Maintaining Creativity for Years', 'maintaining-creativity-for-years',
    'Protect creative capacity with recovery menus, input diets, format rotation, and anti-comparison practice.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'wellness', 'advanced'
  ),
  (
    'Recovering from Setbacks Without Quitting', 'recovering-from-setbacks-without-quitting',
    'Diagnose setbacks, stabilize for seventy-two hours, and run a staged comeback without panic quitting.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'wellness', 'advanced'
  ),
  (
    'Creator Wellness Capstone: Personal Longevity Plan', 'creator-wellness-capstone-personal-longevity-plan',
    'Assemble workspace, schedule, recovery, boundaries, buffers, and habits into one reviewable longevity plan.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'wellness', 'advanced'
  )
  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
