import { ArticleBody } from "@/components/resources/ArticleBody";
import { TRAINING_SECTION_KEYS, hasAnyTrainingSection, type TrainingSectionsJson } from "@/lib/resources/training-sections";

type Props = {
  sections: TrainingSectionsJson | null | undefined;
};

/**
 * Structured lesson blocks (optional). Main article body still lives in `content`.
 */
export function ResourceArticleTraining({ sections }: Props) {
  if (!hasAnyTrainingSection(sections ?? null)) return null;

  return (
    <div className="space-y-10 border-b border-zinc-200/80 pb-12 dark:border-zinc-800/80">
      {TRAINING_SECTION_KEYS.map(({ key, heading }) => {
        const raw = sections?.[key];
        if (typeof raw !== "string" || !raw.trim()) return null;
        return (
          <section key={key} aria-labelledby={`training-${key}`}>
            <h2
              id={`training-${key}`}
              className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              {heading}
            </h2>
            <div className="mt-4">
              <ArticleBody content={raw.trim()} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
