import { describe, expect, it, vi } from "vitest";
import type { JournalEntry } from "@/lib/content";

vi.mock("@/lib/content", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/content")>();
  return { ...original, getArticles: vi.fn(original.getArticles) };
});

import { getArticles } from "@/lib/content";
import { getEntryPreview, getEntryPreviews } from "@/lib/entry-previews";

describe("entry preview publishing boundaries", () => {
  it("lists the first entry placeholder only under Desk research", () => {
    vi.mocked(getArticles).mockReturnValue([]);
    expect(getEntryPreviews("desk").map((entry) => entry.slug)).toEqual(["what-counts-as-a-flare"]);
    for (const stage of ["survey", "interviews", "design", "product"] as const) {
      expect(getEntryPreviews(stage)).toEqual([]);
    }
  });

  it("never promotes a placeholder to a published article", () => {
    vi.mocked(getArticles).mockReturnValue([]);
    expect(getEntryPreview("what-counts-as-a-flare")).toBeDefined();
    expect(getArticles()).toEqual([]);
  });

  it("removes the placeholder once its matching article is published", () => {
    const published: JournalEntry = { slug: "what-counts-as-a-flare", html: "", data: { title: "What counts as a flare?", publishDate: new Date("2026-11-30"), author: "Shiwakshi Rashmi", readingTime: "8 min read", category: "Chronic Health", tags: [], abstract: "", draft: false, articleNumber: 1, researchStatus: "Literature exploration", researchStage: "desk", references: [] } };
    vi.mocked(getArticles).mockReturnValue([published]);
    expect(getEntryPreviews("desk")).toEqual([]);
    expect(getEntryPreview("what-counts-as-a-flare")).toBeUndefined();
    expect(getArticles()).toEqual([published]);
  });

  it("does not make up entries for unknown slugs", () => {
    vi.mocked(getArticles).mockReturnValue([]);
    expect(getEntryPreview("unknown-entry")).toBeUndefined();
  });
});