/**
 * Assessment registry — lesson quizzes, program finals, graduation exam.
 */

import type {
  Assessment,
  GraduationExam,
  LessonQuiz,
  ProgramFinalExam,
} from "@/lib/assessments/types";
import type { TrainingTrackId } from "@/lib/resources/tracks";
import { CURRICULUM } from "@/lib/resources/curriculum";

import { quiz as startStrongOnTiktokLive } from "@/lib/assessments/quizzes/beginner/start-strong-on-tiktok-live";
import { quiz as yourFirstLiveStructure } from "@/lib/assessments/quizzes/beginner/your-first-live-structure";
import { quiz as first10TiktokLiveSessions } from "@/lib/assessments/quizzes/beginner/first-10-tiktok-live-sessions";
import { quiz as firstWeekOfLivesConsistency } from "@/lib/assessments/quizzes/beginner/first-week-of-lives-consistency";
import { quiz as commonLiveMistakesNewCreators } from "@/lib/assessments/quizzes/beginner/common-live-mistakes-new-creators";

import { quiz as talkingWithEmptyRoom } from "@/lib/assessments/quizzes/content/talking-with-empty-room";
import { quiz as hooksAndFirstImpressions } from "@/lib/assessments/quizzes/content/hooks-and-first-impressions";
import { quiz as contentLoopsRepeatableSegments } from "@/lib/assessments/quizzes/content/content-loops-repeatable-segments";
import { quiz as structuringLongerLives } from "@/lib/assessments/quizzes/content/structuring-longer-lives";
import { quiz as growthWeeklySystem } from "@/lib/assessments/quizzes/content/growth-weekly-system";

import { quiz as understandingBattles } from "@/lib/assessments/quizzes/battles/understanding-battles";
import { quiz as preparingForYourFirstBattle } from "@/lib/assessments/quizzes/battles/preparing-for-your-first-battle";
import { quiz as structureYourFirstBattleWeek } from "@/lib/assessments/quizzes/battles/structure-your-first-battle-week";
import { quiz as improvingBattlePerformance } from "@/lib/assessments/quizzes/battles/improving-battle-performance";
import { quiz as buildingBattlePartners } from "@/lib/assessments/quizzes/battles/building-battle-partners";

import { quiz as giftsGoalsMomentum } from "@/lib/assessments/quizzes/monetization/gifts-goals-momentum";
import { quiz as creatingReasonsToGift } from "@/lib/assessments/quizzes/monetization/creating-reasons-to-gift";
import { quiz as settingGoalsDuringLives } from "@/lib/assessments/quizzes/monetization/setting-goals-during-lives";
import { quiz as scalingConsistency } from "@/lib/assessments/quizzes/monetization/scaling-consistency";
import { quiz as buildingIncomeHabits } from "@/lib/assessments/quizzes/monetization/building-income-habits";

import { quiz as platformRulesNewLiveCreators } from "@/lib/assessments/quizzes/rules/platform-rules-new-live-creators";
import { quiz as whatGetsYouBanned } from "@/lib/assessments/quizzes/rules/what-gets-you-banned";
import { quiz as howToAvoidViolations } from "@/lib/assessments/quizzes/rules/how-to-avoid-violations";
import { quiz as longTermAccountSafety } from "@/lib/assessments/quizzes/rules/long-term-account-safety";
import { quiz as yourCreatorOperatingSystem } from "@/lib/assessments/quizzes/rules/your-creator-operating-system";
import { quiz as creatorBrandThatSurvivesTheFeed } from "@/lib/assessments/quizzes/rules/creator-brand-that-survives-the-feed";
import { quiz as readingYourLiveNumbers } from "@/lib/assessments/quizzes/rules/reading-your-live-numbers";
import { quiz as creativePlanningForRealWeeks } from "@/lib/assessments/quizzes/rules/creative-planning-for-real-weeks";
import { quiz as growthExperimentsThatDontWreckYourShow } from "@/lib/assessments/quizzes/rules/growth-experiments-that-dont-wreck-your-show";
import { quiz as professionalStandardsOnLive } from "@/lib/assessments/quizzes/rules/professional-standards-on-live";
import { quiz as privacySecurityAndPersonalBoundaries } from "@/lib/assessments/quizzes/rules/privacy-security-and-personal-boundaries";
import { quiz as advancedCreatorCapstone30DayProSprint } from "@/lib/assessments/quizzes/rules/advanced-creator-capstone-30-day-pro-sprint";

