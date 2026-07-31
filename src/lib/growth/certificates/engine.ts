/**
 * Certificate + semester completion projection.
 * When a StreamerU program (semester) is fully done, emit module_completed
 * and issue the matching certificate.
 */

import { createClient } from "@/lib/supabase/server";
import { emitChildEvent } from "@/lib/growth/progress/events";
import {
  completedSlugsFromEvents,
  graduateCertificateKey,
  isFullGraduate,
  listSemesterPrograms,
  programProgress,
} from "@/lib/growth/semester/programs";
import { listMemberEvents } from "@/lib/growth/progress/events";
import { getActiveSeason } from "@/lib/growth/seasons/service";
import { STREAMERU_XP } from "@/lib/assessments/xp";
import type { ProgressEventRow } from "@/lib/growth/types";

export type ProjectOpts = { depth?: number };

const TRIGGER_TYPES = new Set([
  "lesson_completed",
  "streameru_live_mission_completed",
  "module_completed",
  "program_final_passed",
  "graduation_exam_passed",
  "quiz_passed",
]);

async function passedProgramFinal(
  memberId: string,
  programKey: string,
): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("streameru_quiz_attempts")
    .select("id")
    .eq("member_id", memberId)
    .eq("assessment_key", `final:${programKey}`)
    .eq("passed", true)
    .limit(1)
    .maybeSingle();
  return Boolean(data);
}

async function passedGraduationExam(memberId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("streameru_quiz_attempts")
    .select("id")
    .eq("member_id", memberId)
    .eq("assessment_key", "graduation")
    .eq("passed", true)
    .limit(1)
    .maybeSingle();
  return Boolean(data);
}

async function awardCertificateStreamerUXp(opts: {
  memberId: string;
  reason: "program_certificate" | "graduation_diploma";
  amount: number;
  assessmentKey: string;
  sourceEventId: string;
}): Promise<void> {
  const supabase = await createClient();
  const idempotencyKey = `streameru_xp:${opts.reason}:${opts.assessmentKey}`;
  const { error } = await supabase.from("streameru_xp_ledger").insert({
    member_id: opts.memberId,
    amount: opts.amount,
    reason: opts.reason,
    assessment_key: opts.assessmentKey,
    progress_event_id: opts.sourceEventId,
    metadata: {},
    idempotency_key: idempotencyKey,
  });
  if (error) return;
  await emitChildEvent({
    memberId: opts.memberId,
    eventType: "streameru_xp_earned",
    subjectKey: opts.assessmentKey,
    metadata: {
      reason: opts.reason,
      amount: opts.amount,
      assessment_key: opts.assessmentKey,
    },
    idempotencyKey: `streameru_xp_earned:${idempotencyKey}`,
    sourceEventId: opts.sourceEventId,
    depth: 0,
  });
}

async function resolvedCompletedSlugs(memberId: string): Promise<string[]> {
  const supabase = await createClient();
  const [events, streameruRes] = await Promise.all([
    listMemberEvents(memberId, {
      limit: 500,
      eventTypes: ["lesson_completed", "streameru_live_mission_completed"],
    }),
    supabase
      .from("streameru_mission_completions")
      .select("lesson_slug")
      .eq("member_id", memberId),
  ]);

  const fromEvents = events
    .map((e) => e.subject_key)
    .filter((s): s is string => Boolean(s));
  const fromTable = (streameruRes.data ?? []).map((r) => r.lesson_slug as string);
  return completedSlugsFromEvents(fromEvents, fromTable);
}

export async function projectCertificatesFromEvent(
  event: ProgressEventRow,
  opts: ProjectOpts = {},
): Promise<void> {
  if (!TRIGGER_TYPES.has(event.event_type)) return;

  try {
    await projectCertificatesFromEventInner(event, opts);
  } catch {
    // Tables may not be migrated yet — never break the growth pipeline.
  }
}

