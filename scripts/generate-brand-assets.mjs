/**
 * Streamer Factory — generate branding raster assets from approved master logo.
 * Run: node scripts/generate-brand-assets.mjs
 */
import { mkdir, writeFile, copyFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const branding = join(publicDir, "branding");
const masterLogo = join(publicDir, "sflogo.png");
const brandBoard = join(publicDir, "masterbrandboard.png");

const COLORS = {
  navy: "#0B0F1A",
  charcoal: "#1A1F2E",
  pink: "#FF2ED1",
  purple: "#A020F0",
  indigo: "#5B3BFF",
  cyan: "#00E5FF",
  white: "#FFFFFF",
};

async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

/** Simplified SF mark — readable at 16px, matches brand board favicon language. */
function sfMarkSvg(size, { rounded = false, radius = 0, transparent = false } = {}) {
  const r = rounded ? Math.round(size * 0.22) : radius || Math.round(size * 0.5);
  const pad = size * 0.08;
  const fontSize = Math.round(size * 0.42);
  const ring = size * 0.5 - pad;
  const cx = size / 2;
  const cy = size / 2;
  const stroke = Math.max(1.5, size * 0.045);
  const bg = transparent
    ? ""
    : `<rect width="${size}" height="${size}" rx="${r}" fill="${COLORS.navy}"/>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Streamer Factory">
  <defs>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.pink}"/>
      <stop offset="45%" stop-color="${COLORS.purple}"/>
      <stop offset="100%" stop-color="${COLORS.cyan}"/>
    </linearGradient>
    <linearGradient id="sf" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="55%" stop-color="#E8E8F0"/>
      <stop offset="100%" stop-color="#C8C8D8"/>
    </linearGradient>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="${Math.max(1, size * 0.03)}" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  ${bg}
  <circle cx="${cx}" cy="${cy}" r="${ring}" fill="none" stroke="url(#ring)" stroke-width="${stroke}" opacity="0.95" filter="url(#glow)" stroke-dasharray="${ring * 4.2} ${ring * 0.55}"/>
  <circle cx="${cx}" cy="${cy}" r="${ring - stroke * 1.6}" fill="none" stroke="url(#ring)" stroke-width="${stroke * 0.45}" opacity="0.55"/>
  <text x="${cx}" y="${cy + fontSize * 0.34}" text-anchor="middle" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="${-size * 0.04}" fill="url(#sf)" filter="url(#glow)">SF</text>
</svg>`;
}

/** Default creator avatar — branded SF mark, readable at 32px. */
function defaultAvatarSvg(size = 256) {
  return sfMarkSvg(size, { rounded: true });
}

/** Watermark brushstroke SF */
function watermarkSvg({ light = false } = {}) {
  const fill = light ? "rgba(255,255,255,0.12)" : "rgba(160,32,240,0.14)";
  const stroke = light ? "rgba(0,229,255,0.18)" : "rgba(255,46,209,0.2)";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="wm" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.pink}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${COLORS.cyan}" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <text x="256" y="310" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="220" font-weight="900" letter-spacing="-18" fill="url(#wm)" opacity="0.9">SF</text>
  <text x="256" y="310" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="220" font-weight="900" letter-spacing="-18" fill="none" stroke="${stroke}" stroke-width="3">SF</text>
</svg>`;
}

/** Feature icon family — thin-line, purple→cyan. */
function featureIconSvg(name, paths) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="g" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
      <stop stop-color="${COLORS.purple}"/>
      <stop offset="1" stop-color="${COLORS.cyan}"/>
    </linearGradient>
  </defs>
  ${paths}
</svg>`;
}

const FEATURE_ICONS = {
  growth: `<path d="M12 44V36l10-10 8 8 14-16" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 48h40" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/><path d="M40 18h10v10" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  training: `<path d="M32 14L10 24l22 10 22-10-22-10Z" stroke="url(#g)" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 28v12c0 6 6.5 10 14 10s14-4 14-10V28" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/><path d="M54 26v14" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/>`,
  rankings: `<path d="M18 46V30h10v16H18Zm14 0V18h10v28H32Zm14 0V36h10v10H46Z" stroke="url(#g)" stroke-width="2.5" stroke-linejoin="round"/>`,
  community: `<circle cx="24" cy="24" r="6" stroke="url(#g)" stroke-width="2.5"/><circle cx="40" cy="24" r="6" stroke="url(#g)" stroke-width="2.5"/><circle cx="32" cy="38" r="6" stroke="url(#g)" stroke-width="2.5"/><path d="M14 48c1.5-6 6-9 10-9M50 48c-1.5-6-6-9-10-9M22 48c1-4 4.5-6 10-6s9 2 10 6" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/>`,
  battle: `<path d="M18 14l10 10M14 22l12-4M46 14L36 24M50 22l-12-4M28 30l-6 20M36 30l6 20M26 42h12" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  calendar: `<rect x="14" y="18" width="36" height="32" rx="4" stroke="url(#g)" stroke-width="2.5"/><path d="M14 28h36M24 14v8M40 14v8M24 36h6M34 36h6M24 44h6" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/>`,
  coach: `<circle cx="32" cy="22" r="8" stroke="url(#g)" stroke-width="2.5"/><path d="M16 50c2-10 10-14 16-14s14 4 16 14" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/><path d="M44 18l6-4M44 26l6 4" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/>`,
  notifications: `<path d="M32 14a12 12 0 0 1 12 12v8l4 6H16l4-6v-8A12 12 0 0 1 32 14Z" stroke="url(#g)" stroke-width="2.5" stroke-linejoin="round"/><path d="M28 48a4 4 0 0 0 8 0" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/>`,
  creator: `<circle cx="32" cy="22" r="8" stroke="url(#g)" stroke-width="2.5"/><path d="M16 50c2-10 10-14 16-14s14 4 16 14" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/><circle cx="46" cy="36" r="6" stroke="url(#g)" stroke-width="2"/><path d="M46 33v6M43 36h6" stroke="url(#g)" stroke-width="2" stroke-linecap="round"/>`,
  schedule: `<circle cx="32" cy="32" r="18" stroke="url(#g)" stroke-width="2.5"/><path d="M32 20v14l10 6" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  analytics: `<path d="M14 46V18M14 46h36" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/><path d="M22 38l8-10 8 6 10-14" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  monetization: `<path d="M32 12l8 14h16l-12 10 5 16-17-10-17 10 5-16L8 26h16L32 12Z" stroke="url(#g)" stroke-width="2.5" stroke-linejoin="round"/>`,
  messages: `<rect x="12" y="16" width="40" height="28" rx="6" stroke="url(#g)" stroke-width="2.5"/><path d="M12 24l20 12 20-12" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  support: `<circle cx="32" cy="32" r="18" stroke="url(#g)" stroke-width="2.5"/><circle cx="32" cy="32" r="6" stroke="url(#g)" stroke-width="2.5"/><path d="M32 14v6M32 44v6M14 32h6M44 32h6" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/>`,
  awards: `<path d="M22 14h20v10a10 10 0 0 1-20 0V14Z" stroke="url(#g)" stroke-width="2.5" stroke-linejoin="round"/><path d="M22 18H14v4a8 8 0 0 0 8 8M42 18h8v4a8 8 0 0 1-8 8M28 34v6l4 8 4-8v-6" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  achievements: `<circle cx="32" cy="28" r="12" stroke="url(#g)" stroke-width="2.5"/><path d="M32 20v8l6 4M24 48h16l-4-10h-8l-4 10Z" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  profile: `<circle cx="32" cy="24" r="8" stroke="url(#g)" stroke-width="2.5"/><path d="M16 50c2-10 10-14 16-14s14 4 16 14" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/><circle cx="32" cy="32" r="22" stroke="url(#g)" stroke-width="2" opacity="0.45"/>`,
};

/** Empty-state illustrations */
function emptyStateSvg(kind) {
  const scenes = {
    battles: `<circle cx="120" cy="100" r="54" fill="none" stroke="url(#g)" stroke-width="3" opacity="0.35"/><path d="M88 78l24 24M80 96l28-10M152 78l-24 24M160 96l-28-10M108 118l-12 40M132 118l12 40M104 148h32" stroke="url(#g)" stroke-width="3.5" stroke-linecap="round"/><text x="120" y="210" text-anchor="middle" fill="#00E5FF" font-family="Arial,sans-serif" font-size="14" font-weight="700" letter-spacing="2" opacity="0.8">NO BATTLES</text>`,
    rankings: `<path d="M70 160V110h30v50H70Zm40 0V70h30v90H110Zm40 0V120h30v40H150Z" stroke="url(#g)" stroke-width="3.5" fill="none"/><circle cx="185" cy="60" r="14" fill="none" stroke="url(#g)" stroke-width="2.5"/><path d="M185 52v10l6 4" stroke="url(#g)" stroke-width="2" stroke-linecap="round"/><text x="120" y="210" text-anchor="middle" fill="#00E5FF" font-family="Arial,sans-serif" font-size="14" font-weight="700" letter-spacing="2" opacity="0.8">NO RANKINGS</text>`,
    notifications: `<path d="M120 55a40 40 0 0 1 40 40v22l12 18H68l12-18V95A40 40 0 0 1 120 55Z" fill="none" stroke="url(#g)" stroke-width="3.5"/><path d="M108 155a12 12 0 0 0 24 0" stroke="url(#g)" stroke-width="3.5"/><circle cx="150" cy="70" r="10" fill="#FF2ED1"/><text x="120" y="210" text-anchor="middle" fill="#00E5FF" font-family="Arial,sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" opacity="0.8">NO NOTIFICATIONS</text>`,
    lessons: `<path d="M120 50L55 80l65 30 65-30-65-30Z" fill="none" stroke="url(#g)" stroke-width="3.5"/><path d="M75 95v40c0 18 20 30 45 30s45-12 45-30V95" fill="none" stroke="url(#g)" stroke-width="3.5"/><text x="120" y="210" text-anchor="middle" fill="#00E5FF" font-family="Arial,sans-serif" font-size="14" font-weight="700" letter-spacing="2" opacity="0.8">NO LESSONS</text>`,
    members: `<circle cx="90" cy="90" r="22" fill="none" stroke="url(#g)" stroke-width="3"/><circle cx="150" cy="90" r="22" fill="none" stroke="url(#g)" stroke-width="3"/><circle cx="120" cy="130" r="22" fill="none" stroke="url(#g)" stroke-width="3"/><path d="M60 165c4-18 18-28 30-28M180 165c-4-18-18-28-30-28M90 165c3-12 14-18 30-18s27 6 30 18" stroke="url(#g)" stroke-width="3" stroke-linecap="round"/><text x="120" y="210" text-anchor="middle" fill="#00E5FF" font-family="Arial,sans-serif" font-size="14" font-weight="700" letter-spacing="2" opacity="0.8">NO MEMBERS</text>`,
    activity: `<path d="M50 120h30l16-40 24 70 18-50 14 20h38" fill="none" stroke="url(#g)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="120" cy="120" r="70" fill="none" stroke="url(#g)" stroke-width="2" opacity="0.25"/><text x="120" y="210" text-anchor="middle" fill="#00E5FF" font-family="Arial,sans-serif" font-size="14" font-weight="700" letter-spacing="2" opacity="0.8">NO ACTIVITY</text>`,
  };
  const body = scenes[kind] || scenes.activity;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" role="img">
  <defs>
    <linearGradient id="g" x1="40" y1="40" x2="200" y2="180" gradientUnits="userSpaceOnUse">
      <stop stop-color="${COLORS.pink}"/>
      <stop offset="0.5" stop-color="${COLORS.purple}"/>
      <stop offset="1" stop-color="${COLORS.cyan}"/>
    </linearGradient>
    <radialGradient id="bg" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="${COLORS.purple}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${COLORS.navy}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="240" height="240" rx="28" fill="${COLORS.navy}"/>
  <rect width="240" height="240" rx="28" fill="url(#bg)"/>
  ${body}
</svg>`;
}

/** Achievement / rank badge SVGs */
function badgeSvg(label, symbol) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.pink}"/>
      <stop offset="50%" stop-color="${COLORS.purple}"/>
      <stop offset="100%" stop-color="${COLORS.cyan}"/>
    </linearGradient>
    <linearGradient id="face" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#1A1F2E"/>
      <stop offset="100%" stop-color="#0B0F1A"/>
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="58" fill="url(#face)" stroke="url(#ring)" stroke-width="4"/>
  <circle cx="64" cy="64" r="48" fill="none" stroke="url(#ring)" stroke-width="1.5" opacity="0.45"/>
  <text x="64" y="72" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="36" fill="#FFFFFF">${symbol}</text>
</svg>`;
}

const BADGES = {
  "verified-creator": "V",
  "top-creator": "T",
  "factory-champion": "C",
  "top-recruiter": "R",
  trainer: "Tr",
  "battle-master": "B",
  "streameru-graduate": "U",
  "founding-member": "F",
  premium: "P",
  elite: "E",
  gold: "G",
  diamond: "D",
};

const MEDALS = {
  "1st": "1",
  "2nd": "2",
  "3rd": "3",
  "top-10": "10",
  "top-25": "25",
  champion: "C",
};

/** Background mesh SVG */
function backgroundMeshSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="a" cx="20%" cy="20%" r="50%"><stop offset="0%" stop-color="${COLORS.purple}" stop-opacity="0.45"/><stop offset="100%" stop-color="${COLORS.navy}" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="80%" cy="30%" r="45%"><stop offset="0%" stop-color="${COLORS.cyan}" stop-opacity="0.28"/><stop offset="100%" stop-color="${COLORS.navy}" stop-opacity="0"/></radialGradient>
    <radialGradient id="c" cx="50%" cy="90%" r="50%"><stop offset="0%" stop-color="${COLORS.pink}" stop-opacity="0.22"/><stop offset="100%" stop-color="${COLORS.navy}" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="${COLORS.navy}"/>
  <rect width="1600" height="900" fill="url(#a)"/>
  <rect width="1600" height="900" fill="url(#b)"/>
  <rect width="1600" height="900" fill="url(#c)"/>
  <rect width="1600" height="900" fill="url(#grid)"/>
</svg>`;
}

/** Pack PNG buffers into a multi-size ICO */
function encodeIco(pngBuffersWithSizes) {
  const count = pngBuffersWithSizes.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  for (const { size, buffer } of pngBuffersWithSizes) {
    entries.push({ size, buffer, offset });
    offset += buffer.length;
  }
  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);
  let entryOffset = 6;
  for (const e of entries) {
    out.writeUInt8(e.size >= 256 ? 0 : e.size, entryOffset);
    out.writeUInt8(e.size >= 256 ? 0 : e.size, entryOffset + 1);
    out.writeUInt8(0, entryOffset + 2);
    out.writeUInt8(0, entryOffset + 3);
    out.writeUInt16LE(1, entryOffset + 4);
    out.writeUInt16LE(32, entryOffset + 6);
    out.writeUInt32LE(e.buffer.length, entryOffset + 8);
    out.writeUInt32LE(e.offset, entryOffset + 12);
    e.buffer.copy(out, e.offset);
    entryOffset += 16;
  }
  return out;
}

async function svgToPng(svg, width, height = width) {
  return sharp(Buffer.from(svg)).resize(width, height).png({ compressionLevel: 9 }).toBuffer();
}

async function writeSvg(path, svg) {
  await ensureDir(dirname(path));
  await writeFile(path, svg, "utf8");
}

async function main() {
  const dirs = [
    "logo",
    "favicon",
    "social",
    "og",
    "icons",
    "badges",
    "medals",
    "backgrounds",
    "empty-states",
    "avatars",
    "loading",
    "splash",
    "emails",
    "watermarks",
  ];
  for (const d of dirs) await ensureDir(join(branding, d));

  // Master logo placements
  await copyFile(masterLogo, join(branding, "logo", "sflogo-master.png"));
  await sharp(masterLogo)
    .resize(1024, 1024, { fit: "inside" })
    .webp({ quality: 88 })
    .toFile(join(branding, "logo", "sflogo.webp"));
  await sharp(masterLogo)
    .resize(512, 512, { fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(join(branding, "logo", "sflogo-512.png"));
  await sharp(masterLogo)
    .resize(256, 256, { fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(join(branding, "logo", "sflogo-256.png"));
  await sharp(masterLogo)
    .resize(128, 128, { fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(join(branding, "logo", "sflogo-128.png"));

  // Wordmark-friendly email header (logo on navy)
  await sharp(masterLogo)
    .resize(240, 240, { fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(join(branding, "emails", "logo-240.png"));

  // Secondary mark SVGs
  const markSvg = sfMarkSvg(512, { rounded: false });
  const markRoundedSvg = sfMarkSvg(512, { rounded: true });
  const markTransparentSvg = sfMarkSvg(512, { rounded: false, transparent: true });
  await writeSvg(join(branding, "logo", "sf-mark.svg"), markSvg);
  await writeSvg(join(branding, "logo", "sf-mark-rounded.svg"), markRoundedSvg);
  await writeSvg(join(branding, "logo", "sf-mark-transparent.svg"), markTransparentSvg);
  await writeSvg(join(branding, "logo", "sf-mark-mono-light.svg"), sfMarkSvg(512, { rounded: true }).replace(/#0B0F1A/g, "#FFFFFF").replace(/#FFFFFF/g, "#0B0F1A").replace(/#E8E8F0|#C8C8D8/g, "#0B0F1A"));
  await writeSvg(join(branding, "logo", "sf-mark-mono-dark.svg"), markRoundedSvg);

  // Raster marks
  for (const size of [512, 192, 180, 128, 96, 64, 48, 32, 16]) {
    await sharp(Buffer.from(sfMarkSvg(size, { rounded: true })))
      .png({ compressionLevel: 9 })
      .toFile(join(branding, "logo", `sf-mark-${size}.png`));
  }

  // Favicons
  const favSizes = [16, 32, 48, 96, 192, 512];
  const icoParts = [];
  for (const size of favSizes) {
    const buf = await svgToPng(sfMarkSvg(size, { rounded: false }), size);
    await writeFile(join(branding, "favicon", `favicon-${size}.png`), buf);
    if ([16, 32, 48].includes(size)) icoParts.push({ size, buffer: buf });
  }
  const ico = encodeIco(icoParts);
  await writeFile(join(branding, "favicon", "favicon.ico"), ico);
  await writeFile(join(publicDir, "favicon.ico"), ico);
  await writeFile(join(root, "src", "app", "favicon.ico"), ico);

  // Apple / mask / Android / Windows / PWA
  await sharp(Buffer.from(sfMarkSvg(180, { rounded: true })))
    .png({ compressionLevel: 9 })
    .toFile(join(branding, "favicon", "apple-touch-icon.png"));
  await writeSvg(
    join(branding, "favicon", "safari-pinned-tab.svg"),
    `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <text x="8" y="12.2" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="9" font-weight="900" letter-spacing="-0.6" fill="#000">SF</text>
</svg>`,
  );
  await writeFile(
    join(branding, "favicon", "browserconfig.xml"),
    `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/branding/favicon/mstile-150x150.png"/>
      <TileColor>${COLORS.navy}</TileColor>
    </tile>
  </msapplication>
</browserconfig>
`,
  );
  await sharp(Buffer.from(sfMarkSvg(150, { rounded: false })))
    .png({ compressionLevel: 9 })
    .toFile(join(branding, "favicon", "mstile-150x150.png"));

  for (const size of [192, 512]) {
    await sharp(Buffer.from(sfMarkSvg(size, { rounded: true })))
      .png({ compressionLevel: 9 })
      .toFile(join(branding, "favicon", `android-chrome-${size}x${size}.png`));
    await sharp(Buffer.from(sfMarkSvg(size, { rounded: true })))
      .png({ compressionLevel: 9 })
      .toFile(join(branding, "favicon", `pwa-${size}.png`));
  }

  // Mask icon (monochrome)
  await writeSvg(
    join(branding, "favicon", "mask-icon.svg"),
    `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text x="50" y="72" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="58" font-weight="900" letter-spacing="-4" fill="#000000">SF</text>
</svg>`,
  );

  // Default avatar
  const avatarSvg = defaultAvatarSvg(256);
  await writeSvg(join(branding, "avatars", "default-avatar.svg"), avatarSvg);
  await sharp(Buffer.from(avatarSvg)).png({ compressionLevel: 9 }).toFile(join(branding, "avatars", "default-avatar.png"));
  await sharp(Buffer.from(defaultAvatarSvg(64))).png({ compressionLevel: 9 }).toFile(join(branding, "avatars", "default-avatar-64.png"));
  await sharp(Buffer.from(defaultAvatarSvg(32))).png({ compressionLevel: 9 }).toFile(join(branding, "avatars", "default-avatar-32.png"));

  // Feature icons
  for (const [name, paths] of Object.entries(FEATURE_ICONS)) {
    await writeSvg(join(branding, "icons", `${name}.svg`), featureIconSvg(name, paths));
  }

  // Badges + medals
  for (const [name, symbol] of Object.entries(BADGES)) {
    const svg = badgeSvg(name, symbol);
    await writeSvg(join(branding, "badges", `${name}.svg`), svg);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(branding, "badges", `${name}.png`));
  }
  for (const [name, symbol] of Object.entries(MEDALS)) {
    const svg = badgeSvg(name, symbol);
    await writeSvg(join(branding, "medals", `${name}.svg`), svg);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(branding, "medals", `${name}.png`));
  }

  // Empty states
  for (const kind of ["battles", "rankings", "notifications", "lessons", "members", "activity"]) {
    const svg = emptyStateSvg(kind);
    await writeSvg(join(branding, "empty-states", `${kind}.svg`), svg);
    await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(join(branding, "empty-states", `${kind}.webp`));
  }

  // Backgrounds
  const mesh = backgroundMeshSvg();
  await writeSvg(join(branding, "backgrounds", "gradient-mesh.svg"), mesh);
  await sharp(Buffer.from(mesh)).webp({ quality: 82 }).toFile(join(branding, "backgrounds", "gradient-mesh.webp"));
  await writeSvg(
    join(branding, "backgrounds", "particles.svg"),
    `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <rect width="800" height="800" fill="transparent"/>
  ${Array.from({ length: 40 }, (_, i) => {
      const x = (i * 97) % 800;
      const y = (i * 53) % 800;
      const r = 1 + (i % 3);
      const c = i % 2 ? COLORS.cyan : COLORS.pink;
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${0.15 + (i % 5) * 0.05}"/>`;
    }).join("\n  ")}
</svg>`,
  );

  // Watermarks
  await writeSvg(join(branding, "watermarks", "sf-dark.svg"), watermarkSvg({ light: false }));
  await writeSvg(join(branding, "watermarks", "sf-light.svg"), watermarkSvg({ light: true }));
  await writeSvg(
    join(branding, "watermarks", "sf-minimal.svg"),
    `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <text x="128" y="168" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="120" font-weight="900" letter-spacing="-8" fill="rgba(255,255,255,0.08)">SF</text>
</svg>`,
  );

  // Loading mark
  await writeSvg(join(branding, "loading", "sf-loader.svg"), sfMarkSvg(256, { rounded: false }));
  await sharp(Buffer.from(sfMarkSvg(256, { rounded: false })))
    .png({ compressionLevel: 9 })
    .toFile(join(branding, "loading", "sf-loader.png"));

  // Splash screens (desktop / tablet / phone)
  async function splash(width, height, name) {
    const logoSize = Math.round(Math.min(width, height) * 0.28);
    const logo = await sharp(masterLogo).resize(logoSize, logoSize, { fit: "inside" }).png().toBuffer();
    const base = await sharp({
      create: {
        width,
        height,
        channels: 3,
        background: COLORS.navy,
      },
    })
      .composite([
        {
          input: Buffer.from(
            `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="g" cx="50%" cy="42%" r="45%">
                  <stop offset="0%" stop-color="${COLORS.purple}" stop-opacity="0.45"/>
                  <stop offset="55%" stop-color="${COLORS.indigo}" stop-opacity="0.18"/>
                  <stop offset="100%" stop-color="${COLORS.navy}" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#g)"/>
            </svg>`,
          ),
          top: 0,
          left: 0,
        },
        {
          input: logo,
          top: Math.round((height - logoSize) / 2 - height * 0.04),
          left: Math.round((width - logoSize) / 2),
        },
      ])
      .webp({ quality: 85 })
      .toFile(join(branding, "splash", `${name}.webp`));
    return base;
  }
  await splash(1920, 1080, "splash-desktop");
  await splash(1536, 2048, "splash-tablet");
  await splash(1170, 2532, "splash-phone");
  await splash(512, 512, "splash-pwa");

  // Social templates (simple branded canvases)
  async function socialCanvas(width, height, title, filename) {
    const logoSize = Math.round(Math.min(width, height) * 0.22);
    const logo = await sharp(masterLogo).resize(logoSize, logoSize, { fit: "inside" }).png().toBuffer();
    const svgOverlay = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${COLORS.navy}"/>
          <stop offset="50%" stop-color="${COLORS.charcoal}"/>
          <stop offset="100%" stop-color="${COLORS.navy}"/>
        </linearGradient>
        <linearGradient id="t" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${COLORS.cyan}"/>
          <stop offset="100%" stop-color="${COLORS.pink}"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="${width * 0.85}" cy="${height * 0.2}" r="${width * 0.25}" fill="${COLORS.purple}" opacity="0.2"/>
      <circle cx="${width * 0.1}" cy="${height * 0.85}" r="${width * 0.2}" fill="${COLORS.cyan}" opacity="0.12"/>
      <text x="${width / 2}" y="${height * 0.72}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="${Math.round(width * 0.055)}" font-weight="900" fill="url(#t)">${title}</text>
      <text x="${width / 2}" y="${height * 0.8}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${Math.round(width * 0.028)}" fill="#FFFFFF" opacity="0.7">STREAMER FACTORY</text>
    </svg>`);
    await sharp(svgOverlay)
      .composite([{ input: logo, top: Math.round(height * 0.22), left: Math.round((width - logoSize) / 2) }])
      .webp({ quality: 86 })
      .toFile(join(branding, "social", filename));
  }

  await socialCanvas(1080, 1080, "CREATE. CONNECT. EARN.", "instagram-square.webp");
  await socialCanvas(1080, 1920, "LEVEL UP YOUR STREAM", "tiktok-story.webp");
  await socialCanvas(1200, 630, "THE #1 TIKTOK LIVE NETWORK", "facebook-og.webp");
  await socialCanvas(1280, 720, "TRAINING COMPLETE", "youtube-thumb.webp");
  await socialCanvas(1080, 1080, "MEMBER SPOTLIGHT", "discord-announcement.webp");
  await socialCanvas(1080, 1920, "WEEKLY CHALLENGE", "stories-challenge.webp");
  await socialCanvas(1080, 1080, "BATTLE RESULTS", "battle-results.webp");
  await socialCanvas(1080, 1080, "NEW CREATOR", "new-creator.webp");
  await socialCanvas(1080, 1080, "CREATOR WINS", "creator-wins.webp");
  await socialCanvas(1080, 1080, "RANKINGS UPDATE", "rankings-update.webp");

  // OG defaults (also copied for static fallback)
  async function ogImage(title, subtitle, filename) {
    const logoSize = 220;
    const logo = await sharp(masterLogo).resize(logoSize, logoSize, { fit: "inside" }).png().toBuffer();
    const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#05080F"/>
          <stop offset="45%" stop-color="${COLORS.navy}"/>
          <stop offset="100%" stop-color="${COLORS.charcoal}"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${COLORS.cyan}"/>
          <stop offset="100%" stop-color="${COLORS.pink}"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <circle cx="1050" cy="80" r="220" fill="${COLORS.purple}" opacity="0.22"/>
      <circle cx="80" cy="560" r="180" fill="${COLORS.cyan}" opacity="0.12"/>
      <text x="320" y="250" font-family="Arial Black,Arial,sans-serif" font-size="54" font-weight="900" fill="#FFFFFF">${title}</text>
      <text x="320" y="320" font-family="Arial,sans-serif" font-size="28" fill="#A1A1AA">${subtitle}</text>
      <text x="320" y="420" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="url(#accent)">thestreamerfactory.com</text>
      <text x="320" y="470" font-family="Arial,sans-serif" font-size="18" letter-spacing="4" fill="#71717A">TIKTOK LIVE CREATOR AGENCY</text>
    </svg>`);
    await sharp(overlay)
      .composite([{ input: logo, top: 205, left: 64 }])
      .webp({ quality: 88 })
      .toFile(join(branding, "og", `${filename}.webp`));
    await sharp(overlay)
      .composite([{ input: logo, top: 205, left: 64 }])
      .png({ compressionLevel: 9 })
      .toFile(join(branding, "og", `${filename}.png`));
  }

  await ogImage("Streamer Factory", "Grow audiences. Build sustainable income.", "homepage");
  await ogImage("Join Streamer Factory", "Apply to the TikTok LIVE creator network.", "join");
  await ogImage("Creator Rankings", "See who’s leading the Factory this period.", "rankings");
  await ogImage("Creator Network", "Meet the Streamer Factory members.", "members");
  await ogImage("StreamerU", "Training that levels up your LIVE game.", "streameru");
  await ogImage("Battle Hub", "Schedule battles. Drop flyers. Compete.", "battle-hub");
  await ogImage("Creator Profile", "Streamer Factory creator spotlight.", "creator-profile");
  await ogImage("Member Dashboard", "Your Streamer Factory command center.", "dashboard");

  // Optimize brand board reference
  try {
    await sharp(brandBoard)
      .resize(2000, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(branding, "logo", "masterbrandboard.webp"));
  } catch {
    /* optional */
  }

  // Root-friendly shortcuts
  await copyFile(join(branding, "favicon", "apple-touch-icon.png"), join(publicDir, "apple-touch-icon.png"));
  await copyFile(join(branding, "logo", "sflogo-512.png"), join(publicDir, "sflogo-512.png"));

  // Manifest icons already under branding/favicon
  console.log("Brand assets generated under public/branding/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
