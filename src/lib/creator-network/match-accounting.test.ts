import { describe, expect, it } from "vitest";
import { accountUsernameMatch } from "./match-accounting";

describe("accountUsernameMatch", () => {
  it("does not report matched creators as unmatched", () => {
    const unmatched = new Set<string>();
    const high = accountUsernameMatch(unmatched, "alice", "profile-1", "high");
    const medium = accountUsernameMatch(unmatched, "bob", "profile-2", "medium");

    expect(high).toEqual({ matched: true, lowConfidence: false });
    expect(medium).toEqual({ matched: true, lowConfidence: false });
    expect([...unmatched]).toEqual([]);
  });

  it("counts low-confidence matches without adding them to unmatched", () => {
    const unmatched = new Set<string>();
    const result = accountUsernameMatch(unmatched, "carol", "profile-3", "low");

    expect(result).toEqual({ matched: true, lowConfidence: true });
    expect([...unmatched]).toEqual([]);
  });

  it("keeps genuinely unmatched creators in the unmatched report", () => {
    const unmatched = new Set<string>();
    const result = accountUsernameMatch(unmatched, "nobody_here", null, "high");

    expect(result).toEqual({ matched: false, lowConfidence: false });
    expect([...unmatched]).toEqual(["nobody_here"]);
  });

  it("one malformed / unmatched creator does not affect other matches", () => {
    const unmatched = new Set<string>();

    const a = accountUsernameMatch(unmatched, "matched_a", "p-a", "high");
    const bad = accountUsernameMatch(unmatched, "ghost_user", undefined, "medium");
    const b = accountUsernameMatch(unmatched, "matched_b", "p-b", "low");

    expect(a.matched).toBe(true);
    expect(bad.matched).toBe(false);
    expect(b.matched).toBe(true);
    expect(b.lowConfidence).toBe(true);
    expect([...unmatched]).toEqual(["ghost_user"]);
  });
});
