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
import { lesson as yourCreatorOperatingSystem } from "./your-creator-operating-system";
import { lesson as creatorBrandThatSurvivesTheFeed } from "./creator-brand-that-survives-the-feed";
import { lesson as readingYourLiveNumbers } from "./reading-your-live-numbers";
import { lesson as creativePlanningForRealWeeks } from "./creative-planning-for-real-weeks";
import { lesson as growthExperimentsThatDontWreckYourShow } from "./growth-experiments-that-dont-wreck-your-show";
import { lesson as professionalStandardsOnLive } from "./professional-standards-on-live";
import { lesson as privacySecurityAndPersonalBoundaries } from "./privacy-security-and-personal-boundaries";
import { lesson as advancedCreatorCapstone30DayProSprint } from "./advanced-creator-capstone-30-day-pro-sprint";
import { lesson as cameraPresenceOwningTheFrame } from "./camera-presence-owning-the-frame";
import { lesson as voiceThatHoldsARoom } from "./voice-that-holds-a-room";
import { lesson as confidenceWhenTheChatIsQuiet } from "./confidence-when-the-chat-is-quiet";
import { lesson as storytellingOnLiveNotScripts } from "./storytelling-on-live-not-scripts";
import { lesson as audiencePsychologyWhyPeopleStay } from "./audience-psychology-why-people-stay";
import { lesson as emotionalPacingAcrossALive } from "./emotional-pacing-across-a-live";
import { lesson as humorWarmthAndAuthenticity } from "./humor-warmth-and-authenticity";
import { lesson as handlingPressureMomentsLive } from "./handling-pressure-moments-live";
import { lesson as interviewEnergySoloAndGuests } from "./interview-energy-solo-and-guests";
import { lesson as presenceCapstoneSignature20MinuteLive } from "./presence-capstone-signature-20-minute-live";
import { lesson as findingYourNicheWithoutBoxingYourselfIn } from "./finding-your-niche-without-boxing-yourself-in";
import { lesson as becomingMemorableOnLive } from "./becoming-memorable-on-live";
import { lesson as creatingRecurringSegmentsViewersExpect } from "./creating-recurring-segments-viewers-expect";
import { lesson as runningThemedWeeks } from "./running-themed-weeks";
import { lesson as storyArcsAcrossMultipleLives } from "./story-arcs-across-multiple-lives";
import { lesson as communityEventsOnLive } from "./community-events-on-live";
import { lesson as interactiveShowsThatArentChaos } from "./interactive-shows-that-arent-chaos";
import { lesson as seasonalContentWithoutGimmicks } from "./seasonal-content-without-gimmicks";
import { lesson as buildingAnticipationBeforeAndDuringLive } from "./building-anticipation-before-and-during-live";
import { lesson as contentCreationCapstone7DayThemedLiveSeries } from "./content-creation-capstone-7-day-themed-live-series";
import { lesson as growthDiagnosisFramework } from "./growth-diagnosis-framework";
import { lesson as retentionScienceBeyondTheBasics } from "./retention-science-beyond-the-basics";
import { lesson as analyticsDeepDiveForLiveCreators } from "./analytics-deep-dive-for-live-creators";
import { lesson as experimentDesignForCreators } from "./experiment-design-for-creators";
import { lesson as schedulingAsStrategy } from "./scheduling-as-strategy";
import { lesson as discoveryInventoryNeverMissAPublishWindow } from "./discovery-inventory-never-miss-a-publish-window";
import { lesson as algorithmDurableGrowth } from "./algorithm-durable-growth";
import { lesson as clipsDiscoveryAndLive } from "./clips-discovery-and-live";
import { lesson as aiForLiveCreators } from "./ai-for-live-creators";
import { lesson as collaborationGrowthWithoutBegging } from "./collaboration-growth-without-begging";
import { lesson as fromSpikeToStableGrowth } from "./from-spike-to-stable-growth";
import { lesson as growthCapstone30DayGrowthExperiment } from "./growth-capstone-30-day-growth-experiment";
import { lesson as communityDesignBelongingOnPurpose } from "./community-design-belonging-on-purpose";
import { lesson as chatCultureAndReturnViewerHabits } from "./chat-culture-and-return-viewer-habits";
import { lesson as moderationSystemsThatScale } from "./moderation-systems-that-scale";
import { lesson as conflictTrollsAndBoundaryEnforcement } from "./conflict-trolls-and-boundary-enforcement";
import { lesson as protectingCommunityHealthAndYourself } from "./protecting-community-health-and-yourself";
import { lesson as accessibilityAndInclusionInCommunitySpaces } from "./accessibility-and-inclusion-in-community-spaces";
import { lesson as guestHostingThatElevatesBothAudiences } from "./guest-hosting-that-elevates-both-audiences";
import { lesson as interviewingSkillsForCreators } from "./interviewing-skills-for-creators";
import { lesson as professionalNetworkingForCreators } from "./professional-networking-for-creators";
import { lesson as communityCapstoneCommunityAppreciationEvent } from "./community-capstone-community-appreciation-event";

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
  yourCreatorOperatingSystem,
  creatorBrandThatSurvivesTheFeed,
  readingYourLiveNumbers,
  creativePlanningForRealWeeks,
  growthExperimentsThatDontWreckYourShow,
  professionalStandardsOnLive,
  privacySecurityAndPersonalBoundaries,
  advancedCreatorCapstone30DayProSprint,
  cameraPresenceOwningTheFrame,
  voiceThatHoldsARoom,
  confidenceWhenTheChatIsQuiet,
  storytellingOnLiveNotScripts,
  audiencePsychologyWhyPeopleStay,
  emotionalPacingAcrossALive,
  humorWarmthAndAuthenticity,
  handlingPressureMomentsLive,
  interviewEnergySoloAndGuests,
  presenceCapstoneSignature20MinuteLive,
  findingYourNicheWithoutBoxingYourselfIn,
  becomingMemorableOnLive,
  creatingRecurringSegmentsViewersExpect,
  runningThemedWeeks,
  storyArcsAcrossMultipleLives,
  communityEventsOnLive,
  interactiveShowsThatArentChaos,
  seasonalContentWithoutGimmicks,
  buildingAnticipationBeforeAndDuringLive,
  contentCreationCapstone7DayThemedLiveSeries,
  growthDiagnosisFramework,
  retentionScienceBeyondTheBasics,
  analyticsDeepDiveForLiveCreators,
  experimentDesignForCreators,
  schedulingAsStrategy,
  discoveryInventoryNeverMissAPublishWindow,
  algorithmDurableGrowth,
  clipsDiscoveryAndLive,
  aiForLiveCreators,
  collaborationGrowthWithoutBegging,
  fromSpikeToStableGrowth,
  growthCapstone30DayGrowthExperiment,
  communityDesignBelongingOnPurpose,
  chatCultureAndReturnViewerHabits,
  moderationSystemsThatScale,
  conflictTrollsAndBoundaryEnforcement,
  protectingCommunityHealthAndYourself,
  accessibilityAndInclusionInCommunitySpaces,
  guestHostingThatElevatesBothAudiences,
  interviewingSkillsForCreators,
  professionalNetworkingForCreators,
  communityCapstoneCommunityAppreciationEvent,
];

const BY_SLUG = new Map(LESSONS.map((l) => [l.slug, l]));

export function getExpandedLesson(slug: string): ExpandedLesson | null {
  return BY_SLUG.get(slug) ?? null;
}

export function listExpandedLessons(): ExpandedLesson[] {
  return LESSONS;
}
