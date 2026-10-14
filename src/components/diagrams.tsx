import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { emptyPointFilters } from "@/data/catalog";
import { ELEMENT_TEXT, GENERATING, REGIONS } from "@/data/labels";
import type { ElementId, RegionId } from "@/data/types";
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

type Side = "front" | "back";

type Zone = { id: RegionId; side: Side; points: string };

/** Percent boxes over menu-front.jpg and menu-back.jpg. Later zones sit on top. */
const ZONES: Zone[] = [
  { id: "hip-leg", side: "front", points: "37,49 50,50 47,84 38,84" },
  { id: "hip-leg", side: "front", points: "50,50 63,49 62,84 53,84" },
  { id: "foot", side: "front", points: "36,83 48,83 46,95 35,95" },
  { id: "foot", side: "front", points: "52,83 64,83 63,95 53,95" },
  { id: "shoulder-arm", side: "front", points: "32,21 40,22 37,46 31,47" },
  { id: "shoulder-arm", side: "front", points: "60,22 68,21 69,47 63,45" },
  { id: "hand", side: "front", points: "29,45 38,45 36,58 28,58" },
  { id: "hand", side: "front", points: "62,45 71,45 72,58 63,58" },
  { id: "abdomen", side: "front", points: "40,35 60,35 58,50 42,50" },
  { id: "chest", side: "front", points: "40,20 60,20 61,35 39,35" },
  { id: "neck", side: "front", points: "45,15 55,15 54,21 46,21" },
  { id: "head-face", side: "front", points: "42,6 58,6 59,16 41,16" },
  { id: "ear", side: "front", points: "40,10 45,10 45,16 40,16" },
  { id: "ear", side: "front", points: "55,10 60,10 60,16 55,16" },
  { id: "hip-leg", side: "back", points: "37,49 50,50 48,84 38,84" },
  { id: "hip-leg", side: "back", points: "50,50 63,49 62,84 52,84" },
  { id: "foot", side: "back", points: "36,83 48,83 46,95 35,95" },
  { id: "foot", side: "back", points: "52,83 65,83 64,95 53,95" },
  { id: "shoulder-arm", side: "back", points: "32,21 40,22 37,46 31,47" },
  { id: "shoulder-arm", side: "back", points: "60,22 68,21 69,47 63,45" },
  { id: "hand", side: "back", points: "29,45 38,45 36,58 28,58" },
  { id: "hand", side: "back", points: "62,45 71,45 72,58 63,58" },
  { id: "back", side: "back", points: "39,20 61,20 60,50 40,50" },
  { id: "neck", side: "back", points: "45,15 55,15 54,21 46,21" },
  { id: "head-face", side: "back", points: "42,5 58,5 58,16 42,16" },
];

function clip(points: string) {
  const pairs = points.split(" ").map((pair) => {
    const [x, y] = pair.split(",");
    return `${x}% ${y}%`;
  });
  return `polygon(${pairs.join(", ")})`;
}

/** Map percent points into a 100×150 viewBox so the blur stays round on a 2:3 photo. */
function glowPoints(points: string) {
  return points
    .split(" ")
    .map((pair) => {
      const [x, y] = pair.split(",");
      return `${x},${(Number(y) * 1.5).toFixed(2)}`;
    })
    .join(" ");
}

export function BodyRegions({ active }: { active?: string }) {
  const [side, setSide] = useState<Side>(active === "back" ? "back" : "front");
  const [hot, setHot] = useState<RegionId | null>(null);
  const shown = hot ?? (active as RegionId | undefined) ?? null;
  const region = REGIONS.find((item) => item.id === shown);
  const visible = ZONES.filter((zone) => zone.side === side);

  return (
    <div>
      <div className="mb-3 flex gap-2" role="group" aria-label="Which side of the figure">
        {(["front", "back"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={side === value}
            onClick={() => {
              setSide(value);
              setHot(null);
            }}
            className={cn(
              "min-h-11 rounded-full px-4 text-sm",
              side === value ? "bg-paper font-semibold text-ink" : "bg-panel text-muted shadow-card",
            )}
          >
            {value === "front" ? "Front" : "Back"}
          </button>
        ))}
      </div>
      <div className="relative mx-auto w-full max-w-sm" role="group" aria-label={side === "front" ? "Front of the body" : "Back of the body"}>
        <img
          src={`${import.meta.env.BASE_URL}atlas/menu-${side}.jpg`}
          alt=""
          className="pointer-events-none w-full rounded-2xl shadow-card"
        />
        <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <filter id="region-glow" x="-80%" y="-80%" width="260%" height="260%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="1.1" result="tight" />
              <feGaussianBlur stdDeviation="3.2" result="wide" />
              <feMerge>
                <feMergeNode in="wide" />
                <feMergeNode in="tight" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {visible.map((zone, index) =>
            shown === zone.id ? (
              <polygon
                key={`glow-${zone.side}-${zone.id}-${index}`}
                points={glowPoints(zone.points)}
                fill="rgba(255, 228, 186, 0.28)"
                stroke="#fff1d4"
                strokeWidth="1.35"
                strokeLinejoin="round"
                filter="url(#region-glow)"
              />
            ) : null,
          )}
        </svg>
        {visible.map((zone, index) => {
          const lit = shown === zone.id;
          const label = REGIONS.find((item) => item.id === zone.id)?.label ?? zone.id;
          return (
            <Link
              key={`${zone.side}-${zone.id}-${index}`}
              to="/points"
              search={{ ...emptyPointFilters, region: zone.id }}
              aria-label={label}
              onPointerEnter={() => setHot(zone.id)}
              onPointerDown={() => setHot(zone.id)}
              onPointerLeave={() => setHot((current) => (current === zone.id ? null : current))}
              onFocus={() => setHot(zone.id)}
              onBlur={() => setHot((current) => (current === zone.id ? null : current))}
              className="absolute inset-0"
              style={{
                clipPath: clip(zone.points),
                background: lit ? "rgba(255, 220, 170, 0.28)" : "transparent",
                mixBlendMode: lit ? "screen" : "normal",
                WebkitTapHighlightColor: "transparent",
              }}
            />
          );
        })}
      </div>
      <p className="mt-3 min-h-11 text-sm leading-relaxed text-muted" aria-live="polite">
        {region ? (
          <>
            <span className="text-paper">{region.label}.</span> {region.hint}
          </>
        ) : (
          "Press a region. It glows, then opens those points. Back shows the spine and the shoulder blades."
        )}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {REGIONS.map((item) => {
          const on = active === item.id || hot === item.id;
          return (
            <Link
              key={item.id}
              to="/points"
              search={{ ...emptyPointFilters, region: item.id }}
              aria-current={active === item.id ? "page" : undefined}
              onPointerEnter={() => setHot(item.id)}
              onPointerLeave={() => setHot((current) => (current === item.id ? null : current))}
              onFocus={() => setHot(item.id)}
              onBlur={() => setHot((current) => (current === item.id ? null : current))}
              className={cn(
                "flex min-h-14 flex-col justify-center rounded-2xl px-3 py-2 shadow-card",
                on ? "bg-paper text-ink" : "bg-panel text-paper",
              )}
            >
              <span className="text-base">{item.label}</span>
              <span className={cn("text-sm", on ? "text-ink/70" : "text-muted")}>{item.hint}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
