/**
 * Server-backed onboarding checklist — projections + sync helpers.
 */

import { createClient } from "@/lib/supabase/server";
import {
  appendProgressEvent,
  emitChildEvent,
} from "@/lib/growth/progress/events";
import { buildProgressSnapshot } from "@/lib/growth/progress/snapshot-build";
import { evaluateRequirement } from "@/lib/growth/requirements/evaluate";
import { parseRequirement, type ProgressEventRow } from "@/lib/growth/types";

export type OnboardingChecklistItem = {
  task_id: string;
  key: string;
  title: string;
  description: string | null;
  href: string | null;
  sort_order: number;
  required: boolean;
  completed_at: string | null;
  member_row_id: string | null;
};

export type ProjectOpts = { depth?: number };

async function markProfileOnboardingComplete(memberId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: before } = await supabase
    .from("profiles")
    .select("onboarding_completed_at")
    .eq("id", memberId)
    .maybeSingle();

  if (before?.onboarding_completed_at) return false;

  const now = new Date().toISOString();
  const { error } = await supabase
    .from("profiles")
    .update({ onboarding_completed_at: now })
    .eq("id", memberId)
    .is("onboarding_completed_at", null);

  return !error;
}

async function allRequiredTasksComplete(memberId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: tasks } = await supabase
    .from("onboarding_tasks")
    .select("id")
    .eq("active", true)
    .eq("required", true);

  if (!tasks?.length) return true;

  const ids = tasks.map((t) => t.id);
  const { data: rows } = await supabase
    .from("member_onboarding_tasks")
    .select("task_id, completed_at")
    .eq("member_id", memberId)
    .in("task_id", ids);

  const done = new Set(
    (rows ?? []).filter((r) => r.completed_at).map((r) => r.task_id),
  );
  return ids.every((id) => done.has(id));
}

async function maybeCompleteOnboarding(
  memberId: string,
  sourceEvent: ProgressEventRow,
  depth: number,
): Promise<void> {
  if (!(await allRequiredTasksComplete(memberId))) return;
  const newlyMarked = await markProfileOnboardingComplete(memberId);
  if (!newlyMarked) {
    // Profile may already be complete; still ensure event exists once.
  }

  await emitChildEvent({
    memberId,
    eventType: "onboarding_completed",
    subjectKey: null,
    metadata: { source_event_id: sourceEvent.id },
    idempotencyKey: `onboarding_completed:${memberId}`,
    sourceEventId: sourceEvent.id,
    depth,
  });
}

export async function projectOnboardingFromEvent(
  event: ProgressEventRow,
  opts: ProjectOpts = {},
): Promise<void> {
  const depth = opts.depth ?? 0;
  if (event.event_type !== "onboarding_task_completed") return;

  const taskKey =
    event.subject_key?.trim() ||
    (typeof event.metadata?.task_key === "string"
      ? event.metadata.task_key.trim()
      : "");
  if (!taskKey) return;

  const supabase = await createClient();
  const { data: task } = await supabase
    .from("onboarding_tasks")
    .select("id")
    .eq("key", taskKey)
    .maybeSingle();

  if (!task) return;

  const completedAt = event.created_at;
  await supabase.from("member_onboarding_tasks").upsert(
    {
      member_id: event.member_id,
      task_id: task.id,
      completed_at: completedAt,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "member_id,task_id" },
  );

  await maybeCompleteOnboarding(event.member_id, event, depth);
}

export async function syncOnboardingChecklist(memberId: string): Promise<{
  items: OnboardingChecklistItem[];
  autoCompleted: string[];
}> {
  const supabase = await createClient();
  const { data: tasks } = await supabase
    .from("onboarding_tasks")
    .select("id, key, title, description, href, sort_order, required, requirement")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  const active = tasks ?? [];
  if (!active.length) return { items: [], autoCompleted: [] };

  const { data: existing } = await supabase
    .from("member_onboarding_tasks")
    .select("id, task_id, completed_at")
    .eq("member_id", memberId);

  const byTaskId = new Map((existing ?? []).map((r) => [r.task_id, r]));

  const missing = active.filter((t) => !byTaskId.has(t.id));
  if (missing.length) {
    await supabase.from("member_onboarding_tasks").upsert(
      missing.map((t) => ({
        member_id: memberId,
        task_id: t.id,
        completed_at: null,
      })),
      { onConflict: "member_id,task_id", ignoreDuplicates: true },
    );
  }

  const snapshot = await buildProgressSnapshot(memberId);
  const autoCompleted: string[] = [];

  for (const task of active) {
    const row = byTaskId.get(task.id);
    if (row?.completed_at) continue;

    const requirement = parseRequirement(task.requirement);
    if (!requirement) continue;

    const result = evaluateRequirement(requirement, snapshot);
    if (!result.satisfied) continue;

    const { event, inserted } = await appendProgressEvent({
      memberId,
      eventType: "onboarding_task_completed",
      subjectKey: task.key,
      metadata: { task_key: task.key, auto: true },
      idempotencyKey: `onboarding_task:${task.key}`,
    });

    if (inserted || event) {
      autoCompleted.push(task.key);
      // Projection runs via append when inserted; if duplicate, ensure row marked.
      if (!inserted) {
        await supabase.from("member_onboarding_tasks").upsert(
          {
            member_id: memberId,
            task_id: task.id,
            completed_at: event.created_at,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "member_id,task_id" },
        );
      }
    }
  }

  const items = await getOnboardingChecklist(memberId);
  return { items, autoCompleted };
}

export async function getOnboardingChecklist(
  memberId: string,
): Promise<OnboardingChecklistItem[]> {
  const supabase = await createClient();
  const { data: tasks } = await supabase
    .from("onboarding_tasks")
    .select("id, key, title, description, href, sort_order, required")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (!tasks?.length) return [];

  const { data: rows } = await supabase
    .from("member_onboarding_tasks")
    .select("id, task_id, completed_at")
    .eq("member_id", memberId);

  const byTaskId = new Map((rows ?? []).map((r) => [r.task_id, r]));

  return tasks.map((t) => {
    const row = byTaskId.get(t.id);
    return {
      task_id: t.id,
      key: t.key,
      title: t.title,
      description: t.description ?? null,
      href: t.href ?? null,
      sort_order: t.sort_order,
      required: t.required,
      completed_at: row?.completed_at ?? null,
      member_row_id: row?.id ?? null,
    };
  });
}

export async function completeOnboardingTask(
  memberId: string,
  taskKey: string,
): Promise<{ ok: boolean; error?: string }> {
  const key = taskKey.trim();
  if (!key) return { ok: false, error: "taskKey required" };

  const supabase = await createClient();
  const { data: task } = await supabase
    .from("onboarding_tasks")
    .select("id, key, active")
    .eq("key", key)
    .maybeSingle();

  if (!task || !task.active) {
    return { ok: false, error: "Unknown or inactive task" };
  }

  const now = new Date().toISOString();
  await supabase.from("member_onboarding_tasks").upsert(
    {
      member_id: memberId,
      task_id: task.id,
      completed_at: now,
      updated_at: now,
    },
    { onConflict: "member_id,task_id" },
  );

  await appendProgressEvent({
    memberId,
    eventType: "onboarding_task_completed",
    subjectKey: key,
    metadata: { task_key: key },
    idempotencyKey: `onboarding_task:${key}`,
  });

  return { ok: true };
}
