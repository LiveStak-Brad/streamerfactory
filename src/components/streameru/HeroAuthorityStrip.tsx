import Image from "next/image";
import Link from "next/link";
import { FOUNDER, FOUNDER_STATS } from "@/lib/founder/content";

const QUALIFICATIONS = [
  FOUNDER_STATS.find((s) => s.id === "earned")?.display
    ? `${FOUNDER_STATS.find((s) => s.id === "earned")!.display} earned through LIVE streaming`
    : "Hundreds of thousands earned through LIVE streaming",
  "Former #1 All-Time Creator on Kik LIVE",
  "Still #2 All-Time overall & #1 Male after years away",
  "MeetMe Top Badge earned in 22 days",
  "TikTok LIVE Pro",
  "Proven success growing new accounts from scratch",
  "30,000–123,000+ followers across multiple LIVE platforms",
  "6+ years professional livestreaming across six apps",
] as const;

/**
 * Professional qualifications under the StreamerU hero title — not a brag strip.
 */
export function HeroAuthorityStrip() {
  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 sm:px-5">
      <div className="flex items-start gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/20 ring-2 ring-white/10">
          <Image
            src={FOUNDER.photo}
            alt={FOUNDER.name}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent-muted">
            Built from the experience of {FOUNDER.name}
          </p>
          <p className="mt-1 text-xs font-semibold text-zinc-300">
            Founder of Streamer Factory · TikTok LIVE Pro · #1 Kik Creator
          </p>
          <p className="mt-1.5 text-sm text-zinc-400">
            Qualifications that shaped this academy — real rooms, real platforms, real results.
          </p>
        </div>
      </div>
      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {QUALIFICATIONS.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-xs leading-snug text-zinc-300 sm:text-[13px]"
          >
            <span
              className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-accent-muted"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-zinc-500">
        <Link
          href="/founder"
          className="font-semibold text-zinc-300 underline-offset-2 hover:text-white hover:underline"
        >
          Meet the founder
        </Link>
        {" · "}
        <Link
          href="/about"
          className="font-semibold text-zinc-300 underline-offset-2 hover:text-white hover:underline"
        >
          How Streamer Factory works
        </Link>
      </p>
    </div>
  );
}
