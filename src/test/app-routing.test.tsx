import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it.each(["desk", "survey", "interviews", "design", "product"])("opens the relevant chapter page for %s", (stage) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes(`/journal/stages/${stage}`);
    expect(matches.at(-1)?.routeId).toBe("/journal/stages/$stage");
    const match = matches.at(-1);
    expect(match?.params && "stage" in match.params ? match.params.stage : undefined).toBe(stage);
  });
  it("keeps the entry preview separate from the published article URL", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/journal/previews/what-counts-as-a-flare").at(-1)?.routeId).toBe("/journal/previews/$entry");
    expect(router.matchRoutes("/journal/what-counts-as-a-flare").at(-1)?.routeId).toBe("/journal/$slug");
  });
});
