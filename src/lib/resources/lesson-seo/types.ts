export type LessonFaq = {
  question: string;
  answer: string;
};

export type LessonInternalLink = {
  label: string;
  href: string;
};

/** Content-roadmap suggestion — not a live URL until that surface exists. */
export type LessonContentSuggestion = {
  title: string;
  intent: string;
};

/**
 * Authority SEO pack for one StreamerU curriculum lesson.
 * Code-first (like guides); lesson body stays in Supabase CMS.
 */
export type LessonSeoPack = {
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  faqs: LessonFaq[];
  /** Existing `/guides/[slug]` targets only */
  relatedGuideSlugs: string[];
  /** Crawlable internal links for E-E-A-T and learning path */
  internalLinks: LessonInternalLink[];
  suggestedGlossaryTerms: LessonContentSuggestion[];
  suggestedDownloads: LessonContentSuggestion[];
  suggestedBlogSupport: LessonContentSuggestion[];
};
