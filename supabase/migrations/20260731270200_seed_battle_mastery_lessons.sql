-- Seed all Battle Mastery lessons (BT-01–BT-08).

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Battle Mastery lesson seeds: no auth.users row.';
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
    'Battle Strategy Beyond Basics',
    'battle-strategy-beyond-basics',
    'Choose battles strategically with a matchup scorecard — including when to refuse an invite.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'battle', 'advanced'
  ),
  (
    'Energy Architecture for Timed Battles',
    'energy-architecture-for-timed-battles',
    'Design openings, mid-fight resets, and final-minute craft without sounding desperate.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'battle', 'advanced'
  ),
  (
    'Partner Ecosystems and Reputation',
    'partner-ecosystems-and-reputation',
    'Build a partner roster with fairness norms and long-term reputation — one partner is luck; a roster is a system.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'battle', 'advanced'
  ),
  (
    'Clutch Hosting and Crowd Turning',
    'clutch-hosting-and-crowd-turning',
    'Train ethical clutch hosting and crowd-turning language — composure and clarity, never guilt or pressure.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'battle', 'advanced'
  ),
  (
    'Battle Production and On-Screen Clarity',
    'battle-production-and-on-screen-clarity',
    'Align overlays, sound, and camera so viewers can follow the fight with a production clarity checklist.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'battle', 'intermediate'
  ),
  (
    'Battle Analytics and Debrief Mastery',
    'battle-analytics-and-debrief-mastery',
    'Debrief like an athlete — what worked, what failed, and what to test next — then change behavior.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'battle', 'advanced'
  ),
  (
    'Multi-Battle Nights and Event Pacing',
    'multi-battle-nights-and-event-pacing',
    'Plan multi-battle nights with recovery blocks and story continuity so energy and brand survive the stack.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'battle', 'advanced'
  ),
  (
    'Battle Capstone: Signature Battle System',
    'battle-capstone-signature-battle-system',
    'Document and run your signature battle system for one week — playbook plus objectively reviewable results.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'battle', 'advanced'
  )
  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
