/**
 * App roles stored in `public.profiles.role`.
 * `applicant` = signed up but not yet approved as a network member.
 */
export const APP_ROLES = ["owner", "editor", "member", "admin", "applicant"] as const;
export type AppRole = (typeof APP_ROLES)[number];

/** Roles that can use Battle Hub scheduling, live calendar, and scheduler wizard (includes site owner). */
const NETWORK_MEMBER_ROLES = new Set(["owner", "admin", "editor", "member"]);

/** Roles that see the in-network Battle Hub home (not the public/visitor page). Site owners use the public hub + tools elsewhere. */
const BATTLE_HUB_MEMBER_HOME_ROLES = new Set(["admin", "editor", "member"]);

function normalizeRole(role: string | null | undefined): string {
  return (role ?? "").trim().toLowerCase();
}

export function isOwnerRole(role: string | null | undefined): boolean {
  return normalizeRole(role) === "owner";
}

/** Full admin UI (applications, members, resources, admin calendar): site staff only. */
export function canAccessAdmin(role: string | null | undefined): boolean {
  const r = normalizeRole(role);
  return r === "owner" || r === "editor" || r === "admin";
}

/**
 * Battle Hub scheduling (owner, editor, member, admin — not applicants).
 * Signing in alone does not grant this; an owner must promote applicant → member.
 */
export function canScheduleBattles(role: string | null | undefined): boolean {
  return NETWORK_MEMBER_ROLES.has(normalizeRole(role));
}

/** True when the user is still in the application pipeline (not yet promoted to a network member role). */
export function isApplicantRole(role: string | null | undefined): boolean {
  return normalizeRole(role) === "applicant";
}

export type SessionLike = { profile: { role: string } | null } | null;

/** True when the user can use real scheduler + calendar (not the public preview). */
export function canUseBattleHubScheduling(session: SessionLike): boolean {
  if (!session?.profile) return false;
  return canScheduleBattles(session.profile.role);
}

/** True for network members who see the member Battle Hub home (excludes `owner` — they see the public hub like visitors). */
export function canViewBattleHubMemberHome(role: string | null | undefined): boolean {
  return BATTLE_HUB_MEMBER_HOME_ROLES.has(normalizeRole(role));
}

/** Open-redirect safe path for `next` query params (must be same-origin relative path). */
export function safeNextPath(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}
