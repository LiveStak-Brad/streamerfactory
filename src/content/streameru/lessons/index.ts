import type { ExpandedLesson } from "@/content/streameru/types";
import { lesson as startStrongOnTiktokLive } from "./start-strong-on-tiktok-live";
import { lesson as yourFirstLiveStructure } from "./your-first-live-structure";
import { lesson as platformRulesNewLiveCreators } from "./platform-rules-new-live-creators";
import { lesson as whatGetsYouBanned } from "./what-gets-you-banned";
import { lesson as howToAvoidViolations } from "./how-to-avoid-violations";
import { lesson as longTermAccountSafety } from "./long-term-account-safety";
import { lesson as first10TiktokLiveSessions } from "./first-10-tiktok-live-sessions";
import { lesson as firstWeekOfLivesConsistency } from "./first-week-of-lives-consistency";
import { lesson as commonLiveMistakesNewCreators } from "./common-live-mistakes-new-creators";
import { lesson as talkingWithEmptyRoom } from "./talking-with-empty-room";
import { lesson as hooksAndFirstImpressions } from "./hooks-and-first-impressions";
import { lesson as contentLoopsRepeatableSegments } from "./content-loops-repeatable-segments";
import { lesson as structuringLongerLives } from "./structuring-longer-lives";
import { lesson as growthWeeklySystem } from "./growth-weekly-system";
import { lesson as understandingBattles } from "./understanding-battles";
import { lesson as preparingForYourFirstBattle } from "./preparing-for-your-first-battle";
import { lesson as structureYourFirstBattleWeek } from "./structure-your-first-battle-week";
import { lesson as improvingBattlePerformance } from "./improving-battle-performance";
import { lesson as buildingBattlePartners } from "./building-battle-partners";
import { lesson as giftsGoalsMomentum } from "./gifts-goals-momentum";
import { lesson as creatingReasonsToGift } from "./creating-reasons-to-gift";
import { lesson as settingGoalsDuringLives } from "./setting-goals-during-lives";
import { lesson as buildingIncomeHabits } from "./building-income-habits";
import { lesson as scalingConsistency } from "./scaling-consistency";

/**
 * Expanded lesson bodies registered for override.
 * Unregistered curriculum slugs keep CMS/DB content via `applyExpandedLessonContent`
 * (missing modules fail open to CMS — they do not hide real content errors).
 */
const LESSONS: ExpandedLesson[] = [
  startStrongOnTiktokLive,
  yourFirstLiveStructure,
  platformRulesNewLiveCreators,
  whatGetsYouBanned,
  howToAvoidViolations,
  longTermAccountSafety,
  first10TiktokLiveSessions,
  firstWeekOfLivesConsistency,
  commonLiveMistakesNewCreators,
  talkingWithEmptyRoom,
  hooksAndFirstImpressions,
  contentLoopsRepeatableSegments,
  structuringLongerLives,
  growthWeeklySystem,
  understandingBattles,
  preparingForYourFirstBattle,
  structureYourFirstBattleWeek,
  improvingBattlePerformance,
  buildingBattlePartners,
  giftsGoalsMomentum,
  creatingReasonsToGift,
  settingGoalsDuringLives,
  buildingIncomeHabits,
  scalingConsistency,
];

const BY_SLUG = new Map(LESSONS.map((l) => [l.slug, l]));

export function getExpandedLesson(slug: string): ExpandedLesson | null {
  return BY_SLUG.get(slug) ?? null;
}

export function listExpandedLessons(): ExpandedLesson[] {
  return LESSONS;
}
