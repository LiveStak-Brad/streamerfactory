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
   * - `[Screenshot: description]` / `[Diagram: description]` placeholders
   * - `[Callout: Title]` + body in the same block
   * - `[BradExperience]` + body in the same block
   */
  content: string;
};

/**
 * Gold-standard H2 order for StreamerU rebuilds (Lesson 1 template).
 * Future rewrites should match this sequence.
 */
export const LESSON_SECTION_HEADINGS = [
  "Introduction",
  "Why This Lesson Matters",
  "Learning Objectives",
  "Estimated Study Time",
  "Prerequisites",
  "Main Lesson",
  "Examples",
  "Real Creator Scenarios",
  "Screenshots",
  "Diagrams",
  "From Brad's Experience",
  "Pro Tips",
  "Common Beginner Mistakes",
  "Reality Check",
  "Summary",
  "LIVE Mission",
  "Downloads",
  "Quiz",
  "Key Takeaways",
  "Before You Move On",
  "Next Lesson Preview",
] as const;
