import { CURRICULUM } from "@/lib/resources/curriculum";
import { getLessonQuiz } from "@/lib/assessments/registry";
import { getMissionForLessonSlug } from "@/lib/resources/training-missions";
import { getLessonSeo } from "@/lib/resources/lesson-seo";
import { getResourcesForLesson } from "@/lib/streameru-library/by-lesson";
import { getBriefForLesson } from "@/lib/streameru-media/production-briefs";
import type {
  LessonChecklistItem,
  LessonMediaAsset,
  LessonProductionScore,
} from "@/lib/streameru-media/types";

export function scoreLessonProduction(
  slug: string,
  assets: LessonMediaAsset[],
): LessonProductionScore {
  const quiz = getLessonQuiz(slug);
  const mission = getMissionForLessonSlug(slug);
  const seo = getLessonSeo(slug);
  const library = getResourcesForLesson(slug);
  const readyLibrary = library.filter((r) => r.status === "ready");
  const brief = getBriefForLesson(slug);
  const published = assets.filter((a) => a.status === "published");
  const planned = brief?.assets.length ?? 0;
  const plannedEssential = brief?.assets.filter((a) => a.priority === "essential").length ?? 0;
  const publishedEssential = published.filter((a) => a.priority === "essential").length;

  const coreTeaching = CURRICULUM.some((l) => l.slug === slug) ? "complete" : "missing";
  const assessment = quiz && quiz.questions.length >= 5 ? "complete" : "missing";
  const practice = mission ? "complete" : "missing";
  const resources =
    readyLibrary.length > 0 ? "complete" : library.length > 0 ? "partial" : "optional";

  const publishBits = [
    coreTeaching === "complete",
    assessment === "complete",
    practice === "complete",
    Boolean(seo),
  ];
  const publishReadyPercent = Math.round(
    (publishBits.filter(Boolean).length / publishBits.length) * 100,
  );

  const mediaEnhanced = published.length > 0 || readyLibrary.length > 0;
  const enhancementTargets = Math.max(planned, 1);
  const enhancementPercent = Math.round(
    (Math.min(published.length, enhancementTargets) / enhancementTargets) * 100,
  );

  const fullyPolished =
    publishReadyPercent === 100 &&
    (planned === 0 || published.length >= planned) &&
    (plannedEssential === 0 || publishedEssential >= plannedEssential);

  let category: LessonProductionScore["category"] = "publish_ready";
  if (fullyPolished) category = "fully_polished";
  else if (mediaEnhanced && publishReadyPercent === 100) category = "media_enhanced";
  else if (resources === "complete" && publishReadyPercent === 100) category = "resource_complete";
  else if (practice === "complete" && assessment === "complete") category = "practice_complete";
  else if (assessment === "complete") category = "assessment_complete";
  else if (coreTeaching === "complete") category = "core_teaching_complete";

  return {
    publishReadyPercent,
    enhancementPercent,
    coreTeaching,
    assessment,
    practice,
    resources,
    mediaEnhanced,
    fullyPolished,
    category,
  };
}

export function buildLessonChecklist(
  slug: string,
  assets: LessonMediaAsset[],
): LessonChecklistItem[] {
  const quiz = getLessonQuiz(slug);
  const mission = getMissionForLessonSlug(slug);
  const seo = getLessonSeo(slug);
  const library = getResourcesForLesson(slug);
  const readyLibrary = library.filter((r) => r.status === "ready");
  const brief = getBriefForLesson(slug);
  const published = assets.filter((a) => a.status === "published");
  const needsBrad = assets.filter(
    (a) =>
      (a.status === "requested" || a.status === "draft") &&
      (a.ownership === "needs_brad" || a.ownership === "brad_must_approve"),
  );
  const readyReview = assets.filter((a) => a.status === "ready");
  const shots = brief?.assets.filter((a) => a.assetType === "screenshot" || a.assetType === "photo") ?? [];
  const diagrams = brief?.assets.filter((a) => a.assetType === "diagram") ?? [];
  const founder = brief?.assets.filter((a) => a.assetType === "founder_story") ?? [];

  const pubShots = published.filter((a) => a.asset_type === "screenshot" || a.asset_type === "photo");
  const pubDiagrams = published.filter((a) => a.asset_type === "diagram");
  const pubFounder = published.filter((a) => a.asset_type === "founder_story");

  return [
    {
      key: "body",
      label: "Lesson body",
      status: CURRICULUM.some((l) => l.slug === slug) ? "complete" : "missing",
    },
    {
      key: "quiz",
      label: "Quiz",
      status: quiz ? "complete" : "missing",
      detail: quiz ? `${quiz.questions.length} questions` : undefined,
    },
    {
      key: "mission",
      label: "LIVE mission",
      status: mission ? "complete" : "missing",
    },
    {
      key: "seo",
      label: "FAQ and SEO",
      status: seo ? "complete" : "optional",
      detail: seo ? `${seo.faqs.length} FAQs` : undefined,
    },
    {
      key: "worksheets",
      label: "Worksheets / printables",
      status: readyLibrary.length > 0 ? "published" : library.length > 0 ? "optional" : "optional",
      detail: `${readyLibrary.length} ready`,
    },
    {
      key: "screenshots",
      label: "Screenshots / photos",
      status:
        shots.length === 0
          ? "optional"
          : pubShots.length >= shots.filter((s) => s.priority === "essential").length &&
              shots.some((s) => s.priority === "essential")
            ? "published"
            : needsBrad.some((a) => a.asset_type === "screenshot" || a.asset_type === "photo")
              ? "needs_brad"
              : pubShots.length > 0
                ? "optional"
                : "optional",
      detail: `${pubShots.length}/${shots.length} published`,
    },
    {
      key: "diagrams",
      label: "Diagrams",
      status:
        diagrams.length === 0
          ? "optional"
          : pubDiagrams.length > 0
            ? "published"
            : "agent_can_complete",
      detail: `${pubDiagrams.length}/${diagrams.length} published`,
    },
    {
      key: "founder",
      label: "Founder insight",
      status:
        founder.length === 0
          ? "optional"
          : pubFounder.length > 0
            ? "published"
            : "needs_brad",
      detail: `${pubFounder.length}/${founder.length} published`,
    },
    {
      key: "links",
      label: "Related links",
      status: seo && seo.internalLinks.length > 0 ? "complete" : "optional",
    },
    {
      key: "mobile",
      label: "Mobile preview",
      status: "optional",
      detail: "Open public lesson on phone after publishing media",
    },
    {
      key: "review",
      label: "Assets ready for review",
      status: readyReview.length > 0 ? "ready_for_review" : "complete",
      detail: readyReview.length ? `${readyReview.length} awaiting publish` : "None pending",
    },
    {
      key: "publication",
      label: "Publication readiness",
      status:
        quiz && mission && CURRICULUM.some((l) => l.slug === slug) ? "complete" : "missing",
      detail: "Lesson + quiz + mission = publish-ready (media optional)",
    },
  ];
}
