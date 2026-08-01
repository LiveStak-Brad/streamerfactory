/**
 * Training program tracks — each published lesson belongs to one track.
 * Display copy for StreamerU hub sections (canonical path `/streameru`).
 */

export const TRAINING_TRACK_IDS = [
  "beginner",
  "battles",
  "monetization",
  "rules",
  "content",
  "presence",
  "creation",
  "growth",
  "community",
  "professional",
  "production",
  "battle",
  "music",
  "gaming",
  "multiguest",
  "aicreator",
  "selling",
  "tts",
  "wellness",
] as const;

export type TrainingTrackId = (typeof TRAINING_TRACK_IDS)[number];

export type TrainingTrackSection = {
  id: TrainingTrackId;
  /** Section heading on the StreamerU hub */
  title: string;
  description: string;
  /** Lesson page line: “Lesson in: …” */
  lessonInLabel: string;
  /** Lesson page line: “Part of: …” */
  partOfLabel: string;
};

export const TRAINING_TRACK_SECTIONS: TrainingTrackSection[] = [
  {
    id: "beginner",
    title: "Beginner foundations",
    lessonInLabel: "Beginner foundations",
    partOfLabel: "StreamerU · Beginner track",
    description:
      "TikTok LIVE fundamentals — sound, framing, pacing, and sessions that feel intentional before you optimize anything else.",
  },
  {
    id: "battles",
    title: "Battles & collaboration",
    lessonInLabel: "Battles & collaboration",
    partOfLabel: "StreamerU · Battles track",
    description:
      "Partners, formats, battle weeks, and promotion — so network battles feel organized and worth showing up for.",
  },
  {
    id: "monetization",
    title: "Growth & monetization",
    lessonInLabel: "Growth & monetization",
    partOfLabel: "StreamerU · Growth track",
    description:
      "Gifts, goals, momentum, and sustainable schedules — building income without burning out your audience (or yourself).",
  },
  {
    id: "rules",
    title: "Essential safety",
    lessonInLabel: "Essential safety",
    partOfLabel: "StreamerU · Beginner Foundations · Safety",
    description:
      "Platform rules, account protection, and safe streaming practices — taught in Beginner Foundations before regular LIVE.",
  },
  {
    id: "content",
    title: "Content & promotion",
    lessonInLabel: "Content & promotion",
    partOfLabel: "StreamerU · Content track",
    description:
      "Hooks, segments, and how you talk about battles and collabs without noise.",
  },
  {
    id: "presence",
    title: "Presence Mastery",
    lessonInLabel: "Presence Mastery",
    partOfLabel: "StreamerU · Presence Mastery",
    description:
      "Camera presence, vocal delivery, storytelling, emotional pacing, and recovery — so you become worth staying for on LIVE.",
  },
  {
    id: "creation",
    title: "Content Creation Mastery",
    lessonInLabel: "Content Creation Mastery",
    partOfLabel: "StreamerU · Content Creation Mastery",
    description:
      "Niche clarity, memorable show identity, recurring segments, themes, arcs, events, and anticipation — so your LIVE is worth watching.",
  },
  {
    id: "growth",
    title: "Growth Mastery",
    lessonInLabel: "Growth Mastery",
    partOfLabel: "StreamerU · Growth Mastery",
    description:
      "Discovery systems, analytics diagnosis, ethical experiments, scheduling, and durable growth habits — so you get found without chasing myths.",
  },
  {
    id: "community",
    title: "Community Mastery",
    lessonInLabel: "Community Mastery",
    partOfLabel: "StreamerU · Community Mastery",
    description:
      "Belonging culture, return habits, moderation systems, healthy boundaries, guest hosting, and networking — so people keep coming back even when you are not LIVE.",
  },
  {
    id: "professional",
    title: "Professional Creator Mastery",
    lessonInLabel: "Professional Creator Mastery",
    partOfLabel: "StreamerU · Professional Creator Mastery",
    description:
      "Positioning, offers, income operations, IP awareness, brand communication, privacy/security, contracts literacy, and capacity planning — creator-side career sustainability.",
  },
  {
    id: "production",
    title: "Production Mastery",
    lessonInLabel: "Production Mastery",
    partOfLabel: "StreamerU · Production Mastery",
    description:
      "Lighting, audio, framing, room design, OBS discipline, mobile production, accessibility, and troubleshooting — professional LIVE quality with whatever gear you own.",
  },
  {
    id: "battle",
    title: "Battle Mastery",
    lessonInLabel: "Battle Mastery",
    partOfLabel: "StreamerU · Battle Mastery",
    description:
      "Elite battle strategy — matchups, energy architecture, partner ecosystems, ethical clutch hosting, production clarity, debriefs, and multi-battle event pacing.",
  },
  {
    id: "music",
    title: "Music LIVE Mastery",
    lessonInLabel: "Music LIVE Mastery",
    partOfLabel: "StreamerU · Music LIVE Mastery",
    description:
      "Music performance on LIVE — formats, performance audio, stamina, setlists, requests, growth, rights-aware repertoire, collabs, and ethical monetization.",
  },
  {
    id: "gaming",
    title: "Gaming LIVE Mastery",
    lessonInLabel: "Gaming LIVE Mastery",
    partOfLabel: "StreamerU · Gaming LIVE Mastery",
    description:
      "Gaming on LIVE — reliable setups, commentary, chat systems, audio routing, OBS and TikTok LIVE Studio workflows, console/mobile capture, TikFinity discipline, moderation, and signature show design.",
  },
  {
    id: "multiguest",
    title: "Multi-Guest LIVE Mastery",
    lessonInLabel: "Multi-Guest LIVE Mastery",
    partOfLabel: "StreamerU · Multi-Guest LIVE Mastery",
    description:
      "Professional multi-guest hosting — conversations, panels, interviews, community rooms, events, talent shows, ethical competitive rooms, moderation, and signature multi-guest LIVE events.",
  },
  {
    id: "aicreator",
    title: "AI Creator Mastery",
    lessonInLabel: "AI Creator Mastery",
    partOfLabel: "StreamerU · AI Creator Mastery",
    description:
      "Responsible AI for creators — mindset, prompts, planning, voice-safe writing, visuals, video/repurposing, safe automation, verified research, ethics/privacy, and an AI Creator Operating System.",
  },
  {
    id: "selling",
    title: "Selling & Influence Mastery",
    lessonInLabel: "Selling & Influence Mastery",
    partOfLabel: "StreamerU · Selling & Influence Mastery",
    description:
      "Ethical selling for creators — trust, buyer psychology, clear value, trust-centered storytelling, objections, natural CTAs, community-safe offers, long-term relationships, reputation, and an Ethical Creator Offer.",
  },
  {
    id: "tts",
    title: "TikTok Shop Mastery",
    lessonInLabel: "TikTok Shop Mastery",
    partOfLabel: "StreamerU · TikTok Shop Mastery",
    description:
      "Professional TikTok Shop for creators — ecosystem literacy, readiness, affiliate product research, product videos, LIVE shopping systems, demos & setups, analytics interpretation, compliance, campaign scaling, and a Signature Shop Campaign.",
  },
  {
    id: "wellness",
    title: "Creator Wellness & Longevity Mastery",
    lessonInLabel: "Creator Wellness & Longevity Mastery",
    partOfLabel: "StreamerU · Creator Wellness & Longevity Mastery",
    description:
      "Career longevity for creators — burnout prevention, ergonomics, voice care, mental resilience, sustainable schedules, personal financial buffers, boundaries, creative recovery, setback protocols, and a Personal Creator Longevity Plan.",
  },
];

