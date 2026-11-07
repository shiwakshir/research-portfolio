export interface RoadmapStage {
  id: number;
  title: string;
  status: 'Now' | 'Next' | 'Later' | 'Coming later';
  text: string;
  isLocked?: boolean;
}

/**
 * Edit currentStageId to change which stage is active.
 * The active stage receives aria-current="step" and highlighted styling.
 */
export const currentStageId = 1;

export const roadmapStages: RoadmapStage[] = [
  {
    id: 1,
    title: "Desk research",
    status: "Now",
    text: "Reviewing published evidence on flare-ups, self-management and digital support.",
  },
  {
    id: 2,
    title: "Exploratory survey",
    status: "Next",
    text: "Asking people with lived experience what happens during a flare and what helps.",
  },
  {
    id: 3,
    title: "Follow-up interviews",
    status: "Later",
    text: "Exploring the survey findings in depth.",
  },
  {
    id: 4,
    title: "Design and testing",
    status: "Later",
    text: "Turning the evidence into design decisions and testing them.",
  },
  {
    id: 5,
    title: "Something new",
    status: "Coming later",
    text: "Built from this research.",
    isLocked: true,
  },
];
