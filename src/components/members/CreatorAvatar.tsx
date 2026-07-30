"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toProxiedAvatarSrc } from "@/lib/tiktok-avatar";

type CreatorAvatarProps = {
  username: string;
  /** Backstage import or TikTok connection CDN URL — tried before handle lookup. */
  preferredImageUrl?: string | null;
  fallbackBackdropClass: string;
  fallbackInitial: string;
  className?: string;
  /** Above-the-fold: load immediately instead of lazy. */
  priority?: boolean;
  /**
   * When false, only `preferredImageUrl` is used (no TikTok handle lookup).
   * Use for staff/manager photos that must not pull a creator TikTok avatar.
   */
  tiktokFallback?: boolean;
};

function normalizeHandle(raw: string): string {
  return raw.trim().replace(/^@+/, "");
}

function AvatarFallback({
  className,
  fallbackBackdropClass,
  fallbackInitial,
}: {
  className: string;
  fallbackBackdropClass: string;
  fallbackInitial: string;
}) {
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

function AvatarImageAttempt({
  src,
  className,
  priority,
  onFailed,
}: {
  src: string;
  className: string;
  priority: boolean;
  onFailed: () => void;
}) {
  const [visible, setVisible] = useState(false);

  // Only treat hang as failure while the image still hasn't shown.
  useEffect(() => {
    if (visible) return;
    const t = window.setTimeout(onFailed, 5000);
    return () => window.clearTimeout(t);
  }, [src, onFailed, visible]);

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
      {/* eslint-disable-next-line @next/next/no-img-element -- same-origin avatar proxy / handle API */}
      <img
        src={src}
        alt=""
        width={112}
        height={112}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
        ref={(img) => {
          if (img?.complete) {
            if (img.naturalWidth > 0) {
              queueMicrotask(() => setVisible(true));
            } else {
              queueMicrotask(onFailed);
            }
          }
        }}
        onLoad={(e) => {
          if (e.currentTarget.naturalWidth > 0) setVisible(true);
          else onFailed();
        }}
        onError={onFailed}
      />
    </div>
  );
}

function CreatorAvatarSources({
  candidates,
  className,
  priority,
  fallbackBackdropClass,
  fallbackInitial,
}: {
  candidates: string[];
  className: string;
  priority: boolean;
  fallbackBackdropClass: string;
  fallbackInitial: string;
}) {
  const [index, setIndex] = useState(0);
  const src = candidates[index] ?? null;
  const onFailed = useCallback(() => setIndex((i) => i + 1), []);

  if (!src) {
    return (
      <AvatarFallback
        className={className}
        fallbackBackdropClass={fallbackBackdropClass}
        fallbackInitial={fallbackInitial}
      />
    );
  }

  return (
    <AvatarImageAttempt
      key={src}
      src={src}
      className={className}
      priority={priority}
      onFailed={onFailed}
    />
  );
}

/**
 * Avatar for rankings / creator network.
 * Tries Backstage/CDN proxy first, then same-origin handle lookup.
 * Handles cached images where onLoad can miss after hydration.
 */
export function CreatorAvatar({
  username,
  preferredImageUrl,
  fallbackBackdropClass,
  fallbackInitial,
  className = "h-14 w-14",
  priority = false,
  tiktokFallback = true,
}: CreatorAvatarProps) {
  const handle = normalizeHandle(username);
  const candidates = useMemo(() => {
    const list: string[] = [];
    const proxied = toProxiedAvatarSrc(preferredImageUrl);
    if (proxied) list.push(proxied);
    if (tiktokFallback && handle) {
      list.push(`/api/members/tiktok-avatar-image?${new URLSearchParams({ handle })}`);
    }
    return list;
  }, [preferredImageUrl, handle, tiktokFallback]);

  return (
    <CreatorAvatarSources
      key={`${handle}|${preferredImageUrl ?? ""}|${tiktokFallback ? "tt" : "local"}`}
      candidates={candidates}
      className={className}
      priority={priority}
      fallbackBackdropClass={fallbackBackdropClass}
      fallbackInitial={fallbackInitial}
    />
  );
}
