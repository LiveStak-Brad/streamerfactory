/**
 * StreamerU assessment submit + projection helpers.
 * Awards StreamerU XP only (never Factory Reputation).
 */

import { createClient } from "@/lib/supabase/server";
import { appendProgressEvent, emitChildEvent, listMemberEvents } from "@/lib/growth/progress/events";
import { getAssessmentByKey } from "@/lib/assessments/registry";
import { gradeAssessment } from "@/lib/assessments/scoring";
import { buildMasterySnapshot } from "@/lib/assessments/mastery";
import {
  totalXp,
  xpAwardsForPassedAttempt,
  type StreamerUXpAward,
} from "@/lib/assessments/xp";
import { listAcademyPrograms } from "@/lib/assessments/programs";
import type {
  AchievementSuggestion,
  AssessmentAnswerMap,
  GradedAttempt,
  MasterySnapshot,
} from "@/lib/assessments/types";
import type { ProgressEventRow } from "@/lib/growth/types";

export type SubmitAssessmentResult =
  | {
      ok: true;
      graded: GradedAttempt;
      xpAwarded: number;
      awards: StreamerUXpAward[];
      mastery: MasterySnapshot;
      streameruXpTotal: number;
      newlyUnlocked: AchievementSuggestion[];
      firstPass: boolean;
    }
  | { error: string };

async function hasPassedBefore(
  memberId: string,
  assessmentKey: string,
): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("streameru_quiz_attempts")
    .select("id")
    .eq("member_id", memberId)
    .eq("assessment_key", assessmentKey)
    .eq("passed", true)
    .limit(1)
    .maybeSingle();
  return Boolean(data);
}

async function awardStreamerUXp(opts: {
  memberId: string;
  awards: StreamerUXpAward[];
  assessmentKey: string;
  sourceEventId: string;
}): Promise<number> {
  if (opts.awards.length === 0) return 0;
  const supabase = await createClient();
  let awarded = 0;

  for (const award of opts.awards) {
    const idempotencyKey = `streameru_xp:${award.reason}:${opts.assessmentKey}`;
    const { error } = await supabase.from("streameru_xp_ledger").insert({
      member_id: opts.memberId,
      amount: award.amount,
      reason: award.reason,
      assessment_key: opts.assessmentKey,
      progress_event_id: opts.sourceEventId,
      metadata: {},
      idempotency_key: idempotencyKey,
    });
    if (error) continue;
    awarded += award.amount;

    await emitChildEvent({
      memberId: opts.memberId,
      eventType: "streameru_xp_earned",
      subjectKey: opts.assessmentKey,
      metadata: {
        reason: award.reason,
        amount: award.amount,
        assessment_key: opts.assessmentKey,
      },
      idempotencyKey: `streameru_xp_earned:${idempotencyKey}`,
      sourceEventId: opts.sourceEventId,
      depth: 0,
    });
  }

  return awarded;
}

export async function loadMasterySnapshot(
  memberId: string,
): Promise<MasterySnapshot> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("streameru_mastery")
    .select("scope, scope_key, best_percent")
    .eq("member_id", memberId);

  const bestQuiz: Record<string, number> = {};

  for (const row of data ?? []) {
    const pct = Number(row.best_percent ?? 0);
    if (row.scope === "lesson") bestQuiz[row.scope_key as string] = pct;
  }

  const programFinals: Record<string, number> = {};
  let graduation: number | undefined;

  const { data: attempts } = await supabase
    .from("streameru_quiz_attempts")
    .select("kind, lesson_slug, program_key, score_percent")
    .eq("member_id", memberId);

  for (const a of attempts ?? []) {
    const pct = Number(a.score_percent ?? 0);
    if (a.kind === "lesson_quiz" && a.lesson_slug) {
      bestQuiz[a.lesson_slug as string] = Math.max(
        bestQuiz[a.lesson_slug as string] ?? 0,
        pct,
      );
    }
    if (a.kind === "program_final" && a.program_key) {
      programFinals[a.program_key as string] = Math.max(
        programFinals[a.program_key as string] ?? 0,
        pct,
      );
    }
    if (a.kind === "graduation") {
      graduation = Math.max(graduation ?? 0, pct);
    }
  }

  return buildMasterySnapshot({
    bestQuizPercentBySlug: bestQuiz,
    programFinalBestByKey: programFinals,
    graduationBestPercent: graduation,
  });
}

