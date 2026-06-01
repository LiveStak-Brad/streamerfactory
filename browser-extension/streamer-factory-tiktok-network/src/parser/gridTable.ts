import { extractUsernameFromText } from "./username";
import { isNonDiamondStatCell, isNumericStatCell, parseStatNumber } from "./numbers";

export function readCellText(cell: Element): string {
  const bits: string[] = [];
  for (const attr of ["aria-label", "title"]) {
    const v = cell.getAttribute(attr)?.trim();
    if (v) bits.push(v);
  }
  const text = (cell.textContent ?? "").trim();
  if (text) bits.push(text);
  return [...new Set(bits)].join(" ").trim();
}

export function splitCellLines(text: string): string[] {
  return text
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Grid/table that has Creator + Diamonds columns (Contribution details). */
export function findCreatorContributionGrid(doc: Document): Element | null {
  const candidates = [...doc.querySelectorAll('[role="grid"], table')];
  let best: Element | null = null;
  let bestRows = 0;

  for (const container of candidates) {
    const headerEls = [...container.querySelectorAll('[role="columnheader"], thead th')];
    const headerTexts = headerEls.map((h) => (h.textContent ?? "").trim().toLowerCase());
    const hasDiamonds = headerTexts.some((h) => /\bdiamonds?\b|\bgifts?\b/i.test(h));
    const hasCreator = headerTexts.some((h) => /creator|username/i.test(h));
    if (!hasDiamonds || !hasCreator) continue;

    const dataRows = [...container.querySelectorAll('[role="row"], tbody tr')].filter(
      (r) =>
        !r.querySelector('[role="columnheader"]') &&
        (r.textContent?.length ?? 0) > 20 &&
        /\d/.test(r.textContent ?? ""),
    );
    if (dataRows.length > bestRows) {
      bestRows = dataRows.length;
      best = container;
    }
  }

  return best;
}

export function dataRowsInContainer(container: Element): Element[] {
  return [...container.querySelectorAll('[role="row"], tbody tr')].filter(
    (r) => !r.querySelector('[role="columnheader"]') && (r.textContent?.length ?? 0) > 15,
  );
}

export function headerElementsForContainer(container: Element): Element[] {
  return [...container.querySelectorAll('[role="columnheader"], thead th')];
}

export function headerTextsForContainer(container: Element): string[] {
  return headerElementsForContainer(container)
    .map((h) => (h.textContent ?? "").trim().toLowerCase())
    .filter(Boolean);
}

export function cellTextAtColIndex(row: Element, colIndex: number): string | undefined {
  for (const sel of [
    `[role="cell"][aria-colindex="${colIndex}"]`,
    `[aria-colindex="${colIndex}"]`,
  ]) {
    const direct = row.querySelector(sel);
    if (direct) return readCellText(direct);
  }
  for (const cell of row.querySelectorAll('[role="cell"], td')) {
    const idx = parseInt(cell.getAttribute("aria-colindex") ?? "", 10);
    if (idx === colIndex) return readCellText(cell);
  }
  return undefined;
}

function parseDiamondValue(text: string | undefined): number | undefined {
  if (!text) return undefined;
  const n = parseStatNumber(text);
  if (n === undefined || n < 50) return undefined;
  if (/^\$/.test(text.trim()) || /%$/.test(text.trim())) return undefined;
  return n;
}

/**
 * Read Diamonds from the same grid as this row — never document-wide header indices.
 */
export function diamondsFromRowGrid(row: Element): number | undefined {
  const grid = row.closest('[role="grid"], table');
  if (!grid) return undefined;

  const headerEls = headerElementsForContainer(grid);
  let diamondsHeaderEl: Element | undefined;
  let diamondsHeaderPos = -1;

  headerEls.forEach((h, i) => {
    if (/\bdiamonds?\b|\bgifts?\b/i.test(h.textContent ?? "")) {
      diamondsHeaderEl = h;
      diamondsHeaderPos = i;
    }
  });

  if (!diamondsHeaderEl && diamondsHeaderPos < 0) return undefined;

  const ariaRaw = parseInt(diamondsHeaderEl?.getAttribute("aria-colindex") ?? "", 10);
  const tryColIndexes = new Set<number>();
  if (!Number.isNaN(ariaRaw)) {
    tryColIndexes.add(ariaRaw);
    tryColIndexes.add(ariaRaw + 1);
    tryColIndexes.add(ariaRaw - 1);
  }
  if (diamondsHeaderPos >= 0) tryColIndexes.add(diamondsHeaderPos);

  for (const idx of tryColIndexes) {
    const n = parseDiamondValue(cellTextAtColIndex(row, idx));
    if (n !== undefined) return n;
  }

  const rowCells = [...row.querySelectorAll('[role="cell"], td')];
  if (diamondsHeaderPos >= 0 && diamondsHeaderPos < rowCells.length) {
    const n = parseDiamondValue(readCellText(rowCells[diamondsHeaderPos]));
    if (n !== undefined) return n;
  }

  return undefined;
}

/** Fallback: largest plain numeric stat in row (skips $0.00, 0%, days, hours). */
export function pickLargestDiamondLikeValue(
  cellLines: string[],
  username?: string,
): number | undefined {
  let best: number | undefined;

  for (const part of cellLines) {
    if (username && part.toLowerCase().includes(username.toLowerCase())) continue;
    if (isNonDiamondStatCell(part)) continue;
    if (/^\$/.test(part) || /%$/.test(part)) continue;
    if (extractUsernameFromText(part)) continue;

    let n: number | undefined;
    if (isNumericStatCell(part)) {
      n = parseStatNumber(part);
    } else {
      n = parseStatNumber(part);
    }
    if (n === undefined || n < 100) continue;
    if (best === undefined || n > best) best = n;
  }

  return best;
}
