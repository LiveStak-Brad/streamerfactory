import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Battle Hub",
  description:
    "Schedule TikTok LIVE battles, share flyers, and sync your network calendar—Streamer Factory.",
};

export default function BattleHubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
