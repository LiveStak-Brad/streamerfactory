import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "TikTok LIVE tips, platform updates, rules, growth strategy, and creator education from Streamer Factory.",
  openGraph: {
    title: "Resources | Streamer Factory",
    description:
      "TikTok LIVE tips, platform updates, and creator education from a TikTok LIVE creator agency.",
  },
};

export default function ResourcesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
