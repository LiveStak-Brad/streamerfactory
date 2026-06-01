/** Safe string class list — className is not always a string on SVG/custom nodes. */
export function elementClassText(el: Element): string {
  const raw = el.className;
  if (typeof raw === "string") return raw;
  if (raw && typeof (raw as { baseVal?: string }).baseVal === "string") {
    return (raw as { baseVal: string }).baseVal;
  }
  return el.getAttribute("class") ?? "";
}

export function elementLooksSelected(el: Element): boolean {
  if (el.getAttribute("aria-selected") === "true") return true;
  if (el.classList?.contains("active")) return true;
  if (el.classList?.contains("semi-tabs-tab-active")) return true;
  return elementClassText(el).toLowerCase().includes("active");
}
