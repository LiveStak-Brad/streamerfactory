export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideSection = {
  heading: string;
  body: string;
  bullets?: string[];
  subsections?: { heading: string; body: string }[];
};

export type GuideProcessStep = {
  title: string;
  body: string;
};

export type GuideComparisonRow = {
  dimension: string;
  optionA: string;
  optionB: string;
};

export type GuideLink = {
  label: string;
  href: string;
};

export type GuideCategoryId =
  | "fundamentals"
  | "growth"
  | "monetization"
  | "agencies-networks"
  | "battles"
  | "training-coaching"
  | "streaming-setup"
  | "community"
  | "recruiting"
  | "safety"
  | "comparisons";

export type GuideFormat = "pillar" | "support" | "comparison" | "resource";

export type GuideDocument = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  priority: number;
  categoryId: GuideCategoryId;
  format: GuideFormat;
  keyword: {
    primary: string;
    monthlyVolume: string;
    difficulty: "Low" | "Medium" | "High" | "Very High";
    intent: "Informational" | "Commercial" | "Transactional";
  };
  /** Concise answer for AI Overviews / featured snippets */
  directAnswer: string;
  intro: string;
  keyTakeaways: string[];
  sections: GuideSection[];
  processSteps?: GuideProcessStep[];
  commonMistakes?: string[];
  whoFor?: string[];
  whoNotFor?: string[];
  comparison?: {
    optionALabel: string;
    optionBLabel: string;
    rows: GuideComparisonRow[];
    verdictByType: { creatorType: string; recommendation: string }[];
  };
  faqs: GuideFaq[];
  relatedSlugs: string[];
  streameruLinks?: GuideLink[];
  featureLinks?: GuideLink[];
  ctaPrimary: { label: string; href: string; external?: boolean };
  ctaSecondary: { label: string; href: string };
  datePublished: string;
  dateModified: string;
  /** Branding icon under /branding/icons */
  icon?: string;
};

/** @deprecated Prefer GuideDocument — kept for gradual migration aliases */
export type GuidePillar = GuideDocument;
