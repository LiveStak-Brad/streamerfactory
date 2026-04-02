"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { isOwnerRole } from "@/lib/auth/access";
import { getSessionProfile } from "@/lib/auth/server";
import type { OwnerNetworkViewMode } from "@/lib/auth/network-view";

const COOKIE_NAME = "sf_network_view";
const MAX_AGE_SEC = 60 * 60 * 24 * 180;

export async function setOwnerNetworkViewModeAction(mode: OwnerNetworkViewMode): Promise<void> {
  const session = await getSessionProfile();
  if (!session?.profile || !isOwnerRole(session.profile.role)) {
    return;
  }
  const store = await cookies();
  store.set(COOKIE_NAME, mode, {
    path: "/",
    maxAge: MAX_AGE_SEC,
    sameSite: "lax",
    httpOnly: true,
  });
  revalidatePath("/", "layout");
}
