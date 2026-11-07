import { describe, expect, it, vi } from "vitest";
import type { JournalEntry } from "@/lib/content";

vi.mock("@/lib/content", () => ({ getArticles: vi.fn() }));

import { getArticles } from "@/lib/content";
import { getStageArticles } from "@/lib/research";

function article(slug: string, stage: JournalEntry["data"]["researchStage"], number: number): JournalEntry {
  return { slug, html: "", data: { title: slug, publishDate: new Date("2026-11-07"), author: "Shiwakshi Rashmi", readingTime: "8 min read", category: "Chronic Health", tags: [], abstract: "", draft: false, articleNumber: number, researchStatus: "Literature exploration", ...(stage ? { researchStage: stage } : {}), references: [] } };
}

describe("research chapter publishing", () => {
  it("places Desk Research posts in their chapter from first entry onward", () => {
    vi.mocked(getArticles).mockReturnValue([article("desk-second", "desk", 2), article("desk-first", "desk", 1)]);
    expect(getStageArticles("desk").map((entry) => entry.slug)).toEqual(["desk-first", "desk-second"]);
  });
  it("gives each later chapter only its relevant posts", () => {
    vi.mocked(getArticles).mockReturnValue([article("desk-first", "desk", 1), article("survey-post", "survey", 2), article("interview-post", "interviews", 3), article("testing-post", "design", 4), article("new-product", "product", 5), article("unrelated", undefined, 6)]);
    expect(getStageArticles("survey").map((entry) => entry.slug)).toEqual(["survey-post"]);
    expect(getStageArticles("interviews").map((entry) => entry.slug)).toEqual(["interview-post"]);
    expect(getStageArticles("design").map((entry) => entry.slug)).toEqual(["testing-post"]);
    expect(getStageArticles("product").map((entry) => entry.slug)).toEqual(["new-product"]);
  });
  it("does not fabricate posts for an empty chapter", () => {
    vi.mocked(getArticles).mockReturnValue([]);
    expect(getStageArticles("desk")).toEqual([]);
  });
});