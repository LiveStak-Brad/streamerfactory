import {
  getImportedStatsForAdmin,
  getImportMatchReviewSummary,
  getRecentImportBatches,
} from "@/lib/creator-network/queries";
import { CreatorNetworkAdminPanel } from "@/components/admin/CreatorNetworkAdminPanel";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Creator Network imports",
  description: "Review TikTok Creator Network data synced from the Chrome extension.",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminCreatorNetworkPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const username = typeof sp.username === "string" ? sp.username : undefined;
  const matched = typeof sp.matched === "string" ? (sp.matched as "matched" | "unmatched") : undefined;
  const batchId = typeof sp.batchId === "string" ? sp.batchId : undefined;

  let batches: Awaited<ReturnType<typeof getRecentImportBatches>> = [];
  let stats: Awaited<ReturnType<typeof getImportedStatsForAdmin>> = [];
  let tablesMissing = false;
  let matchReview = { matchedProfiles: 0, unmatchedProfiles: 0, lowConfidenceMatches: 0 };

  try {
    batches = await getRecentImportBatches(30);
  } catch {
    tablesMissing = true;
  }

  try {
    stats = await getImportedStatsForAdmin({ username, matched, batchId, limit: 150 });
    matchReview = await getImportMatchReviewSummary();
  } catch {
    if (!tablesMissing) tablesMissing = true;
  }

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-wider text-accent dark:text-accent-muted">Admin</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Creator Network imports
        </h1>
        <p className="mt-2 max-w-3xl text-zinc-600 dark:text-zinc-400">
          Data is read from visible TikTok Backstage pages by authorized staff using the Chrome extension.
          Nothing is scraped from TikTok cookies or hidden tokens.           Public <code className="text-xs">/rankings</code> uses the latest completed stats import when
          available; otherwise it falls back to the seed snapshot.
        </p>

        {tablesMissing ? (
          <p className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
            Import tables are missing. Apply{" "}
            <code className="text-xs">supabase/migrations/20250601120000_creator_network_import.sql</code> in
            Supabase, then refresh.
          </p>
        ) : null}

        <div className="mt-10">
          <CreatorNetworkAdminPanel
            batches={batches}
            stats={stats}
            initialBatchId={batchId}
            matchReview={matchReview}
          />
        </div>
      </Container>
    </section>
  );
}
