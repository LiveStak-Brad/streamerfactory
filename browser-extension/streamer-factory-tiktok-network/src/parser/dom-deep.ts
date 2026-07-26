export function isDocumentNode(root: Document | Element): root is Document {
  return (root as Document).nodeType === 9;
}

function isShadowRootNode(node: ParentNode): node is ShadowRoot {
  return (node as ShadowRoot).nodeType === 11;
}

/** Walk document including open shadow roots (Backstage uses Web Components). */
export function deepQueryAll(root: Document | Element, selector: string): Element[] {
  const results: Element[] = [];
  const seen = new Set<Element>();

  function visit(node: ParentNode) {
    if ((node as Element).nodeType === 1) {
      const el = node as Element;
      el.querySelectorAll(selector).forEach((match) => {
        if (!seen.has(match)) {
          seen.add(match);
          results.push(match);
        }
      });
      el.querySelectorAll("*").forEach((child) => {
        if (child.shadowRoot) visit(child.shadowRoot);
      });
      return;
    }

    if (isDocumentNode(node as Document)) {
      visit((node as Document).documentElement);
      return;
    }

    if (isShadowRootNode(node)) {
      const sr = node as ShadowRoot;
      sr.querySelectorAll(selector).forEach((match) => {
        if (!seen.has(match)) {
          seen.add(match);
          results.push(match);
        }
      });
      sr.querySelectorAll("*").forEach((child) => {
        if (child.shadowRoot) visit(child.shadowRoot);
      });
    }
  }

  if (isDocumentNode(root)) visit(root);
  else {
    if (!seen.has(root) && root.matches(selector)) {
      seen.add(root);
      results.push(root);
    }
    visit(root);
    if (root.shadowRoot) visit(root.shadowRoot);
  }

  return results;
}

export function isNodeInside(el: Element, scope: Element | Document): boolean {
  if (isDocumentNode(scope)) {
    return scope.documentElement.contains(el);
  }

  let node: Node | null = el;
  while (node) {
    if (node === scope) return true;
    if (isShadowRootNode(node)) {
      node = node.host;
      continue;
    }
    node = node.parentNode;
  }
  return false;
}
