import { createFileRoute } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { useMemo, useState } from "react";
import { ReflexMap } from "@/components/reflex-map";
import { SearchField } from "@/components/pieces";
import {
  REFLEX_DISCLAIMER,
  REFLEX_SHORT,
  SYSTEMS,
  TRADITION_NOTE,
  getZone,
  siblingId,
  systemLabel,
  zoneMatches,
  zonesFor,
  type ReflexSide,
  type ReflexSystem,
  type ReflexView,
} from "@/data/reflexology";
import { cn } from "@/lib/cn";
import { toggleReflexStudied, useReflexStudied } from "@/lib/reflex-studied";

export const Route = createFileRoute("/reflexology")({
  component: ReflexologyPage,
});

function ReflexologyPage() {
  const [view, setView] = useState<ReflexView>("foot");
  const [side, setSide] = useState<ReflexSide>("right");
  const [query, setQuery] = useState("");
  const [system, setSystem] = useState<ReflexSystem | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const studiedIds = useReflexStudied();
  const studied = useMemo(() => new Set(studiedIds), [studiedIds]);

  const visible = zonesFor(view, side);
  const matched = visible.filter((zone) => zoneMatches(zone, query, system));
  const matchedIds = useMemo(() => new Set(matched.map((zone) => zone.id)), [matched]);
  const filtering = query.trim().length > 0 || system != null;
  const dimmed = useMemo(() => {
    if (!filtering) return new Set<string>();
    return new Set(visible.filter((zone) => !matchedIds.has(zone.id)).map((zone) => zone.id));
  }, [filtering, matchedIds, visible]);

  const selected = selectedId ? getZone(selectedId) : undefined;
  const selectedVisible = selected != null && selected.view === view && (selected.side === "both" || selected.side === side);

  function selectZone(id: string) {
    const zone = getZone(id);
    if (!zone) return;
    setView(zone.view);
    if (zone.side !== "both") setSide(zone.side);
    setSelectedId(id);
  }

  function changeView(next: ReflexView) {
    setView(next);
    setSelectedId((current) => {
      if (!current) return current;
      const nextId = siblingId(current, next);
      return getZone(nextId) ? nextId : null;
    });
  }

  function changeSide(next: ReflexSide) {
    setSide(next);
    setSelectedId((current) => {
      if (!current) return current;
      const zone = getZone(current);
      if (!zone || zone.side === "both" || zone.side === next) return current;
      return null;
    });
  }

  return (
    <main>
      <p className="text-sm text-earth">Western educational layout</p>
      <h1 className="mt-1 font-serif text-4xl leading-tight">Reflexology</h1>
      <p className="mt-3 rounded-2xl bg-panel px-4 py-3 text-sm leading-relaxed text-paper shadow-card">{REFLEX_DISCLAIMER}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{TRADITION_NOTE}</p>
      <p className="mt-2 text-sm leading-relaxed text-faint">
        Soles and palms only. No pressure instructions. Dorsal views are not in this edition.
      </p>

      <div className="mt-4">
        <SearchField value={query} onChange={setQuery} placeholder="Search liver, spine, solar plexus…" />
      </div>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by body system">
        <FilterChip on={system == null} onClick={() => setSystem(null)}>
          All systems
        </FilterChip>
        {SYSTEMS.map((item) => (
          <FilterChip key={item.id} on={system === item.id} onClick={() => setSystem((current) => (current === item.id ? null : item.id))}>
            {item.label}
          </FilterChip>
        ))}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Segment
          label="View"
          value={view}
          options={[
            { id: "foot", label: "Foot" },
            { id: "hand", label: "Hand" },
          ]}
          onChange={changeView}
        />
        <Segment
          label="Side"
          value={side}
          options={[
            { id: "left", label: "Left" },
            { id: "right", label: "Right" },
          ]}
          onChange={changeSide}
        />
      </div>

      <section className="mt-4" aria-label="Reflex map">
        <ReflexMap
          view={view}
          side={side}
          zones={visible}
          selectedId={selectedVisible ? selectedId : null}
          studied={studied}
          dimmed={dimmed}
          onSelect={selectZone}
        />
        <p className="mt-2 text-center text-sm leading-relaxed text-faint">
          {side === "right" ? "Right" : "Left"} {view === "foot" ? "sole" : "palm"}. The inner edge, where the spine is drawn, sits on the{" "}
          {side === "right" ? "left" : "right"} of the picture.
        </p>
      </section>

      {filtering ? (
        <section className="mt-4" aria-live="polite">
          <h2 className="font-serif text-2xl">{matched.length === 0 ? "No zones match" : `${matched.length} matching`}</h2>
          {matched.length === 0 ? (
            <p className="mt-2 text-sm leading-relaxed text-muted">Try an organ, a zone name, or a system such as digestion or spine.</p>
          ) : (
            <ul className="mt-3 grid gap-2">
              {matched.map((zone) => (
                <li key={zone.id}>
                  <ZoneRow zoneId={zone.id} selected={zone.id === selectedId} onSelect={selectZone} />
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      <section className="mt-4" aria-live="polite">
        {selectedVisible && selected ? (
          <article className="rounded-3xl bg-panel p-5 shadow-card">
            <p className="text-xs tracking-wide text-earth uppercase">{systemLabel(selected.system)}</p>
            <div className="mt-1 flex items-start justify-between gap-3">
              <h2 className="font-serif text-3xl leading-tight">{selected.name}</h2>
              <button
                type="button"
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm",
                  studied.has(selected.id) ? "bg-paper font-semibold text-ink" : "bg-panel-2 text-muted",
                )}
                aria-pressed={studied.has(selected.id)}
                onClick={() => toggleReflexStudied(selected.id)}
              >
                <Bookmark className="size-4" strokeWidth={studied.has(selected.id) ? 2.25 : 1.75} />
                {studied.has(selected.id) ? "Studied" : "Mark studied"}
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">
              {selected.organs.join(" · ")} · {sideLabel(selected.side, view)}
            </p>
            <h3 className="mt-4 text-sm tracking-wide text-faint uppercase">Traditional association</h3>
            <p className="mt-1 text-base leading-relaxed text-paper">{selected.traditional}</p>
            <h3 className="mt-4 text-sm tracking-wide text-faint uppercase">Plain note</h3>
            <p className="mt-1 text-base leading-relaxed text-muted">{selected.note}</p>
            <p className="mt-4 text-sm font-semibold text-earth">{REFLEX_SHORT}</p>
            <p className="mt-1 text-sm leading-relaxed text-faint">{REFLEX_DISCLAIMER}</p>
          </article>
        ) : (
          <p className="rounded-2xl bg-panel px-4 py-4 text-sm leading-relaxed text-muted shadow-card">
            Tap a zone on the map. The note that opens is a chart reading, not a treatment.
          </p>
        )}
      </section>

      <details className="mt-4 rounded-2xl bg-panel px-4 py-3 shadow-card">
        <summary className="min-h-11 cursor-pointer list-none py-2 text-base text-paper">
          All zones on this {side} {view === "foot" ? "foot" : "hand"}
        </summary>
        <ul className="grid gap-2 pb-2">
          {visible.map((zone) => (
            <li key={zone.id}>
              <ZoneRow zoneId={zone.id} selected={zone.id === selectedId} onSelect={selectZone} />
            </li>
          ))}
        </ul>
      </details>
    </main>
  );
}

function sideLabel(side: "left" | "right" | "both", view: ReflexView) {
  const part = view === "foot" ? "foot" : "hand";
  if (side === "both") return `Both ${part}s`;
  return side === "left" ? `Left ${part}` : `Right ${part}`;
}

function FilterChip({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
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

function Segment<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (id: T) => void;
}) {
  return (
    <div className="rounded-2xl bg-panel p-1 shadow-card" role="group" aria-label={label}>
      <div className="grid grid-cols-2 gap-1">
        {options.map((option) => {
          const on = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(option.id)}
              className={cn(
                "min-h-11 rounded-xl text-sm",
                on ? "bg-paper font-semibold text-ink" : "text-muted",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ZoneRow({ zoneId, selected, onSelect }: { zoneId: string; selected: boolean; onSelect: (id: string) => void }) {
  const zone = getZone(zoneId);
  if (!zone) return null;
  return (
    <button
      type="button"
      onClick={() => onSelect(zone.id)}
      aria-pressed={selected}
      className={cn(
        "flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left",
        selected ? "bg-paper text-ink" : "bg-panel-2 text-paper",
      )}
    >
      <span>
        <span className="block text-base">{zone.name}</span>
        <span className={cn("mt-0.5 block text-sm", selected ? "text-ink/70" : "text-faint")}>{zone.organs.join(", ")}</span>
      </span>
      <span className={cn("shrink-0 text-xs tracking-wide uppercase", selected ? "text-ink/70" : "text-earth")}>{systemLabel(zone.system)}</span>
    </button>
  );
}
