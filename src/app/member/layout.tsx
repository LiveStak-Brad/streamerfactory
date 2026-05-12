import type { ReactNode } from "react";
import { requireNetworkMember } from "@/lib/auth/server";

export default async function MemberLayout({ children }: { children: ReactNode }) {
  await requireNetworkMember();
  return <>{children}</>;
}
