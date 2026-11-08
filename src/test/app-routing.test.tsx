import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each([
    "/about",
    "/contact",
    "/journal",
    "/projects",
    "/interests",
    "/privacy",
    "/evidence-checks",
    "/series",
  ])("matches static route %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes(path);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each(["desk", "survey", "interviews", "design", "product"])("opens the relevant chapter page for %s", (stage) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes(`/journal/stages/${stage}`);
    expect(matches.at(-1)?.routeId).toBe("/journal/stages/$stage");
    const match = matches.at(-1);
    expect(match?.params && "stage" in match.params ? match.params.stage : undefined).toBe(stage);
  });

  it.each([
    "brief-agentic-evaluation",
    "treatment-timeline",
    "choicegap",
    "handover-studio",
    "unfumble",
    "workplace-compliance-ai",
  ])("matches project slug %s", (slug) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes(`/projects/${slug}`);
    expect(matches.at(-1)?.routeId).toBe("/projects/$slug");
  });

  it("keeps the entry preview separate from the published article URL", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/journal/previews/what-counts-as-a-flare").at(-1)?.routeId).toBe("/journal/previews/$entry");
    expect(router.matchRoutes("/journal/what-counts-as-a-flare").at(-1)?.routeId).toBe("/journal/$slug");
  });
});
