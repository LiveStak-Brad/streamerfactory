-- Training tracks + optional difficulty + structured lesson fields (JSONB).
-- Note: CONSTRAINT must use CHECK (...), not CONSTRAINT name ( ... ).

alter table public.resource_posts
add column if not exists training_track text not null default 'beginner'
  constraint resource_posts_training_track_check check (
    training_track = any (
      array[
        'beginner'::text,
        'battles'::text,
        'monetization'::text,
        'rules'::text,
        'content'::text
      ]
    )
  );

alter table public.resource_posts
add column if not exists difficulty text
  constraint resource_posts_difficulty_check check (
    difficulty is null
    or difficulty = any (
      array[
        'beginner'::text,
        'intermediate'::text,
        'advanced'::text
      ]
    )
  );

alter table public.resource_posts
add column if not exists training_sections jsonb;

comment on column public.resource_posts.training_track is
  'Program track: beginner, battles, monetization, rules, content.';

comment on column public.resource_posts.difficulty is
  'Optional lesson difficulty: beginner, intermediate, advanced.';

comment on column public.resource_posts.training_sections is
  'Optional structured fields: what_youll_learn, why_it_matters, core_strategy, step_by_step, common_mistakes, action_checklist (plain text).';

create index if not exists resource_posts_training_track_idx on public.resource_posts (training_track);

-- Backfill tracks from legacy category slugs
update public.resource_posts p
set
  training_track = case
    when c.slug = 'tiktok-live-basics' then 'beginner'::text
    when c.slug = 'battles-collaboration' then 'battles'::text
    when c.slug in ('monetization', 'creator-growth') then 'monetization'::text
    when c.slug = 'platform-rules-safety' then 'rules'::text
    when c.slug = 'content-strategy' then 'content'::text
    else 'beginner'::text
  end
from
  public.resource_categories c
where
  p.category_id = c.id;
