/**
 * Single source of truth for StreamerU program order.
 *
 * Add a lesson:
 * 1. Append to `CURRICULUM` with the next `globalOrder`, correct `programName`, and a unique `slug`
 *    (must match `resource_posts.slug` when published).
 * 2. Add a matching mission in `training-missions.ts` keyed by the same `slug`.
 * 3. Register at least one StreamerU library resource in `src/lib/streameru-library/` (checklist minimum).
 * 4. Publish the post in admin with that slug (or seed it).
 *
 * Program layout (safety-first):
 * 1. Beginner Foundations — setup + essential platform safety before regular LIVE
 * 2. Live Streaming Mastery
 * 3. Battles & Collaboration
 * 4. Growth & Monetization
 * 5. Advanced Creator — black-belt bridge: how professionals operate
 * 6. Presence Mastery — camera, voice, storytelling, pacing, recovery craft
 * 7. Content Creation Mastery — worth-watching showcraft (niche, segments, themes, arcs)
 * 8. Growth Mastery — discovery systems, analytics, experiments, durable growth
 * 9. Community Mastery — belonging culture, mods, rituals, guests, networking
 * 10. Professional Creator Mastery — creator-side career professionalism
 * 11. Production Mastery — lighting, audio, framing, OBS, mobile, accessibility, triage
 * 12. Battle Mastery — elite battle strategy specialty (optional)
 * 13. Music LIVE Mastery — music performance + technical LIVE specialty (optional)
 * 14. Gaming LIVE Mastery — gaming LIVE specialty (optional; after Music LIVE)
 */

import type { TrainingTrackId } from "@/lib/resources/tracks";

export type CurriculumLesson = {
  /** 1–N across the full academy path */
  globalOrder: number;
  /** Must match `resource_posts.slug` */
  slug: string;
  /** Program display title (may differ slightly from CMS title until aligned) */
  title: string;
  trackId: TrainingTrackId;
  /** Human-readable program (e.g. Beginner Foundations) */
  programName: string;
  /** Lesson index within this program (1-based) */
  lessonInProgram: number;
  lessonsInProgram: number;
};

/**
 * Canonical program display names — order defines hub / sidebar / finals sequence.
 * Advanced Creator keeps internal programKey `rules` so finals/certificate storage IDs stay stable.
 */
export const STREAMERU_PROGRAM_NAMES = [
  "Beginner Foundations",
  "Live Streaming Mastery",
  "Battles & Collaboration",
  "Growth & Monetization",
  "Advanced Creator",
  "Presence Mastery",
  "Content Creation Mastery",
  "Growth Mastery",
  "Community Mastery",
  "Professional Creator Mastery",
  "Production Mastery",
  "Battle Mastery",
  "Music LIVE Mastery",
  "Gaming LIVE Mastery",
] as const;

export type StreamerUProgramName = (typeof STREAMERU_PROGRAM_NAMES)[number];

