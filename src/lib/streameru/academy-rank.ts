/**
 * Educational academy rank — StreamerU-only, separate from Factory Reputation.
 * Derived from completed LIVE exams on this device.
 */

export type AcademyRank = {
  key: string;
  label: string;
  blurb: string;
};

export function getAcademyRank(completedLessons: number): AcademyRank {
  if (completedLessons <= 0) {
    return {
      key: "recruit",
      label: "Academy Recruit",
      blurb: "Start Your Creator Journey — Lesson 1 begins your free path.",
    };
  }
  if (completedLessons < 5) {
    return {
      key: "student",
      label: "Academy Student",
      blurb: "Building foundations — keep stacking LIVE exams.",
    };
  }
  if (completedLessons < 12) {
    return {
      key: "apprentice",
      label: "LIVE Apprentice",
      blurb: "Craft is forming. Consistency is the next unlock.",
    };
  }
  if (completedLessons < 20) {
    return {
      key: "creator",
      label: "Working Creator",
      blurb: "You're operating like a professional student of LIVE.",
    };
  }
  if (completedLessons < 24) {
    return {
      key: "candidate",
      label: "Graduate Candidate",
      blurb: "Diploma path in sight — finish LIVE exams and finals.",
    };
  }
  return {
    key: "path_complete",
    label: "Academy Path Complete",
    blurb: "Published path done — take the Graduation Exam for your diploma.",
  };
}

/** Consecutive calendar days with at least one LIVE exam marked done (device-local). */
export function computeStudyStreakDays(
  completionIsoDates: string[],
  today = new Date(),
): number {
  if (completionIsoDates.length === 0) return 0;
  const days = new Set(
    completionIsoDates.map((iso) => {
      const d = new Date(iso);
      return `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
    }),
  );

  let streak = 0;
  const cursor = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );

  // Allow "today or yesterday" as the streak tip so timezone lag doesn't zero out.
  const tipKey = `${cursor.getUTCFullYear()}-${cursor.getUTCMonth()}-${cursor.getUTCDate()}`;
  const y = new Date(cursor);
  y.setUTCDate(y.getUTCDate() - 1);
  const yKey = `${y.getUTCFullYear()}-${y.getUTCMonth()}-${y.getUTCDate()}`;
  if (!days.has(tipKey) && !days.has(yKey)) return 0;
  if (!days.has(tipKey)) cursor.setUTCDate(cursor.getUTCDate() - 1);

  while (true) {
    const key = `${cursor.getUTCFullYear()}-${cursor.getUTCMonth()}-${cursor.getUTCDate()}`;
    if (!days.has(key)) break;
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}
