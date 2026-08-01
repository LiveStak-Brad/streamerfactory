-- Allow Brand Partnerships Mastery lessons to use training_track = 'partnerships'.
alter table public.resource_posts drop constraint if exists resource_posts_training_track_check;
alter table public.resource_posts add constraint resource_posts_training_track_check check (
  training_track = any (array[
    'beginner'::text, 'battles'::text, 'monetization'::text, 'rules'::text,
    'content'::text, 'presence'::text, 'creation'::text, 'growth'::text,
    'community'::text, 'professional'::text, 'production'::text, 'battle'::text,
    'music'::text, 'gaming'::text, 'multiguest'::text, 'aicreator'::text, 'selling'::text,
    'tts'::text, 'wellness'::text, 'partnerships'::text
  ])
);
comment on column public.resource_posts.training_track is
  'Program track: beginner, battles, monetization, rules, content, presence, creation, growth, community, professional, production, battle, music, gaming, multiguest, aicreator, selling, tts, wellness, partnerships.';
