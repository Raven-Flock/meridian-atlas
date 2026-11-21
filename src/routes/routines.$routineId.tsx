import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PointFigureButton } from "@/components/locate-figure";
import { LinkedText } from "@/components/linked-text";
import { BackLink } from "@/components/pieces";
import { getPoint } from "@/data/catalog";
import { safetyLabel } from "@/data/labels";
import { finding } from "@/data/locate";
import { ROUTINE_DISCLAIMER, getRoutine, routineMinutes, tagLabel } from "@/data/routines";
import { cn } from "@/lib/cn";

const STEP_KEY = "atlas-routine-step";

function readStep(id: string, count: number) {
  if (typeof localStorage === "undefined") return 0;
  try {
    const all = JSON.parse(localStorage.getItem(STEP_KEY) || "{}") as Record<string, unknown>;
    const saved = all[id];
    if (typeof saved !== "number" || !Number.isInteger(saved) || saved < 0 || saved >= count) return 0;
    return saved;
  } catch {
    return 0;
  }
}

function writeStep(id: string, step: number) {
  try {
    const all = JSON.parse(localStorage.getItem(STEP_KEY) || "{}") as Record<string, number>;
    all[id] = step;
    localStorage.setItem(STEP_KEY, JSON.stringify(all));
  } catch {
    /* Private browsing can block storage. The step still works for this visit. */
  }
}

export const Route = createFileRoute("/routines/$routineId")({
  component: RoutinePage,
});

