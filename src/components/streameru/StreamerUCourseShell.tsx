"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { StreamerUCurriculumSidebar } from "@/components/streameru/StreamerUCurriculumSidebar";

function parseCurrentLessonSlug(pathname: string): string | null {
  const clean = pathname.replace(/\/$/, "") || "/";
  const match = clean.match(/^\/(?:resources|streameru)\/([^/]+)$/);
  if (!match) return null;
  const seg = match[1];
  if (seg === "start-here") return null;
  return seg;
}

type Props = {
  publishedSlugs: string[];
  children: React.ReactNode;
};

export function StreamerUCourseShell({ publishedSlugs, children }: Props) {
  const pathname = usePathname();
  const currentSlug = useMemo(() => parseCurrentLessonSlug(pathname), [pathname]);
  const set = useMemo(() => new Set(publishedSlugs), [publishedSlugs]);

  return (
    <div className="relative min-h-screen">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(480px,70vh)] bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,rgba(91, 59, 255,0.16),transparent_68%)] dark:bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,rgba(91, 59, 255,0.1),transparent_68%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-70" aria-hidden />

      <div className="relative mx-auto max-w-[1600px] px-4 pb-20 pt-6 sm:px-6 lg:flex lg:gap-10 lg:pt-8">
        <StreamerUCurriculumSidebar publishedSlugs={set} currentSlug={currentSlug} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
