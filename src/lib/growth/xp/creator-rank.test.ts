import { describe, expect, it } from "vitest";
import { didRankUp, getCreatorRank } from "@/lib/growth/xp/creator-rank";

describe("getCreatorRank", () => {
  it("starts at Recruit", () => {
    const rank = getCreatorRank(0);
    expect(rank.tier.key).toBe("recruit");
    expect(rank.level).toBe(1);
    expect(rank.nextTier?.key).toBe("apprentice");
  });

  it("levels into Creator", () => {
    const rank = getCreatorRank(150);
    expect(rank.tier.key).toBe("creator");
    expect(rank.level).toBe(3);
    expect(rank.xpForNext).toBe(200);
  });

  it("caps at Legend", () => {
    const rank = getCreatorRank(5000);
    expect(rank.tier.key).toBe("legend");
    expect(rank.nextTier).toBeNull();
    expect(rank.percentToNext).toBe(100);
  });
});

describe("didRankUp", () => {
  it("detects tier crossings", () => {
    expect(didRankUp(49, 50)).toBe(true);
    expect(didRankUp(50, 51)).toBe(false);
    expect(didRankUp(100, 50)).toBe(false);
  });
});
