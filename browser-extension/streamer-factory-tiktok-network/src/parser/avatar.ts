/** Best profile image URL from the creator column on a Backstage stats row. */
export function avatarFromRow(row: Element): string | undefined {
  const cells = row.querySelectorAll('[role="cell"], td');
  const creatorCell = cells[0] ?? row;
  return pickBestAvatarUrl(creatorCell) ?? pickBestAvatarUrl(row);
}

function pickBestAvatarUrl(root: Element): string | undefined {
  const candidates: { url: string; score: number }[] = [];

  for (const img of root.querySelectorAll("img")) {
    const url = bestImgSrc(img);
    if (!url) continue;
    candidates.push({ url, score: scoreAvatarImg(img, url, root) });
  }

  for (const source of root.querySelectorAll("picture source[srcset], picture source[src]")) {
    const url = bestImgSrc(source);
    if (url) candidates.push({ url, score: scoreAvatarImg(source, url, root) + 1 });
  }

  const lazyHost = root.querySelector("[data-src], [data-lazy-src], [data-original]") as Element | null;
  if (lazyHost) {
    const url = bestImgSrc(lazyHost);
    if (url) candidates.push({ url, score: scoreAvatarImg(lazyHost, url, root) });
  }

  const withBg = root.querySelector("[style*='background-image']") as HTMLElement | null;
  const bg = withBg?.style?.backgroundImage;
  if (bg) {
    const m = bg.match(/url\(["']?([^"')]+)["']?\)/i);
    if (m?.[1] && isUsableAvatarUrl(m[1])) {
      candidates.push({ url: m[1], score: scoreAvatarImg(withBg, m[1], root) + 2 });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0]?.url;
}

function scoreAvatarImg(el: Element, url: string, root: Element): number {
  let score = 0;
  const lowerUrl = url.toLowerCase();
  const cls = `${el.className ?? ""} ${(el.parentElement?.className ?? "")}`.toLowerCase();

  if (/avatar|portrait|profile|creator|thumb|head/i.test(cls)) score += 8;
  if (/story|badge|icon|logo|level|rank|medal|frame/i.test(cls)) score -= 12;
  if (/story|badge|icon-logo|default_avatar/i.test(lowerUrl)) score -= 12;

  const w = parseInt(el.getAttribute("width") ?? "", 10);
  const h = parseInt(el.getAttribute("height") ?? "", 10);
  if (!Number.isNaN(w) && w >= 28 && w <= 96) score += 4;
  if (!Number.isNaN(h) && h >= 28 && h <= 96) score += 4;
  if ((!Number.isNaN(w) && w > 120) || (!Number.isNaN(h) && h > 120)) score -= 4;

  if (root.matches('[role="cell"], td') || root.querySelector('[role="cell"]')?.contains(el)) {
    score += 3;
  }

  if (/tiktokcdn|ibytedapm|byteimg/i.test(lowerUrl)) score += 2;

  return score;
}

function bestImgSrc(el: Element): string | undefined {
  const attrs = ["src", "data-src", "data-lazy-src", "data-original", "data-url"];
  for (const attr of attrs) {
    const v = el.getAttribute(attr)?.trim();
    if (v && isUsableAvatarUrl(v)) return v;
  }
  const srcset = el.getAttribute("srcset");
  if (srcset) {
    const first = srcset.split(",")[0]?.trim().split(/\s+/)[0]?.trim();
    if (first && isUsableAvatarUrl(first)) return first;
  }
  return undefined;
}

function isUsableAvatarUrl(url: string): boolean {
  if (!url || url.startsWith("data:") || url.startsWith("blob:") || url.length < 12) return false;
  if (/placeholder|blank|1x1|sprite|favicon/i.test(url)) return false;
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
