import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleBody } from "./ArticleBody";

describe("ArticleBody", () => {
  it("renders headings, paragraphs, screenshots, diagrams, callouts, and bold in admin mode", () => {
    const html = renderToStaticMarkup(
      createElement(ArticleBody, {
        content: `## Introduction

Welcome to **StreamerU**.

[Screenshot: Go Live button]

[Diagram: Audio then light then framing]

[Callout: Confidence first]
Empty rooms are normal.

### Nested tip

More detail.`,
      }),
    );
    expect(html).toContain("<h2");
    expect(html).toContain("Introduction");
    expect(html).toContain("<strong");
    expect(html).toContain("Admin only — screenshot requested");
    expect(html).toContain("Admin only — diagram requested");
    expect(html).toContain("Confidence first");
    expect(html).toContain("<h3");
    expect(html).toContain("Nested tip");
  });

  it("never renders incomplete media placeholders when hideIncompleteMedia is set", () => {
    const html = renderToStaticMarkup(
      createElement(ArticleBody, {
        hideIncompleteMedia: true,
        content: `## Screenshots

[Screenshot: Go Live button]

[Diagram: Audio then light then framing]

## Keep reading

Done.`,
      }),
    );
    expect(html).not.toMatch(/Screenshot placeholder/i);
    expect(html).not.toMatch(/Diagram —/i);
    expect(html).not.toMatch(/Admin only/i);
    expect(html).not.toMatch(/coming soon/i);
    expect(html).toContain("Keep reading");
  });

  it("renders PublishedImage with alt and caption", () => {
    const html = renderToStaticMarkup(
      createElement(ArticleBody, {
        hideIncompleteMedia: true,
        content: `[PublishedImage: https://example.com/a.png | Profile ready | Clear bio]`,
      }),
    );
    expect(html).toContain('src="https://example.com/a.png"');
    expect(html).toContain('alt="Profile ready"');
    expect(html).toContain("Clear bio");
  });
});
