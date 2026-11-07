import { getArticles } from "@/lib/content";
import type { ResearchStageId } from "@/data/roadmap";

/** Always start with the published-content gate, then order each chapter from its first entry. */
export function getStageArticles(stage: ResearchStageId) {
  return getArticles()
    .filter((article) => article.data.researchStage === stage)
    .sort((a, b) => a.data.articleNumber - b.data.articleNumber);
}