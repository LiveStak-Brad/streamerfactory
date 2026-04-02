"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { flyerDownloadFilename, downloadFlyerNodeAsPng } from "@/lib/battle-hub/flyer-download";
import {
  FORMAT_OPTIONS_BY_COUNT,
  formatLabelToDisplay,
  normalizeFormatToCanonical,
} from "@/lib/battle-hub/formats";
import {
  fetchTikTokAvatarUrlFromUnavatarJson,
  getTikTokAvatarUrlCandidates,
  normalizeTikTokHandle,
} from "@/lib/tiktok-avatar";
import { site } from "@/lib/site";

const FlyerDownloadContext = createContext({ downloadable: false });

export type FlyerParticipant = {
  username: string;
  team: string | null;
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  battle: "Battle",
  promo: "Promo",
  themed: "Themed event",
};

type Props = {
  title: string;
  eventType: string;
  formatLabel: string;
  scheduledAt: string | null;
  timezone: string;
  participants: FlyerParticipant[];
  className?: string;
  /** When set with `onLayoutFormatChange`, controls which template is shown (scheduler flyer step). */
  layoutFormat?: string;
  onLayoutFormatChange?: (value: string) => void;
  participantCount?: number;
  /** Hide the format chip row (e.g. static marketing examples shown side by side). */
  hideLayoutSwitcher?: boolean;
  /** Show Photo / Reset on each creator so uploads can replace flaky TikTok avatars (scheduler flyer step). */
  editableAvatarPhotos?: boolean;
  /** `local` = blob URLs in memory only. `supabase` = parent passes uploaded public URLs (persist on save). */
  avatarUploadMode?: "local" | "supabase";
  /** When `avatarUploadMode` is `supabase`, map slot index → public image URL. */
  remoteAvatarUrls?: Record<number, string>;
  /** Read-only URLs (e.g. from DB) shown on the flyer without upload controls. */
  displayAvatarUrls?: Record<number, string>;
  onAvatarFileUpload?: (index: number, file: File) => Promise<void>;
  onAvatarUrlClear?: (index: number) => void;
  /** Disables the Add/Change control for that slot while an upload is in progress. */
  avatarUploadingIndex?: number | null;
  /**
   * `story` — fixed 9:16 frame (TikTok / Reels / story) with compact type; body centers in remaining space.
   * Use on marketing examples so 1v1 / FFA / 2v2 share identical outer size.
   */
  variant?: "default" | "story";
  /** Shown in story flyers (host rules, prizes, etc.); split on newlines. */
  notes?: string | null;
  /** Tap/click the poster to save a PNG (story layout). */
  downloadable?: boolean;
};

function formatWhen(iso: string | null, timeZone: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-US", {
      timeZone,
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return new Date(iso).toLocaleString("en-US");
  }
}

export function displayHandle(u: string) {
  const t = u.trim();
  return t.startsWith("@") ? t : `@${t}`;
}

function cleanHandleForUrl(u: string) {
  return normalizeTikTokHandle(u);
}

function hueFromString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = s.charCodeAt(i) + ((h << 5) - h);
  }
  return Math.abs(h) % 360;
}

function initialsFromHandle(u: string) {
  const c = cleanHandleForUrl(u);
  if (!c) return "?";
  const parts = c.replace(/[_\-.]/g, " ").split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
  }
  return c.slice(0, 2).toUpperCase();
}

type AvatarSize = "sm" | "md" | "lg";

const avatarSizeClasses: Record<AvatarSize, string> = {
  sm: "h-[4.25rem] w-[4.25rem] text-sm",
  md: "h-[5.25rem] w-[5.25rem] text-base",
  lg: "h-28 w-28 text-lg sm:h-32 sm:w-32 sm:text-xl",
};

/** Smaller avatars for 9:16 story frame (preview); export matches via flyer-download resize */
const avatarSizeStory: Record<AvatarSize, string> = {
  sm: "h-11 w-11 text-[0.65rem]",
  md: "h-[3.75rem] w-[3.75rem] text-xs",
  lg: "h-16 w-16 text-sm",
};

