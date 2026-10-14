import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { CHANNEL_ROUTES, markFor, type PlateId } from "@/data/locate";
import type { Point } from "@/data/types";

const STROKE = "currentColor";

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label={label} className="h-full w-full text-faint">
      <rect x="1" y="1" width="198" height="238" rx="16" className="fill-ink" stroke="var(--color-line)" />
      {children}
    </svg>
  );
}

function PlateArt({ plate }: { plate: PlateId }) {
  const ink = { fill: "none", stroke: STROKE, strokeWidth: 1.5 };
  if (plate === "face") {
    return (
      <g {...ink}>
        <ellipse cx="100" cy="120" rx="62" ry="78" />
        <path d="M70 108 q12 8 24 0 M106 108 q12 8 24 0" />
        <path d="M100 112 v28" />
        <path d="M86 148 q14 10 28 0" />
        <path d="M78 168 q22 16 44 0" />
        <text x="100" y="28" textAnchor="middle" fontSize="11" className="fill-muted font-sans">
          hairline
        </text>
        <text x="148" y="112" fontSize="11" className="fill-muted font-sans">
          eye
        </text>
      </g>
    );
  }
  if (plate === "side") {
    return (
      <g {...ink}>
        <path d="M46 150 q10 -90 70 -70 q30 8 24 40 q-8 36 -20 48 q-30 20 -74 -18" />
        <path d="M118 96 q18 8 16 28 q-6 16 -22 14" />
        <circle cx="132" cy="108" r="3" className="fill-current" />
        <text x="24" y="36" fontSize="11" className="fill-muted font-sans">
          temple
        </text>
        <text x="150" y="78" fontSize="11" className="fill-muted font-sans">
          ear
        </text>
        <text x="24" y="200" fontSize="11" className="fill-muted font-sans">
          occiput
        </text>
      </g>
    );
  }
  if (plate === "neck") {
    return (
      <g {...ink}>
        <path d="M70 30 h60 l16 170 h-92 z" />
        <path d="M86 70 q20 16 40 -8" />
        <text x="100" y="24" textAnchor="middle" fontSize="11" className="fill-muted font-sans">
          jaw
        </text>
        <text x="18" y="120" fontSize="11" className="fill-muted font-sans">
          muscle
        </text>
      </g>
    );
  }
  if (plate === "chest") {
    return (
      <g {...ink}>
        <path d="M40 28 h120 l18 180 h-156 z" />
        <path d="M48 48 h104 M52 78 h96 M56 108 h88 M60 138 h80" />
        <line x1="100" y1="36" x2="100" y2="200" strokeDasharray="3 3" />
        <text x="104" y="24" fontSize="11" className="fill-muted font-sans">
          midline
        </text>
        <text x="18" y="78" fontSize="11" className="fill-muted font-sans">
          ribs
        </text>
      </g>
    );
  }
  if (plate === "abdomen") {
    return (
      <g {...ink}>
        <path d="M46 20 h108 l14 190 h-136 z" />
        <line x1="100" y1="24" x2="100" y2="200" strokeDasharray="3 3" />
        <circle cx="100" cy="118" r="7" />
        <text x="112" y="122" fontSize="11" className="fill-muted font-sans">
          navel
        </text>
        <text x="18" y="196" fontSize="11" className="fill-muted font-sans">
          pubic bone
        </text>
      </g>
    );
  }
  if (plate === "back") {
    return (
      <g {...ink}>
        <path d="M48 16 h104 l12 200 h-128 z" />
        <line x1="100" y1="20" x2="100" y2="210" />
        {[36, 56, 76, 96, 116, 136, 156, 176].map((y) => (
          <line key={y} x1="92" y1={y} x2="108" y2={y} />
        ))}
        <text x="112" y="34" fontSize="11" className="fill-muted font-sans">
          spine
        </text>
      </g>
    );
  }
  if (plate === "arm") {
    return (
      <g {...ink}>
        <path d="M70 16 h60 l-8 70 -6 78 -8 52 h-24 l-8 -52 -6 -78 z" />
        <path d="M64 86 h72" />
        <path d="M62 168 h64" />
        <text x="18" y="84" fontSize="11" className="fill-muted font-sans">
          elbow crease
        </text>
        <text x="18" y="166" fontSize="11" className="fill-muted font-sans">
          wrist
        </text>
      </g>
    );
  }
  if (plate === "hand" || plate === "palm") {
    return (
      <g {...ink}>
        <path d="M58 16 h84 l8 36 -10 150 q-40 28 -80 0 l-8 -70 16 -28 z" />
        <path d="M62 52 h78" />
        <path d="M78 150 l-16 48 M96 156 l-4 52 M114 156 l6 50 M132 146 l18 42" />
        <text x="18" y="48" fontSize="11" className="fill-muted font-sans">
          wrist crease
        </text>
        <text x="18" y="120" fontSize="11" className="fill-muted font-sans">
          {plate === "palm" ? "palm" : "web / bones"}
        </text>
      </g>
    );
  }
  if (plate === "leg") {
    return (
      <g {...ink}>
        <path d="M78 12 h44 l10 70 6 80 4 58 h-64 l4 -58 6 -80 z" />
        <ellipse cx="100" cy="78" rx="16" ry="10" />
        <path d="M86 96 v90" />
        <text x="122" y="82" fontSize="11" className="fill-muted font-sans">
          kneecap
        </text>
        <text x="18" y="140" fontSize="11" className="fill-muted font-sans">
          shin edge
        </text>
        <text x="18" y="210" fontSize="11" className="fill-muted font-sans">
          ankle
        </text>
      </g>
    );
  }
  if (plate === "sole") {
    return (
      <g {...ink}>
        <path d="M70 30 q30 -20 60 10 l16 150 q-10 30 -46 28 q-40 -8 -36 -40 z" />
        <text x="100" y="24" textAnchor="middle" fontSize="11" className="fill-muted font-sans">
          toes
        </text>
        <text x="100" y="220" textAnchor="middle" fontSize="11" className="fill-muted font-sans">
          heel
        </text>
      </g>
    );
  }
  return (
    <g {...ink}>
      <path d="M40 36 h120 l20 70 -30 110 h-100 z" />
      <path d="M70 150 l10 60 M100 154 l4 58 M128 148 l14 52" />
      <text x="18" y="32" fontSize="11" className="fill-muted font-sans">
        ankle bones
      </text>
      <text x="18" y="130" fontSize="11" className="fill-muted font-sans">
        metatarsals
      </text>
    </g>
  );
}

