import type { GuideCategoryId } from "./types";

export type GuideCategory = {
  id: GuideCategoryId;
  name: string;
  description: string;
  /** Branding icon path under /public */
  icon: string;
};

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: "fundamentals",
    name: "TikTok LIVE Fundamentals",
    description: "Core concepts for going live with structure and consistency.",
    icon: "/branding/icons/training.svg",
  },
  {
    id: "growth",
    name: "Creator Growth",
    description: "Retention, discovery, and systems that compound weekly.",
    icon: "/branding/icons/growth.svg",
  },
  {
    id: "monetization",
    name: "Monetization",
    description: "How LIVE creators earn sustainably without risky shortcuts.",
    icon: "/branding/icons/monetization.svg",
  },
  {
    id: "agencies-networks",
    name: "Agencies and Networks",
    description: "How agencies, creator networks, and join paths actually work.",
    icon: "/branding/icons/community.svg",
  },
  {
    id: "battles",
    name: "Battles",
    description: "Battle strategy, scheduling, and competitive LIVE ops.",
    icon: "/branding/icons/battle.svg",
  },
  {
    id: "training-coaching",
    name: "Training and Coaching",
    description: "StreamerU curriculum, coaching, and skill development.",
    icon: "/branding/icons/coach.svg",
  },
  {
    id: "streaming-setup",
    name: "Streaming Setup",
    description: "Practical setup guidance for stronger LIVE sessions.",
    icon: "/branding/icons/schedule.svg",
  },
  {
    id: "community",
    name: "Community and Collaboration",
    description: "Networks, collaboration, and creator communities that operate.",
    icon: "/branding/icons/community.svg",
  },
  {
    id: "recruiting",
    name: "Recruiting",
    description: "How creator recruiting works — and how to evaluate outreach.",
    icon: "/branding/icons/creator.svg",
  },
  {
    id: "safety",
    name: "Creator Safety and Policies",
    description: "Account safety, platform norms, and sustainable practices.",
    icon: "/branding/icons/profile.svg",
  },
  {
    id: "comparisons",
    name: "Comparisons",
    description: "Honest trade-offs between solo, agency, MCN, and coaching paths.",
    icon: "/branding/icons/analytics.svg",
  },
];

export function getCategory(id: GuideCategoryId): GuideCategory {
  const found = GUIDE_CATEGORIES.find((c) => c.id === id);
  if (!found) {
    throw new Error(`Unknown guide category: ${id}`);
  }
  return found;
}
