-- Seed all Community Mastery lessons (CM-01–CM-10).

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Community Mastery lesson seeds: no auth.users row.';
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
    'Community Design: Belonging on Purpose',
    'community-design-belonging-on-purpose',
    'Design rituals, roles, and insider language so people feel they belong — not just that you were nice.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'community', 'intermediate'
  ),
  (
    'Chat Culture and Return Viewer Habits',
    'chat-culture-and-return-viewer-habits',
    'Teach chat by what you reward. Install greetings, callbacks, and member moments that bring people back.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'community', 'intermediate'
  ),
  (
    'Moderation Systems That Scale',
    'moderation-systems-that-scale',
    'Launch a moderator system with roles, rules, and an escalation path so culture scales without chaos.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'community', 'intermediate'
  ),
  (
    'Conflict, Trolls, and Boundary Enforcement',
    'conflict-trolls-and-boundary-enforcement',
    'Apply a calm conflict decision tree — ignore, redirect, or remove — without becoming the drama.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'community', 'advanced'
  ),
  (
    'Protecting Community Health (and Yourself)',
    'protecting-community-health-and-yourself',
    'Write community health boundaries that protect creator and audience from parasocial burn and oversharing risk.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'community', 'advanced'
  ),
  (
    'Accessibility and Inclusion in Community Spaces',
    'accessibility-and-inclusion-in-community-spaces',
    'Upgrade welcome and inclusion practices so newcomers feel they belong fast — without gear shopping.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'community', 'intermediate'
  ),
  (
    'Guest Hosting That Elevates Both Audiences',
    'guest-hosting-that-elevates-both-audiences',
    'Host a guest LIVE with agenda, roles, promo exchange, and exit ramps that elevate both rooms.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'community', 'advanced'
  ),
  (
    'Interviewing Skills for Creators',
    'interviewing-skills-for-creators',
    'Run a structured interview segment with question craft, listening, redirects, and highlight moments.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'community', 'advanced'
  ),
  (
    'Professional Networking for Creators',
    'professional-networking-for-creators',
    'Build a 30-day networking plan with five meaningful touches — give first, follow up, leave a good reputation.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'community', 'intermediate'
  ),
  (
    'Community Capstone: Community Appreciation Event',
    'community-capstone-community-appreciation-event',
    'Capstone: host a community appreciation event with rituals, roles, promo, hosting, and after-action review.',
    $c$## Introduction

Complete the full StreamerU lesson body, assemble your Capstone evidence pack, pass the quiz, and host the appreciation event LIVE Mission.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'community', 'advanced'
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
