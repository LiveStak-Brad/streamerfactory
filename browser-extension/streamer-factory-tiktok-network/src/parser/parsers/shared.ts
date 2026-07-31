import {
  dataRowsInContainer,
  findCreatorContributionGrid,
  findStatsTableContainer,
  readCellText,
  splitCellLines,
} from "../gridTable";
import {
  extractUsernameWithConfidence,
  isBackstageHeaderText,
  isBackstageUiHandle,
} from "../username";
import { avatarFromRow } from "../avatar";

const ROW_SELECTORS = [
  '[role="row"]',
  "table tbody tr",
  ".semi-table-tbody .semi-table-row",
  '[class*="semi-table-row"]:not([class*="row-head"]):not([class*="header"])',
  '[class*="TableBody"] [class*="Row"]',
  '[class*="table-body"] [class*="row"]',
  '[class*="TableRow"]',
].join(", ");

function isHeaderChrome(el: Element): boolean {
  if (el.getAttribute("role") === "columnheader" || el.tagName === "TH") return true;
  if (el.querySelector('[role="columnheader"], th')) return true;
  if (el.closest('[role="columnheader"], thead, [class*="row-head"], [class*="table-header"], [class*="TableHeader"]')) {
    return true;
  }
  const cls = typeof el.className === "string" ? el.className : "";
  if (/row-head|column-header|table-header|TableHeader|semi-table-row-head/i.test(cls)) return true;
  const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
  if (isBackstageHeaderText(text) && !/\d+\s*d\s*[\/／]/.test(text) && !/\d+\s*h\s*[\/／]/i.test(text)) {
    // Pure header phrase without actual/progress values
    if (!/\d{2,}/.test(text.replace(/\s/g, ""))) return true;
  }
  return false;
}

function looksLikeDataRow(el: Element): boolean {
  if (isHeaderChrome(el)) return false;
  const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
  if (text.length < 8 || text.length > 900) return false;

  // Real stats rows almost always show progress like "1d / 8d" or "2h 32m / 20h" or diamond counts
  const hasProgress =
    /\d+\s*d\s*[\/／]/.test(text) ||
    /\d+\s*h(?:\s*\d+\s*m)?\s*[\/／]/i.test(text) ||
    /\b\d{1,3}(?:,\d{3})+\b/.test(text);

  const username = extractUsernameWithConfidence(text, { fromUsernameColumn: true }).username;
  if (username && isBackstageUiHandle(username)) return false;

  if (hasProgress && username) return true;
  if (hasProgress && el.querySelector('[role="cell"], td, [class*="cell"], [class*="Cell"]')) return true;
  if (
    username &&
    !isBackstageUiHandle(username) &&
    el.querySelector('[role="cell"], td, [class*="cell"], [class*="Cell"]') &&
    text.length > 20
  ) {
    return true;
  }
  return false;
}

function uniqueElements(els: Element[]): Element[] {
  const seen = new Set<Element>();
  const out: Element[] = [];
  for (const el of els) {
    if (seen.has(el)) continue;
    if (els.some((other) => other !== el && other.contains(el))) continue;
    seen.add(el);
    out.push(el);
  }
  return out;
}

/**
 * Find creator/data rows across modern Backstage Semi tables + ARIA grids.
 * Never treat column-header chrome as creator rows.
 */
