import Image from "next/image";
import Link from "next/link";
import { PrintBlockView } from "@/components/streameru/library/print-blocks";
import { brandAssets } from "@/lib/brand/assets";
import {
  getCurriculumLesson,
  getCurriculumNeighbors,
} from "@/lib/resources/curriculum";
import {
  LIBRARY_CATEGORIES,
  LIBRARY_KIND_LABELS,
  type LibraryResource,
} from "@/lib/streameru-library/types";
import { streamerULibraryHref } from "@/lib/streameru-library/urls";
import { streamerULessonHref } from "@/lib/streameru-url";
import { site } from "@/lib/site";

type Props = {
  resource: LibraryResource;
};

export function PrintableSheet({ resource }: Props) {
  const primarySlug = resource.lessonSlugs[0] ?? null;
  const lesson = primarySlug ? getCurriculumLesson(primarySlug) : null;
  const neighbors = primarySlug ? getCurriculumNeighbors(primarySlug) : { prev: null, next: null };
  const categoryLabel =
    LIBRARY_CATEGORIES.find((c) => c.id === resource.category)?.label ?? resource.category;
  const kindLabel = LIBRARY_KIND_LABELS[resource.kind];

  return (
    <article className="su-print-sheet relative overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-sm">
      <div
        className="su-print-watermark pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url(${brandAssets.watermarks.minimal})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "55%",
        }}
        aria-hidden
      />

      <header className="su-print-header relative border-b border-zinc-200 px-6 py-5 sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={brandAssets.logo.markPng(64)}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#5b3bff]">
                StreamerU · {site.name}
              </p>
              <p className="mt-0.5 text-xs font-medium text-zinc-500">
                {categoryLabel} · {kindLabel}
              </p>
            </div>
          </div>
          {lesson ? (
            <p className="shrink-0 text-right text-xs font-semibold text-zinc-500">
              Lesson {lesson.globalOrder}
              <span className="mt-0.5 block font-normal text-zinc-400">{lesson.programName}</span>
            </p>
          ) : null}
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
          {resource.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">{resource.description}</p>
      </header>

      <div className="su-print-body relative space-y-6 px-6 py-6 sm:px-8 sm:py-8">
        {(resource.blocks ?? []).map((block, i) => (
          <PrintBlockView key={`${block.type}-${i}`} block={block} />
        ))}
      </div>

      <footer className="su-print-footer relative border-t border-zinc-200 bg-zinc-50 px-6 py-5 sm:px-8">
        <p className="text-sm font-semibold text-zinc-900">
          Bring this filled sheet back when you finish your LIVE mission.
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-zinc-600">
          {lesson ? (
            <li>
              Continue lesson:{" "}
              <Link href={streamerULessonHref(lesson.slug)} className="font-semibold text-[#5b3bff] underline-offset-2 hover:underline">
                {lesson.title}
              </Link>
              <span className="su-print-url ml-1 text-xs text-zinc-400">
                ({site.url}
                {streamerULessonHref(lesson.slug)})
              </span>
            </li>
          ) : null}
          {neighbors.next ? (
            <li>
              Next lesson:{" "}
              <Link href={streamerULessonHref(neighbors.next.slug)} className="font-semibold text-[#5b3bff] underline-offset-2 hover:underline">
                {neighbors.next.title}
              </Link>
            </li>
          ) : null}
          <li>
            More free tools:{" "}
            <Link href={streamerULibraryHref()} className="font-semibold text-[#5b3bff] underline-offset-2 hover:underline">
              StreamerU Resource Library
            </Link>
            <span className="su-print-url ml-1 text-xs text-zinc-400">
              ({site.url}
              {streamerULibraryHref()})
            </span>
          </li>
        </ul>
        <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-zinc-400">
          {site.name} · Printable · Not for resale
        </p>
      </footer>
    </article>
  );
}
