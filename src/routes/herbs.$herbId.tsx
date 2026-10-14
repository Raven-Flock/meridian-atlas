import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BackLink, PointCard, SaveHerbButton } from "@/components/pieces";
import { emptyHerbFilters, getHerb, pointsForHerb } from "@/data/catalog";
import { getChannel } from "@/data/channels";
import { HERB_DISCLAIMER, herbPlain } from "@/data/herb-plain";
import { actionLabel, FLAVOR_LABEL, natureLabel, symptomLabel } from "@/data/labels";
import { remember } from "@/lib/saved";

export const Route = createFileRoute("/herbs/$herbId")({
  loader: ({ params }) => getHerb(params.herbId) ?? null,
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.pinyin} · Meridian Atlas` : "Herb · Meridian Atlas" }],
  }),
  component: HerbPage,
});

function HerbPhoto({ id, alt }: { id: string; alt: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <img
      src={`${import.meta.env.BASE_URL}herbs/${id}.jpg`}
      alt={alt}
      className="aspect-square w-full rounded-2xl bg-panel object-cover"
      onError={() => setOk(false)}
    />
  );
}

function HerbPage() {
  const herb = Route.useLoaderData();
  useEffect(() => {
    if (herb) remember({ kind: "herb", id: herb.id });
  }, [herb]);

  if (!herb) {
    return (
      <main>
        <BackLink to="/herbs" label="All herbs" />
        <h1 className="mt-2 font-serif text-4xl">That herb is not in the atlas yet</h1>
        <p className="mt-2 text-muted">Browse by action. New herbs can be added as another object with a stable id.</p>
      </main>
    );
  }

  const points = pointsForHerb(herb.id);
  const actions = [herb.action, ...herb.also];
  const plain = herbPlain(herb.id);

  return (
    <article>
      <BackLink to="/herbs" label="All herbs" />
      <figure className="mt-3">
        <HerbPhoto key={herb.id} id={herb.id} alt={plain?.look ?? herb.english} />
        <figcaption className="mt-2 text-sm leading-relaxed text-muted">
          {plain?.look ?? herb.english}. The form people usually buy. Not a product recommendation.
        </figcaption>
      </figure>

      <header className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-earth">{actionLabel(herb.action)}</p>
          <SaveHerbButton id={herb.id} />
        </div>
        <h1 className="font-serif text-4xl leading-tight">{herb.pinyin}</h1>
        <p className="mt-1 font-serif text-2xl text-muted">{herb.hanzi}</p>
        <p className="mt-1 text-lg">{herb.english}</p>
        <p className="mt-1 text-sm text-faint italic">{herb.latin}</p>
      </header>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">What it’s traditionally used for</h2>
        <p className="mt-2 text-base leading-relaxed text-paper">{plain?.what ?? herb.uses}</p>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">In simple terms</h2>
        <p className="mt-2 text-base leading-relaxed text-paper">{plain?.feel ?? herb.summary}</p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {natureLabel(herb.nature)} · {herb.flavors.map((flavor) => FLAVOR_LABEL[flavor]).join(", ")}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Who might look this up</h2>
        <p className="mt-2 text-base leading-relaxed text-paper">{plain?.who ?? "Students comparing this herb with the others in its category."}</p>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">What to buy</h2>
        <p className="mt-2 text-base leading-relaxed text-paper">{plain?.buy ?? "The dried herb from a reputable supplier, not an unnamed blend."}</p>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">How to prepare it</h2>
        <p className="mt-2 text-base leading-relaxed text-paper">{plain?.how ?? herb.uses}</p>
      </section>

      <section className="mt-6 rounded-2xl border border-earth/50 bg-panel px-4 py-3">
        <p className="text-sm text-earth">Textbook range, not your dose</p>
        <p className="mt-1 text-base leading-relaxed text-paper">{plain?.range ?? "Ask a qualified practitioner. This atlas does not set a personal dose."}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{HERB_DISCLAIMER}</p>
      </section>

      {plain?.alert ? (
        <section className="mt-4 rounded-2xl border border-earth/50 bg-panel px-4 py-3">
          <p className="text-sm leading-relaxed text-earth">{plain.alert}</p>
        </section>
      ) : null}

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Category</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {actions.map((action) => (
            <Link key={action} to="/herbs" search={{ ...emptyHerbFilters, action }} className="inline-flex min-h-11 items-center rounded-full bg-panel px-3 text-sm shadow-card">
              {actionLabel(action)}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Meridians it is said to enter</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {herb.channelIds.map((id) => {
            const channel = getChannel(id);
            return (
              <Link key={id} to="/systems/$systemId" params={{ systemId: id }} className="inline-flex min-h-11 items-center rounded-full bg-panel px-3 text-sm shadow-card">
                {channel?.name ?? id}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">People also look this up for</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {herb.symptoms.map((symptom) => (
            <Link key={symptom} to="/herbs" search={{ ...emptyHerbFilters, symptom }} className="inline-flex min-h-11 items-center rounded-full bg-panel-2 px-3 text-sm">
              {symptomLabel(symptom)}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Often paired with</h2>
        <ul className="mt-2 space-y-3">
          {herb.pairings.map((pairing) => {
            const other = getHerb(pairing.herbId);
            if (!other) return null;
            return (
              <li key={pairing.herbId} className="rounded-2xl bg-panel px-4 py-3 shadow-card">
                <Link to="/herbs/$herbId" params={{ herbId: other.id }} className="font-serif text-xl">
                  {other.pinyin} {other.hanzi}
                </Link>
                <p className="mt-1 text-sm leading-relaxed text-muted">{pairing.idea}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Cautions</h2>
        <p className="mt-2 text-base leading-relaxed text-paper">{herb.cautions}</p>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Points with a similar aim</h2>
        {points.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No point in this atlas lists this herb yet.</p>
        ) : (
          <div className="mt-3 grid gap-3">
            {points.slice(0, 8).map((point) => (
              <PointCard key={point.id} point={point} />
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