import { quiz as cameraPresenceOwningTheFrame } from "@/lib/assessments/quizzes/presence/camera-presence-owning-the-frame";
import { quiz as voiceThatHoldsARoom } from "@/lib/assessments/quizzes/presence/voice-that-holds-a-room";
import { quiz as confidenceWhenTheChatIsQuiet } from "@/lib/assessments/quizzes/presence/confidence-when-the-chat-is-quiet";
import { quiz as storytellingOnLiveNotScripts } from "@/lib/assessments/quizzes/presence/storytelling-on-live-not-scripts";
import { quiz as audiencePsychologyWhyPeopleStay } from "@/lib/assessments/quizzes/presence/audience-psychology-why-people-stay";
import { quiz as emotionalPacingAcrossALive } from "@/lib/assessments/quizzes/presence/emotional-pacing-across-a-live";
import { quiz as humorWarmthAndAuthenticity } from "@/lib/assessments/quizzes/presence/humor-warmth-and-authenticity";
import { quiz as handlingPressureMomentsLive } from "@/lib/assessments/quizzes/presence/handling-pressure-moments-live";
import { quiz as interviewEnergySoloAndGuests } from "@/lib/assessments/quizzes/presence/interview-energy-solo-and-guests";
import { quiz as presenceCapstoneSignature20MinuteLive } from "@/lib/assessments/quizzes/presence/presence-capstone-signature-20-minute-live";

import { quiz as findingYourNicheWithoutBoxingYourselfIn } from "@/lib/assessments/quizzes/creation/finding-your-niche-without-boxing-yourself-in";
import { quiz as becomingMemorableOnLive } from "@/lib/assessments/quizzes/creation/becoming-memorable-on-live";
import { quiz as creatingRecurringSegmentsViewersExpect } from "@/lib/assessments/quizzes/creation/creating-recurring-segments-viewers-expect";
import { quiz as runningThemedWeeks } from "@/lib/assessments/quizzes/creation/running-themed-weeks";
import { quiz as storyArcsAcrossMultipleLives } from "@/lib/assessments/quizzes/creation/story-arcs-across-multiple-lives";
import { quiz as communityEventsOnLive } from "@/lib/assessments/quizzes/creation/community-events-on-live";
import { quiz as interactiveShowsThatArentChaos } from "@/lib/assessments/quizzes/creation/interactive-shows-that-arent-chaos";
import { quiz as seasonalContentWithoutGimmicks } from "@/lib/assessments/quizzes/creation/seasonal-content-without-gimmicks";
import { quiz as buildingAnticipationBeforeAndDuringLive } from "@/lib/assessments/quizzes/creation/building-anticipation-before-and-during-live";
import { quiz as contentCreationCapstone7DayThemedLiveSeries } from "@/lib/assessments/quizzes/creation/content-creation-capstone-7-day-themed-live-series";

