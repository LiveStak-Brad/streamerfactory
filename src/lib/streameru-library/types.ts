/**
 * StreamerU Resource Library — printable / downloadable lesson tools.
 */

export type LibraryCategoryId =
  | "beginner"
  | "content"
  | "battles"
  | "monetization"
  | "branding"
  | "business"
  | "safety";

export type LibraryResourceKind =
  | "checklist"
  | "worksheet"
  | "planner"
  | "script"
  | "tracker"
  | "guide"
  | "journal"
  | "template";

export type LibraryResourceStatus = "ready" | "placeholder";

export type PrintBlock =
  | { type: "intro"; text: string }
  | { type: "checkbox_list"; title?: string; items: string[] }
  | { type: "fill_lines"; title?: string; lines: { label: string; rows?: number }[] }
  | {
      type: "table";
      title?: string;
      columns: string[];
      rows: number;
      hint?: string;
    }
  | {
      type: "timed_segments";
      title?: string;
      segments: { label: string; minutes: string; prompt: string }[];
    }
  | { type: "notes"; title?: string; lines?: number }
  | { type: "callout"; text: string };

export type LibraryResource = {
  id: string;
  title: string;
  description: string;
  category: LibraryCategoryId;
  kind: LibraryResourceKind;
  status: LibraryResourceStatus;
  /** Curriculum lesson slugs this resource belongs to (may be empty for library-only seeds). */
  lessonSlugs: string[];
  /** When set, show Download PDF alongside Print / Save as PDF. */
  pdfUrl?: string;
  /** Shown for placeholder resources. */
  comingSoonNote?: string;
  /** Printable body — required when status is `ready`. */
  blocks?: PrintBlock[];
};

export type LibraryCategoryMeta = {
  id: LibraryCategoryId;
  label: string;
  description: string;
};

export const LIBRARY_CATEGORIES: LibraryCategoryMeta[] = [
  {
    id: "beginner",
    label: "Beginner",
    description: "First stream setup, structure, and consistency tools.",
  },
  {
    id: "content",
    label: "Content",
    description: "Hooks, retention, and on-stream craft worksheets.",
  },
  {
    id: "battles",
    label: "Battles",
    description: "Battle day checklists, scripts, and partner trackers.",
  },
  {
    id: "monetization",
    label: "Monetization",
    description: "Goals, gifts, and income habit planners.",
  },
  {
    id: "branding",
    label: "Branding",
    description: "Profile, calendar, and clip planning sheets.",
  },
  {
    id: "business",
    label: "Business",
    description: "Expenses, sponsorships, and tax-ready trackers.",
  },
  {
    id: "safety",
    label: "Rules & Safety",
    description: "Compliance checklists and account protection tools.",
  },
];

export const LIBRARY_KIND_LABELS: Record<LibraryResourceKind, string> = {
  checklist: "Checklist",
  worksheet: "Worksheet",
  planner: "Planner",
  script: "Script",
  tracker: "Tracker",
  guide: "Guide",
  journal: "Journal",
  template: "Template",
};
