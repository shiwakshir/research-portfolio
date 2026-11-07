<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site content lives as markdown/MDX in `src/content/{journal,projects,series}` and is loaded by `src/lib/content.ts` (import.meta.glob raw + yaml + marked); MDX `<EvidenceBlock>` is converted by regex, so new MDX components must be added there. Why: keeps the author's file-based publishing workflow from the original Astro site.
- Drafts (`draft: true`) and non-public series must only be filtered through `getArticles`/`getProjects`/`getPublicSeries`. Why: single gate for what is published.
- Research chapters use `researchStage` frontmatter and shared stage data; stage pages read only `getStageArticles()` from the published-content gate. Why: new posts automatically appear in the right chapter without publishing drafts or mixing unrelated articles.
- The homepage uses the shared ResearchJourney with stage descriptions for its single research section. Why: keeps the current inquiry and journal links together without repeating the roadmap.
- Selected homepage projects share a transient state-controlled disclosure using published project metadata and per-project source URLs; pointer/focus exit closes it, while touch toggles it. Why: every project's details are accessible without leaving desktop rows expanded.
- Journal preview outlines live in `src/content/previews`, load through `src/lib/entry-previews.ts`, and use explicit `/journal/previews/$entry` pages with noindex. They never enter published article gates or feeds and disappear when the matching real slug is published. Why: placeholder pages can be explored without exposing drafts or implying completed research.
- Global typography roles and fixed breakpoint title scales live in `src/styles.css`; shared heading/footer rows use constrained grids and header controls use the design-system Button. Why: preserves consistent editorial hierarchy and reliable small-screen spacing without viewport-scaled text.
- Long-form paragraphs and lists on policy and contact pages use the shared `.prose` reading typography; sans-serif stays for labels and metadata. Why: prevents isolated pages from introducing smaller, inconsistent reading fonts.
