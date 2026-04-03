-- Seed / upsert curriculum lessons so StreamerU curriculum links resolve to published content.
-- Aligns with `src/lib/resources/curriculum.ts`. Requires at least one auth user for author_id.

do $$
declare
  seed_author uuid := '807214dc-f74a-421a-ae44-d1500b959988'::uuid;
  cat_basics uuid;
  cat_content uuid;
  cat_battles uuid;
  cat_mon uuid;
  cat_rules uuid;
begin
  if not exists (select 1 from auth.users where id = seed_author) then
    select id into seed_author from auth.users order by created_at asc limit 1;
  end if;

  if seed_author is null then
    raise notice 'Skipping curriculum lesson seed: no auth.users row.';
    return;
  end if;

  select id into cat_basics from public.resource_categories where slug = 'tiktok-live-basics';
  select id into cat_content from public.resource_categories where slug = 'content-strategy';
  select id into cat_battles from public.resource_categories where slug = 'battles-collaboration';
  select id into cat_mon from public.resource_categories where slug = 'monetization';
  select id into cat_rules from public.resource_categories where slug = 'platform-rules-safety';

  -- ---------------------------------------------------------------------------
  -- New lessons (16) + upsert on slug
  -- ---------------------------------------------------------------------------

  insert into public.resource_posts (
    title,
    slug,
    excerpt,
    content,
    cover_image_url,
    category_id,
    author_id,
    status,
    featured,
    published_at,
    training_track,
    difficulty
  )
  values
    (
      'Your first live structure',
      'your-first-live-structure',
      'A simple run-of-show so every LIVE has a beginning, middle, and end — not an endless ramble.',
      $bf1$
A structured LIVE is easier to stick with than “figure it out on camera.” Before you stream, sketch three blocks: open (who you are + what today is), middle (one main segment with a clear promise), and close (recap + next time).

Use a visible timer or segment labels so viewers know where they are. Even a handwritten sticky note off-camera is enough to stop you from freezing when chat goes quiet.

Aim for one repeatable segment you can run every week at the same time. Consistency trains return viewers more than novelty — and it makes your Execution mission measurable.

Finish reading, then complete the mission: one timed LIVE that follows your outline.
$bf1$,
      null,
      cat_basics,
      seed_author,
      'published',
      false,
      now () - interval '25 hours',
      'beginner',
      'beginner'
    ),
    (
      'First week of lives (consistency focus)',
      'first-week-of-lives-consistency',
      'Stack seven intentional sessions — not random tests — so your audience (and you) learn your schedule.',
      $bf2$
Consistency beats intensity early on. Pick windows you can defend for a full week: same days, similar start times, and a realistic length you will not bail on when energy dips.

Promote lightly but clearly: one pre-live post or story per day you go live. The goal is not viral reach — it is that your small audience learns when to show up.

After each session, write one line: what worked, one friction point, one tweak for tomorrow. Small notes compound faster than big “I will fix everything” promises.

By the end of this week you should feel a rhythm: setup, go live, short debrief. That rhythm is what scales toward longer daily volume later.
$bf2$,
      null,
      cat_basics,
      seed_author,
      'published',
      false,
      now () - interval '24 hours',
      'beginner',
      'beginner'
    ),
    (
      'Talking when no one is watching',
      'talking-with-empty-room',
      'How to keep energy and narration up when the room is quiet — the skill every LIVE creator needs.',
      $lm1$
Early LIVEs often feel like talking into a void. That is normal. The algorithm may still test you with cold traffic; viewers who join mid-stream need context in seconds.

Treat silence as a signal to narrate: what you are doing, what is next, why it matters. Think “sports commentator for your own stream” — not performing fake hype, but keeping the channel warm.

Plan three “fill” prompts you can use when chat is dead: a quick opinion, a mini story, or a simple question viewers can answer when they arrive later.

Your job in this lesson is to build stamina: stay audible, stay intentional, and avoid long dead air. Complete the mission LIVE before moving on.
$lm1$,
      null,
      cat_content,
      seed_author,
      'published',
      false,
      now () - interval '23 hours',
      'content',
      'intermediate'
    ),
    (
      'Hooks and first impressions',
      'hooks-and-first-impressions',
      'Win the first seconds and reset attention when the room turns over.',
      $lm2$
TikTok LIVE viewers decide fast. Open with a clear promise: topic, payoff, and why the next few minutes are worth staying for. Avoid vague “hey guys” openings that force viewers to guess.

Hooks are not only for minute zero. When new viewers arrive mid-stream, re-anchor: “If you just joined, here is what we are doing and what happens next.”

Rotate a few hook patterns so you do not sound scripted: question-led, story-led, or “today we are fixing X.” Test what fits your niche.

Pair this lesson with your Execution mission: practice hooks on a schedule, not when you remember.
$lm2$,
      null,
      cat_content,
      seed_author,
      'published',
      false,
      now () - interval '22 hours',
      'content',
      'intermediate'
    ),
    (
      'Structuring longer lives',
      'structuring-longer-lives',
      'Run-of-show design for 60–90+ minute blocks without losing the plot.',
      $lm3$
Longer LIVEs fail when they are one endless take. Break the stream into chapters: intro, themed blocks, short resets, and a planned finale. Viewers stay when they can predict the shape of the next segment.

Hydration and voice care are part of structure — not separate from content. Build micro-breaks that still keep the mic warm: “I am grabbing water — when I am back we start segment three.”

Use a simple document or whiteboard viewers can see if it fits your format. Visibility of the plan reduces your cognitive load and increases trust.

This stage is where daily volume starts to feel possible: longer blocks, fewer panic endings, clearer handoffs between segments.
$lm3$,
      null,
      cat_content,
      seed_author,
      'published',
      false,
      now () - interval '21 hours',
      'content',
      'intermediate'
    ),
    (
      'Understanding battles',
      'understanding-battles',
      'What LIVE battles are for, how they differ from casual duets, and how to read the room.',
      $bt1$
Battles on TikTok LIVE are competitive or collaborative real-time matchups — often PK-style — where energy, gifts, and momentum matter. Formats vary; what matters for you is clarity: rules, time window, and what “winning” means for the show.

Good battles are entertainment first. Viewers stay when the story is easy to follow: who is playing, what the stakes feel like, and why the next minute could flip.

Network battles add coordination: partners, promotion, and shared calendars. That is why agencies and teams standardize on tools instead of scattered DMs.

Study at least one battle before you run one: note pacing, callouts, and how creators thank gifters without shaming low spend. Then complete your observation + practice LIVE mission.
$bt1$,
      null,
      cat_battles,
      seed_author,
      'published',
      false,
      now () - interval '20 hours',
      'battles',
      'intermediate'
    ),
    (
      'Preparing for your first battle',
      'preparing-for-your-first-battle',
      'Partners, times, promotion, and a checklist so battle day feels organized — not improvised.',
      $bt2$
Pick a partner who will show up on time and communicate in one thread. Agree on length, rough format, and time zones. Put the battle time where viewers expect it: title, pinned comment, or a short promo post.

Promotion should be signal, not spam: one clear “when / who / why watch” message beats ten identical graphics.

If you are in Streamer Factory, use Battle Hub so the network sees the same schedule. If you are solo, still write the plan down — ambiguity kills attendance.

Finish your promotion dry-run LIVE in Execution before you schedule the real battle.
$bt2$,
      null,
      cat_battles,
      seed_author,
      'published',
      false,
      now () - interval '19 hours',
      'battles',
      'intermediate'
    ),
    (
      'Improving battle performance',
      'improving-battle-performance',
      'Debrief-driven improvements: energy, clarity, and repeatable battle habits.',
      $bt3$
After a battle, the fastest growth comes from one honest debrief: what created momentum, what felt awkward, and what you will change next time — not a vague “I will do better.”

Energy is a skill: call the room, acknowledge gifts specifically, and keep the storyline moving. Long confused silences cost more than imperfect banter.

Clip one highlight if you can — it becomes tomorrow’s promo and trains your audience to recognize your battle brand.

Run the debrief-forward LIVE in your mission: structured reflection on camera, then forward motion.
$bt3$,
      null,
      cat_battles,
      seed_author,
      'published',
      false,
      now () - interval '18 hours',
      'battles',
      'intermediate'
    ),
    (
      'Building battle partners',
      'building-battle-partners',
      'Turn one-off matchups into a roster of reliable collaborators.',
      $bt4$
Partnerships reward clarity and respect. DM with specifics: proposed time window, format, and what you need confirmed. Follow up once — not ten times.

Recurring rivals or themed rematches give viewers a storyline to follow. Consistency beats random matchups for retention.

Use Battle Finder or your network’s tools when available; public scheduling reduces flakes and makes you easier to book.

Your mission LIVE should explicitly build toward the next collab: shout-outs, clear asks, and a professional tone.
$bt4$,
      null,
      cat_battles,
      seed_author,
      'published',
      false,
      now () - interval '17 hours',
      'battles',
      'intermediate'
    ),
    (
      'Creating reasons to gift',
      'creating-reasons-to-gift',
      'Value-first moments that make support feel earned — not pressured.',
      $gm1$
Gifts follow emotion and clarity. Viewers support creators who teach, entertain, or help them feel part of something. “Gift me” without context burns trust.

Build repeatable “reasons”: milestones, challenges, gratitude moments, or community goals that are specific and kind to your capacity.

Transparency beats guilt: explain what gifts support — time, gear, better streams — without inventing fake emergencies.

Pair this lesson with your monetization LIVE mission: design moments worth supporting, not endless begging.
$gm1$,
      null,
      cat_mon,
      seed_author,
      'published',
      false,
      now () - interval '16 hours',
      'monetization',
      'intermediate'
    ),
    (
      'Setting goals during lives',
      'setting-goals-during-lives',
      'Goals that viewers understand: checkpoints, pacing, and clean finishes.',
      $gm2$
Goals work when they are legible: a number, a time window, and what happens when you hit it. Ambiguous goals feel like pressure; clear goals feel like a game the room can play together.

Reset goals mid-stream if the room changes — but explain the reset. Viewers forgive adjustments when you narrate honestly.

Avoid manipulative tactics that violate platform rules around incentives. When in doubt, read TikTok’s policies on rewards and promotions.

Use your mission LIVE to practice start / mid / end goal checkpoints out loud.
$gm2$,
      null,
      cat_mon,
      seed_author,
      'published',
      false,
      now () - interval '15 hours',
      'monetization',
      'intermediate'
    ),
    (
      'Scaling consistency',
      'scaling-consistency',
      'From “I went live sometimes” to a weekly system you can defend.',
      $gm3$
Scaling is calendar design: which days are non-negotiable, how long each block is, and what minimum viable stream looks like on tired days.

Volume should rise with recovery — sleep, hydration, and voice care are part of the system, not extras.

Aim toward sustainable daily output over time: many creators work toward roughly 1–2+ hours total per day split across sessions as capacity grows — but build the habit before you chase the clock.

Your mission stacks volume with guardrails: pre-live ritual + a measurable LIVE block, optional second session if you have gas left.
$gm3$,
      null,
      cat_mon,
      seed_author,
      'published',
      false,
      now () - interval '14 hours',
      'monetization',
      'advanced'
    ),
    (
      'Building income habits',
      'building-income-habits',
      'Sustainable earning: receipts, gratitude, and repeatability — not one-off spikes.',
      $gm4$
Income on LIVE compounds when your audience trusts the value exchange: they know what they get, and you deliver reliably. Track what actually moves the needle: segments, times, and themes — not superstition.

Gratitude should be specific and frequent without becoming performative guilt. Thank the action, not only the amount.

Protect longevity: income habits that burn you out will break your schedule — and your audience notices.

Capstone with a long-form LIVE mission focused on repeatable professionalism, not a crash session.
$gm4$,
      null,
      cat_mon,
      seed_author,
      'published',
      false,
      now () - interval '13 hours',
      'monetization',
      'advanced'
    ),
    (
      'What gets you banned',
      'what-gets-you-banned',
      'High-risk patterns on LIVE: what to watch for and why strikes stack.',
      $rs1$
Platform enforcement targets behavior that harms trust or safety: harassment, dangerous acts, sexual content outside policy, scams, misleading rewards, and repeated music/IP issues. Exact definitions change — always read TikTok’s Community Guidelines and LIVE policies for your region.

Strikes often come from habits, not one mistake: unmoderated chat, ignoring warnings, or repeating borderline content.

If you get a violation notice, stop, screenshot, and read the reason. Adjust workflow before you stream again.

This lesson pairs with a compliant practice LIVE: prove you can entertain within the lines.
$rs1$,
      null,
      cat_rules,
      seed_author,
      'published',
      false,
      now () - interval '12 hours',
      'rules',
      'beginner'
    ),
    (
      'How to avoid violations',
      'how-to-avoid-violations',
      'Moderation, music, minors, and incentives — operational habits that keep you safe.',
      $rs2$
Treat moderation as infrastructure: clear chat rules, timeouts for bad faith, and escalation you can explain calmly on stream.

Music and third-party content are common trip points. When unsure, use TikTok-provided tools and licensed options rather than guessing.

If minors might appear on camera, understand TikTok’s rules for youth safety — many violations come from avoidable situations.

Your mission emphasizes active chat management during a real LIVE — professionalism under pressure.
$rs2$,
      null,
      cat_rules,
      seed_author,
      'published',
      false,
      now () - interval '11 hours',
      'rules',
      'intermediate'
    ),
    (
      'Long-term account safety',
      'long-term-account-safety',
      'Play the long game: reputation, documentation, and calm responses to issues.',
      $rs3$
Long-term safety is boring on purpose: consistent standards, written house rules, and a process when something goes wrong — disputes, chargebacks, or community drama.

Document collabs and promos when needed so expectations stay clear.

If growth accelerates, your risk surface grows too: more eyes, more chat, more opportunities for mistakes. Scale moderation with audience size.

Finish with a professionalism-forward LIVE mission: show you can operate like someone planning to stream for years.
$rs3$,
      null,
      cat_rules,
      seed_author,
      'published',
      false,
      now () - interval '10 hours',
      'rules',
      'intermediate'
    )
  on conflict (slug) do update
  set
    title = excluded.title,
    excerpt = excluded.excerpt,
    content = excluded.content,
    category_id = excluded.category_id,
    status = 'published',
    published_at = coalesce(public.resource_posts.published_at, excluded.published_at, now ()),
    training_track = excluded.training_track,
    difficulty = excluded.difficulty,
    updated_at = now ();

  -- Publish growth-weekly-system if it was left draft (curriculum lesson 10).
  update public.resource_posts
  set
    status = 'published',
    published_at = coalesce(published_at, now ()),
    training_track = 'content',
    difficulty = coalesce(difficulty, 'intermediate'),
    updated_at = now ()
  where
    slug = 'growth-weekly-system'
    and status = 'draft';

  -- Align display titles with `curriculum.ts` for lessons that already existed.
  update public.resource_posts
  set
    title = 'Understanding TikTok LIVE + Setup',
    updated_at = now ()
  where
    slug = 'start-strong-on-tiktok-live';

  update public.resource_posts
  set
    title = 'First 30-minute live session',
    updated_at = now ()
  where
    slug = 'first-10-tiktok-live-sessions';

  update public.resource_posts
  set
    title = 'Avoiding beginner mistakes',
    updated_at = now ()
  where
    slug = 'common-live-mistakes-new-creators';

  update public.resource_posts
  set
    title = 'Viewer retention techniques',
    updated_at = now ()
  where
    slug = 'content-loops-repeatable-segments';

  update public.resource_posts
  set
    title = 'How gifting works',
    updated_at = now ()
  where
    slug = 'gifts-goals-momentum';

  update public.resource_posts
  set
    title = 'TikTok rules explained',
    updated_at = now ()
  where
    slug = 'platform-rules-new-live-creators';

  update public.resource_posts
  set
    title = 'Running your first battle',
    updated_at = now ()
  where
    slug = 'structure-your-first-battle-week';

  update public.resource_posts
  set
    title = 'Building repeat viewers',
    updated_at = now ()
  where
    slug = 'growth-weekly-system';

end $$;