async function projectCertificatesFromEventInner(
  event: ProgressEventRow,
  opts: ProjectOpts = {},
): Promise<void> {
  const depth = opts.depth ?? 0;
  const supabase = await createClient();
  const season = await getActiveSeason();
  const completedSlugs = await resolvedCompletedSlugs(event.member_id);
  const programs = programProgress(completedSlugs);

  for (const program of programs) {
    if (!program.complete) continue;

    // Missions complete → module_completed (program work done)
    await emitChildEvent({
      memberId: event.member_id,
      eventType: "module_completed",
      subjectKey: program.programKey,
      metadata: {
        program_key: program.programKey,
        program_name: program.programName,
        lessons: program.total,
      },
      idempotencyKey: `module_completed:${program.programKey}`,
      sourceEventId: event.id,
      depth,
    });

    // Certificate requires Program Final Exam pass as well
    const finalOk = await passedProgramFinal(
      event.member_id,
      program.programKey,
    );
    if (!finalOk) continue;

    const { data: existing } = await supabase
      .from("member_certificates")
      .select("id")
      .eq("member_id", event.member_id)
      .eq("certificate_key", program.certificateKey)
      .maybeSingle();

    if (existing) continue;

    const { data: def } = await supabase
      .from("certificate_definitions")
      .select("key, name, description, icon")
      .eq("key", program.certificateKey)
      .eq("active", true)
      .maybeSingle();

    if (!def) continue;

    const issuedAt = new Date().toISOString();
    const { error } = await supabase.from("member_certificates").insert({
      member_id: event.member_id,
      certificate_key: def.key,
      program_key: program.programKey,
      season_id: season?.id ?? null,
      issued_at: issuedAt,
      progress_event_id: event.id,
      metadata: {
        name: def.name,
        program_name: program.programName,
      },
    });
    if (error) continue;

    await emitChildEvent({
      memberId: event.member_id,
      eventType: "certificate_issued",
      subjectKey: def.key,
      metadata: {
        certificate_key: def.key,
        name: def.name,
        description: def.description,
        icon: def.icon,
        program_key: program.programKey,
        program_name: program.programName,
      },
      idempotencyKey: `certificate_issued:${def.key}`,
      sourceEventId: event.id,
      depth,
    });

    await awardCertificateStreamerUXp({
      memberId: event.member_id,
      reason: "program_certificate",
      amount: STREAMERU_XP.programCertificate,
      assessmentKey: def.key,
      sourceEventId: event.id,
    });
  }

  // Diploma + ceremony require Graduation Exam (not missions alone)
  const gradExamOk = await passedGraduationExam(event.member_id);
  if (!gradExamOk || !isFullGraduate(completedSlugs)) return;

  const gradKey = graduateCertificateKey();
  const { data: gradCert } = await supabase
    .from("member_certificates")
    .select("id")
    .eq("member_id", event.member_id)
    .eq("certificate_key", gradKey)
    .maybeSingle();

  if (!gradCert) {
    const { data: def } = await supabase
      .from("certificate_definitions")
      .select("key, name, description, icon")
      .eq("key", gradKey)
      .eq("active", true)
      .maybeSingle();

    if (def) {
      const { error } = await supabase.from("member_certificates").insert({
        member_id: event.member_id,
        certificate_key: def.key,
        program_key: "graduate",
        season_id: season?.id ?? null,
        issued_at: new Date().toISOString(),
        progress_event_id: event.id,
        metadata: { name: def.name },
      });
      if (!error) {
        await emitChildEvent({
          memberId: event.member_id,
          eventType: "certificate_issued",
          subjectKey: def.key,
          metadata: {
            certificate_key: def.key,
            name: def.name,
            description: def.description,
            icon: def.icon,
            program_key: "graduate",
          },
          idempotencyKey: `certificate_issued:${def.key}`,
          sourceEventId: event.id,
          depth,
        });

        await awardCertificateStreamerUXp({
          memberId: event.member_id,
          reason: "graduation_diploma",
          amount: STREAMERU_XP.graduationDiploma,
          assessmentKey: def.key,
          sourceEventId: event.id,
        });
      }
    }
  }

  // Graduation eligibility
  const { data: gradRow } = await supabase
    .from("member_graduations")
    .select("id, status")
    .eq("member_id", event.member_id)
    .eq("ceremony_key", "streameru_graduate")
    .maybeSingle();

  if (!gradRow) {
    await supabase.from("member_graduations").insert({
      member_id: event.member_id,
      ceremony_key: "streameru_graduate",
      status: "eligible",
      eligible_at: new Date().toISOString(),
      season_id: season?.id ?? null,
      progress_event_id: event.id,
      metadata: {
        programs: listSemesterPrograms().map((p) => p.programKey),
      },
    });

    await emitChildEvent({
      memberId: event.member_id,
      eventType: "graduated",
      subjectKey: "streameru_graduate",
      metadata: {
        ceremony_key: "streameru_graduate",
        status: "eligible",
      },
      idempotencyKey: "graduated:streameru_graduate",
      sourceEventId: event.id,
      depth,
    });
  }
}

export async function celebrateGraduation(
  memberId: string,
): Promise<{ ok: true } | { error: string }> {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("member_graduations")
    .update({
      status: "celebrated",
      celebrated_at: now,
      updated_at: now,
    })
    .eq("member_id", memberId)
    .eq("ceremony_key", "streameru_graduate")
    .in("status", ["eligible"])
    .select("id")
    .maybeSingle();

  if (error) return { error: error.message };
  if (!data) return { error: "No graduation ceremony to celebrate" };

  // Public Hall of Fame · StreamerU Graduates board
  const { data: profile } = await supabase
    .from("profiles")
    .select("tiktok_username, email")
    .eq("id", memberId)
    .maybeSingle();

  const handle = (profile?.tiktok_username ?? "").replace(/^@+/, "").trim().toLowerCase();
  const email = typeof profile?.email === "string" ? profile.email : "";
  const displayName =
    handle ||
    (email.includes("@") ? email.split("@")[0] : "") ||
    "StreamerU Graduate";

  await supabase.from("hall_of_fame_streameru_graduates").upsert(
    {
      member_id: memberId,
      display_name: displayName,
      tiktok_username: handle || displayName.toLowerCase().replace(/\s+/g, ""),
      diploma_label: "StreamerU Diploma",
      certified_label: "Certified LIVE Creator",
      career_path: "StreamerU Graduate",
      graduated_at: now,
      updated_at: now,
    },
    { onConflict: "member_id" },
  );

  return { ok: true };
}

export async function listMemberCertificates(memberId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("member_certificates")
    .select("certificate_key, program_key, issued_at, metadata")
    .eq("member_id", memberId)
    .order("issued_at", { ascending: false });

  return (data ?? []).map((row) => ({
    key: row.certificate_key as string,
    programKey: row.program_key as string,
    issuedAt: row.issued_at as string,
    name:
      typeof (row.metadata as { name?: string } | null)?.name === "string"
        ? (row.metadata as { name: string }).name
        : row.certificate_key,
  }));
}

export async function getGraduationState(memberId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("member_graduations")
    .select("status, eligible_at, celebrated_at, metadata")
    .eq("member_id", memberId)
    .eq("ceremony_key", "streameru_graduate")
    .maybeSingle();

  if (!data) return null;
  return {
    status: data.status as "eligible" | "celebrated" | "archived",
    eligibleAt: data.eligible_at as string,
    celebratedAt: (data.celebrated_at as string | null) ?? null,
  };
}
