import { ArticleBody } from "@/components/resources/ArticleBody";
import {
  TRAINING_SECTION_KEYS,
  hasAnyTrainingSection,
  type TrainingSectionsJson,
} from "@/lib/resources/training-sections";

type Props = {
  sections: TrainingSectionsJson | null | undefined;
  /** Hide action_checklist here when rendered as download cards instead */
  omitActionChecklist?: boolean;
};

/**
 * Structured lesson blocks (optional). Main article body still lives in `content`.
 */
export function ResourceArticleTraining({ sections, omitActionChecklist = false }: Props) {
  if (!hasAnyTrainingSection(sections ?? null)) return null;

  const units = TRAINING_SECTION_KEYS.flatMap(({ key, heading }) => {
    if (omitActionChecklist && key === "action_checklist") return [];
    const raw = sections?.[key];
    if (typeof raw !== "string" || !raw.trim()) return [];
    return [{ key, heading, content: raw.trim() }];
  });

  return (
    <div className="space-y-10 border-b border-zinc-200/80 pb-12 dark:border-zinc-800/80">
      {units.map((unit, index) => (
        <section key={unit.key} className="su-unit" aria-labelledby={`training-${unit.key}`}>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent dark:text-accent-muted">
            Unit {index + 1}
          </p>
          <h2
            id={`training-${unit.key}`}
            className="mt-1.5 text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            {unit.heading}
          </h2>
          <div className="mt-4">
            <ArticleBody content={unit.content} />
          </div>
        </section>
      ))}
    </div>
  );
}
