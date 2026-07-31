/**
 * Pure helpers for import match accounting (unit-tested).
 * Matched creators must never appear in unmatchedUsernames.
 */

export type MatchConfidence = "high" | "medium" | "low";

export function normalizeMatchConfidence(raw: string | undefined): MatchConfidence {
  if (raw === "high" || raw === "medium" || raw === "low") return raw;
  return "low";
}

export type MatchAccountResult = {
  matched: boolean;
  lowConfidence: boolean;
};

/**
 * Record whether a cleaned username matched a profile.
 * Only unmatched (no profileId) handles are added to `unmatchedUsernames`.
 */
export function accountUsernameMatch(
  unmatchedUsernames: Set<string>,
  canonical: string,
  profileId: string | null | undefined,
  usernameConfidence: string | undefined,
): MatchAccountResult {
  if (profileId) {
    const lowConfidence = normalizeMatchConfidence(usernameConfidence) === "low";
    return { matched: true, lowConfidence };
  }
  unmatchedUsernames.add(canonical);
  return { matched: false, lowConfidence: false };
}
