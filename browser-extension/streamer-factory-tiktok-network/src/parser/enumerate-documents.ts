import { deepQueryAll } from "./dom-deep";

/** Main document plus same-origin iframes (Backstage embeds). */
export function enumerateDocuments(root: Document): Document[] {
  const docs: Document[] = [root];
  const queue: Document[] = [root];

  while (queue.length > 0) {
    const doc = queue.shift()!;
    for (const frame of deepQueryAll(doc, "iframe")) {
      try {
        const nested = (frame as HTMLIFrameElement).contentDocument;
        if (nested && !docs.includes(nested)) {
          docs.push(nested);
          queue.push(nested);
        }
      } catch {
        /* cross-origin */
      }
    }
  }

  return docs;
}
