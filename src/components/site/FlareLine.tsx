/** A hand-drawn "symptom diary" line: calm days, a flare, recovery. Draws itself in. */
export function FlareLine() {
  const d = "M0 46 C30 44 50 48 80 45 S130 40 150 44 S185 50 205 42 C222 34 230 8 246 10 C262 12 266 40 282 44 S320 38 350 42 S400 48 430 40 S470 30 500 36 S560 46 600 42";
  return (
    <figure className="flare-figure" aria-label="An illustrative line of how symptoms fluctuate: steady days, a flare, then recovery">
      <svg viewBox="0 0 600 60" preserveAspectRatio="none" className="w-full h-14 overflow-visible" aria-hidden="true">
        <line x1="0" y1="52" x2="600" y2="52" className="flare-baseline" />
        <path d={d} className="flare-path" pathLength={1} />
        <circle cx="246" cy="10" r="3.5" className="flare-peak" />
      </svg>
      <figcaption className="flex justify-between font-sans text-[0.6875rem] italic text-fg-muted">
        <span>steady</span><span>flare</span><span>recovery</span><span>steady?</span>
      </figcaption>
    </figure>
  );
}
