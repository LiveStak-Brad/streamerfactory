"use client";

import { useMemo, useState } from "react";
import { MemberTikTokAvatar } from "@/components/members/MemberTikTokAvatar";
import { toProxiedAvatarSrc } from "@/lib/tiktok-avatar";

type CreatorAvatarProps = {
  username: string;
  /** Backstage import or TikTok connection CDN URL — tried before unavatar. */
  preferredImageUrl?: string | null;
  fallbackBackdropClass: string;
  fallbackInitial: string;
  className?: string;
  /** Above-the-fold: load immediately instead of lazy. */
  priority?: boolean;
};

type LoadState = "pending" | "ok" | "fail";

/**
 * Avatar for rankings / creator network: profile or imported photo first, then unavatar by handle.
 * TikTok CDN hosts are always loaded via same-origin proxy (hotlinking fails in the browser).
 */
export function CreatorAvatar({
  username,
  preferredImageUrl,
  fallbackBackdropClass,
  fallbackInitial,
  className = "h-14 w-14",
  priority = false,
}: CreatorAvatarProps) {
  const directSrc = useMemo(() => toProxiedAvatarSrc(preferredImageUrl), [preferredImageUrl]);
  const [load, setLoad] = useState<LoadState>(directSrc ? "pending" : "fail");

  if (!directSrc || load === "fail") {
    return (
      <MemberTikTokAvatar
        username={username}
        fallbackBackdropClass={fallbackBackdropClass}
        fallbackInitial={fallbackInitial}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full shadow-inner ring-2 ring-white/25 dark:ring-zinc-700/80 ${className}`}
    >
      {load === "pending" ? (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800"
          aria-hidden
        />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element -- TikTok CDN via same-origin proxy */}
      <img
        src={directSrc}
        alt=""
        width={112}
        height={112}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
          load === "ok" ? "opacity-100" : "opacity-0"
        }`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoad("ok")}
        onError={() => setLoad("fail")}
      />
    </div>
  );
}
