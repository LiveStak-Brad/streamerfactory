-- Seed all Gaming LIVE Mastery lessons (GM-01–GM-12).

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping Gaming LIVE Mastery lesson seeds: no auth.users row.';
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
    'Choosing Your Gaming LIVE Setup',
    'choosing-your-gaming-live-setup',
    'Choose TikTok LIVE Studio, OBS + stream key (when available), OBS Virtual Camera, console, or mobile paths with a written source-flow map — stream-key access never assumed.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  ),
  (
    'Gaming Commentary Systems That Survive High Focus',
    'gaming-commentary-systems-that-survive-high-focus',
    'Build commentary loops that work during concentration, downtime, and different game types — without constant yelling or jargon overload.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  ),
  (
    'Reading Chat Without Losing the Game',
    'reading-chat-without-losing-the-game',
    'Install a chat-reading plan with safe-moment timing so viewers feel included without wrecking your focus mid-fight.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  ),
  (
    'Game Audio, Mic Balance, and Discord Routing',
    'game-audio-mic-balance-and-discord-routing',
    'Balance mic, game, Discord/party chat, alerts, and soundboards without double audio, echo, or buried commentary.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  ),
  (
    'TikTok LIVE Studio for Gaming',
    'tiktok-live-studio-for-gaming',
    'Configure TikTok LIVE Studio for gaming capture, audio devices, vertical layout, and known limits versus OBS — no stream key required for LIVE Studio itself.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  ),
  (
    'OBS for Gaming and Stream-Key Reality',
    'obs-for-gaming-and-stream-key-reality',
    'Build OBS gaming scenes, test encoders, and document stream-key vs no-stream-key reality without assuming eligibility.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  ),
  (
    'OBS Virtual Camera into TikTok LIVE Studio',
    'obs-virtual-camera-into-tiktok-live-studio',
    'Send OBS program video into TikTok LIVE Studio via Virtual Camera, route audio separately, and recover when detection fails.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  ),
  (
    'Console Capture and Party-Chat Routing',
    'console-capture-and-party-chat-routing',
    'Map console → capture card → OBS or LIVE Studio with party-chat routing, latency awareness, and privacy discipline.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  ),
  (
    'Mobile Gaming LIVE Workflows',
    'mobile-gaming-live-workflows',
    'Run native or mirrored mobile gaming LIVE with heat, battery, orientation, and notification-safety checks.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  ),
  (
    'Vertical Layouts, Alerts, Soundboards, and TikFinity',
    'vertical-layouts-alerts-soundboards-and-tikfinity',
    'Design readable vertical layouts and add alerts, soundboards, and TikFinity triggers with cooldowns — never overload quality.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  ),
  (
    'Gaming Community, Moderation, Troubleshooting, and Growth',
    'gaming-community-moderation-troubleshooting-and-growth',
    'Install community games, moderation, troubleshooting trees, and ethical gaming growth — graded on systems, not rank or gifts.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  ),
  (
    'Gaming LIVE Capstone: Signature Gaming Show',
    'gaming-live-capstone-signature-show',
    'Deliver and review your signature Gaming LIVE show with a full technical and hosting dossier.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'gaming', 'intermediate'
  )

  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
