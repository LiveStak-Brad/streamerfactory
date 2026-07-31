/** Public Storage bucket for StreamerU lesson media (admin upload → public read). */
export const STREAMERU_LESSON_MEDIA_BUCKET = "streameru-lesson-media" as const;

export const STREAMERU_MEDIA_MAX_BYTES = 8 * 1024 * 1024;

export const STREAMERU_MEDIA_ALLOWED_EXT = ["jpg", "jpeg", "png", "webp", "gif", "svg"] as const;