export function rowLikeElements(doc: Document): Element[] {
  const containers: Element[] = [];
  const contributionGrid = findCreatorContributionGrid(doc);
  if (contributionGrid) containers.push(contributionGrid);
  const statsTable = findStatsTableContainer(doc);
  if (statsTable && statsTable !== contributionGrid) containers.push(statsTable);

  for (const container of containers) {
    const rows = dataRowsInContainer(container).filter(looksLikeDataRow);
    if (rows.length > 0) return uniqueElements(rows);

    const semiInContainer = Array.from(
      container.querySelectorAll(
        '.semi-table-tbody .semi-table-row, [class*="semi-table-row"]:not([class*="row-head"])',
      ),
    ).filter(looksLikeDataRow);
    if (semiInContainer.length > 0) return uniqueElements(semiInContainer);
  }

  const gridRows = Array.from(doc.querySelectorAll(ROW_SELECTORS)).filter(looksLikeDataRow);
  if (gridRows.length > 0) return uniqueElements(gridRows);

  // Climb from actual progress cells (must include slash progress, not header labels)
  const climbed: Element[] = [];
  const progressNodes = Array.from(doc.querySelectorAll("div, span, td, [role='cell'], p"));
  for (const el of progressNodes) {
    if (isHeaderChrome(el)) continue;
    const t = (el.textContent ?? "").trim();
    // Require actual/target slash form so header labels like "Valid go LIVE days" don't match
    if (!/\d+\s*d\s*[\/／]\s*\d+\s*d/i.test(t) && !/\d+\s*h(?:\s*\d+\s*m)?\s*[\/／]\s*\d+\s*h/i.test(t)) {
      continue;
    }
    let cur: Element | null = el;
    for (let i = 0; i < 10 && cur; i++) {
      const rowText = (cur.textContent ?? "").replace(/\s+/g, " ").trim();
      const u = extractUsernameWithConfidence(rowText, { fromUsernameColumn: true }).username;
      if (
        u &&
        !isBackstageUiHandle(u) &&
        rowText.length > 15 &&
        rowText.length < 900 &&
        !isHeaderChrome(cur)
      ) {
        climbed.push(cur);
        break;
      }
      cur = cur.parentElement;
    }
  }
  if (climbed.length > 0) return uniqueElements(climbed);

  return [];
}

export function tableCells(row: Element): Element[] {
  const cells = Array.from(
    row.querySelectorAll(
      "td, [role='cell'], [class*='semi-table-row-cell'], [class*='cell'], [class*='Cell']",
    ),
  ).filter((c) => !isHeaderChrome(c));
  if (cells.length > 0) {
    return cells.filter((c) => !cells.some((other) => other !== c && other.contains(c)));
  }
  return [];
}

export function cellTexts(row: Element): string[] {
  const cells = tableCells(row);
  if (cells.length > 0) {
    const lines: string[] = [];
    for (const cell of cells) {
      lines.push(...splitCellLines(readCellText(cell)));
    }
    return lines;
  }
  return splitCellLines((row.textContent ?? "").trim());
}

export function headerTextsForRow(row: Element): string[] {
  const table = row.closest("table");
  if (table) {
    const headers = Array.from(table.querySelectorAll("thead th, thead td, [role='columnheader']"));
    const fromTable = headers.map((h) => (h.textContent ?? "").trim().toLowerCase()).filter(Boolean);
    if (fromTable.length >= 2) return fromTable;
  }

  const grid = row.closest('[role="grid"], table, [class*="semi-table"], [class*="Table"]');
  if (grid) {
    const headers = [
      ...grid.querySelectorAll(
        '[role="columnheader"], thead th, [class*="column-header"], [class*="ColumnHeader"], [class*="semi-table-row-head"] [role="columnheader"]',
      ),
    ]
      .map((h) => (h.textContent ?? "").trim().toLowerCase())
      .filter(Boolean);
    if (headers.length >= 2) return headers;
  }

  return collectPageHeaders(row.ownerDocument ?? document);
}

export function collectPageHeaders(doc: Document): string[] {
  if (typeof doc.querySelectorAll !== "function") return [];
  const headers = Array.from(
    doc.querySelectorAll(
      '[role="columnheader"], thead th, thead td, [class*="column-header"], [class*="ColumnHeader"]',
    ),
  )
    .map((h) => (h.textContent ?? "").trim().toLowerCase())
    .filter((t) => t.length > 0 && t.length < 80);
  return [...new Set(headers)];
}

export function displayNameFromRow(row: Element, username?: string): string | undefined {
  const imgs = Array.from(row.querySelectorAll("img[alt]"));
  for (const img of imgs) {
    const alt = img.getAttribute("alt")?.trim();
    if (alt && alt.length > 1 && alt.toLowerCase() !== username?.toLowerCase()) return alt;
  }
  return undefined;
}

export function usernameFromCreatorCell(cellText: string, row: Element) {
  return extractUsernameWithConfidence(cellText, {
    fromUsernameColumn: true,
    displayName: displayNameFromRow(row),
  });
}

export { avatarFromRow };
