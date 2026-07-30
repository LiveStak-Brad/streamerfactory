import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    step: "01",
    title: "Join on TikTok",
    body: "Apply through TikTok's Creator Network for Streamer Factory — that's where invitations and membership run.",
  },
  {
    step: "02",
    title: "Request site access",
    body: "After TikTok approves you, sign in here and send contact details so we can verify you and turn on tools.",
  },
  {
    step: "03",
    title: "We verify",
    body: "Our team matches your TikTok profile to your request manually — then promotes your login when it checks out.",
  },
  {
    step: "04",
    title: "Schedule & grow",
    body: "Use Battle Hub, the shared calendar, and Battle Finder to coordinate LIVE battles — with coaching as you scale.",
  },
] as const;

export function HowItWorks() {
  return (
    <Section id="how-it-works" variant="default">
      <SectionHeader
        align="left"
        eyebrow="Process"
        title="How it works"
        description="A straightforward path—designed to move fast without cutting corners."
      />
      <ol className="relative mt-12 space-y-0 border-l border-accent/30 pl-6 sm:pl-8">
        {steps.map((s, index) => (
          <li key={s.step} className={`relative ${index < steps.length - 1 ? "pb-10" : ""}`}>
            <span
              className="absolute -left-[1.9rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-[0.65rem] font-bold text-accent shadow-[0_0_0_4px_var(--background)] dark:border-accent/50 dark:text-accent-muted sm:-left-[2.35rem]"
              aria-hidden
            >
              {index + 1}
            </span>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent dark:text-accent-muted">
              Step {s.step}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{s.title}</h3>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
