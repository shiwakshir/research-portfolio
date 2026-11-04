import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SearchModal } from "@/components/site/SearchModal";
import { SITE } from "@/config/site";

const THEME_INIT = `(() => {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch {}
  const isDark = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
  if (isDark) document.getElementById('theme-color-meta')?.setAttribute('content', '#151412');
})();`;

function NotFoundComponent() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center space-y-6">
      <p className="font-sans text-xs uppercase tracking-widest text-fg-muted">Status 404</p>
      <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] font-normal text-fg leading-tight">Document not found</h1>
      <p className="summary mx-auto">
        The inquiry, project, or page you requested does not exist or may have been relocated during an editorial revision.
      </p>
      <div className="pt-6 flex flex-wrap items-center justify-center gap-6 font-sans text-sm">
        <Link to="/" className="text-link underline underline-offset-2">Return home →</Link>
        <Link to="/journal" className="text-link underline underline-offset-2">Browse journal</Link>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center space-y-6">
      <h1 className="font-serif text-3xl font-normal text-fg">This page didn't load</h1>
      <p className="summary mx-auto">Something went wrong. You can try again or head back home.</p>
      <div className="flex flex-wrap justify-center gap-6 font-sans text-sm">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="text-link underline underline-offset-2"
        >
          Try again
        </button>
        <a href="/" className="text-link underline underline-offset-2">Go home</a>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: SITE.author.name },
      { name: "theme-color", content: "#FAF7F0", id: "theme-color-meta" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preload", href: "/fonts/source-serif-4-normal-v1.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "alternate", type: "application/rss+xml", title: `${SITE.name} RSS Feed`, href: "/rss.xml" },
    ],
    scripts: [{ children: THEME_INIT }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-fg-body font-serif antialiased transition-colors duration-150">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-link focus:text-paper focus:font-sans focus:font-medium"
      >
        Skip to main content
      </a>
      <SiteHeader onSearch={() => setSearchOpen(true)} />
      <div id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </div>
      <SiteFooter />
      <SearchModal open={searchOpen} onClose={closeSearch} />
    </QueryClientProvider>
  );
}
