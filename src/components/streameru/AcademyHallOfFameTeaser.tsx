import Link from "next/link";
import { CredentialBadge } from "@/components/credentials";
import { Button } from "@/components/ui/Button";

/**
 * Social-proof teaser for Hall of Fame graduates — placed above FAQ on the hub.
 */
export function AcademyHallOfFameTeaser() {
  return (
    <section
      className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/[0.08] via-surface to-surface p-6 dark:border-amber-400/20 dark:from-amber-500/10 dark:via-zinc-950 dark:to-zinc-950 sm:p-8"
      aria-labelledby="su-hof-teaser-heading"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="mx-auto shrink-0 sm:mx-0">
          <CredentialBadge type="hall_of_fame_graduate" size="lg" />
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-200/90">
            Social proof
          </p>
          <h2
            id="su-hof-teaser-heading"
            className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            Hall of Fame Graduates
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Academy alumni who earned the StreamerU Diploma and Certified LIVE Creator recognition.
            Finish the path — then claim your place among graduates.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Button
              href="/hall-of-fame#streameru-graduates-heading"
              variant="primary"
              className="min-h-[44px] px-5"
            >
              Meet the graduates
            </Button>
            <Link
              href="/streameru/graduation"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground dark:border-zinc-700"
            >
              Graduation Exam →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