function FlyerParticipantAvatar({
  username,
  size = "md",
  compact = false,
  overrideSrc,
}: {
  username: string;
  size?: AvatarSize;
  compact?: boolean;
  /** Local blob URL or other image URL; takes precedence over TikTok/unavatar. */
  overrideSrc?: string | null;
}) {
  const { downloadable } = useContext(FlyerDownloadContext);
  const handle = cleanHandleForUrl(username);
  const candidates = useMemo(() => getTikTokAvatarUrlCandidates(username), [username]);
  const [resolvedFromJson, setResolvedFromJson] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [overrideFailed, setOverrideFailed] = useState(false);

  useEffect(() => {
    setOverrideFailed(false);
  }, [overrideSrc]);

  useEffect(() => {
    if (overrideSrc) return;
    setResolvedFromJson(null);
    setAttempt(0);
    const ac = new AbortController();
    void fetchTikTokAvatarUrlFromUnavatarJson(username, ac.signal)
      .then((url) => {
        if (url) setResolvedFromJson(url);
      })
      .catch(() => {});
    return () => ac.abort();
  }, [username, overrideSrc]);

  const imageSources = useMemo(() => {
    if (overrideSrc && !overrideFailed) return [overrideSrc];
    const list = resolvedFromJson ? [resolvedFromJson, ...candidates] : candidates;
    return [...new Set(list)];
  }, [overrideSrc, overrideFailed, resolvedFromJson, candidates]);

  useEffect(() => {
    setAttempt(0);
  }, [imageSources]);

  const src = imageSources[attempt] ?? "";
  const hue = hueFromString(handle || username);
  const onError = useCallback(() => {
    if (overrideSrc && attempt === 0) {
      setOverrideFailed(true);
      return;
    }
    setAttempt((i) => i + 1);
  }, [attempt, overrideSrc]);
  const ring = `hsl(${hue} 45% 42%)`;
  const showFallback = imageSources.length === 0 || attempt >= imageSources.length;

  const sizeClass = compact ? avatarSizeStory[size] : avatarSizeClasses[size];

  return (
    <div className={`relative shrink-0 ${sizeClass}`}>
      <div
        className="pointer-events-none absolute -inset-1 rounded-full opacity-90 blur-md"
        style={{
          background: `radial-gradient(circle at 30% 25%, rgba(196,181,253,0.45), transparent 55%),
            radial-gradient(circle at 70% 80%, rgba(99,102,241,0.35), transparent 50%)`,
        }}
        aria-hidden
      />
      <div
        className="relative flex h-full w-full items-center justify-center rounded-full p-[3px] shadow-[0_12px_40px_-12px_rgba(99,102,241,0.65),0_4px_16px_-6px_rgba(0,0,0,0.55)]"
        style={{
          background: `linear-gradient(145deg, rgba(255,255,255,0.55) 0%, rgba(167,139,250,0.35) 42%, rgba(79,70,229,0.45) 100%)`,
          boxShadow: `0 0 0 1px ${ring}35, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-full bg-zinc-900 ring-[2.5px] ring-black/40 ring-offset-0"
          style={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.12)` }}
        >
          {showFallback ? (
            <div
              className="flex h-full w-full items-center justify-center font-bold text-white"
              style={{
                background: `linear-gradient(155deg, hsl(${hue} 52% 38%), hsl(${hue} 42% 20%), hsl(${hue} 38% 14%))`,
                boxShadow: `inset 0 2px 12px rgba(0,0,0,0.35), inset 0 -1px 0 rgba(255,255,255,0.1)`,
              }}
              aria-hidden
            >
              {initialsFromHandle(username)}
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element -- flyer export; external TikTok avatar */
            <img
              key={`${attempt}-${src}`}
              src={src}
              alt=""
              className="h-full w-full object-cover"
              crossOrigin={downloadable ? "anonymous" : undefined}
              onError={onError}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ParticipantBlock({
  username,
  team,
  size = "md",
  compact = false,
  avatarOverrideSrc,
  avatarEditable = false,
  avatarBusy = false,
  onAvatarFile,
  onClearAvatarOverride,
}: {
  username: string;
  team?: string | null;
  size?: AvatarSize;
  compact?: boolean;
  avatarOverrideSrc?: string | null;
  avatarEditable?: boolean;
  avatarBusy?: boolean;
  onAvatarFile?: (file: File) => void | Promise<void>;
  onClearAvatarOverride?: () => void;
}) {
  const inputId = useId();
  const gapClass = compact ? "gap-1.5" : "gap-2.5";

  return (
    <div className={`flex flex-col items-center text-center ${gapClass}`}>
      <FlyerParticipantAvatar
        overrideSrc={avatarOverrideSrc}
        username={username}
        compact={compact}
        size={size}
      />
      <p
        className={`max-w-[11rem] truncate font-semibold leading-tight tracking-tight text-white ${
          compact ? "text-[0.7rem] sm:text-xs" : "text-base sm:text-lg"
        }`}
      >
        {displayHandle(username)}
      </p>
      {team && (
        <p
          className={`font-semibold uppercase tracking-wider text-zinc-500 ${
            compact ? "text-[0.55rem]" : "text-[0.65rem]"
          }`}
        >
          Team {team}
        </p>
      )}
      {avatarEditable && (
        <div
          data-flyer-export-exclude
          data-flyer-skip-download
          className={`pointer-events-auto relative z-[2] flex flex-wrap items-center justify-center gap-1 ${
            compact ? "max-w-[9rem]" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            disabled={avatarBusy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void Promise.resolve(onAvatarFile?.(f));
              e.target.value = "";
            }}
          />
          <label
            htmlFor={inputId}
            className={`rounded-md border border-white/20 bg-white/10 px-2 py-0.5 font-semibold text-white shadow-sm transition hover:bg-white/15 ${
              compact ? "text-[0.55rem]" : "text-xs"
            } ${avatarBusy ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
          >
            {avatarBusy ? "Uploading…" : avatarOverrideSrc ? "Change photo" : "Add photo"}
          </label>
          {avatarOverrideSrc ? (
            <button
              type="button"
              disabled={avatarBusy}
              className={`rounded-md border border-white/15 bg-transparent px-2 py-0.5 font-semibold text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-50 ${
                compact ? "text-[0.55rem]" : "text-xs"
              }`}
              onClick={() => onClearAvatarOverride?.()}
            >
              Use TikTok
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

function VsPill({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-accent/45 bg-gradient-to-b from-accent/25 to-accent/10 font-bold tracking-wide text-accent-muted shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)] ${
        compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
      }`}
    >
      VS
    </span>
  );
}

function formatBattleBlurb(layout: string, participantCount: number): string {
  const c = normalizeFormatToCanonical(layout);
  if (participantCount === 2) return "1v1 duel · two creators · head-to-head";
  if (participantCount === 3) return "Three-creator set · everyone in the mix";
  if (participantCount === 4 && c === "2v2") return "2v2 · Team A vs Team B · two creators per side";
  if (participantCount === 4) return "Free-for-all · four creators · solo standings";
  return "Streamer Factory network battle";
}

function StoryBattleInfoTop({
  notes,
  formatLabel,
  participantCount,
}: {
  notes: string | null | undefined;
  formatLabel: string;
  participantCount: number;
}) {
  const trimmed = notes?.trim();
  const defaultLines = [
    "TikTok LIVE · hosted through Streamer Factory",
    "Rules, rounds, and scoring are called out by the host in chat",
    "Gifts, polls, and live energy can factor in—host sets the mix",
  ];
  const lines = trimmed
    ? trimmed.split(/\n+/).map((l) => l.trim()).filter(Boolean).slice(0, 4)
    : defaultLines;

  return (
    <div className="mt-3 shrink-0 space-y-2">
      <div className="rounded-xl border border-accent/30 bg-gradient-to-b from-accent/[0.14] via-accent/[0.06] to-transparent px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-accent-muted">Battle brief</p>
        <p className="mt-1.5 text-[0.62rem] font-medium leading-snug text-zinc-200">
          {formatBattleBlurb(formatLabel, participantCount)}
        </p>
        <ul className="mt-2 space-y-1 border-t border-white/10 pt-2 text-left">
          {lines.map((line, i) => (
            <li key={i} className="flex gap-2 text-[0.6rem] leading-snug text-zinc-300">
              <span className="mt-0.5 shrink-0 text-accent/80">▸</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StoryBattleInfoBottom() {
  return (
    <div className="mt-1.5 shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 shadow-inner shadow-black/20">
      <p className="text-center text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
        If you are watching for this battle
      </p>
      <p className="mt-1.5 text-center text-[0.6rem] leading-snug text-zinc-400">
        Follow the creators you are here for, tap the bell, and set notifications to{" "}
        <span className="font-semibold text-zinc-300">All</span> so you do not miss when they go LIVE.
      </p>
    </div>
  );
}

function resolveEffectiveLayout(
  formatLabel: string,
  layoutFormat: string | undefined,
  participantCount: number,
): string {
  const raw = layoutFormat ?? formatLabel;
  const canonical = normalizeFormatToCanonical(raw);
  const opts = FORMAT_OPTIONS_BY_COUNT[participantCount] ?? [];
  if (!opts.length) return canonical;
  if (opts.some((o) => o.value === canonical)) return canonical;
  const fl = normalizeFormatToCanonical(formatLabel);
  if (opts.some((o) => o.value === fl)) return fl;
  return opts[0]!.value;
}

/**
 * HTML/CSS flyer for sharing. Avatars use TikTok images via unavatar when available; otherwise initials.
 */
type AvatarBlockPropsFn = (index: number) => {
  avatarOverrideSrc?: string | null;
  avatarEditable?: boolean;
  avatarBusy?: boolean;
  onAvatarFile?: (file: File) => void | Promise<void>;
  onClearAvatarOverride?: () => void;
};

export function BattleFlyerPreview({
  title,
  eventType,
  formatLabel,
  scheduledAt,
  timezone,
  participants,
  className = "",
  layoutFormat,
  onLayoutFormatChange,
  participantCount: participantCountProp,
  hideLayoutSwitcher = false,
  variant = "default",
  notes = null,
  editableAvatarPhotos = false,
  avatarUploadMode = "local",
  remoteAvatarUrls,
  onAvatarFileUpload,
  onAvatarUrlClear,
  avatarUploadingIndex = null,
  downloadable = false,
  displayAvatarUrls,
}: Props) {
  const when = formatWhen(scheduledAt, timezone);
  const count = participants.length;
  const participantCount = participantCountProp ?? count;
  const isStory = variant === "story";

  const [avatarOverrides, setAvatarOverrides] = useState<Record<number, string>>({});
  const avatarOverridesRef = useRef(avatarOverrides);
  avatarOverridesRef.current = avatarOverrides;

  useEffect(() => {
    return () => {
      Object.values(avatarOverridesRef.current).forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  const setAvatarOverride = useCallback((index: number, file: File) => {
    const url = URL.createObjectURL(file);
    setAvatarOverrides((prev) => {
      const old = prev[index];
      if (old) URL.revokeObjectURL(old);
      return { ...prev, [index]: url };
    });
  }, []);

  const clearAvatarOverride = useCallback((index: number) => {
    setAvatarOverrides((prev) => {
      const old = prev[index];
      if (old) URL.revokeObjectURL(old);
      const next = { ...prev };
      delete next[index];
      return next;
    });
  }, []);

  const useSupabaseAvatars =
    editableAvatarPhotos && avatarUploadMode === "supabase" && typeof onAvatarFileUpload === "function";

  const hasDisplayAvatarsOnly =
    Boolean(displayAvatarUrls && Object.keys(displayAvatarUrls).length > 0) && !editableAvatarPhotos;

  const avatarBlockProps: AvatarBlockPropsFn | undefined = useMemo(() => {
    if (hasDisplayAvatarsOnly) {
      return (index: number) => ({
        avatarOverrideSrc: displayAvatarUrls?.[index] ?? null,
        avatarEditable: false,
      });
    }
    if (!editableAvatarPhotos) return undefined;
    if (useSupabaseAvatars) {
      return (index: number) => ({
        avatarOverrideSrc:
          displayAvatarUrls?.[index] ?? remoteAvatarUrls?.[index] ?? null,
        avatarEditable: true,
        avatarBusy: avatarUploadingIndex === index,
        onAvatarFile: (file: File) => onAvatarFileUpload!(index, file),
        onClearAvatarOverride: () => onAvatarUrlClear?.(index),
      });
    }
    return (index: number) => ({
      avatarOverrideSrc: displayAvatarUrls?.[index] ?? avatarOverrides[index] ?? null,
      avatarEditable: true,
      onAvatarFile: (file: File) => setAvatarOverride(index, file),
      onClearAvatarOverride: () => clearAvatarOverride(index),
    });
  }, [
    hasDisplayAvatarsOnly,
    editableAvatarPhotos,
    avatarUploadMode,
    useSupabaseAvatars,
    displayAvatarUrls,
    remoteAvatarUrls,
    avatarUploadingIndex,
    onAvatarFileUpload,
    onAvatarUrlClear,
    avatarOverrides,
    setAvatarOverride,
    clearAvatarOverride,
  ]);

  const isLayoutControlled = Boolean(onLayoutFormatChange);
  const [localLayout, setLocalLayout] = useState(formatLabel);

  useEffect(() => {
    if (!isLayoutControlled) {
      setLocalLayout(formatLabel);
    }
  }, [formatLabel, isLayoutControlled]);

  const previewLayoutRaw = isLayoutControlled ? (layoutFormat ?? formatLabel) : localLayout;

  const effectiveLayout = useMemo(
    () => resolveEffectiveLayout(formatLabel, previewLayoutRaw, participantCount),
    [formatLabel, previewLayoutRaw, participantCount],
  );

  const layoutOptions = FORMAT_OPTIONS_BY_COUNT[participantCount] ?? [];
  const showLayoutSwitcher = !hideLayoutSwitcher && layoutOptions.length > 1;

  function handleLayoutChange(value: string) {
    if (onLayoutFormatChange) {
      onLayoutFormatChange(value);
    } else {
      setLocalLayout(value);
    }
  }

  const formatBadge = formatLabelToDisplay(effectiveLayout, participantCount);
  const eventBadge = EVENT_TYPE_LABELS[eventType] ?? eventType;

  const flyerExportRef = useRef<HTMLDivElement>(null);
  const downloadFilename = useMemo(() => flyerDownloadFilename(title, scheduledAt), [title, scheduledAt]);

  const runDownload = useCallback(async () => {
    const node = flyerExportRef.current;
    if (!node) return;
    try {
      await downloadFlyerNodeAsPng(node, downloadFilename);
    } catch (e) {
      console.error(e);
      window.alert(
        "Could not save the image. Try a screenshot, or use photos you uploaded on the flyer step.",
      );
    }
  }, [downloadFilename]);

  const handleFlyerAreaClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!downloadable) return;
      if ((e.target as HTMLElement).closest("[data-flyer-skip-download]")) return;
      void runDownload();
    },
    [downloadable, runDownload],
  );

  const cardInner = (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-20%,rgba(99,102,241,0.35),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"
        aria-hidden
      />

      <div
        className={
          isStory
            ? "relative grid min-h-0 flex-1 grid-rows-[auto_auto_auto_auto] gap-y-1 overflow-hidden pb-10 sm:pb-12"
            : "relative"
        }
      >
        <div className={isStory ? "shrink-0" : ""}>
          <p
            className={`font-bold uppercase tracking-[0.28em] text-accent-muted ${
              isStory ? "text-[0.55rem] tracking-[0.22em]" : "text-[0.65rem]"
            }`}
          >
            {site.name} · Battle Hub
          </p>
          <h3
            className={`font-bold tracking-tight text-white ${
              isStory ? "mt-2 line-clamp-2 text-lg leading-snug" : "mt-3 text-2xl sm:text-3xl"
            }`}
          >
            {title || "TikTok LIVE battle"}
          </h3>
          <div
            className={`flex flex-wrap gap-2 font-semibold uppercase tracking-wider text-zinc-400 ${
              isStory ? "mt-2 text-[0.6rem]" : "mt-4 text-xs"
            }`}
          >
            <span className={`rounded-full border border-white/15 bg-white/5 ${isStory ? "px-2 py-0.5" : "px-3 py-1"}`}>
              {eventBadge}
            </span>
            <span className={`rounded-full border border-white/15 bg-white/5 ${isStory ? "px-2 py-0.5" : "px-3 py-1"}`}>
              {formatBadge}
            </span>
          </div>
          <p className={`text-zinc-400 ${isStory ? "mt-2 text-[0.7rem] leading-snug" : "mt-5 text-sm"}`}>
            <span className="text-zinc-500">{timezone}</span>
            <span className="mx-1.5 text-zinc-600">·</span>
            <time>{when}</time>
          </p>
        </div>

        {isStory && (
          <StoryBattleInfoTop formatLabel={effectiveLayout} notes={notes} participantCount={participantCount} />
        )}

        {isStory ? (
          <div className="mt-1 shrink-0 border-t border-white/10 pt-2">
            <div className="flex w-full flex-col gap-1">
                {count === 2 && (
                  <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-2">
                    <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-4 shadow-inner shadow-black/20">
                      <ParticipantBlock
                        compact
                        username={participants[0]!.username}
                        size="lg"
                        {...(avatarBlockProps?.(0) ?? {})}
                      />
                    </div>
                    <div className="flex shrink-0 items-center justify-center">
                      <VsPill compact />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-4 shadow-inner shadow-black/20">
                      <ParticipantBlock
                        compact
                        username={participants[1]!.username}
                        size="lg"
                        {...(avatarBlockProps?.(1) ?? {})}
                      />
                    </div>
                  </div>
                )}

                {count === 3 && (
                  <ThreePersonLayout avatarBlockProps={avatarBlockProps} compact participants={participants} />
                )}

                {count === 4 && (
                  <FourUpLayout
                    avatarBlockProps={avatarBlockProps}
                    compact
                    layoutFormat={effectiveLayout}
                    participants={participants}
                  />
                )}

                {count > 4 && (
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {participants.map((p, i) => (
                      <li
                        key={`${p.username}-${i}`}
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-5 shadow-inner shadow-black/15"
                      >
                        <ParticipantBlock
                          compact
                          username={p.username}
                          team={p.team}
                          size="sm"
                          {...(avatarBlockProps?.(i) ?? {})}
                        />
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        ) : (
          <div className="mt-10 border-t border-white/10 pt-8">
              {count === 2 && (
                <div className="flex flex-col items-stretch gap-8 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
                  <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 shadow-inner shadow-black/20">
                    <ParticipantBlock
                      username={participants[0]!.username}
                      size="lg"
                      {...(avatarBlockProps?.(0) ?? {})}
                    />
                  </div>
                  <div className="flex shrink-0 items-center justify-center">
                    <VsPill />
                  </div>
                  <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 shadow-inner shadow-black/20">
                    <ParticipantBlock
                      username={participants[1]!.username}
                      size="lg"
                      {...(avatarBlockProps?.(1) ?? {})}
                    />
                  </div>
                </div>
              )}

              {count === 3 && (
                <ThreePersonLayout avatarBlockProps={avatarBlockProps} participants={participants} />
              )}

              {count === 4 && (
                <FourUpLayout
                  avatarBlockProps={avatarBlockProps}
                  layoutFormat={effectiveLayout}
                  participants={participants}
                />
              )}

              {count > 4 && (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {participants.map((p, i) => (
                    <li
                      key={`${p.username}-${i}`}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-5 shadow-inner shadow-black/15"
                    >
                      <ParticipantBlock
                        username={p.username}
                        team={p.team}
                        size="sm"
                        {...(avatarBlockProps?.(i) ?? {})}
                      />
                    </li>
                  ))}
                </ul>
              )}
          </div>
        )}

        <div className={isStory ? "mt-1 flex shrink-0 flex-col gap-1" : "contents"}>
          {isStory && <StoryBattleInfoBottom />}
          <p
            className={`text-center font-medium uppercase tracking-[0.2em] text-zinc-600 ${
              isStory ? "text-[0.55rem] tracking-[0.18em]" : "mt-10 text-[0.65rem]"
            }`}
          >
            {site.domain}
          </p>
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-4">
      {showLayoutSwitcher && (
        <div
          className="rounded-2xl border border-zinc-200/90 bg-zinc-50/95 p-4 shadow-sm dark:border-zinc-600/80 dark:bg-zinc-900/60"
          role="group"
          aria-label="Battle format layouts"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Battle format preview</p>
              <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                For four creators, switch between free-for-all and 2v2. Two or three creators use one layout
                each (1v1 or free-for-all); the battle type you chose in the scheduler is still what gets saved.
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="tablist">
            {layoutOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={effectiveLayout === opt.value}
                onClick={() => handleLayoutChange(opt.value)}
                className={`rounded-full border px-3.5 py-2 text-left text-xs font-semibold transition-colors ${
                  effectiveLayout === opt.value
                    ? "border-accent/50 bg-accent/15 text-accent shadow-sm dark:text-accent-muted"
                    : "border-zinc-300 bg-white text-zinc-800 hover:border-accent/40 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-accent/35"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {isStory ? (
        <div
          data-flyer-aspect-frame
          className="mx-auto aspect-[9/16] w-full min-h-0 max-w-[min(100%,22rem)] shrink-0 sm:max-w-[24rem]"
        >
          <div
            ref={flyerExportRef}
            className={`relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-accent/25 bg-zinc-950 px-3 pb-2 pt-3 text-zinc-50 shadow-[0_32px_100px_-40px_rgba(99,102,241,0.55)] sm:px-4 sm:pb-3 sm:pt-4 ${className} ${
              downloadable
                ? "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                : ""
            }`}
            onClick={handleFlyerAreaClick}
            onKeyDown={
              downloadable && !editableAvatarPhotos
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      void runDownload();
                    }
                  }
                : undefined
            }
            role={downloadable && !editableAvatarPhotos ? "button" : undefined}
            tabIndex={downloadable && !editableAvatarPhotos ? 0 : undefined}
            aria-label={downloadable ? "Save flyer image to your device" : undefined}
          >
            <FlyerDownloadContext.Provider value={{ downloadable: !!downloadable }}>
              {cardInner}
            </FlyerDownloadContext.Provider>
            {downloadable && (
              <div
                data-flyer-export-exclude
                className="pointer-events-none absolute inset-x-0 bottom-14 z-[1] flex justify-center px-2 sm:bottom-16"
              >
                <span className="rounded-full bg-black/55 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-wide text-white/95 shadow-lg backdrop-blur-[2px]">
                  Tap to save image
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          ref={flyerExportRef}
          className={`relative overflow-hidden rounded-3xl border border-accent/25 bg-zinc-950 p-8 text-zinc-50 shadow-[0_32px_100px_-40px_rgba(99,102,241,0.55)] sm:p-10 ${className} ${
            downloadable
              ? "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              : ""
          }`}
          onClick={handleFlyerAreaClick}
          onKeyDown={
            downloadable && !editableAvatarPhotos
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    void runDownload();
                  }
                }
              : undefined
          }
          role={downloadable && !editableAvatarPhotos ? "button" : undefined}
          tabIndex={downloadable && !editableAvatarPhotos ? 0 : undefined}
          aria-label={downloadable ? "Save flyer image to your device" : undefined}
        >
          <FlyerDownloadContext.Provider value={{ downloadable: !!downloadable }}>
            {cardInner}
          </FlyerDownloadContext.Provider>
          {downloadable && (
            <div
              data-flyer-export-exclude
              className="pointer-events-none absolute inset-x-0 bottom-8 z-[1] flex justify-center px-2"
            >
              <span className="rounded-full bg-black/55 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white/95 shadow-lg backdrop-blur-[2px]">
                Tap to save image
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ThreePersonLayout({
  participants,
  compact = false,
  avatarBlockProps,
}: {
  participants: FlyerParticipant[];
  compact?: boolean;
  avatarBlockProps?: AvatarBlockPropsFn;
}) {
  const [a, b, c] = participants;
  const g = compact ? "gap-3" : "gap-6";
  const pad = compact ? "px-3 py-4" : "px-6 py-8";
  const padSm = compact ? "px-2 py-3" : "px-4 py-6";

  return (
    <div className={`mx-auto grid max-w-lg ${g}`}>
      <div className="flex justify-center">
        <div className={`w-full max-w-xs rounded-2xl border border-white/10 bg-white/[0.04] shadow-inner shadow-black/20 ${pad}`}>
          <ParticipantBlock
            compact={compact}
            size="lg"
            username={a!.username}
            {...(avatarBlockProps?.(0) ?? {})}
          />
        </div>
      </div>
      <div className={`grid grid-cols-2 ${compact ? "gap-2" : "gap-4"}`}>
        <div className={`rounded-2xl border border-white/10 bg-white/[0.04] shadow-inner shadow-black/20 ${padSm}`}>
          <ParticipantBlock
            compact={compact}
            size="md"
            username={b!.username}
            {...(avatarBlockProps?.(1) ?? {})}
          />
        </div>
        <div className={`rounded-2xl border border-white/10 bg-white/[0.04] shadow-inner shadow-black/20 ${padSm}`}>
          <ParticipantBlock
            compact={compact}
            size="md"
            username={c!.username}
            {...(avatarBlockProps?.(2) ?? {})}
          />
        </div>
      </div>
    </div>
  );
}

function FourUpLayout({
  participants,
  layoutFormat,
  compact = false,
  avatarBlockProps,
}: {
  participants: FlyerParticipant[];
  layoutFormat: string;
  compact?: boolean;
  avatarBlockProps?: AvatarBlockPropsFn;
}) {
  const slot = (p: FlyerParticipant) => participants.indexOf(p);

  const isTeam =
    layoutFormat === "2v2" ||
    layoutFormat === "team-battle" ||
    participants.some((p) => p.team);

  if (isTeam) {
    const teamA = participants.filter((p) => (p.team || "").toUpperCase() === "A");
    const teamB = participants.filter((p) => (p.team || "").toUpperCase() === "B");
    const rest = participants.filter(
      (p) => !["A", "B"].includes((p.team || "").toUpperCase()),
    );
    const rowA = teamA.length ? teamA : participants.slice(0, 2);
    const rowB = teamB.length ? teamB : participants.slice(2, 4);

    return (
      <div className={`grid sm:grid-cols-2 ${compact ? "gap-2" : "gap-6"}`}>
        <div className={`rounded-2xl border border-white/10 bg-white/[0.04] shadow-inner shadow-black/20 ${compact ? "p-3" : "p-6"}`}>
          <p
            className={`text-center font-bold uppercase tracking-wider text-accent-muted ${
              compact ? "mb-2 text-[0.6rem]" : "mb-6 text-xs"
            }`}
          >
            Team A
          </p>
          <div className={`flex flex-wrap justify-center ${compact ? "gap-2" : "gap-6"}`}>
            {rowA.map((p, i) => (
              <ParticipantBlock
                key={`a-${p.username}-${i}`}
                compact={compact}
                size="md"
                username={p.username}
                {...(avatarBlockProps?.(slot(p)) ?? {})}
              />
            ))}
          </div>
        </div>
        <div className={`rounded-2xl border border-white/10 bg-white/[0.04] shadow-inner shadow-black/20 ${compact ? "p-3" : "p-6"}`}>
          <p
            className={`text-center font-bold uppercase tracking-wider text-accent-muted ${
              compact ? "mb-2 text-[0.6rem]" : "mb-6 text-xs"
            }`}
          >
            Team B
          </p>
          <div className={`flex flex-wrap justify-center ${compact ? "gap-2" : "gap-6"}`}>
            {rowB.map((p, i) => (
              <ParticipantBlock
                key={`b-${p.username}-${i}`}
                compact={compact}
                size="md"
                username={p.username}
                {...(avatarBlockProps?.(slot(p)) ?? {})}
              />
            ))}
          </div>
        </div>
        {rest.length > 0 && (
          <div className="sm:col-span-2">
            <ul className="flex flex-wrap justify-center gap-4">
              {rest.map((p, i) => (
                <li key={`rest-${p.username}-${i}`}>
                  <ParticipantBlock
                    compact={compact}
                    size="sm"
                    username={p.username}
                    {...(avatarBlockProps?.(slot(p)) ?? {})}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 ${compact ? "gap-2" : "gap-4 sm:gap-5"}`}>
      {participants.slice(0, 4).map((p, i) => (
        <div
          key={`${p.username}-${i}`}
          className={`rounded-2xl border border-white/10 bg-white/[0.04] shadow-inner shadow-black/20 ${
            compact ? "px-2 py-3" : "px-4 py-6"
          }`}
        >
          <ParticipantBlock
            compact={compact}
            size="md"
            username={p.username}
            {...(avatarBlockProps?.(i) ?? {})}
          />
        </div>
      ))}
    </div>
  );
}
