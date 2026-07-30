"use client";

import { useEffect, useMemo, useState } from "react";

type MemberTikTokAvatarProps = {
  username: string;
  /** Tailwind classes for gradient circle when no photo loads. */
  fallbackBackdropClass: string;
  fallbackInitial: string;
  className?: string;
  /** Above-the-fold: load immediately instead of lazy. */
  priority?: boolean;
};

/**
 * Avatar loads from `/api/members/tiktok-avatar-image` (same-origin).
 * Handles cached images where onLoad can miss after hydration.
 */
export function MemberTikTokAvatar({
  username,
  fallbackBackdropClass,
  fallbackInitial,
  className = "h-14 w-14",
  priority = false,
}: MemberTikTokAvatarProps) {
  const src = useMemo(() => {
    const handle = username.trim().replace(/^@+/, "");
    if (!handle) return null;
    return `/api/members/tiktok-avatar-image?${new URLSearchParams({ handle })}`;
  }, [username]);

  const [failed, setFailed] = useState(!src);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!src || failed || visible) return;
    const t = window.setTimeout(() => setFailed(true), 5000);
    return () => window.clearTimeout(t);
  }, [src, failed, visible]);

  if (!src || failed) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-full shadow-inner ring-2 ring-white/25 dark:ring-zinc-700/80 ${className}`}
        aria-hidden
        data-fallback-initial={fallbackInitial}
      >
        <div
          className={`flex h-full w-full items-center justify-center text-sm font-bold text-white ${fallbackBackdropClass}`}
        >
          {fallbackInitial.slice(0, 1).toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full shadow-inner ring-2 ring-white/25 dark:ring-zinc-700/80 ${className}`}
    >
      {!visible ? (
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
          visible ? "opacity-100" : "opacity-0"
        }`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        ref={(img) => {
          if (img?.complete) {
            if (img.naturalWidth > 0) {
              queueMicrotask(() => setVisible(true));
            } else {
              queueMicrotask(() => setFailed(true));
            }
          }
        }}
        onLoad={(e) => {
          if (e.currentTarget.naturalWidth > 0) setVisible(true);
          else setFailed(true);
        }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