function RoutinePage() {
  const { routineId } = Route.useParams();
  const routine = getRoutine(routineId);
  const [guided, setGuided] = useState(false);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [timer, setTimer] = useState({ left: 0, running: false });

  useEffect(() => {
    if (!routine) return;
    setStep(readStep(routine.id, routine.steps.length));
    setTimer({ left: 0, running: false });
    setGuided(false);
    setReady(true);
  }, [routine]);

  useEffect(() => {
    if (!timer.running || timer.left <= 0) return;
    const id = window.setTimeout(() => {
      setTimer((current) => {
        if (!current.running) return current;
        const left = current.left - 1;
        return { left, running: left > 0 };
      });
    }, 1000);
    return () => window.clearTimeout(id);
  }, [timer]);

  if (!routine) {
    return (
      <main>
        <BackLink to="/routines" label="Routines" />
        <h1 className="mt-2 font-serif text-4xl">That routine is not listed</h1>
      </main>
    );
  }

  function choose(index: number) {
    const next = Math.max(0, Math.min(routine!.steps.length - 1, index));
    setStep(next);
    setTimer({ left: 0, running: false });
    writeStep(routine!.id, next);
  }

  const current = routine.steps[step];
  const point = current ? getPoint(current.pointId) : undefined;
  const place = point ? finding(point) : undefined;

  function startHold() {
    if (!current || current.seconds <= 0) return;
    setTimer({ left: current.seconds, running: true });
  }

  return (
    <article>
      <BackLink to="/routines" label="Routines" />
      <p className="mt-2 text-sm text-earth">Acupressure sequence</p>
      <h1 className="font-serif text-4xl leading-tight">{routine.title}</h1>
      <p className="mt-2 text-base leading-relaxed text-paper">{routine.aim}</p>
      <p className="mt-3 rounded-2xl bg-panel px-4 py-3 text-sm leading-relaxed text-paper shadow-card">{ROUTINE_DISCLAIMER}</p>
      <p className="mt-3 text-sm text-faint">
        About {routineMinutes(routine)} min · {routine.steps.length} points · fingers only, no needles
      </p>
      <p className="mt-2 flex flex-wrap gap-1.5">
        {routine.tags.map((item) => (
          <span key={item} className="rounded-full bg-panel px-2 py-0.5 text-xs text-earth">
            {tagLabel(item)}
          </span>
        ))}
      </p>

      <h2 className="mt-8 font-serif text-2xl">The sequence</h2>
      <ol className="mt-3 grid gap-3">
        {routine.steps.map((item, index) => {
          const linked = getPoint(item.pointId);
          const spot = linked ? finding(linked) : undefined;
          if (!linked || !spot) return null;
          return (
            <li key={`${item.pointId}-${index}`} className="rounded-2xl bg-panel px-4 py-4 shadow-card">
              <p className="text-xs tracking-wide text-earth uppercase">Step {index + 1}</p>
              <h3 className="mt-1 font-serif text-2xl leading-tight">
                {linked.code} {linked.pinyin}
              </h3>
              <p className="mt-1 text-sm text-muted">{linked.english}</p>
              <p className="mt-3 text-sm leading-relaxed text-paper">{spot.quick}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.how}</p>
              <p className="mt-2 text-sm leading-relaxed text-faint">{item.tradition}</p>
              {linked.safety !== "general" ? (
                <p className={cn("mt-2 text-sm", linked.safety === "pregnancy" ? "text-fire" : "text-earth")}>{safetyLabel(linked.safety)}</p>
              ) : null}
              <Link to="/points/$pointId" params={{ pointId: linked.id }} className="mt-3 inline-flex min-h-11 items-center text-sm text-earth">
                Open {linked.code} in the atlas
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-6">
        <button
          type="button"
          className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-paper px-4 text-base font-semibold text-ink"
          aria-expanded={guided}
          onClick={() => setGuided((open) => !open)}
        >
          {guided ? "Hide guided sequence" : "Start guided sequence"}
        </button>
      </div>

      {guided && ready && point && current && place ? (
        <section id="routine-step" className="mt-4 scroll-mt-[72px]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-paper">
              Step {step + 1} of {routine.steps.length}
            </p>
            <button type="button" onClick={() => choose(0)} className="min-h-11 shrink-0 rounded-full bg-panel px-3 text-sm text-muted">
              Restart
            </button>
          </div>
          <ol className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
            {routine.steps.map((item, index) => {
              const linked = getPoint(item.pointId);
              const on = index === step;
              return (
                <li key={`${item.pointId}-guide-${index}`}>
                  <button
                    type="button"
                    onClick={() => choose(index)}
                    aria-current={on ? "step" : undefined}
                    className={cn("min-h-11 rounded-full px-3 text-sm", on ? "bg-paper font-semibold text-ink" : "bg-panel text-muted")}
                  >
                    {index + 1} {linked?.code}
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="mt-4">
            <PointFigureButton point={point} />
          </div>
          <h2 className="mt-4 font-serif text-3xl leading-tight">
            {point.code} {point.pinyin}
          </h2>
          <p className="mt-1 text-base text-muted">{point.english}</p>
          <p className="mt-3 text-base leading-relaxed text-paper">
            <LinkedText text={place.quick} />
          </p>
          <p className="mt-3 text-base leading-relaxed text-paper">{current.how}</p>
          <p className="mt-2 text-sm leading-relaxed text-faint">{current.tradition}</p>
          <p className="mt-3 font-serif text-4xl tabular-nums">{timer.running || timer.left > 0 ? timer.left : current.seconds}s</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={startHold} className="min-h-12 rounded-2xl bg-paper px-4 text-sm font-semibold text-ink">
              {timer.running ? "Restart hold" : "Start hold"}
            </button>
            <button type="button" onClick={() => setTimer((currentTimer) => ({ left: currentTimer.left, running: false }))} className="min-h-12 rounded-2xl bg-panel px-4 text-sm text-paper">
              Pause
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" disabled={step === 0} onClick={() => choose(step - 1)} className="min-h-12 flex-1 rounded-xl bg-panel text-sm disabled:opacity-40">
              Previous
            </button>
            <button
              type="button"
              disabled={step === routine.steps.length - 1}
              onClick={() => choose(step + 1)}
              className="min-h-12 flex-1 rounded-xl bg-paper text-sm font-semibold text-ink disabled:opacity-40"
            >
              Next
            </button>
          </div>
          <Link to="/points/$pointId" params={{ pointId: point.id }} className="mt-4 inline-flex min-h-11 items-center text-sm text-earth">
            Open the full point page
          </Link>
        </section>
      ) : null}
    </article>
  );
}
