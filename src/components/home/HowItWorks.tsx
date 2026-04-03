import { Section } from "@/components/ui/Section";

const steps = [
  {
    step: "01",
    title: "Apply",
    body: "Tell us about your LIVE presence, goals, and schedule. A few minutes — tied to your account so nothing gets lost.",
  },
  {
    step: "02",
    title: "Get reviewed",
    body: "We evaluate fit and readiness. Your application status stays visible in the app so you always know where things stand.",
  },
  {
    step: "03",
    title: "Onboard",
    body: "If it’s a match, we walk you through expectations, StreamerU, and how the network operates — learn, connect, then open the tools.",
  },
  {
    step: "04",
    title: "Schedule & grow",
    body: "Use Battle Hub, the shared calendar, and Battle Finder to coordinate LIVE battles — with coaching and check-ins as you scale.",
  },
] as const;

const cardClass =
  "group relative rounded-2xl border border-zinc-200/90 bg-surface p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.38)] motion-reduce:transform-none motion-reduce:transition-none dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-accent/40 dark:hover:shadow-[0_22px_48px_-26px_rgba(0,0,0,0.58)]";

export function HowItWorks() {
  return (
    <Section id="how-it-works" variant="muted">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent dark:text-accent-muted">
          Process
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
          How it works
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
          A straightforward process—designed to move fast without cutting corners.
        </p>
      </div>
      <ol className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.step} className={cardClass}>
            <span className="inline-flex rounded-md border border-accent/25 bg-accent-soft px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-accent dark:border-accent/35 dark:text-accent-muted">
              {s.step}
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
