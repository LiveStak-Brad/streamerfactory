import { toBlob, toCanvas } from "html-to-image";

/** TikTok / IG / Shorts vertical story safe size (9:16). */
export const FLYER_STORY_EXPORT_WIDTH = 1080;
export const FLYER_STORY_EXPORT_HEIGHT = 1920;

/** Safe filename segment from title. */
export function flyerDownloadFilename(title: string, scheduledAtIso: string | null): string {
  const slug = (title || "battle")
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "battle-flyer";
  let datePart = "event";
  if (scheduledAtIso) {
    try {
      datePart = new Date(scheduledAtIso).toISOString().slice(0, 10);
    } catch {
      /* keep default */
    }
  }
  return `${slug}-${datePart}.png`;
}

function excludeFlyerChromeFromExport(node: unknown): boolean {
  if (!(node instanceof HTMLElement)) return true;
  /** Omit preview-only UI (photo buttons, “Tap to save”) from PNG clone. */
  return !node.closest("[data-flyer-export-exclude], [data-flyer-skip-download]");
}

const sharedCaptureOptions = {
  cacheBust: true,
  backgroundColor: "#09090b",
  filter: excludeFlyerChromeFromExport,
  style: {
    transform: "none",
  },
} as const;

function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), "image/png", 1);
  });
}

/**
 * Story export: rasterize at the same size as the on-screen flyer, then scale uniformly to
 * 1080×1920. Forcing html-to-image width/height to 1080px copies computed styles from a
 * mismatched layout (tiny fonts, wrong spacing). Preview-sized capture preserves WYSIWYG.
 */
async function storyNodeTo1080PngBlob(node: HTMLElement): Promise<Blob | null> {
  const w = Math.max(1, node.clientWidth);
  /** Enough resolution that upscaling to 1080px wide stays sharp (preview is ~350px). */
  const pixelRatio = Math.min(4, Math.max(2, Math.ceil(FLYER_STORY_EXPORT_WIDTH / w)));

  const source = await toCanvas(node, {
    ...sharedCaptureOptions,
    pixelRatio,
  });

  const out = document.createElement("canvas");
  out.width = FLYER_STORY_EXPORT_WIDTH;
  out.height = FLYER_STORY_EXPORT_HEIGHT;
  const ctx = out.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#09090b";
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, source.width, source.height, 0, 0, out.width, out.height);

  return canvasToPngBlob(out);
}

/**
 * Renders a DOM node to a PNG and triggers a browser download (works on most mobile browsers).
 * Story flyers (inside `[data-flyer-aspect-frame]`) export at 1080×1920 (9:16) for TikTok/Reels,
 * matching the preview layout. Wide flyers use the on-screen layout size × pixelRatio.
 */
export async function downloadFlyerNodeAsPng(node: HTMLElement, filename: string): Promise<void> {
  const restores: (() => void)[] = [];
  const isStoryExport = Boolean(node.closest("[data-flyer-aspect-frame]"));

  const excluded = node.querySelectorAll<HTMLElement>(
    "[data-flyer-export-exclude], [data-flyer-skip-download]",
  );
  excluded.forEach((el) => {
    const prev = el.style.display;
    restores.push(() => {
      if (prev) el.style.display = prev;
      else el.style.removeProperty("display");
    });
    el.style.display = "none";
  });

  if (!isStoryExport) {
    const prevH = node.style.height;
    const prevMinH = node.style.minHeight;
    restores.push(() => {
      if (prevH) node.style.height = prevH;
      else node.style.removeProperty("height");
      if (prevMinH) node.style.minHeight = prevMinH;
      else node.style.removeProperty("min-height");
    });
    node.style.height = "auto";
    node.style.minHeight = "0";
  }

  void node.offsetHeight;

  const rect = node.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(rect.width));
  const height = Math.max(1, Math.ceil(rect.height));

  try {
    const blob = isStoryExport
      ? await storyNodeTo1080PngBlob(node)
      : await toBlob(node, {
          ...sharedCaptureOptions,
          pixelRatio: 2,
          width,
          height,
        });

    if (!blob) {
      throw new Error("Could not create image.");
    }

    const url = URL.createObjectURL(blob);
    try {
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      URL.revokeObjectURL(url);
    }
  } finally {
    restores.reverse().forEach((r) => r());
  }
}
