import Link from "next/link";
import { Reveal } from "@/components/hall-of-fame/Reveal";
import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { StreamerUGraduate } from "@/lib/hall-of-fame/types";
import { memberProfileUrl } from "@/lib/members/network-members";

type StreamerUGraduatesProps = {
  graduates: StreamerUGraduate[];
};

export function StreamerUGraduates({ graduates }: StreamerUGraduatesProps) {
  return (
    <section aria-labelledby="streameru-graduates-heading">
      <SectionHeader
        eyebrow="StreamerU"
        title="StreamerU Graduates"
        description="Academy alumni who completed StreamerU, earned the Diploma, and claimed Certified LIVE Creator status. Graduation is identity — not a participation sticker."
        tone="inverse"
        align="center"
      />
      <h2 id="streameru-graduates-heading" className="sr-only">
        StreamerU Graduates
      </h2>

      {graduates.length === 0 ? (
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 text-center">
          <p className="text-lg font-bold tracking-tight text-white">Be among the first</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Finish StreamerU, celebrate your ceremony, and your name lands here — with Diploma and
            Certified LIVE Creator on your path.
          </p>
          <Link
            href="/streameru"
            className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-5 text-sm font-bold text-white transition hover:bg-accent-hover"
          >
            Enter StreamerU
          </Link>
        </div>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {graduates.map((graduate, i) => {
            const handle = graduate.tiktokUsername.replace(/^@/, "");
            const card = (
              <article className="flex h-full flex-col rounded-2xl border border-amber-200/20 bg-white/[0.04] p-5 transition-[border-color,transform] hover:border-amber-200/40 motion-reduce:transform-none sm:p-6">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-amber-200/90">
                  StreamerU Graduate
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <CreatorAvatar
                    username={handle}
                    preferredImageUrl={graduate.avatarUrl}
                    fallbackBackdropClass="bg-gradient-to-br from-amber-500/80 to-[#5B3BFF]"
                    fallbackInitial={(graduate.displayName[0] || "?").toUpperCase()}
                    className="h-12 w-12"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold tracking-tight text-white">
                      {graduate.displayName}
                    </h3>
                    {handle ? (
                      <p className="truncate text-sm text-zinc-400">@{handle}</p>
                    ) : null}
                  </div>
                </div>
                <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-sm">
                  <li className="font-semibold text-zinc-200">{graduate.diplomaLabel}</li>
                  <li className="text-zinc-400">{graduate.certifiedLabel}</li>
                  {graduate.careerPath ? (
                    <li className="text-xs font-bold uppercase tracking-wider text-accent-muted">
                      Career path · {graduate.careerPath}
                    </li>
                  ) : null}
                </ul>
                <p className="mt-3 text-xs text-zinc-500">
                  Graduated{" "}
                  {new Date(graduate.graduatedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </article>
            );

            return (
              <li key={graduate.memberId}>
                <Reveal delayMs={Math.min(i * 40, 240)}>
                  {handle ? (
                    <a
                      href={memberProfileUrl(handle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transform-none"
                      aria-label={`StreamerU Graduate ${graduate.displayName}`}
                    >
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
