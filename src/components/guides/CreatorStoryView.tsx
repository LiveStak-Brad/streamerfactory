import Link from "next/link";
import type { CreatorStory } from "@/lib/guides/creator-stories";
import { Section } from "@/components/ui/Section";

/**
 * Renders a verified creator story. Callers must only pass published stories.
 */
export function CreatorStoryView({ story }: { story: CreatorStory }) {
  return (
    <article>
      <Section className="!pt-12 sm:!pt-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
            Creator story
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            {story.title}
          </h1>
          <p className="mt-4 text-sm text-muted">@{story.publicHandle.replace(/^@/, "")}</p>
          <p className="mt-6 text-lg leading-relaxed text-muted">{story.summary}</p>
        </div>
      </Section>

      {story.timeline && story.timeline.length > 0 ? (
        <Section variant="muted">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">Growth timeline</h2>
            <ol className="mt-6 space-y-4">
              {story.timeline.map((item) => (
                <li key={item.label} className="rounded-xl border border-border/70 px-4 py-3">
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1 text-sm text-muted">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      ) : null}

      {story.trainingCompleted && story.trainingCompleted.length > 0 ? (
        <Section>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">Training completed</h2>
            <ul className="mt-4 space-y-2 text-muted">
              {story.trainingCompleted.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {story.battleHighlights && story.battleHighlights.length > 0 ? (
        <Section variant="muted">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">Battle achievements</h2>
            <ul className="mt-4 space-y-2 text-muted">
              {story.battleHighlights.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {story.beforeAfter ? (
        <Section>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/70 p-5">
              <h2 className="text-lg font-bold text-foreground">Before</h2>
              <p className="mt-2 text-sm text-muted">{story.beforeAfter.before}</p>
            </div>
            <div className="rounded-2xl border border-border/70 p-5">
              <h2 className="text-lg font-bold text-foreground">After</h2>
              <p className="mt-2 text-sm text-muted">{story.beforeAfter.after}</p>
            </div>
          </div>
        </Section>
      ) : null}

      {story.lessonsLearned && story.lessonsLearned.length > 0 ? (
        <Section variant="elevated">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">Lessons learned</h2>
            <ul className="mt-4 space-y-3 text-muted">
              {story.lessonsLearned.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {story.interviewQuotes && story.interviewQuotes.length > 0 ? (
        <Section>
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold text-foreground">In their words</h2>
            {story.interviewQuotes.map((q) => (
              <blockquote
                key={q.quote}
                className="border-l-2 border-accent pl-4 text-lg italic text-foreground"
              >
                “{q.quote}”
                {q.context ? <footer className="mt-2 text-sm not-italic text-muted">{q.context}</footer> : null}
              </blockquote>
            ))}
          </div>
        </Section>
      ) : null}

      {(story.relatedGuideSlugs?.length || story.relatedLessonHrefs?.length) ? (
        <Section variant="muted">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-foreground">Related resources</h2>
            <ul className="mt-4 space-y-2">
              {story.relatedGuideSlugs?.map((slug) => (
                <li key={slug}>
                  <Link href={`/guides/${slug}`} className="font-semibold text-accent hover:underline dark:text-accent-muted">
                    Guide: {slug}
                  </Link>
                </li>
              ))}
              {story.relatedLessonHrefs?.map((href) => (
                <li key={href}>
                  <Link href={href} className="font-semibold text-accent hover:underline dark:text-accent-muted">
                    {href}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}
    </article>
  );
}
