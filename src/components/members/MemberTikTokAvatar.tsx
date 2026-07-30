"use client";

import { useMemo, useState } from "react";

import { brandAssets } from "@/lib/brand/assets";

type MemberTikTokAvatarProps = {
  username: string;
  /** Tailwind classes for gradient circle when no photo loads. */
  fallbackBackdropClass: string;
  fallbackInitial: string;
  className?: string;
};

type LoadState = "pending" | "ok" | "fail";

/**
 * Avatar loads from `/api/members/tiktok-avatar-image` (same-origin). The API resolves the TikTok
 * CDN URL via unavatar and re-fetches the image on the server so browser hotlink / referrer rules
 * do not block the photo.
 */
export function MemberTikTokAvatar({
  username,
  fallbackBackdropClass,
  fallbackInitial,
  className = "h-14 w-14",
}: MemberTikTokAvatarProps) {
  const [load, setLoad] = useState<LoadState>("pending");

  const src = useMemo(() => {
    const qs = new URLSearchParams({ handle: username });
    return `/api/members/tiktok-avatar-image?${qs.toString()}`;
  }, [username]);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full shadow-inner ring-2 ring-white/25 dark:ring-zinc-700/80 ${className}`}
    >
      {load === "fail" ? (
        // eslint-disable-next-line @next/next/no-img-element -- branded SF default avatar
        <img
          src={brandAssets.avatar.default}
          alt=""
          width={112}
          height={112}
          className={`h-full w-full object-cover ${fallbackBackdropClass}`}
          aria-hidden
          data-fallback-initial={fallbackInitial}
        />
      ) : (
        <>
          {load === "pending" ? (
            <div
              className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800"
              aria-hidden
            />
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element -- same-origin API returns image bytes */}
          <img
            key={src}
            src={src}
            alt=""
            width={112}
            height={112}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
              load === "ok" ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoad("ok")}
            onError={() => setLoad("fail")}
          />
        </>
      )}
    </div>
  );
}
