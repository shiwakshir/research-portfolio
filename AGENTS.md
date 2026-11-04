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
