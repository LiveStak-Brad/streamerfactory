import { Reveal } from "@/components/hall-of-fame/Reveal";
import { Container } from "@/components/ui/Container";
import { FOUNDER_FAQS } from "@/lib/founder/content";

export function FounderFaq() {
  return (
    <section
      aria-labelledby="founder-faq-heading"
      className="relative border-b border-white/5 bg-[#11101a] py-20 sm:py-24"
    >
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-muted">FAQ</p>
          <h2
            id="founder-faq-heading"
            className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            Straight answers about live streaming, TikTok LIVE growth, and joining Streamer Factory.
          </p>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FOUNDER_FAQS.map((faq, i) => (
            <Reveal key={faq.question} delayMs={i * 40}>
              <details className="group rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-1 open:bg-white/[0.06] open:shadow-[0_0_32px_-16px_rgba(91,59,255,0.45)]">
                <summary className="cursor-pointer list-none py-4 text-left text-base font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span>{faq.question}</span>
                    <span
                      className="mt-0.5 shrink-0 text-cyan-200/80 transition-transform duration-200 group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="border-t border-white/10 pb-5 pt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
