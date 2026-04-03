import { canScheduleBattles, isApplicantRole } from "@/lib/auth/access";

export type PostLoginProfile = {
  role: string;
  onboarding_completed_at: string | null;
};

/**
 * After sign-in / email callback: choose a sensible default when `next` is generic (/ or /login).
 *
 * - **Applicants** → `/application-status`.
 * - **Approved network members** (member/editor/admin/owner) with incomplete onboarding → `/streameru` (StreamerU).
 * - Explicit `next` (e.g. /apply, /battle-hub, /admin) is always preserved.
 */
export function resolvePostLoginRedirect(
  nextPath: string,
  profile: PostLoginProfile | null | undefined,
): string {
  const next = nextPath || "/";
  const isBareDefault = !nextPath || nextPath === "/" || nextPath === "/login";

  if (!isBareDefault) {
    return next;
  }

  if (profile && isApplicantRole(profile.role)) {
    return "/application-status";
  }

  if (
    profile &&
    canScheduleBattles(profile.role) &&
    !profile.onboarding_completed_at
  ) {
    return "/streameru";
  }

  return next;
}
