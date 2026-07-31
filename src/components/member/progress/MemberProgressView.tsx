import Link from "next/link";
import { DashboardWidget } from "@/components/ui/DashboardWidget";
import { CelebrateGraduationButton } from "@/components/member/progress/CelebrateGraduationButton";
import type { CreatorProgressSummary } from "@/lib/growth/types";

type Props = {
  growth: CreatorProgressSummary;
};

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-muted-bg dark:bg-zinc-800">
      <div
        className="h-full rounded-full bg-accent transition-[width] duration-500"
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}

export function MemberProgressView({ growth }: Props) {
  const login = growth.snapshot.streaks.daily_login;
  const learning = growth.snapshot.streaks.weekly_learning;
  const live = growth.snapshot.streaks.weekly_live;

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-[#0B0F1A] via-[#141027] to-[#1a1028] px-5 py-6 text-zinc-50 sm:px-8 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_10%_0%,rgba(232,168,74,0.28),transparent_55%)]"
          aria-hidden
        />
        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-200/80">
              Factory XP · Level {growth.xp.level}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {growth.xp.tierName}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-300">
              {growth.xp.blurb}
            </p>
            <div className="mt-5 max-w-md space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>{growth.xp.total} Factory XP</span>
                <span>
                  {growth.xp.nextTierName
                    ? `${growth.xp.xpForNext} to ${growth.xp.nextTierName}`
                    : "Max rank"}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-amber-400"
                  style={{ width: `${growth.xp.percentToNext}%` }}
                />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-md">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Why log in today
            </p>
            <ul className="mt-3 space-y-2.5">
              {growth.dailyLoginReasons.map((r) => (
                <li key={r.label}>
                  <Link href={r.href} className="block rounded-xl px-1 py-1 hover:bg-white/[0.04]">
                    <span className="block text-sm font-semibold text-white">{r.label}</span>
                    <span className="mt-0.5 block text-xs text-zinc-400">{r.detail}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <DashboardWidget eyebrow="Consistency" title="Learning streaks">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Daily login", value: login?.current ?? 0, best: login?.longest ?? 0 },
              { label: "Weekly learn", value: learning?.current ?? 0, best: learning?.longest ?? 0 },
              { label: "Weekly LIVE", value: live?.current ?? 0, best: live?.longest ?? 0 },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border/70 bg-muted-bg/50 px-3 py-3 dark:border-zinc-800"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">
                  {s.label}
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">{s.value}</p>
                <p className="mt-1 text-xs text-muted">Best {s.best}</p>
              </div>
            ))}
          </div>
        </DashboardWidget>

        <DashboardWidget eyebrow="This week" title="Weekly challenges">
          {growth.weeklyChallenges.length === 0 ? (
            <p className="text-sm text-muted">Challenges assign after your next check-in.</p>
          ) : (
            <ul className="space-y-2">
              {growth.weeklyChallenges.map((m) => (
                <li
                  key={m.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/70 px-3 py-2.5 dark:border-zinc-800"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{m.title}</p>
                    {m.description ? (
                      <p className="mt-0.5 text-xs text-muted">{m.description}</p>
                    ) : null}
                  </div>
                  <div className="shrink-0 text-right">
                    <p
                      className={`text-xs font-bold ${
                        m.status === "completed"
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-muted"
                      }`}
                    >
                      {m.status === "completed" ? "Done" : "Active"}
                    </p>
                    {m.xpReward ? (
                      <p className="mt-0.5 text-xs font-semibold text-accent">
                        +{m.xpReward} Factory XP
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </DashboardWidget>
      </div>

      <div id="career" className="scroll-mt-24">
        <DashboardWidget eyebrow="Path" title="Career path">
          <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-2xl font-bold text-foreground">{growth.career.stageName}</p>
                <p className="mt-1 text-sm text-muted">
                  {growth.career.nextStageName
                    ? `Next: ${growth.career.nextStageName}`
                    : "Top of the career path"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    growth.career.mentorAppointed
                      ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
                      : growth.career.mentorEligible
                        ? "bg-amber-500/15 text-amber-900 dark:text-amber-100"
                        : "bg-muted-bg text-muted"
                  }`}
                >
                  Mentor{" "}
                  {growth.career.mentorAppointed
                    ? "appointed"
                    : growth.career.mentorEligible
                      ? "eligible"
                      : "locked"}
                </span>
                <span
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    growth.career.managerAppointed
                      ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
                      : growth.career.managerEligible
                        ? "bg-amber-500/15 text-amber-900 dark:text-amber-100"
                        : "bg-muted-bg text-muted"
                  }`}
                >
                  Manager{" "}
                  {growth.career.managerAppointed
                    ? "appointed"
                    : growth.career.managerEligible
                      ? "eligible"
                      : "locked"}
                </span>
              </div>
            </div>
            <ProgressBar percent={growth.career.percent} />
            <p className="text-xs leading-relaxed text-muted">
              Mentor and Manager are never granted by Factory XP alone. Eligibility unlocks
              consideration; staff appointment is required.
            </p>
            {!growth.career.mentorEligible && growth.career.mentorMissing.length > 0 ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  To reach mentor eligibility
                </p>
                <ul className="mt-2 space-y-1">
                  {growth.career.mentorMissing.map((item) => (
                    <li key={item} className="text-sm text-foreground">
                      · {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {growth.career.mentorEligible &&
            !growth.career.managerEligible &&
            growth.career.managerMissing.length > 0 ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  To reach manager eligibility
                </p>
                <ul className="mt-2 space-y-1">
                  {growth.career.managerMissing.map((item) => (
                    <li key={item} className="text-sm text-foreground">
                      · {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </DashboardWidget>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <DashboardWidget eyebrow="StreamerU" title="Semester progress">
          <ul className="space-y-3">
            {growth.semesters.map((s) => (
              <li key={s.programKey} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-semibold text-foreground">{s.programName}</span>
                  <span className="tabular-nums text-muted">
                    {s.completed}/{s.total}
                    {s.complete ? " · Certified" : ""}
                  </span>
                </div>
                <ProgressBar percent={s.percent} />
              </li>
            ))}
          </ul>
          <Link
            href="/streameru"
            className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent hover:underline dark:text-accent-muted"
          >
            Continue training →
          </Link>
        </DashboardWidget>

        <div id="certificates" className="scroll-mt-24">
          <DashboardWidget eyebrow="Rewards" title="Certificates">
            {growth.certificates.length === 0 ? (
              <p className="text-sm leading-relaxed text-muted">
                Finish a StreamerU semester to earn your first certificate.
              </p>
            ) : (
              <ul className="space-y-2">
                {growth.certificates.map((c) => (
                  <li
                    key={c.key}
                    className="rounded-xl border border-border/70 bg-muted-bg/40 px-3 py-2.5 dark:border-zinc-800"
                  >
                    <p className="text-sm font-semibold text-foreground">{c.name}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      Issued {new Date(c.issuedAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </DashboardWidget>
        </div>
      </div>

      <div id="graduation" className="scroll-mt-24">
        <DashboardWidget eyebrow="Ceremony" title="Graduation">
          {growth.graduation.status === "locked" ? (
            <p className="text-sm leading-relaxed text-muted">
              Complete all five StreamerU semesters to unlock your graduation ceremony.
            </p>
          ) : growth.graduation.status === "celebrated" ? (
            <div className="space-y-2">
              <p className="text-lg font-bold text-foreground">
                You are a StreamerU Graduate
              </p>
              <p className="text-sm text-muted">
                StreamerU Diploma · Certified LIVE Creator · listed on Hall of Fame → StreamerU
                Graduates
                {growth.graduation.celebratedAt
                  ? ` · celebrated ${new Date(growth.graduation.celebratedAt).toLocaleDateString()}`
                  : ""}
                . Mentor and Manager College tracks stay open.
              </p>
              <a
                href="/hall-of-fame#streameru-graduates-heading"
                className="inline-flex text-sm font-semibold text-accent underline-offset-2 hover:underline"
              >
                View StreamerU Graduates
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-lg font-bold text-foreground">Ceremony ready</p>
                <p className="mt-1 text-sm text-muted">
                  You finished the academy. Claim your StreamerU Diploma — your name joins Hall of
                  Fame → StreamerU Graduates as a Certified LIVE Creator.
                </p>
              </div>
              <CelebrateGraduationButton />
            </div>
          )}
        </DashboardWidget>
      </div>

      {growth.newestAchievement ? (
        <DashboardWidget eyebrow="Latest unlock" title="Achievements">
          <p className="text-base font-bold text-foreground">{growth.newestAchievement.name}</p>
          {growth.newestAchievement.description ? (
            <p className="mt-1 text-sm text-muted">{growth.newestAchievement.description}</p>
          ) : null}
        </DashboardWidget>
      ) : null}
    </div>
  );
}