export function PointFigure({ point, large = false }: { point: Point; large?: boolean }) {
  const mark = markFor(point);
  const x = (mark.x / 100) * 200;
  const y = 16 + (mark.y / 100) * 200;
  return (
    <div className={large ? "w-full" : "w-full"}>
      <Frame label={`${point.code} schematic on the ${mark.plate}. ${mark.tip}`}>
        <PlateArt plate={mark.plate} />
        <line x1={x} y1={y - 18} x2={x} y2={y - 7} stroke="var(--color-earth)" strokeWidth="1.25" />
        <circle cx={x} cy={y} r={large ? 7 : 6} fill="var(--color-earth)" />
        <text x={x} y={y - 22} textAnchor="middle" fontSize="12" className="fill-paper font-sans">
          {point.code}
        </text>
      </Frame>
      <p className="mt-2 text-sm leading-relaxed text-muted">{mark.tip}</p>
    </div>
  );
}

export function PointFigureButton({ point }: { point: Point }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="block w-full rounded-2xl text-left" aria-label={`Enlarge the ${point.code} drawing`}>
        <PointFigure point={point} />
        <span className="mt-1 block text-xs tracking-wide text-earth uppercase">Tap to enlarge</span>
      </button>
      {open ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/80 p-4 sm:items-center" role="dialog" aria-modal="true" aria-label={`${point.code} location drawing`}>
          <div className="max-h-[90vh] w-full max-w-md overflow-auto rounded-3xl bg-ink p-4 shadow-card">
            <PointFigure point={point} large />
            <button type="button" className="mt-3 flex min-h-12 w-full items-center justify-center rounded-2xl bg-paper text-base font-semibold text-ink" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function pointAlong(route: Array<[number, number]>, t: number): [number, number] {
  if (route.length === 1) return route[0];
  const lengths: number[] = [];
  let total = 0;
  for (let index = 1; index < route.length; index += 1) {
    const [x1, y1] = route[index - 1];
    const [x2, y2] = route[index];
    const span = Math.hypot(x2 - x1, y2 - y1);
    lengths.push(span);
    total += span;
  }
  let remain = total * t;
  for (let index = 1; index < route.length; index += 1) {
    const span = lengths[index - 1] ?? 0;
    const [x1, y1] = route[index - 1];
    const [x2, y2] = route[index];
    if (remain <= span || index === route.length - 1) {
      const ratio = span === 0 ? 0 : remain / span;
      return [x1 + (x2 - x1) * ratio, y1 + (y2 - y1) * ratio];
    }
    remain -= span;
  }
  return route[route.length - 1];
}

function BodyOutline() {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.4">
      <circle cx="100" cy="28" r="16" />
      <path d="M92 44 h16 l6 18 h-28 z" />
      <path d="M70 64 h60 l10 62 -16 28 h-48 l-16 -28 z" />
      <path d="M70 78 l-28 36 8 10 22 -28" />
      <path d="M130 78 l28 36 -8 10 -22 -28" />
      <path d="M84 154 l-6 78" />
      <path d="M116 154 l6 78" />
    </g>
  );
}

export function ChannelMap({ channelId, points }: { channelId: string; points: Point[] }) {
  const route = CHANNEL_ROUTES[channelId];
  if (!route || points.length === 0) return null;
  const path = route.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  const ordered = [...points].sort((a, b) => a.order - b.order);
  return (
    <div className="rounded-2xl bg-panel p-3 shadow-card">
      <div className="relative mx-auto w-full max-w-xs">
        <svg viewBox="0 0 200 280" role="img" aria-label="Schematic pathway. Dots follow classical order." className="w-full text-faint">
          <BodyOutline />
          <path d={path} fill="none" stroke="var(--color-earth)" strokeWidth="1.6" />
          {ordered.map((point, index) => {
            const t = ordered.length === 1 ? 0.5 : index / (ordered.length - 1);
            const [x, y] = pointAlong(route, t);
            return <circle key={point.id} cx={x} cy={y} r="3.5" fill="var(--color-earth)" />;
          })}
        </svg>
        {ordered.map((point, index) => {
          const t = ordered.length === 1 ? 0.5 : index / (ordered.length - 1);
          const [x, y] = pointAlong(route, t);
          return (
            <Link
              key={point.id}
              to="/points/$pointId"
              params={{ pointId: point.id }}
              aria-label={point.code}
              className="absolute flex min-h-8 min-w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ left: `${(x / 200) * 100}%`, top: `${(y / 280) * 100}%` }}
            >
              {ordered.length <= 24 ? <span className="text-[10px] text-paper">{point.code.replace(/^[A-Z]+/, "")}</span> : null}
            </Link>
          );
        })}
      </div>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        Pathway in classical order. The drawing is a map, not a measuring tool. Tap a dot, then use the finding steps.
      </p>
    </div>
  );
}