async function projectMasteryRows(
  memberId: string,
  snapshot: MasterySnapshot,
): Promise<void> {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const rows: {
    member_id: string;
    scope: string;
    scope_key: string;
    best_percent: number;
    updated_at: string;
  }[] = [];

  for (const [slug, pct] of Object.entries(snapshot.lesson)) {
    rows.push({
      member_id: memberId,
      scope: "lesson",
      scope_key: slug,
      best_percent: pct,
      updated_at: now,
    });
  }
  for (const [key, pct] of Object.entries(snapshot.program)) {
    rows.push({
      member_id: memberId,
      scope: "program",
      scope_key: key,
      best_percent: pct,
      updated_at: now,
    });
  }
  rows.push({
    member_id: memberId,
    scope: "academy",
    scope_key: "streameru",
    best_percent: snapshot.academy,
    updated_at: now,
  });

  for (const row of rows) {
    const { data: existing } = await supabase
      .from("streameru_mastery")
      .select("best_percent")
      .eq("member_id", memberId)
      .eq("scope", row.scope)
      .eq("scope_key", row.scope_key)
      .maybeSingle();

    const prior = Number(existing?.best_percent ?? 0);
    if (existing && prior >= row.best_percent) continue;

    await supabase.from("streameru_mastery").upsert(row, {
      onConflict: "member_id,scope,scope_key",
    });
  }
}

async function listNewlyUnlocked(
  memberId: string,
  beforeKeys: Set<string>,
): Promise<AchievementSuggestion[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("member_achievements")
    .select("achievement_key, unlocked_at")
    .eq("member_id", memberId)
    .not("unlocked_at", "is", null);

  const newKeys = (data ?? [])
    .map((r) => r.achievement_key as string)
    .filter((key) => !beforeKeys.has(key));
  if (newKeys.length === 0) return [];

  const { data: defs } = await supabase
    .from("achievement_definitions")
    .select("key, name, description, icon")
    .in("key", newKeys);

  const byKey = new Map((defs ?? []).map((d) => [d.key as string, d]));
  return newKeys.map((key) => {
    const d = byKey.get(key);
    return {
      key,
      name: (d?.name as string | undefined) ?? key,
      description: (d?.description as string | undefined) ?? "",
      icon: (d?.icon as string | null | undefined) ?? null,
    };
  });
}

async function currentAchievementKeys(memberId: string): Promise<Set<string>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("member_achievements")
    .select("achievement_key")
    .eq("member_id", memberId)
    .not("unlocked_at", "is", null);
  return new Set((data ?? []).map((r) => r.achievement_key as string));
}

export async function getStreamerUXpTotal(memberId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("streameru_xp_ledger")
    .select("amount")
    .eq("member_id", memberId);
  return (data ?? []).reduce((sum, r) => sum + Number(r.amount ?? 0), 0);
}

export async function memberHasPassedAssessment(
  memberId: string,
  assessmentKey: string,
): Promise<boolean> {
  return hasPassedBefore(memberId, assessmentKey);
}

export async function listPassedAssessmentKeys(
  memberId: string,
): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("streameru_quiz_attempts")
    .select("assessment_key")
    .eq("member_id", memberId)
    .eq("passed", true);
  return [...new Set((data ?? []).map((r) => r.assessment_key as string))];
}

