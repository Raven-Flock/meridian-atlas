import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PointFigureButton } from "@/components/locate-figure";
import { LinkedText } from "@/components/linked-text";
import { BackLink } from "@/components/pieces";
import { getPoint } from "@/data/catalog";
import { safetyLabel } from "@/data/labels";
import { finding } from "@/data/locate";
import { getRoutine } from "@/data/routines";
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
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [timer, setTimer] = useState({ left: 0, running: false });

  useEffect(() => {
    if (!routine) return;
    setStep(readStep(routine.id, routine.steps.length));
    setTimer({ left: 0, running: false });
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
    requestAnimationFrame(() => {
      document.getElementById("routine-step")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const current = routine.steps[step];
  const point = current ? getPoint(current.pointId) : undefined;
  const place = point ? finding(point) : undefined;
  const total = routine.steps.reduce((sum, item) => sum + item.seconds, 0);

  function startHold() {
    if (!current || current.seconds <= 0) return;
    setTimer({ left: current.seconds, running: true });
  }

  function stopHold() {
    setTimer((currentTimer) => ({ left: currentTimer.left, running: false }));
  }

  return (
    <article>
      <BackLink to="/routines" label="Routines" />
      <p className="mt-2 text-sm text-earth">Acupressure sequence</p>
      <h1 className="font-serif text-4xl">{routine.title}</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">{routine.aim}</p>
      <p className="mt-3 text-sm text-faint">
        About {Math.max(1, Math.round(total / 60))} minutes if you hold each step once. Pressure only. Stop if it hurts.
      </p>

      <div id="routine-step" className="scroll-mt-[72px]">
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-paper">
          Step {ready ? step + 1 : 1} of {routine.steps.length}
          {ready && step > 0 ? <span className="text-muted"> · picked up where you left off</span> : null}
        </p>
        <button type="button" onClick={() => choose(0)} className="min-h-11 shrink-0 rounded-full bg-panel px-3 text-sm text-muted">
          Restart
        </button>
      </div>

      <ol className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {routine.steps.map((item, index) => {
          const linked = getPoint(item.pointId);
          const on = ready && index === step;
          return (
            <li key={`${item.pointId}-${index}`}>
              <button
                type="button"
                onClick={() => choose(index)}
                aria-current={on ? "step" : undefined}
                className={cn(
                  "min-h-11 rounded-full px-3 text-sm",
                  on ? "bg-paper font-semibold text-ink" : "bg-panel text-muted",
                )}
              >
                {index + 1} {linked?.code}
              </button>
            </li>
          );
        })}
      </ol>

      {ready && point && current && place ? (
        <section className="mt-4">
          <PointFigureButton point={point} />
          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="font-serif text-3xl leading-tight">
                {point.code} {point.pinyin}
              </h2>
              <p className="mt-1 text-base text-muted">{point.english}</p>
            </div>
            {point.safety !== "general" ? (
              <p className={cn("text-right text-sm", point.safety === "pregnancy" ? "text-fire" : "text-earth")}>{safetyLabel(point.safety)}</p>
            ) : null}
          </div>
          <p className="mt-3 text-base leading-relaxed text-paper">{point.summary}</p>

          <h3 className="mt-5 font-serif text-2xl">How to find it</h3>
          <p className="mt-2 text-base leading-relaxed text-paper">
            <LinkedText text={place.how} />
          </p>

          <h3 className="mt-5 font-serif text-2xl">This step</h3>
          <p className="mt-2 text-base leading-relaxed text-paper">{current.how}</p>
          <p className="mt-3 font-serif text-4xl tabular-nums">{timer.running || timer.left > 0 ? timer.left : current.seconds}s</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={startHold} className="min-h-12 rounded-2xl bg-paper px-4 text-sm font-semibold text-ink">
              {timer.running ? "Restart hold" : "Start hold"}
            </button>
            <button type="button" onClick={stopHold} className="min-h-12 rounded-2xl bg-panel px-4 text-sm text-paper">
              Pause
            </button>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => choose(step - 1)}
              className="min-h-12 flex-1 rounded-xl bg-panel text-sm disabled:opacity-40"
            >
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

          <details key={step} className="mt-4 rounded-2xl bg-panel px-4 py-3">
            <summary className="min-h-11 cursor-pointer text-sm text-paper">More about this location</summary>
            <p className="mt-3 text-sm leading-relaxed text-paper">
              Quick: <LinkedText text={place.quick} />
            </p>
            {place.alt ? (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Another way: <LinkedText text={place.alt} />
              </p>
            ) : null}
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Chart line: <LinkedText text={point.location} />
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">Nearby: {point.nearby}</p>
            <p className="mt-3 text-sm leading-relaxed text-paper">{point.actions}</p>
            <Link to="/points/$pointId" params={{ pointId: point.id }} className="mt-3 inline-flex min-h-11 items-center text-sm text-earth">
              Open the full point page
            </Link>
          </details>
        </section>
      ) : (
        <p className="mt-6 text-sm text-muted">Opening your place in this routine.</p>
      )}
      </div>
    </article>
  );
}
