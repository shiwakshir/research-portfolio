export type ResearchStageId = "desk" | "survey" | "interviews" | "design" | "product";

export type RoadmapStage = {
  id: ResearchStageId;
  title: string;
  text: string;
  /** Label shown on stages after the current one. The current stage always shows "Now". */
  laterLabel: string;
  locked?: boolean;
};

/** Change this one field to move the "Now" marker (1 = first stage). */
export const CURRENT_STAGE = 1;

export const ROADMAP_STAGES: RoadmapStage[] = [
  { id: "desk", title: "Desk research", laterLabel: "Next", text: "Reviewing published evidence on flare-ups, self-management and digital support." },
  { id: "survey", title: "Exploratory survey", laterLabel: "Next", text: "Asking people with lived experience what happens during a flare and what helps." },
  { id: "interviews", title: "Deeper inquiry", laterLabel: "Later", text: "Exploring the survey findings in more depth." },
  { id: "design", title: "Design and testing", laterLabel: "Later", text: "Turning the evidence into design decisions and testing them." },
  { id: "product", title: "Something new", laterLabel: "Coming later", text: "Built from this research.", locked: true },
];

export type StageState = "done" | "current" | "upcoming";

export function getResearchStage(id: string) {
  return ROADMAP_STAGES.find((stage) => stage.id === id);
}

export function stageState(index: number, current = CURRENT_STAGE): StageState {
  const n = index + 1;
  return n < current ? "done" : n === current ? "current" : "upcoming";
}

export function stageLabel(index: number, current = CURRENT_STAGE): string {
  const s = stageState(index, current);
  if (s === "current") return "Now";
  if (s === "done") return "Done";
  // the stage directly after the current one is "Next", unless it is locked
  const stage = ROADMAP_STAGES[index];
  if (stage?.locked) return stage.laterLabel;
  return index + 1 === current + 1 ? "Next" : "Later";
}