export function isTrainingTrackId(value: string | null | undefined): value is TrainingTrackId {
  return Boolean(value && (TRAINING_TRACK_IDS as readonly string[]).includes(value));
}

export function getTrainingTrackSection(track: string | null | undefined): TrainingTrackSection | null {
  if (!isTrainingTrackId(track)) return null;
  return TRAINING_TRACK_SECTIONS.find((s) => s.id === track) ?? null;
}

const TRACK_LABELS: Record<TrainingTrackId, string> = {
  beginner: "Beginner",
  battles: "Battles",
  monetization: "Monetization",
  rules: "Safety",
  content: "Content",
  presence: "Presence",
  creation: "Content Creation",
  growth: "Growth",
  community: "Community",
  professional: "Professional Creator",
  production: "Production",
  battle: "Battle Mastery",
  music: "Music LIVE Mastery",
  gaming: "Gaming LIVE Mastery",
  multiguest: "Multi-Guest LIVE Mastery",
  aicreator: "AI Creator Mastery",
  selling: "Selling & Influence Mastery",
  tts: "TikTok Shop Mastery",
  wellness: "Creator Wellness & Longevity Mastery",
};

export function trainingTrackLabel(track: string | null | undefined): string {
  if (isTrainingTrackId(track)) return TRACK_LABELS[track];
  return "Training";
}

const DIFF_LABELS: Record<string, string> = {
  beginner: "Beginner level",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function difficultyLabel(level: string | null | undefined): string | null {
  if (!level) return null;
  return DIFF_LABELS[level] ?? level;
}
