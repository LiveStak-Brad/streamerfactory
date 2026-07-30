import type { Metadata } from "next";
import type { ReactNode } from "react";
import { requireNetworkMember } from "@/lib/auth/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function MemberLayout({ children }: { children: ReactNode }) {
  await requireNetworkMember();
  return <>{children}</>;
}
