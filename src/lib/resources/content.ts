/**
 * Split plain-text content after the first "section" (double newline) so we can
 * insert a support callout between intro and body.
 */
export function splitIntroAndBody(content: string): {
  intro: string;
  rest: string | null;
} {
  const trimmed = content.trim();
  if (!trimmed) return { intro: "", rest: null };
  const parts = trimmed.split(/\n{2,}/);
  if (parts.length <= 1) {
    return { intro: trimmed, rest: null };
  }
  const intro = parts[0].trim();
  const rest = parts.slice(1).join("\n\n").trim();
  return { intro, rest: rest.length ? rest : null };
}
