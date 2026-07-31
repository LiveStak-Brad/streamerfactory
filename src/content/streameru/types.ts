/**
 * Version-controlled StreamerU curriculum lesson bodies.
 * Curriculum slugs prefer this content over short DB stubs.
 */

export type ExpandedLesson = {
  slug: string;
  /** Meta description / header deck */
  excerpt: string;
  /** Approximate study time before the LIVE mission */
  estimatedMinutes: number;
  /**
   * Full lesson body. Use blank-line paragraphs and:
   * - `## Heading` / `### Heading`
   * - `[Screenshot: description]` placeholders
   */
  content: string;
};

export const LESSON_SECTION_HEADINGS = [
  "Introduction",
  "Objectives",
  "Estimated time",
  "Prerequisites",
  "Lesson",
  "Examples",
  "Real-world scenarios",
  "Screenshots",
  "Pro Tips",
  "Common Mistakes",
  "Summary",
  "Mission",
  "Downloads",
  "Related Lessons",
  "Next Lesson",
] as const;
