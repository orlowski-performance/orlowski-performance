import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Startseite.
 *
 * Der Aufbau folgt den Befunden der Analyse: Positionierung steht oben statt
 * versteckt, es gibt genau einen Handlungsaufruf statt drei konkurrierender,
 * und der Beweis kommt vor dem Angebot.
 *
 * TODO(Sebastian): Alle Texte sind Struktur-Platzhalter. Sie beschreiben, was
 * an die Stelle gehoert - sie sind keine fertigen Aussagen ueber dich.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <Offer />
      <Process />
      <ClosingCta />
    </>
  );
}

function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {site.role} · {site.city}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {/* TODO: Ein Satz - fuer wen arbeitest du, und was veraendert sich messbar? */}
          Training, das nach Zahlen geht statt nach Gefühl.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          {/* TODO: Zwei Saetze zur Zielgruppe und zur Methode. */}
          Individuelle Betreuung für Menschen, die neben Beruf und Familie
          leistungsfähiger werden wollen – mit einem Plan, der zu deiner Woche
          passt, und mit Werten, die belegen, dass er wirkt.
        </p>
        <div className="mt-10">
          <Link
            href="/kontakt"
            className="inline-block rounded-full bg-accent px-7 py-3 font-semibold text-paper transition-colors hover:bg-accent-dark"
          >
            Kostenloses Erstgespräch anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="border-b border-line bg-paper-soft">
      <div className="mx-auto max-w-5xl px-6 py-section">
        <h2 className="text-2xl font-semibold tracking-tight">Ergebnisse</h2>
        <p className="mt-3 max-w-2xl text-muted">
          {/* TODO: Ersetzen durch echte Fallbeispiele mit Zeitraum und Zahl.
              Bis dahin bleibt dieser Block leer - erfundener Beweis ist schlimmer
              als gar keiner. */}
          Hier stehen belegbare Fallbeispiele: Ausgangslage, Zeitraum, Ergebnis.
        </p>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-section">
        <h2 className="text-2xl font-semibold tracking-tight">Angebot</h2>
        <p className="mt-3 max-w-2xl text-muted">
          {/* TODO: Leistungen, Umfang, Preisrahmen. */}
          Beschreibung der Betreuungsformen inklusive Umfang und Preisrahmen.
        </p>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="border-b border-line bg-paper-soft">
      <div className="mx-auto max-w-5xl px-6 py-section">
        <h2 className="text-2xl font-semibold tracking-tight">Ablauf</h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          <ProcessStep n={1} title="Erstgespräch">
            Ausgangslage, Ziel und Rahmenbedingungen – unverbindlich.
          </ProcessStep>
          <ProcessStep n={2} title="Bestandsaufnahme">
            Messung statt Schätzung: Belastbarkeit, Alltag, Vorgeschichte.
          </ProcessStep>
          <ProcessStep n={3} title="Betreuung">
            Plan, laufende Anpassung und regelmäßige Kontrolle der Werte.
          </ProcessStep>
        </ol>
      </div>
    </section>
  );
}

function ProcessStep({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <span className="text-sm font-semibold text-accent">0{n}</span>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted">{children}</p>
    </li>
  );
}

function ClosingCta() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-section">
        <h2 className="text-2xl font-semibold tracking-tight">
          Passt das zu dir?
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Schreib kurz, wo du stehst und was du erreichen willst. Du bekommst
          eine ehrliche Einschätzung – auch dann, wenn ich nicht der Richtige
          bin.
        </p>
        <div className="mt-8">
          <Link
            href="/kontakt"
            className="inline-block rounded-full bg-accent px-7 py-3 font-semibold text-paper transition-colors hover:bg-accent-dark"
          >
            Erstgespräch anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
