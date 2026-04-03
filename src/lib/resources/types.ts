import type { TrainingSectionsJson } from "./training-sections";
import type { TrainingTrackId } from "./tracks";

export type ResourceStatus = "draft" | "published";

export type ResourceDifficulty = "beginner" | "intermediate" | "advanced";

export type ResourceCategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
};

export type ResourcePostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  category_id: string | null;
  /** Program track — see `TRAINING_TRACK_SECTIONS`. */
  training_track?: TrainingTrackId;
  difficulty?: ResourceDifficulty | null;
  training_sections?: TrainingSectionsJson | null;
  author_id: string;
  status: ResourceStatus;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/** Nested select from Supabase (name may vary by FK hint). */
export type ResourcePostWithCategory = ResourcePostRow & {
  resource_categories?: ResourceCategoryRow | null;
};
