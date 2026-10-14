import { Link } from "@tanstack/react-router";
import { emptyPointFilters } from "@/data/catalog";
import { ELEMENT_TEXT, GENERATING, REGIONS } from "@/data/labels";
import type { ElementId } from "@/data/types";
import { cn } from "@/lib/cn";

const POSITIONS: Record<ElementId, { x: number; y: number }> = {
  wood: { x: 120, y: 36 },
  fire: { x: 198, y: 92 },
  earth: { x: 168, y: 176 },
  metal: { x: 72, y: 176 },
  water: { x: 42, y: 92 },
};

export function ElementCycle({ highlight }: { highlight?: ElementId | null }) {
  const generating = GENERATING.map((id) => POSITIONS[id]);
  const genPath = generating.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ") + " Z";
  return (
    <svg viewBox="0 0 240 220" className="mx-auto w-full max-w-xs text-faint" role="img" aria-label="Five element cycle. Solid line generates. Dashed lines control.">
      <path d={genPath} fill="none" stroke="currentColor" strokeWidth="1.25" />
      <line x1="120" y1="36" x2="168" y2="176" stroke="var(--color-line)" strokeDasharray="3 3" />
      <line x1="198" y1="92" x2="72" y2="176" stroke="var(--color-line)" strokeDasharray="3 3" />
      <line x1="168" y1="176" x2="42" y2="92" stroke="var(--color-line)" strokeDasharray="3 3" />
      <line x1="72" y1="176" x2="120" y2="36" stroke="var(--color-line)" strokeDasharray="3 3" />
      <line x1="42" y1="92" x2="198" y2="92" stroke="var(--color-line)" strokeDasharray="3 3" />
      {(Object.keys(POSITIONS) as ElementId[]).map((id) => {
        const point = POSITIONS[id];
        const on = highlight === id;
        return (
          <g key={id}>
            <circle cx={point.x} cy={point.y} r={on ? 16 : 13} className={on ? "fill-panel" : "fill-ink"} stroke="currentColor" />
            <text x={point.x} y={point.y + 4} textAnchor="middle" fontSize="11" className={cn("fill-current font-sans", ELEMENT_TEXT[id])}>
              {id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function BodyRegions({ active }: { active?: string }) {
  return (
    <div>
      <img
        src={`${import.meta.env.BASE_URL}atlas/body-front.jpg`}
        alt="Clothed standing figure. Region buttons are below."
        className="mx-auto w-full max-w-xs rounded-2xl shadow-card"
      />
      <div className="mt-4 grid grid-cols-2 gap-2">
        {REGIONS.map((region) => {
          const on = active === region.id;
          return (
            <Link
              key={region.id}
              to="/points"
              search={{ ...emptyPointFilters, region: region.id }}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex min-h-14 flex-col justify-center rounded-2xl px-3 py-2 shadow-card",
                on ? "bg-paper text-ink" : "bg-panel text-paper",
              )}
            >
              <span className="text-base">{region.label}</span>
              <span className={cn("text-sm", on ? "text-ink/70" : "text-muted")}>{region.hint}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
