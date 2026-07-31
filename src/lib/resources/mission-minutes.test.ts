import { describe, expect, it } from "vitest";
import { extractLiveMinutesFromMission, formatMinutesLabel } from "@/lib/resources/mission-minutes";

describe("extractLiveMinutesFromMission", () => {
  it("reads at-least minutes from steps", () => {
    const n = extractLiveMinutesFromMission({
      mission_steps: ["Go live for at least 45 minutes in one continuous session (required)."],
      mission_goal: "Finish strong.",
      mission_description: "Execute now.",
    });
    expect(n).toBe(45);
  });

  it("picks the highest duration when several appear", () => {
    const n = extractLiveMinutesFromMission({
      mission_steps: ["Warm up 25 minutes", "Then go live for at least 60 minutes"],
      mission_goal: "Hold 60+ minutes with clear segments.",
      mission_description: "Practice.",
    });
    expect(n).toBe(60);
  });

  it("returns null when no duration is present", () => {
    const n = extractLiveMinutesFromMission({
      mission_steps: ["Post an announcement."],
      mission_goal: "Stay intentional.",
      mission_description: "Prep only.",
    });
    expect(n).toBeNull();
  });
});

describe("formatMinutesLabel", () => {
  it("formats under an hour", () => {
    expect(formatMinutesLabel(25)).toBe("25 min");
  });

  it("formats whole hours", () => {
    expect(formatMinutesLabel(120)).toBe("2 hr");
  });
});
