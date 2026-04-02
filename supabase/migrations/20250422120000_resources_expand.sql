-- Expand Resources: battles category, new guides, publish draft growth article.

-- ---------------------------------------------------------------------------
-- Category: battles & collaboration
-- ---------------------------------------------------------------------------

insert into
  public.resource_categories (name, slug, description)
values
  (
    'Battles & collaboration',
    'battles-collaboration',
    'Finding partners, structuring battle weeks, and promoting collabs without burning out your audience.'
  )
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Update category descriptions (clearer knowledge areas)
-- ---------------------------------------------------------------------------

update public.resource_categories
set
  description = 'Audio, lighting, pacing, and the fundamentals that keep LIVE streams stable and professional.'
where
  slug = 'tiktok-live-basics';

update public.resource_categories
set
  description = 'Gifts, goals, pacing income with your energy — building sustainable revenue on LIVE.'
where
  slug = 'monetization';

update public.resource_categories
set
  description = 'Community guidelines, moderation habits, and staying compliant while you grow.'
where
  slug = 'platform-rules-safety';

update public.resource_categories
set
  description = 'Hooks, segments, and pacing — including how you promote battles and highlights.'
where
  slug = 'content-strategy';

update public.resource_categories
set
  description = 'Consistency, audience habits, and what partnership with an agency can look like.'
where
  slug = 'creator-growth';

-- ---------------------------------------------------------------------------
-- Seed posts + publish previously draft growth article
-- ---------------------------------------------------------------------------

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_basics uuid;
  cat_battles uuid;
  cat_rules uuid;
  cat_content uuid;
  cat_growth uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;

  if seed_author is null then
    raise notice 'Skipping resource_posts expand: no auth.users row.';
    return;
  end if;

  select id into cat_basics from public.resource_categories where slug = 'tiktok-live-basics';
  select id into cat_battles from public.resource_categories where slug = 'battles-collaboration';
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
      'How to start strong on TikTok LIVE',
      'start-strong-on-tiktok-live',
      'Before you optimize anything else: clarity, sound, and a repeatable first minute viewers can trust.',
      $p1$
Your first minutes on LIVE set the tone. Viewers decide fast whether to stay — so start with a simple promise: what the stream is about and what they can expect if they stick around.

Get audio right before anything flashy. A clear voice beats a perfect ring light. Test your mic at the volume you will actually use when you are excited.

Pick one start time you can keep weekly. Consistency trains return viewers more than a single long session. After each LIVE, write one line about what to tweak next — small improvements compound.
$p1$,
      null,
      cat_basics,
      seed_author,
      'published',
      false,
      now () - interval '8 hours'
    ),
    (
      'How to structure your first battle week',
      'structure-your-first-battle-week',
      'A simple week-shaped plan: line up partners, lock times, and give viewers a reason to show up.',
      $p2$
Battles work when everyone agrees on format, time zone, and what “win” means for the show. Start by picking two or three slots you can defend — not every night, just windows you can promote honestly.

Line up partners early. Confirm handles, rough length, and whether you are doing team or solo formats. Put the time in your title or pinned comment so late viewers are not confused.

Promote with clarity: one post per day that says when, who, and why it is worth watching — not spam, just signal. After the battle, thank participants and clip one moment people can share. That loop makes the next battle easier to fill.
$p2$,
      null,
      cat_battles,
      seed_author,
      'published',
      false,
      now () - interval '7 hours'
    ),
    (
      'Common LIVE mistakes new creators make',
      'common-live-mistakes-new-creators',
      'Avoiding vague streams, chat neglect, and burnout patterns that quietly cap growth.',
      $p3$
The most common mistake is starting without a plan for the first five minutes — viewers bounce when the stream feels aimless. Write a loose outline: intro, two segments, and a closing ritual.

Another trap is ignoring chat until it is overwhelming. You do not have to read every message — acknowledge the room, pick prompts that match your energy, and use moderators when you can.

Finally, grinding every day without recovery burns out your voice and your ideas. Protect sleep and hydration like they are part of the job — because they are.
$p3$,
      null,
      cat_growth,
      seed_author,
      'published',
      false,
      now () - interval '6 hours'
    ),
    (
      'What to expect when you apply to Streamer Factory',
      'what-to-expect-when-you-apply',
      'How applications, review, and onboarding fit together — so nothing feels like a black box.',
      $p4$
Applying means telling us about your LIVE presence and goals with the email tied to your account. You will see status updates in the app — submitted, in review, or a decision — so you are not guessing.

Review is human: we look for fit, readiness, and alignment with how the network operates. We may email with follow-up questions — reply from the same address you used to sign up.

If you are approved, your account moves to member and you complete a short onboarding checklist: profile, resources, battles, and calendar — then Battle Hub and the rest of the tools unlock in one place.
$p4$,
      null,
      cat_growth,
      seed_author,
      'published',
      false,
      now () - interval '5 hours'
    ),
    (
      'Promote your battles without spamming your audience',
      'promote-your-battles-without-spamming',
      'Signal over noise: reminders, clarity, and one strong reason to tune in.',
      $p5$
Promotion is not about posting the same graphic ten times — it is about giving people a clear when/where/why. One reminder the day before and one an hour out is usually enough if your schedule is consistent.

Lead with the match-up or theme, not only “going live.” Viewers share battles when the story is easy to repeat: who, what format, and what makes it fun to watch.

After the battle, one recap clip or thank-you post closes the loop and trains your audience to trust your next announcement.
$p5$,
      null,
      cat_content,
      seed_author,
      'published',
      false,
      now () - interval '4 hours'
    )
  on conflict (slug) do nothing;

  update public.resource_posts
  set
    status = 'published',
    published_at = coalesce(published_at, now ()),
    updated_at = now ()
  where
    slug = 'growth-weekly-system'
    and status = 'draft';
end $$;
