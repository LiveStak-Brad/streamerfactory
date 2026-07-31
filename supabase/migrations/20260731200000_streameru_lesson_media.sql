-- StreamerU lesson media requests + published assets (admin-managed; public reads published only via app).

create table if not exists public.streameru_lesson_assets (
  id uuid primary key default gen_random_uuid (),
  lesson_slug text not null,
  asset_type text not null check (
    asset_type in (
      'screenshot',
      'photo',
      'diagram',
      'video',
      'screen_recording',
      'worksheet',
      'checklist',
      'downloadable',
      'founder_story',
      'supporting_example'
    )
  ),
  title text not null,
  placeholder_key text,
  requested_description text not null default '',
  section_key text,
  instructional_purpose text not null default '',
  required boolean not null default false,
  priority text not null default 'helpful' check (priority in ('essential', 'helpful', 'optional')),
  ownership text not null default 'needs_brad' check (
    ownership in (
      'needs_brad',
      'cursor_can_create',
      'brad_must_approve',
      'optional_enhancement'
    )
  ),
  capture_instructions text not null default '',
  dimensions_hint text,
  privacy_warning text,
  admin_notes text,
  suggested_caption text,
  suggested_alt text,
  storage_path text,
  public_url text,
  alt_text text,
  caption text,
  status text not null default 'requested' check (
    status in ('requested', 'draft', 'ready', 'published', 'archived')
  ),
  display_order integer not null default 0,
  reusable_key text,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  published_at timestamptz,
  unique (lesson_slug, title)
);

create index if not exists streameru_lesson_assets_slug_idx on public.streameru_lesson_assets (lesson_slug);

create index if not exists streameru_lesson_assets_status_idx on public.streameru_lesson_assets (status);

create index if not exists streameru_lesson_assets_ownership_idx on public.streameru_lesson_assets (ownership);

create index if not exists streameru_lesson_assets_reusable_idx on public.streameru_lesson_assets (reusable_key)
where
  reusable_key is not null;

alter table public.streameru_lesson_assets enable row level security;

-- Public: no direct table reads (app uses service/admin for management; published URLs are public storage).
-- Staff: full access for owner/editor/admin roles.

drop policy if exists "streameru_lesson_assets_staff_all" on public.streameru_lesson_assets;

create policy "streameru_lesson_assets_staff_all" on public.streameru_lesson_assets for all to authenticated using (
  exists (
    select 1
    from public.profiles p
    where
      p.id = auth.uid ()
      and p.role in ('owner', 'editor', 'admin')
  )
)
with
  check (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role in ('owner', 'editor', 'admin')
    )
  );

-- Optional public read of published metadata (URLs are already public Storage).
-- App prefers service role for public lesson pages; this policy helps without service key.
drop policy if exists "streameru_lesson_assets_public_published_select" on public.streameru_lesson_assets;

create policy "streameru_lesson_assets_public_published_select" on public.streameru_lesson_assets for
select to anon, authenticated using (status = 'published');

-- Storage bucket for lesson media (public read; staff write via service role preferred).
insert into storage.buckets (id, name, public)
values
  ('streameru-lesson-media', 'streameru-lesson-media', true)
on conflict (id) do
update
set
  public = excluded.public;

drop policy if exists "streameru_lesson_media_select_public" on storage.objects;

create policy "streameru_lesson_media_select_public" on storage.objects for
select to public using (
  exists (
    select 1
    from storage.buckets b
    where
      b.id = bucket_id
      and b.name = 'streameru-lesson-media'
  )
);

drop policy if exists "streameru_lesson_media_staff_insert" on storage.objects;

create policy "streameru_lesson_media_staff_insert" on storage.objects for insert to authenticated
with
  check (
    exists (
      select 1
      from storage.buckets b
      where
        b.id = bucket_id
        and b.name = 'streameru-lesson-media'
    )
    and exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role in ('owner', 'editor', 'admin')
    )
  );

drop policy if exists "streameru_lesson_media_staff_update" on storage.objects;

create policy "streameru_lesson_media_staff_update" on storage.objects for
update to authenticated using (
  exists (
    select 1
    from storage.buckets b
    where
      b.id = bucket_id
      and b.name = 'streameru-lesson-media'
  )
  and exists (
    select 1
    from public.profiles p
    where
      p.id = auth.uid ()
      and p.role in ('owner', 'editor', 'admin')
  )
)
with
  check (
    exists (
      select 1
      from storage.buckets b
      where
        b.id = bucket_id
        and b.name = 'streameru-lesson-media'
    )
    and exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role in ('owner', 'editor', 'admin')
    )
  );

drop policy if exists "streameru_lesson_media_staff_delete" on storage.objects;

create policy "streameru_lesson_media_staff_delete" on storage.objects for delete to authenticated using (
  exists (
    select 1
    from storage.buckets b
    where
      b.id = bucket_id
      and b.name = 'streameru-lesson-media'
  )
  and exists (
    select 1
    from public.profiles p
    where
      p.id = auth.uid ()
      and p.role in ('owner', 'editor', 'admin')
  )
);

