-- Resources CMS: categories, posts, RLS, seed.
-- Run after profiles migration. Requires at least one auth user for seed author FK
-- (default: owner id 807214dc-f74a-421a-ae44-d1500b959988).

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.resource_categories (
  id uuid primary key default gen_random_uuid (),
  name text not null,
  slug text not null,
  description text,
  created_at timestamptz not null default now (),
  constraint resource_categories_slug_unique unique (slug),
  constraint resource_categories_slug_format check (
    slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  )
);

create index if not exists resource_categories_slug_idx on public.resource_categories (slug);

create table if not exists public.resource_posts (
  id uuid primary key default gen_random_uuid (),
  title text not null,
  slug text not null,
  excerpt text,
  content text not null default '',
  cover_image_url text,
  category_id uuid references public.resource_categories (id) on delete set null,
  author_id uuid not null references auth.users (id) on delete restrict,
  status text not null default 'draft' check (status in ('draft', 'published')),
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  constraint resource_posts_slug_unique unique (slug),
  constraint resource_posts_slug_format check (
    slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  )
);

create index if not exists resource_posts_status_published_idx on public.resource_posts (status, published_at desc);

create index if not exists resource_posts_category_idx on public.resource_posts (category_id);

create index if not exists resource_posts_featured_idx on public.resource_posts (featured)
where
  featured = true;

create index if not exists resource_posts_slug_idx on public.resource_posts (slug);

-- Keep updated_at fresh
create or replace function public.set_resource_posts_updated_at ()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now ();
  return new;
end;
$$;

drop trigger if exists resource_posts_set_updated_at on public.resource_posts;

create trigger resource_posts_set_updated_at
before update on public.resource_posts
for each row
execute function public.set_resource_posts_updated_at ();

-- When publishing without a date, set published_at once
create or replace function public.resource_posts_set_published_at ()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'published' and new.published_at is null then
    new.published_at := now ();
  end if;
  return new;
end;
$$;

drop trigger if exists resource_posts_set_published_at on public.resource_posts;

create trigger resource_posts_set_published_at
before insert
or update on public.resource_posts
for each row
execute function public.resource_posts_set_published_at ();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.resource_categories enable row level security;

alter table public.resource_posts enable row level security;

-- Categories: readable by anyone; mutate only owner
drop policy if exists "resource_categories_select_public" on public.resource_categories;

create policy "resource_categories_select_public" on public.resource_categories for
select
  using (true);

drop policy if exists "resource_categories_insert_owner" on public.resource_categories;

create policy "resource_categories_insert_owner" on public.resource_categories for insert to authenticated
with
  check (public.is_owner ());

drop policy if exists "resource_categories_update_owner" on public.resource_categories;

create policy "resource_categories_update_owner" on public.resource_categories for
update to authenticated using (public.is_owner ())
with
  check (public.is_owner ());

drop policy if exists "resource_categories_delete_owner" on public.resource_categories;

create policy "resource_categories_delete_owner" on public.resource_categories for delete to authenticated using (public.is_owner ());

-- Posts: public reads published; owner reads/writes all
drop policy if exists "resource_posts_select_published" on public.resource_posts;

create policy "resource_posts_select_published" on public.resource_posts for
select
  using (
    status = 'published'
    and published_at is not null
  );

drop policy if exists "resource_posts_select_owner" on public.resource_posts;

create policy "resource_posts_select_owner" on public.resource_posts for
select
  to authenticated using (public.is_owner ());

drop policy if exists "resource_posts_insert_owner" on public.resource_posts;

create policy "resource_posts_insert_owner" on public.resource_posts for insert to authenticated
with
  check (public.is_owner ());

drop policy if exists "resource_posts_update_owner" on public.resource_posts;

create policy "resource_posts_update_owner" on public.resource_posts for
update to authenticated using (public.is_owner ())
with
  check (public.is_owner ());

drop policy if exists "resource_posts_delete_owner" on public.resource_posts;

create policy "resource_posts_delete_owner" on public.resource_posts for delete to authenticated using (public.is_owner ());

-- ---------------------------------------------------------------------------
-- Seed (categories + posts). Uses owner UUID when present in auth.users.
-- ---------------------------------------------------------------------------

insert into
  public.resource_categories (name, slug, description)
