-- Seed all Growth Mastery lessons (GR-01–GR-12).

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Growth Mastery lesson seeds: no auth.users row.';
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
    'The Growth Diagnosis Framework',
    'growth-diagnosis-framework',
    'Stop guessing why growth stalled. Diagnose your real bottleneck with evidence before changing tactics.',
    $g$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'intermediate'
  ),
  (
    'Retention Science Beyond the Basics',
    'retention-science-beyond-the-basics',
    'Cut mid-LIVE drop-off with one structural change proven across two sessions.',
    $g$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'advanced'
  ),
  (
    'Analytics Deep Dive for LIVE Creators',
    'analytics-deep-dive-for-live-creators',
    'Build a monthly analytics review that produces three decisions max.',
    $g$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'advanced'
  ),
  (
    'Experiment Design for Creators',
    'experiment-design-for-creators',
    'Run one clean A/B-style LIVE experiment with kill criteria and sample-size humility.',
    $g$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'advanced'
  ),
  (
    'Scheduling as Strategy',
    'scheduling-as-strategy',
    'Choose and test a schedule strategy for two weeks with retention and attendance notes.',
    $g$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'intermediate'
  ),
  (
    'Discovery Inventory: Never Miss a Publish Window',
    'discovery-inventory-never-miss-a-publish-window',
    'Install a four-week discovery inventory that feeds clips, promos, and experiment slots.',
    $g$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'intermediate'
  ),
  (
    'Algorithm-Durable Growth (No Myth Chasing)',
    'algorithm-durable-growth',
    'Replace myth-based tactics with durable discovery principles that survive platform changes.',
    $g$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'advanced'
  ),
  (
    'Clips, Discovery, and LIVE Without Splitting Focus',
    'clips-discovery-and-live',
    'Create a weekly clip workflow that drives return to LIVE without destroying focus.',
    $g$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'intermediate'
  ),
  (
    'AI for LIVE Creators (Assist, Don''t Replace)',
    'ai-for-live-creators',
    'Build an AI-assisted prep workflow that still sounds like you on camera.',
    $g$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'intermediate'
  ),
  (
    'Collaboration Growth Without Begging',
    'collaboration-growth-without-begging',
    'Execute one professional collab outreach and retention plan without begging energy.',
    $g$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'intermediate'
  ),
  (
    'From Spike to Stable Growth',
    'from-spike-to-stable-growth',
    'Install a spike-capture playbook with welcome rituals, return offers, and post-spike pacing.',
    $g$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'advanced'
  ),
  (
    'Growth Capstone: 30-Day Growth Experiment',
    'growth-capstone-30-day-growth-experiment',
    'Capstone: run a documented 30-day growth experiment with diagnosis, one clean test, and results narrative.',
    $g$## Introduction

Complete the full StreamerU lesson body, assemble your Capstone dossier, pass the quiz, and run the Capstone Kickoff LIVE Mission.
$g$,
    null, cat_id, seed_author, 'published', false, now(), 'growth', 'advanced'
  )
  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    content = excluded.content,
    category_id = coalesce(excluded.category_id, public.resource_posts.category_id),
    status = 'published',
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at),
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    updated_at = now();
end $$;
