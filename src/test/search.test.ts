import { describe, expect, it } from "vitest";
import { getSearchIndex, searchSite } from "@/lib/search";

describe("Site search", () => {
  it("indexes content across journal, roadmap, projects, themes and policy pages", () => {
    const index = getSearchIndex();
    expect(index.length).toBeGreaterThan(10);
    const types = new Set(index.map((item) => item.type));
    expect(types.has("Project")).toBe(true);
    expect(types.has("Research theme")).toBe(true);
    expect(types.has("Entry preview")).toBe(true);
    expect(types.has("Inquiry stage")).toBe(true);
    expect(types.has("Page")).toBe(true);
  });

  it("finds BRIEF and related projects and themes", () => {
    const results = searchSite("BRIEF");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.title === "BRIEF" && r.type === "Project")).toBe(true);
  });

  it("finds flare related previews, stages and themes", () => {
    const results = searchSite("flare");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.title.toLowerCase().includes("flare"))).toBe(true);
    expect(results.some((r) => r.type === "Inquiry stage")).toBe(true);
  });

  it("finds recall bias under Self-report and behaviour", () => {
    const results = searchSite("recall bias");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.title === "Self-report and behaviour" && r.type === "Research theme")).toBe(true);
  });

  it("returns empty array for non-matching queries", () => {
    expect(searchSite("xyznonexistentterm12345")).toEqual([]);
  });
});