values
  (
    'TikTok LIVE basics',
    'tiktok-live-basics',
    'Going live, overlays, and the fundamentals that keep streams stable and professional.'
  ),
  (
    'Monetization',
    'monetization',
    'Gifts, goals, and building sustainable income on TikTok LIVE.'
  ),
  (
    'Platform rules & safety',
    'platform-rules-safety',
    'Community guidelines, strikes, and staying compliant while you grow.'
  ),
  (
    'Content strategy',
    'content-strategy',
    'Hooks, formats, and pacing that help viewers stay and return.'
  ),
  (
    'Creator growth',
    'creator-growth',
    'Audience building, consistency, and leveling up as a LIVE creator.'
  )
on conflict (slug) do nothing;

-- Resolve author: prefer designated owner id if that user exists
do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_basics uuid;
  cat_mon uuid;
  cat_rules uuid;
  cat_content uuid;
  cat_growth uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;

  if seed_author is null then
    raise notice 'Skipping resource_posts seed: no auth.users row.';
    return;
  end if;

  select id into cat_basics from public.resource_categories where slug = 'tiktok-live-basics';
  select id into cat_mon from public.resource_categories where slug = 'monetization';
  select id into cat_rules from public.resource_categories where slug = 'platform-rules-safety';
  select id into cat_content from public.resource_categories where slug = 'content-strategy';
  select id into cat_growth from public.resource_categories where slug = 'creator-growth';

  insert into
    public.resource_posts (
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      category_id,
      author_id,
      status,
      featured,
      published_at
    )
  values
    (
      'Your first 10 TikTok LIVE sessions: what to optimize',
      'first-10-tiktok-live-sessions',
      'A practical checklist for lighting, audio, pacing, and calls-to-action—so early streams feel intentional, not chaotic.',
      'Going live is the product. Before you chase trends, tighten the basics viewers feel immediately: can they hear you clearly, see your face without harsh shadows, and understand what the stream is about in the first 30 seconds?

Use your first ten sessions to test one improvement per stream: mic placement, framing, a simple intro script, a consistent start time, and one repeatable segment viewers can anticipate.

Small wins compound. Notes after each live tell you what to fix next—treat every session like a lightweight retrospective.',
      null,
      cat_basics,
      seed_author,
      'published',
      true,
      now () - interval '6 days'
    ),
    (
      'Gifts, goals, and momentum without burning out',
      'gifts-goals-momentum',
      'How to think about monetization as a system: energy management, clear goals, and audience trust.',
      'Monetization on LIVE works best when viewers understand what they are supporting and why it matters.

Set goals that are specific and kind to your capacity: time-based milestones, community challenges, or content themes—not endless grind sessions.

Pair income tactics with recovery: short breaks, hydration, and a sustainable weekly schedule. The creators who last optimize for longevity, not spikes.',
      null,
      cat_mon,
      seed_author,
      'published',
      false,
      now () - interval '4 days'
    ),
    (
      'Platform rules that trip up new LIVE creators (and how to avoid them)',
      'platform-rules-new-live-creators',
      'A straight-talk overview of common strike patterns and the habits that keep your account safe.',
      'Most issues come from unclear boundaries: music usage, minors on camera, misleading incentives, or chat behavior you do not moderate consistently.

When in doubt, default to TikTok''s community guidelines and LIVE policies—and document your own house rules so moderators can enforce them calmly.

If you receive a warning, pause, read the reason, and adjust your workflow. Proactive fixes protect your audience and your ability to earn.',
      null,
      cat_rules,
      seed_author,
      'published',
      false,
      now () - interval '2 days'
    ),
    (
      'Content loops: a simple framework for repeatable LIVE segments',
      'content-loops-repeatable-segments',
      'Build a rhythm viewers recognize: hook, value, interaction, callback.',
      'Strong LIVE content is less about random talent and more about repeatable structure.

Try a four-part loop: hook (why stay), value (what they learn or feel), interaction (chat prompts that fit your community), callback (tease the next segment).

Write three segment ideas you can rotate weekly. Consistency trains return viewers—and makes editing highlights far easier.',
      null,
      cat_content,
      seed_author,
      'published',
      false,
      now () - interval '1 day'
    ),
    (
      'Growth is a weekly system, not a single viral moment',
      'growth-weekly-system',
      'How Streamer Factory thinks about compounding growth for TikTok LIVE creators.',
      'Virality is optional. Growth is operational: publish a schedule, improve one skill weekly, and measure what matters—retention cues, returning viewers, and meaningful engagement.

Use short clips to bring new eyes to your LIVE schedule. Use community rituals to bring people back.

If you want structured support—coaching, accountability, and agency partnership—that is what we build at Streamer Factory.',
      null,
      cat_growth,
      seed_author,
      'draft',
      false,
      null
    )
  on conflict (slug) do nothing;
end $$;
