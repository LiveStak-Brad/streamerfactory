import {
  getImportedStatsForAdmin,
  getImportMatchReviewSummary,
  getRecentImportBatches,
} from "@/lib/creator-network/queries";
import { CreatorNetworkAdminPanel } from "@/components/admin/CreatorNetworkAdminPanel";
import { AdminAlert } from "@/components/admin/ui/AdminAlert";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
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
    <section className="py-10 sm:py-14">
      <Container>
        <AdminPageHeader
          title="Creator Network imports"
          description={
            <>
              Phase 1A diagnostics: page type, parser version, confidence, validation
              failures/warnings, fields updated vs preserved, and roster-diff preview. Missing hours
              show as “—” (not zero). Static{" "}
              <code className="rounded bg-muted-bg px-1 py-0.5 text-xs">NETWORK_MEMBERS</code>{" "}
              entries are not authoritative active roster — migration to roster-sync is Phase 1B.
              Public <code className="rounded bg-muted-bg px-1 py-0.5 text-xs">/rankings</code> uses
              Activeness imports only.
            </>
          }
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "CN imports" },
          ]}
        />

        {tablesMissing ? (
          <div className="mt-6">
            <AdminAlert title="Import tables are missing" tone="warning">
              Apply{" "}
              <code className="text-xs">supabase/migrations/20250601120000_creator_network_import.sql</code>{" "}
              in Supabase, then refresh.
            </AdminAlert>
          </div>
        ) : null}

        <div className="mt-8">
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
