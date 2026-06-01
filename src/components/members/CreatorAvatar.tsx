"use client";

import { useMemo, useState } from "react";
import { MemberTikTokAvatar } from "@/components/members/MemberTikTokAvatar";

type CreatorAvatarProps = {
  username: string;
  /** Backstage import or TikTok connection CDN URL — tried before unavatar. */
  preferredImageUrl?: string | null;
  fallbackBackdropClass: string;
  fallbackInitial: string;
  className?: string;
};

type LoadState = "pending" | "ok" | "fail";

/**
 * Avatar for rankings / creator network: profile or imported photo first, then unavatar by handle.
 */
export function CreatorAvatar({
  username,
  preferredImageUrl,
  fallbackBackdropClass,
  fallbackInitial,
  className = "h-14 w-14",
}: CreatorAvatarProps) {
  const [load, setLoad] = useState<LoadState>(preferredImageUrl ? "pending" : "fail");

  const directSrc = useMemo(() => {
    const url = preferredImageUrl?.trim();
    if (!url || url.startsWith("data:")) return null;
    try {
      const host = new URL(url.startsWith("//") ? `https:${url}` : url).hostname.toLowerCase();
      if (host.includes("tiktokcdn") || host.endsWith(".tiktok.com")) {
        return `/api/creator-network/avatar-image?${new URLSearchParams({ url })}`;
      }
    } catch {
      return null;
    }
    return url;
  }, [preferredImageUrl]);

  if (!directSrc) {
    return (
      <MemberTikTokAvatar
        username={username}
        fallbackBackdropClass={fallbackBackdropClass}
        fallbackInitial={fallbackInitial}
        className={className}
      />
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full shadow-inner ring-2 ring-white/25 dark:ring-zinc-700/80 ${className}`}
    >
      {load === "fail" ? (
        <MemberTikTokAvatar
          username={username}
          fallbackBackdropClass={fallbackBackdropClass}
          fallbackInitial={fallbackInitial}
          className="h-full w-full"
        />
      ) : (
        <>
          {load === "pending" ? (
            <div
              className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800"
              aria-hidden
            />
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element -- TikTok CDN / imported Backstage URL */}
          <img
            src={directSrc}
            alt=""
            width={112}
            height={112}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
              load === "ok" ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setLoad("ok")}
            onError={() => setLoad("fail")}
          />
        </>
      )}
    </div>
  );
}
