/**
 * Split plain-text content so we can insert a support callout between intro and body.
 *
 * Prefer a full `## Introduction` section when present; otherwise fall back to the
 * first blank-line block (legacy short posts).
 */
export function splitIntroAndBody(content: string): {
  intro: string;
  rest: string | null;
} {
  const trimmed = content.trim();
  if (!trimmed) return { intro: "", rest: null };

  const introSection = trimmed.match(/^##\s+Introduction\s*\n([\s\S]*?)(?=\n##\s+|\s*$)/i);
  if (introSection) {
    const intro = `## Introduction\n\n${introSection[1].trim()}`.trim();
    const rest = trimmed.slice(introSection[0].length).trim();
    return { intro, rest: rest.length ? rest : null };
  }

  const parts = trimmed.split(/\n{2,}/);
  if (parts.length <= 1) {
    return { intro: trimmed, rest: null };
  }
  const intro = parts[0].trim();
  const rest = parts.slice(1).join("\n\n").trim();
  return { intro, rest: rest.length ? rest : null };
}
