import { describe, expect, it } from "vitest";
import {
  parsePublishedImageBlock,
  resolvePublicLessonContent,
} from "@/lib/streameru-media/resolve-public-content";
import type { LessonMediaAsset } from "@/lib/streameru-media/types";

function asset(partial: Partial<LessonMediaAsset> & Pick<LessonMediaAsset, "id" | "title">): LessonMediaAsset {
  return {
    lesson_slug: "start-strong-on-tiktok-live",
    asset_type: "screenshot",
    placeholder_key: partial.placeholder_key ?? null,
    requested_description: partial.requested_description ?? partial.title,
    section_key: "Screenshots",
    instructional_purpose: "test",
    required: false,
    priority: "helpful",
    ownership: "needs_brad",
    capture_instructions: "",
    dimensions_hint: null,
    privacy_warning: null,
    admin_notes: null,
    suggested_caption: null,
    suggested_alt: null,
    storage_path: null,
    public_url: null,
    alt_text: null,
    caption: null,
    status: "requested",
    display_order: 1,
    reusable_key: null,
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
    published_at: null,
    ...partial,
  };
}

const SAMPLE = `## Real Creator Scenarios

Someone starts without a plan.

## Screenshots

[Screenshot: TikTok profile showing a clear photo, readable username, and one-sentence bio]

[Screenshot: Phone propped at eye level with a lamp or window light facing the creator]

## Diagrams

[Diagram: LIVE vs posted video — finished clip on the left, real-time hosted room on the right]

## Next Steps

Keep going.`;

describe("resolvePublicLessonContent", () => {
  it("hides placeholder media and empty Screenshots/Diagrams headings", () => {
    const htmlish = resolvePublicLessonContent(SAMPLE, []);
    expect(htmlish).not.toMatch(/\[Screenshot:/i);
    expect(htmlish).not.toMatch(/\[Diagram:/i);
    expect(htmlish).not.toContain("## Screenshots");
    expect(htmlish).not.toContain("## Diagrams");
    expect(htmlish).toContain("## Real Creator Scenarios");
    expect(htmlish).toContain("## Next Steps");
    expect(htmlish).not.toMatch(/placeholder/i);
  });

  it("does not render draft or archived assets", () => {
    const assets = [
      asset({
        id: "1",
        title: "Profile",
        placeholder_key:
          "TikTok profile showing a clear photo, readable username, and one-sentence bio",
        status: "draft",
        public_url: "https://example.com/a.png",
        alt_text: "Alt",
      }),
      asset({
        id: "2",
        title: "Phone",
        placeholder_key: "Phone propped at eye level with a lamp or window light facing the creator",
        status: "archived",
        public_url: "https://example.com/b.png",
        alt_text: "Alt",
      }),
    ];
    const out = resolvePublicLessonContent(SAMPLE, assets);
    expect(out).not.toContain("PublishedImage");
    expect(out).not.toContain("## Screenshots");
  });

  it("renders only published assets in order and keeps the section heading", () => {
    const assets = [
      asset({
        id: "1",
        title: "Phone",
        placeholder_key: "Phone propped at eye level with a lamp or window light facing the creator",
        status: "published",
        public_url: "https://example.com/phone.png",
        alt_text: "Phone at eye level",
        caption: "Front light",
        display_order: 2,
      }),
    ];
    const out = resolvePublicLessonContent(SAMPLE, assets);
    expect(out).toContain("## Screenshots");
    expect(out).toContain("[PublishedImage: https://example.com/phone.png | Phone at eye level | Front light]");
    expect(out).not.toContain("TikTok profile showing");
    expect(out).not.toContain("## Diagrams");
  });

  it("requires alt_text for public render even if status is published", () => {
    const assets = [
      asset({
        id: "1",
        title: "Phone",
        placeholder_key: "Phone propped at eye level with a lamp or window light facing the creator",
        status: "published",
        public_url: "https://example.com/phone.png",
        alt_text: null,
      }),
    ];
    const out = resolvePublicLessonContent(SAMPLE, assets);
    expect(out).not.toContain("PublishedImage");
  });
});

describe("parsePublishedImageBlock", () => {
  it("parses url, alt, and caption", () => {
    const parsed = parsePublishedImageBlock(
      "[PublishedImage: https://x.test/a.png | My alt | My caption]",
    );
    expect(parsed).toEqual({
      url: "https://x.test/a.png",
      alt: "My alt",
      caption: "My caption",
    });
  });
});
