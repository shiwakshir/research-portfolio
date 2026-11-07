import type { ResearchStageId } from "@/data/roadmap";

/** Small field-note drawings: evidence, responses, conversation, prototypes, and a new idea. */
export function ResearchGlyph({ stage, className = "" }: { stage: ResearchStageId; className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" className={`research-glyph ${className}`} aria-hidden="true" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {stage === "desk" && <>
        <path className="glyph-soft" d="M30 23h57v60H30z" transform="rotate(8 60 50)" />
        <path className="glyph-ink" d="M23 17h57v63H23zM34 31h29M34 39h34M34 47h23M34 65h13" />
        <path className="glyph-accent glyph-draw" d="m53 56 24-24 7 7-24 24-10 3zM73 36l7 7" />
        <path className="glyph-soft" d="M18 89h78" />
      </>}
      {stage === "survey" && <>
        <path className="glyph-ink" d="M22 18h64v65H22zM34 30h32M34 42h12M34 55h12M34 68h12" />
        <path className="glyph-soft" d="M53 36h24v10H53zM53 49h24v10H53zM53 62h24v10H53z" />
        <path className="glyph-accent glyph-draw" d="m57 41 3 3 6-6m-9 16 3 3 6-6M57 67h12" />
      </>}
      {stage === "interviews" && <>
        <path className="glyph-ink" d="M16 23h61v35H39L26 70V58H16zM29 35h30M29 44h20" />
        <path className="glyph-accent glyph-draw" d="M83 42h17v35H84L73 88V77H51V65M65 55h20M65 64h13" />
      </>}
      {stage === "design" && <>
        <path className="glyph-ink" d="M19 26h47v51H19zM19 37h47M25 31h2m5 0h2M27 46h14v14H27zM47 46h11M47 53h8M27 68h30" />
        <path className="glyph-soft" d="M79 18h25v60H79zM85 27h13M84 64h15M85 69h13" />
        <path className="glyph-accent glyph-draw" d="m68 49 7-4-2 8M65 57l10-12m10-1 3 3 8-9" />
      </>}
      {stage === "product" && <>
        <path className="glyph-soft" d="M26 82h70M36 86h50" />
        <path className="glyph-accent glyph-draw" d="M61 81V51M61 65C40 66 32 49 32 39c17-1 28 9 29 26ZM61 54c0-18 12-28 29-30-1 18-10 29-29 30Z" />
        <path className="glyph-ink" d="m61 64-19-16m20 6 17-17M61 25v-9m-18 13-6-6m48-6 5-5" />
      </>}
    </svg>
  );
}