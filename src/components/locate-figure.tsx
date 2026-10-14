import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { pathwayFor, photoMark, type AtlasGuide, type AtlasLabel } from "@/data/photo-atlas";
import type { Point } from "@/data/types";

function atlasSrc(plate: string) {
  return `${import.meta.env.BASE_URL}atlas/${plate}.jpg`;
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

function LabelChip({ label }: { label: AtlasLabel }) {
  const shift = label.x > 68 ? "-translate-x-full" : label.x < 28 ? "" : "-translate-x-1/2";
  return (
    <span
      className={`pointer-events-none absolute z-10 max-w-[46%] rounded bg-ink/80 px-1.5 py-0.5 text-[11px] leading-tight text-paper ${shift}`}
      style={{ left: `${label.x}%`, top: `${label.y}%` }}
    >
      {label.text}
    </span>
  );
}

function Guide({ guide }: { guide: AtlasGuide }) {
  const midX = (guide.x1 + guide.x2) / 2;
  const midY = (guide.y1 + guide.y2) / 2;
  return (
    <>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1={guide.x1} y1={guide.y1} x2={guide.x2} y2={guide.y2} stroke="#c4a15a" strokeWidth="0.6" strokeDasharray="1.4 0.9" />
      </svg>
      <span
        className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded bg-earth px-1 py-0.5 text-[10px] font-semibold text-ink"
        style={{ left: `${midX + 8}%`, top: `${midY}%` }}
      >
        {guide.text}
      </span>
    </>
  );
}

export function PointFigure({ point, large = false }: { point: Point; large?: boolean }) {
  const mark = photoMark(point);
  if (mark.hidden) {
    return <p className="rounded-2xl bg-panel p-4 text-sm leading-relaxed text-muted shadow-card">{mark.hidden}</p>;
  }
  const labelBelow = mark.y < 14;
  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-ink shadow-card">
        <img
          src={atlasSrc(mark.plate)}
          alt={`${point.code} on the ${mark.plate.replace("-", " ")}. ${mark.note}`}
          className="block w-full"
        />
        {mark.guide ? <Guide guide={mark.guide} /> : null}
        {mark.labels.map((label) => (
          <LabelChip key={label.text} label={label} />
        ))}
        <div className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: `${mark.x}%`, top: `${mark.y}%` }}>
          <span
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink/85 px-1.5 py-0.5 text-[11px] font-semibold text-paper ${labelBelow ? "top-full mt-1" : "bottom-full mb-1"}`}
          >
            {point.code}
          </span>
          <span className={`block rounded-full border-2 border-paper bg-earth shadow ${large ? "size-5" : "size-4"}`} />
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{mark.note}</p>
    </div>
  );
}

export function PointFigureButton({ point }: { point: Point }) {
  const [open, setOpen] = useState(false);
  const mark = photoMark(point);
  if (mark.hidden) return <PointFigure point={point} />;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="block w-full rounded-2xl text-left" aria-label={`Enlarge the ${point.code} photo`}>
        <PointFigure point={point} />
        <span className="mt-1 block text-xs tracking-wide text-earth uppercase">Tap to enlarge</span>
      </button>
      {open ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/80 p-4 sm:items-center" role="dialog" aria-modal="true" aria-label={`${point.code} location photo`}>
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

export function ChannelMap({ channelId, points }: { channelId: string; points: Point[] }) {
  const path = pathwayFor(channelId);
  if (!path || points.length === 0) return null;
  const ordered = [...points].sort((a, b) => a.order - b.order);
  const d = path.route.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  return (
    <div className="rounded-2xl bg-panel p-3 shadow-card">
      <div className="relative mx-auto w-full max-w-xs">
        <img src={atlasSrc(path.plate)} alt="" className="block w-full rounded-2xl" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={d} fill="none" stroke="#c4a15a" strokeWidth="0.8" />
        </svg>
        {ordered.map((point, index) => {
          const t = ordered.length === 1 ? 0.5 : index / (ordered.length - 1);
          const [x, y] = pointAlong(path.route, t);
          return (
            <Link
              key={point.id}
              to="/points/$pointId"
              params={{ pointId: point.id }}
              aria-label={point.code}
              className="absolute z-10 flex min-h-8 min-w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="block size-2.5 rounded-full border border-paper bg-earth" />
              {ordered.length <= 24 ? (
                <span className="absolute top-full text-[10px] leading-none text-paper">{point.code.replace(/^[A-Za-z]+/, "")}</span>
              ) : null}
            </Link>
          );
        })}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{path.note}</p>
    </div>
  );
}