-- Seed Lesson 1 gold-standard media requests (placeholders converted from lesson body).
insert into public.streameru_lesson_assets (
  lesson_slug,
  asset_type,
  title,
  placeholder_key,
  requested_description,
  section_key,
  instructional_purpose,
  required,
  priority,
  ownership,
  capture_instructions,
  dimensions_hint,
  privacy_warning,
  suggested_caption,
  suggested_alt,
  status,
  display_order,
  reusable_key
)
values
  (
    'start-strong-on-tiktok-live',
    'screenshot',
    'TikTok profile readiness',
    'TikTok profile showing a clear photo, readable username, and one-sentence bio',
    'TikTok profile with readable username, clear profile photo, and concise bio',
    'Screenshots',
    'Shows learners what LIVE-ready looks like before their first session',
    false,
    'helpful',
    'needs_brad',
    'Open TikTok → your profile. Capture a portrait screenshot showing username, profile photo, and bio. Do not begin a LIVE.

Highlight: Username, profile photo, and bio

Crop/blur: Crop follower counts / likes if distracting; blur DMs or notifications

Placement: After “Confirm your account is LIVE-ready”',
    'Portrait phone screenshot, min 720px wide',
    'Do not show private messages, phone numbers, or sensitive personal data.',
    'A clear profile helps new viewers understand who you are within seconds.',
    'TikTok creator profile with readable username, clear profile photo, and concise bio',
    'requested',
    1,
    'tiktok-profile-ready'
  ),
  (
    'start-strong-on-tiktok-live',
    'photo',
    'Phone at eye level with front light',
    'Phone propped at eye level with a lamp or window light facing the creator',
    'Phone propped at eye level with lamp or window light facing the creator',
    'Screenshots',
    'Makes the framing + light priority concrete and copyable',
    false,
    'helpful',
    'needs_brad',
    'Photograph a phone secured at eye level (tripod, shelf, or books). Light should come from in front of the creator, not behind.

Placement: After ten-minute setup (audio / light / framing)',
    'Min 1200px on long edge',
    'Avoid private rooms, addresses, family photos, or notification banners.',
    'Eye-level framing and front light beat expensive gear aimed the wrong way.',
    'Smartphone mounted at eye level with a lamp lighting the subject from the front',
    'requested',
    2,
    'setup-phone-eye-level'
  ),
  (
    'start-strong-on-tiktok-live',
    'screenshot',
    'Go LIVE setup screen',
    'Go LIVE setup screen with title/topic field highlighted',
    'Go LIVE setup screen with title/topic field highlighted',
    'Screenshots',
    'Removes first-timer confusion about where title and controls live',
    false,
    'helpful',
    'needs_brad',
    'Open TikTok LIVE setup WITHOUT going live. Capture the pre-broadcast screen. Note title/topic field and camera orientation. Crop notifications.

Placement: After “Build a mental map of the Go LIVE screen”',
    'Portrait phone screenshot, min 720px wide',
    'Do not show private account warnings or payment screens.',
    'Learn the control categories before you broadcast — layouts change, categories stay.',
    'TikTok Go LIVE setup screen with title or topic field visible before broadcasting',
    'requested',
    3,
    'tiktok-go-live-setup'
  ),
  (
    'start-strong-on-tiktok-live',
    'screenshot',
    'Live view control map',
    'Live view with chat, viewer count, and end control areas identified',
    'Live view highlighting chat, viewer count, and end control areas',
    'Screenshots',
    'Completes the mental map once a practice LIVE is safe to capture',
    false,
    'optional',
    'needs_brad',
    'Only if you can capture a practice LIVE safely. Prefer a private/test account. Blur other users’ usernames.',
    'Portrait',
    'Never expose minors or private chat content.',
    'Know where chat, viewer count, and End live before nerves hit.',
    'TikTok LIVE interface with chat, viewer count, and end controls indicated',
    'requested',
    4,
    'tiktok-live-controls'
  ),
  (
    'start-strong-on-tiktok-live',
    'diagram',
    'LIVE versus posted video',
    'LIVE vs posted video — finished clip on the left, real-time hosted room on the right',
    'LIVE vs posted video — finished clip vs real-time hosted room',
    'Diagrams',
    'Teaches the core mental model of Lesson 1 in one glance',
    false,
    'helpful',
    'cursor_can_create',
    'Two-panel diagram: left = finished short video; right = real-time hosted room. Streamer Factory brand colors. Cursor may generate branded SVG; admin approval before publish.

Placement: After “What TikTok LIVE actually is”',
    'Landscape 16:9 or 4:3',
    null,
    'A post is a finished clip. LIVE is a room you host in real time.',
    'Diagram comparing a finished TikTok video to a real-time LIVE hosted room',
    'requested',
    5,
    'diagram-live-vs-video'
  ),
  (
    'start-strong-on-tiktok-live',
    'diagram',
    'Setup priority pyramid',
    'Setup priority pyramid — 1) Audio  2) Light  3) Framing  4) Title + first-minute promise',
    'Setup priority — audio → light → framing → title and first-minute promise',
    'Diagrams',
    'Locks the Lesson 1 setup order so gear shopping does not replace basics',
    false,
    'helpful',
    'cursor_can_create',
    'Four-level pyramid bottom→top: Clear audio, Front-facing light, Eye-level framing, Title + first-minute promise. Note expensive gear is not foundation. Cursor may generate SVG.

Placement: After ten-minute setup section',
    'Square or portrait diagram',
    null,
    'Solve audio, light, and framing before you buy more gear.',
    'Pyramid diagram showing setup priority from audio up through first-minute promise',
    'requested',
    6,
    'diagram-setup-priority'
  ),
  (
    'start-strong-on-tiktok-live',
    'founder_story',
    'Founder insight — starting without waiting for perfect',
    null,
    'Brad experience: waiting for perfect gear/audience delays practice',
    'From Brad''s Experience',
    'Reinforces Reality Check + confidence-first philosophy with verified experience',
    false,
    'helpful',
    'brad_must_approve',
    'Ask Brad: What did waiting for perfect gear or a guaranteed audience cost you early on — and what would you tell a creator staring at an empty Go LIVE screen?

Answer in 80–120 words. May be paraphrased with approval. Never invent the response.',
    null,
    null,
    'From Brad''s experience',
    null,
    'requested',
    7,
    null
  )
on conflict (lesson_slug, title) do nothing;
