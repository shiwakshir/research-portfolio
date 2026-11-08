import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DarkModeCallout } from "@/components/site/DarkModeCallout";

const storage: Record<string, string> = {};
const localStorageMock = {
  getItem: (k: string) => storage[k] ?? null,
  setItem: (k: string, v: string) => { storage[k] = v; },
  removeItem: (k: string) => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach((k) => delete storage[k]); },
};
Object.defineProperty(window, "localStorage", { value: localStorageMock, writable: true });

describe("DarkModeCallout", () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    cleanup();
    localStorageMock.clear();
    document.documentElement.classList.remove("dark");
  });

  it("does not render when the site is already in dark mode", () => {
    document.documentElement.classList.add("dark");
    render(<DarkModeCallout />);
    expect(screen.queryByLabelText("Theme recommendation")).toBeNull();
  });

  it("renders when the site is in light mode", () => {
    render(<DarkModeCallout />);
    expect(screen.getByLabelText("Theme recommendation")).toBeInTheDocument();
    expect(screen.getByText(/Best in dark mode/i)).toBeInTheDocument();
  });

  it("switches to dark mode on click and stores preference", async () => {
    render(<DarkModeCallout />);
    const switchBtn = screen.getByTitle("Switch to dark theme");
    await act(async () => {
      fireEvent.click(switchBtn);
      await new Promise((r) => setTimeout(r, 10));
    });
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorageMock.getItem("theme")).toBe("dark");
  });

  it("dismisses cleanly when close button is clicked", async () => {
    render(<DarkModeCallout />);
    const closeBtn = screen.getByLabelText("Dismiss dark mode recommendation");
    await act(async () => {
      fireEvent.click(closeBtn);
      await new Promise((r) => setTimeout(r, 10));
    });
    expect(screen.queryByLabelText("Theme recommendation")).toBeNull();
    expect(localStorageMock.getItem("dark_mode_callout_dismissed")).toBe("true");
  });
});
