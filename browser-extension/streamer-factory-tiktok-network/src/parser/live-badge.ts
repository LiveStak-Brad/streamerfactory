import { elementClassText } from "./dom";

/** Short "LIVE" pill on avatar ring — not "LIVE dur." or "go LIVE". */
export function isStandaloneLiveBadgeText(text: string): boolean {
  const t = text.trim();
  if (!/^live$/i.test(t)) return false;
  return t.length <= 6;
}

const LIVE_ACCENT_RGB: Array<[number, number, number]> = [
  [254, 44, 85],
  [255, 23, 68],
  [255, 0, 80],
  [238, 29, 82],
  [255, 59, 92],
];

function parseCssColorChannels(css: string): [number, number, number] | null {
  const t = css.trim().toLowerCase();
  if (!t || t === "transparent" || t === "none") return null;

  const hex = t.match(/#([0-9a-f]{3,8})\b/i)?.[1];
  if (hex) {
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16),
      ];
    }
    if (hex.length >= 6) {
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
    }
  }

  const rgb = t.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];

  return null;
}

/** TikTok-style pink/red LIVE ring (CSS border, outline, or glow). */
export function cssColorLooksLikeLiveRing(css: string | null | undefined): boolean {
  const rgb = parseCssColorChannels(css ?? "");
  if (!rgb) return false;
  const [r, g, b] = rgb;
  if (r < 200 || g > 120 || b > 140) return false;
  for (const accent of LIVE_ACCENT_RGB) {
    const dist = Math.abs(r - accent[0]) + Math.abs(g - accent[1]) + Math.abs(b - accent[2]);
    if (dist < 80) return true;
  }
  if (r > 220 && g < 90 && b < 120) return true;
  return false;
}

function classHintsLiveRing(cls: string): boolean {
  const c = cls.toLowerCase();
  if (/\blive-ring\b|\blive-badge\b|\bgoing-live\b|\bis-live\b|\bon-live\b|\blive-avatar\b/.test(c)) {
    return true;
  }
  if (/\blive\b/.test(c) && /ring|badge|avatar|status|dot|indicator|border|living|streaming/.test(c)) {
    return true;
  }
  if (/border.*red|red.*ring|live.*border|living/i.test(c)) return true;
  return false;
}

function wrapperHasLiveColoredRing(img: Element): boolean {
  let el: Element | null = img.parentElement;
  for (let depth = 0; depth < 7 && el; depth++) {
    const cls = elementClassText(el);
    if (classHintsLiveRing(cls)) return true;

    const inline = el.getAttribute("style") ?? "";
    if (
      /border[^;]*(?:#fe2c55|#ff[0-9a-f]{3,4}|rgb\(\s*2[0-9]{2})/i.test(inline) ||
      cssColorLooksLikeLiveRing(inline)
    ) {
      return true;
    }

    if (typeof getComputedStyle === "function" && el instanceof HTMLElement) {
      try {
        const style = getComputedStyle(el);
        const borderW =
          parseFloat(style.borderTopWidth || "0") +
          parseFloat(style.borderRightWidth || "0");
        const outlineW = parseFloat(style.outlineWidth || "0");
        if (borderW >= 1 && cssColorLooksLikeLiveRing(style.borderTopColor)) return true;
        if (outlineW >= 1 && cssColorLooksLikeLiveRing(style.outlineColor)) return true;
        if (cssColorLooksLikeLiveRing(style.boxShadow)) return true;
      } catch {
        /* cross-origin or test env */
      }
    }

    for (const svg of el.querySelectorAll("svg circle, svg path, svg rect")) {
      const stroke =
        svg.getAttribute("stroke") ??
        svg.getAttribute("fill") ??
        (svg as SVGElement).style?.stroke ??
        "";
      if (cssColorLooksLikeLiveRing(stroke)) return true;
    }

    if (el.matches("tr, [role='row'], .live-card, [data-live-card]")) break;
    el = el.parentElement;
  }
  return false;
}

/** True when this profile image has a LIVE ring / badge nearby (Backstage list or LIVE now cards). */
export function imgHasLiveIndicator(img: Element): boolean {
  if (wrapperHasLiveColoredRing(img)) return true;

  let el: Element | null = img;
  for (let depth = 0; depth < 8 && el; depth++) {
    const cls = elementClassText(el);
    if (classHintsLiveRing(cls)) return true;

    const label = el.getAttribute("aria-label") ?? "";
    if (/\b(is\s+)?live(?!.*\bdur)/i.test(label) && !/go\s*live|duration/i.test(label)) {
      return true;
    }

    for (const node of el.querySelectorAll("span, div, label, p, strong")) {
      if ((node.textContent ?? "").length > 12) continue;
      const direct = Array.from(node.childNodes)
        .filter((n) => n.nodeType === 3)
        .map((n) => (n.textContent ?? "").trim())
        .join("");
      const own = direct || (node.childNodes.length <= 2 ? (node.textContent ?? "").trim() : "");
      if (isStandaloneLiveBadgeText(own)) return true;
    }

    if (el.matches("tr, [role='row'], .live-card, [data-live-card]")) break;
    el = el.parentElement;
  }
  return false;
}

/** Chat line like "King_Reaper5150: can I be a mod?" */
export function isChatCommentLine(line: string): boolean {
  const t = line.trim();
  if (t.length < 4 || t.length > 200) return false;
  return /^[a-z0-9._]{2,40}:\s+\S/i.test(t);
}

export function isLikelyChatOverlay(el: Element): boolean {
  const cls = elementClassText(el).toLowerCase();
  if (/chat|comment|message|danmaku|bullet|im-message/i.test(cls)) return true;
  const text = el.textContent ?? "";
  const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return false;
  const chatLines = lines.filter(isChatCommentLine);
  return chatLines.length >= 2 && chatLines.length / lines.length >= 0.25;
}
