import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { isOwnerRole } from "@/lib/auth/access";
import { getOwnerNetworkViewMode } from "@/lib/auth/network-view";
import { getSessionProfile } from "@/lib/auth/server";
import { defaultMetadata } from "@/lib/metadata";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans-variable",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSessionProfile();
  const ownerNetworkViewMode =
    session?.profile && isOwnerRole(session.profile.role) ? await getOwnerNetworkViewMode() : null;

  return (
    <html lang="en" className={`${dmSans.variable} h-full scroll-smooth`}>
      <body className="relative flex min-h-full flex-col font-sans text-foreground antialiased">
        <div className="page-backdrop" aria-hidden />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <SiteHeader ownerNetworkViewMode={ownerNetworkViewMode} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
