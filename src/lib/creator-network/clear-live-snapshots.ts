import { createClient } from "@/lib/supabase/server";
import { revalidateCreatorNetworkLivePages } from "@/lib/creator-network/revalidate-after-import";

const DEFAULT_HOURS = 12;

/** Remove recent LIVE snapshot rows so staff can re-sync from a clean slate. */
export async function clearRecentLiveSnapshots(
  hours: number = DEFAULT_HOURS,
): Promise<{ deleted: number } | { error: string }> {
  const supabase = await createClient();
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

  const { data: batches, error: batchErr } = await supabase
    .from("creator_network_import_batches")
    .select("id")
    .gte("created_at", since);

  if (batchErr) {
    return { error: batchErr.message };
  }

  const batchIds = (batches ?? []).map((b) => b.id as string);
  if (batchIds.length === 0) {
    return { deleted: 0 };
  }

  const { data: deletedRows, error: delErr } = await supabase
    .from("creator_network_live_snapshots")
    .delete()
    .in("batch_id", batchIds)
    .select("id");

  if (delErr) {
    return { error: delErr.message };
  }

  const deleted = deletedRows?.length ?? 0;
  if (deleted > 0) {
    revalidateCreatorNetworkLivePages();
  }

  return { deleted };
}
