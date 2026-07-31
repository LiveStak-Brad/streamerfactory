import type { Metadata } from "next";
import Link from "next/link";
import { GraduationExamClient } from "@/components/streameru/assessments/GraduationExamClient";
import { getGraduationExam, publicQuizView } from "@/lib/assessments/registry";
import { getSessionProfile } from "@/lib/auth/server";
import {
  getGraduationState,
  listMemberCertificates,
} from "@/lib/growth/certificates/engine";
import { graduateCertificateKey } from "@/lib/assessments/programs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "StreamerU Graduation Exam",
  description: "Pass the StreamerU Graduation Exam to earn your diploma.",
  alternates: { canonical: "/streameru/graduation" },
  openGraph: {
    title: `StreamerU Graduation Exam | ${site.name}`,
    url: `${site.url}/streameru/graduation`,
  },
};

export default async function GraduationPage() {
  const exam = getGraduationExam();
  const view = publicQuizView(exam);
  const session = await getSessionProfile();

  let initiallyEligible = false;
  let diplomaIssued = false;

  if (session?.user) {
    const [grad, certs] = await Promise.all([
      getGraduationState(session.user.id),
      listMemberCertificates(session.user.id),
    ]);
    initiallyEligible = Boolean(grad);
    diplomaIssued = certs.some((c) => c.key === graduateCertificateKey());
  }

  return (
    <article className="mx-auto max-w-3xl pb-20 pt-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/streameru" className="hover:text-accent hover:underline">
          StreamerU
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">Graduation Exam</span>
      </nav>

      <header className="mt-8 border-b border-zinc-200/80 pb-8 dark:border-zinc-800">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
          Graduation
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          {exam.title}
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Comprehensive exam across all five programs. Pass at 80% after completing the five-program
          academy path (LIVE exams + Program Finals) to earn your StreamerU Diploma — the Professional
          LIVE Creator credential.
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          Path: Programs → Program Certificates →{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">Graduation Exam</span> →
          StreamerU Diploma → Manager College (expanding)
        </p>
      </header>

      <div className="mt-10">
        <GraduationExamClient
          assessmentKey={view.key}
          title={view.title}
          questions={view.questions}
          initiallyEligible={initiallyEligible}
          diplomaIssued={diplomaIssued}
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