import { quiz as growthDiagnosisFramework } from "@/lib/assessments/quizzes/growth/growth-diagnosis-framework";
import { quiz as retentionScienceBeyondTheBasics } from "@/lib/assessments/quizzes/growth/retention-science-beyond-the-basics";
import { quiz as analyticsDeepDiveForLiveCreators } from "@/lib/assessments/quizzes/growth/analytics-deep-dive-for-live-creators";
import { quiz as experimentDesignForCreators } from "@/lib/assessments/quizzes/growth/experiment-design-for-creators";
import { quiz as schedulingAsStrategy } from "@/lib/assessments/quizzes/growth/scheduling-as-strategy";
import { quiz as discoveryInventoryNeverMissAPublishWindow } from "@/lib/assessments/quizzes/growth/discovery-inventory-never-miss-a-publish-window";
import { quiz as algorithmDurableGrowth } from "@/lib/assessments/quizzes/growth/algorithm-durable-growth";
import { quiz as clipsDiscoveryAndLive } from "@/lib/assessments/quizzes/growth/clips-discovery-and-live";
import { quiz as aiForLiveCreators } from "@/lib/assessments/quizzes/growth/ai-for-live-creators";
import { quiz as collaborationGrowthWithoutBegging } from "@/lib/assessments/quizzes/growth/collaboration-growth-without-begging";
import { quiz as fromSpikeToStableGrowth } from "@/lib/assessments/quizzes/growth/from-spike-to-stable-growth";
import { quiz as growthCapstone30DayGrowthExperiment } from "@/lib/assessments/quizzes/growth/growth-capstone-30-day-growth-experiment";

import { quiz as communityDesignBelongingOnPurpose } from "@/lib/assessments/quizzes/community/community-design-belonging-on-purpose";
import { quiz as chatCultureAndReturnViewerHabits } from "@/lib/assessments/quizzes/community/chat-culture-and-return-viewer-habits";
import { quiz as moderationSystemsThatScale } from "@/lib/assessments/quizzes/community/moderation-systems-that-scale";
import { quiz as conflictTrollsAndBoundaryEnforcement } from "@/lib/assessments/quizzes/community/conflict-trolls-and-boundary-enforcement";
import { quiz as protectingCommunityHealthAndYourself } from "@/lib/assessments/quizzes/community/protecting-community-health-and-yourself";
import { quiz as accessibilityAndInclusionInCommunitySpaces } from "@/lib/assessments/quizzes/community/accessibility-and-inclusion-in-community-spaces";
import { quiz as guestHostingThatElevatesBothAudiences } from "@/lib/assessments/quizzes/community/guest-hosting-that-elevates-both-audiences";
import { quiz as interviewingSkillsForCreators } from "@/lib/assessments/quizzes/community/interviewing-skills-for-creators";
import { quiz as professionalNetworkingForCreators } from "@/lib/assessments/quizzes/community/professional-networking-for-creators";
import { quiz as communityCapstoneCommunityAppreciationEvent } from "@/lib/assessments/quizzes/community/community-capstone-community-appreciation-event";

import { quiz as positioningForMoneyWithoutSellingYourSoul } from "@/lib/assessments/quizzes/professional/positioning-for-money-without-selling-your-soul";
import { quiz as offerDesignForLiveCreators } from "@/lib/assessments/quizzes/professional/offer-design-for-live-creators";
import { quiz as incomeSystemsAndMoneyOperations } from "@/lib/assessments/quizzes/professional/income-systems-and-money-operations";
import { quiz as readingBusinessHealthBeyondGiftTotals } from "@/lib/assessments/quizzes/professional/reading-business-health-beyond-gift-totals";
import { quiz as copyrightAndIpAwarenessForCreators } from "@/lib/assessments/quizzes/professional/copyright-and-ip-awareness-for-creators";
import { quiz as brandDealsAndPartnerCommunication } from "@/lib/assessments/quizzes/professional/brand-deals-and-partner-communication";
import { quiz as privacySecurityAndReputationAsBusinessAssets } from "@/lib/assessments/quizzes/professional/privacy-security-and-reputation-as-business-assets";
import { quiz as contractsLiteracyForCreators } from "@/lib/assessments/quizzes/professional/contracts-literacy-for-creators";
import { quiz as timeCapacityAndSayingNo } from "@/lib/assessments/quizzes/professional/time-capacity-and-saying-no";
import { quiz as professionalCreatorCapstoneCreatorOperatingManual } from "@/lib/assessments/quizzes/professional/professional-creator-capstone-creator-operating-manual";

