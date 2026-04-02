import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BattleFinderJoinPanel } from "@/components/battle-finder/BattleFinderJoinPanel";
import { Container } from "@/components/ui/Container";
import { formatBattleScheduleTime } from "@/lib/battle-hub/display";
import { formatLabelToDisplay } from "@/lib/battle-hub/formats";
import { getBattleRequestById } from "@/lib/battle-finder/queries";
import { requestTypeLabel } from "@/lib/battle-finder/labels";
import { slotFillSummary } from "@/lib/battle-finder/slots";
import { canAccessAdmin } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import { createClient } from "@/lib/supabase/server";
import { site } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let title = "Battle request";
  try {
    const req = await getBattleRequestById(id);
    if (req?.title?.trim()) title = req.title.trim();
  } catch {
    /* ignore */
  }
  return { title: `${title} · Battle Finder`, description: `Battle Finder on ${site.name}.` };
}

export default async function BattleFinderDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await getSessionProfile();
  if (!session) {
    notFound();
  }

  let request = null;
  try {
    request = await getBattleRequestById(id);
  } catch {
    request = null;
  }
  if (!request) {
    notFound();
  }

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("tiktok_username")
    .eq("id", session.user.id)
    .maybeSingle();

  const defaultHandle =
    (profile?.tiktok_username && String(profile.tiktok_username).replace(/^@/, "")) ||
    session.user.email?.split("@")[0] ||
    "";

  const { filled, total, open } = slotFillSummary(request);
  const when = request.preferred_at
    ? formatBattleScheduleTime(request.preferred_at, request.timezone)
    : "Flexible timing";

  return (
    <div className="relative pb-24 pt-14 sm:pt-20">
      <Container className="relative max-w-2xl">
        <Link
          href="/battle-hub/finder"
          className="text-sm font-semibold text-zinc-500 transition hover:text-accent dark:hover:text-accent-muted"
        >
          ← Battle Finder
        </Link>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-accent-muted">
          {requestTypeLabel(request.request_type)}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          {(request.title ?? "").trim() || "Battle request"}
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Posted by <span className="font-medium text-zinc-700 dark:text-zinc-300">@{request.creator_display_handle}</span>
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-200/90 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/40 sm:p-8">
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Format</dt>
              <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">
                {formatLabelToDisplay(request.preferred_format, request.participant_count)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Headcount</dt>
              <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{request.participant_count} creators</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Preferred time</dt>
              <dd className="mt-1 text-zinc-700 dark:text-zinc-300">{when}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Slots</dt>
              <dd className="mt-1 font-medium text-zinc-950 dark:text-zinc-50">
                {filled}/{total} filled
                {open > 0 ? (
                  <span className="text-emerald-700 dark:text-emerald-400">
                    {" "}
                    · {open} open
                  </span>
                ) : null}
              </dd>
            </div>
          </dl>

          {request.notes ? (
            <div className="mt-6 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Notes</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {request.notes}
              </p>
            </div>
          ) : null}

          <div className="mt-8 border-t border-zinc-200/80 pt-8 dark:border-zinc-800/80">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Slots & actions</h2>
            <div className="mt-4">
              <BattleFinderJoinPanel
                request={request}
                currentUserId={session.user.id}
                defaultHandle={defaultHandle}
                showAdminEventLink={Boolean(session.profile && canAccessAdmin(session.profile.role))}
              />
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
