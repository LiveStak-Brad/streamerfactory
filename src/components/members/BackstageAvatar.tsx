"use client";

import { useMemo, useState } from "react";

import { brandAssets } from "@/lib/brand/assets";

type BackstageAvatarProps = {
  /** Imported Creator Network / Backstage table photo only — never TikTok profile or unavatar. */
  backstageImageUrl?: string | null;
  fallbackBackdropClass: string;
  fallbackInitial: string;
  className?: string;
};

type LoadState = "pending" | "ok" | "fail";

function proxyBackstageImageUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) return "";
  try {
    const parsed = new URL(trimmed.startsWith("//") ? `https:${trimmed}` : trimmed);
    const host = parsed.hostname.toLowerCase();
    const isCdn =
      host.includes("tiktokcdn") ||
      host.includes("ibytedapm") ||
      host.includes("byteimg") ||
      host.includes("tiktokv.com") ||
      host.endsWith(".tiktok.com");
    if (isCdn) {
      return `/api/creator-network/avatar-image?${new URLSearchParams({ url: trimmed })}`;
    }
  } catch {
    return "";
  }
  return trimmed;
}

/** Rankings / creator network: Backstage import photo or initial — no TikTok story/profile fallback. */
export function BackstageAvatar({
  backstageImageUrl,
  fallbackBackdropClass,
  fallbackInitial,
  className = "h-14 w-14",
}: BackstageAvatarProps) {
  const src = useMemo(() => {
    const url = backstageImageUrl?.trim();
    if (!url) return null;
    const proxied = proxyBackstageImageUrl(url);
    return proxied || null;
  }, [backstageImageUrl]);

  const [load, setLoad] = useState<LoadState>(src ? "pending" : "fail");

  if (!src || load === "fail") {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-full shadow-inner ring-2 ring-white/25 dark:ring-zinc-700/80 ${className}`}
        aria-hidden
        data-fallback-initial={fallbackInitial}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- branded SF default avatar */}
        <img
          src={brandAssets.avatar.default}
          alt=""
          width={112}
          height={112}
          className={`h-full w-full object-cover ${fallbackBackdropClass}`}
        />
      </div>
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
      {/* eslint-disable-next-line @next/next/no-img-element -- proxied Backstage CDN */}
      <img
        src={src}
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
    </div>
  );
}
