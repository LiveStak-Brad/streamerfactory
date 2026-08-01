-- Seed all Selling & Influence Mastery lessons (SI-01–SI-10).
do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Selling & Influence Mastery lesson seeds: no auth.users row.';
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
    'Trust Is Your Greatest Asset', 'trust-is-your-greatest-asset',
    'Trust-first selling for creators through clear value, informed choice, ethical proof, and durable relationships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'selling', 'advanced'
  ),
  (
    'Understanding Why People Buy', 'understanding-why-people-buy',
    'Trust-first selling for creators through clear value, informed choice, ethical proof, and durable relationships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'selling', 'advanced'
  ),
  (
    'Communicating Value Clearly', 'communicating-value-clearly',
    'Trust-first selling for creators through clear value, informed choice, ethical proof, and durable relationships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'selling', 'advanced'
  ),
  (
    'Storytelling That Builds Trust', 'storytelling-that-builds-trust',
    'Trust-first selling for creators through clear value, informed choice, ethical proof, and durable relationships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'selling', 'advanced'
  ),
  (
    'Handling Questions and Objections', 'handling-questions-and-objections',
    'Trust-first selling for creators through clear value, informed choice, ethical proof, and durable relationships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'selling', 'advanced'
  ),
  (
    'Calls to Action That Feel Natural', 'calls-to-action-that-feel-natural',
    'Trust-first selling for creators through clear value, informed choice, ethical proof, and durable relationships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'selling', 'advanced'
  ),
  (
    'Selling Without Damaging Community', 'selling-without-damaging-community',
    'Trust-first selling for creators through clear value, informed choice, ethical proof, and durable relationships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'selling', 'advanced'
  ),
  (
    'Long-Term Customer Relationships', 'long-term-customer-relationships',
    'Trust-first selling for creators through clear value, informed choice, ethical proof, and durable relationships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'selling', 'advanced'
  ),
  (
    'Ethical Influence & Reputation', 'ethical-influence-and-reputation',
    'Trust-first selling for creators through clear value, informed choice, ethical proof, and durable relationships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'selling', 'advanced'
  ),
  (
    'Selling & Influence Capstone: Ethical Creator Offer', 'selling-influence-capstone-ethical-offer',
    'Trust-first selling for creators through clear value, informed choice, ethical proof, and durable relationships.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$, null, cat_id, seed_author, 'published', false, now(), 'selling', 'advanced'
  )
  on conflict (slug) do update set
    title = excluded.title, excerpt = excluded.excerpt, training_track = excluded.training_track,
    difficulty = excluded.difficulty, status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
