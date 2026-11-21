import type { KeyboardEvent } from "react";
import {
  shapeCenter,
  type ReflexSide,
  type ReflexView,
  type ReflexZone,
  type ZoneShape,
} from "@/data/reflexology";
import { cn } from "@/lib/cn";

const VIEWBOX = {
  foot: { w: 240, h: 440 },
  hand: { w: 240, h: 400 },
} as const;

export function ReflexMap({
  view,
  side,
  zones,
  selectedId,
  studied,
  dimmed,
  onSelect,
}: {
  view: ReflexView;
  side: ReflexSide;
  zones: ReflexZone[];
  selectedId: string | null;
  studied: ReadonlySet<string>;
  dimmed: ReadonlySet<string>;
  onSelect: (id: string) => void;
}) {
  const box = VIEWBOX[view];
  const mirrored = side === "left";
  const label =
    view === "foot"
      ? `${side === "left" ? "Left" : "Right"} foot, sole facing you. Zones are educational reflexes.`
      : `${side === "left" ? "Left" : "Right"} hand, palm facing you. Zones are educational reflexes.`;

  return (
    <svg viewBox={`0 0 ${box.w} ${box.h}`} className="mx-auto w-full max-w-xs text-paper" role="group" aria-label={label}>
      <g transform={mirrored ? `translate(${box.w} 0) scale(-1 1)` : undefined}>
        {view === "foot" ? <FootPlate /> : <HandPlate />}
        {zones.map((zone) => (
          <ZoneShapeButton
            key={zone.id}
            zone={zone}
            selected={zone.id === selectedId}
            dimmed={dimmed.has(zone.id)}
            studied={studied.has(zone.id)}
            onSelect={onSelect}
          />
        ))}
      </g>
    </svg>
  );
}

function FootPlate() {
  return (
    <g className="fill-panel stroke-earth/50" strokeWidth="1.6" pointerEvents="none">
      <path d="M104 156 C68 160 42 192 40 236 C38 292 52 352 80 388 C102 414 140 424 170 416 C204 406 224 364 222 312 C220 252 204 196 174 168 C152 150 128 150 104 156 Z" />
      <ellipse cx="202" cy="150" rx="12" ry="22" />
      <ellipse cx="178" cy="136" rx="13" ry="26" />
      <ellipse cx="150" cy="128" rx="14" ry="28" />
      <ellipse cx="118" cy="132" rx="15" ry="30" />
      <ellipse cx="74" cy="136" rx="30" ry="40" />
    </g>
  );
}

function HandPlate() {
  return (
    <g className="fill-panel stroke-earth/50" strokeWidth="1.6" pointerEvents="none">
      <path d="M96 168 C72 180 56 214 58 260 C60 310 88 352 132 360 C180 368 216 334 218 280 C220 220 200 176 168 164 C146 156 118 158 96 168 Z" />
      <ellipse cx="194" cy="132" rx="12" ry="34" />
      <ellipse cx="170" cy="118" rx="13" ry="42" />
      <ellipse cx="144" cy="108" rx="15" ry="50" />
      <ellipse cx="116" cy="118" rx="14" ry="44" />
      <ellipse cx="58" cy="214" rx="26" ry="38" />
    </g>
  );
}

function ZoneShapeButton({
  zone,
  selected,
  dimmed,
  studied,
  onSelect,
}: {
  zone: ReflexZone;
  selected: boolean;
  dimmed: boolean;
  studied: boolean;
  onSelect: (id: string) => void;
}) {
  const className = cn(
    "stroke-[1.35]",
    selected ? "fill-earth stroke-paper stroke-2" : dimmed ? "fill-transparent stroke-paper/25" : "fill-earth/15 stroke-earth",
  );
  const center = shapeCenter(zone.shape);
  const label = `${zone.name}. ${zone.organs.join(", ")}.${studied ? " Marked studied." : ""}`;

  function onKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(zone.id);
    }
  }

  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={label}
      className="cursor-pointer outline-none"
      onClick={() => onSelect(zone.id)}
      onKeyDown={onKeyDown}
    >
      <ShapeFigure shape={zone.shape} className={className} />
      {studied ? <circle cx={center.x} cy={center.y} r="3.5" className="fill-paper" pointerEvents="none" /> : null}
    </g>
  );
}

function ShapeFigure({ shape, className }: { shape: ZoneShape; className: string }) {
  if (shape.type === "ellipse") {
    return <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} className={className} />;
  }
  if (shape.type === "roundrect") {
    return <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} rx={shape.rx} className={className} />;
  }
  if (shape.type === "path") {
    return <path d={shape.d} className={className} fillRule="evenodd" />;
  }
  return (
    <g>
      {shape.shapes.map((child, index) => (
        <ShapeFigure key={index} shape={child} className={className} />
      ))}
    </g>
  );
}
