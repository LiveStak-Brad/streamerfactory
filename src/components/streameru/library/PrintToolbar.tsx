"use client";

import Link from "next/link";
import { streamerULibraryHref } from "@/lib/streameru-library/urls";
import { streamerULessonHref } from "@/lib/streameru-url";

type Props = {
  lessonSlug?: string | null;
  pdfUrl?: string;
  resourceTitle: string;
};

export function PrintToolbar({ lessonSlug, pdfUrl, resourceTitle }: Props) {
  return (
    <div className="su-print-toolbar no-print mb-6 flex flex-col gap-3 rounded-2xl border border-border/80 bg-surface/90 p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent dark:text-accent-muted">
          StreamerU Library
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-foreground">{resourceTitle}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white shadow-md transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-zinc-950"
        >
          Print / Save as PDF
        </button>
        {pdfUrl ? (
          <a
            href={pdfUrl}
            download
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted-bg"
          >
            Download PDF
          </a>
        ) : null}
        {lessonSlug ? (
          <Link
            href={streamerULessonHref(lessonSlug)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted-bg"
          >
            Open lesson
          </Link>
        ) : null}
        <Link
          href={streamerULibraryHref()}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted-bg"
        >
          Browse library
        </Link>
      </div>
    </div>
  );
}
