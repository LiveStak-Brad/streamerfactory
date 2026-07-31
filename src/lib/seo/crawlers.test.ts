import { describe, expect, it } from "vitest";
import { isHtmlCrawlerUserAgent, isTikTokVerifierUserAgent } from "@/lib/seo/crawlers";

describe("crawler detection", () => {
  it("treats Googlebot as an HTML crawler", () => {
    expect(
      isHtmlCrawlerUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"),
    ).toBe(true);
  });

  it("treats Bingbot as an HTML crawler", () => {
    expect(isHtmlCrawlerUserAgent("Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)")).toBe(
      true,
    );
  });

  it("does not treat normal browsers as HTML crawlers", () => {
    expect(
      isHtmlCrawlerUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      ),
    ).toBe(false);
  });

  it("detects TikTok verifier user agents", () => {
    expect(isTikTokVerifierUserAgent("TikTokSpider/1.0")).toBe(true);
    expect(isTikTokVerifierUserAgent("Mozilla/5.0")).toBe(false);
  });
});
