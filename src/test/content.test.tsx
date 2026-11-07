import { describe, expect, it } from "vitest";
import { getArticles, getProjects, getPublicSeries, renderBody } from "@/lib/content";

describe("content rules", () => {
  it("never exposes draft journal entries", () => {
    const slugs = getArticles().map((a) => a.slug);
    expect(slugs).not.toContain("what-counts-as-a-flare");
  });

  it("hides series that are not public", () => {
    expect(getPublicSeries().map((s) => s.slug)).not.toContain("living-with-fluctuating-health");
  });

  it("orders projects with BRIEF first", () => {
    expect(getProjects()[0]?.slug).toBe("brief-agentic-evaluation");
  });

  it("renders evidence blocks with their label", () => {
    const html = renderBody('<EvidenceBlock type="open-question">\nWhy?\n</EvidenceBlock>');
    expect(html).toContain("Open question");
    expect(html).toContain("<p>Why?</p>");
  });
});
