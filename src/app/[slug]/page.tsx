import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicePages, findServicePage, site } from "@/lib/site";
import { Section, Cta, Platzhalter } from "@/components/ui";

/**
 * Die Unterseiten aus dem Bauplan der Analyse ("aus einer Seite werden sieben").
 *
 * Eine Datei, sieben Adressen: Der Aufbau ist bei allen gleich, es
 * unterscheiden sich nur Titel, Einstieg und Zielbegriff. Statische Routen wie
 * /kontakt oder /impressum haben in Next.js Vorrang und werden hier nicht
 * abgefangen.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const page = findServicePage((await params).slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.lead,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: `${page.title} · ${site.name}`, description: page.lead },
  };
}

export default async function ServicePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = findServicePage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{page.lead}</p>
          <div className="mt-8">
            <Cta />
          </div>
        </div>
      </section>

      <Section labelledBy="inhalt-folgt">
        <h2 id="inhalt-folgt" className="text-2xl font-semibold tracking-tight">
          Inhalt
        </h2>
        <div className="mt-6 max-w-2xl">
          <Platzhalter>
            Diese Seite hat ihre Adresse, ihren Titel und ihren Platz in
            Navigation und Sitemap – der Text fehlt noch.
            {page.keyword && (
              <>
                {" "}
                Sie zielt laut Analyse auf den Suchbegriff{" "}
                <strong className="font-semibold text-ink">
                  {"\u201e"}{page.keyword}{"\u201c"}
                </strong>
                ; dieser Begriff gehört wörtlich in Überschrift und ersten
                Absatz.
              </>
            )}
          </Platzhalter>
        </div>
      </Section>

      <section className="bg-paper-soft">
        <div className="mx-auto max-w-6xl px-6 py-section">
          <h2 className="text-2xl font-semibold tracking-tight">
            Erstgespräch vereinbaren
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Unverbindlich, kostenlos, und du bekommst eine ehrliche Einschätzung.
          </p>
          <div className="mt-8">
            <Cta />
          </div>
        </div>
      </section>
    </>
  );
}
