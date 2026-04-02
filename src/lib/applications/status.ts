import { canScheduleBattles } from "@/lib/auth/access";
import type { ApplicationRow } from "./types";

export type ResolvedApplicationUi =
  | { kind: "not_applied" }
  | { kind: "submitted"; submittedAt: string }
  | { kind: "in_review"; submittedAt: string }
  | {
      kind: "approved";
      /** True once profile.role is a network member; false if application row approved but session stale. */
      accessUnlocked: boolean;
    }
  | { kind: "rejected"; submittedAt: string };

/**
 * Single place to map profile + application row → applicant-facing UI state.
 *
 * Source of truth: `applications.status` (pipeline) + `profiles.role` (access).
 * - `applicant` without a row → not_applied
 * - `applicant` with a row → submitted / in_review / rejected / approved (stale session if row approved but role not yet member)
 * - Network roles (`member`, `owner`, `editor`, `admin`) → approved with access when they can schedule battles or are staff-adjacent
 */
export function resolveApplicationUi(
  profileRole: string | null | undefined,
  application: ApplicationRow | null,
): ResolvedApplicationUi {
  if (!profileRole) {
    return { kind: "not_applied" };
  }

  if (canScheduleBattles(profileRole)) {
    return { kind: "approved", accessUnlocked: true };
  }

  if (profileRole !== "applicant") {
    return { kind: "approved", accessUnlocked: true };
  }

  if (!application) {
    return { kind: "not_applied" };
  }

  const submittedAt = application.created_at;

  switch (application.status) {
    case "submitted":
      return { kind: "submitted", submittedAt };
    case "in_review":
      return { kind: "in_review", submittedAt };
    case "rejected":
      return { kind: "rejected", submittedAt };
    case "approved":
      return { kind: "approved", accessUnlocked: false };
    default:
      return { kind: "submitted", submittedAt };
  }
}
