import { createElement } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ProjectEntry } from "@/lib/content";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, params: _params, ...props }: { to: string; params?: unknown }) => createElement("a", { ...props, href: to }),
}));

import { SelectedWork } from "@/components/site/SelectedWork";

const projects: ProjectEntry[] = [{ slug: "brief", html: "", data: { title: "BRIEF", summary: "A research tool.", role: "Researcher", sector: "Applied AI", methods: ["Review"], order: 1, isLead: true, draft: false } }];
afterEach(cleanup);

describe("selected work disclosure", () => {
  it("starts with all projects collapsed, including BRIEF", () => {
    render(<SelectedWork projects={projects} />);
    expect(screen.getByRole("button", { name: "BRIEF Applied AI" })).toHaveAttribute("aria-expanded", "false");
  });

  it("closes a hovered project when the mouse leaves it", () => {
    const original = window.matchMedia;
    window.matchMedia = (query) => ({ ...original(query), matches: true });
    render(<SelectedWork projects={projects} />);
    const trigger = screen.getByRole("button", { name: "BRIEF Applied AI" });
    const move = new MouseEvent("pointermove", { bubbles: true });
    Object.defineProperty(move, "pointerType", { value: "mouse" });
    fireEvent(trigger, move);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const leave = new MouseEvent("pointerout", { bubbles: true, relatedTarget: document.body });
    Object.defineProperty(leave, "pointerType", { value: "mouse" });
    fireEvent(trigger, leave);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    window.matchMedia = original;
  });

  it("lets touch-style clicks open and close the same project", () => {
    render(<SelectedWork projects={projects} />);
    const trigger = screen.getByRole("button", { name: "BRIEF Applied AI" });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});