export async function submitAssessmentAttempt(opts: {
  memberId: string;
  assessmentKey: string;
  answers: AssessmentAnswerMap;
}): Promise<SubmitAssessmentResult> {
  const assessment = getAssessmentByKey(opts.assessmentKey);
  if (!assessment) return { error: "Unknown assessment" };

  const graded = gradeAssessment(assessment, opts.answers);
  const alreadyPassed = await hasPassedBefore(opts.memberId, assessment.key);
  const awards = graded.passed
    ? xpAwardsForPassedAttempt({
        kind: assessment.kind,
        perfect: graded.perfect,
        alreadyPassedBefore: alreadyPassed,
      })
    : [];
  const xpAmount = totalXp(awards);
  const beforeAchievements = await currentAchievementKeys(opts.memberId);

  let eventType: ProgressEventRow["event_type"] | string = graded.passed
    ? "quiz_passed"
    : "quiz_failed";
  if (assessment.kind === "program_final" && graded.passed) {
    eventType = "program_final_passed";
  } else if (assessment.kind === "graduation" && graded.passed) {
    eventType = "graduation_exam_passed";
  } else if (assessment.kind !== "lesson_quiz" && !graded.passed) {
    eventType = "quiz_failed";
  }

  const lessonSlug =
    assessment.kind === "lesson_quiz" ? assessment.lessonSlug : null;
  const programKey =
    assessment.kind === "program_final"
      ? assessment.programKey
      : assessment.kind === "lesson_quiz"
        ? assessment.programKey
        : null;

  const attemptStamp = Date.now();
  const { event, inserted } = await appendProgressEvent({
    memberId: opts.memberId,
    eventType,
    subjectKey: assessment.key,
    metadata: {
      assessment_key: assessment.key,
      kind: assessment.kind,
      percent: graded.percent,
      passed: graded.passed,
      perfect: graded.perfect,
      lesson_slug: lessonSlug,
      program_key: programKey,
      xp_awarded: xpAmount,
    },
    // Allow retakes — unique per attempt
    idempotencyKey: `${eventType}:${assessment.key}:${attemptStamp}`,
  });

  const supabase = await createClient();
  await supabase.from("streameru_quiz_attempts").insert({
    member_id: opts.memberId,
    assessment_key: assessment.key,
    kind: assessment.kind,
    lesson_slug: lessonSlug,
    program_key: programKey,
    score_percent: graded.percent,
    correct_count: graded.correctCount,
    total_count: graded.total,
    passed: graded.passed,
    perfect: graded.perfect,
    answers: opts.answers,
    xp_awarded: xpAmount,
    progress_event_id: event.id,
  });

  let xpAwarded = 0;
  if (graded.passed && inserted) {
    xpAwarded = await awardStreamerUXp({
      memberId: opts.memberId,
      awards,
      assessmentKey: assessment.key,
      sourceEventId: event.id,
    });
  }

  const mastery = await loadMasterySnapshot(opts.memberId);
  await projectMasteryRows(opts.memberId, mastery);
  const refreshed = await loadMasterySnapshot(opts.memberId);
  const newlyUnlocked = await listNewlyUnlocked(opts.memberId, beforeAchievements);
  const streameruXpTotal = await getStreamerUXpTotal(opts.memberId);

  return {
    ok: true,
    graded,
    xpAwarded,
    awards,
    mastery: refreshed,
    streameruXpTotal,
    newlyUnlocked,
    firstPass: graded.passed && !alreadyPassed,
  };
}

/** Used by certificate gating */
export async function hasPassedProgramFinal(
  memberId: string,
  programKey: string,
): Promise<boolean> {
  const events = await listMemberEvents(memberId, {
    limit: 200,
    eventTypes: ["program_final_passed"],
  });
  if (
    events.some(
      (e) =>
        e.metadata?.program_key === programKey ||
        e.subject_key === `final:${programKey}`,
    )
  ) {
    return true;
  }
  return hasPassedBefore(memberId, `final:${programKey}`);
}

export async function hasPassedGraduationExam(memberId: string): Promise<boolean> {
  const events = await listMemberEvents(memberId, {
    limit: 50,
    eventTypes: ["graduation_exam_passed"],
  });
  if (events.length > 0) return true;
  return hasPassedBefore(memberId, "graduation");
}

export function allProgramFinalKeys(): string[] {
  return listAcademyPrograms().map((p) => `final:${p.programKey}`);
}
