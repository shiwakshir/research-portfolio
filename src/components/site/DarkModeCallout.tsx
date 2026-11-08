import { useEffect, useState } from "react";

export function DarkModeCallout() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setMounted(true);
    const checkDark = () => document.documentElement.classList.contains("dark");
    setIsDark(checkDark());

    let wasDismissed = false;
    try {
      wasDismissed = localStorage.getItem("dark_mode_callout_dismissed") === "true";
    } catch {}
    setDismissed(wasDismissed);

    const observer = new MutationObserver(() => {
      setIsDark(checkDark());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  if (!mounted || isDark || dismissed) return null;

  const switchToDark = () => {
    document.documentElement.classList.add("dark");
    try {
      localStorage.setItem("theme", "dark");
    } catch {}
    document.getElementById("theme-color-meta")?.setAttribute("content", "#151412");
    setIsDark(true);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    try {
      localStorage.setItem("dark_mode_callout_dismissed", "true");
    } catch {}
  };

  return (
    <aside
      aria-label="Theme recommendation"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-xs animate-rise"
    >
      <div className="group flex items-center gap-2.5 rounded-full border border-rule bg-paper/95 pl-3 pr-2 py-1.5 sm:py-2 shadow-plate backdrop-blur-md transition-all hover:border-accent/40">
        <button
          type="button"
          onClick={switchToDark}
          className="flex items-center gap-2 text-left font-sans text-xs text-fg hover:text-accent transition-colors"
          title="Switch to dark theme"
        >
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15" aria-hidden="true">
            <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </span>
          <span className="font-medium leading-none">
            Best in dark mode <span className="text-accent underline decoration-accent/40 underline-offset-2 ml-1">Switch ↗</span>
          </span>
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss dark mode recommendation"
          title="Dismiss"
          className="flex size-5 shrink-0 items-center justify-center rounded-full text-fg-muted hover:text-fg hover:bg-rule/40 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
