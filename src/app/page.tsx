import Link from "next/link";
import { site, servicePages, trustPoints } from "@/lib/site";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { Section, Cta, Platzhalter } from "@/components/ui";

/**
 * Startseite nach dem Entwurf aus der Analyse.
 *
 * Die drei Korrekturen gegenüber der alten Seite: Ort und Leistung stehen in
 * der Überschrift, die Zielgruppe steht oben statt in FAQ-Frage 2 von 17, und
 * es gibt einen Handlungsaufruf statt drei nebeneinander.
 */

const faq = [
  {
    question: "Für wen ist das Coaching gedacht?",
    answer:
      "Für berufstätige Frauen, die neben Beruf und Familie leistungsfähiger werden wollen – ohne dass Training den Kalender bestimmt.",
  },
  {
    question: "Findet das Training in Düsseldorf statt oder online?",
    answer:
      "Beides ist möglich: vor Ort in Düsseldorf und Umgebung oder vollständig betreut online.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Ergebnisse />
      <Leistungen />
      <Ablauf />
      <Person />
      <Einzugsgebiet />
      <Faq />
      <Abschluss />
      <JsonLd data={faqJsonLd(faq)} />
    </>
  );
}

function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark">
            {site.role} · {site.city}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Personal Training in Düsseldorf für {site.audience}
          </h1>
          <p className="mt-6 text-lg text-muted">
            {/* TODO(Sebastian): Zwei Sätze in deinen Worten - was verändert sich,
                und woran merkt man es? */}
            Training und Ernährung aus einer Hand, zugeschnitten auf eine volle
            Woche. Kein Plan, der nur funktioniert, wenn sonst nichts dazwischen
            kommt.
          </p>
          <div className="mt-8">
            <Cta />
          </div>
        </div>

        {/* Bildfläche. Laut Analyse gehört hier die Zielgruppe ins Bild,
            die linke Hälfte bleibt für die Überschrift frei. */}
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-brand bg-brand-soft p-6 text-center text-sm text-muted">
          Kopfbild – wartet auf das Fotoshooting.
          <br />
          Vorgabe aus der Analyse: Tageslicht von der Seite, heller Hintergrund,
          alltagsnah.
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-b border-line bg-paper-soft">
      <ul className="mx-auto grid max-w-6xl gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((p) => (
          <li key={p.label}>
            <p className="font-semibold">{p.label}</p>
            <p className="mt-1 text-sm text-muted">{p.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Ergebnisse() {
  return (
    <Section labelledBy="ergebnisse">
      <h2 id="ergebnisse" className="text-2xl font-semibold tracking-tight">
        Ergebnisse
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        Ausgangslage, Zeitraum, Ergebnis – nachvollziehbar statt behauptet.
      </p>
      <div className="mt-6 max-w-2xl">
        <Platzhalter>
          Hier stehen echte Fallbeispiele und Kundenstimmen, sobald sie
          vorliegen. Bis dahin bleibt der Abschnitt leer: Ein erfundener Beweis
          wäre schlimmer als gar keiner.
        </Platzhalter>
      </div>
      <p className="mt-6">
        <Link href="/ergebnisse" className="font-semibold text-brand-dark underline">
          Alle Ergebnisse ansehen
        </Link>
      </p>
    </Section>
  );
}

function Leistungen() {
  return (
    <Section soft labelledBy="leistungen">
      <h2 id="leistungen" className="text-2xl font-semibold tracking-tight">
        Leistungen
      </h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicePages
          .filter((p) => p.slug !== "ergebnisse")
          .map((p) => (
            <li key={p.slug} className="rounded-xl border border-line bg-paper p-6">
              <h3 className="font-semibold">
                <Link href={`/${p.slug}`} className="hover:text-brand-dark">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted">{p.lead}</p>
            </li>
          ))}
      </ul>
    </Section>
  );
}

function Ablauf() {
  const schritte = [
    ["Erstgespräch", "Ausgangslage, Ziel und Rahmenbedingungen – unverbindlich."],
    ["Bestandsaufnahme", "Messung statt Schätzung: Belastbarkeit, Alltag, Vorgeschichte."],
    ["Betreuung", "Plan, laufende Anpassung und regelmäßige Kontrolle der Werte."],
  ];
  return (
    <Section labelledBy="ablauf">
      <h2 id="ablauf" className="text-2xl font-semibold tracking-tight">
        Ablauf
      </h2>
      <ol className="mt-8 grid gap-8 sm:grid-cols-3">
        {schritte.map(([titel, text], i) => (
          <li key={titel}>
            <span className="text-sm font-semibold text-brand-dark">0{i + 1}</span>
            <h3 className="mt-2 font-semibold">{titel}</h3>
            <p className="mt-2 text-sm text-muted">{text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Person() {
  return (
    <Section soft labelledBy="person">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-brand bg-paper p-6 text-center text-sm text-muted">
          Porträt – wartet auf das Fotoshooting.
          <br />
          Das bisherige Bild war eine HEIC-Datei und in den meisten Browsern
          unsichtbar.
        </div>
        <div>
          <h2 id="person" className="text-2xl font-semibold tracking-tight">
            {site.owner}
          </h2>
          <p className="mt-3 text-muted">
            {/* TODO(Sebastian): Werdegang, Qualifikation, warum diese Zielgruppe.
                Lizenzen mit Namen, Verband und Jahr - „lizenziert" allein zählt nicht. */}
            Hier steht dein Werdegang: Ausbildung, Lizenzen mit Namen und
            Verband, und warum du mit dieser Zielgruppe arbeitest.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Einzugsgebiet() {
  return (
    <Section labelledBy="einzugsgebiet">
      <h2 id="einzugsgebiet" className="text-2xl font-semibold tracking-tight">
        Einzugsgebiet
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        Training vor Ort in {site.serviceArea.slice(0, -1).join(", ")} und{" "}
        {site.serviceArea.at(-1)}. Wer weiter weg wohnt oder viel unterwegs ist,
        wird online betreut – mit demselben Plan und denselben Kontrollpunkten.
      </p>
    </Section>
  );
}

function Faq() {
  return (
    <Section soft labelledBy="faq">
      <h2 id="faq" className="text-2xl font-semibold tracking-tight">
        Häufige Fragen
      </h2>
      <dl className="mt-8 max-w-3xl space-y-6">
        {faq.map((f) => (
          <div key={f.question}>
            <dt className="font-semibold">{f.question}</dt>
            <dd className="mt-2 text-muted">{f.answer}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 max-w-2xl">
        <Platzhalter>
          Die 17 Antworten der alten Seite werden hierher übernommen und
          ausgezeichnet, sobald Kündigungsregel und Gesamtpreise ausformuliert
          sind. Genau dort stand bisher ein Platzhalter über den Bezahlknöpfen.
        </Platzhalter>
      </div>
    </Section>
  );
}

function Abschluss() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-section">
        <h2 className="text-2xl font-semibold tracking-tight">Passt das zu dir?</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Schreib kurz, wo du stehst und was du erreichen willst. Du bekommst
          eine ehrliche Einschätzung – auch dann, wenn ich nicht der Richtige
          bin.
        </p>
        <div className="mt-8">
          <Cta />
        </div>
      </div>
    </section>
  );
}
