import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SearchField } from "@/components/pieces";
import { getPoint } from "@/data/catalog";
import { ROUTINE_DISCLAIMER, ROUTINE_TAGS, ROUTINES, routineMinutes, tagLabel } from "@/data/routines";
import type { RoutineTag } from "@/data/types";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/routines/")({
  component: RoutinesPage,
});

function RoutinesPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<RoutineTag | null>(null);
  const needle = query.trim().toLowerCase();

  const list = useMemo(
    () =>
      ROUTINES.filter((routine) => {
        if (tag && !routine.tags.includes(tag)) return false;
        if (!needle) return true;
        const codes = routine.steps.map((step) => getPoint(step.pointId)?.code ?? "").join(" ");
        const hay = [routine.title, routine.focus, routine.aim, codes, ...routine.tags.map(tagLabel)].join(" ").toLowerCase();
        return hay.includes(needle);
      }),
    [needle, tag],
  );

  return (
    <main>
      <p className="text-sm text-earth">Gentle pressure only</p>
      <h1 className="mt-1 font-serif text-4xl leading-tight">Acupressure Routines</h1>
      <p className="mt-3 rounded-2xl bg-panel px-4 py-3 text-sm leading-relaxed text-paper shadow-card">{ROUTINE_DISCLAIMER}</p>
      <p className="mt-3 text-base leading-relaxed text-muted">
        Short sequences for learning. Each step is a point you can open in the atlas. Nothing here is a prescription.
      </p>

      <div className="mt-4">
        <SearchField value={query} onChange={setQuery} placeholder="Search sleep, digestion, LI4…" />
      </div>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by focus">
        <Chip on={tag == null} onClick={() => setTag(null)}>
          All
        </Chip>
        {ROUTINE_TAGS.map((item) => (
          <Chip key={item.id} on={tag === item.id} onClick={() => setTag((current) => (current === item.id ? null : item.id))}>
            {item.label}
          </Chip>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mt-4 rounded-2xl bg-panel px-4 py-5 text-sm leading-relaxed text-muted shadow-card">
          Nothing matched. Try a focus such as sleep, or a point code such as ST36.
        </p>
      ) : (
        <ul className="mt-4 grid gap-3">
          {list.map((routine) => (
            <li key={routine.id}>
              <Link to="/routines/$routineId" params={{ routineId: routine.id }} className="block min-h-24 rounded-2xl bg-panel px-4 py-4 shadow-card">
                <p className="font-serif text-2xl leading-tight">{routine.title}</p>
                <p className="mt-1 text-sm text-faint">
                  {routine.steps.length} points · about {routineMinutes(routine)} min
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{routine.focus}</p>
                <p className="mt-2 flex flex-wrap gap-1.5">
                  {routine.tags.map((item) => (
                    <span key={item} className="rounded-full bg-panel-2 px-2 py-0.5 text-xs text-earth">
                      {tagLabel(item)}
                    </span>
                  ))}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-sm",
        on ? "bg-paper font-semibold text-ink" : "bg-panel text-muted shadow-card",
      )}
    >
      {children}
    </button>
  );
}
