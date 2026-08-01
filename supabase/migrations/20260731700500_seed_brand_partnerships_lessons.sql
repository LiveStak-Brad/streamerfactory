-- Seed all Brand Partnerships Mastery lessons (BP-01–BP-10).
do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Brand Partnerships lesson seeds: no auth.users row.';
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
    'Understanding Brand Partnerships', 'understanding-brand-partnerships',
    'Map partnership types, brand safety, and readiness so you chase fit—not random sponsorships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'partnerships', 'intermediate'
  ),
  (
    'Building Your Professional Creator Profile', 'building-your-professional-creator-profile',
    'Write a brand-ready bio, audience overview, and portfolio selection brands can trust.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'partnerships', 'intermediate'
  ),
  (
    'Creating an Electronic Press Kit (EPK)', 'creating-an-electronic-press-kit',
    'Build a complete EPK with every field a brand team expects—bio, stats, demographics, samples, assets, and share link.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'partnerships', 'intermediate'
  ),
  (
    'Finding Brands That Fit Your Audience', 'finding-brands-that-fit-your-audience',
    'Score brand fit, research targets, and track sponsorship opportunities without spray-and-pray.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'partnerships', 'intermediate'
  ),
  (
    'Professional Outreach & Communication', 'professional-outreach-and-communication',
    'Write clear outreach, follow-up, and introductions that respect brand decision-makers.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'partnerships', 'intermediate'
  ),
  (
    'Negotiating Sponsorships Professionally', 'negotiating-sponsorships-professionally',
    'Scope deliverables, usage rights, exclusivity, and payment schedules with principles—not legal advice.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'partnerships', 'advanced'
  ),
  (
    'Delivering Outstanding Campaigns', 'delivering-outstanding-campaigns',
    'Plan, produce, disclose, and deliver campaign work brands can confidently rebook.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'partnerships', 'advanced'
  ),
  (
    'Reporting Results & Building Repeat Business', 'reporting-results-and-building-repeat-business',
    'Write honest wrap-up reports and renewal conversations that protect reputation.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'partnerships', 'advanced'
  ),
  (
    'Becoming a Long-Term Brand Partner', 'becoming-a-long-term-brand-partner',
    'Build reliability, brand safety, and relationship systems for multi-campaign partnerships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'partnerships', 'advanced'
  ),
  (
    'Brand Partnerships Capstone: Professional Portfolio', 'brand-partnerships-capstone-professional-portfolio',
    'Assemble a complete Professional Brand Partnership Portfolio with Streamer Factory EPK evidence.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'partnerships', 'advanced'
  )
  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