/** Strict global order — the only sequence users should follow for the full course. */
export const CURRICULUM: CurriculumLesson[] = [
  // BEGINNER FOUNDATIONS (9) — setup, then essential safety, then first regular LIVE habits
  {
    globalOrder: 1,
    slug: "start-strong-on-tiktok-live",
    title: "Understanding TikTok LIVE + Setup",
    trackId: "beginner",
    programName: "Beginner Foundations",
    lessonInProgram: 1,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 2,
    slug: "your-first-live-structure",
    title: "Your first live structure",
    trackId: "beginner",
    programName: "Beginner Foundations",
    lessonInProgram: 2,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 3,
    slug: "platform-rules-new-live-creators",
    title: "TikTok rules explained",
    trackId: "rules",
    programName: "Beginner Foundations",
    lessonInProgram: 3,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 4,
    slug: "what-gets-you-banned",
    title: "What gets you banned",
    trackId: "rules",
    programName: "Beginner Foundations",
    lessonInProgram: 4,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 5,
    slug: "how-to-avoid-violations",
    title: "How to avoid violations",
    trackId: "rules",
    programName: "Beginner Foundations",
    lessonInProgram: 5,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 6,
    slug: "long-term-account-safety",
    title: "Long-term account safety",
    trackId: "rules",
    programName: "Beginner Foundations",
    lessonInProgram: 6,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 7,
    slug: "first-10-tiktok-live-sessions",
    title: "First 30-minute live session",
    trackId: "beginner",
    programName: "Beginner Foundations",
    lessonInProgram: 7,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 8,
    slug: "first-week-of-lives-consistency",
    title: "First week of lives (consistency focus)",
    trackId: "beginner",
    programName: "Beginner Foundations",
    lessonInProgram: 8,
    lessonsInProgram: 9,
  },
  {
    globalOrder: 9,
    slug: "common-live-mistakes-new-creators",
    title: "Avoiding beginner mistakes",
    trackId: "beginner",
    programName: "Beginner Foundations",
    lessonInProgram: 9,
    lessonsInProgram: 9,
  },
  // LIVE STREAMING MASTERY (5) — uses `content` track id
  {
    globalOrder: 10,
    slug: "talking-with-empty-room",
    title: "Talking when no one is watching",
    trackId: "content",
    programName: "Live Streaming Mastery",
    lessonInProgram: 1,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 11,
    slug: "hooks-and-first-impressions",
    title: "Hooks and first impressions",
    trackId: "content",
    programName: "Live Streaming Mastery",
    lessonInProgram: 2,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 12,
    slug: "content-loops-repeatable-segments",
    title: "Viewer retention techniques",
    trackId: "content",
    programName: "Live Streaming Mastery",
    lessonInProgram: 3,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 13,
    slug: "structuring-longer-lives",
    title: "Structuring longer lives",
    trackId: "content",
    programName: "Live Streaming Mastery",
    lessonInProgram: 4,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 14,
    slug: "growth-weekly-system",
    title: "Building repeat viewers",
    trackId: "content",
    programName: "Live Streaming Mastery",
    lessonInProgram: 5,
    lessonsInProgram: 5,
  },
  // BATTLES & COLLABORATION (5)
  {
    globalOrder: 15,
    slug: "understanding-battles",
    title: "Understanding battles",
    trackId: "battles",
    programName: "Battles & Collaboration",
    lessonInProgram: 1,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 16,
    slug: "preparing-for-your-first-battle",
    title: "Preparing for your first battle",
    trackId: "battles",
    programName: "Battles & Collaboration",
    lessonInProgram: 2,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 17,
    slug: "structure-your-first-battle-week",
    title: "Running your first battle",
    trackId: "battles",
    programName: "Battles & Collaboration",
    lessonInProgram: 3,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 18,
    slug: "improving-battle-performance",
    title: "Improving battle performance",
    trackId: "battles",
    programName: "Battles & Collaboration",
    lessonInProgram: 4,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 19,
    slug: "building-battle-partners",
    title: "Building battle partners",
    trackId: "battles",
    programName: "Battles & Collaboration",
    lessonInProgram: 5,
    lessonsInProgram: 5,
  },
  // GROWTH & MONETIZATION (5)
  {
    globalOrder: 20,
    slug: "gifts-goals-momentum",
    title: "How gifting works",
    trackId: "monetization",
    programName: "Growth & Monetization",
    lessonInProgram: 1,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 21,
    slug: "creating-reasons-to-gift",
    title: "Creating reasons to gift",
    trackId: "monetization",
    programName: "Growth & Monetization",
    lessonInProgram: 2,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 22,
    slug: "setting-goals-during-lives",
    title: "Setting goals during lives",
    trackId: "monetization",
    programName: "Growth & Monetization",
    lessonInProgram: 3,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 23,
    slug: "building-income-habits",
    title: "Building income habits",
    trackId: "monetization",
    programName: "Growth & Monetization",
    lessonInProgram: 4,
    lessonsInProgram: 5,
  },
  {
    globalOrder: 24,
    slug: "scaling-consistency",
    title: "Scaling consistency",
    trackId: "monetization",
    programName: "Growth & Monetization",
    lessonInProgram: 5,
    lessonsInProgram: 5,
  },
  // ADVANCED CREATOR (8) — black-belt bridge after Core Certification
  {
    globalOrder: 25,
    slug: "your-creator-operating-system",
    title: "Your Creator Operating System",
    trackId: "rules",
    programName: "Advanced Creator",
    lessonInProgram: 1,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 26,
    slug: "creator-brand-that-survives-the-feed",
    title: "Creator Brand That Survives the Feed",
    trackId: "rules",
    programName: "Advanced Creator",
    lessonInProgram: 2,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 27,
    slug: "reading-your-live-numbers",
    title: "Reading Your LIVE Numbers Without Lying to Yourself",
    trackId: "rules",
    programName: "Advanced Creator",
    lessonInProgram: 3,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 28,
    slug: "creative-planning-for-real-weeks",
    title: "Creative Planning for Real Weeks",
    trackId: "rules",
    programName: "Advanced Creator",
    lessonInProgram: 4,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 29,
    slug: "growth-experiments-that-dont-wreck-your-show",
    title: "Growth Experiments That Don't Wreck Your Show",
    trackId: "rules",
    programName: "Advanced Creator",
    lessonInProgram: 5,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 30,
    slug: "professional-standards-on-live",
    title: "Professional Standards on LIVE",
    trackId: "rules",
    programName: "Advanced Creator",
    lessonInProgram: 6,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 31,
    slug: "privacy-security-and-personal-boundaries",
    title: "Privacy, Security, and Personal Boundaries",
    trackId: "rules",
    programName: "Advanced Creator",
    lessonInProgram: 7,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 32,
    slug: "advanced-creator-capstone-30-day-pro-sprint",
    title: "Advanced Creator Capstone: 30-Day Pro Sprint",
    trackId: "rules",
    programName: "Advanced Creator",
    lessonInProgram: 8,
    lessonsInProgram: 8,
  },
  // PRESENCE MASTERY (10) — first Mastery Path after Advanced Creator
  {
    globalOrder: 33,
    slug: "camera-presence-owning-the-frame",
    title: "Camera Presence: Owning the Frame",
    trackId: "presence",
    programName: "Presence Mastery",
    lessonInProgram: 1,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 34,
    slug: "voice-that-holds-a-room",
    title: "Voice That Holds a Room",
    trackId: "presence",
    programName: "Presence Mastery",
    lessonInProgram: 2,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 35,
    slug: "confidence-when-the-chat-is-quiet",
    title: "Confidence When the Chat Is Quiet",
    trackId: "presence",
    programName: "Presence Mastery",
    lessonInProgram: 3,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 36,
    slug: "storytelling-on-live-not-scripts",
    title: "Storytelling on LIVE (Not Scripts)",
    trackId: "presence",
    programName: "Presence Mastery",
    lessonInProgram: 4,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 37,
    slug: "audience-psychology-why-people-stay",
    title: "Audience Psychology: Why People Stay, Tip, or Leave",
    trackId: "presence",
    programName: "Presence Mastery",
    lessonInProgram: 5,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 38,
    slug: "emotional-pacing-across-a-live",
    title: "Emotional Pacing Across a LIVE",
    trackId: "presence",
    programName: "Presence Mastery",
    lessonInProgram: 6,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 39,
    slug: "humor-warmth-and-authenticity",
    title: "Humor, Warmth, and Authenticity Without Forcing It",
    trackId: "presence",
    programName: "Presence Mastery",
    lessonInProgram: 7,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 40,
    slug: "handling-pressure-moments-live",
    title: "Handling Pressure Moments Live",
    trackId: "presence",
    programName: "Presence Mastery",
    lessonInProgram: 8,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 41,
    slug: "interview-energy-solo-and-guests",
    title: "Interview Energy (Solo and With Guests)",
    trackId: "presence",
    programName: "Presence Mastery",
    lessonInProgram: 9,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 42,
    slug: "presence-capstone-signature-20-minute-live",
    title: "Presence Capstone: Signature 20-Minute LIVE",
    trackId: "presence",
    programName: "Presence Mastery",
    lessonInProgram: 10,
    lessonsInProgram: 10,
  },
  // CONTENT CREATION MASTERY (10) — worth-watching showcraft after Presence
  {
    globalOrder: 43,
    slug: "finding-your-niche-without-boxing-yourself-in",
    title: "Finding Your Niche (Without Boxing Yourself In)",
    trackId: "creation",
    programName: "Content Creation Mastery",
    lessonInProgram: 1,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 44,
    slug: "becoming-memorable-on-live",
    title: "Becoming Memorable on LIVE",
    trackId: "creation",
    programName: "Content Creation Mastery",
    lessonInProgram: 2,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 45,
    slug: "creating-recurring-segments-viewers-expect",
    title: "Creating Recurring Segments Viewers Expect",
    trackId: "creation",
    programName: "Content Creation Mastery",
    lessonInProgram: 3,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 46,
    slug: "running-themed-weeks",
    title: "Running Themed Weeks",
    trackId: "creation",
    programName: "Content Creation Mastery",
    lessonInProgram: 4,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 47,
    slug: "story-arcs-across-multiple-lives",
    title: "Story Arcs Across Multiple LIVEs",
    trackId: "creation",
    programName: "Content Creation Mastery",
    lessonInProgram: 5,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 48,
    slug: "community-events-on-live",
    title: "Community Events on LIVE",
    trackId: "creation",
    programName: "Content Creation Mastery",
    lessonInProgram: 6,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 49,
    slug: "interactive-shows-that-arent-chaos",
    title: "Interactive Shows That Aren't Chaos",
    trackId: "creation",
    programName: "Content Creation Mastery",
    lessonInProgram: 7,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 50,
    slug: "seasonal-content-without-gimmicks",
    title: "Seasonal Content Without Gimmicks",
    trackId: "creation",
    programName: "Content Creation Mastery",
    lessonInProgram: 8,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 51,
    slug: "building-anticipation-before-and-during-live",
    title: "Building Anticipation Before and During LIVE",
    trackId: "creation",
    programName: "Content Creation Mastery",
    lessonInProgram: 9,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 52,
    slug: "content-creation-capstone-7-day-themed-live-series",
    title: "Content Creation Capstone: 7-Day Themed LIVE Series",
    trackId: "creation",
    programName: "Content Creation Mastery",
    lessonInProgram: 10,
    lessonsInProgram: 10,
  },
  // GROWTH MASTERY (12) — discovery systems after Content Creation
  {
    globalOrder: 53,
    slug: "growth-diagnosis-framework",
    title: "The Growth Diagnosis Framework",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 1,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 54,
    slug: "retention-science-beyond-the-basics",
    title: "Retention Science Beyond the Basics",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 2,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 55,
    slug: "analytics-deep-dive-for-live-creators",
    title: "Analytics Deep Dive for LIVE Creators",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 3,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 56,
    slug: "experiment-design-for-creators",
    title: "Experiment Design for Creators",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 4,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 57,
    slug: "scheduling-as-strategy",
    title: "Scheduling as Strategy",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 5,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 58,
    slug: "discovery-inventory-never-miss-a-publish-window",
    title: "Discovery Inventory: Never Miss a Publish Window",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 6,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 59,
    slug: "algorithm-durable-growth",
    title: "Algorithm-Durable Growth (No Myth Chasing)",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 7,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 60,
    slug: "clips-discovery-and-live",
    title: "Clips, Discovery, and LIVE Without Splitting Focus",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 8,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 61,
    slug: "ai-for-live-creators",
    title: "AI for LIVE Creators (Assist, Don't Replace)",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 9,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 62,
    slug: "collaboration-growth-without-begging",
    title: "Collaboration Growth Without Begging",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 10,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 63,
    slug: "from-spike-to-stable-growth",
    title: "From Spike to Stable Growth",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 11,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 64,
    slug: "growth-capstone-30-day-growth-experiment",
    title: "Growth Capstone: 30-Day Growth Experiment",
    trackId: "growth",
    programName: "Growth Mastery",
    lessonInProgram: 12,
    lessonsInProgram: 12,
  },
  // COMMUNITY MASTERY (10) — belonging culture after Advanced Creator
  {
    globalOrder: 65,
    slug: "community-design-belonging-on-purpose",
    title: "Community Design: Belonging on Purpose",
    trackId: "community",
    programName: "Community Mastery",
    lessonInProgram: 1,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 66,
    slug: "chat-culture-and-return-viewer-habits",
    title: "Chat Culture and Return Viewer Habits",
    trackId: "community",
    programName: "Community Mastery",
    lessonInProgram: 2,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 67,
    slug: "moderation-systems-that-scale",
    title: "Moderation Systems That Scale",
    trackId: "community",
    programName: "Community Mastery",
    lessonInProgram: 3,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 68,
    slug: "conflict-trolls-and-boundary-enforcement",
    title: "Conflict, Trolls, and Boundary Enforcement",
    trackId: "community",
    programName: "Community Mastery",
    lessonInProgram: 4,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 69,
    slug: "protecting-community-health-and-yourself",
    title: "Protecting Community Health (and Yourself)",
    trackId: "community",
    programName: "Community Mastery",
    lessonInProgram: 5,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 70,
    slug: "accessibility-and-inclusion-in-community-spaces",
    title: "Accessibility and Inclusion in Community Spaces",
    trackId: "community",
    programName: "Community Mastery",
    lessonInProgram: 6,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 71,
    slug: "guest-hosting-that-elevates-both-audiences",
    title: "Guest Hosting That Elevates Both Audiences",
    trackId: "community",
    programName: "Community Mastery",
    lessonInProgram: 7,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 72,
    slug: "interviewing-skills-for-creators",
    title: "Interviewing Skills for Creators",
    trackId: "community",
    programName: "Community Mastery",
    lessonInProgram: 8,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 73,
    slug: "professional-networking-for-creators",
    title: "Professional Networking for Creators",
    trackId: "community",
    programName: "Community Mastery",
    lessonInProgram: 9,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 74,
    slug: "community-capstone-community-appreciation-event",
    title: "Community Capstone: Community Appreciation Event",
    trackId: "community",
    programName: "Community Mastery",
    lessonInProgram: 10,
    lessonsInProgram: 10,
  },
  // PROFESSIONAL CREATOR MASTERY (10) — career professionalism after Advanced Creator
  {
    globalOrder: 75,
    slug: "positioning-for-money-without-selling-your-soul",
    title: "Positioning for Money (Without Selling Your Soul)",
    trackId: "professional",
    programName: "Professional Creator Mastery",
    lessonInProgram: 1,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 76,
    slug: "offer-design-for-live-creators",
    title: "Offer Design for LIVE Creators",
    trackId: "professional",
    programName: "Professional Creator Mastery",
    lessonInProgram: 2,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 77,
    slug: "income-systems-and-money-operations",
    title: "Income Systems and Money Operations",
    trackId: "professional",
    programName: "Professional Creator Mastery",
    lessonInProgram: 3,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 78,
    slug: "reading-business-health-beyond-gift-totals",
    title: "Reading Business Health Beyond Gift Totals",
    trackId: "professional",
    programName: "Professional Creator Mastery",
    lessonInProgram: 4,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 79,
    slug: "copyright-and-ip-awareness-for-creators",
    title: "Copyright and IP Awareness for Creators",
    trackId: "professional",
    programName: "Professional Creator Mastery",
    lessonInProgram: 5,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 80,
    slug: "brand-deals-and-partner-communication",
    title: "Brand Deals and Partner Communication (Creator Side)",
    trackId: "professional",
    programName: "Professional Creator Mastery",
    lessonInProgram: 6,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 81,
    slug: "privacy-security-and-reputation-as-business-assets",
    title: "Privacy, Security, and Reputation as Business Assets",
    trackId: "professional",
    programName: "Professional Creator Mastery",
    lessonInProgram: 7,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 82,
    slug: "contracts-literacy-for-creators",
    title: "Contracts Literacy for Creators (Basics)",
    trackId: "professional",
    programName: "Professional Creator Mastery",
    lessonInProgram: 8,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 83,
    slug: "time-capacity-and-saying-no",
    title: "Time, Capacity, and Saying No",
    trackId: "professional",
    programName: "Professional Creator Mastery",
    lessonInProgram: 9,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 84,
    slug: "professional-creator-capstone-creator-operating-manual",
    title: "Professional Creator Capstone: Creator Operating Manual",
    trackId: "professional",
    programName: "Professional Creator Mastery",
    lessonInProgram: 10,
    lessonsInProgram: 10,
  },
  // PRODUCTION MASTERY (10) — technical quality systems after Advanced Creator
  {
    globalOrder: 85,
    slug: "production-decisions-before-gear-purchases",
    title: "Production Decisions Before Gear Purchases",
    trackId: "production",
    programName: "Production Mastery",
    lessonInProgram: 1,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 86,
    slug: "lighting-systems-that-make-you-look-intentional",
    title: "Lighting Systems That Make You Look Intentional",
    trackId: "production",
    programName: "Production Mastery",
    lessonInProgram: 2,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 87,
    slug: "camera-framing-and-visual-hierarchy",
    title: "Camera Framing and Visual Hierarchy",
    trackId: "production",
    programName: "Production Mastery",
    lessonInProgram: 3,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 88,
    slug: "audio-first-clean-sound-wins-trust",
    title: "Audio First: Clean Sound Wins Trust",
    trackId: "production",
    programName: "Production Mastery",
    lessonInProgram: 4,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 89,
    slug: "room-design-and-background-as-brand",
    title: "Room Design and Background as Brand",
    trackId: "production",
    programName: "Production Mastery",
    lessonInProgram: 5,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 90,
    slug: "obs-and-scene-discipline-without-overbuilding",
    title: "OBS and Scene Discipline (Without Overbuilding)",
    trackId: "production",
    programName: "Production Mastery",
    lessonInProgram: 6,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 91,
    slug: "mobile-first-production-excellence",
    title: "Mobile-First Production Excellence",
    trackId: "production",
    programName: "Production Mastery",
    lessonInProgram: 7,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 92,
    slug: "accessibility-basics-for-live-viewers",
    title: "Accessibility Basics for LIVE Viewers",
    trackId: "production",
    programName: "Production Mastery",
    lessonInProgram: 8,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 93,
    slug: "troubleshooting-under-pressure",
    title: "Troubleshooting Under Pressure",
    trackId: "production",
    programName: "Production Mastery",
    lessonInProgram: 9,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 94,
    slug: "production-capstone-your-signature-look",
    title: "Production Capstone: Your Signature Look",
    trackId: "production",
    programName: "Production Mastery",
    lessonInProgram: 10,
    lessonsInProgram: 10,
  },
  // BATTLE MASTERY (8) — optional specialty after Core Battles + Advanced Creator
  {
    globalOrder: 95,
    slug: "battle-strategy-beyond-basics",
    title: "Battle Strategy Beyond Basics",
    trackId: "battle",
    programName: "Battle Mastery",
    lessonInProgram: 1,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 96,
    slug: "energy-architecture-for-timed-battles",
    title: "Energy Architecture for Timed Battles",
    trackId: "battle",
    programName: "Battle Mastery",
    lessonInProgram: 2,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 97,
    slug: "partner-ecosystems-and-reputation",
    title: "Partner Ecosystems and Reputation",
    trackId: "battle",
    programName: "Battle Mastery",
    lessonInProgram: 3,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 98,
    slug: "clutch-hosting-and-crowd-turning",
    title: "Clutch Hosting and Crowd Turning",
    trackId: "battle",
    programName: "Battle Mastery",
    lessonInProgram: 4,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 99,
    slug: "battle-production-and-on-screen-clarity",
    title: "Battle Production and On-Screen Clarity",
    trackId: "battle",
    programName: "Battle Mastery",
    lessonInProgram: 5,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 100,
    slug: "battle-analytics-and-debrief-mastery",
    title: "Battle Analytics and Debrief Mastery",
    trackId: "battle",
    programName: "Battle Mastery",
    lessonInProgram: 6,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 101,
    slug: "multi-battle-nights-and-event-pacing",
    title: "Multi-Battle Nights and Event Pacing",
    trackId: "battle",
    programName: "Battle Mastery",
    lessonInProgram: 7,
    lessonsInProgram: 8,
  },
  {
    globalOrder: 102,
    slug: "battle-capstone-signature-battle-system",
    title: "Battle Capstone: Signature Battle System",
    trackId: "battle",
    programName: "Battle Mastery",
    lessonInProgram: 8,
    lessonsInProgram: 8,
  },
  // MUSIC LIVE MASTERY (10) — optional specialty after Core; Advanced Creator required for certificate
  {
    globalOrder: 103,
    slug: "music-live-formats-that-work",
    title: "Music LIVE Formats That Work",
    trackId: "music",
    programName: "Music LIVE Mastery",
    lessonInProgram: 1,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 104,
    slug: "performance-audio-for-musicians-on-live",
    title: "Performance Audio for Musicians on LIVE",
    trackId: "music",
    programName: "Music LIVE Mastery",
    lessonInProgram: 2,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 105,
    slug: "vocal-stamina-and-performance-presence",
    title: "Vocal Stamina and Performance Presence",
    trackId: "music",
    programName: "Music LIVE Mastery",
    lessonInProgram: 3,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 106,
    slug: "setlists-segments-and-audience-energy",
    title: "Setlists, Segments, and Audience Energy",
    trackId: "music",
    programName: "Music LIVE Mastery",
    lessonInProgram: 4,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 107,
    slug: "requests-tips-and-fan-interaction-systems",
    title: "Requests, Tips, and Fan Interaction Systems",
    trackId: "music",
    programName: "Music LIVE Mastery",
    lessonInProgram: 5,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 108,
    slug: "growing-a-music-audience-on-live",
    title: "Growing a Music Audience on LIVE",
    trackId: "music",
    programName: "Music LIVE Mastery",
    lessonInProgram: 6,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 109,
    slug: "music-rights-and-safer-live-choices",
    title: "Music Rights and Safer LIVE Choices",
    trackId: "music",
    programName: "Music LIVE Mastery",
    lessonInProgram: 7,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 110,
    slug: "collab-performances-and-guest-musicians",
    title: "Collab Performances and Guest Musicians",
    trackId: "music",
    programName: "Music LIVE Mastery",
    lessonInProgram: 8,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 111,
    slug: "monetizing-music-live-ethically",
    title: "Monetizing Music LIVE Ethically",
    trackId: "music",
    programName: "Music LIVE Mastery",
    lessonInProgram: 9,
    lessonsInProgram: 10,
  },
  {
    globalOrder: 112,
    slug: "music-live-capstone-signature-show",
    title: "Music LIVE Capstone: Signature Show",
    trackId: "music",
    programName: "Music LIVE Mastery",
    lessonInProgram: 10,
    lessonsInProgram: 10,
  },
  // GAMING LIVE MASTERY (12) — optional specialty after Music LIVE; Advanced Creator required for certificate
  {
    globalOrder: 113,
    slug: "choosing-your-gaming-live-setup",
    title: "Choosing Your Gaming LIVE Setup",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 1,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 114,
    slug: "gaming-commentary-systems-that-survive-high-focus",
    title: "Gaming Commentary Systems That Survive High Focus",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 2,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 115,
    slug: "reading-chat-without-losing-the-game",
    title: "Reading Chat Without Losing the Game",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 3,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 116,
    slug: "game-audio-mic-balance-and-discord-routing",
    title: "Game Audio, Mic Balance, and Discord Routing",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 4,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 117,
    slug: "tiktok-live-studio-for-gaming",
    title: "TikTok LIVE Studio for Gaming",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 5,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 118,
    slug: "obs-for-gaming-and-stream-key-reality",
    title: "OBS for Gaming and Stream-Key Reality",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 6,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 119,
    slug: "obs-virtual-camera-into-tiktok-live-studio",
    title: "OBS Virtual Camera into TikTok LIVE Studio",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 7,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 120,
    slug: "console-capture-and-party-chat-routing",
    title: "Console Capture and Party-Chat Routing",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 8,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 121,
    slug: "mobile-gaming-live-workflows",
    title: "Mobile Gaming LIVE Workflows",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 9,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 122,
    slug: "vertical-layouts-alerts-soundboards-and-tikfinity",
    title: "Vertical Layouts, Alerts, Soundboards, and TikFinity",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 10,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 123,
    slug: "gaming-community-moderation-troubleshooting-and-growth",
    title: "Gaming Community, Moderation, Troubleshooting, and Growth",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 11,
    lessonsInProgram: 12,
  },
  {
    globalOrder: 124,
    slug: "gaming-live-capstone-signature-show",
    title: "Gaming LIVE Capstone: Signature Gaming Show",
    trackId: "gaming",
    programName: "Gaming LIVE Mastery",
    lessonInProgram: 12,
    lessonsInProgram: 12,
  },
];

