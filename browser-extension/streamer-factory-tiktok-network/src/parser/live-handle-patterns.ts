/** Visible truncated handle: bottsma…, cj_allyca..., etc. */
export const TRUNCATED_HANDLE_VISIBLE =
  /^(@?[_]?[a-z0-9][a-z0-9._]{1,27})(?:\.{2,3}|…|\u2026)$/i;

export function isTruncatedHandleVisible(text: string): boolean {
  return TRUNCATED_HANDLE_VISIBLE.test(text.trim());
}

export function truncatedHandlePrefix(text: string): string | undefined {
  const m = text.trim().match(TRUNCATED_HANDLE_VISIBLE);
  return m?.[1]?.replace(/^@+/, "").toLowerCase();
}
