import Link from "next/link";
import { FIRST_PROGRAM_LESSON_SLUG } from "@/lib/resources/curriculum";

const FAILURES = [
  { title: "No consistency", fix: "Covered in Beginner Foundations weekly LIVE habits" },
  { title: "No structure", fix: "Covered in first LIVE structure and run-of-show lessons" },
  { title: "No retention", fix: "Covered in Live Streaming Mastery hooks and loops" },
  { title: "No strategy", fix: "Covered in battles, growth systems, and Advanced Creator" },
  { title: "Breaking rules", fix: "Essential safety taught in Program 1 before regular LIVE" },
  { title: "Giving up too early", fix: "Missions, certificates, and diploma path keep momentum" },
] as const;

/**
 * Problem → academy answer section for conversion + clarity.
 */
export function WhyCreatorsFail() {
  return (
    <section
      className="rounded-2xl border border-border/80 bg-surface/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/50 sm:p-8"
      aria-labelledby="why-fail-heading"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
        Reality check
      </p>
      <h2
        id="why-fail-heading"
        className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
      >
        Why most new creators never grow
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        It&apos;s rarely talent. It&apos;s missing systems. StreamerU is built so each of these
        failure points has a lesson, quiz, and LIVE exam waiting for you — free inside Streamer
        Factory.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {FAILURES.map((item) => (
          <li
            key={item.title}
            className="rounded-xl border border-border/70 bg-muted-bg/35 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/35"
          >
            <p className="text-sm font-bold text-foreground">{item.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{item.fix}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm">
        <Link
          href={`/streameru/${FIRST_PROGRAM_LESSON_SLUG}`}
          className="font-semibold text-accent hover:underline dark:text-accent-muted"
        >
          Start streaming smarter → Start StreamerU Today
        </Link>
      </p>
    </section>
  );
}