const CURRICULUM_BY_SLUG = new Map(CURRICULUM.map((l) => [l.slug, l]));

export const CURRICULUM_TOTAL_LESSONS = CURRICULUM.length;

/** First lesson in the program — primary entry for the hub hero. */
export const FIRST_PROGRAM_LESSON_SLUG = CURRICULUM[0].slug;

/** Opening sprint — setup + first safety lessons before regular LIVE. */
export function getStartHereCurriculumLessons(): CurriculumLesson[] {
  return CURRICULUM.slice(0, 4);
}

export function getCurriculumLesson(slug: string): CurriculumLesson | null {
  return CURRICULUM_BY_SLUG.get(slug) ?? null;
}

/** Sort key for mixing DB posts with curriculum order (unknown slugs sort last). */
export function getCurriculumOrderIndex(slug: string): number {
  const i = CURRICULUM.findIndex((l) => l.slug === slug);
  return i < 0 ? 9999 + slug.charCodeAt(0) : i;
}

export type CurriculumNeighbor = {
  slug: string;
  title: string;
  programName: string;
};

export function getCurriculumNeighbors(slug: string): {
  prev: CurriculumNeighbor | null;
  next: CurriculumNeighbor | null;
} {
  const idx = CURRICULUM.findIndex((l) => l.slug === slug);
  if (idx < 0) return { prev: null, next: null };
  const prev = idx > 0 ? CURRICULUM[idx - 1] : null;
  const next = idx < CURRICULUM.length - 1 ? CURRICULUM[idx + 1] : null;
  return {
    prev: prev
      ? { slug: prev.slug, title: prev.title, programName: prev.programName }
      : null,
    next: next
      ? { slug: next.slug, title: next.title, programName: next.programName }
      : null,
  };
}

/** Group ordered lessons for hub / docs — preserves STREAMERU_PROGRAM_NAMES order. */
export function curriculumByProgram(): { programName: string; lessons: CurriculumLesson[] }[] {
  const map = new Map<string, CurriculumLesson[]>();
  for (const l of CURRICULUM) {
    const list = map.get(l.programName) ?? [];
    list.push(l);
    map.set(l.programName, list);
  }
  return STREAMERU_PROGRAM_NAMES.map((programName) => ({
    programName,
    lessons: map.get(programName) ?? [],
  }));
}

/** Safety lessons living inside Beginner Foundations (track topic, not a separate program). */
export function isEssentialSafetyLesson(slug: string): boolean {
  const lesson = CURRICULUM_BY_SLUG.get(slug);
  return lesson?.trackId === "rules" && lesson.programName === "Beginner Foundations";
}