import { exam as finalBeginner } from "@/lib/assessments/exams/program-beginner";
import { exam as finalContent } from "@/lib/assessments/exams/program-content";
import { exam as finalBattles } from "@/lib/assessments/exams/program-battles";
import { exam as finalMonetization } from "@/lib/assessments/exams/program-monetization";
import { exam as finalRules } from "@/lib/assessments/exams/program-rules";
import { exam as finalPresence } from "@/lib/assessments/exams/program-presence";
import { exam as finalCreation } from "@/lib/assessments/exams/program-creation";
import { exam as finalGrowth } from "@/lib/assessments/exams/program-growth";
import { exam as finalCommunity } from "@/lib/assessments/exams/program-community";
import { exam as finalProfessional } from "@/lib/assessments/exams/program-professional";
import { exam as graduation } from "@/lib/assessments/exams/graduation";

const LESSON_QUIZZES: LessonQuiz[] = [
  startStrongOnTiktokLive,
  yourFirstLiveStructure,
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
  scalingConsistency,
  buildingIncomeHabits,
  platformRulesNewLiveCreators,
  whatGetsYouBanned,
  howToAvoidViolations,
  longTermAccountSafety,
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
  positioningForMoneyWithoutSellingYourSoul,
  offerDesignForLiveCreators,
  incomeSystemsAndMoneyOperations,
  readingBusinessHealthBeyondGiftTotals,
  copyrightAndIpAwarenessForCreators,
  brandDealsAndPartnerCommunication,
  privacySecurityAndReputationAsBusinessAssets,
  contractsLiteracyForCreators,
  timeCapacityAndSayingNo,
  professionalCreatorCapstoneCreatorOperatingManual,
];

const PROGRAM_FINALS: ProgramFinalExam[] = [
  finalBeginner,
  finalContent,
  finalBattles,
  finalMonetization,
  finalRules,
  finalPresence,
  finalCreation,
  finalGrowth,
  finalCommunity,
  finalProfessional,
];

const QUIZ_BY_SLUG = new Map(LESSON_QUIZZES.map((q) => [q.lessonSlug, q]));
const FINAL_BY_PROGRAM = new Map(PROGRAM_FINALS.map((e) => [e.programKey, e]));
const ASSESSMENT_BY_KEY = new Map<string, Assessment>();

for (const q of LESSON_QUIZZES) ASSESSMENT_BY_KEY.set(q.key, q);
for (const e of PROGRAM_FINALS) ASSESSMENT_BY_KEY.set(e.key, e);
ASSESSMENT_BY_KEY.set(graduation.key, graduation);

export function getLessonQuiz(slug: string): LessonQuiz | null {
  return QUIZ_BY_SLUG.get(slug) ?? null;
}

export function getProgramFinal(
  programKey: TrainingTrackId | string,
): ProgramFinalExam | null {
  return FINAL_BY_PROGRAM.get(programKey as TrainingTrackId) ?? null;
}

export function getGraduationExam(): GraduationExam {
  return graduation;
}

export function getAssessmentByKey(key: string): Assessment | null {
  return ASSESSMENT_BY_KEY.get(key) ?? null;
}

export function listLessonQuizzes(): LessonQuiz[] {
  return LESSON_QUIZZES;
}

export function listProgramFinals(): ProgramFinalExam[] {
  return PROGRAM_FINALS;
}

/** Public quiz payload — strips correctness until graded server-side... actually client needs to show choices. Correctness revealed after submit. */
export function publicQuizView(assessment: Assessment) {
  return {
    key: assessment.key,
    kind: assessment.kind,
    title: assessment.title,
    questionCount: assessment.questions.length,
    questions: assessment.questions.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      choices: q.choices.map((c) => ({ id: c.id, text: c.text })),
    })),
  };
}

export function assertCurriculumQuizzesComplete(): string[] {
  const missing: string[] = [];
  for (const lesson of CURRICULUM) {
    if (!QUIZ_BY_SLUG.has(lesson.slug)) missing.push(lesson.slug);
  }
  return missing;
}
