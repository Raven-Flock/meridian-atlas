import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { BackLink, HerbCard, PointCard, RoleLine, SavePointButton } from "@/components/pieces";
import { LinkedText } from "@/components/linked-text";
import { PointFigureButton } from "@/components/locate-figure";
import { finding } from "@/data/locate";
import { ELECTRO_COPY, emptyPointFilters, getPoint, herbsForPoint, relatedPoints } from "@/data/catalog";
import { ELEMENT_TEXT, regionLabel, safetyLabel, symptomLabel, WINDOW_NOTE } from "@/data/labels";
import { getChannel } from "@/data/channels";
import { tonedPinyin } from "@/data/tones";
import { remember } from "@/lib/saved";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/points/$pointId")({
  loader: ({ params }) => getPoint(params.pointId) ?? null,
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.code} ${loaderData.pinyin} · Meridian Atlas` : "Point · Meridian Atlas" }],
  }),
  component: PointPage,
});

function PointPage() {
  const point = Route.useLoaderData();
  useEffect(() => {
    if (point) remember({ kind: "point", id: point.id });
  }, [point]);

  if (!point) {
    return (
      <main>
        <BackLink to="/points" label="All points" />
        <h1 className="mt-2 font-serif text-4xl">That point is not in the atlas yet</h1>
        <p className="mt-2 text-muted">The id may be mistyped. Browse the channels and add missing numbers later beside their neighbors.</p>
      </main>
    );
  }

  const channel = getChannel(point.channelId);
  const herbs = herbsForPoint(point);
  const related = relatedPoints(point);
  const element = channel?.element;
  const place = finding(point);
  const extra = point.channelId === "extra" || point.kinds.includes("extra");
  const spoken = tonedPinyin(point.id) ?? point.pinyin;

  return (
    <article>
      <BackLink to="/points" label="All points" />
      <header className="mt-3">
        <div className="flex items-start justify-between gap-3">
          <p className={cn("text-sm", element ? ELEMENT_TEXT[element] : "text-earth")}>
            {extra ? "Extra point · not one of the 361" : `Classical · ${channel?.code ?? ""} ${point.order} of ${channel?.classicalCount ?? ""}`}
          </p>
          <SavePointButton id={point.id} />
        </div>
        <h1 className="mt-2 font-serif text-5xl leading-none tracking-tight">{point.code}</h1>
        <p className="mt-2 font-serif text-2xl leading-snug">
          {point.hanzi} · {spoken}
        </p>
        <p className="mt-1 text-lg text-muted">{point.english}</p>
        <p className="mt-2 text-sm text-faint">{channel?.name ?? "Extra"}{point.kinds.includes("extra") && point.channelId !== "extra" ? " · Extra point" : ""}</p>
        {point.safety !== "general" ? (
          <p className={cn("mt-3 text-sm", point.safety === "pregnancy" ? "text-fire" : "text-earth")}>{safetyLabel(point.safety)}</p>
        ) : null}
      </header>

      <Card kicker="Location" title="How to find it">
        <p className="text-xs tracking-wide text-faint uppercase">In plain words</p>
        <p className="mt-1 text-lg leading-snug text-paper">
          <LinkedText text={place.quick} />
        </p>
        <div className="mt-4">
          <PointFigureButton point={point} />
        </div>
        <p className="mt-4 text-base leading-relaxed text-paper">
          <LinkedText text={place.how} />
        </p>
        {place.alt ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Another way: <LinkedText text={place.alt} />
          </p>
        ) : null}
        <div className="mt-4 border-t border-line pt-3">
          <h3 className="text-xs tracking-wide text-faint uppercase">Chart language</h3>
          <p className="mt-2 text-sm leading-relaxed text-paper">
            Chart line: <LinkedText text={point.location} />
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">Nearby: {point.nearby}</p>
          <p className="mt-2 text-sm text-faint">
            Dotted words open the{" "}
            <Link to="/glossary" className="text-earth">
              glossary
            </Link>
            . The drawing shows the area. The steps are the location.
          </p>
        </div>
      </Card>

      <Card kicker="Actions" title="Traditionally said to">
        <p className="text-xs tracking-wide text-faint uppercase">In plain words</p>
        <p className="mt-1 text-base leading-relaxed text-paper">{point.summary}</p>
        <div className="mt-4 border-t border-line pt-3">
          <h3 className="text-xs tracking-wide text-faint uppercase">Textbook functions</h3>
          <p className="mt-2 text-sm leading-relaxed text-paper">{point.actions}</p>
        </div>
        <div className="mt-3">
          <RoleLine point={point} />
        </div>
        {point.kinds.includes("window") ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {WINDOW_NOTE}{" "}
            <Link to="/points" search={{ ...emptyPointFilters, kind: "window" }} className="text-earth">
              Open the Heavenly Gates set.
            </Link>
          </p>
        ) : null}
      </Card>

      {point.symptoms.length > 0 ? (
        <Card kicker="Indications" title="What people look up">
          <div className="flex flex-wrap gap-2">
            {point.symptoms.map((symptom) => (
              <Link
                key={symptom}
                to="/points"
                search={{ ...emptyPointFilters, symptom }}
                className="inline-flex min-h-11 items-center rounded-full bg-panel-2 px-3 text-sm text-paper"
              >
                {symptomLabel(symptom)}
              </Link>
            ))}
          </div>
        </Card>
      ) : null}

      <section className="mt-4 rounded-3xl border border-fire/40 bg-panel px-4 py-4 shadow-card">
        <p className="text-xs tracking-wide text-fire uppercase">Needling · licensed practice only</p>
        <h2 className="mt-1 font-serif text-2xl">Needle depth and angle</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Classroom chart for students, the range schools usually print. A cun is that person’s body inch, not a ruler inch. Charts differ by a little. This is not a technique to copy, and it is not permission to needle yourself.
        </p>
        <h3 className="mt-4 text-xs tracking-wide text-faint uppercase">Depth</h3>
        <p className="mt-1 text-base leading-relaxed">{point.needleDepth}</p>
        <h3 className="mt-4 text-xs tracking-wide text-faint uppercase">Angle</h3>
        <p className="mt-1 text-base leading-relaxed">{point.needleAngle}</p>
        <h3 className="mt-4 text-xs tracking-wide text-faint uppercase">Electroacupuncture</h3>
        <p className="mt-1 text-base leading-relaxed">{ELECTRO_COPY[point.electro]}</p>
      </section>

      <Card kicker="Cautions" title="When to stop">
        {point.safety !== "general" ? (
          <p className={cn("text-sm", point.safety === "pregnancy" ? "text-fire" : "text-earth")}>{safetyLabel(point.safety)}</p>
        ) : (
          <p className="text-sm text-muted">No special caution badge. The usual stop rules still apply.</p>
        )}
        <p className="mt-3 text-base leading-relaxed text-paper">When not to press: {point.skip}</p>
      </Card>

      <Card kicker="Acupressure" title="Pressure, not a needle">
        <p className="text-base leading-relaxed text-paper">{point.press}</p>
        <p className="mt-3 text-sm leading-relaxed text-earth">When not to press: {point.skip}</p>
        <p className="mt-2 text-sm text-faint">About 30–90 seconds is the usual window, unless the step above is shorter. Stop if pain, dizziness, or anything unusual shows up.</p>
      </Card>

      <Card kicker="Technical notes" title="System">
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <Fact label="Channel" value={channel ? `${channel.name} (${channel.code})` : "Extra"} />
          <Fact label="Element" value={element ? element[0].toUpperCase() + element.slice(1) : "Not one of the five"} />
          <Fact label="Yin or yang" value={channel?.polarity ? channel.polarity : "Extra point"} />
          <Fact label="Organ system" value={channel?.organ ?? "Extra points"} />
          <Fact label="Region" value={regionLabel(point.region)} />
          <Fact label="Limb rule" value={channel?.limb ?? "—"} />
        </dl>
        {channel ? (
          <Link to="/systems/$systemId" params={{ systemId: channel.id }} className="mt-3 inline-flex min-h-11 items-center text-sm text-earth">
            Open the {channel.name} page
          </Link>
        ) : null}
      </Card>

      {related.length > 0 ? (
        <Card kicker="Neighbors" title="Nearby on this channel">
          <div className="grid gap-3">
            {related.map((item) => (
              <PointCard key={item.id} point={item} />
            ))}
          </div>
        </Card>
      ) : null}

      {herbs.length > 0 ? (
        <Card kicker="Study link" title="Herbs often paired for a similar pattern">
          <p className="mb-3 text-sm text-muted">A study link, not a formula and not a dose.</p>
          <div className="grid gap-3">
            {herbs.map((herb) => (
              <HerbCard key={herb.id} herb={herb} />
            ))}
          </div>
        </Card>
      ) : null}

      {point.tags.length > 0 ? (
        <Card kicker="Index" title="Tags">
          <p className="text-sm leading-relaxed text-faint">{point.tags.join(" · ")}</p>
        </Card>
      ) : null}
    </article>
  );
}

function Card({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return (
    <section className="mt-4 rounded-3xl bg-panel px-4 py-4 shadow-card">
      <p className="text-xs tracking-wide text-earth uppercase">{kicker}</p>
      <h2 className="mt-1 font-serif text-2xl">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-panel-2 px-3 py-2">
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-1 text-paper capitalize">{value}</dd>
    </div>
  );
}
