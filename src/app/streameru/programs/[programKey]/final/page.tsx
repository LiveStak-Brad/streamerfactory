import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgramFinalClient } from "@/components/streameru/assessments/ProgramFinalClient";
import { getAcademyProgram } from "@/lib/assessments/programs";
import { getProgramFinal, publicQuizView } from "@/lib/assessments/registry";
import { site } from "@/lib/site";
import type { TrainingTrackId } from "@/lib/resources/tracks";

type Props = {
  params: Promise<{ programKey: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { programKey } = await params;
  const exam = getProgramFinal(programKey);
  if (!exam) return { title: "Program Final" };
  return {
    title: exam.title,
    description: `Program Final Exam for ${exam.programName}`,
    alternates: { canonical: `/streameru/programs/${programKey}/final` },
    openGraph: {
      title: `${exam.title} | ${site.name}`,
      url: `${site.url}/streameru/programs/${programKey}/final`,
    },
  };
}

export default async function ProgramFinalPage({ params }: Props) {
  const { programKey } = await params;
  const program = getAcademyProgram(programKey as TrainingTrackId);
  const exam = getProgramFinal(programKey);
  if (!program || !exam) notFound();

  const view = publicQuizView(exam);

  return (
    <article className="mx-auto max-w-3xl pb-20 pt-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/streameru" className="hover:text-accent hover:underline">
          StreamerU
        </Link>
        <span className="mx-2">/</span>
        <span>{program.programName}</span>
        <span className="mx-2">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">Program Final</span>
      </nav>

      <header className="mt-8 border-b border-zinc-200/80 pb-8 dark:border-zinc-800">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Program Final Exam
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          {exam.title}
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          {program.lessons.length === 0
            ? `${program.programName} has no published lessons yet. This Program Final stays available for review; the Program Certificate issues when the path is complete.`
            : `Pass at 80% to unlock the ${program.programName} Certificate (after all LIVE missions in this program are complete). Earns StreamerU XP.`}
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          Path: Lesson → Quiz → Mission →{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">Program Final</span> →
          Certificate → Next Program
        </p>
      </header>

      <div className="mt-10">
        <ProgramFinalClient
          assessmentKey={view.key}
          title={view.title}
          programKey={program.programKey}
          questions={view.questions}
        />
      </div>

      <div className="mt-10">
        <Link
          href="/streameru"
          className="text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
        >
          ← Back to StreamerU
        </Link>
      </div>
    </article>
  );
}
