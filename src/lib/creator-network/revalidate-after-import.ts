import { revalidatePath } from "next/cache";

/** Bust Next.js cache for pages that read Creator Network imports. */
export function revalidateCreatorNetworkSitePages(): void {
  revalidatePath("/rankings");
  revalidatePath("/hall-of-fame");
  revalidatePath("/members");
  revalidatePath("/admin/creator-network");
  revalidatePath("/admin/hall-of-fame");
  revalidatePath("/member/dashboard");
  revalidatePath("/member/leaderboard");
}

export function revalidateCreatorNetworkLivePages(): void {
  revalidatePath("/members");
  revalidatePath("/member/dashboard");
  revalidatePath("/admin/creator-network");
}
