import { describe, expect, it } from "vitest";
import { buildRosterDiffPreview } from "./roster-diff";

describe("buildRosterDiffPreview", () => {
  it("groups present, missing, static-only, and new candidates", () => {
    const diff = buildRosterDiffPreview({
      backstageHandles: ["alice", "bob_new"],
      matchedSiteHandles: ["alice", "carol_gone"],
      unmatchedBackstageHandles: ["bob_new"],
    });

    expect(diff.presentInBackstage).toEqual(["alice", "bob_new"]);
    expect(diff.retained).toEqual(["alice"]);
    expect(diff.added).toContain("bob_new");
    expect(diff.missingFromBackstage).toContain("carol_gone");
    expect(diff.unmatched).toEqual(["bob_new"]);
  });
});
