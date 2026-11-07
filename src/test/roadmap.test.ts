import { describe, it, expect } from "vitest";
import { ROADMAP_STAGES, stageLabel, getResearchStage } from "@/data/roadmap";

describe("roadmap", () => {
  it("has five stages in the agreed order", () => {
    expect(ROADMAP_STAGES.map((s) => s.title)).toEqual([
      "Desk research", "Exploratory survey", "Deeper inquiry", "Design and testing", "Something new",
    ]);
  });
  it("labels stages Now, Next, Later, Later, Coming later when on stage 1", () => {
    expect(ROADMAP_STAGES.map((_, i) => stageLabel(i, 1))).toEqual(["Now", "Next", "Later", "Later", "Coming later"]);
  });
  it("moves Now when the current stage changes", () => {
    expect(ROADMAP_STAGES.map((_, i) => stageLabel(i, 2))).toEqual(["Done", "Now", "Next", "Later", "Coming later"]);
  });
  it("resolves the five chapter destinations independently", () => {
    expect(["desk", "survey", "interviews", "design", "product"].map((id) => getResearchStage(id)?.title)).toEqual([
      "Desk research", "Exploratory survey", "Deeper inquiry", "Design and testing", "Something new",
    ]);
    expect(getResearchStage("unpublished-stage")).toBeUndefined();
  });
});
