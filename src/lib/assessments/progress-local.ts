/**
 * Device-local StreamerU assessment progress (mirrors mission localStorage SoT pattern).
 */

export const STREAMERU_QUIZ_PASSED_KEY_PREFIX = "sf_streameru_quiz_passed_";
export const STREAMERU_FINAL_PASSED_KEY_PREFIX = "sf_streameru_final_passed_";
export const STREAMERU_GRADUATION_PASSED_KEY = "sf_streameru_graduation_passed";
export const STREAMERU_XP_LOCAL_KEY = "sf_streameru_xp_total";

export function quizPassedStorageKey(lessonSlug: string): string {
  return `${STREAMERU_QUIZ_PASSED_KEY_PREFIX}${lessonSlug}`;
}

export function finalPassedStorageKey(programKey: string): string {
  return `${STREAMERU_FINAL_PASSED_KEY_PREFIX}${programKey}`;
}

export function readQuizPassed(lessonSlug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(quizPassedStorageKey(lessonSlug));
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { passed?: boolean; percent?: number };
    return Boolean(parsed.passed);
  } catch {
    return false;
  }
}

export function writeQuizPassed(lessonSlug: string, percent: number): void {
  localStorage.setItem(
    quizPassedStorageKey(lessonSlug),
    JSON.stringify({ passed: true, percent, at: new Date().toISOString() }),
  );
}

export function readFinalPassed(programKey: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(finalPassedStorageKey(programKey));
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { passed?: boolean };
    return Boolean(parsed.passed);
  } catch {
    return false;
  }
}

export function writeFinalPassed(programKey: string, percent: number): void {
  localStorage.setItem(
    finalPassedStorageKey(programKey),
    JSON.stringify({ passed: true, percent, at: new Date().toISOString() }),
  );
}

export function readGraduationPassed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STREAMERU_GRADUATION_PASSED_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { passed?: boolean };
    return Boolean(parsed.passed);
  } catch {
    return false;
  }
}

export function writeGraduationPassed(percent: number): void {
  localStorage.setItem(
    STREAMERU_GRADUATION_PASSED_KEY,
    JSON.stringify({ passed: true, percent, at: new Date().toISOString() }),
  );
}

export function readLocalStreamerUXp(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(STREAMERU_XP_LOCAL_KEY);
    const n = raw ? Number(raw) : 0;
    return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
  } catch {
    return 0;
  }
}

export function addLocalStreamerUXp(amount: number): number {
  const next = readLocalStreamerUXp() + Math.max(0, Math.floor(amount));
  localStorage.setItem(STREAMERU_XP_LOCAL_KEY, String(next));
  return next;
}
