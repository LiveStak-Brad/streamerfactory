import type { LessonFaq as LessonFaqItem } from "@/lib/resources/lesson-seo";

type Props = {
  faqs: LessonFaqItem[];
};

/**
 * Visible FAQ block for StreamerU lessons (pairs with FAQPage JSON-LD).
 */
export function LessonFaq({ faqs }: Props) {
  if (faqs.length === 0) return null;

  return (
    <section className="mt-14" aria-labelledby="lesson-faq-heading">
      <h2
        id="lesson-faq-heading"
        className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-2xl"
      >
        Frequently asked questions
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Practical answers for creators working through this lesson—written for real LIVEs, not theory.
      </p>
      <dl className="mt-8 space-y-8">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <dt className="text-base font-semibold text-zinc-950 dark:text-zinc-50 sm:text-lg">
              {faq.question}
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
