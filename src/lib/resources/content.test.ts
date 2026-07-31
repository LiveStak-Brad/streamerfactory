import { describe, expect, it } from "vitest";
import { splitIntroAndBody } from "./content";

describe("splitIntroAndBody", () => {
  it("keeps the full Introduction section before the callout split", () => {
    const { intro, rest } = splitIntroAndBody(`## Introduction

Welcome paragraph.

Second intro paragraph.

## Why This Lesson Matters

Sequence.

## Learning Objectives

Learn things.`);
    expect(intro).toContain("## Introduction");
    expect(intro).toContain("Welcome paragraph");
    expect(intro).toContain("Second intro paragraph");
    expect(rest).toContain("## Why This Lesson Matters");
    expect(rest).toContain("## Learning Objectives");
    expect(rest).not.toContain("Welcome paragraph");
  });

  it("falls back to first block for legacy posts", () => {
    const { intro, rest } = splitIntroAndBody(`First block.

Second block.`);
    expect(intro).toBe("First block.");
    expect(rest).toBe("Second block.");
  });
});
