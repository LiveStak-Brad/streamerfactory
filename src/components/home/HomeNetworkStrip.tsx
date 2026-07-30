import Link from "next/link";
import { CreatorAvatar } from "@/components/members/CreatorAvatar";
import { Container } from "@/components/ui/Container";
import type { NetworkMember } from "@/lib/members/network-members";

type HomeNetworkStripProps = {
  members: NetworkMember[];
  memberCount: number;
};

function fallbackInitial(name: string): string {
  const cleaned = name.replace(/[^\p{L}\p{N}]/gu, "").trim();
  return (cleaned[0] || "?").toUpperCase();
}

export function HomeNetworkStrip({ members, memberCount }: HomeNetworkStripProps) {
  const shown = members.slice(0, 14);

  return (
    <section className="relative border-b border-border/70 bg-surface/90 py-5 backdrop-blur-md dark:bg-zinc-950/50">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <p className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Creators inside
            </p>
            <div className="flex min-h-9 min-w-0 items-center -space-x-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {shown.map((m, i) => (
                <CreatorAvatar
                  key={m.username}
                  username={m.username}
                  preferredImageUrl={m.avatarUrl}
                  fallbackBackdropClass={
                    i % 2 === 0
                      ? "bg-gradient-to-br from-indigo-500 to-violet-600"
                      : "bg-gradient-to-br from-fuchsia-500 to-violet-700"
                  }
                  fallbackInitial={fallbackInitial(m.displayName || m.username)}
                  className="h-9 w-9 shrink-0 ring-2 ring-surface dark:ring-zinc-950"
                  priority={i < 8}
                />
              ))}
              {memberCount > shown.length ? (
                <span className="ml-3 inline-flex h-9 shrink-0 items-center rounded-full border border-border bg-muted-bg px-3 text-xs font-semibold text-muted">
                  +{memberCount - shown.length}
                </span>
              ) : null}
            </div>
          </div>
          <Link
            href="/members"
            className="shrink-0 text-sm font-semibold text-accent transition-colors hover:text-accent-hover dark:text-accent-muted"
          >
            Browse directory →
          </Link>
        </div>
      </Container>
    </section>
  );
}
