-- Seed all TikTok Shop Mastery lessons (TTS-01–TTS-10).
do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping TikTok Shop Mastery lesson seeds: no auth.users row.';
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
    'Understanding the TikTok Shop Ecosystem', 'understanding-the-tiktok-shop-ecosystem',
    'Map TikTok Shop roles and choose a creator path with clear boundaries.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'tts', 'advanced'
  ),
  (
    'Becoming a Trusted Shop Creator', 'becoming-a-trusted-shop-creator',
    'Prepare eligibility, onboarding readiness, and a trustworthy Shop creator profile.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'tts', 'advanced'
  ),
  (
    'Product Selection, Research & Affiliate Strategy', 'product-selection-research-and-affiliate-strategy',
    'Evaluate products, merchants, commissions, and samples without compromising trust.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'tts', 'advanced'
  ),
  (
    'Creating Product Videos People Actually Watch', 'creating-product-videos-people-actually-watch',
    'Plan shoppable product videos that educate, demonstrate, and stay honest.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'tts', 'advanced'
  ),
  (
    'LIVE Shopping That Educates and Converts', 'live-shopping-that-educates-and-converts',
    'Build LIVE shopping run sheets with education-first product sequencing and pin plans.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'tts', 'advanced'
  ),
  (
    'Professional Product Demonstrations & Studio Setup', 'professional-product-demonstrations-and-studio-setup',
    'Design readable product demos with practical lighting, angles, and small-space setups.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'tts', 'advanced'
  ),
  (
    'Analytics, Optimization & Campaign Decisions', 'shop-analytics-optimization-and-campaign-decisions',
    'Interpret Shop metrics to choose one clear improvement without obsessing over GMV.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'tts', 'advanced'
  ),
  (
    'Compliance, Ethics & Customer Trust', 'shop-compliance-ethics-and-customer-trust',
    'Apply disclosures, claim limits, and customer-trust standards for TikTok Shop content.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'tts', 'advanced'
  ),
  (
    'Scaling Your TikTok Shop Business', 'scaling-your-tiktok-shop-business',
    'Build seasonal campaigns, follow-up systems, and repeatable Shop operations.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'tts', 'advanced'
  ),
  (
    'TikTok Shop Capstone: Signature Shop Campaign', 'tiktok-shop-capstone-signature-shop-campaign',
    'Assemble a complete Signature Shop Campaign with reviewable Capstone evidence.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'tts', 'advanced'
  )
  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
