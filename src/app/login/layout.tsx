import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Sign in",
  description: "Sign in or create your Streamer Factory account to request website access.",
  path: "/login",
  noIndex: true,
});

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
