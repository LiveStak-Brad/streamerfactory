-- Seed all Professional Creator Mastery lessons (PC-01–PC-10).

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Professional Creator Mastery lesson seeds: no auth.users row.';
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
    'Positioning for Money (Without Selling Your Soul)',
    'positioning-for-money-without-selling-your-soul',
    'Clarify who you serve, what you uniquely provide on LIVE, and what you will never do for cash.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'professional', 'advanced'
  ),
  (
    'Offer Design for LIVE Creators',
    'offer-design-for-live-creators',
    'Design one primary LIVE offer and one secondary offer that fit your show without pressure tactics.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'professional', 'advanced'
  ),
  (
    'Income Systems and Money Operations',
    'income-systems-and-money-operations',
    'Install a simple 90-day income ops system: tracking, buffers, and tax-aware recordkeeping habits.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'professional', 'advanced'
  ),
  (
    'Reading Business Health Beyond Gift Totals',
    'reading-business-health-beyond-gift-totals',
    'Build a 30-day business health snapshot beyond gift spikes — concentration risk and sustainability.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'professional', 'advanced'
  ),
  (
    'Copyright and IP Awareness for Creators',
    'copyright-and-ip-awareness-for-creators',
    'Audit LIVE IP risks and apply safer defaults for music, clips, images, and catchphrases.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'professional', 'intermediate'
  ),
  (
    'Brand Deals and Partner Communication (Creator Side)',
    'brand-deals-and-partner-communication',
    'Evaluate brand inquiries, respond professionally, and protect audience trust — creator side only.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'professional', 'advanced'
  ),
  (
    'Privacy, Security, and Reputation as Business Assets',
    'privacy-security-and-reputation-as-business-assets',
    'Treat privacy, security, and reputation as business assets with a personal incident response checklist.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'professional', 'advanced'
  ),
  (
    'Contracts Literacy for Creators (Basics)',
    'contracts-literacy-for-creators',
    'Spot exclusivity, rights, payment, and cancellation red flags — literacy, not legal advice.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'professional', 'advanced'
  ),
  (
    'Time, Capacity, and Saying No',
    'time-capacity-and-saying-no',
    'Set a capacity policy for LIVEs, collabs, and side work — protect quality with professional nos.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'professional', 'intermediate'
  ),
  (
    'Professional Creator Capstone: Creator Operating Manual',
    'professional-creator-capstone-creator-operating-manual',
    'Assemble your Creator Operating Manual — positioning, offers, ops, rights, capacity, and 90-day plan.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'professional', 'advanced'
  )
  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
