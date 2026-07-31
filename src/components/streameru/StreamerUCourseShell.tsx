"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { StreamerUCurriculumSidebar } from "@/components/streameru/StreamerUCurriculumSidebar";

function parseCurrentLessonSlug(pathname: string): string | null {
  const clean = pathname.replace(/\/$/, "") || "/";
  const match = clean.match(/^\/(?:resources|streameru)\/([^/]+)$/);
  if (!match) return null;
  const seg = match[1];
  if (seg === "start-here" || seg === "library") return null;
  return seg;
}

function isLibraryPrintPath(pathname: string): boolean {
  const clean = pathname.replace(/\/$/, "") || "/";
  return /^\/(?:resources|streameru)\/library\/[^/]+$/.test(clean);
}

type Props = {
  publishedSlugs: string[];
  children: React.ReactNode;
};

export function StreamerUCourseShell({ publishedSlugs, children }: Props) {
  const pathname = usePathname();
  const currentSlug = useMemo(() => parseCurrentLessonSlug(pathname), [pathname]);
  const set = useMemo(() => new Set(publishedSlugs), [publishedSlugs]);
  const printMode = useMemo(() => isLibraryPrintPath(pathname), [pathname]);

  return (
    <div
      className={`relative min-h-screen${printMode ? " su-print-mode" : ""}`}
      data-su-print={printMode ? "true" : undefined}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(520px,72vh)] bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,rgba(91,59,255,0.18),transparent_68%)] dark:bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,rgba(91,59,255,0.12),transparent_68%)] no-print"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent opacity-80 no-print"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1600px] px-4 pb-20 pt-5 sm:px-6 lg:flex lg:gap-8 lg:pt-7 xl:gap-10">
        <div className="no-print">
          <StreamerUCurriculumSidebar publishedSlugs={set} currentSlug={currentSlug} />
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
