import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GLOSSARY, GLOSSARY_GROUPS } from "@/data/glossary";

export const Route = createFileRoute("/glossary")({
  head: () => ({ meta: [{ title: "Glossary · Meridian Atlas" }] }),
  component: GlossaryPage,
});

function GlossaryPage() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = GLOSSARY.filter((entry) => {
    if (!needle) return true;
    return entry.phrase.toLowerCase().includes(needle) || entry.definition.toLowerCase().includes(needle);
  });

  return (
    <main>
      <p className="text-sm text-earth">Finding words</p>
      <h1 className="mt-1 font-serif text-4xl">Glossary</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">
        Short definitions for the words in point locations. A cun is a body proportion, not a treatment unit.
      </p>
      <label className="mt-4 block">
        <span className="sr-only">Search glossary</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search cun, malleolus, medial…"
          className="min-h-12 w-full rounded-2xl bg-panel px-4 text-base text-paper shadow-card outline-none placeholder:text-faint"
        />
      </label>
      {visible.length === 0 ? (
        <p className="mt-4 rounded-2xl bg-panel px-4 py-5 text-sm text-muted">No term matched. Try “cun” or “ankle”.</p>
      ) : (
        GLOSSARY_GROUPS.map((group) => {
          const entries = visible.filter((entry) => entry.group === group);
          if (entries.length === 0) return null;
          return (
            <section key={group} className="mt-8">
              <h2 className="font-serif text-2xl">{group}</h2>
              <div className="mt-3 grid gap-3">
                {entries.map((entry) => (
                  <article key={entry.id} id={entry.id} className="scroll-mt-24 rounded-2xl bg-panel px-4 py-3 shadow-card">
                    <h3 className="font-serif text-xl">{entry.phrase}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{entry.definition}</p>
                  </article>
                ))}
              </div>
            </section>
          );
        })
      )}
      <p className="mt-8 text-sm text-faint">
        <Link to="/points" className="text-earth">
          Back to points
        </Link>
      </p>
    </main>
  );
}
