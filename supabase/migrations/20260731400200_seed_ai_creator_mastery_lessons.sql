-- Seed all AI Creator Mastery lessons (AIC-01–AIC-10).

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_id uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;
  if seed_author is null then
    raise notice 'Skipping AI Creator Mastery lesson seeds: no auth.users row.';
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
    'Thinking Like an AI-Powered Creator',
    'thinking-like-an-ai-powered-creator',
    'Use AI as a professional assistant that increases quality and consistency — never as a substitute for your judgment or voice.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'aicreator', 'advanced'
  ),
  (
    'Prompt Engineering for Creators',
    'prompt-engineering-for-creators',
    'Write prompts with context, role, examples, constraints, and verification — not magic phrases.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'aicreator', 'advanced'
  ),
  (
    'AI Content Planning and Brainstorming',
    'ai-content-planning-and-brainstorming',
    'Plan LIVE ideas, hooks, and weekly systems with AI while you keep the creative decisions.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'aicreator', 'advanced'
  ),
  (
    'AI Writing Without Losing Your Voice',
    'ai-writing-without-losing-your-voice',
    'Draft faster with AI, then rewrite until the words sound like you and stay factually true.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'aicreator', 'advanced'
  ),
  (
    'AI Images, Graphics, and Branding',
    'ai-images-graphics-and-branding',
    'Generate and edit visuals with clear prompts, brand rules, copyright awareness, and accessibility.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'aicreator', 'advanced'
  ),
  (
    'AI Video, Editing, and Repurposing',
    'ai-video-editing-and-repurposing',
    'Use AI for captions, clips, cleanup, and highlights — with human review before publish.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'aicreator', 'advanced'
  ),
  (
    'AI Automation for Creator Workflows',
    'ai-automation-for-creator-workflows',
    'Automate repetitive steps with human gates — never spam, deception, or unattended brand risk.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'aicreator', 'advanced'
  ),
  (
    'AI Research, Analytics, and Decision Making',
    'ai-research-analytics-and-decision-making',
    'Research and interpret metrics with verification checklists so decisions stay evidence-based.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'aicreator', 'advanced'
  ),
  (
    'Ethics, Privacy, and Responsible AI',
    'ethics-privacy-and-responsible-ai',
    'Protect privacy, disclose responsibly, refuse harmful uses, and publish only what you can stand behind.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'aicreator', 'advanced'
  ),
  (
    'AI Creator Capstone: Operating System',
    'ai-creator-capstone-operating-system',
    'Assemble your AI Creator Operating System: prompt library, workflows, verification, automation map, and improvement report.',
    $c$## Introduction

Complete the full StreamerU lesson body, pass the quiz, and run the LIVE Mission. Expanded curriculum overrides this stub when registered in code.
$c$,
    null, cat_id, seed_author, 'published', false, now(), 'aicreator', 'advanced'
  )

  on conflict (slug) do update set
    title = excluded.title,
    excerpt = excluded.excerpt,
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    status = excluded.status,
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at);
end $$;
